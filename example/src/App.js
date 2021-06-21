import { Router } from '@reach/router';
import { H1, H2, Text } from '@strapi/design-system/Text';
import { Box } from '@strapi/design-system/Box';
import { OneBlockLayout } from './layouts/OneBlockLayout';
import { TwoColsLayout } from './layouts/TwoColsLayout';
import { EditViewPage } from './pages/EditViewPage';
import { GridLayout } from './layouts/GridLayout';
import CM from './CM';

const OneBlockpage = () => {
  return (
    <OneBlockLayout header={<H1>One block layout</H1>}>
      <Box padding={4}>
        <Text>This is the content</Text>
      </Box>
    </OneBlockLayout>
  );
};

const TwoColsPage = () => {
  return (
    <TwoColsLayout
      header={<H1>Two cols layout</H1>}
      start={
        <Box padding={4}>
          <H2>Two cols layout</H2>
        </Box>
      }
      end={
        <Box padding={4}>
          <H2>Side content</H2>
        </Box>
      }
    ></TwoColsLayout>
  );
};

const GridPage = () => {
  return (
    <GridLayout header={<H1>Grid layout</H1>}>
      {Array(12)
        .fill(null)
        .map((_, index) => (
          <Box key={index} padding={10} background="neutral0" shadow="filterShadow" hasRadius />
        ))}
    </GridLayout>
  );
};

function App() {
  return (
    <Router>
      <CM path="/content-manager-test" />
      <OneBlockpage path="/one-block" />
      <TwoColsPage path="/two-cols" />
      <GridPage path="/grid" />
      <EditViewPage path="/" />
    </Router>
  );
}

export default App;
