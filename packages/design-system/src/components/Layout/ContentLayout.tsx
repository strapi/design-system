import { Box } from '../Box';

interface ContentLayoutProps {
  children: React.ReactNode;
}

export const ContentLayout = ({ children }: ContentLayoutProps) => {
  return (
    <Box paddingLeft={10} paddingRight={10}>
      {children}
    </Box>
  );
};
