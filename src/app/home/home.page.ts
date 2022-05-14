import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Storage } from '@capacitor/storage';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  pokemons: Array<{name: string; url: string}> = [];

  constructor(
    private http: HttpClient,
  ) {}
  ngOnInit() {
    this.getPokemons().then(pokemons => {
      //this.pokemons = Object.values(pokemons);
      this.pokemons = pokemons;
      console.log(pokemons);
    }).catch(() => {
      this.http.get<any>('https://pokeapi.co/api/v2/pokemon?offset=0&limit=50')
      .subscribe(async res => {
        this.pokemons = res.results;
        this.setObject(this.pokemons);
      });
    });
  }

setObject(pokemon) {
  Storage.set({
    key: 'pokemons',
    value: JSON.stringify(pokemon)
  });
}

getPokemons(): Promise<Array<{name: string; url: string}>> {
  return new Promise<Array<{name: string; url: string}>>(async (resolve, reject) => {
    const ret = await Storage.get({ key: 'pokemons' });
    if (ret.value && ret.value.length > 0) {
      const pokemons = JSON.parse(ret.value);
      resolve(pokemons);
    } else {
      reject();
    }
  });
}
}



