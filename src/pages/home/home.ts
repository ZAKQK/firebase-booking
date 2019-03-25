import { Component } from '@angular/core';
import { NavController, ModalController, ToastController } from 'ionic-angular';
import { CalendarComponentOptions, CalendarModalOptions, CalendarModal, CalendarResult } from '../../../node_modules/ion2-calendar';
import { FinishPage } from '../finish/finish';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  dateMulti: string[];
  type: 'string'; // 'string' | 'js-date' | 'moment' | 'time' | 'object'
  optionsMulti: CalendarComponentOptions = {
    pickMode: 'multi',
    disableWeeks: [0, 6]
  };


  details = [];

  start_date;
  end_date;

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public toastCtrl: ToastController) {
    this.details = [{
      names: "",
      email: "",
      phone: "",
      gender: "",
      travelling: "",
      booking: "",
      adults: "",
      children: "",
      room: ""
    }];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Homepage');
  }

  onViewDidLoad() {
  }

  onChange($event) {
    console.log($event);
  }

  openCalendar() {
    const options: CalendarModalOptions = {
      title: 'BASIC',
      pickMode: 'range',
    };
    let myCalendar = this.modalCtrl.create(CalendarModal, {
      options: options
    });

    myCalendar.present();

    myCalendar.onDidDismiss((date: CalendarResult, type: string) => {
      console.log('FROM: ' + date.from.string + '\nTo: ' + date.to.string);
      this.start_date = date.from.string;
      this.end_date = date.to.string;

    })
  }

  personalDetails() {
    console.log("ST D: " + this.start_date + "\n" + "En D" + this.end_date)

    if (JSON.stringify(this.details) !== '{}') {
      if (this.start_date) {
        if (this.end_date) {
          this.navCtrl.push(FinishPage, { details: this.details, start_date: this.start_date, end_date: this.end_date });
          console.log(this.details, this.start_date + "" + this.end_date);
        }
      }
    } else {
      let toast = this.toastCtrl.create({
        message: 'Some details are missing',
        duration: 3000,
        position: 'top'
      });
      toast.present();
    }
  }

}
