import React, { useState, useEffect } from "react";
import axios from "axios";
import { StatsRow } from 'component'
import { db } from '../../firebase'
import "./styles.css";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const authToken = process.env.REACT_APP_FINN_HUB_TOKEN;

export default () => {
  const [stockData, setStockData] = useState([]);
  const [myStocks, setMyStocks] = useState([]);

  const getMyStocks = () => {
    db
    .collection('myStocks')
    .onSnapshot(snapshot => {
      let promises = [];
      let tempData = []
      snapshot.docs.map((doc) => {

        promises.push(getStockData(doc.data().ticker)
        .then(res => {
          tempData.push({
            id: doc.id,
            data: doc.data(),
            info: res.data
          })
        })
      )})
      Promise.all(promises).then(() => {
        setMyStocks(tempData);
      })
    })
  }

  const getStockData = (stock) => {
    return axios
      .get(`${BASE_URL}?symbol=${stock}&token=${authToken}`)
      .catch((error) => {
        console.error("Error", error.message);
      });
  };

  useEffect(() => {
    let tempStockData = [];
    const stockList = [
      "AAPL",
      "MSFT",
      "TSLA",
      "FB",
      "BABA",
      "UBER",
      "DIS",
      "SBUX",
    ];
    let promises = [];
    getMyStocks();
    stockList.map((stock) => {
      promises.push(
        getStockData(stock).then((res) => {
          tempStockData.push({
            name: stock,
            ...res.data,
          });
        })
      );
    });

    Promise.all(promises).then(() => {
      setStockData(tempStockData);
    });
  }, []);

  return (
    <div className="stats">
      <div className="stats__container">
        <div className="stats__header">
          <p>Stocks</p>
        </div>
        <div className="stats__content">
          <div className="stats__rows"></div>
          {myStocks.map((stock) => (
            <StatsRow 
              key={stock.data.ticker}
              name={stock.data.ticker}
              openPrice={stock.info.o}
              shares={stock.data.shares}
              price={stock.info.c}
            />
          ))}
        </div>
        <div className="stats__header stats__lists">
          <p>Lists</p>
        </div>
        <div className="stats__content">
          <div className="stats__rows">
            {stockData.map((stock) => (
              <StatsRow
                key={stock.name}
                name={stock.name}
                openPrice={stock.o}
                price={stock.c}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
