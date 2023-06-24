import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import checkIcon from '../../../assets/images/check-icon.svg';
import deleteLightIcon from '../../../assets/images/delete-light-icon.svg';

// 전국을 포함한 지역명
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

const RegionFilterButton = ({ isClicked, getRigionsLengthHandler }) => {
  const [selectedRegions, setSelectedRegions] = useState([...regions]);
  console.log(selectedRegions);

  useEffect(() => {
    getRigionsLengthHandler(selectedRegions.length);
  }, [selectedRegions, getRigionsLengthHandler]);

  // 전국이 체크된 상태에서 다른 지역 체크 해제 시, 전국도 체크 해제되는 기능
  if (selectedRegions[0] === '전국' && selectedRegions.length < 18) {
    selectedRegions.shift();
  }
  // 전국을 제외한 모든 지역 체크 시, 전국에 체크되는 기능
  if (selectedRegions[0] !== '전국' && selectedRegions.length === 17) {
    setSelectedRegions([...regions]);
  }

  const handleRegionChange = (region) => {
    // 전국 체크 or 체크 해제 시, 모든 지역 체크 or 체크 해제되는 기능
    if (region === '전국') {
      if (selectedRegions.length === regions.length) {
        setSelectedRegions([]);
      } else {
        setSelectedRegions([...regions]);
      }
    } else {
      // 전국 이외의 지역
      if (selectedRegions.includes(region)) {
        setSelectedRegions(selectedRegions.filter((r) => r !== region));
      } else {
        setSelectedRegions([...selectedRegions, region]);
      }
    }
  };

  // 버튼 클릭 시 해당 지역 체크 박스 해제 및 버튼 삭제
  const handleButtonClick = (region) => {
    if (region === '전국') {
      setSelectedRegions([]);
    } else {
      setSelectedRegions(selectedRegions.filter((r) => r !== region));
      console.log(`${region}지역 필터 삭제!`);
    }
  };

  return (
    <>
      <CheckboxWrapper isClicked={isClicked}>
        {regions.map((region) => (
          <CustomLabel key={region}>
            <CustomInput
              type='checkbox'
              checked={selectedRegions.includes(region)}
              onChange={() => handleRegionChange(region)}
            />
            {region}
          </CustomLabel>
        ))}
      </CheckboxWrapper>
      <RegionButtonWrapper>
        {selectedRegions.map((region) =>
          region !== '전국' ? (
            <li key={region}>
              <RegionButton onClick={() => handleButtonClick(region)}>{region}</RegionButton>
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
  display: ${(props) => (props.isClicked ? 'flex' : 'none')};
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

// 체크박스 커스텀
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

// 지역 버튼
const RegionButtonWrapper = styled.ul`
  /* width: 120rem; */
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
