import React from 'react';

const Modal = ({ isOpen, closeModal, children }) => {
  return (
    <div style={{ display: isOpen ? 'block' : 'none' }}>
      <p>Modal</p>
      <div>{children}</div>
      <button onClick={closeModal}>Close</button>
    </div>
  );
};

export default Modal;
