import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { ModalController } from '@ionic/angular';
import { PokelistPageModule } from '../pokelist/pokelist.module';
import { DepositModalComponent } from '../deposit-modal/deposit-modal.component';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  pkmn = [];

  constructor(
    private http: HttpClient,
    private modalCtrl: ModalController
  ) {}

  ngOnInit(){
      this.http.get<any>('https://pokeapi.co/api/v2/pokemon?offset=0&limit=50')
      .subscribe(res => {
        this.pkmn = res.results;
        console.log(this.pkmn);
      });

  }

  async openModal(nombre){
    const modal = await this.modalCtrl.create({
      component: DepositModalComponent,
      componentProps: {nombre: nombre}
    })

    await modal.present();
  }

}
