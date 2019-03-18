import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { AlertController, ToastController } from 'ionic-angular';

@Component({
  selector: 'page-bluetooth',
  templateUrl: 'bluetooth.html',
})
export class BluetoothPage {
  pairedList: pairedlist;
  listToggle: boolean = false;
  pairedDeviceID: number = 0;
  dataSend: string = "";

  constructor(public navCtrl: NavController, private alertCtrl: AlertController, private bluetootherial: BluetoothSerial, private toastCtrl: ToastController) {
  }
  ionViewDidLoad() {
    this.checkBluetoothEnabled();
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
    // Attempt to connect device with specified address, call app.deviceConnected if success
    this.bluetootherial.connect(address).subscribe(success => {
      this.deviceConnected();
      this.showToast("Successfully Connected");
    }, error => {
      this.showError("Error:Connecting to Device");
    });
  }

  deviceConnected() {
    // Subscribe to data receiving as soon as the delimiter is read
    this.bluetootherial.subscribe('\n').subscribe(success => {
      this.handleData(success);
      this.showToast("Connected Successfullly");
    }, error => {
      this.showError(error);
    });
  }
  //النظارة فصلت 
  deviceDisconnected() {
    this.bluetootherial.disconnect();
    // اظهار رسالة الفصل
    this.showToast("Device Disconnected");
  }

  handleData(data) {
    this.showToast(data);
  }

  // ارسال المعلومات للبلوتوث
  sendData() {
    // ارسال الوقت
    var today = new Date();
    let hours = today.getHours();
    if (hours > 12) {
      hours -= 12;
  } 
    var time = "T."+hours.toString() + today.getMinutes().toString()+"D."+today.getDay();
    this.dataSend = time.toString();
    console.log("time : "+this.dataSend );
    
    this.showToast(this.dataSend);

    this.bluetootherial.write(this.dataSend).then(success => {
      this.showToast(success);
    }, error => {
      this.showError(error)
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

}

interface pairedlist {
  "class": number,
  "id": string,
  "address": string,
  "name": string
}