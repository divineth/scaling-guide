import { Arbitrum, useCall } from "@usedapp/core";
import { usePresaleContract } from "../useContract";

export const useTotalCommitted = () => {
  const presaleContracct = usePresaleContract();

  const { value, error } =
    useCall(
      presaleContracct && {
        contract: presaleContracct,
        method: "totalPurchased",
        args: [],
      },
      { refresh: "5", chainId: Arbitrum.chainId }
    ) ?? {};

  if (error) {
    console.error(error.message);
    return undefined;
  }

  return value?.[0];
};
