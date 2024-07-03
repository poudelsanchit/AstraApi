import { useState } from "react";
import Json from "./JsonDisplayer/Json";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import axios from "axios";
import SelectMethod from "./SelectMethod/SelectMethod";
import Main from "./ParamsHeaders/Main";

// Define the type for the response data
interface ResponseData {
  [key: string]: any; // Adjust this based on the actual structure of your response data
}

// Define the type for the query parameters
interface ParamData {
  parameter: string;
  value: string;
}

const Body = () => {
  const [url, setUrl] = useState<string>("");
  const [data, setData] = useState<ResponseData>({});
  const [statusCode, setStatusCode] = useState<number | null>(null);
  const [timeTaken, setTimeTaken] = useState<number | null>(null);
  const [dataSize, setDataSize] = useState<number | null>(null);
  const [params, setParams] = useState<ParamData[]>([
    { parameter: "", value: "" },
  ]);

  const handleRequest = async () => {
    const startTime = performance.now();

    // Construct the query string from params
    const queryString = params
      .filter((param) => param.parameter && param.value)
      .map(
        (param) =>
          `${encodeURIComponent(param.parameter)}=${encodeURIComponent(
            param.value
          )}`
      )
      .join("&");
      console.log(queryString)
    const fullUrl = queryString ? `${url}?${queryString}` : url;


    try {
      const response = await axios.get<ResponseData>(fullUrl);
      const endTime = performance.now();
      const responseSize = new TextEncoder().encode(
        JSON.stringify(response.data)
      ).length;

      setData(response.data);
      setStatusCode(response.status);
      setTimeTaken(endTime - startTime);
      setDataSize(responseSize);
    } catch (error: any) {
      console.error("Error fetching data:", error);
      setData({ error: "Failed to fetch data" });
      setStatusCode(error.response ? error.response.status : null);
      setTimeTaken(null);
      setDataSize(null);
    }
  };

  return (
    <div className="h-screen w-full bg-primaryBackground flex sm:justify-end text-primaryText">
      <div className="w-[95%] mr-8 bg-primaryBackground border-l-[0.01px] border-[#1F1F1F]">
        <div className="flex w-full gap-2 p-2">
          <SelectMethod />
          <Input
            type="text"
            className="bg-[#181818] text-white font-Inter text-sm placeholder:text-[#49494A]"
            placeholder="Enter a URL or paste a cURL command to perform API tests"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <Button
            className="w-28 text-white bg-purple-700 hover:bg-purple-800 font-Inter"
            onClick={handleRequest}
          >
            Send
          </Button>
        </div>
        <Main params={params} setParams={setParams} />
        <Json
          jsonData={data}
          statusCode={statusCode}
          timeTaken={timeTaken}
          dataSize={dataSize}
        />
      </div>
    </div>
  );
};

export default Body;
