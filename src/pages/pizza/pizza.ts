import { Component } from '@angular/core';
import {NavController, NavParams, ToastController} from 'ionic-angular';
import { PizzaService } from "../../app/pizza/pizza.service";
import {Pizza} from "../../app/pizza/pizza";
import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-pizza',
  templateUrl: 'pizza.html',
  providers: [PizzaService]
})

export class PizzaPage {

  public item: Pizza|any;
  public id: number;

  constructor(
    private storage: Storage,
    public navCtrl: NavController,
    public navParams: NavParams,
    public pizzaService: PizzaService,
    private toastCtrl: ToastController
    ) {

    this.id = this.navParams.get('id');
    this.item = {id:null};
  }

  protected ionViewWillEnter(): void {
    this.getPizza(this.id);
  }

  private getPizza(id: number): void {
    this.pizzaService.getPizza(id).then(
      pizza => {
        this.item = pizza as Pizza;
      })
      .catch(err => console.error(err));
  }

  private addToCart(item: Pizza): void {
    this.storage.get('ids').then(data => {
      if (data) {
        data.push(item);
      }
      else {
        data = [item];
      }
      this.presentToast('Pizza ajoutée au panier !');
      this.storage.set('ids', data);
    });
  }

  presentToast(message: string) {
    this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'bottom'
    }).present();
  }
}
