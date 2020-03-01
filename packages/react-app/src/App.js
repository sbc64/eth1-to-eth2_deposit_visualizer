import React, { useState } from "react";
import { addresses, abis } from "@project/contracts";
import { ethers } from "ethers";
//import { bigNumberify } from "ethers/utils";
import "./App.css";
import DisplayDeposit from "./DisplayDeposit";

async function queryBeaconNode(path, body) {
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

async function getEth1BlockStateVotes(slot) {
  let path = "/beacon/state?slot=" + slot;
  let result = await queryBeaconNode(path);
  let votes = result.beacon_state.eth1_data_votes;
  return votes;
}

async function getDepositData(slot) {
  //http://163.172.177.34:8080/beacon/block?slot=111107
  let path = "/beacon/block?slot=" + slot;
  let result = await queryBeaconNode(path);
  let credentials =
    result.beacon_block.message.body.deposits[0].data.withdrawal_credentials;
  let eth1Block = result.beacon_block.message.body.eth1_data.block_hash;
  return { credentials, eth1Block };
}

function App() {
  const [resultAllValidators, setAllvalidators] = useState("No queries yet...");
  const [depositCardList, setDepositCardList] = useState([]);

  const goerliProvider = ethers.getDefaultProvider("goerli");
  const valRegistration = new ethers.Contract(
    addresses.depositContractLighthouse,
    abis.validatorRegistration,
    goerliProvider
  );

  function showALLDeposits() {
    let slot = "111107";
    getEth1BlockStateVotes(slot).then(vote => {
      getDepositData(slot).then(data => {
        let buildTagList = [];

        buildTagList.push(
          <DisplayDeposit
            eth1Block={data.eth1Block}
            votes={vote}
            withdrawl_credentials={data.credentials}
          />
        );
        setDepositCardList(buildTagList);
      });
    });

    return depositCardList;
  }

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
    console.log("NEW DEPOSIT: ", value);
    let temp = depositCardList;
    temp.push(
      <DisplayDeposit
        eth1Block={index}
        votes={0}
        withdrawl_credentials={withdrawl_creds}
      />
    );
    setDepositCardList(temp);
  }
  valRegistration.on("DepositEvent", handleDepositEvent);

  /*
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
        {showALLDeposits()}
      </div>
    </div>
  );
  */
  return (
    <div className="App">
      <div>{showALLDeposits()}</div>
    </div>
  );
}

export default App;
