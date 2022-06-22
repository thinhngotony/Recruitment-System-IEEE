import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PrimaryButton } from "../components/Button/Button";
import Section, {
  SectionBody,
  SectionTitle,
} from "../components/Section/Section";

const Login = () => {
  const navigate = useNavigate();
  const [seedPhrase, setSeedPhrase] = useState("");
  const signUpHandler = async () => {
    const res = await axios({
      method: "GET",
      url: "http://localhost:3001/private-key",
    }).then((res) => setSeedPhrase(res.data.seedPhrase));

    if (res.status === 200) {
      navigate("/");
    }
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
      <div className="sign-up">
        <Section>
          <SectionTitle>Register a New Account</SectionTitle>
          <SectionBody>
            Remember And Save Your Seed Phrase:
            {seedPhrase && (
              <p style={{ background: "#f1f1f1", padding: "0.5rem", color: "#000", fontSize: "1.2rem" }}>
                {seedPhrase}
              </p>
            )}
          </SectionBody>
          {/* <SectionBody>
            <form>
              <TextField
                label="Username"
                type="text"
                name="userName"
                value={account.userName}
                onChange={inputChangeHandler}
              />
              <TextField
                label="Email"
                type="email"
                name="email"
                value={account.email}
                onChange={inputChangeHandler}
              />
              <TextField
                label="Password"
                type="password"
                name="password"
                value={account.password}
                onChange={inputChangeHandler}
              />
              <TextField
                label="Confirm password"
                type="password"
                name="confirmPassword"
                value={account.confirmPassword}
                onChange={inputChangeHandler}
              />
            </form>
          </SectionBody> */}
          <span>Don't have an account? </span>
          <span>
            <Link to="/login" style={{ color: "#3498D6" }}>
              Click to Sign in
            </Link>
          </span>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <PrimaryButton type="submit" onClick={signUpHandler}>
              Create an account
            </PrimaryButton>
          </div>
        </Section>
      </div>
    </div>
  );
};

export default Login;
