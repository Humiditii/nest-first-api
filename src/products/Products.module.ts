import { Module } from "@nestjs/common";
import { ProductsController } from "./products.controller";
import { ProductsService } from "./Products.service";

@Module({
    controllers: [ProductsController],
    providers: [ProductsService]
})
export class ProductModule {}