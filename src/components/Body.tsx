import { useState } from "react";
import Json from "./JsonDisplayer/Json";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import axios, { AxiosRequestConfig } from "axios";
import SelectMethod from "./SelectMethod/SelectMethod";
import Main from "./ParamsHeaders/Main";
import { useToast } from "./ui/use-toast";
import { IoSettingsOutline } from "react-icons/io5";
import NavBar from "./NavBar";
import JsonSection from "./JsonDisplayer/JsonSection";

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
  jsonBody: string;
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
    jsonBody: "",
  });
  const handleMethodSwitch = (method: string) => {
    console.log(state.jsonBody);
    setState((prev) => ({
      ...prev,
      method,
    }));
    toast({
      title: `Method switched to ${method}`,
      duration: 1000,
    });
  };

  const handleRequest = async () => {
    if (!state.url) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid URL to perform API tests.",
        duration: 5000,
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
      const requestData =
        state.method === "post" || state.method === "put"
          ? JSON.parse(state.jsonBody)
          : undefined;
      console.log(requestData);

      const config: AxiosRequestConfig = {
        url: fullUrl,
        method: state.method as any,
        data: requestData,
      };

      const response = await axios(config);
      // console.log(response)
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
        duration: 5000,
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
        duration: 5000,
      });
    }
  };

  return (
    <div className="flex flex-col h-screen w-full">
      <NavBar />
      <div className=" h-full  bg-primaryBackground flex sm:justify- text-primaryText">
        <div className="w-[3.5%] h-full pb-4 bg-red-40 flex justify-center items-end">
          <IoSettingsOutline className=" text-lg cursor-pointer text-secondaryText hover:text-white" />
        </div>
        <div className="w-[94%] bg-primaryBackground border-l-[0.01px] border-border">
          <div className="flex w-full gap-1 p-2">
            <SelectMethod
              method={state.method}
              onMethodChange={handleMethodSwitch}
            />
            <Input
              type="text"
              className="bg-[#171717] text-white font-Inter text-sm placeholder:text-[#49494A]"
              placeholder="Enter a URL or paste a cURL command to perform API tests"
              value={state.url}
              onChange={(e) =>
                setState((prevState) => ({ ...prevState, url: e.target.value }))
              }
            />
            <Button
              className="w-28  text-white bg-purple-700 hover:bg-purple-800 font-Inter"
              onClick={handleRequest}
            >
              Send
            </Button>
          </div>
          <Main
            json={state.jsonBody}
            setRequestBody={(body: any) =>
              setState((prev) => ({ ...prev, jsonBody: body }))
            }
            params={state.params}
            setParams={(params) =>
              setState((prevState) => ({ ...prevState, params }))
            }
          />
          <JsonSection  jsonData={state.data}
            statusCode={state.statusCode}
            timeTaken={state.timeTaken}
            dataSize={state.dataSize}/>
          {/* <Json
            jsonData={state.data}
            statusCode={state.statusCode}
            timeTaken={state.timeTaken}
            dataSize={state.dataSize}
          /> */}
        </div>
      </div>
    </div>
  );
};

export default Body;
