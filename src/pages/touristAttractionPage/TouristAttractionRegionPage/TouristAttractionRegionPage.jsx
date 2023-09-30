import React, { useCallback, useEffect, useState } from 'react';
import InnerLayout from '../../../components/common/layout/InnerLayout/InnerLayout';
import HeadingLayout from '../../../components/common/layout/HeadingLayout/HeadingLayout';
import { useParams } from 'react-router-dom';
import API from './../../../api/API';
import ENDPOINT from './../../../api/ENDPOINT';
import TourismPost from '../../../components/common/post/TourismPost/TourismPost';
import styled from 'styled-components';

const TouristAttractionRegionPage = () => {
  const { region } = useParams();

  const [tourismInfo, setTourismInfo] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPages, setMaxPages] = useState(1);

  const maxPageDisplay = 5; // 한 번에 표시할 최대 페이지 수

  const loadTourismData = useCallback(
    (page) => {
      API(`${ENDPOINT.TOURISM}/?region=${region}&page=${page}`)
        .then((res) => {
          console.log(res);
          setTourismInfo(res.data[1]);
          setCurrentPage(page);
          setMaxPages(res.data[0].maxPage);
        })
        .catch((err) => console.log(err));
    },
    [region],
  );

  useEffect(() => {
    loadTourismData(1);
  }, [loadTourismData]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= maxPages) {
      loadTourismData(newPage);
    }
  };

  // 시작 페이지와 끝 페이지 계산
  const calculatePageRange = () => {
    let startPage = Math.max(1, currentPage - Math.floor(maxPageDisplay / 2));
    let endPage = Math.min(maxPages, startPage + maxPageDisplay - 1);

    if (endPage - startPage + 1 < maxPageDisplay) {
      // 시작 페이지와 끝 페이지를 조정하여 항상 maxPageDisplay 개수만큼 표시되도록 함
      startPage = Math.max(1, endPage - maxPageDisplay + 1);
    }

    return { startPage, endPage };
  };

  const { startPage, endPage } = calculatePageRange();

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
          {tourismInfo.map((item) => (
            <TourismPost key={item.name} tourismInfo={item} />
          ))}
        </Container>
        <Pagination>
          <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
            이전
          </button>
          {startPage > 1 && (
            <>
              <button onClick={() => handlePageChange(1)} className='pageNumber'>
                1
              </button>
              {startPage > 2 && <Span>...</Span>}
            </>
          )}
          {Array.from({ length: endPage - startPage + 1 }, (_, index) => (
            <button
              key={startPage + index}
              onClick={() => handlePageChange(startPage + index)}
              className={`${currentPage === startPage + index ? 'active ' : ''}pageNumber`}
            >
              {startPage + index}
            </button>
          ))}
          {endPage < maxPages && (
            <>
              {endPage < maxPages - 1 && <Span>...</Span>}
              <button onClick={() => handlePageChange(maxPages)} className='pageNumber'>
                {maxPages}
              </button>
            </>
          )}
          <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === maxPages}>
            다음
          </button>
        </Pagination>
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

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 5rem;

  button {
    margin: 0 0.5rem;
    padding: 0.5rem 1rem;
    border: 1px solid var(--border-color);
    border-radius: 5px;
    cursor: pointer;

    &.pageNumber {
      width: 3.2rem;

      &:hover {
        box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
      }
    }
  }

  button.active {
    background-color: var(--main-btn-color);
    color: var(--btn-text-color);
  }

  button:disabled {
    cursor: not-allowed;
  }
`;

const Span = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2rem;
  height: 2.6rem;
`;
