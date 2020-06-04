import {Platform} from 'react-native';

export const isIos = Platform.OS === 'ios';
export const OSVersion = isIos ? parseInt(Platform.Version, 10) : Platform.Version;

export routes from './routes';
export * from './url';
export colors from './colors';
