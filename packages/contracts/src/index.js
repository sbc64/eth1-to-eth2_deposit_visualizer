import erc20Abi from "./abis/erc20";
import ownableAbi from "./abis/ownable";
import validatorRegistraionAbi from "./abis/validator_registration";

export const abis = {
  erc20: erc20Abi,
  ownable: ownableAbi,
  validatorRegistraion: validatorRegistraionAbi
};

export { default as addresses } from "./addresses";
