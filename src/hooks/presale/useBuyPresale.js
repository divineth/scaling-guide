import { useContractFunction } from "@usedapp/core";
import { usePresaleContract } from "../useContract";

export const useBuyPresale = () => {
  const contract = usePresaleContract();

  const { state, send } = useContractFunction(contract, "buyPresale", {
    transactionName: "Buy Presale",
  });

  return { state, send };
};
