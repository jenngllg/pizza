import { Component } from '@angular/core';
import {ParametersPage} from "../parameters/parameters";
import { ListPage } from "../list/list";
import { CartPage } from "../cart/cart";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  listPage = ListPage;
  cartPage = CartPage;
  parametersPage = ParametersPage;

  constructor() {
  }
}
