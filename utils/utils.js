import {Dimensions} from 'react-native';
const baseRow = 414;
const baseColumn = 965;
const device = Dimensions.get('window');
const deviceRow = device.width;
const deviceColumn = device.height;
export function pxRatio(px, direction) {
  if (direction === 'row') {
    return (px / baseRow) * deviceRow;
  } else if (direction === 'column') {
    return (px / baseColumn) * deviceColumn;
  } else {
    return 'Wrong Direction';
  }
}
