import { observer } from "mobx-react-lite";
import { ProductViewModel } from "../viewmodels/ProductViewModel";

type Props = {
    viewModel: ProductViewModel;
};

const ProductForm = observer(({ viewModel }: Props) => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (viewModel.isEditing) {
            viewModel.updateProduct();
        } else {
            viewModel.createProduct();
        }
    };

    return (
        <div className="card mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
                {viewModel.isEditing ? "Editar Producto" : "Nuevo Producto"}
            </h2>

            {viewModel.error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {viewModel.error}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="form-label">
                        Nombre
                    </label>
                    <input
                        type="text"
                        value={viewModel.nombre}
                        onChange={(e) => viewModel.setNombre(e.target.value)}
                        className="form-input"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="form-label">
                        Precio
                    </label>
                    <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={viewModel.precio}
                        onChange={(e) => viewModel.setPrecio(e.target.value)}
                        className="form-input"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="form-label">
                        Código
                    </label>
                    <input
                        type="text"
                        value={viewModel.codigo}
                        onChange={(e) => viewModel.setCodigo(e.target.value)}
                        className="form-input"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            checked={viewModel.descuento}
                            onChange={(e) => viewModel.setDescuento(e.target.checked)}
                            className="mr-2 h-4 w-4 text-blue-600 rounded"
                        />
                        <span className="text-gray-700 text-sm font-medium">Aplicar descuento</span>
                    </label>
                </div>

                <div className="flex justify-end space-x-2">
                    {viewModel.isEditing && (
                        <button
                            type="button"
                            onClick={() => viewModel.cancelEdit()}
                            className="btn btn-secondary"
                        >
                            Cancelar
                        </button>
                    )}

                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={viewModel.isLoading}
                    >
                        {viewModel.isLoading
                            ? "Procesando..."
                            : viewModel.isEditing
                                ? "Actualizar"
                                : "Crear"}
                    </button>
                </div>
            </form>
        </div>
    );
});

export default ProductForm;