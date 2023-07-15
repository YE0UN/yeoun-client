import { useEffect } from 'react';

const useImagePreload = (images) => {
  useEffect(() => {
    const preloadImages = images.map((image) => {
      const img = new Image();
      img.src = image;
      return img;
    });

    return () => {
      preloadImages.forEach((image) => {
        image.onload = null;
      });
    };
  }, [images]);
};

export default useImagePreload;
