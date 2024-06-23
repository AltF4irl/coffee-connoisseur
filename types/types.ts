export interface CoffePlace {
    mapbox_id: string;
    full_address: string;
    name: string;
    name_preferred?: string;
    imageUrl: string;
}

export interface CoffePlacev2 {
    id: string;
    address: string;
    name: string;
    imageUrl: string;
    votes?: number;
}