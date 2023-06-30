import styled, { css } from 'styled-components';

const SIZES = {
  md: css`
    --button-width: 10rem;
    --button-height: 4.5rem;
    --button-font-size: var(--fs-lg);
  `,
  lg: css`
    --button-width: 10rem;
    --button-height: 5.4rem;
    --button-font-size: var(--fs-lg);
  `,
  xl: css`
    --button-width: 45rem;
    --button-height: 6rem;
    --button-font-size: var(--fs-lg);
  `,
  myPage: css`
    --button-width: 14.5rem;
    --button-height: 4.5rem;
    --button-font-size: var(--fs-lg);
  `,
  profileSetting: css`
    --button-width: 40rem;
    --button-height: 5.4rem;
    --button-font-size: var(--fs-lg);
  `,
};

const Button = ({ size, disabled, children, onClickHandler }) => {
  const styleSize = SIZES[size];

  return (
    <MainBtn styleSize={styleSize} disabled={disabled} onClick={() => (onClickHandler ? onClickHandler() : '')}>
      {children}
    </MainBtn>
  );
};

export default Button;

const MainBtn = styled.button`
  ${(p) => p.styleSize}
  min-width: var(--button-width);
  height: var(--button-height);
  font-size: var(--button-font-size);
  font-weight: 700;
  border-radius: 8px;
  background-color: var(--main-btn-color);
  color: var(--btn-text-color);

  &:hover {
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.3);
  }

  &:disabled {
    cursor: default;
    background-color: var(--main-btn-disabled-color);
  }
`;
