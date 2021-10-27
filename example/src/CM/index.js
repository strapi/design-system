import React, { useReducer } from "react";
import _ from "lodash";
import {
  Box,
  Button,
  Grid,
  GridItem,
  HeaderLayout,
  Stack,
  Layout,
  Link,
} from "@strapi/design-system";
import EditIcon from "@strapi/icons/Pencil";
import BackIcon from "@strapi/icons/ArrowLeft";
import AddIcon from "@strapi/icons/Plus";
import Inputs from "./Inputs";
import { layout } from "./utils/layout";
import schema, { getYupInnerErrors } from "./utils/schema";
import { AppLayout } from "../layouts/AppLayout";

const initialState = {
  initialData: {
    name: "toto",
    content: "hello world",
  },
  modifiedData: {
    name: "toto",
    content: "hello world",
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
      <div style={{ height: "200vh" }}>
        <Layout>
          <HeaderLayout
            navigationAction={
              <Link startIcon={<BackIcon />} to="/">
                Go back
              </Link>
            }
            primaryAction={
              <Button startIcon={<AddIcon />}>Add an entry</Button>
            }
            secondaryAction={
              <Button variant="tertiary" startIcon={<EditIcon />}>
                Edit
              </Button>
            }
            title="Restaurants"
            subtitle="36 entries found"
            as="h2"
          />
          <form onSubmit={handleSubmit}>
            <Box padding={6}>
              <Stack size={6}>
                <Grid gap={5}>
                  {layout.map((row, index) => {
                    return row.map((input) => {
                      return (
                        <GridItem key={input.name} col={input.size} xs={12}>
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
        </Layout>
      </div>
    </AppLayout>
  );
};

export default CM;
