import React from 'react';
import './App.css';

const FormInput = ({ label, type, value, onChange, disabled = false }) =>
  (
    <label htmlFor={type} className="input-form">
      {label}
      <input
        disabled={disabled}
        type="text"
        id={type}
        value={value}
        onChange={onChange}
      />
    </label>
  );


const InvReCalc = () => {

  const [price, setPrice] = React.useState(230000)
  const [propertyTax, setPropertytax] = React.useState("")
  const [notarCosts, setNotarcosts] = React.useState("")
  const [repairs, setRepairs] = React.useState(20000)
  const [monthlyRate, setMonthlyrate] = React.useState(1500)
  const [result, setResult] = React.useState("")
  const [examples, setExamples] = React.useState([])
  const [propertyName, setPropertyName] = React.useState("Seckenheimer str 77")

  // const [state, setState] = React.useState({price:230000, propertyTax:"",notarCosts})

  React.useEffect(() => {
    calculate()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [price, monthlyRate, repairs])

  const save = () => {
    const newExample = { propertyName, price, monthlyRate, notarCosts, propertyTax, repairs, result }
    setExamples([...examples, newExample])
  }
  const calculate = () => {
    if (price && monthlyRate && repairs) {
      const propertyTaxcalc = Number(price) * 0.05
      setPropertytax(propertyTaxcalc)

      const notarCostscalc = Number(price) * 0.01
      setNotarcosts(notarCostscalc)
      const totalInvestment = Number(price) + notarCostscalc + propertyTaxcalc + Number(repairs)
      const result = (monthlyRate * 12) / totalInvestment
      const rounded = (Math.round(result * 100) / 100) * 100
      console.log(typeof rounded)
      console.log("Calculate %s %s %s", result, rounded, rounded)
      setResult(rounded)
    } else {
      setResult(null)
    }
  }
  const clearAll = () => {
    setPrice("")
    setMonthlyrate("");
    setPropertyName("")
    setRepairs("")
    setPropertytax("")
    setNotarcosts("")
  }

  return (
    <div className="app">
      <div className="todo-heading">Investmet calculator</div>
      <div className="todo-heading"><img alt="should i buy it" src="shouldIBuyPic.jpeg" width={150} /></div>
      <form className="todo-form">
        <FormInput label="Property Address" type="propertyName" value={propertyName} onChange={(e) => setPropertyName(e.target.value)} />
        <FormInput label="Purchase price in EUR" type="price" value={price} onChange={(e) => setPrice(e.target.value)} />
        <FormInput label="Repairs" type="repairs" value={repairs} onChange={(e) => setRepairs(e.target.value)} />
        <FormInput label='Monthly rental rate in EUR' type="monthlyRate" value={monthlyRate} onChange={(e) => setMonthlyrate(e.target.value)} />
        <FormInput label="Notar cost" type="notarCosts" disabled={true} value={notarCosts} onChange={(e) => setNotarcosts(e.target.value)} />
        <FormInput label="Property Tax" type="propertyTax" disabled={true} value={propertyTax} onChange={(e) => setPropertytax(e.target.value)} />
      </form>
      <div className="todo-form">
        <div>Return on invsetment:{result ? `${result} %` : 'Provide all values please'} </div>
        <div>
          <button type="button" onClick={() => clearAll()}>Reset</button>
          <button type="button" onClick={() => save()}>Save</button>
        </div>
        {examples.length > 0 && <div className="todo-list">
          {examples.map((property, index) =>
            <div key={index} className="todo">
              {`${property.propertyName}: price:${property.price},monthlyRate:${property.monthlyRate}, result:${property.result}`}
            </div>)}
        </div>}
      </div>
    </div>
  );
}

export default InvReCalc;