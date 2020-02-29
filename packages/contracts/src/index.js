import erc20Abi from "./abis/erc20";
import ownableAbi from "./abis/ownable";
import validatorAbi from "./abis/validator_registration";

export const abis = {
  erc20: erc20Abi,
  ownable: ownableAbi,
  validatorRegistration: validatorAbi
};

export { default as addresses } from "./addresses";
