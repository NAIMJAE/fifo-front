import React, { useEffect, useState } from 'react'
import MainLayout from '../layout/MainLayout'
import GatherBoxComponent from '../components/main/GatherBoxComponent'
import { testApi } from '../api/TestApi'

const MainPage = () => {

  const [test, setTest] = useState("");

  useEffect(() => {
    const apiTest = async () => {
      try {
        const response = await testApi();
        console.log(response);
        setTest(response);
      }catch (err) {
        console.log(err);
      }
    }
    apiTest();
  },[])

  return (
    <MainLayout>
        <div className='cntRow adBox'>
          광고 박스
          {(test > 0) ? ("서버 연결 성공"):("서버 연결 실패")}
        </div>

        <div className='cntColumn'>

          <div className='searhBox'>
            <select name="" id="">
              <option value="">검색옵션</option>
              <option value="">검색1</option>
              <option value="">검색2</option>
              <option value="">검색3</option>
            </select>
            

            <label htmlFor="search">
              <input type="text" id='search'/>
              <button>검색</button>
            </label>

          </div>

          <div className='cntWrapRow gatherList'>

            <GatherBoxComponent/>
            <GatherBoxComponent/>
            <GatherBoxComponent/>
            <GatherBoxComponent/>
            <GatherBoxComponent/>
            <GatherBoxComponent/>
            <GatherBoxComponent/>
            <GatherBoxComponent/>
            <GatherBoxComponent/>

          </div>
        </div>
    </MainLayout>
  )
}

export default MainPage