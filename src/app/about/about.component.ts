import { Component, OnInit } from '@angular/core';
import { HouseService } from '../app.service';
import { House } from '../house';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})

export class AboutComponent implements OnInit {
  private house: House;
  constructor(private houseService: HouseService) { }
  ngOnInit() { this.house = this.houseService.getSelectedData(); }
}