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
  console.log(response)
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

  // use effects or....?

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
        stateRoot='0xd45574d178e423c44b0beefa087c1428a51fe2fce245a1c1cb6fa9bff40beeab'
        pubKey='0x8d113df94d1833dbc22eb4ffc3494431f11ffe88c0aba18da325a30bccaf663b0cfcc58fb034fa8a8fc9326f6e77e61a'>
      </ValidatorInfo>
    </div>

  );
}

export default App;
