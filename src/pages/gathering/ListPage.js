import React, { useEffect, useState } from "react";
import MainLayout from "../../layout/MainLayout";
import { useSelector } from "react-redux";
import MyGatherBoxComponent from "../../components/main/MyGatherBoxComponent";
import { myGatheringListApi } from "../../api/gatheringApi";

const ListPage = () => {
  const loginSlice = useSelector((state) => state.authSlice) || {};
  const [mooimList, setMooimList] = useState([]);
  const [pageRequest, setPageRequest] = useState({
    userno: loginSlice.userno,
    pg: 1,
    type: '',
    keyword: '',
  });

  /** 내 모임글 목록 불러오기 */
  useEffect(() => {
    const selectArticleList = async () => {
      try {
        const response = await myGatheringListApi(pageRequest);
        setMooimList(response.dtoList);
      } catch (err) {
        console.log(err);
      }
    };
    selectArticleList();
  }, [pageRequest, loginSlice]);

  return (
    <MainLayout>
      <div className="cntRow adBox">광고 박스</div>
      <div className='cntRow articleSearch'>
        <p className={`${pageRequest.keyword === "doing" ? 'tabOn' : ''}`}
          onClick={(e) => { setPageRequest(prev => ({ ...prev, keyword: "doing" })) }}>진행중</p>
        <p className={`${pageRequest.keyword === "gethering" ? 'tabOn' : ''}`}
          onClick={(e) => { setPageRequest(prev => ({ ...prev, keyword: "gethering" })) }}>모집중</p>
        <p className={`${pageRequest.keyword === "done" ? 'tabOn' : ''}`}
          onClick={(e) => { setPageRequest(prev => ({ ...prev, keyword: "done" })) }}>완료</p>

      </div>
      <div className="cntColumn">
        <span className="myMooimCate">프로젝트</span>
        <div className="cntWrapRow mainGatherList">
          <MyGatherBoxComponent mooimList={mooimList} mooimcate="1"/>
        </div>
        <span className="myMooimCate">스터디</span>
        <div className="cntWrapRow mainGatherList">
          <MyGatherBoxComponent mooimList={mooimList} mooimcate="2"/>
        </div>
        <span className="myMooimCate">모임</span>
        <div className="cntWrapRow mainGatherList">
          <MyGatherBoxComponent mooimList={mooimList} mooimcate="3"/>
        </div>
      </div>
    </MainLayout>
  );
};

export default ListPage;
