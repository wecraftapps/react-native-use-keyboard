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

export const useKeyboard = (
  didShow?: () => void,
  didHide?: () => void
): [KeyboardState] => {
  const [keyboardData, setKeyboardData] = useState(CLOSED_STATE);

  useEffect(() => {
    if (isAndroid)
      DeviceEventEmitter.addListener('androidKeyboard', onKeyboardDidShow);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onKeyboardDidShow = (e: any): void => {
    const tmpKeyboardHeight = isAndroid
      ? e?.height / ratio
      : e?.endCoordinates?.height;

    setKeyboardData({
      height: tmpKeyboardHeight,
      isOpen: isAndroid ? e?.isOpen : true,
    });

    if (didShow) didShow();
  };

  const onKeyboardDidHide = (): void => {
    setKeyboardData(CLOSED_STATE);

    if (didHide) didHide();
  };

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', onKeyboardDidShow);
    Keyboard.addListener('keyboardDidHide', onKeyboardDidHide);
    return (): void => {
      Keyboard.removeListener('keyboardDidShow', onKeyboardDidShow);
      Keyboard.removeListener('keyboardDidHide', onKeyboardDidHide);
      DeviceEventEmitter.removeListener('androidKeyboard', onKeyboardDidShow);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [keyboardData];
};
