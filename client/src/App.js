import React, { Component } from "react";
import MyToken from "./contracts/MyToken.json";
import MyTokenSale from "./contracts/MyTokenSale.json";
import KycContract from "./contracts/KycContract.json";
import getWeb3 from "./getWeb3";

import "./App.css";

class App extends Component {
  status = {
    "1": "Applying",
    "2": "Working",
    "0": "Free"
  }
  otp = {
    "0x8AcaEEF29444ed2070CAd84B1d17Be4F13A8Cdbc": "0000",
    "0x297c8DC19eb56E0E49dB99860D4FE6554900bc14": "9999"
  }
  state = { loaded:false, kycAddress: "", tokenSaleAddress: null, userTokens:0, userStatus: "Free", userOTP: ""

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
        MyToken.networks[this.networkId] && MyToken.networks[this.networkId].address,
      );

      this.tokenSaleInstance = new this.web3.eth.Contract(
        MyTokenSale.abi,
        MyTokenSale.networks[this.networkId] && MyTokenSale.networks[this.networkId].address,
      );
      this.kycInstance = new this.web3.eth.Contract(
        KycContract.abi,
        KycContract.networks[this.networkId] && KycContract.networks[this.networkId].address,
      );

      //this.function = new this.web3.eth.Contract()
      //Remove.abi
      //Remove.networks[this.networkID] && Remove.networks[this,networkID].address,
      //);

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.listenToTokenTransfer();
      this.setState({loaded:true, tokenSaleAddress:MyTokenSale.networks[this.networkId].address}, this.updateUserTokens);
      console.log(this.state)
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  updateUserTokens = async () => {
    let userTokens = await this.tokenInstance.methods.balanceOf(this.accounts[0]).call();
    this.setState({userTokens: userTokens });
  }

  listenToTokenTransfer = () => {
    this.tokenInstance.events.Transfer({to: this.accounts[0]}).on("data", this.updateUserTokens);
  }
  

  handleBuyTokens = async() => {
      await this.tokenSaleInstance.methods.buyTokens(this.accounts[0]).send({from: this.accounts[0], value: this.web3.utils.toWei("1","wei")});
  }


  handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  handleKycWhitelisting = async () => {
    await this.kycInstance.methods.setKycCompleted(this.state.kycAddress).send({from: this.accounts[0]});
   alert("KYC for "+this.state.kycAddress+" is completed");
  }

  render() {
    if (!this.state.loaded) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>Server Side</h1>
        <h2>Kyc Whitelisting</h2>
        Address to allow: <input type="text" name="kycAddress" value={this.state.kycAddress} onChange={this.handleInputChange} size="45"/>
        <button type="button" onClick={this.handleKycWhitelisting}>Add to Whitelist</button>

        <h1>__________________________________________________________________________</h1>
        <h1>Google is Hiring!</h1>
        <p>Get Google Job Tokens today by email your CV to this address <strong>career@google.com</strong> </p>
        Your account address: {this.accounts}<br></br><br></br>
        You currently have: {this.state.userTokens} GG Tokens<br></br><br></br>
        Your Status: <input type="text" name="status" value={this.status[this.state.userTokens]} onChange={this.handleInputChange} disabled/><br></br><br></br>
        Your OTP: <input type="text" name="otp" value={this.otp[this.state.kycAddress]} onChange={this.handleInputChange} /><br></br><br></br>
        <button type="button" onClick={this.handleBuyTokens}>Claim GG token</button><br></br><br></br>
        <button type="button" onClick={this.handleRecognition}onChange={this.handleInputChange} disabled>Download module training face</button><br></br><br></br>
      </div>
    );
  }
}
  
export default App;
