// app/context/SnackbarContext.tsx
'use client';

import { Snackbar, Alert } from '@mui/material';
import { createContext, useState, useContext } from 'react';

const SnackbarContext = createContext<{
  showSnackbar: (msg: string, severity?: 'error' | 'info' | 'success') => void;
}>({ showSnackbar: () => {} });

export const SnackbarProvider = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState<'error' | 'info' | 'success'>('info');

  const showSnackbar = (msg: string, level = 'info') => {
    setMessage(msg);
    setSeverity(level);
    setOpen(true);
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity={severity} onClose={() => setOpen(false)} variant="filled">
          {message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => useContext(SnackbarContext);
