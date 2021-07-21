import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { EditViewPage } from "./pages/EditViewPage";
import MediaLibraryPage from "./pages/MediaLibraryPage";
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

        <Route path="/upload">
          <MediaLibraryPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
