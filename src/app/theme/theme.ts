export type AppTheme = {
  colors: {
    background: string;
    surface: string;
    surfaceMuted: string;
    text: string;
    textMuted: string;
    primary: string;
    primaryMuted: string;
    border: string;
    danger: string;
    warning: string;
    favorite: string;
  };
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  radius: {
    sm: number;
    md: number;
  };
};

export const lightTheme: AppTheme = {
  colors: {
    background: '#F7F7F2',
    surface: '#FFFFFF',
    surfaceMuted: '#ECEDE7',
    text: '#17201C',
    textMuted: '#66736C',
    primary: '#1C7C54',
    primaryMuted: '#D9EFE6',
    border: '#D9DDD5',
    danger: '#B42318',
    warning: '#946200',
    favorite: '#D64B71',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  radius: {
    sm: 6,
    md: 8,
  },
};

export const darkTheme: AppTheme = {
  colors: {
    background: '#101512',
    surface: '#1A211D',
    surfaceMuted: '#253029',
    text: '#F2F5EF',
    textMuted: '#AAB5AE',
    primary: '#72D39C',
    primaryMuted: '#173A28',
    border: '#344139',
    danger: '#FF8A80',
    warning: '#FFD36A',
    favorite: '#FF7FA2',
  },
  spacing: lightTheme.spacing,
  radius: lightTheme.radius,
};
