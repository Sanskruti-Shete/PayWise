import React, { useState } from "react";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

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

  return (
    <div className="app-container">
      <div className="balance-section">
        <h1 className="balance-amount">$400.00</h1>
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
        <div className="transaction-item">
          <div className="transaction-details">
            <h3>New Samsung TV</h3>
            <p>It was time for new tv</p>
          </div>
          <div className="transaction-right">
            <span className="transaction-amount negative">-$500</span>
            <span className="transaction-date">2022-12-18 15:45</span>
          </div>
        </div>

        <div className="transaction-item">
          <div className="transaction-details">
            <h3>Gig job new website</h3>
            <p>It was time for new tv</p>
          </div>
          <div className="transaction-right">
            <span className="transaction-amount positive">+$400</span>
            <span className="transaction-date">2022-12-18 15:45</span>
          </div>
        </div>

        <div className="transaction-item">
          <div className="transaction-details">
            <h3>Iphone</h3>
            <p>It was time for new tv</p>
          </div>
          <div className="transaction-right">
            <span className="transaction-amount negative">-$900</span>
            <span className="transaction-date">2022-12-18 15:45</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
