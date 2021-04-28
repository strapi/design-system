import { useState } from "react";
import { Checkbox, Box } from "@strapi/design-system";

function App() {
  const [val, setValue] = useState();

  const handleChange = (value) => setValue(value);

  return (
    <Box>
      <Box paddingBottom={5}>
        <Checkbox onValueChange={handleChange} name="first" value={val}>
          This is a Design System component
        </Checkbox>
      </Box>
    </Box>
  );
}

export default App;
