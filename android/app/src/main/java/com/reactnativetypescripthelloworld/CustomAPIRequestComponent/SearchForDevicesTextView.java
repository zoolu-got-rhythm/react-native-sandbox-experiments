package com.reactnativetypescripthelloworld.CustomAPIRequestComponent;

import android.app.Activity;
import android.content.Context;
import android.graphics.Canvas;
import android.graphics.Color;
import android.os.Handler;
import android.os.Parcelable;
import android.support.v7.widget.AppCompatTextView;
import android.util.DisplayMetrics;
import android.util.Log;
import android.view.ViewGroup;
import android.widget.LinearLayout;
import android.widget.Toast;

import com.facebook.react.uimanager.ThemedReactContext;

import java.util.Timer;
import java.util.TimerTask;

public class SearchForDevicesTextView extends AppCompatTextView {
    final Handler handler = new Handler();
    private String textToDisplay;
    private String textScrollCurrentState;
    private int i;
    private Timer myTimer;
    private int widthOffSet;


    private LinearLayout.LayoutParams layoutParams;

    public SearchForDevicesTextView(Activity context, int widthOffSet) {
        super(context);
        this.i = 1;
        this.widthOffSet = widthOffSet;

        this.setTextColor(Color.CYAN);
        this.setBackgroundColor(Color.BLACK);
        this.setTextSize(20f);

        DisplayMetrics displayMetrics = new DisplayMetrics();
        ((Activity) getContext()).getWindowManager()
                .getDefaultDisplay()
                .getMetrics(displayMetrics);

        int width = displayMetrics.widthPixels;

        this.layoutParams = new LinearLayout.LayoutParams(width - widthOffSet,
                150);
        this.setLayoutParams(layoutParams);

//        this.layoutParams.width = 50;

        this.setPadding(20, 25, 0, 0);
    }

    public void setTextToDisplay(String text){
        if(this.myTimer != null){
            this.stopScan();
        }

        this.textToDisplay = text;
        this.startScan();
    }

    public void setWidth(int pixels) {
//        this.setWidth(pixels);
        this.setLayoutParams(new LinearLayout.LayoutParams(pixels - widthOffSet, 150));
//        this.setLayoutParams(this.layoutParams);
    }


//    @Override
//    public void onRestoreInstanceState(Parcelable state) {
//        super.onRestoreInstanceState(state);
//
//        DisplayMetrics displayMetrics = new DisplayMetrics();
//
//
//        ((Activity) getContext()).getWindowManager()
//                .getDefaultDisplay()
//                .getMetrics(displayMetrics);
//        int width = displayMetrics.widthPixels;
//        ViewGroup.LayoutParams layoutParams = new ViewGroup.LayoutParams(width - widthOffSet,
//                ViewGroup.LayoutParams.MATCH_PARENT);
//
//
//        Toast.makeText(getContext(), "on restore instance state", Toast.LENGTH_LONG);
//
//    }
//
//    @Override
//    protected void onAttachedToWindow() {
//        super.onAttachedToWindow();
//
//        Toast.makeText(getContext(), "on attached to window", Toast.LENGTH_LONG);
//    }

    public void startScan(){
        this.textScrollCurrentState = this.textToDisplay.substring(0, this.i);
        this.setText(this.textScrollCurrentState);
        if(this.myTimer != null)
            this.myTimer.cancel();
        this.myTimer = new Timer();
        this.myTimer.schedule(new TimerTask() {
            @Override
            public void run() {
                UpdateGUI();
            }
        }, 0, 1000 / 30);
    }

    public void stopScan(){
        this.myTimer.cancel();
        this.myTimer = null;
//        handler.post(new Runnable() {
//            @Override
//            public void run() {
//                setText(textToDisplay);
//                invalidate();
//            }
//        });
        this.i = 0;
    }

    @Override
    protected void onDraw(Canvas canvas) {
        super.onDraw(canvas);
    }

    private void UpdateGUI() {
        if (this.i >= this.textToDisplay.length()){
            this.stopScan();
        }else{
            this.i++;
            this.textScrollCurrentState = this.textToDisplay.substring(0, this.i);
            handler.post(myRunnable);
        }
    }

    final Runnable myRunnable = new Runnable() {
        public void run() {
            setText(textScrollCurrentState);
            invalidate();
        }
    };
}
