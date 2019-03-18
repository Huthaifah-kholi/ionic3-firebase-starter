import { AngularFireDatabase } from 'angularfire2/database';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { trigger, transition, style, animate, state } from '@angular/animations';
// import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import { timer } from 'rxjs/observable/timer';

import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker,
  Environment,
  GoogleMapsAnimation,
  MyLocation
} from '@ionic-native/google-maps';

import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';

class item {
  constructor(public lan, public long) { }
}
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
            style({ transform: 'translateY(30%)', opacity: 0 }),
            animate('800ms', style({ transform: 'translateY(0)', 'opacity': 1 }))]
          // )
        ),
        transition(
          ':leave', [
            style({ transform: 'translateX(0)', 'opacity': 1 }),
            animate('500ms', style({ transform: 'translateX(100%)', 'opacity': 0 }))]
        )
      ]
    )
  ]
})
export class HomePage {
  childPostion = {
    LatLng: {
      lat: 0,
      lng: 0
    },
    accuracy: 100,
    elapsedRealtimeNanos: 3123,
    time: "123123",
    provider: "",
    hashCode: 12,
    status: true
  };
  userData = {
    displayName: 'Stranger',
    email: '',
  };
  map: GoogleMap;
  showParent = true;
  greeting = "Hello";

  items: Observable<any[]>;


  constructor(public navCtrl: NavController, public afAuth: AngularFireAuth,
    public toastCtrl: ToastController, public afDB: AngularFireDatabase) {
    console.log("home constructor");
    afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
      }
    });


    // this.setGreeting();
  }
  getFirebase() {

    // this.items.subscribe(data => {
    //   console.log("data from Firebase",data);
    // });

  }
  ionViewDidLoad() {

    this.loadMap();

    if (this.userData.email == 'mohammad@gmail.com') {
      this.showParent = true;
      console.log("the user is mohammad -- parent");
      this.getUsrLocation();
    }
    else {
      this.showParent = false;
      console.log("the user is Qais -- child");

      const source = timer(10000, 20000);
      const subscribe = source.subscribe(val => {
        console.log(val);
        this.psuhUserLocation();
      });
    }
  }
  loadMap() {
    console.log("loadMap() called ");

    // Create a map after the view is loaded.
    // (platform is already ready in app.component.ts)
    this.map = GoogleMaps.create('map_canvas', {
      camera: {
        target: {
          lat: 43.0741704,
          lng: -89.3809802
        },
        zoom: 18,
        tilt: 30
      }
    });
    console.log("loadMap() ended ");
  }
  psuhUserLocation() {
    console.log("psuhUserLocation() called");

    this.map.clear();

    console.log("map.clear() called");

    // جلب المكان الذي يتواجد فيه الاعمى
    this.map
      .getMyLocation()
      .then((location: MyLocation) => {
        console.log("success");
        console.log(JSON.stringify(location, null, 2));
        console.log("getMylocaion >> promise");

        // حركة البحث عن المكان لتحديده
        this.map.animateCamera({
          target: location.latLng,
          zoom: 17,
          tilt: 30
        })
          .then(() => {
            // اضافة علامة بمكان الكفيف 
            console.log("animateCamera");
            // المعلومات الخاصة بالعلامة
            let marker: Marker = this.map.addMarkerSync({
              title: 'مكانك',
              snippet: 'أرجوا ان تكون بخير هنا ',
              position: location.latLng,
              animation: GoogleMapsAnimation.BOUNCE
            });
            // this.afDB.list('location').set('ILatLng',);     
            this.afDB.list('location').set('/', {
              ILatLng: { lng: location.latLng.lng, lat: location.latLng.lat },
              accuracy: location.accuracy,
              elapsedRealtimeNanos: location.elapsedRealtimeNanos,
              hashCode: location.hashCode,
              provider: location.provider,
              time: location.time
            });
            // show the infoWindow
            marker.showInfoWindow();

            // If clicked it, display the alert
            marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
              this.showToast('clicked!');
            })
          })
          .catch((error) => {
            console.error(error);
            this.showToast(error.error_message);
          });

      })
      .catch((error) => {
        console.log("error: ", error);
        this.showToast(error.error_message);
      });
  }
  getUsrLocation() {
    console.log("getUsrLocation() called");
    this.items = this.afDB.list('location').valueChanges();
    this.items.subscribe((data) => {
      console.log("get the location and parse it, snapshot] from source: ", data);
      console.log("data[0]", data[0]);
      // console.log("1");

      this.childPostion.LatLng.lng = data[0].lng;
      this.childPostion.LatLng.lat = data[0].lat;
      this.childPostion.accuracy = data[1];
      this.childPostion.elapsedRealtimeNanos = data[2];
      this.childPostion.hashCode = data[3];
      this.childPostion.provider = data[4];
      this.childPostion.time = data[5];
      // this.childPostion.status = data[6].status;

      console.log("after parse the location object is : ", this.childPostion);


      this.map.clear();

      // console.log("onButtonClick() called");

      this.map.animateCamera({
        // target: location.latLng,
        target: this.childPostion.LatLng,
        zoom: 17,
        tilt: 30
      })
        .then(() => {
          this.map.clear();
          // اضافة علامة بمكان الكفيف 
          console.log("animateCamera");
          // المعلومات الخاصة بالعلامة
          let marker: Marker = this.map.addMarkerSync({

            title: 'مكان الكفيف',
            snippet: 'مكان الكفيف ',
            // position: location.LatLng,
            position: this.childPostion.LatLng,
            // animation: GoogleMapsAnimation.BOUNCE
          });

          // show the infoWindow
          marker.showInfoWindow();

          // If clicked it, display the alert
          marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
            this.showToast('clicked!');
          });
        });
    });
  }
  onButtonClick() {
    this.map.clear();
    console.log("onButtonClick() called");

    // اجلب موقعي 
    this.map.getMyLocation()
      .then((location: MyLocation) => {
        console.log(JSON.stringify(location, null, 2));
        console.log("getMylocaion >> promise");

        // حركة البحث عن المكان لتحديده
        this.map.animateCamera({
          target: this.items,
          zoom: 17,
          tilt: 30
        })
          .then(() => {
            // اضافة علامة بمكان الكفيف 
            console.log("animateCamera");
            // المعلومات الخاصة بالعلامة
            let marker: Marker = this.map.addMarkerSync({
              title: 'مكانك',
              snippet: 'أرجوا ان تكون بخير هنا ',
              position: location.latLng,
              animation: GoogleMapsAnimation.BOUNCE
            });

            // show the infoWindow
            marker.showInfoWindow();

            // If clicked it, display the alert
            marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
              this.showToast('clicked!');
            });
          });
      });
  }

  showToast(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'middle'
    });

    toast.present(toast);
  }


  //   getUserPosition(){
  //     console.log("getUserPosition() called");

  //     if(navigator.geolocation) {
  //         console.log("navigator.geolocation is available");
  //         navigator.geolocation.getCurrentPosition(function(position) {
  //           console.log("current position acquired",position);
  //           // this.viewMap(position.coords.latitude, position.coords.longitude);
  //           // this.map = new google.maps.Map(document.getElementById('map'), {
  //           //   center: { lat: position.coords.latitude, lng: position.coords.longitude},
  //           //   zoom: 20
  //           // });

  //           // ********
  //           // this.afDB.list('location').set('/',{
  //           //   ILatLng : {lng: position.coords.longitude,lat:position.coords.latitude},
  //           //   accuracy: position.coords.altitudeAccuracy,
  //           //   elapsedRealtimeNanos : position.timestamp.valueOf,
  //           //   hashCode : 123412,
  //           //   provider : position.coords.speed,
  //           //   time: position.timestamp
  //           // }); 
  //           this.createToast("potion :"+position);
  //         },function(error) {
  //           console.log("error ",error);

  //         },{
  //           enableHighAccuracy: true 
  //       }
  //         )  
  //       }
  // }
  viewMap(lat, lng) {
    this.map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: lat, lng: lng },
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
    if (event.deltaX < 0) {
      //
    }

  }


}
