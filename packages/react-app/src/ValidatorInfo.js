import React, {useState} from "react";

// lighthouse
// /beacon/validators	Query for one or more validators.
// /beacon/validators/active	Get all active validators.
// /beacon/validators/all

export default function ValidatorInfo(props) {


const [results, setResults] = useState('no results')

// const [validatorInfo, setValidatorInfo] = useState({})
const [activationEligibilityEpoch, setActivationEligibilityEpoch] = useState('unknown');
const [activationEpoch, setActivationEpoch] = useState('unknown');

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

   try {
       validatorInfo = await response.json();
       setActivationEligibilityEpoch(validatorInfo[0].validator.activation_eligibility_epoch)
       setActivationEpoch(validatorInfo[0].validator.activation_epoch)
   }
    catch(error) {
      console.error(error);
    }
}

 fetchValidatorByPubKey(props.pubKey, props.stateRoot);
    return (
        <div>Here's some info Eligible from Epoc {activationEligibilityEpoch}  Activation Epoch {activationEpoch}</div>
    )
}
