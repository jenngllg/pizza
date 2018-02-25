import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PizzaService } from "../../app/pizza/pizza.service";

@Component({
  selector: 'page-parameters',
  templateUrl: 'parameters.html'
})

export class ParametersPage {
  constructor(public navCtrl: NavController) {

  }
}
