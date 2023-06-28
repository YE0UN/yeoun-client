import React, { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AuthContextStore } from '../../context/AuthContext';

import NonAuthRoute from './NonAuthRoute';
import AuthRoute from './AuthRoute';

import HomePage from '../../pages/homePage/HomePage/HomePage';
import SignupPage from '../../pages/signupPage/SignupPage';
import LoginPage from './../../pages/LoginPage/LoginPage';
import PostUploadPage from '../../pages/postPage/PostUploadPage/PostUploadPage';
import PostModificationPage from '../../pages/postPage/PostModificationPage/PostModificationPage';
import PostDetailPage from '../../pages/postPage/postDetailPage/PostDetailPage';
import ProgileSettingsPage from '../../pages/ProfileSettingsPage/ProgileSettingsPage';
import NotFoundPage from '../../pages/NotFoundPage/NotFoundPage';
import Mypage from '../../pages/myPage/MyPage/Mypage';

const Router = () => {
  const { userId } = useContext(AuthContextStore);

  return (
    <Routes>
      <Route path='*' element={<NotFoundPage />} />
      <Route path='/notfound' element={<NotFoundPage />} />
      <Route path='/' element={<HomePage />} />

      <Route element={<NonAuthRoute authenticated={userId} />}>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/join' element={<SignupPage />} />
      </Route>

      <Route element={<AuthRoute authenticated={userId} />}>
        <Route path='/post' element={<PostUploadPage />} />
        <Route path='/post/:postId' element={<PostDetailPage />} />
        <Route path='/post/edit/:id' element={<PostModificationPage />} />
        <Route path='/mypage' element={<Mypage />} />
        <Route path='/profile/edit' element={<ProgileSettingsPage />} />
      </Route>
    </Routes>
  );
};

export default Router;
