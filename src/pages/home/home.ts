import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { Geolocation, GeolocationOptions, Geoposition } from '@ionic-native/geolocation/ngx';
import { trigger, transition, style, animate, state } from '@angular/animations';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker,
  Environment
} from '@ionic-native/google-maps';

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
  // map: any;
  currentMapTrack = null;
 
  isTracking = false;
  trackedRoute = [];
  previousTracks = [];
  userData = {
    displayName: 'Stranger'
  };
  // google
  map: GoogleMap;

  greeting = "Hello";
  
  // options : GeolocationOptions;
  // currentPos : Geoposition;

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
    // this.getUserPosition();
    
        // This code is necessary for browser
        Environment.setEnv({
          'API_KEY_FOR_BROWSER_RELEASE': '(your api key for `https://`)',
          'API_KEY_FOR_BROWSER_DEBUG': '(your api key for `http://`)'
        });
    
        let mapOptions: GoogleMapOptions = {
          camera: {
             target: {
               lat: 43.0741904,
               lng: -89.3809802
             },
             zoom: 18,
             tilt: 30
           }
        };
    
        this.map = GoogleMaps.create('map_canvas', mapOptions);
    
        let marker: Marker = this.map.addMarkerSync({
          title: 'Ionic',
          icon: 'blue',
          animation: 'DROP',
          position: {
            lat: 43.0741904,
            lng: -89.3809802
          }
        });
        marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
          alert('clicked');
        });
      
  }

  getUserPosition(){
    console.log("getUserPosition() called");
    // let _this=this;
    // let locationOptions = { timeout: 10000, enableHighAccuracy: true };
      if(navigator.geolocation) {
        console.log("navigator.geolocation is available");
        navigator.geolocation.getCurrentPosition(function(position) {
          console.log("current position acquired",position);
          // this.viewMap(position.coords.latitude, position.coords.longitude);
          this.map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: position.coords.latitude, lng: position.coords.longitude},
            zoom: 20
          });
          this.createToast("potion :"+position);
        },function(error) {
          console.log("error ",error);
          
        },{
          enableHighAccuracy: true 
      }
        )  
      }
    
}
viewMap(lat,lng){
  this.map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: lat, lng: lng},
    zoom: 10
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
