import { Component, OnInit } from '@angular/core';
import { HouseService } from '../app.service';
import { House } from '../house'; 

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  countries = {
    'Australia': 'au', 
    'Brasil': 'br', 
    'Deutschland': 'de', 
    'España': 'es', 
    'France': 'fr', 
    'India': 'in', 
    'Italia': 'it', 
    'Mexico': 'mx', 
    'UK': 'uk'
  };
  _countries = Object.keys(this.countries);
  what = ['For rent', 'For sale'];
  nums = ['1', '2', '3', '4+'];
  houses: House[] = [];
  
  constructor(private houseService: HouseService) { }

  ngOnInit() { this.loadData('uk', 'buy', 'london', 2, 1, 0, 99999999); }
  
  loadData(country: string, rent: string, place: string, bath: number, 
    bed: number, priceMin: number, priceMax: number) {
    this.houseService.setupUrl(country, rent, place, bath, bed, priceMin, priceMax);
    this.houseService.getHouses().subscribe(houses => this.houses = houses);
  }

  setFavorite(house: House) { 
    if(!house.favorite) {
      localStorage.setItem(house.lister_url, JSON.stringify(house));
    } else {
      localStorage.removeItem(house.lister_url);
    }
    house.favorite = !house.favorite;
  }
  
  openMore(h: House) {
    // window.open(h.lister_url);
    this.houseService.saveSelectedData(h);
  }
  
  submitData(place, country, rent, bath, bed, priceMin, priceMax) {
    let p = place.value;
    let c = this.countries[country.value];
    let r = rent.value;
    let ba = 0;
    if(bath.value === '4+') ba = 4; else ba = +bath.value;
    let be = 0;
    if(bath.value === '4+') be = 4; else be = +bath.value;
    let pmin = 0;
    if(priceMin.value !== undefined) pmin = priceMin.value;
    let pmax = 0;
    if(priceMin.value !== undefined) pmax = priceMax.value;
    this.loadData(c, r, p, ba, be, pmin, pmax);
  }

  loadFavorite() {
    this.houses = [];
    let keys = Object.keys(localStorage);
    let i = keys.length;
    while (i--) {
      let item = JSON.parse(localStorage.getItem(keys[i]));
      item.favorite = true;
      this.houses.push(item);
    } 
  }
}
