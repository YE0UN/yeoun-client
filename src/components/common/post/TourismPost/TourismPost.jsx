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
        <Ul>
          <NameLi>
            <span>{tourismInfo.name}</span>
          </NameLi>
          <LocationLi>{tourismInfo.location}</LocationLi>
        </Ul>
      </Article>
    </a>
  );
};

export default TourismPost;

const Article = styled.article`
  width: 27rem;
  height: 100%;
  border-radius: 1rem;
  border: 1px solid var(--border-color);
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.3);

  &:hover {
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.5);
  }
`;

const Img = styled.img`
  width: 100%;
  height: 20rem;
  border-radius: 1rem 1rem 0 0;
  object-fit: cover;
`;

const Ul = styled.ul`
  width: 100%;
  height: max-content;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.5rem;
`;

const NameLi = styled.li`
  text-align: center;
  font-size: var(--fs-md);
  font-weight: 500;

  // ellipsis
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  word-wrap: break-word;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;

  & > span {
    background: linear-gradient(rgb(87, 127, 160, 0) 0%, rgba(87, 127, 160, 0.3) 100%);
  }
`;

const LocationLi = styled(NameLi)`
  font-size: var(--fs-xs);
  color: var(--sub-text-color);
  font-weight: inherit;
  background: inherit;
`;
