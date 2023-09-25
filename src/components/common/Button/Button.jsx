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
    --button-width: 100%;
    --button-height: 6rem;
    --button-font-size: var(--fs-lg);
  `,
  myPage: css`
    --button-width: 14.5rem;
    --button-height: 4.5rem;
    --button-font-size: var(--fs-lg);
  `,
  profileSetting: css`
    --button-width: 100%;
    --button-height: 5.4rem;
    --button-font-size: var(--fs-lg);
  `,
  modalCancel: css`
    --button-width: 8rem;
    --button-height: 4rem;
    --button-font-size: var(--fs-sm);
    --main-btn-color: #eceeee;
    --btn-text-color: initial;
  `,
  modalConfirm: css`
    --button-width: 8rem;
    --button-height: 4rem;
    --button-font-size: var(--fs-sm);
  `,
};

const Button = ({ size, disabled, active, children, onClickHandler, modalRef }) => {
  const styleSize = SIZES[size];

  return (
    <MainBtn
      ref={modalRef}
      styleSize={styleSize}
      disabled={disabled}
      active={active}
      onClick={() => (onClickHandler ? onClickHandler() : '')}
    >
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
  font-weight: ${(p) => (p.styleSize === SIZES.modalCancel || SIZES.modalConfirm ? 500 : 700)};
  border-radius: 8px;
  background-color: ${(p) =>
    p.active === true
      ? 'var(--main-btn-color)'
      : p.active === false
      ? 'var(--main-btn-disabled-color)'
      : 'var(--main-btn-color)'};
  color: var(--btn-text-color);

  &:hover {
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.3);
  }

  &:disabled {
    cursor: default;
    background-color: var(--main-btn-disabled-color);
  }
`;
