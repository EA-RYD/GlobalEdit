import './Editor.css';
import * as Y from "yjs";
import { CodemirrorBinding } from "y-codemirror";
import { WebrtcProvider } from 'y-webrtc'
import CodeMirror from "codemirror";
import { useEffect, useState } from "react";
import mode from "../mode-glicol";
import { useParams} from "react-router-dom";
import "codemirror/mode/javascript/javascript.js";
import "codemirror/addon/mode/simple.js";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material-darker.css";

const { uniqueNamesGenerator, adjectives, colors, animals } = require('unique-names-generator');
let editorInstance = null;

let startName = uniqueNamesGenerator({
  dictionaries: [adjectives, animals],
  length: 2
});

const Editor = () => {
  CodeMirror.defineSimpleMode("simplemode", mode);
  const [name, setName] = useState("Name");
  const [color, setColor] = useState("#000000");
  //const [mode, setMode] = useState();
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
                mode: 'plaintext',
                lineNumbers: true,
                theme: "material-darker", 
                autoCloseTags: true,
                matchBrackets: true,
                autoCloseBrackets: true,
                smartIndent: true,
                lineWrapping: true,
            }); 

            e.setSize('100%', '88vh');
            editorInstance = e;

            window.binding = new CodemirrorBinding(yText, e, provider.awareness, {
                yUndoManager
            });

            /*
            var tempName = uniqueNamesGenerator({
              dictionaries: [adjectives, animals],
              length: 2
            }); // big-donkey
            */

            console.log("connect to", room);
            window.binding.awareness.setLocalStateField("user", {
                color: color,
                name: startName
            });
            
        } catch (e) {
            console.log(e);
        }
    }
    console.log("rendered!");
  }, []);
  return (
    
    <div id="editor" >
      
    </div>
  );
};

export  {startName,editorInstance,Editor};
