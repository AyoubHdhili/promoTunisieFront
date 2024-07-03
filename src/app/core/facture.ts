import { Product } from "./product";

export class facture{
    invoice!:number;
    firstName!:string;
    lastName!:string;
    address!:string;
    zipCode!:string;
    city!:string;
    governorat!:string;
    items!:Product[];
}