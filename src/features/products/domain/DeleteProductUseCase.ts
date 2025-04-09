import { ProductRepository } from "../data/repository/ProductRepository";

export class DeleteProductUseCase {
    private productRepository: ProductRepository;

    constructor() {
        this.productRepository = new ProductRepository();
    }

    async execute(id: number): Promise<boolean> {
        try {
            return await this.productRepository.delete(id);
        } catch (error) {
            console.error("Error in DeleteProductUseCase:", error);
            throw error;
        }
    }
}