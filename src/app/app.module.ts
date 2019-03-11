import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Geolocation } from '@ionic-native/geolocation/ngx';

// AngularFire + Firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AuthProvider } from '../providers/auth/auth';

// Pages
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

// User Auth Pages
import { WelcomePage } from '../pages/welcome/welcome';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';

// Modules
// import { IonicSwipeAllModule } from 'ionic-swipe-all';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { TextareaAutoresizeDirective } from '../directives/textarea-autoresize/textarea-autoresize';
import { GoogleMaps } from '@ionic-native/google-maps';

export const firebaseConfig = {
  apiKey: "AIzaSyDP3iwcWqnpOEd5_0zlF8UmjJVjNfn5TC0",
  authDomain: "blind-glass.firebaseapp.com",
  databaseURL: "https://blind-glass.firebaseio.com",
  projectId: "blind-glass",
  storageBucket: "blind-glass.appspot.com",
  messagingSenderId: "53323038450"
};


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    WelcomePage,
    LoginPage,
    SignupPage,
    TextareaAutoresizeDirective
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    BrowserAnimationsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    WelcomePage,
    LoginPage,
    SignupPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFireDatabase,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    Geolocation,
    GoogleMaps
  ]
})
export class AppModule {}
