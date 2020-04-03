package com.paffirmation;

import android.os.Bundle;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactRootView;
import com.facebook.react.common.LifecycleState;
import com.facebook.react.shell.MainReactPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "PAffirmation";
    }

   // private ReactInstanceManager mReactInstanceManager;
   // private ReactRootView mReactRootView;

   // @Override
   // protected void onCreate(Bundle savedInstanceState) {
   //     super.onCreate(savedInstanceState);
   //     mReactRootView = new ReactRootView(this);
   //     mReactInstanceManager = ReactInstanceManager.builder()
   //             .setApplication(getApplication())
   //             .addPackage(new MainReactPackage())
   //             .addPackage(new RNSoundPackage())
   //             .build();
   //     mReactRootView.startReactApplication(mReactInstanceManager, "PAffirmation", null); //change "AwesomeProject" to name of your app
   //     setContentView(mReactRootView);
   // }

    @Override
	protected ReactActivityDelegate createReactActivityDelegate() {
	    return new ReactActivityDelegate(this, getMainComponentName()) {
	      	@Override
		    protected ReactRootView createRootView() {
		       	return new RNGestureHandlerEnabledRootView(MainActivity.this);
		    }
	    };
	}
}
