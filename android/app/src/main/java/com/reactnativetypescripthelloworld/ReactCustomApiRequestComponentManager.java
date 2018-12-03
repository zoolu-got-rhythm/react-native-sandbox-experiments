package com.reactnativetypescripthelloworld;

import android.content.Context;
import android.view.View;

import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.reactnativetypescripthelloworld.CustomAPIRequestComponent.ScanningForDevicesCompoundView;

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

    @ReactProp(name = "shouldScan", defaultBoolean = false)
    public void setSrc(ScanningForDevicesCompoundView view, Boolean bool) {
        if(bool){
            view.startScan();
            view.connectedToApi();
        }else{
            view.startScan();
        }
    }

    // could get screen size directly from JavaScript instead
    @ReactProp(name = "orientation")
    public void setSrc(ScanningForDevicesCompoundView view, String orientation) {
        if(orientation.equals(LANDSCAPE)){

        }

        if(orientation.equals(PORTRAIT)){

        }
    }
}
