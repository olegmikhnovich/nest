import { Injectable } from '@angular/core';
import { Jsonp, URLSearchParams, RequestOptions, Headers } from '@angular/http';
import { House } from './house'; 
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class HouseService {
    private nestoria_url: string;
    private country: string;
    private listing_type: string;
    private place_name: string;
    private bath_min: number;
    private bath_max: number;
    private beds_min: number;
    private beds_max: number;
    private priceMin: number
    private priceMax: number;

    private _cache: House;

    _country = {
        'au': '.au', 
        'br': '.com.br', 
        'de': '.de', 
        'es': '.es', 
        'fr': '.fr', 
        'in': '.in', 
        'it': '.it', 
        'mx': '.mx', 
        'uk': '.co.uk'
    };
    
    constructor(private jsonp: Jsonp) { }

    setupUrl(country: string, listing_type: string, place_name: string,
        bath_count: number, beds_count: number, priceMin: number, priceMax: number) {
            // Set country
            this.country = country;
            // Set rent/sale
            if(listing_type === 'For rent') this.listing_type = 'rent';
            else this.listing_type = 'buy';
            // Set place name
            this.place_name = place_name;
            // Set bath count
            if(bath_count >= 4) {
                this.bath_min = 4;
                this.bath_max = 100;
            } else {
                this.bath_min = 0;
                this.bath_max = bath_count;
            }
            // Set beds count
            if(beds_count >= 4) {
                this.beds_min = 4;
                this.beds_max = 100;
            } else {
                this.beds_min = 0;
                this.beds_max = beds_count;
            }
            // Set price
            this.priceMin = priceMin;
            this.priceMax = priceMax;
            // Make URL
            this.nestoria_url = 'https://api.nestoria'+ this._country[country] 
            +'/api?encoding=json&pretty=1&action=search_listings&country=' 
            + this.country + '&listing_type=' + this.listing_type + '&place_name=' 
            + this.place_name + '&bathroom_min=' + this.bath_min + '&bathroom_max='
            + this.bath_max + '&bedroom_min=' + this.beds_min + '&bedroom_max='
            + this.beds_max + '&price_min=' + this.priceMin + '&price_max=' + this.priceMax 
            + '&callback=JSONP_CALLBACK';
    } 

    getHouses(): Observable<House[]> {
        return this.jsonp.get(this.nestoria_url)
            .map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(response: Response | any) {
        let body = response.json();
        let data_block = body.response.listings;
        let houses: House[] = [];
        for(let h of data_block) {
            let house = new House(h.bathroom_number, h.bedroom_number, h.car_spaces, h.commission,
                h.construction_year, h.datasource_name, h.img_url, h.keywords, h.lister_url,
                h.listing_type, h.location_accuracy, h.price, h.price_currency, h.price_formatted,
                h.price_high, h.price_low, h.property_type, h.size, h.size_type, h.summary, h.title,
                h.updated_in_days, h.updated_in_days_formatted, false);
            houses.push(h);
        }
        return houses || { };
    }

    private handleError(error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

    saveSelectedData(house: House) {
        this._cache = house;
    }

    getSelectedData(): House { return this._cache; }
}