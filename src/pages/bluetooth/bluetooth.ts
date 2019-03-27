import { Component, NgZone } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { AlertController, ToastController } from 'ionic-angular';
import { BackgroundMode } from '@ionic-native/background-mode';
import { timer } from 'rxjs/observable/timer';

@Component({
  selector: 'page-bluetooth',
  templateUrl: 'bluetooth.html',
})
export class BluetoothPage {
  pairedList: pairedlist;
  listToggle: boolean = false;
  pairedDeviceID: number = 0;
  dataSend: string = "";
  sendDateFlag : boolean = false;
  global_address;
  constructor(public navCtrl: NavController, private alertCtrl: AlertController, private bluetootherial: BluetoothSerial, private toastCtrl: ToastController, private backgroundMode: BackgroundMode, private ngZone: NgZone) {
  }
  ionViewDidLoad() {
    this.checkBluetoothEnabled();
  }
  ionViewWillLeave(){
    this.backgroundMode.enable();
  }
  checkBluetoothEnabled() {
    console.log("checkBluetoothEnabled() called");
    this.bluetootherial
      .isEnabled()
      .then(success => {
        console.log("the isEnabled is called with success");
        this.listPairedDevices();
      }, error => {
        this.showError("Please Enable Bluetooth")
      });
  }
  listPairedDevices() {
    console.log("listPairedDevices() called");

    this.bluetootherial.list().then(success => {
      this.pairedList = success;
      this.listToggle = true;
    }, error => {
      this.showError("Please Enable Bluetooth")
      this.listToggle = false;
    });
  }

  // عملية اختيار جهاز بلوتوث معين
  selectDevice() {
    let connectedDevice = this.pairedList[this.pairedDeviceID];
    if (!connectedDevice.address) {
      this.showError('Select Paired Device to connect');
      return;
    }
    let address = connectedDevice.address;
    let name = connectedDevice.name;

    this.connect(address);
  }

  // الشبك على جهاز النظارة باستخدام ال mac address
  connect(address) {
    let add = address;
    this.global_address = address;
    // Attempt to connect device with specified address, call app.deviceConnected if success
    this.bluetootherial.connect(address).subscribe(success => {
      this.deviceConnected();
      // this.showToast("Successfully Connected");
      this.sendData();
      // this.read1();
      const source = timer(1000);
      // const source = timer(3000);
      const subscribe = source.subscribe(val => {
        console.log(val);
        this.sendData();
      });
      this.backgroundMode.on("enable").subscribe(()=>{
        console.log("background mode enabled");
        this.showToast("Enable the background mode");
        this.bluetootherial.connect(add).subscribe(success => {
          // const source = timer(600000);
          const source = timer(1000);
          const subscribe = source.subscribe(val => {
            console.log(val);
            this.sendData();
          });
        })
      });
    
    }, error => {
      this.showError("Error:Connecting to Device");
    });
  }

  deviceConnected() {
    // Subscribe to data receiving as soon as the delimiter is read
    this.bluetootherial.subscribe('\n').subscribe(success => {
      // this.handleData(success);
      // this.showToast("Connected Successfullly");
      console.log("deviecConnected() called");

    }, error => {
      this.showError(error);
    });
  }
  // deviceSubscribe() {
  //   // Subscribe to data receiving as soon as the delimiter is read
  //   this.bluetootherial.subscribe('1').subscribe(data => {
  //     // this.handleData(success);
  //     // this.showToast("Connected Successfullly");
  //     console.log("deviceSubscribe() called ,new data recived");
  //     let data1= data.replace(/(\r\n|\n|\r)/gm, "");
  //     if(data1 == "11"){
  //       this.sendData();
  //     }
     
  //   }, error => {
  //     this.showError(error);
  //   });
  // }
  //النظارة فصلت 
  deviceDisconnected() {
    this.bluetootherial.disconnect();
    // اظهار رسالة الفصل
    this.showToast("Device Disconnected");
  }

  handleData(data) {
    this.showToast(data);
    if(data=="t"){
      this.sendData();
    }
  }

  // ارسال المعلومات للبلوتوث
  sendData() {
    console.log("sendDate() called");
    // ارسال الوقت
    var today = new Date();
    let hours = today.getHours();
    if (hours > 12) {
      hours -= 12;
  } 
    var time = "T"+hours.toString() +"."+ today.getMinutes().toString()+"D"+today.getDay();
    this.dataSend = time.toString();
    console.log("time : "+this.dataSend );
    
    // this.showToast(this.dataSend);

    this.bluetootherial.write(this.dataSend).then(success => {
      console.log("you send data to bluetooth"+success);
      // this.showToast("You send"+success);
    }, error => {
      console.log(error);
      // this.showError(error)
    });
  }

  showError(error) {
    let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: error,
      buttons: ['Dismiss']
    });
    alert.present();
  }

  showToast(msj) {
    const toast = this.toastCtrl.create({
      message: msj,
      duration: 1000
    });
    toast.present();

  }
  read(){
    console.log("read() function called");
    this.bluetootherial.read().then((data)=>
    {
      
      this.showToast("we read the data successfully from bluetooth");
      if(data == "1"){
     this.sendDateFlag=true;
     this.sendData();
      }
      })
  }
  read1(){
    this.ngZone.run(()=>{
      this.read();
    })
  }
}

interface pairedlist {
  "class": number,
  "id": string,
  "address": string,
  "name": string
}