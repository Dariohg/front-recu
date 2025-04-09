import { ProductDTO } from "../data/models/ProductDTO";
import { Product } from "../data/models/Product";
import { ProductRepository } from "../data/repository/ProductRepository";

export class CreateProductUseCase {
    private productRepository: ProductRepository;

    constructor() {
        this.productRepository = new ProductRepository();
    }

    async execute(product: Product): Promise<ProductDTO | null> {
        try {
            const newProduct = await this.productRepository.create(product);
            return newProduct;
        } catch (error) {
            console.error("Error in CreateProductUseCase:", error);
            throw error;
        }
    }
}