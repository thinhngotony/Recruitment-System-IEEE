import axios from "axios";
const baseURL = "http://localhost:3001/api";

const transactionsServices = {
  async addTransaction(data) {
    try {
      const response = await axios
        .post(`${baseURL}/transactions/transaction`, data)
        .then((res) => res.data);
      // const res = await fetch(`${baseURL}/transactions/transaction`, {
      //   method: "POST",
      //   mode: "cors",
      //   body: JSON.stringify(data),
      // }).then((data) => data.json());
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  },
  async getOtp(address) {
    const data = await fetch(`${baseURL}/getOtp/${address}`)
      .then((res) => res.json())
      .then((data) => data.data);
    return data;
  },
};

export default transactionsServices;
