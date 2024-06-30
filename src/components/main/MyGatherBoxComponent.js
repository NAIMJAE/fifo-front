import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { RootUrl } from '../../api/RootUrl';
import { myGatheringListApi } from "../../api/gatheringApi";

const MyGatherBoxComponent = ({ loginSlice, pageRequest }) => {
    
    // 모임글 목록 useState
    const [gathList, setGathList] = useState([]);
    const [loading, setLoading] = useState(true);
 
    // 서버에서 모임글 목록 받아오는 useEffect
    useEffect(() => {
      const selectArticleList = async () => {
        try {
          const response = await myGatheringListApi(pageRequest);
          setGathList(response);
          setLoading(false);
        } catch (err) {
          console.log(err);
        }
      };
      selectArticleList();
    }, [pageRequest, loginSlice]);

  return (
    <>
      {gathList && gathList.length > 0 ? (
        gathList.map((gathering, index) => (
          <div className='gathCard'>
            <div className='cntColumn'>
              <h4>{gathering.gathtitle}</h4>
            </div>

            <div className='gathCardContent cntRow'>
              <div className='imgBox'>
                {gathering.thumb && gathering.thumb.trim() ? (
                  <img src={`${RootUrl()}/uploads/gathering/thumb/${gathering.thumb}`} alt="thumb" />
                ) : (
                  <img src="../../images/sample/ppoppi_angry.png" alt="sample" />
                )}
              </div>
              <div className='myGatherLink'>
                <Link to={`gathering/project`} className='gathLink'>채팅</Link>
                <Link to={`gathering/project`} className='gathLink'>프로젝트</Link>
                <Link to={`gathering/project`} className='gathLink'>게시판</Link>
              </div>
            </div>
          </div>
        ))
      ) : (
        <>
          {/** 데이터가 없을 때 */}
          <div className='gathCard'>
            <div className='cntColumn'>
              <h4>모임글제목</h4>
            </div>

            <div className='gathCardContent cntRow'>
              <div className='imgBox'>
                
                  <img src="../../images/sample/ppoppi_angry.png" alt="sample" />
                
              </div>
              <div className='myGatherLink'>
                <Link to={`gathering/project`} className='gathLink'>채팅</Link>
                <Link to={`gathering/project`} className='gathLink'>프로젝트</Link>
                <Link to={`gathering/project`} className='gathLink'>게시판</Link>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default MyGatherBoxComponent;
