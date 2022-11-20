import './App.css';
import Editor from "./components/Editor";
import Header from "./components/Header";
import Side from "./components/Sidebar";

function App() {

  return (
    <div className="App">
      <Editor className="codemirror"/>
      <Header className="header"/>
      <Side className="sidebar"/>
    </div>
  );
}

export default App;
