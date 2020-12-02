import React from 'react'
import './styles.css'
import { db } from '../../firebase'

export default (props) => {

  const percentage = ((props.price - props.openPrice)/props.openPrice) * 100;

  const fakeBuyStock = () => {
    db.collection('myStocks')
    .where("ticker", "==", props.name)
    .get()
    .then((querySnapshot) => {
      if(!querySnapshot.empty) {
        // update the record
        querySnapshot.forEach(function(doc) {
          //doc.data() is never undefined for query doc snapshots
          db.collection('myStocks')
          .doc(doc.id)
          .update({
            shares: doc.data().shares+=1
          })
        });
      } else {
        // Add a new record
        console.log("Not available");
      }
    })
  }

  return (
    <div className="row" onClick={fakeBuyStock}>
      <div className="row__intro">
        <h1>{props.name}</h1>
        <p>{props.shares &&
          (props.shares + " shares")
          } </p>
      </div>
      <div className="row__chart">
        <img src="/images/stock.svg" height={16} />
      </div>
      <div className="row__numbers">
        <p className="row__price">{props.price}</p>
        <p className="row__percentage">+{Number(percentage).toFixed(2)}%</p>
      </div>

    </div>
  )
}