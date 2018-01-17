import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ViewController } from 'ionic-angular';

import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public signInForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private formBuilder: FormBuilder,  public auth: AuthProvider,
    public toastCtrl: ToastController, public viewCtrl: ViewController) {

     // building the form
     this.signInForm = formBuilder.group({
       email: ['', Validators.compose([Validators.required, Validators.email])],
       password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
     });
  }

  createToast(message: string) {
    return this.toastCtrl.create({
      message,
      duration: 3000
    })
  }

  signInFormSubmit() {

     // first we check, if the form is valid
     if (!this.signInForm.valid) {
       this.createToast('Ooops, form not valid...').present();
       return
     } else {

       // if the form is valid, we continue with validation
       this.auth.signInUser(this.signInForm.value.email, this.signInForm.value.password)
         .then(() => {
           // showing succesfull message
           this.createToast('Signed in with email: ' + this.signInForm.value.email).present();
           // closing dialog
           //this.viewCtrl.dismiss();
         },

         /**
          * Handle Authentication errors
          * Here you can customise error messages like our example.
          * https://firebase.google.com/docs/reference/js/firebase.auth.Error
          *
          * mismatch with error interface: https://github.com/angular/angularfire2/issues/976
          */
         (error: any) => {
           switch (error.code) {
             case 'auth/invalid-api-key':
               this.createToast('Invalid API key.').present();
               break;
             default:
               this.createToast(error.message).present();
               break;
           }
         })
     }
   }


  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
