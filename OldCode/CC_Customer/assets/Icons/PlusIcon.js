import React from 'react';
import {View} from 'react-native';
import Svg, {Path} from 'react-native-svg';

const PlusIcon = props => (
  <View {...props}>
    <Svg
      width="14"
      height="15"
      viewBox="0 0 14 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M7.5 3.91663V12.0833"
        stroke="white"
        stroke-width="1.2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M3.41663 8H11.5833"
        stroke="white"
        stroke-width="1.2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  </View>
);

export default PlusIcon;
