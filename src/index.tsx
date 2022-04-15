import { useEffect, useState } from 'react';
import {
  Keyboard,
  Platform,
  NativeModules,
  PixelRatio,
  DeviceEventEmitter,
} from 'react-native';

const ratio = PixelRatio.get();
const isAndroid = Platform.OS === 'android';
const UseKeyboard = NativeModules.UseKeyboard;

if (isAndroid) {
  UseKeyboard.initialize();
}

export const useKeyboardHeight = (
  didShow?: () => void,
  didHide?: () => void
): [number] => {
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    if (isAndroid)
      DeviceEventEmitter.addListener(
        'androidKeyboardHeight',
        onKeyboardDidShow
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onKeyboardDidShow = (e: any): void => {
    const tmpKeyboardHeight = isAndroid
      ? e?.keyboardHeight / ratio
      : e?.endCoordinates?.height;

    setKeyboardHeight(tmpKeyboardHeight);

    if (didShow) didShow();
  };

  const onKeyboardDidHide = (): void => {
    setKeyboardHeight(0);

    if (didHide) didHide();
  };

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', onKeyboardDidShow);
    Keyboard.addListener('keyboardDidHide', onKeyboardDidHide);
    return (): void => {
      Keyboard.removeListener('keyboardDidShow', onKeyboardDidShow);
      Keyboard.removeListener('keyboardDidHide', onKeyboardDidHide);
      DeviceEventEmitter.removeListener(
        'androidKeyboardHeight',
        onKeyboardDidShow
      );
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [keyboardHeight];
};
