import { createPortal } from "react-dom";
import styles from "./Modal.module.css";
import { useOpenAndCloseModal } from "../../Hooks/UI/useOpenAndCloseModal";
import { useTheme } from "../../Hooks/UI/useTheme";

const Backdrop = (props) => {
  const { processModal } = useOpenAndCloseModal();

  return (
    <div className={styles.backdrop} onClick={() => processModal(null)}></div>
  );
};

const ModalOverlay = (props) => {
  const { theme } = useTheme();
  return (
    <div
      style={{
        background:
          theme === "dark"
            ? "linear-gradient(90deg, #090947 0%, #333 74%)"
            : "linear-gradient(90deg, #4CD137 0%, #487EB0 74%)",
      }}
      className={styles.modal}
    >
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
