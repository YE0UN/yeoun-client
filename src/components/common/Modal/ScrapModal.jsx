import React, { useState } from 'react';
import Modal from './Modal';
import InnerLayout from '../layout/InnerLayout/InnerLayout';

const ScrapModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <InnerLayout>
      <button onClick={openModal}>스크랩</button>
      <Modal isOpen={isModalOpen} closeModal={closeModal}>
        <h1>This is scrap Modal</h1>
        <ul>
          <li>가족여행</li>
          <li>가족여행</li>
          <li>가족여행</li>
        </ul>
      </Modal>
    </InnerLayout>
  );
};

export default ScrapModal;
