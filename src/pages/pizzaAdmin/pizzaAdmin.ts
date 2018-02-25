import { Component } from '@angular/core';
import {NavController, NavParams, ToastController} from 'ionic-angular';
import { PizzaService } from "../../app/pizza/pizza.service";
import {Pizza} from "../../app/pizza/pizza";
import { Storage } from '@ionic/storage';
import { Camera, CameraOptions } from '@ionic-native/camera';

@Component({
  selector: 'page-pizzaAdmin',
  templateUrl: 'pizzaAdmin.html',
  providers: [PizzaService]
})

export class PizzaAdminPage {

  public item: Pizza|any;
  public id: number;
  base64Image:string;
  base64Data:string;
  message:string;
  ingredientsMap:Map<string, boolean>;

  test: boolean;

  constructor(
    private storage: Storage,
    public navCtrl: NavController,
    public navParams: NavParams,
    public pizzaService: PizzaService,
    private toastCtrl: ToastController,
    private camera: Camera,
    ) {

    this.id = this.navParams.get('id');
    this.item = {id:null, ingredients: []};
    this.ingredientsMap = new Map();
    this.ingredientsMap.set('creme', false);
    this.ingredientsMap.set('tomate', false);
    this.ingredientsMap.set('raclette', false);
    this.ingredientsMap.set('champignon', false);
    this.ingredientsMap.set('oignon', false);
    this.ingredientsMap.set('poivron', false);
    this.ingredientsMap.set('boulette', false);
    this.ingredientsMap.set('pepperoni', false);
    this.ingredientsMap.set('lardon', false);
    this.ingredientsMap.set('poulet', false);
  }

  protected ionViewWillEnter(): void {
    if (this.id) {
      this.getPizza(this.id);
    }
  }

  //récupérer une pizza par id
  private getPizza(id: number): void {
    this.pizzaService.getPizza(id).then(
      pizza => {
        this.item = pizza as Pizza;
        this.ingredientsMap.forEach((value, key) => {
          if (this.item.ingredients && -1 != this.item.ingredients.indexOf(key)) {
            this.ingredientsMap[key] = true;
          }
        });
      })
      .catch(err => console.error(err));
  }

  //modifier une pizza ou en créer une
  public modify(item: Pizza): void {
    this.item.ingredients = [];

    this.ingredientsMap.forEach((value, key) => {
      if (this.ingredientsMap[key]) {
        this.item.ingredients.push(key);
      }
    });

    if (item.id) {
      this.pizzaService.put(item)
        .then(() =>  {
          this.presentToast('Pizza modifiée avec succès !');
          this.navCtrl.pop(); //retour en arrière avec les infos mises à jour
        })
        .catch(err => console.error(err));
    }
    else {
      this.pizzaService.post(item)
        .then(() =>  {
          this.presentToast('Pizza ajoutée avec succès !');
          this.navCtrl.pop(); //retour en arrière avec les infos mises à jour
        })
        .catch(err => console.error(err));
    }
  }

  //supprimer une pizza
  public delete(item: Pizza): void {
    this.pizzaService.delete(item.id)
      .then(() =>  {
        this.presentToast('Pizza supprimée avec succès !');
        this.navCtrl.pop(); //retour en arrière avec les infos mises à jour
      })
      .catch(err => console.error(err));
  }

  //affichage du toast
  presentToast(message: string) {
    this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'bottom'
    }).present();
  }

  //prendre une photo
  takePicture() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation : true
    };

    this.camera.getPicture(options)
      .then((imageData) =>
        {
          this.base64Image = 'data:image/jpeg;base64,' + imageData;
          this.base64Data = imageData;
          this.item.picture = this.base64Image;
        },
        (err) =>
        {
          console.log(err);
        });
  }

}
