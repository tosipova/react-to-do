import React from 'react';
import './App.css';

const FormInput = ({ label, type, value, onChange }) =>
  (
    <label htmlFor={type} className="input-form">
      {label}
      <input
        type="text"
        id={type}
        value={value}
        onChange={onChange}
      />
    </label>
  );

const SchouldIBuy = () => {

  const [price, setPrice] = React.useState(1800)
  const [frequency, setFrequency] = React.useState(8)
  const [duration, setDuration] = React.useState(36)
  const [result, setResult] = React.useState("")
  const [caseName, setCaseName] = React.useState("MacBook")
  const [cases, setCases] = React.useState([])

  React.useEffect(() => {
    calculate({ price, frequency, duration })
  }, [price, frequency, duration])

  const save = () => {
    const savedCase = { caseName, price, frequency, duration, result }
    setCases([...cases, savedCase])
  }
  const calculate = ({ price, frequency, duration }) => {
    if (price && frequency && duration) {
      const result = price / (duration * frequency * 30)
      const roundedResult = Math.round(result * 100) / 100
      setResult(roundedResult)
    } else {
      setResult(null)
    }
  }
  const clearAll = () => {
    setPrice('')
    setFrequency('')
    setDuration('');
  }
  console.log('Render...')
  return (
    <div className="app">
      <div className="todo-heading">Should you buy it?</div>
      <div className="todo-heading"><img alt="should i buy it" src="shouldIBuyPic.jpeg" width={150} /></div>
      <form className="todo-form">
        <FormInput label="Case name" type="caseName" value={caseName} onChange={(e) => setCaseName(e.target.value)} />
        <FormInput label="Price of item you wish to buy in EUR" type="price" value={price} onChange={(e) => setPrice(e.target.value)} />
        <FormInput label="How often will you use it in hours per day" type="frequency" value={frequency} onChange={(e) => {
          setFrequency(e.target.value)
        }} />
        <FormInput {...{
          label: 'How long will you use it in months', type: "duration", value: duration,
          onChange: (e) => setDuration(e.target.value)
        }} />
      </form>
      <div className="todo-form">
        <div>Result:{`${result} Euro/Month` || ' Provide all values please'} </div>
        <div>
          <button type="button" onClick={() => clearAll()}>Reset</button>
          <button type="button" onClick={() => save()}>Save</button>
        </div>
        {cases.length > 0 && <div className="todo-list">
          {cases.map((ourCase, index) =>
            <div key={index} className="todo">
              {`${ourCase.caseName}: price:${ourCase.price}, duration:${ourCase.duration / 12}, frequency:${ourCase.frequency}, result:${ourCase.result}`}
            </div>)}
        </div>}
      </div>
    </div>
  );
}

export default SchouldIBuy;