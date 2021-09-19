import { useRouter } from "next/router";
import React, { createContext, useState, useContext, useEffect } from "react";

const PageModalContext = createContext({});

export function PageModalProvider({ children }) {
  const [isOpen, setModalOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setModalOpen(false);
  }, [router.pathname]);

  useEffect(() => {
    console.log(isOpen);
  }, [isOpen]);

  return (
    <PageModalContext.Provider value={{ isOpen, setModalOpen }}>
      {children}
    </PageModalContext.Provider>
  );
}

export const usePageModal = () => useContext(PageModalContext);
