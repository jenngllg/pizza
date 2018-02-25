import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PizzaService } from "../../app/pizza/pizza.service";
import {Storage} from "@ionic/storage";
import { ToastController } from 'ionic-angular';

@Component({
  selector: 'page-parameters',
  templateUrl: 'parameters.html'
})

export class ParametersPage {
  admin: boolean;

  constructor(public navCtrl: NavController, private storage: Storage, private toastCtrl: ToastController) {
    this.storage.get('admin').then(value => this.admin = value);
  }

  public isAdmin(event: any): void {
      this.storage.set('admin', event.checked);

      if (event.checked) {
        this.presentToast('Vous êtes en mode administrateur !')
      }
      else {
        this.presentToast('Vous êtes en mode normal !')
      }
  }

  presentToast(message: string) {
    this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'bottom'
    }).present();
  }
}

