import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { ListPage } from '../pages/list/list';
import { CartPage } from '../pages/cart/cart';
import { ParametersPage } from '../pages/parameters/parameters';
import { PizzaPage } from "../pages/pizza/pizza";
import { TabsPage } from "../pages/tabs/tabs";


@NgModule({
  declarations: [
    MyApp,
    ListPage,
    CartPage,
    ParametersPage,
    PizzaPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ListPage,
    CartPage,
    ParametersPage,
    PizzaPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})

export class AppModule {}
