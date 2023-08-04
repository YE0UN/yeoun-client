import React from 'react';
import InnerLayout from '../../../components/common/layout/InnerLayout/InnerLayout';
import HeadingLayout from '../../../components/common/layout/HeadingLayout/HeadingLayout';
import { useParams } from 'react-router-dom';

const TouristAttractionRegionPage = () => {
  const { region } = useParams();

  return (
    <>
      <InnerLayout>
        <HeadingLayout
          heading={
            <span>
              <strong style={{ color: '#577fa0' }}>{`${region} `}</strong>
              관광지
            </span>
          }
        />
      </InnerLayout>
    </>
  );
};

export default TouristAttractionRegionPage;
