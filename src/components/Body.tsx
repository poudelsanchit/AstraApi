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

  const handleRequest = async () => {
    try {
      const response = await axios.get<ResponseData>(url);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setData({ error: "Failed to fetch data" });
    }
  };

  return (
    <div className="h-screen w-full bg-primaryBackground flex justify-center text-primaryText">
      <div className="w-[93%] bg-primaryBackground border-l-[0.01px] border-[#1F1F1F]">
        <div className="flex w-full gap-2 m-4">
          <SelectMethod />
          <Input
            type="text"
            className="bg-[#181818] placeholder:text-[#49494A]"
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
        <Json jsonData={data} />
      </div>
    </div>
  );
};

export default Body;
