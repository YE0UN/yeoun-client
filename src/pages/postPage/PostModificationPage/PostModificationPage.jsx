import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import PostUploadPage from '../PostUploadPage/PostUploadPage';
import { Navigate, useParams } from 'react-router-dom';
import { AuthContextStore } from '../../../context/AuthContext';

const PostModificationPage = () => {
  const { userToken } = useContext(AuthContextStore);
  const params = useParams();
  console.log(params);

  const [postContent, setPostContent] = useState(null); // 게시물 내용 상태값

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
        })
        .catch((err) => {
          console.error(err);
        });
    };
    GetPostInfo();
  }, [userToken, params]);

  // 수정하기
  const onClickPostModificationHandler = () => {
    // const option = {
    //   url: `여운url/posts/${params.productid}`,
    //   method: 'PUT',
    //   headers: {
    //     Authorization: `Bearer ${userToken}`,
    //     'Content-type': 'application/json',
    //   },
    //   data: {
    //     // post: {
    //     //   sido: ,
    //     //   title: ,
    //     //   content: ,
    //     //   img: ,
    //     //   userId: ,
    //     // },
    //   },
    // };

    // axios(option)
    //   .then(() => {
    //     Navigate('/');
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //   });

    console.log('수정 되었습니다!');
  };

  return (
    <>
      <PostUploadPage
        // initialTitle={postContent.title} // 게시물 제목을 초기값으로 설정
        // initialContent={postContent.content} // 게시물 내용을 초기값으로 설정
        // initialImage={postContent.image} // 게시물 이미지를 초기값으로 설정
        onClickPostModificationHandler={onClickPostModificationHandler}
      />
    </>
  );
};

export default PostModificationPage;
