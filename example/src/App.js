import { Router } from "@reach/router";
import { EditViewPage } from "./pages/EditViewPage";
import CM from "./CM";

function App() {
  return (
    <Router>
      <CM path="/cm" />
      <EditViewPage path="/" />
    </Router>
  );
}

export default App;
