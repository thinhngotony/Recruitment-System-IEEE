import "./App.scss";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header/Header";
import Transaction from "./pages/TransactionDetail";
import Layout from "./components/Layout/Layout";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <div className="App">
      <Header />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />}/>
        </Routes>
      </Layout>
      {/* <Footer/> */}
    </div>
  );
}

export default App;
