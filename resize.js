import React from 'react';
import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

export const RH = (val) => {
  let result = (val / 100) * height;
  return result;
};

export const RW = (val) => {
  let result = (val / 100) * width;
  return result;
};

export const RF = (val) => {
  let result = val / 100;
  result = result * (height + width);
  return result * 0.13;
};
