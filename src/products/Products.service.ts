import { Injectable, NotFoundException } from "@nestjs/common";
import { Product } from './Product.model';

@Injectable()
export class ProductsService {
    private products: Product[] = [];

    insertProduct(title: string, desc: string, price: number): string {
        const prodId = Date.now().toString();
        const newProduct = new Product(
            prodId,
            title,
            desc,
            price
        )
        this.products.push(newProduct);
        return prodId
    }

    getProducts(){
        return [...this.products]
}

    getProduct(prodId:number){
        const prod = this.getProducts()[prodId]
        if(!prod) throw new NotFoundException('Product not found')
        return {...prod}
    }

    editProduct(prodId:number, title: string, desc: string, price: number): {message:string} {
        const prod = this.getProducts()[prodId]
        if(!prod) throw new NotFoundException('Product not found')
        prod.desc = !desc?prod.desc:desc;
        prod.price = !price?prod.price:price;
        prod.title = !title?prod.title:title;
        return {message: 'updated'}
    }

    deleteProd(prodId:number): void {
        const toRemove = this.getProduct(prodId)
        const idx = this.products.findIndex( e => e == toRemove )
        this.products.splice(idx,1)
    }

}