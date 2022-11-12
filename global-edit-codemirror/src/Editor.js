import './Editor.css';
import * as Y from "yjs";
import { CodemirrorBinding } from "y-codemirror";
import { WebrtcProvider } from 'y-webrtc'
import CodeMirror from "codemirror";
import { useEffect, useState } from "react";
import mode from "./mode-glicol";
import { useParams} from "react-router-dom";
import {randomHexColor} from "random-hex-color-generator"
import "codemirror/mode/javascript/javascript.js";
import "codemirror/addon/mode/simple.js";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material-darker.css";


const Editor = () => {
  CodeMirror.defineSimpleMode("simplemode", mode);
  const [name, setName] = useState("Name");
  const [color, setColor] = useState("#008833");
  const room = "globaledit"
  //let { id } = useParams();
  //console.log(id);

  useEffect(() => {
    if (document.getElementById("editor").childNodes.length == 0) {
        try {
            const ydoc = new Y.Doc();
            const provider = new WebrtcProvider(room, ydoc);
            const yText = ydoc.getText("codemirror");
            const yUndoManager = new Y.UndoManager(yText);

            var e = new CodeMirror(document.getElementById("editor"), {
                mode: "simplemode",
                lineNumbers: true,
                theme: "material-darker"
            });
            console.log("doesn't exist!");
            

            window.binding = new CodemirrorBinding(yText, e, provider.awareness, {
                yUndoManager
            });

            console.log("connect to", room);
            window.binding.awareness.setLocalStateField("user", {
                color: color,
                name: name
            });
        } catch (e) {
            console.log(e);
        }
    }
    console.log("rendered!");
  }, []);
  return (
    <div className="editorSpace">
          <p style={{ display: "inline" }}>You can rename yourself here: </p>
          <input
            className="nameField"
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              window.binding.awareness.setLocalStateField("user", {
                color: "#008833",
                name: e.target.value
              });
            }}
            size="15"
            id="name"
          />
          <button
            className="colorField"
            style={{ backgroundColor: color }}
            onClick={() => {
              let c = randomHexColor();
              setColor(c);
              window.binding.awareness.setLocalStateField("user", {
                color: c,
                name: name
              });
            }}
          >
            Change a color
          </button>
      <div id="editor"></div>
    </div>
  );
};

export default Editor;
