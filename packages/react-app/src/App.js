import React, { useState } from "react";
import { addresses, abis } from "@project/contracts";
import { ethers } from "ethers";
//import { Card, CardText, CardBody } from "reactstrap";
//import { bigNumberify } from "ethers/utils";
import "./App.css";

async function queryBeaconNode(path) {
  const url = "http://163.172.177.34:8080" + path;
  var response = await (await fetch(url)).json();
  console.log(response);
}

function handleDepositEvent(pubkey, withdrawl_creds, amount, signature, index) {
  console.log("Pubkey", pubkey);
}

const { inputs, handleInputChange, handleSubmit } = usePathForm();
const [result, setResult] = useState("no query results");
const [newDeposits, setNewDeposits] = useState("waiting for new deposits...");

const usePathForm = callback => {
  const [inputs, setInputs] = useState({});
  const handleSubmit = event => {
    if (event) {
      event.preventDefault();
    }
    queryBeaconNode(inputs.newQueryPath);
  };
  const handleInputChange = event => {
    event.persist();
    setInputs(inputs => ({
      ...inputs,
      [event.target.name]: event.target.value
    }));
  };

  return {
    handleSubmit,
    handleInputChange,
    inputs
  };
};

function App() {
  const goerliProvider = ethers.getDefaultProvider("goerli");
  const valRegistration = new ethers.Contract(
    addresses.depositContractLighthouse,
    abis.validatorRegistration,
    goerliProvider
  );
  valRegistration.on("DepositEvent", handleDepositEvent);

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <div>
          <label>Path</label>
          <input
            type="text"
            name="newQueryPath"
            onChange={handleInputChange}
            value={inputs.newQueryPath}
            required
          />
        </div>
      </form>

      <h3>Query Result</h3>
      <p>{result}</p>
      <h3>New Deposit</h3>
    </div>
  );
}

export default App;
