import { Localhost, useCall } from "@usedapp/core";
import { usePresaleContract } from "../useContract";

export const useSaleStatus = () => {
  const presaleContracct = usePresaleContract();

  const { value, error } =
    useCall(
      presaleContracct && {
        contract: presaleContracct,
        method: "saleActive",
        args: [],
      },
      { refresh: "never", chainId: Localhost.chainId, isStatic: true }
    ) ?? {};

  if (error) {
    console.error(error.message);
    return undefined;
  }

  return value?.[0];
};
