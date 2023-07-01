import { createContext, useState } from "react";
import { IInventoryRequest } from "../components/inventory/inventoryRequest/inventoryRequest.interface";
import { getDeepClone } from "../util/ObjectFunctions";
import { defaultInventoryRequestData } from "../components/inventory/inventoryRequest/inventoryRequest.model";

export type InventoryContextType = {
  data: IInventoryRequest;
  setData: React.Dispatch<React.SetStateAction<IInventoryRequest>>;
  resetInventoryData: () => void;
};

type InventoryContextProviderProps = {
  children: React.ReactNode;
};
export const InventoryContext = createContext<InventoryContextType | null>(
  null
);

export const InventoryContextProvider = ({
  children,
}: InventoryContextProviderProps) => {
  const [data, setData] = useState<IInventoryRequest>(
    getDeepClone(defaultInventoryRequestData)
  );
  const resetInventoryData = () => {
    setData(getDeepClone(defaultInventoryRequestData));
  };

  return (
    <InventoryContext.Provider
      value={{
        data,
        setData,
        resetInventoryData,
      }}
    >
      {children}
    </InventoryContext.Provider>
  );
};
