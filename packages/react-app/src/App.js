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

function handleDepositEvent(pubkey, withdrawl_creds, amount, signature, index) {
  console.log("Pubkey", pubkey);
}

function App() {
  const [resultAllValidators, setAllvalidators] = useState("No queries yet...");

  const goerliProvider = ethers.getDefaultProvider("goerli");
  const valRegistration = new ethers.Contract(
    addresses.depositContractLighthouse,
    abis.validatorRegistration,
    goerliProvider
  );
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
        <button
          onClick={() => queryAllValidators(setAllvalidators)}
          style={{ background: "red" }}
        >
          queryAllValidators
        </button>
        <h4>Query results</h4>
        <p>{}</p>
      </div>
    </div>
  );
}

export default App;
