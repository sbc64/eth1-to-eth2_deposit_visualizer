import React, { useState } from "react";
import { Collapse, Button, CardBody, Card } from "reactstrap";
import "./App.css";

const DisplayDeposit = props => {
  let [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  let url = "https://goerli.etherscan.io/block/" + props.eth1Block;
  return (
    <div>
      <Collapse
        onClick={toggle}
        isOpen={isOpen}
        style={{ borderStyle: "dotted" }}
      >
        <p>Account: {props.withdrawl_credentials}</p>
        <a href={url}>ETH1Block: {props.eth1Block}</a>
        <p>Votes: {props.votes.length}</p>
      </Collapse>
    </div>
  );
};

export default DisplayDeposit;
