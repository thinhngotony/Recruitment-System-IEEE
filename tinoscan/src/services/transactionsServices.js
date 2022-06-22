import axios from "axios";

const baseURL = "http://localhost:3001/api";

const services = {
  async getAllTransactions() {
    const data = axios
      .get(`${baseURL}/transactions/transaction`)
      .then((data) => data.data);
    console.log(data);
    return data;
  },
};

export default services;
