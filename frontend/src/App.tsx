import { useEffect, useState } from 'react'
import './App.css'
import Select from 'react-select'
import options from './options'

function App() {
  const [data, setData] = useState({});
  const [result, setResult] = useState();
  // const apiUrl = process.env.REACT_APP_API_URL + 'predict-price';
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
    setResult(result);
  }

  const inputHandler = (e: { target: { name: string, value: string } }) => {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  const selectHandler = (e: { value: string, label: string }, name: string) => {
    setData({ ...data, [name]: e.value })
  }
  return (
    <>
      <h1>Laptop Price Prediction</h1>

      <div className='flex'>
        <div className=''><input onChange={inputHandler} type="number" name="weight" placeholder='Enter Weight' /></div>
        <div className=''><input onChange={inputHandler} type="number" name="screen_size" placeholder='Enter Screen Size' /></div>
        <div className=''><Select onChange={(e: { value: string, label: string }) => selectHandler(e, 'company')} name="company" placeholder="Select Company" options={options?.company} /></div>
        <div className=''><Select onChange={(e: { value: string, label: string }) => selectHandler(e, 'type')} name="type" placeholder="Select Type Name" options={options?.type} /></div>
        <div className=''><Select onChange={(e: { value: string, label: string }) => selectHandler(e, 'ram')} name="ram" placeholder="Select Ram" options={options?.ram} /></div>
        <div className=''><Select onChange={(e: { value: string, label: string }) => selectHandler(e, 'touchscreen')} name="touchscreen" placeholder="Select Touch Screen" options={options?.tocuhscreen} /></div>
        <div className=''><Select onChange={(e: { value: string, label: string }) => selectHandler(e, 'ips')} name="ips" placeholder="Select IPS" options={options?.ips} /></div>
        <div className=''><Select onChange={(e: { value: string, label: string }) => selectHandler(e, 'resolution')} name="resolution" placeholder="Select Resolution" options={options?.resolution} /></div>
        <div className=''><Select onChange={(e: { value: string, label: string }) => selectHandler(e, 'cpu')} name="cpu" placeholder="Select Cpu Brand" options={options?.cpu} /></div>
        <div className=''><Select onChange={(e: { value: string, label: string }) => selectHandler(e, 'hdd')} name="hdd" placeholder="Select HDD" options={options?.hdd} /></div>
        <div className=''><Select onChange={(e: { value: string, label: string }) => selectHandler(e, 'ssd')} name="ssd" placeholder="Select SSD" options={options?.sdd} /></div>
        <div className=''><Select onChange={(e: { value: string, label: string }) => selectHandler(e, 'gpu')} name="gpu" placeholder="Select Gpu Brand" options={options?.gpu} /></div>
        <div className=''><Select onChange={(e: { value: string, label: string }) => selectHandler(e, 'os')} name="os" placeholder="Select OS" options={options?.os} /></div>
      </div>

      <div className='btn' style={{ marginTop: "5px" }}>
        <button className='calculate-button' onClick={predictPrice}>
          Predict
        </button>
      </div>

      <p>
        {JSON.stringify(result)}
      </p>


    </>
  )
}

export default App
