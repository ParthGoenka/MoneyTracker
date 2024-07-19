import {useEffect, useState } from 'react'
import './App.css'





function App() {
  const [name, setName] = useState("");
  const [datetime, setDatetime] = useState("");
  const [description, setDescription] = useState("");
  const [transactions, setTransactions] = useState([]);
 

  async function getTransactions(){
    const url = import.meta.env.VITE_API_URL+'/transactions';
    const response = await fetch(url);
    return await response.json();
    
  }

  function addNewTransaction(ev){
    ev.preventDefault();
    const url = import.meta.env.VITE_API_URL+'/transaction';
    const price = name.split(" ")[0];
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ price,
         name :name.substring(price.length+1),
          datetime, description })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json(); // Return the parsed JSON promise to the next `.then()`
    })
    .then(json => {
      setName("");
      setDatetime("");
      setDescription("");
      location.reload();
    })
    .catch(error => console.error('Error fetching data:', error.message)); // Catch any errors and log the error message
    
  }

  useEffect(() => {
    getTransactions().then(setTransactions);
  }, []);

  let balance =0;
  for(const transaction of transactions){
    balance += transaction.price;
  }


  return (
    <>
     <main>
      <h1>₹{balance}</h1>
      <form onSubmit={addNewTransaction}>
        <div className="basic">
          <input type="text" value ={name} 
          onChange={ev => setName(ev.target.value)}
          placeholder={"Amount(+/-) & Title"} />
          <input type="datetime-local" value ={datetime} 
          onChange={ev => setDatetime(ev.target.value)}/>      
        </div>
        <div className='description'>
          <input type="text" placeholder={"Description"} value ={description} 
          onChange={ev => setDescription(ev.target.value)}/>
        </div>
        <button type="submit">Add</button>
      </form>
      <div className="transactions">
        {transactions.length > 0 && transactions.map(transaction => (

                <div className="transaction">
                <div className="left">
                  <div className="name">{transaction.name}</div>
                  <div className="descpro">{transaction.description}</div>
                </div>
                <div className="right">
                  <div className={"price " + (transaction.price<0 ?'red':'green')}>
                  {transaction.price}</div>
                  <div className="datetime">{transaction.datetime}</div>
                </div>
                </div>

        ))}
       
        
      </div>
     </main>
    </>
  );
}

export default App
