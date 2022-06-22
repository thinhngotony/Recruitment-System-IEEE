import React, { Component } from "react";
import MyToken from "./contracts/MyToken.json";
import MyTokenSale from "./contracts/MyTokenSale.json";
import KycContract from "./contracts/KycContract.json";
import getWeb3 from "./getWeb3";

import "./App.css";
import services from "./services/transactionsServices";

class App extends Component {
  status = {
    1: "Applying",
    2: "Working",
    0: "Free",
  };
  state = {
    loaded: false,
    kycAddress: "",
    tokenSaleAddress: null,
    userTokens: 0,
    userStatus: "Free",
    userOTP: "",
    checkedOTP: true,
    statusCheckOTP: "",
  };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      this.web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      this.accounts = await this.web3.eth.getAccounts();

      // Get the contract instance.
      this.networkId = await this.web3.eth.net.getId();

      this.tokenInstance = new this.web3.eth.Contract(
        MyToken.abi,
        MyToken.networks[this.networkId] &&
          MyToken.networks[this.networkId].address
      );

      this.tokenSaleInstance = new this.web3.eth.Contract(
        MyTokenSale.abi,
        MyTokenSale.networks[this.networkId] &&
          MyTokenSale.networks[this.networkId].address
      );
      this.kycInstance = new this.web3.eth.Contract(
        KycContract.abi,
        KycContract.networks[this.networkId] &&
          KycContract.networks[this.networkId].address
      );

      //this.function = new this.web3.eth.Contract()
      //Remove.abi
      //Remove.networks[this.networkID] && Remove.networks[this,networkID].address,
      //);

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.listenToTokenTransfer();
      this.setState(
        {
          loaded: true,
          tokenSaleAddress: MyTokenSale.networks[this.networkId].address,
        },
        this.updateUserTokens
      );
      console.log(this.state);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }
  };

  updateUserTokens = async () => {
    let userTokens = await this.tokenInstance.methods
      .balanceOf(this.accounts[0])
      .call();
    this.setState({ userTokens: userTokens });
  };

  listenToTokenTransfer = () => {
    this.tokenInstance.events
      .Transfer({ to: this.accounts[0] })
      .on("data", this.updateUserTokens);
  };

  handleBuyTokens = async () => {
    await this.tokenSaleInstance.methods.buyTokens(this.accounts[0]).send({
      from: this.accounts[0],
      value: this.web3.utils.toWei("1", "wei"),
    });
    try {
      const data = {
        from: this.accounts[0],
        to: this.state.tokenSaleAddress,
        status: Number(this.state.userTokens) + 1,
      };
      console.log("data", data);
      const response = await services.addTransaction(data);
      console.log("response", response);
    } catch (error) {
      console.log(error);
    }
  };

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      ...this.state,
      [name]: value,
    });
  };

  handleKycWhitelisting = async () => {
    await this.kycInstance.methods
      .setKycCompleted(this.state.kycAddress)
      .send({ from: this.accounts[0] });
    alert("KYC for " + this.state.kycAddress + " is completed");
  };

  handleCheckOTP = async () => {
    const data = await services.getOtp(this.accounts);
    console.log(data);
    if (!this.state.userOTP) {
      this.setState({
        ...this.state,
        statusCheckOTP: "OTP is required!",
      });
    }
    if (data) {
      if (this.state.userOTP === data.otp.toString()) {
        this.setState({
          ...this.state,
          checkedOTP: false,
          statusCheckOTP: "",
        });
      } else {
        this.setState({
          ...this.state,
          statusCheckOTP: "OTP not matched!",
        });
      }
    }
  };

  render() {
    if (!this.state.loaded) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    console.log(this.state);
    return (
      <div className="App">
        <h1>COMPANY</h1>
        <h2>Kyc Whitelisting</h2>
        <div className="input-group">
          <label htmlFor="input-kyc">Address to allow:</label>
          <input
            id="input-kyc"
            type="text"
            name="kycAddress"
            value={this.state.kycAddress}
            onChange={this.handleInputChange}
            size="45"
            placeholder="Enter you KYC..."
          />
          <button type="button" onClick={this.handleKycWhitelisting}>
            Add to Whitelist
          </button>
          <br />
        <br />
          Your connecting address: <b>{this.accounts}</b>
        </div>
        <br />
        <br />
        <hr />
        <h1>USERS</h1>
        <h2>Google is Hiring!</h2>
        <p>
          Get Google Job Tokens today by email your CV to this address{" "}
          <strong>career@google.com</strong>{" "}
        </p>
        Your connecting address: <b>{this.accounts}</b>
        <br></br>
        <br></br>
        You currently have: <b>{this.state.userTokens}</b> GG Tokens
        <br></br>
        <br></br>
        <div>
          <label>Your Status:</label>
          <input
            type="text"
            name="status"
            value={this.status[this.state.userTokens]}
            onChange={this.handleInputChange}
            disabled
          />
        </div>
        <br />
        <div>
          <label htmlFor="input-otp">Your OTP:</label>
          <input
            id="input-otp"
            type="text"
            name="userOTP"
            value={this.state.userOTP}
            onChange={this.handleInputChange}
            placeholder="Enter OTP..."
          />
          <button type="button" onClick={this.handleCheckOTP}>
            Check
          </button>
        </div>
        {this.state.statusCheckOTP && (
          <p style={{ color: "red", fontWeight: "500" }}>
            {this.state.statusCheckOTP}
          </p>
        )}
        <br></br>
        <button
          type="button"
          onClick={this.handleBuyTokens}
          disabled={this.state.checkedOTP}
        >
          Claim GG token
        </button>
        <br />
        <br />
        <button
          type="button"
          onClick={this.handleRecognition}
          disabled={this.state.userTokens > 0 ? false : true}
        >
          {this.state.userTokens > 0 ? (
            <a
              href="http://localhost:3001/api/files/training.zip"
              target="_blank"
              rel="noopener noreferrer"
            >
              Download module training face
            </a>
          ) : (
            "Download module training face"
          )}
        </button>
        <br></br>
        <br></br>
      </div>
    );
  }
}

export default App;
