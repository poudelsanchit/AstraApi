import { useEffect, useState } from "react";
import Json from "./Json/Json";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import axios from "axios";
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
          <Select defaultValue="get">
            <SelectTrigger className="w-32 font-Inter font-semibold font-sm  ">
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem
                value="get"
                className="text-green-600 focus:text-green-600 "
              >
                GET
              </SelectItem>
              <SelectItem
                value="post"
                className="text-orange-600 focus:text-orange-600 "
              >
                POST
              </SelectItem>
              <SelectItem
                value="put"
                className="text-blue-600 focus:text-blue-600 "
              >
                PUT
              </SelectItem>
              <SelectItem
                value="patch"
                className="text-purple-600 focus:text-purple-600 "
              >
                PATCH
              </SelectItem>
              <SelectItem
                value="delete"
                className="text-red-600 focus:text-red-600 "
              >
                DELETE
              </SelectItem>
              <SelectItem
                value="head"
                className="text-gray-600 focus:text-gray-600 "
              >
                HEAD
              </SelectItem>
              <SelectItem
                value="options"
                className="text-pink-600 focus:text-pink-600 "
              >
                OPTIONS
              </SelectItem>
            </SelectContent>
          </Select>

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
