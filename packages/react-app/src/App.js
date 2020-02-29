import React, { useState } from "react";
import { addresses, abis } from "@project/contracts";
import { ethers } from "ethers";
import { Card, CardText, CardBody } from "reactstrap";
//import { bigNumberify } from "ethers/utils";
import "./App.css";

async function queryBeaconNode(setResult, path) {
  const url = "http://163.172.177.34:8080" + path;
  var response = await (await fetch(url)).json();
  setResult(JSON.stringify(response));
}

function handleDepositEvent(pubkey, withdrawl_creds, amount, signature, index) {
  console.log("Pubkey", pubkey);
}

function App() {
  const goerliProvider = ethers.getDefaultProvider("goerli");
  const valRegistration = new ethers.Contract(
    addresses.depositContractLighthouse,
    abis.validatorRegistration,
    goerliProvider
  );
  valRegistration.on("DepositEvent", handleDepositEvent);
  const [result, setResult] = useState("No queries yet...");
  return (
    <div className="App">
      <button
        onClick={() => queryBeaconNode(setResult, "/beacon/validators/all")}
        style={{ background: "red" }}
      >
        queryBeaconNode
      </button>
      <h4>Query results</h4>
      <p>{result}</p>
    </div>
  );
}

export default App;
