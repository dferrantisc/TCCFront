import { useRouter } from "next/router";
import React, { createContext, useState, useContext, useEffect } from "react";

const PageDeleteModal = createContext({});

export function PageDeleteModalProvider({ children }) {
  const [isOpenDeleteModal, setDeleteModalOpen] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const router = useRouter();

  useEffect(() => {
    setDeleteModalOpen(false);
  }, [router.pathname]);

  return (
    <PageDeleteModal.Provider
      value={{
        isOpenDeleteModal,
        setDeleteModalOpen,
        deleteItemId,
        setDeleteItemId,
      }}
    >
      {children}
    </PageDeleteModal.Provider>
  );
}

export const usePageDeleteModal = () => useContext(PageDeleteModal);
