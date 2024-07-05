import React from "react";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-monokai";
import "../JsonDisplayer/ace-custom.css"; // Import your custom CSS
import AceEditor from "react-ace";
import { Input } from "../ui/input";

interface RequestBodyProps {
  json: any; // JSON data as a string
  setRequestBody: any;
}

const RequestBody = ({ json, setRequestBody }: RequestBodyProps) => {

  return (
    // <textarea
    //   className="bg-primaryBackground outline-none text-sm font-Inter text-purple-400 w-full h-44"
    //   value={json}
    //   onChange={(e) => setRequestBody(e.target.value)}
    // />
    <AceEditor
      style={{ backgroundColor: "#0E0E0E" }}
      className="font-Inter font-semibold"
      showGutter={false}
      highlightActiveLine={false}
      showPrintMargin={false}
      theme="monokai"
      fontSize={13}
      readOnly={false}
      name="json-editor"
      editorProps={{ $blockScrolling: true }}
      height="15rem"
      wrapEnabled={true}
      width="100%"
      value={json} // JSON string value from props
      onChange={setRequestBody} // Function to handle editor changes
    />
  );
};

export default RequestBody;
