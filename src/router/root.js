import { createBrowserRouter } from "react-router-dom";
import MainPage from "../pages/MainPage";
import List from "../pages/article/List";
import Develop from "../pages/Develop";
import Write from "../pages/article/Write";

const root = createBrowserRouter([

    /** 메인 페이지 */
    { path: '/', element: <MainPage /> },
    { path: '/develop', element: <Develop /> },

    /** 게시판 */
    { path: '/article/list', element: <List /> },
    { path: '/article/write', element: <Write /> },

]);
export default root;