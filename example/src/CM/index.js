import React, { useReducer } from "react";
import _ from "lodash";
import {
  Box,
  Button,
  Grid,
  GridItem,
  HeaderLayout,
  Stack,
  OneBlockLayout,
} from "@strapi/parts";
import EditIcon from "@strapi/icons/EditIcon";
import AddIcon from "@strapi/icons/AddIcon";
import Inputs from "./Inputs";
import { layout } from "./utils/layout";
import schema, { getYupInnerErrors } from "./utils/schema";
import { AppLayout } from "../layouts/AppLayout";

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
    <AppLayout>
      <OneBlockLayout
        header={
          <HeaderLayout
            primaryAction={
              <Button startIcon={<AddIcon />}>Add an entry</Button>
            }
            secondaryAction={
              <Button variant="tertiary" startIcon={<EditIcon />}>
                Edit
              </Button>
            }
            title="Other CT"
            subtitle="36 entries found"
          />
        }
      >
        <form onSubmit={handleSubmit}>
          <Box padding={6}>
            <Stack size={6}>
              <Grid gap={5}>
                {layout.map((row, index) => {
                  return row.map((input) => {
                    return (
                      <GridItem key={input.name} col={input.size} xs={12} s={6}>
                        <Inputs
                          {...input}
                          // customInputs={{ string: () => "TEXT CUSTOM" }}
                          error={formErrors?.[input.name]}
                          onChange={handleChange}
                          value={modifiedData[input.name]}
                        />
                      </GridItem>
                    );
                  });
                })}
              </Grid>
            </Stack>
          </Box>
        </form>
      </OneBlockLayout>
    </AppLayout>
  );
};

export default CM;
