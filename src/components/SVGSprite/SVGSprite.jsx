import React from 'react';
import spriteSheet from '../../assets/images/sprite-sheet.svg';

const SVGSprite = ({
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
      <use href={`${spriteSheet}#${id}`} />
    </svg>
  );
};

export default SVGSprite;
