import React from "react";
import { addresses, abis } from "@project/contracts";
import { ethers } from "ethers";
//import { bigNumberify } from "ethers/utils";
import "./App.css";
import ValidatorInfo from './ValidatorInfo'


async function queryBeaconNode() {
  const url = "http://163.172.177.34:8080";
  const path = "/beacon/heads";
  var response = await (await fetch(url + path)).json();
  console.log(response);
}



function handleDepositEvent(pubkey, withdrawl_creds, amount, signature, index) {


  console.log("Pubkey", pubkey);
}

function App() {

 // const [validatorId, setValidatorId] = React.useState('foo');

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

    <div>
      {/*{validatorId} is ready to validate*/}
      <ValidatorInfo pubKey=""></ValidatorInfo>
    </div>
    </div>

  );
}

export default App;
