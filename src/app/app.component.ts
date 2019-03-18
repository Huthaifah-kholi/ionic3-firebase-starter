import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { WelcomePage } from '../pages/welcome/welcome';

import { AngularFireAuth } from 'angularfire2/auth';
import { BluetoothPage } from '../pages/bluetooth/bluetooth';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;
  userData = {
    loggedIn: false,
    uid: '',
    displayName: '',
    photoURL: ''
  };

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar,
    public splashScreen: SplashScreen, public afAuth: AngularFireAuth) {

    // here we determine, if user is aunthenticated/have data in our db
    // thats we make before platform ready
    afAuth.authState.subscribe(user => {
      if (!user) {
        // you can modify here the page for non. auth users
        this.rootPage = WelcomePage;

      } else {
        // page for auth. users
        this.rootPage = HomePage;
        this.userData = {
          loggedIn: true,
          uid: user.uid,
          displayName: user.displayName,
          photoURL: user.photoURL || 'assets/imgs/default-user-image.png'
        };

      }
    });

    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Bluetooth', component: BluetoothPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      // let status bar overlay webview
      //this.statusBar.overlaysWebView(true);
      // set status bar to white
      this.statusBar.backgroundColorByHexString('#ffffff');
      //this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  signOutClicked() {
    this.afAuth.auth.signOut();
    this.userData.loggedIn = false;
    this.userData.displayName = '';
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
