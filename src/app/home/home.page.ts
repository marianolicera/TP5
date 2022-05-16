import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Storage } from '@capacitor/storage';
import { AlertController, ModalController } from '@ionic/angular';
import { Toast } from '@capacitor/toast';
import { ToastController } from '@ionic/angular';
import { DepositModalComponent } from '../deposit-modal/deposit-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {

  pokemons: Array<{name: string; url: string}> = [];

  constructor(
    private http: HttpClient,
    public alertController: AlertController,
    private modalCtrl: ModalController,
  ) {}
  ngOnInit() {
    this.getPokemons().then(pokemons => {
      this.pokemons = pokemons;
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

async openModal(nombre){
  const modal = await this.modalCtrl.create({
    component: DepositModalComponent,
    componentProps: {nombre: nombre}
  })

  await modal.present();
}

async eliminar(nombre){

  const alert = await this.alertController.create({
    cssClass: 'my-custom-class',
    header: 'Eliminar pokemon',
    message: '¿Estás seguro de eliminar a '+nombre+'?',
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel',
        cssClass: 'secondary',
        id: 'cancel-button'
      }, {
        text: 'Confirmar',
        id: 'confirm-button',
        handler: () => {
        var indice = this.pokemons.findIndex(element => element.name == nombre );
        this.pokemons.splice(indice, 1);
         console.log( this.pokemons );
         this.showConfirmToast();
      
        }
      }
    ]
  });
  await alert.present();


}
async showConfirmToast () {
  await Toast.show({
    text: 'Pokemon eliminado con exito!',
    duration: "short"
  });
}


}
