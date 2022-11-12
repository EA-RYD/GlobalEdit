import './App.css';
import Editor from "./Editor";
//import { javascript } from '@codemirror/lang-javascript';

function App() {

  function swapTheme() {
  }
  function showValue() {
    
  }

  return (
    <div className="App">
      <Editor className="codemirror"/>
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
