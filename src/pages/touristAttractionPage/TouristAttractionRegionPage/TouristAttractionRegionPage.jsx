import React, { useEffect, useState } from 'react';
import InnerLayout from '../../../components/common/layout/InnerLayout/InnerLayout';
import HeadingLayout from '../../../components/common/layout/HeadingLayout/HeadingLayout';
import { useParams } from 'react-router-dom';
import API from './../../../api/API';
import ENDPOINT from './../../../api/ENDPOINT';
import TourismPost from '../../../components/common/post/TourismPost/TourismPost';
import styled from 'styled-components';

const TouristAttractionRegionPage = () => {
  const { region } = useParams();

  const [tourismInfo, setTourismInfo] = useState();

  useEffect(() => {
    API(`${ENDPOINT.TOURISM}/?region=${region}`)
      .then((res) => {
        console.log(res);
        setTourismInfo(res.data);
      })

      .catch((err) => console.log(err));
  }, [region]);

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
        <Container>
          {tourismInfo && tourismInfo.map((item) => <TourismPost key={item.name} tourismInfo={item} />)}
        </Container>
      </InnerLayout>
    </>
  );
};

export default TouristAttractionRegionPage;

const Container = styled.div`
  display: flex;
  gap: 4rem;
  flex-wrap: wrap;
  margin: 5rem 0;
`;
