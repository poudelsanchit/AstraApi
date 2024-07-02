import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const SelectMethod = () => {
  const methods = [
    {
      method: "get",
      color: "text-green-600",
    },
    {
      method: "post",
      color: "text-orange-600",
    },
    {
      method: "put",
      color: "text-blue-600",
    },
    {
      method: "patch",
      color: "text-purple-600",
    },
    {
      method: "delete",
      color: "text-red-600",
    },
    {
      method: "head",
      color: "text-gray-600",
    },
    {
      method: "options",
      color: "text-pink-600",
    },
  ];

  const [selectedMethod, setSelectedMethod] = useState("get");
  const selectedColor = methods.find(method => method.method === selectedMethod)?.color;

  return (
    <Select
      defaultValue="get"
      onValueChange={(value) => setSelectedMethod(value)}
    >
      <SelectTrigger className={`w-32 font-Inter font-semibold font-sm ${selectedColor}`}>
        <SelectValue placeholder="Theme" />
      </SelectTrigger>
      <SelectContent>
        {methods.map((data) => (
          <SelectItem
            key={data.method}
            value={data.method}
            className={`${data.color} focus:${data.color}`}
          >
            {data.method.toUpperCase()}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectMethod;
