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

     // يجب ان تكون كلمة السر اكبر من ٦ حروف والتاكد من فورمات الايميل 
     this.signInForm = formBuilder.group({
       email: ['', Validators.compose([Validators.required, Validators.email])],
       password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
     });
  }

  // اظهار رسالة بالاخطاء
  createToast(message: string) {
    return this.toastCtrl.create({
      message,
      duration: 3000
    })
  }

  // عملية تسجيل الدخول
  signInFormSubmit() {

     // اذا كان هناك خطا في الفورم اطلع له رسالة
     if (!this.signInForm.valid) {
       this.createToast('Ooops, form not valid...').present();
       return
     } else {

       // ابحث عن وجود هذا المستخدم في قاعدة البيانات firebase
       this.auth.signInUser(this.signInForm.value.email, this.signInForm.value.password)
         .then(() => {
           // تم تسجيل الدخول واظهار رسالة للمستخدم بنجاح العملية
           this.createToast('Signed in with email: ' + this.signInForm.value.email).present();
         },
         // اذا لم تنجح عملية الاتصال قم باظهار  رسالة بالخطأ
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
