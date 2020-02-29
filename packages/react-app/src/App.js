import React, { useState } from "react";
import { addresses, abis } from "@project/contracts";
import { ethers } from "ethers";
import { Card, CardText, CardBody } from "reactstrap";
//import { bigNumberify } from "ethers/utils";
import "./App.css";

async function queryBeaconNode(setCount, path) {
  const url = "http://163.172.177.34:8080" + path;
  var response = await (await fetch(url)).json();
  setCount(response);
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
  const [result, setResult] = useState("hi");
  return (
    <div className="App">
      <button
        onClick={() => queryBeaconNode(setResult, "/beacon/validators")}
        style={{ background: "red" }}
      >
        queryBeaconNode
      </button>
      <Card>
        <CardBody>
          <CardText>{result}</CardText>
        </CardBody>
      </Card>
    </div>
  );
}

export default App;
