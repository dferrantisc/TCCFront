import { useRouter } from "next/router";
import React, { createContext, useState, useContext, useEffect } from "react";

const PageUpdateModal = createContext({});

export function PageUpdateModalProvider({ children }) {
  const [isOpenUpdateModal, setUpdateModalOpen] = useState(false);
  const [item, setItem] = useState({});
  const router = useRouter();

  useEffect(() => {
    setUpdateModalOpen(false);
  }, [router.pathname]);

  return (
    <PageUpdateModal.Provider
      value={{
        isOpenUpdateModal,
        setUpdateModalOpen,
        item,
        setItem,
      }}
    >
      {children}
    </PageUpdateModal.Provider>
  );
}

export const usePageUpdateModal = () => useContext(PageUpdateModal);
