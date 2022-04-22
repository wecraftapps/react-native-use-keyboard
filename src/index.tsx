import { useEffect, useState } from 'react';
import {
  Keyboard,
  Platform,
  NativeModules,
  PixelRatio,
  DeviceEventEmitter,
} from 'react-native';
import type KeyboardState from './interfaces/keyboard-state.interface';

const ratio = PixelRatio.get();
const isAndroid = Platform.OS === 'android';
const UseKeyboard = NativeModules.UseKeyboard;

if (isAndroid) {
  UseKeyboard.initialize();
}

const CLOSED_STATE = {
  height: 0,
  isOpen: false,
};

export const useKeyboard = (): [KeyboardState] => {
  const [keyboardData, setKeyboardData] = useState(CLOSED_STATE);

  useEffect(() => {
    if (isAndroid)
      DeviceEventEmitter.addListener('androidKeyboard', onKeyboardDidShow);
  }, []);

  const onKeyboardDidShow = (e: any): void => {
    const tmpKeyboardHeight = isAndroid
      ? e?.height / ratio
      : e?.endCoordinates?.height;

    setKeyboardData({
      height: tmpKeyboardHeight,
      isOpen: isAndroid ? e?.isOpen : true,
    });
  };

  const onKeyboardDidHide = (): void => {
    setKeyboardData(CLOSED_STATE);
  };

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', onKeyboardDidShow);
    Keyboard.addListener('keyboardDidHide', onKeyboardDidHide);
    return (): void => {
      Keyboard.removeListener('keyboardDidShow', onKeyboardDidShow);
      Keyboard.removeListener('keyboardDidHide', onKeyboardDidHide);
      DeviceEventEmitter.removeListener('androidKeyboard', onKeyboardDidShow);
    };
  }, []);

  return [keyboardData];
};
