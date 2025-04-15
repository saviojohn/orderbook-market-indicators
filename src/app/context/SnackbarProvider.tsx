"use client";

import { Snackbar, Alert, Button, AlertColor, CircularProgress } from "@mui/material";
import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useCallback,
  useEffect,
} from "react";
import { motion, AnimatePresence } from "framer-motion";

type SnackbarOptions = {
  message: string;
  severity?: AlertColor;
  actionLabel?: string;
  onAction?: () => void;
  actionLoading?: boolean;
};

type SnackbarContextType = {
  showSnackbar: (options: SnackbarOptions) => void;
};

const SnackbarContext = createContext<SnackbarContextType>({
  showSnackbar: () => {},
});

export const SnackbarProvider = ({ children }: { children: ReactNode }) => {
  const [queue, setQueue] = useState<SnackbarOptions[]>([]);
  const [current, setCurrent] = useState<SnackbarOptions | null>(null);
  const [open, setOpen] = useState(false);

  const showSnackbar = useCallback((options: SnackbarOptions) => {
    setQueue((prev) => [...prev, options]);
  }, []);

  useEffect(() => {
    if (!open && queue.length > 0) {
      setCurrent(queue[0]);
      setQueue((prev) => prev.slice(1));
      setOpen(true);
    }
  }, [open, queue]);

  const handleClose = (_: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") return;
    setOpen(false);
  };

  const handleExited = () => {
    setCurrent(null);
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      <AnimatePresence>
        {open && current && (
          <Snackbar
            open
            autoHideDuration={4000}
            onClose={handleClose}
            onExited={handleExited}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.3 }}
            >
              <Alert
                severity={current.severity || "info"}
                variant="filled"
                onClose={handleClose}
                action={
                  current.actionLabel && current.onAction ? (
                    <Button
                      color="inherit"
                      size="small"
                      onClick={current.onAction}
                      disabled={current.actionLoading}
                      startIcon={
                        current.actionLoading ? (
                          <CircularProgress size={16} color="inherit" />
                        ) : null
                      }
                    >
                      {current.actionLabel}
                    </Button>
                  ) : null
                }
                sx={{
                  width: "100%",
                  bgcolor: (theme) =>
                    theme.palette.mode === "dark" ? "grey.800" : undefined,
                }}
              >
                {current.message}
              </Alert>
            </motion.div>
          </Snackbar>
        )}
      </AnimatePresence>
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => useContext(SnackbarContext);
