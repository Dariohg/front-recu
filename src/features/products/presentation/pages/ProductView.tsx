import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { ProductViewModel } from "../viewmodels/ProductViewModel";
import ProductForm from "../components/ProductForm";
import ProductList from "../components/ProductList";

type Props = {
    viewModel: ProductViewModel;
};

const ProductView = observer(({ viewModel }: Props) => {
    useEffect(() => {
        viewModel.loadProducts();
    }, [viewModel]);

    return (
        <div className="py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-900">Gestión de Productos</h1>
                    <button
                        onClick={() => viewModel.loadProducts()}
                        className="btn btn-secondary"
                        disabled={viewModel.isLoading}
                    >
                        {viewModel.isLoading ? "Cargando..." : "Actualizar"}
                    </button>
                </div>

                <ProductForm viewModel={viewModel} />

                {viewModel.error && !viewModel.isEditing && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                        {viewModel.error}
                    </div>
                )}

                <div className="card">
                    <h2 className="text-xl font-semibold mb-4">Lista de Productos</h2>
                    <ProductList viewModel={viewModel} />
                </div>
            </div>
        </div>
    );
});

export default ProductView;