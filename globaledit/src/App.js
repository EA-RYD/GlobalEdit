import logo from './logo.svg';
import './App.css';
import Editor, { DiffEditor, useMonaco, loader } from "@monaco-editor/react";
import { useEffect, useRef, useState } from 'react';
import { WebrtcProvider } from 'y-webrtc'
import * as Y from 'yjs'
import { IndexeddbPersistence } from 'y-indexeddb'
import { MonacoBinding } from 'y-monaco' 
import RandomColor from "randomcolor";
//import loader from "@monaco-editor/loader";

function App() {  
  const [contentMarkdown, setContentMarkdown] = useState('//type here');
  const [editorRef, setEditorRef] = useState("");
  const monacoRef = useRef(null);

  function handleEditorDidMount(editor, monaco) {
    setEditorRef(editor);
    monacoRef.current = monaco;
  }

  function showValue() {
    alert(editorRef.current.getValue());
  }

  //       loader.init().then(monaco => monaco.editor.getModel());
  function swapTheme() {
    if (editorRef.current._themeService._theme.themeName === "vs-dark" ) {
      loader.init().then(monaco => monaco.editor.setTheme('light'));
    } else if (editorRef.current._themeService._theme.themeName === "vs") {
      loader.init().then(monaco => monaco.editor.setTheme('hc-black'));
    } else {
      loader.init().then(monaco => monaco.editor.setTheme('vs-dark'));
    }
  }

  
  useEffect(() => {
    if (editorRef) {
      const ydoc = new Y.Doc();
      let webrtcProvider = null;

      // Sync clients with the y-webrtc provider.
      try {
        webrtcProvider = new WebrtcProvider('globaledit', ydoc,{signaling: [
          "wss://signaling.yjs.dev",
          'wss://y-webrtc-signaling-eu.herokuapp.com', 
          'wss://y-webrtc-signaling-us.herokuapp.com'
        ]});
        const type = ydoc.getText('monaco');
        const yUndoManager = new Y.UndoManager(type);
        const aware = webrtcProvider.awareness;
        const color = RandomColor();

        aware.setLocalStateField("user", {
          name: "Users Name",
          color: color,
        });
        
        const monacoBinding = new MonacoBinding(type, (editorRef.getModel()), new Set([editorRef]), aware);

      } catch (error) {
        alert(error)
      }
      return () => {
        if (webrtcProvider) {
          webrtcProvider.disconnect();
          ydoc.destroy();
        }
      };
    }
  }, [editorRef])

  return (
    <div className="App">
      <Editor 
        className='monacoEditor'
        height="90vh"
        theme="light"
        defaultLanguage="javascript"
        defaultValue={contentMarkdown}
        onMount={handleEditorDidMount}
        onChange={(value) => setContentMarkdown(value)}
      />
      <div className="header">
        <h1 className="name">GlobalEdit</h1>
      </div>
      <div className='options'>
        <button onClick={showValue}>Show value</button> 
        <button onClick={swapTheme}>Swap Theme</button> 
      </div>
    </div>
  );
}

export default App;
