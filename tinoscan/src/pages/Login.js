import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PrimaryButton } from "../components/Button/Button";
import Section, {
  SectionBody,
  SectionTitle,
} from "../components/Section/Section";
import TextField from "../components/TextField/TextField";

const Login = () => {
  const navigate = useNavigate();
  const [seedPhrase, setSeedPhrase] = useState("");
  const inputChangeHandler = (e) => {
    e.preventDefault();
    setSeedPhrase(e.target.value);
  };
  
  const loginHandler = () => {
    const checkExistedUser = async () => {
      const data = await axios({
        method: "POST",
        url: "http://localhost:3001/users/login",
        data: {seedPhrase}
      }).then(res => res.data);

      if (data) {
        window.localStorage.setItem("data", JSON.stringify(data));
        navigate("/profile");
      }
    }
    checkExistedUser();
  };    

  return (
    <div
      className="container mt-1"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "80vh",
      }}
    >
      <div className="login" style={{ maxWidth: "400px", width: "400px" }}>
        <Section>
          <SectionTitle>Welcome back</SectionTitle>
          <SectionBody>
            <form>
              <TextField
                label="Seed Phrase"
                type="text"
                name="seedPhrase"
                value={seedPhrase}
                onChange={inputChangeHandler}
              />
            </form>
          </SectionBody>
          <span>Don't have an account? </span>
          <span>
            <Link to="/signup" style={{ color: "#3498D6" }}>
              Click to sign up
            </Link>
          </span>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <PrimaryButton type="submit" onClick={loginHandler}>LOGIN</PrimaryButton>
          </div>
        </Section>
      </div>
    </div>
  );
};

export default Login;
