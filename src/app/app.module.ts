import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { MapPage } from '../pages/map/map';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FirestoreProvider } from '../providers/firestore/firestore';
import { AuthenticationProvider } from '../providers/authentication/authentication';
import { StorageProvider } from '../providers/storage/storage';

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
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    MapPage
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
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    MapPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    FirestoreProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthenticationProvider,
    StorageProvider
  ]
})
export class AppModule {}
