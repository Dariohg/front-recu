import { observer } from "mobx-react-lite";
import { ProductViewModel } from "../viewmodels/ProductViewModel";

type Props = {
    viewModel: ProductViewModel;
};

const ProductList = observer(({ viewModel }: Props) => {
    if (viewModel.isLoading && viewModel.products.length === 0) {
        return <div className="text-center py-4">Cargando productos...</div>;
    }

    if (viewModel.products.length === 0) {
        return (
            <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
                No hay productos disponibles.
            </div>
        );
    }

    const formatDate = (dateString?: string) => {
        if (!dateString) return "N/A";
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("es-MX", {
            style: "currency",
            currency: "MXN",
        }).format(price);
    };

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg overflow-hidden">
                <thead className="bg-gray-100">
                <tr>
                    <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                        ID
                    </th>
                    <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                        Nombre
                    </th>
                    <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                        Precio
                    </th>
                    <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                        Código
                    </th>
                    <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                        Descuento
                    </th>
                    <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                        Fecha Creación
                    </th>
                    <th className="px-6 py-3 border-b border-gray-200 text-right text-xs font-medium text-gray-600 uppercase tracking-wider">
                        Acciones
                    </th>
                </tr>
                </thead>
                <tbody>
                {viewModel.products.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {product.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {product.nombre}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {formatPrice(product.precio)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {product.codigo}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {product.descuento ? (
                                <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    Sí
                  </span>
                            ) : (
                                <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    No
                  </span>
                            )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {formatDate(product.fecha_creacion)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button
                                onClick={() => viewModel.selectProductForEdit(product.id)}
                                className="text-blue-600 hover:text-blue-900 mr-4"
                            >
                                Editar
                            </button>
                            <button
                                onClick={() => {
                                    if (window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
                                        viewModel.deleteProduct(product.id);
                                    }
                                }}
                                className="text-red-600 hover:text-red-900"
                            >
                                Eliminar
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
});

export default ProductList;