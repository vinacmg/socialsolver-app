import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';
import { NovaDenunciaPage } from '../pages/nova-denuncia/nova-denuncia';
import { MapPage } from '../pages/map/map';
import { UserFeedPage } from '../pages/user-feed/user-feed';
import { SettingsPage } from '../pages/settings/settings';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;
  mapPage: any = MapPage;
  userFeedPage: any = UserFeedPage;
  novaDenunciaPage: any = NovaDenunciaPage;
  settingsPage: any = SettingsPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    this.rootPage = LoginPage;
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  openPage(page) {
    this.rootPage = page;
  }
}
