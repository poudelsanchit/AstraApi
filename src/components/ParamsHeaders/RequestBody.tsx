import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-monokai";
import "../JsonDisplayer/ace-custom.css"; // Import your custom CSS
import AceEditor from "react-ace";

interface RequestBodyProps {
  json: any; // JSON data as a string
  setRequestBody: any;
}

const RequestBody = ({ json, setRequestBody }: RequestBodyProps) => {

  return (

    <AceEditor
      style={{ backgroundColor: "#0E0E0E" }}
      showGutter={true}
      highlightActiveLine={false}
      showPrintMargin={false}
      theme="monokai"
      fontSize={14}
      readOnly={false}
      name="json-editor"
      editorProps={{ $blockScrolling: true }}
      height="15rem"
      wrapEnabled={false}
      width="100%"
      value={json} 
      onChange={setRequestBody}
    />
    
  );
};

export default RequestBody;
