package com.reactnativetypescripthelloworld.CustomAPIRequestComponent;

import android.content.Context;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Paint;
import android.graphics.Path;
import android.graphics.Point;
import android.support.annotation.NonNull;
import android.util.Log;
import android.view.View;
import android.view.ViewGroup;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.events.RCTEventEmitter;
import com.reactnativetypescripthelloworld.CustomAPIRequestComponent.SimulatedTapVisual;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

public class RippleWhenTouchesCanvas extends View {
    private List<SimulatedTapVisual> tapsOnScreenBuffer;
    private Paint mPaint;
    private Boolean isRendering;
    private int width, height;

    private static int padding = 30;
    private static int arrowSize = 12;

    private Point[] a, b;


//    private int i;

    public RippleWhenTouchesCanvas(ReactContext context, int width, int height) {
        super(context);
        this.width = width;
        this.height = height;
//        this.i = 1;

        ViewGroup.LayoutParams layoutParams = new ViewGroup.LayoutParams(width,
                height);

        this.setLayoutParams(layoutParams);
        this.setBackgroundColor(Color.BLACK);
        this.mPaint = new Paint();
        this.mPaint.setColor(Color.CYAN);
        this.mPaint.setStrokeWidth(16f);
        this.mPaint.setStyle(Paint.Style.STROKE);


        this.tapsOnScreenBuffer = new CopyOnWriteArrayList<>(); // read up on how this works more
        this.isRendering = false;

        this.a = new Point[] {
                new Point(padding, padding),
                new Point(this.width - padding, padding),
                new Point(this.width - padding, (this.height / 2)),
                new Point((this.width - padding) + arrowSize, (this.height / 2)),
                new Point(this.width - padding, (this.height / 2) + arrowSize),
                new Point((this.width - padding) - arrowSize, (this.height / 2)),
                new Point(this.width - padding, (this.height / 2))
        };

        this.b = new Point[]{
                new Point(this.width - padding, this.height - padding),
                new Point(padding, this.height - padding),
                new Point(padding, ((this.height / 2))),
                new Point(0 + padding - arrowSize, this.height / 2),
                new Point(0 + padding, (this.height / 2)  - arrowSize),
                new Point(0 + padding + arrowSize, this.height / 2),
                new Point(0 + padding, this.height / 2)
        };

        this.setOnClickListener(new OnClickListener() {
            @Override
            public void onClick(View v) {
                Log.d("click", "clicked");
                if(tapsOnScreenBuffer.size() == 0)
                    onReceiveNativeEvent();
            }
        });
    }

    private void onReceiveNativeEvent() {
        WritableMap event = Arguments.createMap();
        event.putString("message", "MyMessage");
        ReactContext reactContext = (ReactContext)getContext();
        reactContext.getJSModule(RCTEventEmitter.class).receiveEvent(
                getId(),
                "onRefresh",
                event);
    }

    public void setColour(int colour){
        this.mPaint.setColor(colour);
    }

    @Override
    protected void onDraw(android.graphics.Canvas canvas) {
        // draw
        for(SimulatedTapVisual tap : this.tapsOnScreenBuffer){
            canvas.drawCircle(tap.getPoint().x, tap.getPoint().y, tap.getCurrentRadius(), this.mPaint);
        }

        if(this.tapsOnScreenBuffer.size() == 0){
            drawPointsToCanvas(a, canvas);
            drawPointsToCanvas(b, canvas);
        }

        super.onDraw(canvas);
    }

    private void drawPointsToCanvas(Point[] pts, Canvas canvas){
//        if(i == pts.length)
//            i = 1;
//        i++;

        Path p = new Path();
        p.moveTo(pts[0].x, pts[0].y);
        for (int j = 1; j < pts.length; j++) {
            p.lineTo(pts[j].x, pts[j].y);
        }
        canvas.drawPath(p, this.mPaint);
    }


    @Override
    protected void onAttachedToWindow() {
        super.onAttachedToWindow();
        this.render();
    }

    @Override
    protected void onDetachedFromWindow() {
        super.onDetachedFromWindow();
        this.isRendering = false;
    }

    // make private?
    public void render(){
        this.isRendering = true;
        new Thread(){
            public void run() {
                while(isRendering) {
//                    Log.d("rendering", "yup");
                    try {
                        checkAndClearBuffer();
                        postInvalidate();
                        Thread.sleep(25); // 40fp
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                }
            }
        }.start();
    }

    public void checkAndClearBuffer(){
        for(SimulatedTapVisual tap : this.tapsOnScreenBuffer){
            if(tap.getHasFinishedAnimating())
                this.tapsOnScreenBuffer.remove(0);
        }
    }

    @Override
    protected void onMeasure(int widthMeasureSpec, int heightMeasureSpec) {
        super.onMeasure(widthMeasureSpec, heightMeasureSpec);
    }

    public synchronized void addTap(SimulatedTapVisual tap){
        this.tapsOnScreenBuffer.add(tap);
        tap.animate();
    }
}
