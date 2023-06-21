import styled, { css } from 'styled-components';
const SIZES = {
  sm: css`
    --button-width: 6.5rem;
    --button-height: 3.5rem;
    --button-font-size: var(--fs-sm);
  `,
  md: css`
    --button-width: 10rem;
    --button-font-size: var(--fs-lg); // --fs-lg
    --button-height: 4.5rem;
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
};

const VARIANTS = {
  duplicate: css`
    --button-height: 6rem;
    --button-color: var(--btn-text-color);
    --button-bg-color: var(--main-btn-color);
    --button-hover-bg-color: var(--main-btn-hover-color);
    --button-font-weight: 700;
  `,
  main: css`
    --button-color: var(--btn-text-color);
    --button-bg-color: var(--main-btn-color);
    --button-hover-bg-color: var(--main-btn-hover-color);
    --button-font-weight: 700;
  `,
  region: css`
    --button-color: var(--btn-text-color);
    --button-bg-color: var(--sub-text-color);
    --button-hover-bg-color: var(--input-border-color);
    --button-font-weight: 700;
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
  height: var(--button-height);
  color: var(--main-btn-text-color, #ffffff);
  border-radius: 8px;
  font-size: var(--button-font-size);
  padding: var(--button-padding);
  margin: var(--button-margin);
  font-weight: var(--button-font-weight);

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
