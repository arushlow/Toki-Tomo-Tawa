import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import './App.css';
import Start from './components/Start';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
        <Route exact path="/" element={<Start />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
