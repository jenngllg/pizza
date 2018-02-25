import { Component } from '@angular/core';
import {NavController, NavParams, ToastController} from 'ionic-angular';
import { PizzaService } from "../../app/pizza/pizza.service";
import {Pizza} from "../../app/pizza/pizza";
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-pizzaAdmin',
  templateUrl: 'pizzaAdmin.html',
  providers: [PizzaService]
})

export class PizzaAdminPage {

  public item: Pizza|any;
  public id: number;

  constructor(
    private storage: Storage,
    public navCtrl: NavController,
    public navParams: NavParams,
    public pizzaService: PizzaService,
    private toastCtrl: ToastController) {

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

  public modify(item: Pizza): void {
    this.pizzaService.put(item)
    .then(() =>  {
      this.presentToast('Pizza modifiée avec succès !');
      this.navCtrl.pop(); //retour en arrière avec les infos mises à jour
    })
      .catch(err => console.error(err));
  }

  public delete(item: Pizza): void {
    this.pizzaService.delete(item.id)
      .then(() =>  {
        this.presentToast('Pizza supprimée avec succès !');
        this.navCtrl.pop(); //retour en arrière avec les infos mises à jour
      })
      .catch(err => console.error(err));
  }

  presentToast(message: string) {
    this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'bottom'
    }).present();
  }

}
