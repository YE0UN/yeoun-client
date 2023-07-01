import { useState, useEffect, useRef } from 'react';

const useModal = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const firstRef = useRef(null); // 모달 open & close 버튼
  const secondRef = useRef(null); // 모달 내용

  const toggle = () => {
    setModalOpen((cur) => !cur);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      // 모달이 열려 있을 때 && 모달의 open & close 버튼을 클릭하지 않았을 때 && 모달 내용 영역을 클릭하지 않았을 때
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
