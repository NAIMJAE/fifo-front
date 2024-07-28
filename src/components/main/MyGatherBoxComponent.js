import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { RootUrl } from '../../api/RootUrl';

const MyGatherBoxComponent = ({ mooimList, mooimcate }) => {
  
  return (
    <>
      {mooimList && mooimList.length > 0 ? (
        mooimList
        .filter(mooim => mooim.mooimcate === mooimcate).map((mooim, index) => (
            <Link to={`/mooim?mooimno=${mooim.mooimno}`} className='gathCard'>
              <div className='cntColumn'>
                <h4>{mooim.mooimtitle}</h4>
              </div>

              <div className='gathCardContent cntRow'>
                <div className='imgBox'>
                  {mooim.thumb && mooim.thumb.trim() ? (
                    <img src={`${RootUrl()}/uploads/mooim/thumb/${mooim.thumb}`} alt="thumb" />
                  ) : (
                    <img src="../../images/sample/ppoppi_angry.png" alt="sample" />
                  )}
                </div>
                <div className='myGatherLink'>
                  <Link to={`mooim/chat/${mooim.mooimno}`} className='gathLink'>채팅</Link>
                  <Link to={`mooim/project/${mooim.mooimno}`} className='gathLink'>프로젝트</Link>
                  <Link to={`mooim/calendar/${mooim.mooimno}`} className='gathLink'>캘린더</Link>
                  <Link to={`mooim/doc/${mooim.mooimno}`} className='gathLink'>게시판</Link>
                </div>
              </div>
            </Link>
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
                <Link to={`mooim/project`} className='gathLink'>채팅</Link>
                <Link to={`mooim/project`} className='gathLink'>프로젝트</Link>
                <Link to={`mooim/project`} className='gathLink'>게시판</Link>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default MyGatherBoxComponent;
