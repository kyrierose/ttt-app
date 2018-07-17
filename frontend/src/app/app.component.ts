import { NgModule, Component } from '@angular/core';
import { RequestService } from './request.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  title = 'ttt-app';
  num=1
  resultArray = null
  constructor(private req:RequestService){}

  onSubmit(){
    this.req.sendRequest(this.num).subscribe(
      res=>{
        console.log(res)
        this.resultArray = res
        document.getElementById("display-table").style.visibility = "visible";
      },
      err=>console.log(err)
    )
  }
}
