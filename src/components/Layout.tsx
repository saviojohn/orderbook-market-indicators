// app/components/Layout.tsx
'use client';

import { AppBar, Box, Container, Tab, Tabs, Toolbar, Typography } from '@mui/material';
import { useState } from 'react';
import ThemeToggle from './ThemeToggle';

const tabs = [
  { label: 'Dashboard', path: '/' },
  { label: 'Settings', path: '/settings' }, // placeholder for future
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [tab, setTab] = useState(0);

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Crypto Orderbook
          </Typography>
          <ThemeToggle />
        </Toolbar>
        <Tabs value={tab} onChange={(e, newVal) => setTab(newVal)} centered>
          {tabs.map((t, i) => (
            <Tab key={i} label={t.label} />
          ))}
        </Tabs>
      </AppBar>
      <Container maxWidth="md" sx={{ pt: 4 }}>
        {children}
      </Container>
    </Box>
  );
}
