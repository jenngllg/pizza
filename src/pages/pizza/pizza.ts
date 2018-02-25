import { Component } from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import { PizzaService } from "../../app/pizza/pizza.service";
import {Pizza} from "../../app/pizza/pizza";
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-pizza',
  templateUrl: 'pizza.html',
  providers: [PizzaService]
})

export class PizzaPage {

  public item: Pizza;
  public id: number;

  constructor(private storage: Storage, public navCtrl: NavController, public navParams: NavParams, public pizzaService: PizzaService) {
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

  private addToCart(id: number): void {
    this.storage.get('ids').then(data => {
      if (data) {
        data.push(id);
      }
      else {
        data = [id];
      }
      this.storage.set('ids', data);
    });
  }
}
