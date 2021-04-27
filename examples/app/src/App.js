import { useState } from "react";
import { Checkbox, Box } from "@strapi/design-system";
import { Checkbox as BuffetCheckbox } from "@buffetjs/core";
import "./App.css";

function App() {
  const [val, setValue] = useState();
  const [value2, setValue2] = useState();

  const handleChange = (value) => setValue(value);

  return (
    <div className="App">
      <header className="App-header">
        <Box paddingBottom={5}>
        <Checkbox onValueChange={handleChange} name="first" value={val}>
          This is a Design System component
        </Checkbox>
        </Box>
        <BuffetCheckbox
          message="This is a buffetJS component"
          name="checkbox"
          onChange={({ target }) => setValue2(target.value)}
          value={value2}
        />
      </header>
    </div>
  );
}

export default App;
