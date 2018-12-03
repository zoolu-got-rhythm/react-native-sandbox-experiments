package com.reactnativetypescripthelloworld;

import android.support.annotation.Nullable;
import android.support.annotation.RequiresPermission;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import java.util.Timer;
import java.util.TimerTask;

public class CustomEventEmitter {
    private int nOfEmittedEvents;
    private ReactContext context;

    public CustomEventEmitter(ReactContext context) {
        this.context = context;
        this.nOfEmittedEvents = 0;
    }

    public void emitEventAtIntervals(long delay){
        Timer t = new Timer();
        t.scheduleAtFixedRate(new TimerTask() {
            @Override
            public void run() {
                WritableMap params = Arguments.createMap();
                params.putInt("count", nOfEmittedEvents);
                sendEvent(context, "androidCounter", params);
                nOfEmittedEvents++;
            }
        }, delay, delay);
    }

    private void sendEvent(ReactContext reactContext,
                           String eventName,
                           @Nullable WritableMap params) {
        reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
    }


}
