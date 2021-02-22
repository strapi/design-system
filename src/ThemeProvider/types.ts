export interface Theme {
    // Specify doesn't generate types for the moment
    colors: { [key: string]: string };
}

export interface ThemeProps {
    theme: Theme;
}
