import React from 'react';
import './App.css';

const FormInput = ({ label, type, value, onChange }) =>
    (
        <label htmlFor={type} >
            {label} <input
                type="text"
                id={type}
                className="input"
                value={value}
                onChange={onChange}
            />
        </label>
    );

const SchouldIBuy = () => {

    const [budget, setBudget] = React.useState("")
    const [price, setPrice] = React.useState("")
    const [frequency, setFrequency] = React.useState("")
    const [duration, setDuration] = React.useState("")
    const [result, setResult] = React.useState("")


    const calculate = () => {
        if (budget && price && frequency && duration) {
            console.log("All values valid, calculating...")
            const result = ((budget / price * 100) / budget) * duration
            setResult(result)
        }
    }

    const logRender = () => console.log('Render')

    return (
        <>
            {logRender()}
            <form className="todo-form">
                <FormInput label="Monthly budget?" type="budget" value={budget} onChange={(e) => setBudget(e.target.value)} />
                <FormInput label="Price" type="price" value={price} onChange={(e) => setPrice(e.target.value)} />
                <FormInput label="Frequency" type="frequency" value={frequency} onChange={(e) => setFrequency(e.target.value)} />
                <FormInput label="Usage duration" type="duration" value={duration} onChange={(e) => setDuration(e.target.value)} />
            </form>
            <button onClick={calculate}>Calculate now!</button>
            <div>Result:{result} </div>
        </>
    );
}


export default SchouldIBuy;