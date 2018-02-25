import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {PizzaService} from "../../app/pizza/pizza.service";
import {Pizza} from "../../app/pizza/pizza";

import _ from 'underscore';
import {PizzaPage} from "../pizza/pizza";

@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
  providers: [PizzaService]
})

export class ListPage {

  public items: Pizza[] = [];
  public defaultItems: Pizza[] = [];
  searchQuery: string = '';

  constructor(public navCtrl: NavController,
              private pizzaService: PizzaService) //injecte le service dans la classe listPage
  { }

  protected ionViewWillEnter(): void {
      this.initializeItems();
  }

  private initializeItems(): void {
    this.pizzaService.getPizzas().then(
      pizzas => {
        this.items = pizzas as Pizza[];
        this.defaultItems = pizzas as Pizza[];
      })
      .catch(err => console.error(err));
    }

    private filterItems() {
      // Reset items back to all of the items
      this.resetItem();

      // if the value is an empty string don't filter the items
      if (this.searchQuery && this.searchQuery.trim() != '') {
        this.items = this.items.filter((item) => {
          let namePredicate = false;
          if (item.name) {
            namePredicate = (item.name.toLowerCase().indexOf(this.searchQuery.toLowerCase()) > -1);
          }

          let ingredientsPredicate = false;
          if (item.ingredients) {
            let ingredientsLowerCase = _.map(item.ingredients, ingredient => ingredient.toLowerCase());
            ingredientsPredicate =  (ingredientsLowerCase.indexOf(this.searchQuery.toLowerCase()) > -1);
          }

          return namePredicate || ingredientsPredicate;
        })
      }
    }

      private resetItem():void {
        this.items = this.defaultItems;
    }

    private selectPizza(item: Pizza):void {
      this.navCtrl.push(PizzaPage, {id: item.id});
    }
}


