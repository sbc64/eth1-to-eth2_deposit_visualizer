import React, { useState } from "react";
import { addresses, abis } from "@project/contracts";
import { ethers } from "ethers";
//import { bigNumberify } from "ethers/utils";
import { Collapse, Button, CardBody, Card } from "reactstrap";
import "./App.css";

async function queryBeaconNode(path, body) {
  //console.log("PATH: ", path);
  //console.log("BODY: ", body);
  const url = "http://163.172.177.34:8080" + path;
  const response = await fetch(url, body);
  var R = await response.json();
  return R;
}

async function queryAllValidators(setFunction) {
  const result = await queryBeaconNode("/beacon/validators/all");
  setFunction(JSON.stringify(result));
}

async function fetchCanonicalHead() {
  var R = await queryBeaconNode("/beacon/head");
  return R;
}

async function countBackwards() {
  let latestSlot = await queryBeaconNode("/beacon/head");
  //let lowestSlot = 100000;
  let lowestSlot = 0;

  let slotsWithDeposits = [];
  for (var i = latestSlot.slot; i >= lowestSlot; i--) {
    let path = "/beacon/block?slot=" + i;
    let result = await queryBeaconNode(path);
    let deposits = result.beacon_block.message.body.deposits;
    if (deposits.length !== 0) {
      slotsWithDeposits.push(result.beacon_block.message.slot);
    }
  }
}

function displayDespoit() {
  return <div></div>;
}

function App() {
  const [resultAllValidators, setAllvalidators] = useState("No queries yet...");
  const [depositEvent, setDepositEvent] = useState("No deposits yet...");
  const [validator, setValidator] = useState("No deposits yet...");

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
    </div>
  );
}

export default App;
