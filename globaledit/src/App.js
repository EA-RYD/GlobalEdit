import logo from './logo.svg';
import './App.css';
import Editor, { DiffEditor, useMonaco, loader } from "@monaco-editor/react";
import { useEffect, useRef, useState } from 'react';
//import loader from "@monaco-editor/loader";

function App() {
  const [contentMarkdown, setContentMarkdown] = useState('//type here');
  const editorRef = useRef(null);
  const monacoRef = useRef(null);

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
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
