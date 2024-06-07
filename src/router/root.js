import { createBrowserRouter } from "react-router-dom";
import MainPage from "../pages/MainPage";
import List from "../pages/article/List";
import Develop from "../pages/Develop";

const root = createBrowserRouter([

    /** 메인 페이지 */
    { path: '/', element: <MainPage /> },
    { path: '/develop', element: <Develop /> },

    /** 게시판 */
    { path: '/article/list', element: <List /> },

]);
export default root;