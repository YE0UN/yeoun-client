import React, { useCallback, useContext, useEffect, useState } from 'react';
import InnerLayout from '../../../components/common/layout/InnerLayout/InnerLayout';
import HeadingLayout from '../../../components/common/layout/HeadingLayout/HeadingLayout';
import styled from 'styled-components';
import UploadPost from '../../../components/common/post/UploadPost/UploadPost';
import axios from 'axios';
import { Navigate, useParams } from 'react-router-dom';
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

const PostModificationPage = () => {
  const { userToken } = useContext(AuthContextStore);
  const params = useParams();

  const [selectedRegion, setSelectedRegion] = useState('전국');

  // 게시물 내용 상태값
  const [postContent, setPostContent] = useState(null);

  // UploadPost.jsx에서 데이터 가져와 사용하기
  const [postData, setPostData] = useState({
    siDo: '',
    title: '',
    content: '',
    img: '',
    userId: '',
  });

  // UploadPost.jsx에서 title, content, img 데이터 받아오기
  const getModificationData = useCallback(
    (value) => {
      setPostData({
        siDo: selectedRegion,
        title: value.title,
        content: value.postContent,
        img: value.imagePreview,
        userId: userToken,
      });
      console.log(selectedRegion);
      console.log(value.title);
      console.log(value.postContent);
      console.log(value.imagePreview);
    },
    [userToken, selectedRegion],
  );

  // 서버에서 게시물 데이터 가져오기
  useEffect(() => {
    console.log('초기값 가져오기');

    const GetPostInfo = async () => {
      const option = {
        url: `여운url/posts/${params.postid}`,
        method: 'GET',
        headers: { Authorization: `Bearer ${userToken}`, 'Content-type': 'application/json' },
      };

      await axios(option)
        .then((res) => {
          console.log(res);
          // setPostContent(res)
        })
        .catch((err) => {
          console.error(err);
        });
    };
    GetPostInfo();
  }, [userToken, params]);

  // 수정하기 클릭 기능
  const onClickPostModificationHandler = () => {
    const option = {
      url: `여운url/posts/${params.productid}`,
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${userToken}`,
        'Content-type': 'application/json',
      },
      data: postData,
    };

    axios(option)
      .then(() => {
        Navigate('/');
      })
      .catch((err) => {
        console.error(err);
      });

    console.log('게시물이 수정 되었습니다!');
  };

  return (
    <>
      <InnerLayout>
        <HeadingLayout heading='글 수정' />
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
            buttonName='수정완료'
            onClickPostModificationHandler={onClickPostModificationHandler}
            getModificationData={getModificationData}
            // initialTitle={postContent.title} // 게시물 제목을 초기값으로 설정
            // initialContent={postContent.content} // 게시물 내용을 초기값으로 설정
            // initialImage={postContent.image} // 게시물 이미지를 초기값으로 설정
          />
        </UploadPostLayout>
      </InnerLayout>
    </>
  );
};

export default PostModificationPage;

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
