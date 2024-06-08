import { createBrowserRouter } from "react-router-dom";
import MainPage from "../pages/MainPage";
import List from "../pages/article/List";
import Develop from "../pages/Develop";
import ListPage from "../pages/gathering/ListPage";

const root = createBrowserRouter([

    /** 메인 페이지 */
    { path: '/', element: <MainPage /> },
    { path: '/develop', element: <Develop /> },

    /** 게시판 */
    { path: '/article/list', element: <List /> },



    /** 모임 */
    { path: '/mooim/list', element: <ListPage />}

]);
export default root;