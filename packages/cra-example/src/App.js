import { Router } from "@reach/router";
import { EditViewPage } from "./ContentManager/EditViewPage";

function App() {
  return (
    <Router>
      <EditViewPage path="/" />
    </Router>
  );
}

export default App;
