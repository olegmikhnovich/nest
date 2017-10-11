export class House {
    bathroom_number: number;
    bedroom_number: number; 
    car_spaces: number;
    commission: number; 
    construction_year: number;
    datasource_name: string;
    img_url: string;
    keywords: string;
    lister_url: string; 
    listing_type: string;
    location_accuracy: number;
    price: number;
    price_currency: string;  
    price_formatted: string; 
    price_high: number;
    price_low: number;
    property_type: string; 
    size: number;
    size_type: string;  
    summary: string;
    title: string;
    updated_in_days: number;  
    updated_in_days_formatted: string;
    favorite: boolean;

    constructor(
        bathroom_number: number,
        bedroom_number: number, 
        car_spaces: number,
        commission: number, 
        construction_year: number,
        datasource_name: string,
        img_url: string,
        keywords: string,
        lister_url: string,  
        listing_type: string,  
        location_accuracy: number,
        price: number,
        price_currency: string,  
        price_formatted: string, 
        price_high: number,
        price_low: number, 
        property_type: string, 
        size: number,
        size_type: string,  
        summary: string,
        title: string,
        updated_in_days: number,  
        updated_in_days_formatted: string,
        favorite: boolean
    ) {
        this.bathroom_number = bathroom_number;
        this.bedroom_number = bedroom_number; 
        this.car_spaces = car_spaces;
        this.commission = commission; 
        this.construction_year = construction_year;
        this.datasource_name = datasource_name;
        this.img_url = img_url;
        this.keywords = keywords;
        this.lister_url = lister_url; 
        this.listing_type = listing_type;
        this.location_accuracy = location_accuracy;
        this.price = price;
        this.price_currency = price_currency;
        this.price_formatted = price_formatted;
        this.price_high = price_high;
        this.price_low = price_low;
        this.property_type = property_type;
        this.size = size;
        this.size_type = size_type;
        this.summary = summary;
        this.title = title;
        this.updated_in_days = updated_in_days;
        this.updated_in_days_formatted = updated_in_days_formatted;
        this.favorite = favorite;
    }
}