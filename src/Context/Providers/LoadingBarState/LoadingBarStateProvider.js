import { createContext, useContext, useState } from "react";

const loadingContext = createContext();
const setLoadingContext = createContext();

//! Custom Hooks To Make Using Easier !

export const useLoading = () => {
  const context = useContext(loadingContext);
  return context;
};

export const useSetLoading = () => {
  const context = useContext(setLoadingContext);
  return context;
};

export default function LoadingBarStateProvider({ children }) {
  const [loading, setLoading] = useState(false);
  return (
    <loadingContext.Provider value={loading}>
      <setLoadingContext.Provider value={setLoading}>
        {children}
      </setLoadingContext.Provider>
    </loadingContext.Provider>
  );
}
