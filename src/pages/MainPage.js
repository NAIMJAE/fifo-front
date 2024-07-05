import React, { useEffect, useState } from 'react';
import GatherBoxComponent from '../components/gathering/GatherBoxComponent';
import MainLayout from '../layout/MainLayout';
import '../styles/gathering.scss';
import SearchAside from '../components/gathering/SearchAside';
import { gatheringListApi } from '../api/gatheringApi';
import PageingComponent from '../components/common/paging/PageingComponent';
import { Link } from 'react-router-dom';
import Breadcrumb from '../components/common/main/Breadcrumb';
import { useSelector } from 'react-redux';

const MainPage = () => {
  /** 사이드바 열림 상태 관리 */
  const [sideBar, setSideBar] = useState(false);
  const toggleSideBar = () => setSideBar(!sideBar);

  /** 검색 카테고리 useState */
  const [pageRequest, setPageRequest] = useState({
    no: 1,
    pg: 1,
    size: 16,
    sort: 'gathno',
    gatheringDTO: {}
  });

  // 모임글 목록 useState
  const [pageReaponse, setPageResponse] = useState([]);
  const [gathList, setGathList] = useState([]);
  const [loading, setLoading] = useState(true);

  // 서버에서 모임글 목록 받아오는 useEffect
  useEffect(() => {
    const selectArticleList = async () => {
      try {
        const response = await gatheringListApi(pageRequest);
        setPageResponse(response);
        setGathList(response.dtoList);
        console.log(pageReaponse);
        console.log(gathList);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    selectArticleList();
  }, [pageRequest]);

  /** pg 변경 함수 (페이징 버튼 클릭시) */
  const changePage = (newPg) => {
    setPageRequest(prev => ({ ...prev, pg: newPg }));
  };

  const loginSlice = useSelector((state) => state.authSlice) || {};
  const [gathcate, setGathcate] = useState(1);

  useEffect(() => {
    console.log("로그인정보 : ", loginSlice);
  }, []);

  return (
    <MainLayout>
      <div className="container">
        <div className="content sideHide">
          <div className="cntColumn sideHide2">
          <div className="cntRow adBox">광고 박스</div>
            
            {loading ? (
              <div>로딩 중...</div>
            ) : (
              <>
                {/** 모임 글 목록 */}
                <div className="cntWrapRow gatherList">
                  <GatherBoxComponent gathList={gathList} />
                </div>
                <div className="pageAndBtn">
                  <PageingComponent cntList={pageReaponse} changePage={changePage} />
                  <Link to="/gathering/write" className="hvMdBtn">글쓰기</Link>
                </div>
              </>
            )}
          </div>
          {/** 햄버거 사이드 */}
          <div className={`sidebar-wrapper ${sideBar ? 'open' : ''}`}>
            <div
              className={`hamburger-trigger ${sideBar ? 'active-4' : ''}`}
              onClick={toggleSideBar}
            >
              <span></span>
              <span></span>
              <span></span>
            </div>
            <div className={`searchGathAside ${sideBar ? 'open' : ''}`}>
              <SearchAside setPageRequest={setPageRequest} />
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default MainPage;
