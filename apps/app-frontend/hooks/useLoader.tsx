import { useEffect, useState } from "react";

const useLoader = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return { isLoaded };
};

export default useLoader;
