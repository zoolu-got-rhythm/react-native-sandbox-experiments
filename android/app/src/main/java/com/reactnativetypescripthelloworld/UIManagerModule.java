package com.reactnativetypescripthelloworld;

import android.content.Context;
import android.graphics.Point;
import android.icu.util.Measure;
import android.util.Log;
import android.view.Display;
import android.view.WindowManager;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.IllegalViewOperationException;
import com.facebook.react.uimanager.PixelUtil;

import java.util.Map;

public class UIManagerModule extends ReactContextBaseJavaModule {

//    private Measure mMeasureBuffer;

    private static final String E_LAYOUT_ERROR_PROMISE = "E_LAYOUT_ERROR_PROMISE";



    public UIManagerModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "UIManagerModule";
    }

    @ReactMethod
    public void measureLayout(
            int tag,
            int ancestorTag,
            Callback errorCallback,
            Callback successCallback) {
        try {
//            measureLayout(tag, ancestorTag, mMeasureBuffer);
            WritableMap dimsInPixels = getScreenDimentionsInPixels();
            float relativeX = PixelUtil.toDIPFromPixel(0);
            float relativeY = PixelUtil.toDIPFromPixel(0);
            float width = PixelUtil.toDIPFromPixel(dimsInPixels.getInt("width"));
            float height = PixelUtil.toDIPFromPixel(dimsInPixels.getInt("height"));
            successCallback.invoke(relativeX, relativeY, width, height);
        } catch (IllegalViewOperationException e) {
            errorCallback.invoke(e.getMessage());
        }
    }

    @ReactMethod
    public void measureLayoutPromise(int tag, int ancestorTag, Promise promise){
        try{
            WritableMap layoutDimsInPixels = this.getScreenDimentionsInPixels();
            layoutDimsInPixels.putInt("relativeX", 0);
            layoutDimsInPixels.putInt("relativeY", 0);
            promise.resolve(layoutDimsInPixels);
        }catch (IllegalViewOperationException e){
            promise.reject(E_LAYOUT_ERROR_PROMISE, e);
        }
    }

    private WritableMap getScreenDimentionsInPixels(){
        WindowManager wm = (WindowManager) getReactApplicationContext().getSystemService(Context.WINDOW_SERVICE);
        Display display = wm.getDefaultDisplay();
        Point size = new Point();
        display.getSize(size);
        int width = size.x;
        int height = size.y;
        Log.d("width in pixels", Integer.toString(width));
        Log.d("height in pixels", Integer.toString(height));

        WritableMap m = Arguments.createMap();
        m.putInt("width", width);
        m.putInt("height", height);
        return m;
    }
}
