import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  pkmn = [];

  constructor(
    private http: HttpClient
  ) {}

  ngOnInit(){
      this.http.get<any>('https://pokeapi.co/api/v2/pokemon/')
      .subscribe(res => {
        this.pkmn = res.results;
        console.log(this.pkmn);
      });
  }

}
