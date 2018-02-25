import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

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
}

