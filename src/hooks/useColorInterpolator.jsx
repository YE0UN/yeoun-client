import { useCallback } from 'react';

const useColorInterpolator = (sortedPopularity) => {
  const getColor = useCallback(
    (score) => {
      const minScore = Object.values(sortedPopularity[0] && sortedPopularity[0])[0];
      const maxScore = Object.values(
        sortedPopularity[sortedPopularity.length - 1] && sortedPopularity[sortedPopularity.length - 1],
      )[0];

      // 최소값과 최대값 사이에서 점수를 정규화
      const normalizedScore = Math.min(Math.max(score, minScore), maxScore);

      // 컬러 스케일 설정
      const lightColor = [220, 230, 240];
      const darkColor = [87, 127, 160];

      // 정규화된 점수에 따라 색상을 계산
      const interpolatedColor = lightColor.map((channel, index) => {
        const minChannelValue = channel;
        const maxChannelValue = darkColor[index];
        const channelRange = maxChannelValue - minChannelValue;

        // 정규화된 점수에 따라 색상 채널 값을 계산
        const channelValue = minChannelValue + (normalizedScore / maxScore) * channelRange;

        return Math.round(channelValue);
      });

      return `rgb(${interpolatedColor[0]}, ${interpolatedColor[1]}, ${interpolatedColor[2]})`;
    },
    [sortedPopularity],
  );

  return getColor;
};

export default useColorInterpolator;
