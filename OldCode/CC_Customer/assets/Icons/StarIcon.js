import React from 'react';
import {View} from 'react-native';
import Svg, {Path} from 'react-native-svg';

const StarIcon = props => (
  <View {...props}>
    <Svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M5 0L6.545 3.13L10 3.635L7.5 6.07L8.09 9.51L5 7.885L1.91 9.51L2.5 6.07L0 3.635L3.455 3.13L5 0Z"
        fill="white"
      />
    </Svg>
  </View>
);

export default StarIcon;
