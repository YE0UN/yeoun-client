import { useEffect, useState } from 'react';

const useFormattedDate = (createdAt) => {
  const [formattedDate, setFormattedDate] = useState('');

  useEffect(() => {
    const currentDate = new Date();
    const postDate = new Date(createdAt);
    const timeDiff = Math.abs(currentDate - postDate);
    const minutesDiff = Math.floor(timeDiff / (1000 * 60));
    const hoursDiff = Math.floor(timeDiff / (1000 * 60 * 60));

    if (minutesDiff < 60) {
      setFormattedDate(`${minutesDiff}분 전`);
    } else if (hoursDiff < 24) {
      setFormattedDate(`${hoursDiff}시간 전`);
    } else {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      setFormattedDate(postDate.toLocaleDateString('ko-KR', options));
    }
  }, [createdAt]);

  return formattedDate;
};

export default useFormattedDate;
