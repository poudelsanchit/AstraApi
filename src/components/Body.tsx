import { useState } from "react";
import Json from "./JsonDisplayer/Json";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import axios, { AxiosRequestConfig } from "axios";
import SelectMethod from "./SelectMethod/SelectMethod";
import Main from "./ParamsHeaders/Main";
import { useToast } from "./ui/use-toast";

interface ResponseData {
  [key: string]: any;
}

interface ParamData {
  parameter: string;
  value: string;
}

interface State {
  url: string;
  data: ResponseData;
  statusCode: number | null;
  timeTaken: number | null;
  dataSize: number | null;
  params: ParamData[];
  method: string;
}

const Body = () => {
  const { toast } = useToast();

  const [state, setState] = useState<State>({
    url: "",
    data: {},
    statusCode: null,
    timeTaken: null,
    dataSize: null,
    params: [{ parameter: "", value: "" }],
    method: "get",
  });

  const handleRequest = async () => {
    if (!state.url) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid URL to perform API tests.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    const startTime = performance.now();

    const queryString = state.params
      .filter((param) => param.parameter && param.value)
      .map(
        (param) =>
          `${encodeURIComponent(param.parameter)}=${encodeURIComponent(
            param.value
          )}`
      )
      .join("&");

    const fullUrl = queryString ? `${state.url}?${queryString}` : state.url;

    try {
      const config: AxiosRequestConfig = {
        url: fullUrl,
        method: state.method as any,
        data: state.method === 'post' || state.method === 'put' ? { /* your data here */ } : undefined,
      };

      const response = await axios(config);

      const endTime = performance.now();
      const responseSize = new TextEncoder().encode(
        JSON.stringify(response.data)
      ).length;

      setState((prevState) => ({
        ...prevState,
        data: response.data,
        statusCode: response.status,
        timeTaken: endTime - startTime,
        dataSize: responseSize,
      }));

      toast({
        title: "Request Successful",
        description: `API responded with status code ${response.status}`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error: any) {
      console.error("Error fetching data:", error);

      let errorMessage = "Failed to fetch data. ";
      if (error.response) {
        errorMessage += `Server responded with status code ${error.response.status}.`;
      } else if (error.request) {
        errorMessage += "No response received from the server.";
      } else {
        errorMessage += error.message;
      }

      setState((prevState) => ({
        ...prevState,
        data: { error: errorMessage },
        statusCode: error.response ? error.response.status : null,
        timeTaken: null,
        dataSize: null,
      }));

      toast({
        title: "Request Failed",
        description: errorMessage,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <div className="h-screen w-full bg-primaryBackground flex sm:justify-end text-primaryText">
      <div className="w-[95%] mr-8 bg-primaryBackground border-l-[0.01px] border-[#1F1F1F]">
        <div className="flex w-full gap-2 p-2">
          <SelectMethod
            method={state.method}
            onMethodChange={(method) =>
              setState((prevState) => ({ ...prevState, method }))
            }
          />
          <Input
            type="text"
            className="bg-[#181818] text-white font-Inter text-sm placeholder:text-[#49494A]"
            placeholder="Enter a URL or paste a cURL command to perform API tests"
            value={state.url}
            onChange={(e) =>
              setState((prevState) => ({ ...prevState, url: e.target.value }))
            }
          />
          <Button
            className="w-28 text-white bg-purple-700 hover:bg-purple-800 font-Inter"
            onClick={handleRequest}
          >
            Send
          </Button>
        </div>
        <Main
          params={state.params}
          setParams={(params) =>
            setState((prevState) => ({ ...prevState, params }))
          }
        />
        <Json
          jsonData={state.data}
          statusCode={state.statusCode}
          timeTaken={state.timeTaken}
          dataSize={state.dataSize}
        />
      </div>
    </div>
  );
};

export default Body;
