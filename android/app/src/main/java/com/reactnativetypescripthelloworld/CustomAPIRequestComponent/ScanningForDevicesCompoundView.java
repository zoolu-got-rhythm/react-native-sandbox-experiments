package com.reactnativetypescripthelloworld.CustomAPIRequestComponent;

import android.app.ActionBar;
import android.app.Activity;
import android.content.Context;
import android.content.res.Resources;
import android.graphics.Color;
import android.graphics.Point;
import android.os.Handler;
import android.os.Parcelable;
import android.util.DisplayMetrics;
import android.util.Log;
import android.view.ViewGroup;
import android.widget.LinearLayout;
import android.widget.Toast;

import com.facebook.react.bridge.ReactContext;
import com.facebook.react.uimanager.PixelUtil;
import com.facebook.react.uimanager.ThemedReactContext;


import java.util.Timer;
import java.util.TimerTask;

public class ScanningForDevicesCompoundView extends LinearLayout {
    private SearchForDevicesTextView searchForDevicesView;
    private RippleWhenTouchesCanvas rippleWhenTouchesCanvas;
    private Timer timer;
//    private

    public ScanningForDevicesCompoundView(ReactContext context) {
        super(context);

        this.setLayoutParams(new LinearLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, 150));
        this.setOrientation(LinearLayout.HORIZONTAL);

        this.searchForDevicesView =
                new SearchForDevicesTextView(((ReactContext) getContext()).getCurrentActivity(),150);
        this.addView(searchForDevicesView);

        this.rippleWhenTouchesCanvas = new RippleWhenTouchesCanvas(context, 150, 150);
        this.addView(rippleWhenTouchesCanvas);
    }

    @Override
    public void onRestoreInstanceState(Parcelable state) {
        super.onRestoreInstanceState(state);

//        DisplayMetrics displayMetrics = new DisplayMetrics();
//
//
//        ((Activity) getContext()).getWindowManager()
//                .getDefaultDisplay()
//                .getMetrics(displayMetrics);
//        int width = displayMetrics.widthPixels;
//        ViewGroup.LayoutParams layoutParams = new ViewGroup.LayoutParams(width - widthOffSet,
//                ViewGroup.LayoutParams.MATCH_PARENT);


        Toast.makeText(getContext(), "on restore instance state", Toast.LENGTH_LONG);

    }

    public void setWidth(int width){

//        getContext().getResources()

        this.searchForDevicesView.setWidth(width);
        Log.d("ScanningForDevices", "setting new width");
    }

    private int getNavigationBarHeight(){
        Resources resources = getContext().getResources();
        int resourceId = resources.getIdentifier("navigation_bar_height", "dimen", "android");
        if (resourceId > 0) {
            return resources.getDimensionPixelSize(resourceId);
        }
        return 0;
    }

    public void setForegroundColour(String hex){
        int colourFromHex = Color.parseColor(hex);
        this.searchForDevicesView.setTextColor(colourFromHex);
        this.rippleWhenTouchesCanvas.setColour(colourFromHex);

        Log.d("ScanningForDevices", "setting foreground colour");

    }

//    @Override
//    protected void onMeasure(int widthMeasureSpec, int heightMeasureSpec) {
//        super.onMeasure(widthMeasureSpec, heightMeasureSpec);
//        Toast.makeText(getContext(), "on measure", Toast.LENGTH_LONG);
//
//    }
//
//    @Override
//    protected void onLayout(boolean changed, int l, int t, int r, int b) {
//        super.onLayout(changed, l, t, r, b);
//        Toast.makeText(getContext(), "on layout", Toast.LENGTH_LONG);
//    }
//
//    @Override
//    protected void onSizeChanged(int w, int h, int oldw, int oldh) {
//        super.onSizeChanged(w, h, oldw, oldh);
//        Toast.makeText(getContext(), "on size changed", Toast.LENGTH_LONG);
//    }
//
//    @Override
//    protected void onAttachedToWindow() {
//        super.onAttachedToWindow();
//
//        Log.d("CUSTOM VIEW", "attached");
//
//        new Handler().post(new Runnable(){
//            @Override
//            public void run() {
//                Toast.makeText(getContext(), "on attached to window", Toast.LENGTH_LONG);
//            }
//        });
//
//
//    }

    public void startScan(){
        if(this.timer != null)
            this.timer.cancel();
        this.timer = new Timer();
        this.timer.scheduleAtFixedRate(new TimerTask() {
            @Override
            public void run() {
                rippleWhenTouchesCanvas.addTap(new ScanningBeam(
                        new Point(75, 75)));
            }
        }, 0, 350);
//        this.rippleWhenTouchesCanvas.
    }

    public void stopScan(){
        this.timer.cancel();
        this.timer = null;
    }

    public void setMessageForUser(String msg){
        this.searchForDevicesView.setTextToDisplay(msg);
    }
}
