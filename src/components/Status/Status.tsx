
// Status.tsx
interface StatusProps {
    statusCode: number | null;
    timeTaken: number | null;
    dataSize: number | null;
  }
  
const Status = ({ statusCode, timeTaken, dataSize }:StatusProps) => {
  return (
    <div className="flex text-xs font-Inter font-semibold text-[#737373] gap-5  py-2 px-4">
      <div className="">
        Status: <span className="text-green-500">{statusCode}</span>
      </div>
      <div>
        Time: <span className="text-green-500">{timeTaken} ms</span>{" "}
      </div>
      <div>
        Size: <span className="text-green-500">{dataSize} B</span>
      </div>
    </div>
  );
};

export default Status;
