import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { RootUrl } from '../../api/RootUrl';

const MyGatherBoxComponent = ({ mooimList, mooimcate }) => {

  /** 진행도 막대 색상 */
  const getProgressBarColor = (progress) => {
    if (progress < 30) return '#FF4D4F';
    if (progress < 70) return '#FFC107';
    return '#4CAF50';
  };

  return (
    <>
    <div className="cntWrapRow mainGatherList">
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
                    <img src={`${RootUrl()}/uploads/mooim/${mooim.mooimno}/thumb/${mooim.thumb}`} alt="thumb" />
                  ) : (
                    <img src="../../images/sample/ppoppi.png" alt="sample" />
                  )}
                </div>
                <div className='myMooimInfo cntColumn'>
                  <span className='mooimInfo'>{mooim.mooimintro ? mooim.mooimintro : '모임 소개글을 작성해보세요!'}</span>
                  <div className='mooimProgress'>
                    <div
                      className='progressBar'
                      style={{
                        width: `${mooim.progress}%`,
                        backgroundColor: getProgressBarColor(mooim.progress),
                      }}
                    >{mooim.progress > 0 && `${mooim.progress}%`}</div>
                  </div>
                </div>
              </div>
            </Link>
          ))
      ) : (
        <>
          {/** 데이터가 없을 때 */}
          <div className='gathCard'>
          </div>
        </>
      )}
      </div>
    </>
  );
}

export default MyGatherBoxComponent;
