import React, { ReactNode } from 'react';
import ReactModal from 'react-modal';

// styles
import classnames from 'classnames';
import styles from './index.module.sass';

interface ModalProps {
  onClose: () => void;
  isOpen: boolean;
  className?: string;
  classNameClose?: string;
  overlayVisible?: boolean;
  children?: ReactNode;
}

const Modal = ({
  onClose,
  isOpen,
  className,
  classNameClose,
  overlayVisible,
  children,
}: ModalProps) => (
  <ReactModal
    role="presentation"
    isOpen={isOpen}
    contentLabel="Modal"
    className={classnames(className, styles.modal)}
    overlayClassName={classnames(styles.modalOverlay, { [styles.visible]: overlayVisible })}
    onRequestClose={onClose}
    shouldCloseOnOverlayClick
  >
    <span
      role="presentation"
      className={classnames(styles.close, classNameClose)}
      onClick={onClose}
    />
    {children}
  </ReactModal>
);

export default Modal;
