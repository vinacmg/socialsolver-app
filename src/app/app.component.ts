import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { MapPage } from '../pages/map/map';
import { UserFeedPage } from '../pages/user-feed/user-feed';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = UserFeedPage;
  mapPage:any = MapPage;
  userFeedPage:any = UserFeedPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  openPage(page) {
    console.log(page);
    this.rootPage = page;
  }
}
