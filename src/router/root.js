import { createBrowserRouter } from "react-router-dom";
import MainPage from "../pages/MainPage";
import Develop from "../pages/Develop";

import ArticleListPage from "../pages/article/ListPage";
import ArticleWritePage from "../pages/article/WritePage";
import ArticleViewPage from "../pages/article/ViewPage";

import GatheringListPage from "../pages/gathering/ListPage";
import GatheringWritePage from "../pages/gathering/WritePage";

import LoginPage from "../pages/user/LoginPage";


const root = createBrowserRouter([
  /** 메인 페이지 */
  { path: "/", element: <MainPage /> },
  { path: "/develop", element: <Develop /> },

  /** 게시판 */
  { path: "/article/list", element: <ArticleListPage /> },
  { path: "/article/write", element: <ArticleWritePage /> },
  { path: "/article/view", element: <ArticleViewPage /> },

  /** 모임 */
  { path: "/gathering/list", element: <GatheringListPage /> },
  { path: "/gathering/write", element: <GatheringWritePage /> },

  /** 회원 */
  { path: "/user/login", element: <LoginPage /> },
]);
export default root;
