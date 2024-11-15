import { TokenData } from "@/types/TokenTypes";
import {
  useContext,
  createContext,
  ReactNode,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

export interface AppContextType {
  tokenData: TokenData | undefined; // tokenData should match the type you're using in state
  setTokenData: Dispatch<SetStateAction<TokenData | undefined>>; // Properly typed setter
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [tokenData, setTokenData] = useState<TokenData>();

  return (
    <AppContext.Provider
      value={{
        tokenData,
        setTokenData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp() must be used within AppProvider");
  }
  return context;
};
