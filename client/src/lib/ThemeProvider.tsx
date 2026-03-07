'use client'

import React, { useContext, useEffect, useState, ReactNode } from 'react';
import { io, Socket } from 'socket.io-client';
import { BACKEND_URL } from '@/config/keys';

// Define the type for the ThemeContext
// Here, the socket can be null before initialization
type SocketContextType = Socket | null;

// Define props type for ThemeProvider
interface ThemeProviderProps {
  children: ReactNode;
}

// Create the context with type safety
export const ThemeContext = React.createContext<SocketContextType>(null);

// Custom hook to use the socket
export function useSocket(): SocketContextType {
  return useContext(ThemeContext);
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    // Initialize socket connection
    const newSocket = io(BACKEND_URL);
    setSocket(newSocket);

    // Cleanup on unmount
    return () => {
      newSocket.disconnect();
    };
  }, []);

  return (
    <ThemeContext.Provider value={socket}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;