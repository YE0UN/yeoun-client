import React from 'react';
import { createPortal } from 'react-dom';

const spriteSheet = (
  <svg xmlns='http://www.w3.org/2000/svg'>
    <symbol id='chevron-icon' viewBox='0 0 38 38'>
      <path
        stroke='#000'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        d='M32.97 25.985L19 12.015 5.03 25.985'
      />
    </symbol>
    <symbol id='chevron-up-icon' viewBox='0 0 38 38'>
      <path
        stroke='#fff'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={4}
        d='M32.97 25.985L19 12.015 5.03 25.985'
      />
    </symbol>
    <symbol id='bookmark-icon' viewBox='0 0 26 34'>
      <path
        fill='#fff'
        stroke='#0D3A64'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        d='M25 33l-12-8.889L1 33V4.556c0-.943.361-1.848 1.004-2.515A3.368 3.368 0 0 1 4.43 1h17.14c.91 0 1.782.375 2.425 1.041A3.623 3.623 0 0 1 25 4.556V33z'
      />
    </symbol>
    <symbol id='chevron-down-icon' viewBox='0 0 38 38'>
      <path
        stroke='#fff'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={4}
        d='M32.97 12.015L19 25.985 5.03 12.015'
      />
    </symbol>
    <symbol id='copyright-icon' viewBox='0 0 16 16'>
      <path d='M9.238 6.61l1.261-1.26a3.556 3.556 0 1 0 .156 5.153L9.488 9.336h-.186a1.778 1.778 0 1 1-.065-2.726z' />
      <path
        fillRule='evenodd'
        d='M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zm0 1.778A6.222 6.222 0 1 1 8 14.22 6.222 6.222 0 0 1 8 1.778z'
        clipRule='evenodd'
      />
    </symbol>
    <symbol id='comment-icon' viewBox='0 0 24 24'>
      <path
        stroke='#767676'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        d='M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.379 8.379 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z'
      />
    </symbol>
    <symbol id='close-icon' viewBox='0 0 48 48'>
      <path stroke='#0D3A64' strokeLinecap='round' strokeLinejoin='round' strokeWidth={4} d='M36 12L12 36m0-24l24 24' />
    </symbol>
    <symbol id='check-icon' viewBox='0 0 28 21'>
      <path stroke='#fff' strokeLinecap='round' strokeLinejoin='round' strokeWidth={4} d='M26 2L9.5 18.5 2 11' />
    </symbol>
    <symbol id='delete-light-icon' viewBox='0 0 10 10'>
      <path stroke='#E4E9EA' strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M7.5 2.5l-5 5m0-5l5 5' />
    </symbol>
    <symbol id='delete-icon' viewBox='0 0 48 48'>
      <path stroke='#0D3A64' strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M36 12L12 36m0-24l24 24' />
    </symbol>
    <symbol id='edit-icon' viewBox='0 0 30 30'>
      <path
        stroke='#0D3A64'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        d='M21.25 3.75a3.536 3.536 0 0 1 5 5L9.375 25.625 2.5 27.5l1.875-6.875L21.25 3.75z'
      />
    </symbol>
    <symbol id='heart-fill-icon' viewBox='0 0 24 24'>
      <path
        fill='#E23737'
        stroke='#E23737'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        d='M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.501 5.501 0 1 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z'
      />
    </symbol>
    <symbol id='photo-icon' viewBox='0 0 40 40'>
      <path
        stroke='#767676'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        d='M31.667 5H8.333A3.333 3.333 0 0 0 5 8.333v23.334A3.333 3.333 0 0 0 8.333 35h23.334A3.333 3.333 0 0 0 35 31.667V8.333A3.333 3.333 0 0 0 31.667 5z'
      />
      <path
        stroke='#767676'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        d='M14.166 16.666a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zM35 25l-8.333-8.334L8.333 35'
      />
    </symbol>
    <symbol id='octocat-icon' viewBox='0 0 32 32'>
      <path
        fill='#24292F'
        fillRule='evenodd'
        d='M16 0C7.16 0 0 7.16 0 16c0 7.08 4.58 13.06 10.94 15.18.8.14 1.1-.34 1.1-.76 0-.38-.02-1.64-.02-2.98-4.02.74-5.06-.98-5.38-1.88-.18-.46-.96-1.88-1.64-2.26-.56-.3-1.36-1.04-.02-1.06 1.26-.02 2.16 1.16 2.46 1.64 1.44 2.42 3.74 1.74 4.66 1.32.14-1.04.56-1.74 1.02-2.14-3.56-.4-7.28-1.78-7.28-7.9 0-1.74.62-3.18 1.64-4.3-.16-.4-.72-2.04.16-4.24 0 0 1.34-.42 4.4 1.64 1.28-.36 2.64-.54 4-.54 1.36 0 2.72.18 4 .54 3.06-2.08 4.4-1.64 4.4-1.64.88 2.2.32 3.84.16 4.24 1.02 1.12 1.64 2.54 1.64 4.3 0 6.14-3.74 7.5-7.3 7.9.58.5 1.08 1.46 1.08 2.96 0 2.14-.02 3.86-.02 4.4 0 .42.3.92 1.1.76C27.42 29.06 32 23.06 32 16c0-8.84-7.16-16-16-16z'
        clipRule='evenodd'
      />
    </symbol>
    <symbol id='heart-icon' viewBox='0 0 24 24'>
      <path
        stroke='#767676'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        d='M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.501 5.501 0 1 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z'
      />
    </symbol>
    <symbol id='map-icon' viewBox='0 0 38 39'>
      <path
        stroke='#000'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        d='M1.583 9.75v25.333l11.084-6.333 12.667 6.333 11.083-6.333V3.416L25.333 9.75 12.668 3.417 1.583 9.75zm11.083-6.333V28.75m12.668-19v25.333'
      />
    </symbol>
    <symbol id='plus-icon' viewBox='0 0 48 48'>
      <path stroke='#fff' strokeLinecap='round' strokeLinejoin='round' strokeWidth={4} d='M24 10v28M10 24h28' />
    </symbol>
    <symbol id='kebab-icon' viewBox='0 0 24 24'>
      <path
        stroke='#94AFC6'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        d='M12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0-7a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2z'
      />
    </symbol>
    <symbol id='search-icon' viewBox='0 0 30 30'>
      <path
        fill='#90CAF9'
        d='M25.213 22.795c.369.41.369 1.025-.041 1.394l-1.149 1.149c-.369.41-.984.41-1.394 0l-4.06-4.06a.96.96 0 0 1-.288-.698v-.697a8.477 8.477 0 0 1-5.25 1.805A8.525 8.525 0 0 1 4.5 13.155c0-4.676 3.814-8.531 8.531-8.531 4.676 0 8.531 3.855 8.531 8.531 0 2.01-.697 3.815-1.804 5.25h.656c.246 0 .492.123.697.287l4.102 4.102zM13.03 18.406c2.871 0 5.25-2.338 5.25-5.25 0-2.87-2.379-5.25-5.25-5.25-2.912 0-5.25 2.38-5.25 5.25a5.234 5.234 0 0 0 5.25 5.25z'
      />
    </symbol>
    <symbol id='send-icon' viewBox='0 0 45 45'>
      <path
        stroke='#767676'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        d='M41.25 3.75L20.625 24.375M41.25 3.75l-13.125 37.5-7.5-16.875-16.875-7.5L41.25 3.75z'
      />
    </symbol>
    <symbol id='setting-icon' viewBox='0 0 24 24'>
      <g stroke='#767676' strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} clipPath='url(#a)'>
        <path d='M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z' />
        <path d='M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a1.998 1.998 0 0 1 0 2.83 1.998 1.998 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a1.998 1.998 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 3.417 1.415 2 2 0 0 1-.587 1.415l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z' />
      </g>
      <defs>
        <clipPath id='a'>
          <path fill='#fff' d='M0 0h24v24H0z' />
        </clipPath>
      </defs>
    </symbol>
    <symbol id='send-fill-icon' viewBox='0 0 45 45'>
      <path
        stroke='#577FA0'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        d='M41.25 3.75L20.625 24.375M41.25 3.75l-13.125 37.5-7.5-16.875-16.875-7.5L41.25 3.75z'
      />
    </symbol>
    <symbol id='bookmark-fill-icon' viewBox='0 0 26 34'>
      <path
        fill='#94AFC6'
        stroke='#0D3A64'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        d='M25 33l-12-8.889L1 33V4.556c0-.943.361-1.848 1.004-2.515A3.368 3.368 0 0 1 4.43 1h17.14c.91 0 1.782.375 2.425 1.041A3.623 3.623 0 0 1 25 4.556V33z'
      />
    </symbol>
    <symbol id='user-icon' viewBox='0 0 36 36'>
      <path
        stroke='#D8D8D8'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        d='M30 31.5v-3a6 6 0 0 0-6-6H12a6 6 0 0 0-6 6v3m12-15a6 6 0 1 0 0-12 6 6 0 0 0 0 12z'
      />
    </symbol>
    <symbol id='user-fill-icon' viewBox='0 0 36 36'>
      <path
        stroke='#050505'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        d='M30 31.5v-3a6 6 0 0 0-6-6H12a6 6 0 0 0-6 6v3m12-15a6 6 0 1 0 0-12 6 6 0 0 0 0 12z'
      />
    </symbol>
  </svg>
);

const GlobalSVGSprite = () => {
  const GlobalSVG = document.querySelector('#GlobalSVG');

  return createPortal(spriteSheet, GlobalSVG);
};

export default GlobalSVGSprite;
