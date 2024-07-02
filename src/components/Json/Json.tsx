import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-monokai";
import "./ace-custom.css"; // Import your custom CSS
import Status from "../Status/Status";

interface JsonProps {
  jsonData: object; // Adjust this type according to the structure of jsonData
  statusCode: number | null;
  timeTaken: number | null;
  dataSize: number | null;
}

const Json = ({ jsonData, statusCode, timeTaken, dataSize }: JsonProps) => {
  const jsonString = JSON.stringify(jsonData, null, 2); // 2 spaces indentation

  return (
    <div className="flex flex-col font-Inter text-white">
      <Status statusCode={statusCode} timeTaken={timeTaken} dataSize={dataSize} />
      <div className="text-sm font-semibold border-b-[0.01px] border-[#1F1F1F] py-2 px-4">
        JSON
      </div>
      <div className="text-xs text-[#737373] font-semibold border-b-[0.01px] border-[#1F1F1F] p-2 cursor-pointer py-2 px-4">
        Response Body
      </div>
      <AceEditor
        style={{ backgroundColor: "#0E0E0E" }}
        className="font-Inter font-semibold"
        showGutter={true}
        highlightActiveLine={false}
        mode="json"
        showPrintMargin={false}
        theme="monokai"
        value={jsonString}
        fontSize={13}
        readOnly={true}
        name="json-editor"
        editorProps={{ $blockScrolling: true }}
        height="30rem"
        wrapEnabled={true}
        width="100%"
      />
    </div>
  );
};

export default Json;
