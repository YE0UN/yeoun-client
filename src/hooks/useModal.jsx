import { useState, useEffect, useRef } from 'react';

const useModal = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const firstRef = useRef(null);
  const secondRef = useRef(null);

  const toggle = () => {
    setModalOpen((cur) => !cur);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalOpen && !firstRef.current.contains(event.target) && !secondRef.current.contains(event.target)) {
        toggle();
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [modalOpen]);

  return [modalOpen, toggle, firstRef, secondRef];
};

export default useModal;
