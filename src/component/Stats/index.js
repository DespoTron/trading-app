import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './styles.css'

const TOKEN  = "bv3abn748v6v86e863tg";
const BASE_URL = "https://finnhub.io/api/v1/quote";

export default () => {

  const [stockData, setStockData] = useState([])

  const getStockData = (stock) => {
    return axios
      .get(`${BASE_URL}?symbol=${stock}&token=${TOKEN}`)
      .catch((error) => {
        console.error("Error", error.message);
      })
  }

  useEffect(() => {
    let tempStockData = [];
    const stockList = ["AAPL", "MSFT", "TSLA", "FB", "BABA", "UBER", "DIS", "SBUX"];
    let promises = [];
    stockList.map((stock) => {
      promises.push(
        getStockData(stock)
        .then((res) => {
          tempStockData.push({
            name: stock,
            ...res.data
          });
        })
      )
    });

    Promise.all(promises).then(() =>{
      setStockData(tempStockData)
      console.log(tempStockData);
    })
  }, [])

  return (
    <div className="stats">
      <div className="stats__container">
        <div className="stats__header">
          <p>Stocks</p>
        </div>
        <div className="stats__content">
          <div className="stats__rows">
{/* for our current stocks */}
          </div>
        </div>
        <div className="stats__header">
          <p>Lists</p>
        </div>
        <div className="stats__content">
          <div className="stats__rows">
{/* stocks we can buy */}
          </div>
        </div>
      </div>
    </div>
  )
}