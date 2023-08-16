import { createBrowserRouter} from "react-router-dom";
import LoginPage from "../components/login";
import RegisterPage from "../components/registro";

const rotas = createBrowserRouter([
    {
        path: "/",
        element: <LoginPage/>,
    },
    {
        path: "registro",
        element: <RegisterPage/>,
    },
]);

export default rotas;