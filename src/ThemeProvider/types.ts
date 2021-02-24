export interface Theme {
  // Specify doesn't generate types for the moment
  color: { [key: string]: string };
}

export interface ThemeProps {
  theme: Theme;
}
