import React, {useState} from "react";
// import { addresses, abis } from "@project/contracts";
// import { ethers } from "ethers";
// //import { bigNumberify } from "ethers/utils";
// import "./App.css";


const fetchValidatorByPubKey = async () => {
 const response = await fetch('http://163.172.177.34:8080/beacon/validators/all');
 console.log(await response.json())
}


export default function ValidatorInfo() {

const [validatorId, setValidatorId] = useState('foo');

fetchValidatorByPubKey();

return (
    <div>Here's some info</div>
)

}






// async function queryBeaconNode() {
//   const url = "http://163.172.177.34:8080";
//   const path = "/beacon/heads";
//   var response = await (await fetch(url + path)).json();
//   console.log(response);
// }
//
//
//
// function handleDepositEvent(pubkey, withdrawl_creds, amount, signature, index) {
//
//   console.log("Pubkey", pubkey);
// }
//
// function App() {
//   const goerliProvider = ethers.getDefaultProvider("goerli");
//   const valRegistration = new ethers.Contract(
//     addresses.depositContractLighthouse,
//     abis.validatorRegistration,
//     goerliProvider
//   );
//   valRegistration.on("DepositEvent", handleDepositEvent);
//   return (
//     <div className="App">
//
//
//
//       <button onClick={() => queryBeaconNode()} style={{ background: "red" }}>
//         queryBeaconNode
//       </button>
//
//     <div>
//       {validatorId} is ready to validate
//     </div>
//
//   );
// }
//
// export default App;
