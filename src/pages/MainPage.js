import React, { useEffect, useState } from "react";
import MainLayout from "../layout/MainLayout";
import { useSelector } from "react-redux";
import MyGatherBoxComponent from "../components/main/MyGatherBoxComponent";

const MainPage = () => {
  const loginSlice = useSelector((state) => state.authSlice) || {};
  const [gathcate, setGathcate] = useState(1); 
  const [pageRequest, setPageRequest] = useState({
    userno : 1,
    gathcate : gathcate,
    pg : 1,
    type : '',
    keyword : '',
  })

  useEffect(() => {
    console.log("로그인정보 : ", loginSlice);
  }, []);


  return (
    <MainLayout>
      <div className="cntRow adBox">광고 박스</div>

      <div className="cntColumn">
        <div className="searhBox">
        <div className='cntRow articleCate'>
            <p className={`${gathcate === 1 ? 'cateOn' : ''}`}
                onClick={(e) => {setGathcate(prev => ({...prev, gathcate: 1 }))}}>프로젝트</p>

            <p className={`${gathcate === 2 ? 'cateOn' : ''}`}
                onClick={(e) => {setGathcate(prev => ({...prev, gathcate: 2 }))}}>스터디</p>

            <p className={`${gathcate === 3 ? 'cateOn' : ''}`}
                onClick={(e) => {setGathcate(prev => ({...prev, gathcate: 3 }))}}>모임</p>

            <p className={`${gathcate === 4 ? 'cateOn' : ''}`}
                onClick={(e) => {setGathcate(prev => ({...prev, gathcate: 3 }))}}>모집중</p>
        </div>
          <select name="" id="">
            <option value="">검색옵션</option>
            <option value="">검색1</option>
            <option value="">검색2</option>
            <option value="">검색3</option>
          </select>

          <label htmlFor="search">
            <input type="text" id="search" />
            <button>검색</button>
          </label>
        </div>

        <div className="cntWrapRow mainGatherList">
          <MyGatherBoxComponent loginSlice={loginSlice} pageRequest={pageRequest}/>
        </div>
      </div>
    </MainLayout>
  );
};

export default MainPage;
