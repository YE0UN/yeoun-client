import styled, { css } from 'styled-components';
const SIZES = {
  sm: css`
    --button-width: 6.5rem;
    --button-height: 3.5rem;
    --button-font-size: var(--fs-sm);
    --button-radius: 8px;
  `,
  md: css`
    --button-width: 10rem;
    --button-font-size: var(--fs-sm);
    --button-height: 4.5rem;
    --button-radius: 8px;
  `,
  lg: css`
    --button-width: 10rem;
    --button-height: 5.4rem;
    --button-font-size: var(--fs-lg);
    --button-radius: 8px;
  `,
  xl: css`
    --button-width: 45rem;
    --button-height: 6rem;
    --button-font-size: var(--fs-lg);
    --button-radius: 8px;
  `,
};

const VARIANTS = {
  main: css`
    --button-color: #ffffff;
    --button-bg-color: #577fa0;
    --button-hover-bg-color: #94afc6;
  `,
  region: css`
    --button-color: #ffffff7;
    --button-bg-color: #767676;
    --button-hover-bg-color: #c4c4c4;
  `,
};
const Button = ({ disabled, size, variants, children }) => {
  const styleSize = SIZES[size];
  const variantStyle = VARIANTS[variants];

  return (
    <MainBtn styleSize={styleSize} variantStyle={variantStyle} disabled={disabled}>
      {children}
    </MainBtn>
  );
};

export default Button;

const MainBtn = styled.button`
  ${(p) => p.styleSize}
  ${(p) => p.variantStyle}
  background-color: var(--button-bg-color,--main-btn-color);
  width: var(--button-width);
  height: 60px;
  color: var(--main-btn-text-color, #ffffff);
  border-radius: 8px;
  font-size: var(--button-font-size);
  padding: var(--button-padding);
  margin: var(--button-margin);

  &:active,
  &:focus,
  &:hover {
    background-color: var(--button-hover-bg-color, --main-btn-hover-color);
  }

  &:disabled {
    cursor: default;
    background-color: var(--main-btn-disabled-color);
  }
`;
