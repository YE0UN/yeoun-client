import styled, { css } from 'styled-components';
const SIZES = {
  sm: css`
    --button-width: 6.5rem;
    --button-height: 3.5rem;
    --button-font-size: 16px;
    --button-radius: 8px;
  `,
  md: css`
    --button-width: 10rem;
    --button-font-size: 16px;
    --button-height: 4.5rem;
    --button-radius: 8px;
  `,
  lg: css`
    --button-width: 10rem;
    --button-height: 5.4rem;
    --button-font-size: 20px;
    --button-radius: 8px;
  `,
  xl: css`
    --button-width: 45rem;
    --button-height: 6rem;
    --button-font-size: 20px;
    --button-radius: 8px;
  `,
};

const VARIANTS = {
  tab: css`
    --button-color: #ffffff7;
    --button-bg-color: #767676;
    --button-hover-bg-color: #c4c4c4;
  `,
  error: css`
    --button-color: #ffffff;
    --button-bg-color: #e23737;
    --button-hover-bg-color: #c82333;
  `,
};

function Button({ disabled, size, variants, children }) {
  const styleSize = SIZES[size];
  const variantStyle = VARIANTS[variants];

  console.log(variantStyle);
  return (
    <MainBtn styleSize={styleSize} variantStyle={variantStyle} disabled={disabled}>
      {children}
    </MainBtn>
  );
}

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
