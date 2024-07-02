import { useState } from "react";
import Json from "./Json/Json";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import axios from "axios";
import SelectMethod from "./SelectMethod/SelectMethod";
const Body = () => {
  const [url, setUrl] = useState("");
  const [data, setData] = useState(null);
  const handleRequest = async () => {
    console.log(url);
    const response = await axios.get(url);
    setData(response.data);
  };

  return (
    <div className="h-screen w-full bg-primaryBackground flex justify-center text-primaryText">
      <div className="w-[93%] bg-primaryBackground border-l-[0.01px] border-[#1F1F1F]  ">
        <div className="flex w-full   gap-2 m-4">
          <SelectMethod/>
          <Input
            type="text"
            className="bg-[#181818] placeholder:text-[#49494A]"
            placeholder="Enter a URL or a cURL command"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
            }}
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
