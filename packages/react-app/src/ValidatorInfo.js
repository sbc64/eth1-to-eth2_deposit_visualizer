import React, {useState} from "react";
// import { addresses, abis } from "@project/contracts";
// import { ethers } from "ethers";
// //import { bigNumberify } from "ethers/utils";
// import "./App.css";
// list of useful api endpoints
// these differ by service

// lighthouse
// /beacon/validators	Query for one or more validators.
// /beacon/validators/active	Get all active validators.
// /beacon/validators/all


// const server = 'http://163.172.177.34:8080/'
// const path  =  'http://163.172.177.34:8080'








export default function ValidatorInfo(props) {


const [results, setResults] = useState('no results')

// const [validatorInfo, setValidatorInfo] = useState({})
const [activationEligibilityEpoch, setActivationEligibilityEpoch] = useState('');
const [activationEpoch, setActivationEpoch] = useState('');

const fetchValidatorByPubKey = async (pubKey, stateRoot) => {
    let response;

    const url = 'http://163.172.177.34:8080/beacon/validators'
    const data = {
       state_root: stateRoot,
       pubkeys: [pubKey]
    }
     return await postData(url, data)
}



const postData = async (url = '', data = {}) => {
  //@todo try / catch
  const response = await fetch(url, {
    method: 'POST',
    mode: 'cors',
     body: JSON.stringify(data)
  });


    let validatorInfo;
   if (typeof response !== 'string' && response.ok === true) {
        validatorInfo = await response.json();
        setActivationEligibilityEpoch(validatorInfo[0].validator.activation_eligibility_epoch)
        setActivationEpoch(validatorInfo[0].validator.activation_epoch)
        console.log(response)
        console.log(validatorInfo)
   } else {
       // fail nicely
   }



//    const moo = await response.JSON();
  //return await response.to;

//   setResults(moo)
 // console.log('RESULTS', results)

   // console.log(response)

  //return await response.json(); // parses JSON response into native JavaScript objects
}


//const [validatorId, setValidatorId] = useState('foo');
// setState when we grab stuff
// can we have an object?
// console.log(props)
//  const moo = await fetchValidatorByPubKey(props.pubKey, props.stateRoot);

 fetchValidatorByPubKey(props.pubKey, props.stateRoot);
 //console.log('MOO', moo);

    return (
        <div>Here's some info Eligible from Epoc {activationEligibilityEpoch}  Activation Epoch {activationEpoch}</div>
    )
}


/*


async function postData(url = '', data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *client
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return await response.json(); // parses JSON response into native JavaScript objects
}

postData('https://example.com/answer', { answer: 42 })
  .then((data) => {
    console.log(data); // JSON data parsed by `response.json()` call
  });




*/




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
