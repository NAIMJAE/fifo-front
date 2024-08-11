import React, { useEffect, useState } from "react";
import MainLayout from "../../layout/MainLayout";
import { useSelector } from "react-redux";
import MyGatherBoxComponent from "../../components/main/MyGatherBoxComponent";
import { myGatheringListApi } from "../../api/gatheringApi";
import GatherBoxComponent from "../../components/gathering/GatherBoxComponent";

const ListPage = () => {
  const [loadingGath, setLoading] = useState(false);
  const loginSlice = useSelector((state) => state.authSlice) || {};
  const [mooimList, setMooimList] = useState([]);
  const [mooimDTO, setMooimDTO] = useState({
    userno: loginSlice.userno,
    mooimstate: 0,
  });

  /** 내 모임글 목록 불러오기 */
  useEffect(() => {
    const selectArticleList = async () => {
      try {
        const response = await myGatheringListApi(mooimDTO);
        setMooimList(response);
        if(mooimDTO.mooimstate == 3){
          setLoading(true);
        }else {
          setLoading(false);
        }
      } catch (err) {
        console.log(err);
      }
    };
    selectArticleList();
  }, [mooimDTO, loginSlice]);

  return (
    <MainLayout>
      <div className="cntRow adBox">
      <img src="../../../images/gwanggo.gif" alt=""/>
      </div>
      <div className='cntRow articleSearch'>
        <p className={`${mooimDTO.mooimstate === "doing" ? 'tabOn' : ''}`}
          onClick={(e) => { setMooimDTO(prev => ({ ...prev, mooimstate: 1 })) }}>진행중</p>
        <p className={`${mooimDTO.mooimstate === "done" ? 'tabOn' : ''}`}
          onClick={(e) => { setMooimDTO(prev => ({ ...prev, mooimstate: 2 })) }}>완료</p>
        <p className={`${mooimDTO.mooimstate === "gethering" ? 'tabOn' : ''}`}
          onClick={(e) => { setMooimDTO(prev => ({ ...prev, mooimstate: 3 })) }}>모집중</p>

      </div>
      {loadingGath ? (
        <>
          {/** 모임 글 목록 */}
          <div className="cntWrapRow gatherList">
            <GatherBoxComponent gathList={mooimList} />
          </div>
        </>
      ) : (
        mooimList && mooimList.length > 0 ? (
          <div className="cntColumn">
            <span className="myMooimCate">프로젝트</span>
              <MyGatherBoxComponent mooimList={mooimList} mooimcate={1} />
            <span className="myMooimCate">스터디</span>
              <MyGatherBoxComponent mooimList={mooimList} mooimcate={2} />
            <span className="myMooimCate">모임</span>
              <MyGatherBoxComponent mooimList={mooimList} mooimcate={3} />
          </div>
        ) : (
          <div className="cntColumn">
            <img src="../../images/sample/nodata.png" alt="" style={{ width: '100%' }} />
          </div>
        )
      )}
    </MainLayout>
  );
};

export default ListPage;
