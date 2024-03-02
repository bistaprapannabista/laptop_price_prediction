import { useEffect, useState } from 'react'
import './App.css'
import Select from 'react-select'
import options from './options'
import CreatableSelect from 'react-select/creatable';
import Barchart from './components/Barchart';
import Linechart from './components/Linechart';
import Card from './components/Card';

interface IResult {
  "MAE": number;
  "R2 Score": number;
  "name": string;
  "price": number;
}

function App() {
  const [data, setData] = useState({});
  const [result, setResult] = useState<IResult[]>();
  const [optimal, setOptimal] = useState<IResult>();

  const predictPrice = async () => {
    const response = await fetch("http://127.0.0.1:5000/api/predict-price",
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

  useEffect(() => {
    if (result) {
      let accurate = result[0];
      result.forEach(item => {
        if ((accurate["MAE"] > item["MAE"]) && (accurate["R2 Score"] < item["R2 Score"])) {
          accurate = item;
        }
      });
      setOptimal(accurate);
    }
  }, [result]);

  // const inputHandler = (e: { target: { name: string, value: string } }) => {
  //   setData({ ...data, [e.target.name]: e.target.value });
  // }

  const selectHandler = (e: { value: string, label: string }, name: string) => {
    setData({ ...data, [name]: e.value })
  }

  return (
    <>
      <h1>Laptop Price Prediction</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', width: "80vw" }}>
        <div className='input-container'><label htmlFor='weight'>Weight:</label><CreatableSelect onChange={(e: { value: string, label: string }) => selectHandler(e, 'weight')} name="weight" placeholder="Enter Weight" /></div>
        <div className='input-container'><label htmlFor='screen_size'>Screen Size:</label><CreatableSelect onChange={(e: { value: string, label: string }) => selectHandler(e, 'screen_size')} name="screen_size" placeholder="Enter Screen Size" /></div>
        <div className='input-container'><label htmlFor='company'>Company:</label><Select onChange={(e: { value: string, label: string }) => selectHandler(e, 'company')} name="company" placeholder="Select Company" options={options?.company} /></div>
        <div className='input-container'><label htmlFor='type'>Type:</label><Select onChange={(e: { value: string, label: string }) => selectHandler(e, 'type')} name="type" placeholder="Select Type Name" options={options?.type} /></div>
        <div className='input-container'><label htmlFor='ram'>Ram:</label><Select onChange={(e: { value: string, label: string }) => selectHandler(e, 'ram')} name="ram" placeholder="Select Ram" options={options?.ram} /></div>
        <div className='input-container'><label htmlFor='touchscreen'>Touch Screen:</label><Select onChange={(e: { value: string, label: string }) => selectHandler(e, 'touchscreen')} name="touchscreen" placeholder="Select Touch Screen" options={options?.tocuhscreen} /></div>
        <div className='input-container'><label htmlFor='ips'>IPS:</label><Select onChange={(e: { value: string, label: string }) => selectHandler(e, 'ips')} name="ips" placeholder="Select IPS" options={options?.ips} /></div>
        <div className='input-container'><label htmlFor='resolution'>Screen Size:</label><Select onChange={(e: { value: string, label: string }) => selectHandler(e, 'resolution')} name="resolution" placeholder="Select Resolution" options={options?.resolution} /></div>
        <div className='input-container'><label htmlFor='cpu'>CPU:</label><Select onChange={(e: { value: string, label: string }) => selectHandler(e, 'cpu')} name="cpu" placeholder="Select Cpu Brand" options={options?.cpu} /></div>
        <div className='input-container'><label htmlFor='hdd'>HDD:</label><Select onChange={(e: { value: string, label: string }) => selectHandler(e, 'hdd')} name="hdd" placeholder="Select HDD" options={options?.hdd} /></div>
        <div className='input-container'><label htmlFor='ssd'>SSD:</label><Select onChange={(e: { value: string, label: string }) => selectHandler(e, 'ssd')} name="ssd" placeholder="Select SSD" options={options?.sdd} /></div>
        <div className='input-container'><label htmlFor='gpu'>GPU:</label><Select onChange={(e: { value: string, label: string }) => selectHandler(e, 'gpu')} name="gpu" placeholder="Select Gpu Brand" options={options?.gpu} /></div>
        <div className='input-container'><label htmlFor='os'>OS:</label><Select onChange={(e: { value: string, label: string }) => selectHandler(e, 'os')} name="os" placeholder="Select OS" options={options?.os} /></div>
      </div>
      <button className='calculate-button' onClick={predictPrice}>
        Predict
      </button>

      {result &&
        < div style={{ display: "flex", justifyContent: "space-between", width: "80vw" }}>
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
        < div style={{ display: "flex", justifyContent: "space-between", width: "80vw" }}>
          <p> The most accurate predicted price is <b>{optimal?.price}</b> using {optimal?.name} having mae {optimal?.MAE} and r2 score {optimal && optimal["R2 Score"]}.</p>
        </div>
      }
    </>
  )
}

export default App
