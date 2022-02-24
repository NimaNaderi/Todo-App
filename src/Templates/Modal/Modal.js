import { createPortal } from "react-dom";
// import { ToastContainer } from "react-toastify";
import styles from "./Modal.module.css";

const Backdrop = (props) => {
  return <div className={styles.backdrop} onClick={props.onClose}></div>;
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
