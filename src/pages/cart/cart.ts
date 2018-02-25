import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Storage} from "@ionic/storage";
import {PizzaService} from "../../app/pizza/pizza.service";
import {Pizza} from "../../app/pizza/pizza";

import _ from 'underscore';
import {PizzaLot} from "../../app/pizza/pizzaLot";

@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
  providers: [PizzaService]
})

export class CartPage {

  private pizzaArray: Pizza[] = [];
  private pizzaLotArray: PizzaLot[] = [];
  private total: number;

  constructor(private storage: Storage, public navCtrl: NavController,  public pizzaService: PizzaService) {
  }

  //charger la page
  protected ionViewWillEnter(): void {
  this.pizzaArray = [];
  this.pizzaLotArray = [];
    this.getCart();
  }

  //afficher le panier
  private getCart(): void {
    this.storage.get('ids').then((data: Pizza[]) => {
      if (data) {
        for (let i = 0; i < data.length; i++) {
          this.pizzaService.getPizza(data[i].id).then(value => {
            this.pizzaArray.push(value);

            let found = false;
            this.pizzaLotArray.forEach((value2) => {
              if (value2.pizza.id == value.id) {
                ++value2.quantity;
                found = true;
              }
            });

            if (!found) {
              this.pizzaLotArray.push({
                pizza: value,
                quantity: 1
              })
            }
          }
          ).then(() => this.calculateTotal()).catch(err => {
            console.error(err);
            this.storage.clear();
          })
        }
      }
    })
  }

  //supprimer une pizza du panier
  private deletePizza(item: PizzaLot): void {
    this.pizzaLotArray.forEach((value, index) => {
      if (value.pizza.id == item.pizza.id) {
        --value.quantity;
      }
      if (0 == value.quantity) {
        this.pizzaLotArray.splice(index-1, 1);
      }
    });

    this.pizzaArray = _.pluck(this.pizzaLotArray, 'pizza');
    this.calculateTotal();
    this.storage.set('ids', this.pizzaArray);
  }

  private calculateTotal(): void {
    this.total = 0;
    this.pizzaLotArray.forEach((value2) => {
      this.total += value2.quantity * value2.pizza.price;
    });
  }
}
