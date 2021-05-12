import { useEffect, useState } from "react";
import {
  SkipToContent,
  Main,
  Box,
  H1,
  Stack,
  Text,
  Link,
  Grid,
  Row,
  Button,
  Divider,
  VisuallyHidden,
  Field,
  FieldInput,
  FieldLabel,
  FieldHint,
  Tooltip,
  Loader,
} from "@strapi/design-system";
import {
  BackIcon,
  CheckIcon,
  EditIcon,
  ConfigureIcon,
  HelpIcon,
} from "@strapi/icons";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <Box background="neutral100" paddingTop={6} paddingBottom={6}>
        <div style={{ textAlign: "center" }}>
          <Loader>Loading strapi bro</Loader>
        </div>
      </Box>
    );
  }

  return (
    // style is hard coded, it's the width of the sidebar
    <Box
      background="neutral100"
      paddingTop={6}
      paddingBottom={6}
      paddingLeft={11}
      paddingRight={11}
    >
      <SkipToContent>Skip to content</SkipToContent>
      <Main labelledBy="main-title">
        <Box>
          <Stack size={2}>
            <Link to="/" leftIcon={<BackIcon />}>
              Back
            </Link>
            <Row justifyContent="space-between">
              <H1 id="main-title">Create a new entry</H1>
              <Button leftIcon={<CheckIcon />}>Save</Button>
            </Row>
            <Text textColor="neutral700">API ID: Restaurant</Text>
          </Stack>

          <Grid
            paddingTop={10}
            areas={["form form form sideinfo"]}
            cols="3fr 1fr"
            gap={6}
          >
            <Box
              area="form"
              hasRadius
              background="neutral0"
              paddingTop={6}
              paddingBottom={6}
              paddingLeft={8}
              paddingRight={8}
              shadow="filterShadow"
            >
              <VisuallyHidden>
                <h2>Create a new restaurant form</h2>
              </VisuallyHidden>

              <form>
                <Grid cols="1fr 1fr" rows="auto auto" gap={9}>
                  <Field name="email" hint="Imagine all the people">
                    <Stack size={1}>
                      <Row>
                        <FieldLabel>Email</FieldLabel>
                        <Tooltip description="As a great poet of the street once said...">
                          <button
                            aria-label="Information about the email"
                            style={{
                              border: "none",
                              background: "transparent",
                              display: "flex",
                            }}
                          >
                            <HelpIcon aria-hidden={true} />
                          </button>
                        </Tooltip>
                      </Row>
                      <FieldInput type="text" placeholder="toto@example.com" />
                      <FieldHint />
                    </Stack>
                  </Field>

                  <Field name="address">
                    <Stack size={1}>
                      <FieldLabel>Address</FieldLabel>
                      <FieldInput
                        type="text"
                        placeholder="16 place of the poet of the street"
                      />
                    </Stack>
                  </Field>

                  <Field name="website">
                    <Stack size={1}>
                      <FieldLabel>Website</FieldLabel>
                      <FieldInput
                        type="text"
                        placeholder="https://poet-of-the-street.io/"
                      />
                    </Stack>
                  </Field>

                  <Field name="email">
                    <Stack size={1}>
                      <FieldLabel>Email</FieldLabel>
                      <FieldInput type="text" placeholder="Placeholder" />
                    </Stack>
                  </Field>
                </Grid>
              </form>
            </Box>

            <Box area="sideinfo" as="aside">
              <Stack size={3}>
                <Box
                  hasRadius
                  background="neutral0"
                  paddingTop={3}
                  paddingBottom={3}
                  paddingLeft={6}
                  paddingRight={6}
                  shadow="filterShadow"
                >
                  <Text textColor="neutral700" as="h3" highlighted>
                    Information
                  </Text>

                  <Box paddingTop={2} paddingBottom={4}>
                    <Divider />
                  </Box>

                  <Stack size={3}>
                    <Row justifyContent="space-between">
                      <Text textColor="neutral800" highlighted small>
                        Last update
                      </Text>

                      <Text small>3 months ago</Text>
                    </Row>

                    <Row justifyContent="space-between">
                      <Text textColor="neutral800" small highlighted>
                        By
                      </Text>

                      <Text small>Kai Doe</Text>
                    </Row>
                  </Stack>
                </Box>

                <Box
                  hasRadius
                  background="neutral0"
                  paddingTop={3}
                  paddingBottom={3}
                  paddingLeft={6}
                  paddingRight={6}
                  shadow="filterShadow"
                >
                  <Text textColor="neutral700" as="h3" highlighted>
                    Reviews (7)
                  </Text>
                </Box>

                <Row>
                  <Box paddingRight={3}>
                    <Button variant="secondary" leftIcon={<EditIcon />}>
                      Edit the model
                    </Button>
                  </Box>

                  <Button variant="secondary" leftIcon={<ConfigureIcon />}>
                    Configure the view
                  </Button>
                </Row>
              </Stack>
            </Box>
          </Grid>
        </Box>
      </Main>
    </Box>
  );
}

export default App;
