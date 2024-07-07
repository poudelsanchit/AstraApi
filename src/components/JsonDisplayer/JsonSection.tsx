import { Tabs, TabsList, TabsContent, TabsTrigger } from "../ui/tabs";
import Json from "./Json";

interface JsonProps {
    jsonData: object; // Adjust this type according to the structure of jsonData
    statusCode: number | null;
    timeTaken: number | null;
    dataSize: number | null;
  }
const JsonSection = ({jsonData,statusCode,timeTaken,dataSize}:JsonProps) => {
  return (
    <div>
      <Tabs defaultValue="Parameters" className="w-full">
        <TabsList className="border-b-[0.1px] border-border px-2 w-full overflow-x-auto overflow-y-hidden sm:overflow-hidden">
          <TabsTrigger value="Json">Json</TabsTrigger>
          <TabsTrigger value="Headers">Headers</TabsTrigger>
        </TabsList>

        <TabsContent value={"Json"} className="pl-4">
          <Json dataSize={dataSize} jsonData={jsonData} statusCode={statusCode} timeTaken={timeTaken}/>
        </TabsContent>

        <TabsContent value={"Headers"} className="pl-4">
          Headers
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default JsonSection;
