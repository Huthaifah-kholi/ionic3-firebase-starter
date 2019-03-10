import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { Geolocation, GeolocationOptions, Geoposition } from '@ionic-native/geolocation/ngx';

import { trigger, transition, style, animate, state } from '@angular/animations';

import { AngularFireAuth } from 'angularfire2/auth';

declare var google;
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  animations: [
    trigger(
      'myAnimation',
      [
        transition(
        ':enter', [
          style({transform: 'translateY(30%)', opacity: 0}),
          animate('800ms', style({transform: 'translateY(0)', 'opacity': 1}))]
        // )
        ),
        transition(
        ':leave', [
          style({transform: 'translateX(0)', 'opacity': 1}),
          animate('500ms', style({transform: 'translateX(100%)', 'opacity': 0}))]
        )
      ]
    )
  ]
})
export class HomePage {
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  currentMapTrack = null;
 
  isTracking = false;
  trackedRoute = [];
  previousTracks = [];
  userData = {
    displayName: 'Stranger'
  };


  greeting = "Hello";
  
  options : GeolocationOptions;
  currentPos : Geoposition;

  constructor(public navCtrl: NavController, public afAuth: AngularFireAuth,
    public toastCtrl: ToastController,private geolocation: Geolocation) {
      console.log("home constructor");
      
    afAuth.authState.subscribe(user => { 
      if (user) {
        this.userData = user;
      }
    });

    this.setGreeting();
  }

  ionViewDidEnter(){
    //Set latitude and longitude of some place
    this.map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: -34.9011, lng: -56.1645 },
      zoom: 15
    });
    this.getUserPosition();

  
  }
  getUserPosition(){
    this.options = {
        enableHighAccuracy : true
    };

    this.geolocation.getCurrentPosition(this.options).then((pos : Geoposition) => {

        this.currentPos = pos;      
        console.log(pos);

    },(err : PositionError)=>{
        console.log("error : " + err.message);
    });
}

  createToast(message: string) {
    return this.toastCtrl.create({
      message,
      duration: 3000
    })
  }

  doRefresh(refresher) {



    setTimeout(() => {
      refresher.complete();
    }, 2000);
  }

  setGreeting() {
    let timeNow = new Date().getHours();

    if (timeNow < 12) {
      this.greeting = "Good morning";
    } else if (timeNow < 18) {
      this.greeting = "Good afternoon";
    } else {
      this.greeting = "Good evening";
    }
  }


  signOutClicked() {
    this.afAuth.auth.signOut();
  }


  swipeEvent(event: any) {
    if (event.deltaX < 0){
      //
    }

  }


}
