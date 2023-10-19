import React from 'react';

const LocalSVGSprite = ({
  id,
  color,
  width = '100%',
  height = '100%',
  ariaLabel,
  onClickHandler,
  $ref,
  cursor = 'pointer',
}) => {
  return (
    <svg
      fill={color}
      width={width}
      height={height}
      aria-label={ariaLabel}
      onClick={onClickHandler}
      ref={$ref}
      style={{ cursor: `${cursor}` }}
    >
      <use href={`#${id}`} />
    </svg>
  );
};

export default LocalSVGSprite;
