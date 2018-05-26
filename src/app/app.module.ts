import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { LoginPage } from '../pages/login/login';
import { RegisterUserPage } from '../pages/register-user/register-user';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { MapPage } from '../pages/map/map';
import { NovaDenunciaPage } from '../pages/nova-denuncia/nova-denuncia';
import { UserFeedPage } from '../pages/user-feed/user-feed';
import { ReportDetailModalPage } from '../pages/report-detail-modal/report-detail-modal';
import { SettingsPage } from '../pages/settings/settings';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Geolocation } from '@ionic-native/geolocation';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    RegisterUserPage,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    MapPage,
    NovaDenunciaPage,
    UserFeedPage,
    ReportDetailModalPage,
    SettingsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    RegisterUserPage,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    MapPage,
    NovaDenunciaPage,
    UserFeedPage,
    ReportDetailModalPage,
    SettingsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
