import React from 'react';
import GatherBoxComponent from '../../components/main/GatherBoxComponent';
import MainLayout from '../../layout/MainLayout';
import '../../styles/gathering.scss';
import SearchAside from '../../components/gathering/SearchAside';

const ListPage = () => {
  return (
    <MainLayout>
      <div className="container">
        <div className="aside">
          <SearchAside />
        </div>
        <div className="content">
          <div className='cntColumn'>
            {/** 모임 글 목록 */}
            <div className='cntWrapRow gatherList'>
              <GatherBoxComponent />
              <GatherBoxComponent />
              <GatherBoxComponent />
              <GatherBoxComponent />
              <GatherBoxComponent />
              <GatherBoxComponent />
              <GatherBoxComponent />
              <GatherBoxComponent />
              <GatherBoxComponent />
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ListPage;
