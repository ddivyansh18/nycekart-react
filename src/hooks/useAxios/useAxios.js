import axios from "axios";
import { useState } from "react";

export const useAxios = () => {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const apiCall = async (type, url, body) => {
    console.log(type, url, body);
    try {
      setIsError(false);
      setIsLoading(false);
      const receivedResponse = await axios[type](url, body);
      console.log("Recieved in axios : ", receivedResponse);
      return receivedResponse;
    } catch (error) {
      setIsError(true);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { apiCall, isLoading, isError };
};
