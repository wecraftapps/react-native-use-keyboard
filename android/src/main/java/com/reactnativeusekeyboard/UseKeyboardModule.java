package com.reactnativeusekeyboard;

import androidx.annotation.NonNull;
import android.app.Activity;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.module.annotations.ReactModule;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.bridge.Arguments;

@ReactModule(name = UseKeyboardModule.NAME)
public class UseKeyboardModule extends ReactContextBaseJavaModule {
    public static final String NAME = "UseKeyboard";
    private final ReactApplicationContext reactContext;

    public UseKeyboardModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    @NonNull
    public String getName() {
        return NAME;
    }

    public void sendEvent(String event, WritableMap params) {
      if (this.reactContext != null) {
        this.reactContext
          .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
          .emit(event, params);
      }
    }

    @ReactMethod
    public void initialize() {
      final Activity activity = getCurrentActivity();

      if (activity == null) {
        return;
      }

      activity.runOnUiThread(new Runnable() {
        @Override
        public void run() {
          new KeyboardHeightProvider(getReactApplicationContext(), activity.getWindowManager(), activity.getWindow().getDecorView(), new KeyboardHeightProvider.KeyboardHeightListener() {
            @Override
            public void onKeyboardHeightChanged(int keyboardHeight, boolean keyboardOpen, boolean isLandscape) {
                WritableMap params = Arguments.createMap();
                params.putInt("keyboardHeight", keyboardHeight);
                sendEvent("androidKeyboardHeight", params);
            }
          });
        }
      });
    }
}
