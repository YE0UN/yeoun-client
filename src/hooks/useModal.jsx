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
      // ?. 이전의 프로퍼티가 존재하지 않을 경우 에러를 발생시키지 않고 undefined를 반환
      // 따라서 contains를 호출하기 전에 해당 객체의 존재 여부를 확인하고, 객체가 존재할 경우에만 메서드를 호출
      if (modalOpen && !firstRef.current?.contains(event.target) && !secondRef.current?.contains(event.target)) {
        toggle();
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    // 컴포넌트가 언마운트될 때 이벤트 제거, 메모리 누수 방지.
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [modalOpen]);

  return [modalOpen, toggle, firstRef, secondRef];
};

export default useModal;
