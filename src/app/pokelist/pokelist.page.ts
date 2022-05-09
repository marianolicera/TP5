import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { TouchSequence } from 'selenium-webdriver';

@Component({
  selector: 'app-pokelist',
  templateUrl: './pokelist.page.html',
  styleUrls: ['./pokelist.page.scss'],
})
export class PokelistPage implements OnInit {

  pokeName: string;
  pokemon;

  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.pokeName = this.activatedRoute.snapshot.paramMap.get('name')
    this.http.get('https://pokeapi.co/api/v2/pokemon/' + this.pokeName)
    .subscribe(res => this.pokemon = res)
  }

}
