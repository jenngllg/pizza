import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Storage} from "@ionic/storage";
import {PizzaService} from "../../app/pizza/pizza.service";
import {Pizza} from "../../app/pizza/pizza";

import _ from 'underscore';

@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
  providers: [PizzaService]
})

export class CartPage {

  private pizzaArray: Pizza[] = [];


  constructor(private storage: Storage, public navCtrl: NavController,  public pizzaService: PizzaService) {
  }

  protected ionViewWillEnter(): void {
    this.getCart();
  }

  private getCart(): void {
    this.storage.get('ids').then((data: Pizza[]) => {
      if (data) {
        for (let i = 0; i < data.length; i++) {
          this.pizzaService.getPizza(data[i].id).then(value =>
            this.pizzaArray.push(value)
          ).catch(err => console.error(err))
        }
      }
    })
  }

  private deletePizza(item: Pizza): void {
    this.pizzaArray = _.without(this.pizzaArray, _.find(this.pizzaArray, item));
    this.storage.set('ids', this.pizzaArray);
  }

}
