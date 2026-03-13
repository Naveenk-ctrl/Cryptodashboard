import React,{useState,useEffect} from 'react'
import './App.css'
const App = () => {
  const [cryptoData,setCryptoData]=useState([]);
     const [search,setSearch]=useState("");
     useEffect(()=>{
      const fetchCrypto=async()=>{
       try{
         const res= await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&page=1&sparkline=false");
       const data=await res.json();
       setCryptoData(data);
       
       }
       catch(err){
        console.log(err);
       }
      };
       fetchCrypto();
     },[]);
    const filteredCrypto=cryptoData.filter((coin)=>coin.name.toLowerCase().includes(search.toLowerCase()));
     const displayCoins=search?filteredCrypto:cryptoData.slice(0,20);




    
  return (
    <div className='container'>
      <h1 className='head'>CRYPTO PRICE TRACKING</h1>
      <input  type="text" placeholder="Search crypto.."  value={search}  onChange={(e)=>setSearch(e.target.value)}  className="in1"/>
      <table className='tb1'>
        <thead className='th1'>
          <tr>
            <th>Rank</th>
            <th>Logo</th>
            <th>Name</th>
            <th>Symbol</th>
            <th>Market Cap</th>
            <th>Price INR</th>
            <th>Criculating Supply</th>
          </tr>
        </thead>
        <tbody >
        { displayCoins.map((coin)=>(
             <tr key={coin.id}>
              <td>{coin.market_cap_rank}</td>
              <td><img src={coin.image} alt="" /></td>
              <td>{coin.name}</td>
              <td>{coin.symbol.toUpperCase()}</td>
              <td>{coin.market_cap.toString()}</td>
              <td>{coin.current_price}</td>
              <td>{coin.circulating_supply}</td>
             </tr>
         ))}
        </tbody>
      </table>
     
    </div>
  )
  
};

export default App
