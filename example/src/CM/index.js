import React, { useReducer } from "react";
import _ from "lodash";
import { Box, Button, Grid, H1, Row, Stack } from "@strapi/design-system";
import { OneBlockLayout } from "../layouts/OneBlockLayout";
import Inputs from "./Inputs";
import { layout } from "./utils/layout";
import schema, { getYupInnerErrors } from "./utils/schema";

const initialState = {
  initialData: {
    name: "toto",
  },
  modifiedData: {
    name: "toto",
  },
  formErrors: null,
};

const reducer = (state, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case "ON_CHANGE": {
      // const keys = 'name' || 'name.1.name'

      const nextState = _.cloneDeep(state);
      _.set(nextState, ["modifiedData", ...action.keys], action.value);

      return nextState;
    }
    case "SET_ERRORS": {
      return { ...state, formErrors: action.errors };
    }
    default:
      return state;
  }
};

const CM = () => {
  const [{ formErrors, modifiedData }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const handleChange = ({ name, value }) => {
    dispatch({
      type: "ON_CHANGE",
      keys: name.split("."),
      value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await schema.validate(modifiedData, { abortEarly: false });

      dispatch({
        type: "SET_ERRORS",
        errors: null,
      });
    } catch (err) {
      const errors = getYupInnerErrors(err);

      dispatch({
        type: "SET_ERRORS",
        errors,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <OneBlockLayout
        header={
          <Stack size={2}>
            <Row justifyContent="space-between">
              <H1 id="main-title">Create a new entry</H1>
              <Button type="submit">Save</Button>
            </Row>
          </Stack>
        }
      >
        <Box padding={6}>
          <Stack size={6}>
            {layout.map((row, index) => {
              const colArray = row.map((input) => input.size);
              const length = colArray.reduce((acc, curr) => acc + curr, 0);
              const rest = 12 - length;
              const defaultCols = colArray.map((s) => s + "fr").join(" ");
              const cols =
                rest === 0 ? defaultCols : defaultCols + " " + rest + "fr";

              return (
                <Grid cols={cols} key={index} gap={5}>
                  {row.map((input) => {
                    return (
                      <Box key={input.name}>
                        <Inputs
                          {...input}
                          customInputs={{ string: () => "TEXT CUSTOM" }}
                          error={formErrors?.[input.name]}
                          onChange={handleChange}
                          value={modifiedData[input.name]}
                        />
                      </Box>
                    );
                  })}
                </Grid>
              );
            })}
          </Stack>
        </Box>
      </OneBlockLayout>
    </form>
  );
};

// const CM = () => {
//   return (
//     <OneBlockLayout header="User">
//       <Box padding={6}>
//         <Stack size={6}>
//           <Grid cols="1fr 1fr">
//             <Box>Name</Box>
//             <Box>Email</Box>
//           </Grid>
//           <Grid cols="8fr 4fr">
//             <Box>Description</Box>
//           </Grid>
//           <Grid cols="6fr 4fr 2fr">
//             <Box background="primary600">Enum</Box>
//             <Box background="primary600"> Date</Box>
//           </Grid>
//           <Grid cols="4fr 4fr 4fr">
//             <Box>Private</Box>
//             <Box>Max</Box>
//             <Box>Min</Box>
//           </Grid>
//         </Stack>
//       </Box>
//     </OneBlockLayout>
//   );
// };

export default CM;
