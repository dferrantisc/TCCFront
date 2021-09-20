import { usePageDeleteModal } from "context/usePageDeleteModal";
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";

export function DeleteModal({ handleDelete }) {
  const {
    isOpenDeleteModal,
    setDeleteModalOpen,
    setDeleteItemId,
    deleteItemId,
  } = usePageDeleteModal();

  return (
    <Modal
      toggle={() => setDeleteModalOpen(!isOpenDeleteModal)}
      isOpen={isOpenDeleteModal}
    >
      <div className=" modal-header">
        <h5 className=" modal-title" id="exampleModalLabel">
          Remover item
        </h5>
        <button
          aria-label="Close"
          className=" close"
          type="button"
          onClick={() => setDeleteModalOpen(!isOpenDeleteModal)}
        >
          <span aria-hidden={true}>×</span>
        </button>
      </div>
      <ModalBody>Tem certeza que deseja remover o item?</ModalBody>
      <ModalFooter>
        <Button
          color="secondary"
          type="button"
          onClick={() => {
            setDeleteModalOpen(!isOpenDeleteModal);
          }}
        >
          Cancelar
        </Button>
        <Button
          color="danger"
          type="button"
          onClick={() => handleDelete(deleteItemId)}
        >
          Remover
        </Button>
      </ModalFooter>
    </Modal>
  );
}
