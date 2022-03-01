import { createPortal } from "react-dom";
import styles from "./Modal.module.css";
import { useOpenAndCloseModal } from "../../Hooks/useOpenAndCloseModal";

const Backdrop = (props) => {
  const { processModal } = useOpenAndCloseModal();

  return (
    <div className={styles.backdrop} onClick={() => processModal(null)}></div>
  );
};

const ModalOverlay = (props) => {
  return (
    <div className={styles.modal}>
      {/* <ToastContainer /> */}
      <div className={styles.content}>{props.children}</div>
    </div>
  );
};

const portalContainer = document.getElementById("overlays");

const Modal = (props) => {
  return (
    <>
      <Backdrop onClose={props.onClose} />
      {createPortal(<Backdrop />, portalContainer)}
      {createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalContainer
      )}
    </>
  );
};

export default Modal;
