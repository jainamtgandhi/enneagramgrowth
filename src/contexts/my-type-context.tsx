"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import type { EnneagramType } from "@/lib/enneagram/types";

const STORAGE_KEY = "enneagram-my-type";

interface MyTypeContextValue {
  myType: EnneagramType | null;
  setMyType: (type: EnneagramType) => void;
  clearMyType: () => void;
}

const MyTypeContext = createContext<MyTypeContextValue>({
  myType: null,
  setMyType: () => {},
  clearMyType: () => {},
});

export function MyTypeProvider({ children }: { children: ReactNode }) {
  const [myType, setMyTypeState] = useState<EnneagramType | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const num = parseInt(stored, 10);
      if (num >= 1 && num <= 9) {
        setMyTypeState(num as EnneagramType);
      }
    }
    setHydrated(true);
  }, []);

  const setMyType = useCallback((type: EnneagramType) => {
    setMyTypeState(type);
    localStorage.setItem(STORAGE_KEY, String(type));
  }, []);

  const clearMyType = useCallback(() => {
    setMyTypeState(null);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  // Prevent hydration mismatch by rendering null state until client hydrates
  const value: MyTypeContextValue = {
    myType: hydrated ? myType : null,
    setMyType,
    clearMyType,
  };

  return (
    <MyTypeContext.Provider value={value}>{children}</MyTypeContext.Provider>
  );
}

export function useMyType() {
  return useContext(MyTypeContext);
}
