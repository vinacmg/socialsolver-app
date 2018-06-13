import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';

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
import { FirestoreProvider } from '../providers/firestore/firestore';
import { AuthenticationProvider } from '../providers/authentication/authentication';
import { StorageProvider } from '../providers/storage/storage';
import { Geolocation } from '@ionic-native/geolocation';
import { ImagePicker } from '@ionic-native/image-picker';

export const firebaseConfig = {
  apiKey: "AIzaSyCUr8wEpToFZ3UMnw3Kj8OAYYpIzRicIhk",
  authDomain: "socialsolver-app.firebaseapp.com",
  databaseURL: "https://socialsolver-app.firebaseio.com",
  projectId: "socialsolver-app",
  storageBucket: "socialsolver-app.appspot.com",
  messagingSenderId: "329381999567"
};

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
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig, 'socialsolver-app'),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule
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
    FirestoreProvider,
    AuthenticationProvider,
    ImagePicker,
    StorageProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
