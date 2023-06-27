import React, { useCallback, useContext, useState } from 'react';
import InnerLayout from '../../../components/common/layout/InnerLayout/InnerLayout';
import HeadingLayout from '../../../components/common/layout/HeadingLayout/HeadingLayout';
import styled from 'styled-components';
import UploadPost from '../../../components/common/post/UploadPost/UploadPost';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContextStore } from '../../../context/AuthContext';

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

const PostUploadPage = () => {
  const { userId } = useContext(AuthContextStore);

  const navigate = useNavigate();

  const [selectedRegion, setSelectedRegion] = useState('전국');

  const [postData, setPostData] = useState({
    siDo: '',
    title: '',
    content: '',
    img: '',
    userId: '',
  });

  // UploadPost.jsx에서 데이터 받아오기
  const getUploadData = useCallback(
    (value) => {
      setPostData({
        siDo: selectedRegion,
        title: value.title,
        content: value.postContent,
        img: value.imagePreview,
        userId: userId,
      });
      console.log(selectedRegion);
      console.log(value.title);
      console.log(value.postContent);
      console.log(value.imagePreview);
    },
    [userId, selectedRegion],
  );

  // 새 글 작성 클릭 기능
  // const onClickPostRegistrationHandler = () => {
  //   const option = {
  //     url: '여운url/posts',
  //     method: 'POST',
  //     headers: {
  //       Authorization: `Bearer ${userToken}`,
  //       'Content-type': 'application/json',
  //     },
  //     data: postData,
  //   };
  //   axios(option)
  //     .then(() => {
  //       Navigate('/');
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });

  // };

  const onClickPostRegistrationHandler = () => {
    const option = {
      url: 'http://localhost:3000/posts',
      method: 'POST',
      data: postData,
    };

    axios(option)
      .then((res) => {
        // 작성 성공 시
        console.log(res);
        navigate('/');
      })
      .catch((err) => {
        console.log(err);
      });

    console.log('게시물이 업로드 되었습니다!');
  };

  return (
    <>
      <InnerLayout>
        <HeadingLayout heading='새 글 작성' />
        <RegionButtonWrapper>
          {regions.map((region) => (
            <li key={region}>
              <RegionButton onClick={() => setSelectedRegion(region)} active={selectedRegion === region}>
                {region}
              </RegionButton>
            </li>
          ))}
        </RegionButtonWrapper>
        <UploadPostLayout>
          <UploadPost
            userName='userName'
            onClickPostRegistrationHandler={onClickPostRegistrationHandler}
            getUploadData={getUploadData}
          />
        </UploadPostLayout>
      </InnerLayout>
    </>
  );
};

export default PostUploadPage;

const RegionButtonWrapper = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 2rem 0.5rem;
  border-bottom: 1px solid var(--border-color);
`;

const RegionButton = styled.button`
  width: 6.5rem;
  height: 3.5rem;
  font-size: var(--fs-sm);
  font-weight: 700;
  border-radius: 8px;
  color: var(--btn-text-color);
  background: ${(props) => (props.active ? 'var(--region-btn-color-active)' : 'var(--region-btn-color)')};
  &:hover {
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.3);
  }
`;

const UploadPostLayout = styled.div`
  display: flex;
  justify-content: center;
  margin: 5rem;
`;
