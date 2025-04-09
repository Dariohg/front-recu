import { createBrowserRouter } from "react-router-dom";
import ProductView from "../../features/products/presentation/pages/ProductView";
import { ProductViewModel } from "../../features/products/presentation/viewmodels/ProductViewModel";

const productViewModel = new ProductViewModel();

export const navigationWrapper = createBrowserRouter([
    {
        path: "/",
        element: <ProductView viewModel={productViewModel} />,
    }
]);