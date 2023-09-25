import { CacheUtil } from "@/utils/cache";
import { createContext, useContext, useEffect, useState } from "react";

const ApiDataContext = createContext(null);

// export const cacheUtl = new CacheUtil();

export const ApiDataProvider = ({ children }: any) => {
  const [apiData, setApiData] = useState(null);

  useEffect(() => {
    // Fetch data from your API route on the server side
    async function fetchData() {
      try {
        const response = await fetch("/api/fetchApi").then((data) =>
          data.json()
        );
        const data = response;
        setApiData(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  return (
    <ApiDataContext.Provider value={apiData}>
      {children}
    </ApiDataContext.Provider>
  );
};

export const useApiData = () => {
  return useContext(ApiDataContext);
};
