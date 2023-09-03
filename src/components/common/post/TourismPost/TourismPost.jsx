import React from 'react';
import styled from 'styled-components';

const TourismPost = ({ tourismInfo }) => {
  return (
    <a
      href={`https://search.naver.com/search.naver?sm=tab_hty.top&where=nexearch&query=${tourismInfo.name}`}
      target='_blank'
      rel='noopener noreferrer'
    >
      <Article>
        <h3 className='sr-only'>{tourismInfo.name}</h3>
        <Img src={tourismInfo.img} alt={`${tourismInfo.name} 이미지`} />
      </Article>
    </a>
  );
};

export default TourismPost;

const Article = styled.article``;

const Img = styled.img`
  width: 10rem;
  height: 10rem;
  border-radius: 1rem;
`;
