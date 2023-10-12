import React, { useCallback, useContext, useEffect, useState } from 'react';
import InnerLayout from '../../../components/common/layout/InnerLayout/InnerLayout';
import HeadingLayout from '../../../components/common/layout/HeadingLayout/HeadingLayout';
import styled from 'styled-components';
import UploadPost from '../../../components/common/post/UploadPost/UploadPost';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContextStore } from '../../../context/AuthContext';
import Loading from '../../../components/Loading/Loading';
import API from '../../../api/API';
import ENDPOINT from '../../../api/ENDPOINT';

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
  const { userId } = useContext(AuthContextStore);
  const params = useParams();

  const navigate = useNavigate();

  // 로딩 중
  const [isLoading, setIsLoading] = useState(false);
  const [description, setDescription] = useState('데이터를 불러오는 중입니다...');

  // 게시물 내용 상태값
  const [postContent, setPostContent] = useState(null);

  // UploadPost.jsx에서 데이터 가져와 사용하기
  const [postData, setPostData] = useState({
    region: '',
    title: '',
    content: '',
    img: '',
    userId: '',
  });

  const [selectedRegion, setSelectedRegion] = useState('');

  // UploadPost.jsx에서 title, content, img 데이터 받아오기
  const getModificationData = useCallback(
    (value) => {
      setPostData({
        region: selectedRegion,
        title: value.title,
        content: value.postContent,
        img: value.imagePreview,
        userId: userId,
      });
    },
    [userId, selectedRegion],
  );

  // 서버에서 게시물 데이터 가져오기
  useEffect(() => {
    const GetPostInfo = () => {
      API(`${ENDPOINT.POSTS}/${params.id}`, 'GET')
        .then((res) => {
          setPostContent(res.data.post);
          setSelectedRegion(res.data.post.region);
          setIsLoading(true);
        })
        .catch((err) => {
          console.error(err);
          setIsLoading(true);
        });
    };
    GetPostInfo();
  }, [userId, params]);

  // 수정하기 클릭 기능
  const onClickPostModificationHandler = () => {
    setIsLoading(false);
    setDescription('게시물을 수정 중입니다...');

    API(`${ENDPOINT.POSTS}/${params.id}`, 'PUT', postData)
      .then(() => {
        navigate('/');
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // 삭제하기
  const onClickRemovePostHandler = () => {
    setIsLoading(false);
    setDescription('게시물을 삭제 중입니다...');

    API(`${ENDPOINT.POSTS}/${params.id}`, 'DELETE')
      .then(() => {
        navigate('/');
      })
      .catch((err) => {
        console.error(err);
      });
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
        {isLoading ? (
          <UploadPostLayout>
            {postContent ? (
              <UploadPost
                profileImage={postContent.user.profileImage}
                nickname={postContent.user.nickname}
                buttonName='수정완료'
                onClickPostModificationHandler={onClickPostModificationHandler}
                onClickRemovePostHandler={onClickRemovePostHandler}
                getModificationData={getModificationData}
                initialRegion={postContent.siDo}
                initialTitle={postContent.title} // 게시물 제목을 초기값으로 설정
                initialContent={postContent.content} // 게시물 내용을 초기값으로 설정
                initialImage={postContent.img} // 게시물 이미지를 초기값으로 설정
                params={params} // 버튼 활성화를 위해 전달
              />
            ) : (
              <></>
            )}
          </UploadPostLayout>
        ) : (
          <Loading description={description} margin='20rem' />
        )}
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
  background: ${(props) => (props.active ? 'var(--sub-btn-color)' : 'var(--region-btn-color)')};
  &:hover {
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.3);
  }
`;

const UploadPostLayout = styled.div`
  display: flex;
  justify-content: center;
  margin: 5rem;
`;
