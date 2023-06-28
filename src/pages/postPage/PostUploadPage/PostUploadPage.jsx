import React, { useCallback, useContext, useEffect, useState } from 'react';
import InnerLayout from '../../../components/common/layout/InnerLayout/InnerLayout';
import HeadingLayout from '../../../components/common/layout/HeadingLayout/HeadingLayout';
import styled from 'styled-components';
import UploadPost from '../../../components/common/post/UploadPost/UploadPost';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContextStore } from '../../../context/AuthContext';
import Loading from '../../../components/Loading/Loading';

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

  // 로딩 중
  const [isLoading, setIsLoading] = useState(true);
  const [description, setDescription] = useState('데이터를 불러오는 중입니다...');

  const [nickname, setNickname] = useState();
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

  // 유저 닉네임 가져오기
  useEffect(() => {
    const getUserNickname = () => {
      const option = {
        url: `http://localhost:3000/users/${userId}/profile`,
        method: 'GET',
      };

      axios(option)
        .then((res) => {
          setNickname(res.data.user.nickname);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getUserNickname();
  }, [userId]);

  // 새 글 작성 클릭 기능
  const onClickPostRegistrationHandler = () => {
    setIsLoading(false);
    setDescription('새 글을 작성 중입니다...');
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
        {isLoading ? (
          <UploadPostLayout>
            <UploadPost
              nickname={nickname}
              onClickPostRegistrationHandler={onClickPostRegistrationHandler}
              getUploadData={getUploadData}
            />
          </UploadPostLayout>
        ) : (
          <Loading description={description} margin='20rem' />
        )}
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
