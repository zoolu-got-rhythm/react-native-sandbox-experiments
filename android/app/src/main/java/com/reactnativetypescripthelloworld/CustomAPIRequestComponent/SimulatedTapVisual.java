package com.reactnativetypescripthelloworld.CustomAPIRequestComponent;

import android.graphics.Point;
import android.util.Log;

public class SimulatedTapVisual {
    private Point point;
    private int currentRadius;
    private int maxRadius;
    private Boolean isAnimating;
    private int velocity;
    private Boolean hasFinishedAnimating;

    public SimulatedTapVisual(Point point){
        this.point = point;
        this.velocity = 4;
        this.isAnimating = false;
        this.currentRadius = 0;
        this.maxRadius = 80;
        this.hasFinishedAnimating = false;
    }

    public void animate(){
        (new Thread(){
            public void run() {
                isAnimating = true;
                // Store the current time values.
                long time1 = System.currentTimeMillis();
                long time2;

                // Once active is false, this loop (and thread) terminates.
                while (isAnimating) {
                    try {
                        // This is your target delta. 25ms = 40fps
                        Thread.sleep(10);
                    } catch (InterruptedException e1) {
                        e1.printStackTrace();
                    }

                    time2 = System.currentTimeMillis(); // Get current time
                    int delta = (int) (time2 - time1); // Calculate how long it's been since last update
                    update(delta); // Call update with our delta
                    if(currentRadius >= maxRadius){
                        isAnimating = false;
                        hasFinishedAnimating = true;
                    }
                    time1 = time2; // Update our time variables.
                }
            }
        }).start();
    }

    public void update(int delta){
        float dt = delta / 10; // deltaTime = delta / fps
        Log.d("delta", Float.toString(dt));
        this.currentRadius += (dt * this.velocity);
    }


    public Point getPoint() {
        return point;
    }

    public Boolean getIsAnimating() {
        return isAnimating;
    }

    public int getCurrentRadius() {
        return currentRadius;
    }

    public Boolean getHasFinishedAnimating(){
        return this.hasFinishedAnimating;
    }

    public void setMaxRadius(int maxRadius) {
        this.maxRadius = maxRadius;
    }

    public void setVelocity(int velocity) {
        this.velocity = velocity;
    }
}
