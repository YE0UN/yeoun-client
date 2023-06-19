import styled, { css } from 'styled-components';

export const Button = ({ disabled, size, variants, children }) => {
  const styleSize = SIZES[size];
  const variantStyle = VARIANTS[variants];
  return (
    <MainBtn styleSize={styleSize} variantStyle={variantStyle} disabled={disabled}>
      {children}
    </MainBtn>
  );
};

const MainBtn = styled.button`
  ${(p) => p.styleSize}
  ${(p) => p.variantStyle}

  background-color: var(--main-btn-color);
  width: var(--button-width);
  height: 60px;
  color: var(--main-btn-text-color);
  border-radius: 8px;
  font-size: var(--button-font-size);
  padding: var(--button-padding);
  margin: var(--button-margin);

  &:active,
  &:focus,
  &:hover {
    background-color: var(--main-btn-hover-color);
  }

  &:disabled {
    cursor: default;
    background-color: var(--main-btn-disabled-color);
  }
`;

const SIZES = {
  sm: css`
    --button-width: 65px;
    --button-height: 35px;
    --button-font-size: 16px;
    --button-radius: 8px;
  `,
  md: css`
    --button-width: 100px;
    --button-font-size: 16px;
    --button-height: 54px;
    --button-radius: 8px;
  `,
  lg: css`
    --button-width: 450px;
    --button-height: 60px;
    --button-font-size: 20px;

    --button-radius: 8px;
  `,
};

const VARIANTS = {
  error: css`
    --button-color: #ffffff;
    --button-bg-color: #e23737;
    --button-hover-bg-color: #c82333;
  `,
};
