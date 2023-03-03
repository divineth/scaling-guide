import { PRESALE_CONTRACT_ADDRESS } from "@/constants/address";
import { Localhost, Mainnet, useEthers } from "@usedapp/core";
import { utils } from "ethers";
import { Contract } from "ethers";
import PRESALE_ABI from "../contracts/BreadPresale.json";

export function usePresaleContract() {
  return new Contract(
    PRESALE_CONTRACT_ADDRESS[Localhost.chainId],
    new utils.Interface(PRESALE_ABI)
  );
}
