import { createBrowserRouter } from "react-router-dom";
import MainPage from "../pages/MainPage";
import Develop from "../pages/Develop";

import ArticleListPage from "../pages/article/ListPage";
import ArticleWritePage from "../pages/article/WritePage";
import ArticleViewPage from "../pages/article/ViewPage";
import ArticleModifyPage from "../pages/article/ModifyPage";

import GatheringListPage from "../pages/gathering/ListPage";
import GatheringWritePage from "../pages/gathering/WritePage";
import GatheringViewPage from "../pages/gathering/ViewPage";
import GatheringModifyPage from "../pages/gathering/ModifyPage";

import RegisterPage from "../pages/user/RegisterPage";
import MyPage from "../pages/user/MyPage";

import LanguageListPage from "../pages/grade/LanguageListPage"
import QuestionListPage from "../pages/grade/QuestionListPage"
import QuestionViewPage from "../pages/grade/QuestionViewPage"
import GradePage from "../pages/grade/GradePage";
import MooimPage from "../pages/mooim/MooimPage";

const root = createBrowserRouter([
  /** 메인 페이지 */
  { path: "/", element: <MainPage /> },
  { path: "/develop", element: <Develop /> },

  /** 유저 */
  { path: "/user/register", element: <RegisterPage /> },
  { path: "/user/myPage", element: <MyPage /> },

  /** 게시판 */
  { path: "/article/list", element: <ArticleListPage /> },
  { path: "/article/write", element: <ArticleWritePage /> },
  { path: "/article/view", element: <ArticleViewPage /> },
  { path: "/article/modify", element: <ArticleModifyPage /> },

  /** 모임 */
  { path: "/gathering/list", element: <GatheringListPage /> },
  { path: "/gathering/write", element: <GatheringWritePage /> },
  { path: "/gathering/view", element: <GatheringViewPage /> },
  { path: "/gathering/modify", element: <GatheringModifyPage /> },

  /** 모임 시작 */
  { path: "/mooim", element: <MooimPage /> },

  /** 등급 */
  { path: "/grade/language", element: <LanguageListPage /> },
  { path: "/grade/question", element: <QuestionListPage /> },
  { path: "/grade/question/view", element: <QuestionViewPage /> },
  { path: "/grade", element: <GradePage /> },

]);
export default root;
