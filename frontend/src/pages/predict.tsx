import { useEffect, useState } from 'react'
// import './App.css'
import Select from 'react-select'
import options from '../options'
import CreatableSelect from 'react-select/creatable';
import Barchart from '../components/Barchart';
import Linechart from '../components/Linechart';
import Card from '../components/Card';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import Navbar from '../components/Navbar';
import { toast } from 'react-toastify';

interface IResult {
    "MAE": number;
    "R2 Score": number;
    "name": string;
    "price": number;
}

function PredictPage() {
    const [data, setData] = useState<any>({});
    const [result, setResult] = useState<IResult[]>();
    const [optimal, setOptimal] = useState<IResult>();

    const predictPrice = async () => {
        if (data?.weight < 0) {
            toast.error("Please enter valid weight.");
        }

        else if (data?.screen_size < 0) {
            toast.error("Please enter valid screen size.");
        }
        else {
            const response = await fetch("http://127.0.0.1:5000/api/predict-price",
                // const response = await fetch("https://laptop-price-prediction-cijf.onrender.com/api/predict-price",

                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)
                }
            )
            const result = await response.json();
            setResult(result?.data);
        }
    }

    useEffect(() => {
        if (result) {
            let accurate = result[1];
            result.forEach(item => {
                if ((accurate["MAE"] > item["MAE"]) && (accurate["R2 Score"] < item["R2 Score"])) {
                    accurate = item;
                }
            });
            setOptimal(accurate);
        }
    }, [result]);

    const selectHandler = (e: { value: string, label: string }, name: string) => {
        setData({ ...data, [name]: e.value })
    }

    return (
        <>
            <Header />
            <Navbar />
            <h1 className='title'>Laptop Price Prediction</h1>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', width: "80vw" }}>
                <div className='input-container'><label htmlFor='weight'>Weight:</label><CreatableSelect onChange={(e: { value: string, label: string }) => selectHandler(e, 'weight')} name="weight" placeholder="Enter Weight (KG)" /></div>
                <div className='input-container'><label htmlFor='screen_size'>Screen Size:</label><CreatableSelect onChange={(e: { value: string, label: string }) => selectHandler(e, 'screen_size')} name="screen_size" placeholder="Enter Screen Size (In)" /></div>
                <div className='input-container'><label htmlFor='company'>Company:</label><Select onChange={(e: { value: string, label: string }) => selectHandler(e, 'company')} name="company" placeholder="Select Company" options={options?.company} /></div>
                <div className='input-container'><label htmlFor='type'>Type:</label><Select onChange={(e: { value: string, label: string }) => selectHandler(e, 'type')} name="type" placeholder="Select Type Name" options={options?.type} /></div>
                <div className='input-container'><label htmlFor='ram'>Ram:</label><Select onChange={(e: { value: string, label: string }) => selectHandler(e, 'ram')} name="ram" placeholder="Select Ram (GB)" options={options?.ram} /></div>
                <div className='input-container'><label htmlFor='touchscreen'>Touch Screen:</label><Select onChange={(e: { value: string, label: string }) => selectHandler(e, 'touchscreen')} name="touchscreen" placeholder="Select Touch Screen" options={options?.tocuhscreen} /></div>
                <div className='input-container'><label htmlFor='ips'>IPS:</label><Select onChange={(e: { value: string, label: string }) => selectHandler(e, 'ips')} name="ips" placeholder="Select IPS" options={options?.ips} /></div>
                <div className='input-container'><label htmlFor='resolution'>Screen Size:</label><Select onChange={(e: { value: string, label: string }) => selectHandler(e, 'resolution')} name="resolution" placeholder="Select Resolution" options={options?.resolution} /></div>
                <div className='input-container'><label htmlFor='cpu'>CPU:</label><Select onChange={(e: { value: string, label: string }) => selectHandler(e, 'cpu')} name="cpu" placeholder="Select Cpu Brand" options={options?.cpu} /></div>
                <div className='input-container'><label htmlFor='hdd'>HDD:</label><Select onChange={(e: { value: string, label: string }) => selectHandler(e, 'hdd')} name="hdd" placeholder="Select HDD (GB)" options={options?.hdd} /></div>
                <div className='input-container'><label htmlFor='ssd'>SSD:</label><Select onChange={(e: { value: string, label: string }) => selectHandler(e, 'ssd')} name="ssd" placeholder="Select SSD (GB)" options={options?.sdd} /></div>
                <div className='input-container'><label htmlFor='gpu'>GPU:</label><Select onChange={(e: { value: string, label: string }) => selectHandler(e, 'gpu')} name="gpu" placeholder="Select Gpu Brand" options={options?.gpu} /></div>
                <div className='input-container'><label htmlFor='os'>OS:</label><Select onChange={(e: { value: string, label: string }) => selectHandler(e, 'os')} name="os" placeholder="Select OS" options={options?.os} /></div>
            </div>
            <button className='calculate-button' onClick={predictPrice}>
                Predict
            </button>

            {result &&
                < div className="flex-container">
                    <Card>
                        <Linechart data={result} />
                    </Card>
                    <Card>
                        <Barchart data={result} />
                    </Card>
                </div >
            }

            {
                result &&
                <div style={{ width: "80vw", marginBottom: "30px" }}>
                    <Card>
                        <p style={{ lineHeight: "1.5", fontSize: "16px", textAlign: "center" }}> The most accurate predicted price is <b>NRs. {optimal?.price && (optimal?.price * 1.6).toFixed(2)}</b> using <b>{optimal?.name}</b> having Mean Absoulute Error <b>{optimal?.MAE.toFixed(4)}</b> and R2 Score <b>{optimal && optimal["R2 Score"].toFixed(4)}</b>.</p>
                    </Card>
                </div>
            }
            <Footer />
        </>
    )
}

export default PredictPage;
