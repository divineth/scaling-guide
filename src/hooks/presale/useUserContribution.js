import { Arbitrum, useCall } from "@usedapp/core";
import { usePresaleContract } from "../useContract";

export const useUserContribution = (account) => {
  const presaleContracct = usePresaleContract();

  const { value, error } =
    useCall(
      presaleContracct &&
        account && {
          contract: presaleContracct,
          method: "amountContributed",
          args: [account],
        },
      { refresh: "5", chainId: Arbitrum.chainId }
    ) ?? {};

  if (error) {
    console.error(error.message);
    return undefined;
  }

  return value?.[0];
};
