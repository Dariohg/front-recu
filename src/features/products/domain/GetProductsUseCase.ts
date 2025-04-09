import { ProductDTO } from "../data/models/ProductDTO";
import { ProductRepository } from "../data/repository/ProductRepository";

export class GetProductsUseCase {
    private productRepository: ProductRepository;

    constructor() {
        this.productRepository = new ProductRepository();
    }

    async execute(): Promise<ProductDTO[]> {
        try {
            const products = await this.productRepository.getAll();
            return products;
        } catch (error) {
            console.error("Error in GetProductsUseCase:", error);
            throw error;
        }
    }
}