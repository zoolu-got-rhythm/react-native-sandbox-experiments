// ToastModule.java

package com.reactnativetypescripthelloworld;

import android.print.PageRange;
import android.support.annotation.Nullable;
import android.util.Log;
import android.widget.Toast;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import java.util.Map;
import java.util.HashMap;

public class CustomToastModule extends ReactContextBaseJavaModule implements LifecycleEventListener {

  private static final String DURATION_SHORT_KEY = "SHORT";
  private static final String DURATION_LONG_KEY = "LONG";

  public CustomToastModule(ReactApplicationContext reactContext) {

    super(reactContext);
    reactContext.addLifecycleEventListener(this);

  }

  @Override
  public String getName() {
    return "ToastExample";
  }

  @Override
  public Map<String, Object> getConstants() {
    final Map<String, Object> constants = new HashMap<>();
    constants.put(DURATION_SHORT_KEY, Toast.LENGTH_SHORT);
    constants.put(DURATION_LONG_KEY, Toast.LENGTH_LONG);
    return constants;
  }

//   The return type of bridge methods is always void. React Native bridge is asynchronous, 
//   so the only way to pass a result to JavaScript is by using 
//   callbacks or emitting events (see below)

  @ReactMethod
  public void show(String message, int duration) {
    Toast.makeText(getReactApplicationContext(), message, duration).show();
    new CustomEventEmitter(getReactApplicationContext()).emitEventAtIntervals(2000);
  }

  @Override
  public void onHostResume() {
    // Activity `onResume`
    WritableMap params = Arguments.createMap();
    Log.d("TOAST ON HOST RESUME", "TOASTY");
    sendEvent(getReactApplicationContext(), "toastModuleOnResume", params);
  }

  @Override
  public void onHostPause() {
    // Activity `onPause`
    WritableMap params = Arguments.createMap();
    sendEvent(getReactApplicationContext(), "toastModuleOnPause", params);

  }

  @Override
  public void onHostDestroy() {
    // Activity `onDestroy`
    WritableMap params = Arguments.createMap();
    sendEvent(getReactApplicationContext(), "toastModuleOnDestroy", params);
  }

  private void sendEvent(ReactContext reactContext,
                         String eventName,
                         @Nullable WritableMap params) {
    reactContext
            .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
            .emit(eventName, params);
  }
}