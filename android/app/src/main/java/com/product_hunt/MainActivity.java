package com.product_hunt;

import android.content.Intent;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;

import java.util.Arrays;
import java.util.List;
import com.oblador.vectoricons.VectorIconsPackage;
import me.neo.react.StatusBarPackage;
import com.chymtt.reactnativecalendar.CalendarPackage;
import com.idehub.GoogleAnalyticsBridge.GoogleAnalyticsBridgePackage;
import com.microsoft.codepush.react.CodePush;
import cl.json.RNSharePackage;
import com.slowpath.hockeyapp.RNHockeyAppModule;
import com.slowpath.hockeyapp.RNHockeyAppPackage;
import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;

public class MainActivity extends ReactActivity {
    private CodePush _codePush;
    private ReactNativePushNotificationPackage mReactNativePushNotificationPackage;

    @Override
    protected String getJSBundleFile() {
        return this._codePush.getBundleUrl("index.android.bundle");
    }

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "product_hunt";
    }

    /**
     * Returns whether dev mode should be enabled.
     * This enables e.g. the dev menu.
     */
    @Override
    protected boolean getUseDeveloperSupport() {
        return BuildConfig.DEBUG;
    }

   /**
   * A list of packages used by the app. If the app uses additional views
   * or modules besides the default ones, add more packages here.
   */
    @Override
    protected List<ReactPackage> getPackages() {
        this._codePush = new CodePush("bEo2X-mD6peAHxpQMA2zw-d8dIvfE1B2J_Xug", this, BuildConfig.DEBUG);
        mReactNativePushNotificationPackage = new ReactNativePushNotificationPackage(this);

      return Arrays.<ReactPackage>asList(
        new MainReactPackage(),
              this._codePush.getReactPackage(),
              new VectorIconsPackage(),
                new StatusBarPackage(this),
                new CalendarPackage(),
                new GoogleAnalyticsBridgePackage("UA-4655726-8"),
                new RNSharePackage(),
                new RNHockeyAppPackage(this),
              mReactNativePushNotificationPackage
      );
    }

    @Override
    protected void onNewIntent (Intent intent) {
        super.onNewIntent(intent);

        mReactNativePushNotificationPackage.newIntent(intent);
    }

}
