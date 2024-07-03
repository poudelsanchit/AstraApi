import { Input } from "../ui/input";
import { FiTrash } from "react-icons/fi";
import { IoIosAdd } from "react-icons/io";
import { Button } from "../ui/button";

interface ParamData {
  parameter: string;
  value: string;
}

interface ParamsProps {
  data: ParamData[];
  setData: (data: ParamData[]) => void;
}

const Params = ({ data, setData }: ParamsProps) => {
  const handleInputChange = (
    index: number,
    field: keyof ParamData,
    value: string
  ) => {
    const newData = [...data];
    newData[index][field] = value;
    setData(newData);
  };

  const handleAddField = () => {
    setData([...data, { parameter: "", value: "" }]);
  };

  const handleRemoveField = (index: number) => {
    if (data.length > 1) {
      const newData = data.filter((_, i) => i !== index);
      setData(newData);
    }
  };

  return (
    <div className="h-40 flex flex-col">
      <div className="flex justify-between h-7">
        <div className="text-xs font-semibold text-secondaryText">
          Query Parameters
        </div>
        <div className="flex justify-center items-center gap-2">
          <FiTrash className="text-lg cursor-pointer text-secondaryText hover:text-white" />
          <IoIosAdd
            className="text-3xl cursor-pointer text-secondaryText hover:text-white"
            onClick={handleAddField}
          />
        </div>
      </div>
      {data.map((item, index) => (
        <div key={index} className="flex gap-2 border-[0.1px] p-1">
          <Input
            type="text"
            className="bg-[#181818] h-8 text-white font-Inter text-xs font-semibold tracking-wide placeholder:text-[#49494A]"
            placeholder="Parameter"
            value={item.parameter}
            onChange={(e) =>
              handleInputChange(index, "parameter", e.target.value)
            }
          />
          <Input
            type="text"
            className="bg-[#181818] h-8 text-white font-Inter text-sm placeholder:text-[#49494A]"
            placeholder="Value"
            value={item.value}
            onChange={(e) => handleInputChange(index, "value", e.target.value)}
          />
          <Button
            variant="default"
            size="icon"
            className="p-[0.6rem] h-8 w-8 rounded-sm bg-red-500 text-white hover:bg-red-600"
            onClick={() => handleRemoveField(index)}
          >
            <FiTrash className="h-3 w-3" />
          </Button>
        </div>
      ))}
    </div>
  );
};

export default Params;
