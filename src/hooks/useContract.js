import { PRESALE_CONTRACT_ADDRESS } from "@/constants/address";
import { Arbitrum } from "@usedapp/core";
import { utils } from "ethers";
import { Contract } from "ethers";
import PRESALE_ABI from "../contracts/BreadPresale.json";

export function usePresaleContract() {
  return new Contract(
    PRESALE_CONTRACT_ADDRESS[Arbitrum.chainId],
    new utils.Interface(PRESALE_ABI)
  );
}
