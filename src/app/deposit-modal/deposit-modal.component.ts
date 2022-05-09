import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-deposit-modal',
  templateUrl: './deposit-modal.component.html',
  styleUrls: ['./deposit-modal.component.scss'],
})
export class DepositModalComponent implements OnInit {

  @Input() nombre: string;
  pokemon: Object;

  constructor(
    private modalCtrl: ModalController,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.http.get('https://pokeapi.co/api/v2/pokemon/' + this.nombre)
    .subscribe(res => this.pokemon = res)
  }

  dismissModal(){
    this.modalCtrl.dismiss()
  }
}
