import React from "react";
import logo from "./ethereumLogo.png";
import { addresses, abis } from "@project/contracts";
import { gql } from "apollo-boost";
import { ethers } from "ethers";
import { bigNumberify } from "ethers/utils";
import { useQuery } from "@apollo/react-hooks";
import "./App.css";

const GET_TRANSFERS = gql`
  {
    transfers(first: 10) {
      id
      from
      to
      value
    }
  }
`;

async function readOnchainBalance() {
  const goerliProvider = ethers.getDefaultProvider("goerli");
  const defaultProvider = ethers.getDefaultProvider();
  const ceaErc20 = new ethers.Contract(
    addresses.ceaErc20,
    abis.erc20,
    defaultProvider
  );
  console.log(ceaErc20);
  const tokenBalance = await ceaErc20.balanceOf(
    "0x3f8CB69d9c0ED01923F11c829BaE4D9a4CB6c82C"
  );
  //console.log({ tokenBalance: tokenBalance.toString() });

  const valRegistration = new ethers.Contract(
    addresses.despositContractPrysm,
    abis.validatorRegistration,
    goerliProvider
  );
  var data = bigNumberify(await valRegistration.get_deposit_count());
  console.log(data.toString());
  valRegistration.on("DepositEvent", input => {
    console.log("HI event", input);
  });
}

function App() {
  const { loading, error, data } = useQuery(GET_TRANSFERS);

  React.useEffect(() => {
    if (!loading && !error && data && data.transfers) {
      readOnchainBalance();
    }
  }, [loading, error, data]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="react-logo" />
        <p>
          Edit <code>packages/react-app/src/App.js</code> and save to reload.
        </p>
        <button
          onClick={() => readOnchainBalance()}
          style={{ display: "none" }}
        >
          Read On-Chain Balance
        </button>
        <a
          className="App-link"
          href="https://ethereum.org/developers/#getting-started"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn Ethereum
        </a>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
          style={{ marginTop: "0px" }}
        >
          Learn React
        </a>
        <a
          className="App-link"
          href="https://thegraph.com/docs/quick-start"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn The Graph
        </a>
      </header>
    </div>
  );
}

export default App;
