import { ProductDTO } from "../models/ProductDTO";
import { Product } from "../models/Product";

export class ProductRepository {
    async getAll(): Promise<ProductDTO[]> {
        const response = await fetch('/api/productos');

        if (!response.ok) {
            throw new Error(`Error fetching products: ${response.statusText}`);
        }

        const data: ProductDTO[] = await response.json();
        return data;
    }

    async create(product: Product): Promise<ProductDTO | null> {
        const response = await fetch('/api/addProducto', {
            method: 'POST',
            body: JSON.stringify(product),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        });

        if (!response.ok) {
            throw new Error(`Error creating product: ${response.statusText}`);
        }

        const data: ProductDTO = await response.json();
        return data;
    }

    async update(id: number, product: Product): Promise<ProductDTO | null> {
        const response = await fetch(`/api/productos/${id}`, {
            method: 'PUT',
            body: JSON.stringify(product),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        });

        if (!response.ok) {
            throw new Error(`Error updating product: ${response.statusText}`);
        }

        const data: ProductDTO = await response.json();
        return data;
    }

    async delete(id: number): Promise<boolean> {
        const response = await fetch(`/api/productos/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error(`Error deleting product: ${response.statusText}`);
        }

        return true;
    }
}