import React, { useState } from "react";
import { addresses, abis } from "@project/contracts";
import { ethers } from "ethers";
//import { bigNumberify } from "ethers/utils";
import "./App.css";

async function queryBeaconNode(path) {
  const url = "http://163.172.177.34:8080" + path;
  return await (await fetch(url)).json();
}

async function queryAllValidators(setFunction) {
  const result = await queryBeaconNode("/beacon/validators/all");
  console.log("RESULT: ", result);
  setFunction(JSON.stringify(result));
}

function App() {
  const [resultAllValidators, setAllvalidators] = useState("No queries yet...");
  const [depositEvent, setDepositEvent] = useState("No deposits yet...");

  const goerliProvider = ethers.getDefaultProvider("goerli");
  const valRegistration = new ethers.Contract(
    addresses.depositContractLighthouse,
    abis.validatorRegistration,
    goerliProvider
  );
  function handleDepositEvent(
    pubkey,
    withdrawl_creds,
    amount,
    signature,
    index
  ) {
    let value = "pubkey: " + pubkey + "\n";
    value = value + "withdrawl_credds: " + withdrawl_creds + "\n";
    value = value + "amount: " + amount + "\n";
    value = value + "siganature: " + signature + "\n";
    value = value + "index: " + index + "\n";
    setDepositEvent(value);
  }

  valRegistration.on("DepositEvent", handleDepositEvent);

  return (
    <div className="App">
      <div>
        <button
          onClick={() => queryAllValidators(setAllvalidators)}
          style={{ background: "red" }}
        >
          queryAllValidators
        </button>
        <h4>Query results</h4>
        <p style={{ height: "300px", overflowY: "scroll" }}>
          {resultAllValidators}
        </p>
      </div>
      <div>
        <h4>Deposit Events</h4>
        <p>{depositEvent}</p>
      </div>
    </div>
  );
}

export default App;
