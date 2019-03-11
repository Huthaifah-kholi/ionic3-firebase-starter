import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { ToastController } from 'ionic-angular';
import { ViewController } from 'ionic-angular';

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  public emailSignUpForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private formBuilder: FormBuilder,  public auth: AuthProvider,
    public toastCtrl: ToastController, public viewCtrl: ViewController) {

     // يجب ان تكون كلمة السر اكبر من ٦ حروف والتاكد من فورمات الايميل 
     this.emailSignUpForm = formBuilder.group({
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
  //عملية انشاء حساب

  emailSignUpFormSubmit() {
     // اذا كان هناك خطا في الفورم اطلع له رسالة
     if (!this.emailSignUpForm.valid) {
      this.createToast('Form not valid').present();
      return
    }
    else {
      // ابحث عن وجود هذا المستخدم في قاعدة البيانات firebase
      this.auth.signUpUser(this.emailSignUpForm.value.email, this.emailSignUpForm.value.password)
        .then(() => {
          // تم تسجيل الدخول واظهار رسالة للمستخدم بنجاح العملية
          this.createToast('Signed up with email: ' + this.emailSignUpForm.value.email).present();
          this.viewCtrl.dismiss();
        },
        
        //  اذا لم تنجح عملية الاتصال قم باظهار  رسالة بالخطأ
        (error) => {
          this.createToast(error.message).present();
        })
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

}
