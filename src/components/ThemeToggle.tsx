// app/components/ThemeToggle.tsx
'use client';

import { IconButton, Tooltip } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useThemeMode } from '@/app/context/ThemeContext';

export default function ThemeToggle() {
  const { darkMode, toggleTheme } = useThemeMode();

  return (
    <Tooltip title="Toggle light/dark theme">
      <IconButton onClick={toggleTheme} color="inherit">
        {darkMode ? <Brightness7 /> : <Brightness4 />}
      </IconButton>
    </Tooltip>
  );
}
