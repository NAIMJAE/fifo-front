import { createBrowserRouter } from "react-router-dom";
import MainPage from "../pages/MainPage";
import Develop from "../pages/Develop";

import ArticleListPage from "../pages/article/ListPage";
import ArticleWritePage from "../pages/article/WritePage";
import ArticleViewPage from "../pages/article/ViewPage";

import ListPage from "../pages/gathering/ListPage";

import LanguageListPage from "../pages/grade/LanguageListPage"
import QuestionListPage from "../pages/grade/QuestionListPage"

const root = createBrowserRouter([
  /** 메인 페이지 */
  { path: "/", element: <MainPage /> },
  { path: "/develop", element: <Develop /> },

  /** 게시판 */
  { path: "/article/list", element: <ArticleListPage /> },
  { path: "/article/write", element: <ArticleWritePage /> },
  { path: "/article/view", element: <ArticleViewPage /> },

  /** 모임 */
  { path: "/gathering/list", element: <ListPage /> },

  /** 회원 */

  /** 등급 */
  { path: "/grade/language", element: <LanguageListPage /> },
  { path: "/grade/question/", element: <QuestionListPage /> },
  
]);
export default root;
