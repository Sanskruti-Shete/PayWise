import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [transactions,setTransactions]=useState([]);
  useEffect(()=>{
    getTransactions().then(transactions=>{
      setTransactions(transactions);
    });
  },[]);

  async function getTransactions(){
    const url=process.env.REACT_APP_API_URL+'/transactions';
    const response=await fetch(url);
    return await response.json();
  }

  function addNewTransaction(ev){
    ev.preventDefault();
    const url=process.env.REACT_APP_API_URL+'/transaction';
    const price = name.split('')[0];
    fetch(url,{
      method:'POST',
      headers:{'Content-type':'application/json'},
      body: JSON.stringify({price,name:name.substring(price.length+1),description})
    }).then(response=>{
      response.json().then(result=>{
        setName('');
        setDescription('');
        console.log('result',result);
      });
    });
  }

  let balance=0;
  for(const transaction of transactions){
    balance=balance+transaction.price;
  }

  return (
    <div className="app-container">
      <div className="balance-section">
        <h1 className="balance-amount">Rs{balance}</h1>
      </div>

      <form onSubmit={addNewTransaction}>
        <div className="input-section">
          <input
            type="text"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
            placeholder="+200 new samsung tv"
            className="amount-input"
          />
          <input
            type="text"
            value={description}
            onChange={(ev) => setDescription(ev.target.value)}
            placeholder="description"
            className="description-input"
          />
          <button className="add-btn">Add new transaction</button>
        </div>
      </form>

      <div className="transactions-list">
        {transactions.length>0 && transactions.map(transaction=>(
          <div className="transaction-item">
          <div className="transaction-details">
            <h3>{transaction.name}</h3>
            <p>{transaction.description}</p>
          </div>
          <div className="transaction-right">
            <span className="transaction-amount negative">{transaction.price}</span>
            
          </div>
        </div>
        ))}
      </div>
    </div>
  );
}

export default App;
