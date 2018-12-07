package com.reactnativetypescripthelloworld;

import android.content.Context;
import android.util.Log;
import android.view.View;

import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.PixelUtil;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.reactnativetypescripthelloworld.CustomAPIRequestComponent.ScanningForDevicesCompoundView;

import java.util.Map;

public class ReactCustomApiRequestComponentManager extends SimpleViewManager<ScanningForDevicesCompoundView> {
    public static final String REACT_CLASS = "RCTCustomApiRequestComponent";


    private static final String LANDSCAPE = "LANDSCAPE";
    private static final String PORTRAIT = "PORTRAIT";

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    // may need to wrap component in a view class
    @Override
    protected ScanningForDevicesCompoundView createViewInstance(ThemedReactContext reactContext) {
        return new ScanningForDevicesCompoundView(reactContext);
    }

    @Override
    public Map getExportedCustomBubblingEventTypeConstants() {

        return MapBuilder.builder()
                .put(
                        "onRefresh",
                        MapBuilder.of(
                                "phasedRegistrationNames",
                                MapBuilder.of("bubbled", "onTouchEnd")))
                .build();
    }

    @ReactProp(name = "shouldScan", defaultBoolean = false)
    public void shouldScan(ScanningForDevicesCompoundView view, Boolean bool) {
        if(bool){
            view.startScan();
        }else{
            view.stopScan();
        }
    }

    // could get screen size directly from JavaScript instead
//    @ReactProp(name = "orientation")
//    public void setOrientation(ScanningForDevicesCompoundView view, String orientation) {
//        if(orientation.equals(LANDSCAPE)){
//
//        }
//
//        if(orientation.equals(PORTRAIT)){
//
//        }
//    }

    @ReactProp(name = "colourHex")
    public void setColour(ScanningForDevicesCompoundView view, String colourHex){
        view.setForegroundColour(colourHex);
    }

    // note: a pixel will likely be lost if float to int cast is done in prop meth parameters
    @ReactProp(name = "width")
    public void setWidth(ScanningForDevicesCompoundView view, float width){
        view.setWidth((int) PixelUtil.toPixelFromDIP(width));

        Log.d("pixel i'm after", Float.toString(PixelUtil.toDIPFromPixel(150)));
    }

    @ReactProp(name = "messageToUser")
    public void messageToUser(ScanningForDevicesCompoundView view, String messageToUser){
        view.setMessageForUser(messageToUser);
    }
}
