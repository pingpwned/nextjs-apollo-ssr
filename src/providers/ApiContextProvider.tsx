import { createContext, useContext } from "react";

type FetchDataFunction = () => Promise<any> | null; // Define the function type

const ApiDataContext = createContext<FetchDataFunction | null>(null);

export const ApiDataProvider = ({ children }: any) => {
  const fetchData = async () => {
    try {
      const response = await fetch("/api/fetchApi");
      if (response.ok) {
        const data = await response.json();
        return data;
      }
    } catch (error) {
      console.error(error);
    }
    return null;
  };

  return (
    <ApiDataContext.Provider value={fetchData}>
      {children}
    </ApiDataContext.Provider>
  );
};

export const useApiData = () => {
  const fetchData = useContext(ApiDataContext);
  if (fetchData === null) {
    throw new Error("useApiData must be used within an ApiDataProvider");
  }
  return fetchData;
};
