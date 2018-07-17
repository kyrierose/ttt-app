import { NgModule, Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ttt-app';
  num=0
  private url = "http://localhost:3000/api/"

  constructor(private http:HttpClient){}

  onSubmit(){
    this.http.post(this.url,this.num).subscribe(
      res=>console.log(res),
      err=>console.log(err)
    )
  }
}
