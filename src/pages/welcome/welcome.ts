import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';

import { LoginPage } from '../login/login';
import { SignupPage } from '../signup/signup';

import { AuthProvider } from '../../providers/auth/auth';

import * as firebase from 'firebase/app';

/**
 * Generated class for the WelcomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public alertCtrl: AlertController, public loadingCtrl: LoadingController,
    public auth: AuthProvider) {
  }

  login () {
    // go to login page 
    this.navCtrl.push(LoginPage);
  }

  signup() {
    // go to sign up page 
    this.navCtrl.push(SignupPage);
  }


  forgotPass() {
    // اضهر الرسالة الخاصة باعادة كلمة المرور
    let prompt = this.alertCtrl.create({
      title: 'Enter Your Email',
      message: "A new password will be sent to your email",
      inputs: [
        {
          name: 'recoverEmail',
          placeholder: 'you@example.com'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Submit',
          handler: data => {


            // اظهار عملية البحث 
            let loading = this.loadingCtrl.create({
              dismissOnPageChange: true,
              content: 'Resetting your password..'
            });
            loading.present();
            // الاتصال بال firebase لاعداة تعيين كلمة المرور
            firebase.auth().sendPasswordResetEmail(data.recoverEmail).then(() => {
              //add toast
              loading.dismiss().then(() => {
                //show pop up
                let alert = this.alertCtrl.create({
                  title: 'Check your email',
                  subTitle: 'If this email address is associated with a valid user, you will receive a password reset email.',
                  buttons: ['OK']
                });
                alert.present();
              })

            }, error => {
              //show pop up
              loading.dismiss().then(() => {
                let alert = this.alertCtrl.create({
                  title: 'Error resetting your password',
                  subTitle: error.message,
                  buttons: ['OK']
                });
                alert.present();
              })

              // نهاية الاتصال بال firebase
            });
          }
        }
      ]
    });
    prompt.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomePage');
  }

}
