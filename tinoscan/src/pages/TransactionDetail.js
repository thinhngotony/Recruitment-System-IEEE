// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import blockchainApi from '../api/blochainApi';
// // import CardTransaction from '../components/Card/CardTransaction';
// // import transactions from '../assets/fake-data/transactions';

// const Transaction = () => {
//   const { id } = useParams();
//   const [transactions, setTransactions] = useState([]);
//   useEffect(() => {
//     const getTransactions = async () => {
//       try {
//         const response = await blockchainApi.getTransactionsList();
//         setTransactions(response);
//       }
//       catch {
//         console.log("error");
//       }
//     }
//     getTransactions();
//   }, []);
//   return (
//     <div className="transaction mt-1">
//       <div className="container">
//         {
//           transactions.length !== 0 && <CardTransaction item={transactions.filter(element => element.id === id)}/>
//         }
//       </div>
//     </div>
//   )
// }

// export default Transaction