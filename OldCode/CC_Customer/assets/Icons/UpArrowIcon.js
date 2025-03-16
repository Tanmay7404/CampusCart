import React from 'react';
import {View} from 'react-native';
import Svg, {Path} from 'react-native-svg';

const UpArrowIcon = props => (
  <View {...props}>
    <Svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M6 15L12 9L18 15"
        stroke="#6F6F6F"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  </View>
);

export default UpArrowIcon;
