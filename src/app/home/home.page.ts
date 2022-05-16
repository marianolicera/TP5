import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { AlertController, ModalController } from '@ionic/angular';
import { DepositModalComponent } from '../deposit-modal/deposit-modal.component';
import { Toast } from '@capacitor/toast';
import { Button } from 'protractor';
import { identity } from 'rxjs';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {

  pkmn = [];
  id : number;

  constructor(
    private http: HttpClient,
    private modalCtrl: ModalController,
    public alertController: AlertController,
    public toastController: ToastController
  ) {}
  
  async showConfirmToast () {
    await Toast.show({
      text: 'Pokemon eliminado con exito!',
      duration: "short"
    });
  }

 

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
          var indice = this.pkmn.findIndex(element => element.name == nombre );
          this.pkmn.splice(indice, 1);
           console.log( this.pkmn );
           this.showConfirmToast();
        
          }
        }
      ]
    });
    await alert.present();
    
  }
 
  }
  


 






 




