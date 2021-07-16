import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { EditViewPage } from './pages/EditViewPage';
import CM from './CM';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/cm">
          <CM />
        </Route>
      </Switch>
      <Route path="/">
        <EditViewPage />
      </Route>
    </Router>
  );
}

export default App;
