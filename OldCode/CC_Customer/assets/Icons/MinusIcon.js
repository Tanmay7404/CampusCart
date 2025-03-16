import React from 'react';
import {View} from 'react-native';
import Svg, {Path} from 'react-native-svg';

const MinusIcon = props => (
  <View {...props}>
    <Svg
      width="14"
      height="17"
      viewBox="0 0 14 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M2.91663 9H11.0833"
        stroke="white"
        stroke-width="1.2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  </View>
);

export default MinusIcon;
