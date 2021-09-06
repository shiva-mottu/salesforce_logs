import './App.css';
import { BrowserRouter as Router, Route, Switch, } from "react-router-dom";
import AnalyseCharts from "./pages/AnalyseCharts"
import ViewLogs from "./pages/ViewLogs"

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Switch>
            <Route path="/analyse_charts" component={AnalyseCharts} />
            <Route path="/view_logs" component={ViewLogs} />
          </Switch>
        </Router>
      </header>
    </div>
  );
}

export default App;
