import { useEthers, ChainId, useUpdateConfig, Arbitrum } from "@usedapp/core";
import React, { useEffect, useState } from "react";
import BreadDappContext from "./context";

function BreadDappProvider({ children }) {
  const { account, chainId, library } = useEthers();
  const updateConfig = useUpdateConfig();
  const [isChainError, setIsChainError] = useState(false);

  useEffect(() => {
    try {
      if (account != undefined && library != undefined) {
        updateConfig({ readOnlyUrls: { [ChainId.Arbitrum]: library } });
      } else {
        updateConfig({
          readOnlyUrls: {
            [ChainId.Arbitrum]: process.env.NEXT_PUBLIC_ARBITRUM_RPC_URL,
          },
        });
      }
    } catch (e) {
      console.error("Provider switch failed. Going back to alchemy: ", e);
      updateConfig({
        readOnlyUrls: {
          [ChainId.Arbitrum]: process.env.NEXT_PUBLIC_ARBITRUM_RPC_URL,
        },
      });
    }
  }, [account]);

  useEffect(() => {
    if (account != undefined && chainId != undefined) {
      if (chainId != Arbitrum.chainId) {
        setIsChainError(true);
        updateConfig({
          readOnlyUrls: {
            [ChainId.Arbitrum]: process.env.NEXT_PUBLIC_ARBITRUM_RPC_URL,
          },
        });
      } else {
        setIsChainError(false);
        updateConfig({
          readOnlyUrls: {
            [ChainId.Arbitrum]: library,
          },
        });
      }
    }
  }, [account, chainId]);

  useEffect(() => {
    if (isChainError && account == undefined) {
      setIsChainError(false);
    }
  }, [isChainError, account]);

  return (
    <BreadDappContext.Provider value={{ isChainError }}>
      {children}
    </BreadDappContext.Provider>
  );
}

function useBreadDapp() {
  const context = React.useContext(BreadDappContext);
  if (context === undefined) {
    throw new Error("useBreadDapp must be used within a BreadDappProvider");
  }
  return context;
}

export { BreadDappProvider, useBreadDapp };
