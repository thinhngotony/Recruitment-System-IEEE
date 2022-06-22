import React, { useEffect, useState } from "react";
import CardTransactions from "../components/Card/CardTransactions";
import transactionsServices from "../services/transactionsServices";
const Home = () => {
  const [transactions, setTransactions] = useState([]);
  useEffect(() => {
    const getAllTransactions = async () => {
      try {
        const response = await transactionsServices.getAllTransactions();
        setTransactions(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getAllTransactions();
  }, []);
  return (
    <div className="home mt-1">
      <div className="row">
        <div className="col col-12">
          {transactions.length && <CardTransactions item={transactions} />}
        </div>
      </div>
    </div>
  );
};

export default Home;
