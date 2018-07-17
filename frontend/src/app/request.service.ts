import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  private url = "http://localhost:3000/api/"

  constructor(private http:HttpClient) { }

  sendRequest(num){
    return this.http.get(`http://localhost:3000/api/${num}`);
  }
}
