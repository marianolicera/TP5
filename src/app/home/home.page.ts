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

  pkmn = [];
  pokemons;

  constructor(
    private http: HttpClient,
    private modalCtrl: ModalController
  ) {}

  ngOnInit(){
      this.http.get<any>('https://pokeapi.co/api/v2/pokemon?offset=0&limit=50')
      .subscribe(res => {
        this.pkmn = res.results;
        this.pokemons = JSON.stringify(this.pkmn);
        this.setObject();
        this.getObject();
      });

  }

  async openModal(nombre){
    const modal = await this.modalCtrl.create({
      component: DepositModalComponent,
      componentProps: {nombre}
    });

    await modal.present();
  }

  async setObject() {
    await Storage.set({
      key: 'pokemons',
      value: JSON.stringify(this.pokemons)
    });
  }

  async getObject() {
    const ret = await Storage.get({ key: 'pokemons' });
    const pokemons = JSON.parse(ret.value);
    console.log(pokemons);
  }

}
