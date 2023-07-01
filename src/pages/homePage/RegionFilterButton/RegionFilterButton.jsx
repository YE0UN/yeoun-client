import React, { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import checkIcon from '../../../assets/images/check-icon.svg';
import deleteLightIcon from '../../../assets/images/delete-light-icon.svg';

const regions = [
  '전국',
  '서울',
  '부산',
  '대구',
  '인천',
  '광주',
  '대전',
  '울산',
  '경기',
  '강원',
  '충북',
  '충남',
  '전북',
  '전남',
  '경북',
  '경남',
  '제주',
  '세종',
];

const RegionFilterButton = ({ modalOpen, modalRef, getRigionsHandler }) => {
  const [selectedRegions, setSelectedRegions] = useState([...regions]);

  useEffect(() => {
    getRigionsHandler(selectedRegions);
  }, [selectedRegions, getRigionsHandler]);

  if (selectedRegions[0] === '전국' && selectedRegions.length < 18) {
    selectedRegions.shift();
  }

  if (selectedRegions[0] !== '전국' && selectedRegions.length === 17) {
    setSelectedRegions([...regions]);
  }

  const handleRegionChange = (region) => {
    if (region === '전국') {
      if (selectedRegions.length === regions.length) {
        setSelectedRegions([]);
      } else {
        setSelectedRegions([...regions]);
      }
    } else {
      if (selectedRegions.includes(region)) {
        setSelectedRegions(selectedRegions.filter((r) => r !== region));
      } else {
        setSelectedRegions([...selectedRegions, region]);
      }
    }
  };

  const handleButtonClick = (region) => {
    if (region === '전국') {
      setSelectedRegions([]);
    } else {
      setSelectedRegions(selectedRegions.filter((r) => r !== region));
      // console.log(`${region}지역 필터 삭제!`);
    }
  };

  return (
    <>
      <CheckboxWrapper modalOpen={modalOpen} ref={modalRef}>
        {regions.map((region) => (
          <CustomLabel key={region}>
            <CustomInput
              type='checkbox'
              checked={selectedRegions.includes(region)}
              onChange={() => {
                handleRegionChange(region);
              }}
            />
            {region}
          </CustomLabel>
        ))}
      </CheckboxWrapper>
      <RegionButtonWrapper>
        {selectedRegions.map((region) =>
          region !== '전국' ? (
            <li key={region}>
              <RegionButton
                onClick={() => {
                  handleButtonClick(region);
                }}
              >
                {region}
              </RegionButton>
            </li>
          ) : (
            ''
          ),
        )}
      </RegionButtonWrapper>
    </>
  );
};

export default RegionFilterButton;

const CheckboxWrapper = styled.div`
  display: ${(props) => (props.modalOpen ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0 4rem;
  width: 27.4rem;
  height: 22.6rem;
  padding: 1rem;
  font-size: var(--fs-sm);
  font-weight: 700;
  border-radius: 8px;
  background-color: var(--checkbox-wrapper-color);
  position: absolute;
  z-index: 100;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.5);
`;

const CustomLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  user-select: none;
`;

const CustomInput = styled.input`
  width: 1.6rem;
  height: 1.6rem;
  margin: 0;
  appearance: none;
  border: 1px solid var(--main-checkbox-color);
  background: #ffffff;

  :checked {
    background: url(${checkIcon}) var(--main-checkbox-color) center/100% no-repeat;
  }
`;

const RegionButtonWrapper = styled.ul`
  top: 5.7rem;
  left: 29rem;
  position: absolute;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem 0.5rem;
`;

const RegionButton = styled.button`
  width: 6.5rem;
  height: 3.5rem;
  background: url(${deleteLightIcon}) var(--region-btn-color) no-repeat 95% 15%/15%;
  color: var(--btn-text-color);
  border-radius: 8px;
  font-size: var(--fs-sm);
  font-weight: 700;

  &:hover {
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.3);
  }
`;
