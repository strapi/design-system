import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { EditViewPage } from "./pages/EditViewPage";
import CM from "./CM";
import SettingsPage from "./pages/SettingsPage";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/cm">
          <CM />
        </Route>

        <Route path="/cm/edit">
          <EditViewPage />
        </Route>

        <Route path="/settings/:settingType">
          <SettingsPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
