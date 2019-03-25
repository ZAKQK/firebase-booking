import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
declare var firebase;

/**
 * Generated class for the BookingListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-booking-list',
  templateUrl: 'booking-list.html',
})
export class BookingListPage {

  bookings = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    firebase.database().ref('bookings').once('value').then((snapshot) => {

      console.log("SNAPSHOT: " + snapshot.val());

      snapshot.forEach(element => {
        this.bookings.push(element.val());
      });

    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BookingListPage');
  }

}
