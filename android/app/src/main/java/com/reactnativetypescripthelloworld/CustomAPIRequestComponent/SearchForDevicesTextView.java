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

    public SearchForDevicesTextView(Activity context, String textToDisplay, int widthOffSet) {
        super(context);
        this.i = 1;
        this.widthOffSet = widthOffSet;
        this.textToDisplay = textToDisplay;
        this.setTextColor(Color.CYAN);
        this.setBackgroundColor(Color.BLACK);
        this.setTextSize(20f);

        DisplayMetrics displayMetrics = new DisplayMetrics();
        ((Activity) getContext()).getWindowManager()
                .getDefaultDisplay()
                .getMetrics(displayMetrics);

        int width = displayMetrics.widthPixels;

        ViewGroup.LayoutParams layoutParams = new ViewGroup.LayoutParams(width - widthOffSet,
                150);
        this.setLayoutParams(layoutParams);

        this.setPadding(20, 25, 0, 0);
    }

    public void setTextToDisplay(){

    }

    @Override
    public void onRestoreInstanceState(Parcelable state) {
        super.onRestoreInstanceState(state);

        DisplayMetrics displayMetrics = new DisplayMetrics();


        ((Activity) getContext()).getWindowManager()
                .getDefaultDisplay()
                .getMetrics(displayMetrics);
        int width = displayMetrics.widthPixels;
        ViewGroup.LayoutParams layoutParams = new ViewGroup.LayoutParams(width - widthOffSet,
                ViewGroup.LayoutParams.MATCH_PARENT);


        Toast.makeText(getContext(), "on restore instance state", Toast.LENGTH_LONG);

    }

    @Override
    protected void onAttachedToWindow() {
        super.onAttachedToWindow();

        Toast.makeText(getContext(), "on attached to window", Toast.LENGTH_LONG);
    }

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
        }, 0, 1000 / 8);
    }

    public void stopScan(){
        this.myTimer.cancel();
        handler.post(new Runnable() {
            @Override
            public void run() {
                setText("not connected to NEARBY API...");
                invalidate();
            }
        });
        this.i = 1;
    }

    @Override
    protected void onDraw(Canvas canvas) {
        super.onDraw(canvas);
    }

    private void UpdateGUI() {
        if (this.i >= this.textToDisplay.length())
            this.i = 1;
        this.textScrollCurrentState = this.textToDisplay.substring(0, this.i);
        handler.post(myRunnable);
//        runO
        this.i++;
    }

    final Runnable myRunnable = new Runnable() {
        public void run() {
            setText(textScrollCurrentState);
            invalidate();
        }
    };
}
