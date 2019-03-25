import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, ModalController, AlertController } from 'ionic-angular';
import { SuccessPage } from '../success/success';
import { HomePage } from '../home/home';
declare var firebase;

/**
 * Generated class for the FinishPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-finish',
  templateUrl: 'finish.html',
})
export class FinishPage {

  card_number;
  month;
  year;
  ccv;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public loadingCtrl: LoadingController, public toastCtrl: ToastController,
    public modalCtrl: ModalController, public alertCtrl: AlertController) {
    // console.log("De: " + navParams.get('details').names)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FinishPage');
  }

  finishPayment() {

    var loader = this.loadingCtrl.create({
      content: 'Please wait ...'
    });
    loader.present();

    if (this.year > 2018 && this.year <= 2030) {
      if (this.month >= 1 && this.month <= 12) {
        if (this.card_number) {
          // firebase.database().ref().child('posts').push({

          // })
          firebase.database().ref('bookings').push({
            names: this.navParams.get('details').names,
            email: this.navParams.get('details').email,
            phone: this.navParams.get('details').phone,
            gender: this.navParams.get('details').gender,
            travelling: this.navParams.get('details').travelling,
            booking: this.navParams.get('details').booking,
            adults: this.navParams.get('details').adults,
            children: this.navParams.get('details').children,
            room: this.navParams.get('details').room,
            start_date: this.navParams.get('start_date'),
            end_date: this.navParams.get('end_date'),
          }).then(res => {
            loader.dismiss();
            this.presentAlert();
          }, err => {
            loader.dismiss();
            let toast = this.toastCtrl.create({
              message: err,
              duration: 3000,
              position: 'top'
            });
            toast.present();
          });
        }
      }
    }

  }

  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Thank You For Booking with us.',
      subTitle: 'Your booking for the following days was successful.<br> Check in: ' + this.navParams.get('start_date') + '<br>Check out: ' + this.navParams.get('end_date'),
      buttons: [{
        text: 'Finish',
        handler: data => {
          this.navCtrl.setRoot(HomePage);
        }
      }]
    });
    alert.present();
  }

}
