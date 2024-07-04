import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-monokai";
import "../JsonDisplayer/ace-custom.css"; // Import your custom CSS
import { useState } from "react";
const Body = () => {
  const [json, SetJson] = useState<string>("");
  return (
    <>
      <AceEditor
        style={{ backgroundColor: "#0E0E0E" }}
        className="font-Inter font-semibold"
        showGutter={false}
        highlightActiveLine={false}
        mode="json"
        showPrintMargin={false}
        theme="monokai"
        fontSize={13}
        readOnly={false}
        name="json-editor"
        editorProps={{ $blockScrolling: true }}
        height="15rem"
        wrapEnabled={true}
        width="100%"
        value={json}
        onChange={(newvalue) => SetJson(newvalue)}
      />
    </>
  );
};

export default Body;
