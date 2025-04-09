import { makeAutoObservable, runInAction } from "mobx";
import { Product } from "../../data/models/Product";
import { ProductDTO } from "../../data/models/ProductDTO";
import { GetProductsUseCase } from "../../domain/GetProductsUseCase";
import { CreateProductUseCase } from "../../domain/CreateProductUseCase";
import { UpdateProductUseCase } from "../../domain/UpdateProductUseCase";
import { DeleteProductUseCase } from "../../domain/DeleteProductUseCase";

export class ProductViewModel {
    // Estado para el formulario
    nombre: string = '';
    precio: number = 0;
    codigo: string = '';
    descuento: boolean = false;

    // Estado para la aplicación
    products: ProductDTO[] = [];
    selectedProductId: number | null = null;
    isLoading: boolean = false;
    error: string | null = null;
    isEditing: boolean = false;

    // Casos de uso
    private getProductsUseCase: GetProductsUseCase;
    private createProductUseCase: CreateProductUseCase;
    private updateProductUseCase: UpdateProductUseCase;
    private deleteProductUseCase: DeleteProductUseCase;

    constructor() {
        makeAutoObservable(this);
        this.getProductsUseCase = new GetProductsUseCase();
        this.createProductUseCase = new CreateProductUseCase();
        this.updateProductUseCase = new UpdateProductUseCase();
        this.deleteProductUseCase = new DeleteProductUseCase();
    }

    // Métodos para actualizar el formulario
    setNombre(nombre: string) {
        this.nombre = nombre;
    }

    setPrecio(precio: string) {
        const parsedPrecio = parseFloat(precio);
        this.precio = isNaN(parsedPrecio) ? 0 : parsedPrecio;
    }

    setCodigo(codigo: string) {
        this.codigo = codigo;
    }

    setDescuento(descuento: boolean) {
        this.descuento = descuento;
    }

    // Métodos para manejar operaciones CRUD
    async loadProducts() {
        this.isLoading = true;
        this.error = null;

        try {
            const products = await this.getProductsUseCase.execute();
            runInAction(() => {
                this.products = products;
                this.isLoading = false;
            });
        } catch (error: any) {
            runInAction(() => {
                this.error = error.message || "Error al cargar los productos";
                this.isLoading = false;
            });
        }
    }

    async createProduct() {
        if (!this.validateForm()) {
            return;
        }

        this.isLoading = true;
        this.error = null;

        try {
            const product = new Product(
                this.nombre,
                this.precio,
                this.codigo,
                this.descuento
            );

            const newProduct = await this.createProductUseCase.execute(product);

            runInAction(() => {
                if (newProduct) {
                    this.products.push(newProduct);
                    this.resetForm();
                }
                this.isLoading = false;
            });
        } catch (error: any) {
            runInAction(() => {
                this.error = error.message || "Error al crear el producto";
                this.isLoading = false;
            });
        }
    }

    selectProductForEdit(id: number) {
        const product = this.products.find(p => p.id === id);
        if (product) {
            this.selectedProductId = id;
            this.nombre = product.nombre;
            this.precio = product.precio;
            this.codigo = product.codigo;
            this.descuento = product.descuento;
            this.isEditing = true;
        }
    }

    cancelEdit() {
        this.resetForm();
        this.isEditing = false;
        this.selectedProductId = null;
    }

    async updateProduct() {
        if (!this.selectedProductId || !this.validateForm()) {
            return;
        }

        this.isLoading = true;
        this.error = null;

        try {
            const product = new Product(
                this.nombre,
                this.precio,
                this.codigo,
                this.descuento
            );

            const updatedProduct = await this.updateProductUseCase.execute(this.selectedProductId, product);

            runInAction(() => {
                if (updatedProduct) {
                    const index = this.products.findIndex(p => p.id === this.selectedProductId);
                    if (index !== -1) {
                        this.products[index] = updatedProduct;
                    }
                    this.resetForm();
                    this.isEditing = false;
                    this.selectedProductId = null;
                }
                this.isLoading = false;
            });
        } catch (error: any) {
            runInAction(() => {
                this.error = error.message || "Error al actualizar el producto";
                this.isLoading = false;
            });
        }
    }

    async deleteProduct(id: number) {
        this.isLoading = true;
        this.error = null;

        try {
            const success = await this.deleteProductUseCase.execute(id);

            runInAction(() => {
                if (success) {
                    this.products = this.products.filter(p => p.id !== id);
                    if (this.selectedProductId === id) {
                        this.resetForm();
                        this.isEditing = false;
                        this.selectedProductId = null;
                    }
                }
                this.isLoading = false;
            });
        } catch (error: any) {
            runInAction(() => {
                this.error = error.message || "Error al eliminar el producto";
                this.isLoading = false;
            });
        }
    }

    // Métodos auxiliares
    private validateForm(): boolean {
        if (!this.nombre || this.nombre.trim() === '') {
            this.error = "El nombre del producto es obligatorio";
            return false;
        }

        if (this.precio <= 0) {
            this.error = "El precio debe ser mayor que cero";
            return false;
        }

        if (!this.codigo || this.codigo.trim() === '') {
            this.error = "El código del producto es obligatorio";
            return false;
        }

        this.error = null;
        return true;
    }

    private resetForm() {
        this.nombre = '';
        this.precio = 0;
        this.codigo = '';
        this.descuento = false;
    }
}