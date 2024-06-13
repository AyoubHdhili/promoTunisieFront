import { Product } from "./product";

export class CartServer{
    total!:number;
    data!:[
        {
            product: any,
            numInCart: number
        }
    ]
}

export class CartPublic{
    total!:number;
    prodData!:[
        {
            id:string,
            incart:number
        }
    ];
}