import React, { useEffect, useState } from 'react';
import GatherBoxComponent from '../components/gathering/GatherBoxComponent';
import MainLayout from '../layout/MainLayout';
import '../styles/gathering.scss';
import SearchAside from '../components/gathering/SearchAside';
import { gatheringListApi } from '../api/gatheringApi';
import PageingComponent from '../components/common/paging/PageingComponent';
import { Link, useNavigate } from 'react-router-dom';
import Breadcrumb from '../components/common/main/Breadcrumb';
import { useSelector } from 'react-redux';

const MainPage = () => {
  /** 사이드바 열림 상태 관리 */
  const [sideBar, setSideBar] = useState(false);
  const toggleSideBar = () => setSideBar(!sideBar);
  const navigate = useNavigate();
  /** 모집 중만 보기 상태 */
  const [gathState, setGathState] = useState(true);
  /** 검색 카테고리 useState */
  const [pageRequest, setPageRequest] = useState({
    no: 1,
    pg: 1,
    size: 16,
    sort: 'gathno',
    gathState: gathState,
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

  /** gathState가 변경될 때 pageRequest 업데이트 */
  useEffect(() => {
    setPageRequest(prev => ({ ...prev, gathState }));
  }, [gathState]);
  const loginSlice = useSelector((state) => state.authSlice) || {};

  const writeHandler = () => {
    if (loginSlice.userno != null) {
      navigate('/gathering/write');
    } else {
      alert("로그인이 필요한 서비스입니다.");
    }
  }

  return (
    <MainLayout>
      <div className="container">
        <div className="content sideHide">
          <div className="cntColumn sideHide2">
            <div className="cntRow adBox">
              <img src="../../../images/gwanggo.gif" alt=""/>
            </div>

            {loading ? (
              <div>로딩 중...</div>
            ) : (
              <>
                {/** 모임 글 목록 */}
                <div className={`btnGathState ${gathState ? 'stateGathering' : ''}`} onClick={() => setGathState(!gathState)}>
                  ✔️ 모집 중만 보기
                </div>
                <div className="cntWrapRow gatherList">
                  <GatherBoxComponent gathList={gathList} />
                </div>
                <div className="pageAndBtn">
                  <PageingComponent cntList={pageReaponse} changePage={changePage} />
                  <button className="hvMdBtn" onClick={writeHandler}>글쓰기</button>
                </div>
              </>
            )}
          </div>
          {/** 햄버거 사이드 */}
          <div className="sidebar-wrapper">
            <div
              className={`hamburger-trigger ${sideBar ? 'active-4' : ''}`}
              onClick={toggleSideBar}
            >
              <span></span>
              <span></span>
              <span></span>
            </div>
            <div className='hamburgerBack'>

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
