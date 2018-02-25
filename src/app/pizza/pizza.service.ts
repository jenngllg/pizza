import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Pizza} from "./pizza";

@Injectable()
export class PizzaService {
  constructor(private http: HttpClient) { }

  pizzaUrl = 'http://kim.jcatania.io:3000/pizza';

  public async getPizzas(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(this.pizzaUrl).subscribe(data => {
          resolve(data);
        },
        (err: HttpErrorResponse) => {
          reject(err);
        });
    });
  }

  public async getPizza(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(this.pizzaUrl +'/'+ id).subscribe(data => {
          resolve(data);
        },
        (err: HttpErrorResponse) => {
          reject(err);
        });
    });
  }


  public async delete(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.delete(this.pizzaUrl +'/'+ id).subscribe(data => {
          resolve(data);
        },
        (err: HttpErrorResponse) => {
          reject(err);
        });
    });
  }

  public async put(item: Pizza): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.put(this.pizzaUrl +'/'+ item.id, item).subscribe(data => {
          resolve(data);
        },
        (err: HttpErrorResponse) => {
          reject(err);
        });
    });
  }

  public async post(item: Pizza): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(this.pizzaUrl, item).subscribe(data => {
          resolve(data);
        },
        (err: HttpErrorResponse) => {
          reject(err);
        });
    });
  }

}

