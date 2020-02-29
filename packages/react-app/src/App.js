import React, {useState} from "react";
import { addresses, abis } from "@project/contracts";
import { ethers } from "ethers";
//import { bigNumberify } from "ethers/utils";
import "./App.css";
import ValidatorInfo from './ValidatorInfo'

async function queryBeaconNode() {
  const url = "http://163.172.177.34:8080";
  const path = "/beacon/head";
  const response = await (await fetch(url + path)).json();

  // then make another request?
  return response;
}



function handleDepositEvent(pubkey, withdrawl_creds, amount, signature, index) {
  console.log("Pubkey", pubkey);
}

function App() {

 // const [stateRoot, setStateRoot] = useState('')

  const [validatorId, setValidatorId] = useState('foo');
  const [stateRoot, setStateRoot] = useState('');

  const goerliProvider = ethers.getDefaultProvider("goerli");
  const valRegistration = new ethers.Contract(
    addresses.depositContractLighthouse,
    abis.validatorRegistration,
    goerliProvider
  );
  valRegistration.on("DepositEvent", handleDepositEvent);
  return (
    <div className="App">

      <button onClick={() => queryBeaconNode()} style={{ background: "red" }}>
        queryBeaconNode
      </button>

      {/*{validatorId} is ready to validate*/}
      <ValidatorInfo
        stateRoot='0xea81f5735fc0d76aea8e2c0dd9a6da7b7b1aa69fe26f152bce1938aa81dbb0f8'
        pubKey='0x949d64d2942c9c084d8614c7037cbe54e9583137bfdd025b47ffc186714e6196dcf597cbae4a5a5a312f7a58d208b854'>
      </ValidatorInfo>
    </div>

  );
}

export default App;
