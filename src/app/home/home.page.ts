import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { ModalController } from '@ionic/angular';
import { DepositModalComponent } from '../deposit-modal/deposit-modal.component';
import { Storage } from '@capacitor/storage';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  pkmn: Array <any> = [];
  pokemons;

  constructor(
    private http: HttpClient,
    private modalCtrl: ModalController,
  ) {}
  ngOnInit() {
    Storage.get( { key: 'pokemons' } ).then( pokemons => {
          if ( pokemons ) {
            this.pokemons = pokemons;
          } else {
            this.http.get<any>('https://pokeapi.co/api/v2/pokemon?offset=0&limit=50')
            .subscribe(res => {
              this.pkmn = res.results;
              //console.log(this.pkmn);
              //this.pokemons = JSON.stringify(this.pkmn);
              this.setObject(this.pkmn);
            });
          }
        });
}
async setObject(pokemon) {
  await Storage.set({
    key: 'pokemons',
    value: JSON.stringify({pokemon})
  });
}

async getObject() {
  const ret = await Storage.get({ key: 'pokemons' });
  const pokemons = JSON.parse(ret.value);
}
}



