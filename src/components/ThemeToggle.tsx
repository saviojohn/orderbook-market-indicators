'use client';

import { IconButton } from '@mui/material';
import { LightMode, DarkMode } from '@mui/icons-material';
import { useThemeMode } from '@/app/context/ThemeContext';

export default function ThemeToggle() {
  const { toggleTheme, mode } = useThemeMode();

  return (
    <IconButton onClick={toggleTheme} color="inherit">
      {mode === 'light' ? <DarkMode /> : <LightMode />}
    </IconButton>
  );
}
