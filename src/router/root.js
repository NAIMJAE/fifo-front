import { createBrowserRouter } from "react-router-dom";
import MainPage from "../pages/MainPage";

const root = createBrowserRouter([

    /** 메인 페이지 */
    { path: '/', element: <MainPage /> },
]);
export default root;