import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { LoginPageModule } from '../pages/login/login.module';
import { RegisterUserPageModule } from '../pages/register-user/register-user.module';
import { HomePage } from '../pages/home/home';
import { MapPageModule } from '../pages/map/map.module';
import { NovaDenunciaPageModule } from '../pages/nova-denuncia/nova-denuncia.module';
import { UserFeedPageModule } from '../pages/user-feed/user-feed.module';
import { ReportDetailModalPageModule } from '../pages/report-detail-modal/report-detail-modal.module';
import { SettingsPageModule } from '../pages/settings/settings.module';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FirestoreProvider } from '../providers/firestore/firestore';
import { AuthenticationProvider } from '../providers/authentication/authentication';
import { StorageProvider } from '../providers/storage/storage';
import { Geolocation } from '@ionic-native/geolocation';
import { ImagePicker } from '@ionic-native/image-picker';
import { Camera } from '@ionic-native/camera';

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
    HomePage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig, 'socialsolver-app'),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    LoginPageModule,
    RegisterUserPageModule,
    MapPageModule,
    NovaDenunciaPageModule,
    UserFeedPageModule,
    ReportDetailModalPageModule,
    SettingsPageModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    FirestoreProvider,
    AuthenticationProvider,
    ImagePicker,
    Camera,
    StorageProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
