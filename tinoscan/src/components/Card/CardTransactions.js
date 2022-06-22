import React from "react";
import { Link } from "react-router-dom";
import "./CardTransactions.scss";
import moment from "moment";

const CardTransactions = ({ item }) => {
  const status = {
    0: "Free",
    1: "Applying",
    2: "Working",
  };
  return (
    <div className="card-transactions">
      <div className="card-transactions__header">Lastest Transactions</div>
      <div className="card-transactions__body">
        <div className="card-transactions__list">
          {item.map((transaction) => (
            <div className="card-transactions__item row" key={transaction._id}>
              <div className="col col-4 card-transactions__item__info">
                <div className="card-transactions__item__img">
                  <span className="card-transactions__item__img__text">Ts</span>
                </div>
                <div className="card-transactions__item__name">
                  <Link to={`/transaction/${transaction._id}`}>
                    {`${transaction._id}`}
                  </Link>
                  <div>
                    {moment(
                      new Date(transaction.createdAt),
                      "YYYYMMDD"
                    ).fromNow()}
                  </div>
                </div>
              </div>
              <div className="col col-8 card-transactions__item__transaction">
                <div className="card-transactions__item__company">
                  <span>
                    <span>From: </span>
                    <span>{`${transaction.from}`}</span>
                  </span>
                  <div>
                    <span>To: </span>
                    <span>{`${transaction.to}`}</span>
                  </div>
                </div>
                <div className="card-transactions__item__cost">
                  <span>{status[transaction.status]}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="card-transactions__footer">
        <Link to="/transactions">View all transaction</Link>
      </div>
    </div>
  );
};

export default CardTransactions;
