import { useState } from "react";
import Json from "./Json/Json";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import axios from "axios";
import SelectMethod from "./SelectMethod/SelectMethod";

// Define the type for the response data
interface ResponseData {
  [key: string]: any; // Adjust this based on the actual structure of your response data
}

const Body = () => {
  const [url, setUrl] = useState<string>("");
  const [data, setData] = useState<ResponseData>({});
  const [statusCode, setStatusCode] = useState<number | null>(null);
  const [timeTaken, setTimeTaken] = useState<number | null>(null);
  const [dataSize, setDataSize] = useState<number | null>(null);

  const handleRequest = async () => {
    const startTime = performance.now();
    console.log(startTime)

    try {
      const response = await axios.get<ResponseData>(url);
      const endTime = performance.now();
      console.log(response)
      const responseSize = new TextEncoder().encode(JSON.stringify(response.data)).length;

      setData(response.data);
      setStatusCode(response.status);
      setTimeTaken(endTime - startTime);
      setDataSize(responseSize);
    } catch (error:any) {
      console.error("Error fetching data:", error);
      setData({ error: "Failed to fetch data" });
      setStatusCode(error.response ? error.response.status : null);
      setTimeTaken(null);
      setDataSize(null);
    }
  };

  return (
    <div className="h-screen w-full bg-primaryBackground flex justify-center text-primaryText">
      <div className="w-[93%] bg-primaryBackground border-l-[0.01px] border-[#1F1F1F]">
        <div className="flex w-full gap-2 m-4">
          <SelectMethod />
          <Input
            type="text"
            className="bg-[#181818] text-white font-Inter text-sm placeholder:text-[#49494A]"
            placeholder="Enter a URL or a cURL command"
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
        <Json jsonData={data} statusCode={statusCode} timeTaken={timeTaken} dataSize={dataSize} />
      </div>
    </div>
  );
};

export default Body;
