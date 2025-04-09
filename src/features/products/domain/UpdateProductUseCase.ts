import { ProductDTO } from "../data/models/ProductDTO";
import { Product } from "../data/models/Product";
import { ProductRepository } from "../data/repository/ProductRepository";

export class UpdateProductUseCase {
    private productRepository: ProductRepository;

    constructor() {
        this.productRepository = new ProductRepository();
    }

    async execute(id: number, product: Product): Promise<ProductDTO | null> {
        try {
            const updatedProduct = await this.productRepository.update(id, product);
            return updatedProduct;
        } catch (error) {
            console.error("Error in UpdateProductUseCase:", error);
            throw error;
        }
    }
}