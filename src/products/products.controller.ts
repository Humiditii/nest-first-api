import { Controller, Post, Body, Get, Param, NotFoundException, Patch, Delete} from "@nestjs/common";
import {ProductsService} from './Products.service';

type mx = string | {products: any[]}

type prod = string | {product: any}

@Controller('products')
export class ProductsController {
    constructor(private readonly productService: ProductsService) {}
    
    @Post()
    addProduct( 
        @Body('title') prodTitle:string, 
        @Body('description') prodDesc: string, 
        @Body('price') prodPrice: number  
        ) : {id: string} {
        const generatedId =  this.productService.insertProduct(prodTitle, prodDesc, prodPrice);
        return {id: generatedId};
    }

    @Get()
    getProducts(): mx {
        if (this.productService.getProducts().length == 0){
            throw new NotFoundException("No product");
        }
        return {products: this.productService.getProducts()};
    }

    @Get(':id')
    getProduct( @Param('id') productId: string|number ): any { 
        //console.log( productId)
        const product = this.productService.getProduct(+productId)
        return {product}
    }

    @Patch(":id")
    editProduct( 
        @Param("id") prodId: number,
        @Body('title') prodTitle:string, 
        @Body('description') prodDesc: string, 
        @Body('price') prodPrice: number ): any {
        
            return this.productService.editProduct(prodId, prodTitle, prodDesc, prodPrice)
    }

    @Delete(":id")
    deleteProduct( @Param("id") prodId: number ){
        this.productService.deleteProd(prodId)
        return "deleted"
    }
}