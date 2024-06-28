import React, { useEffect, useState } from "react";
import MainLayout from "../layout/MainLayout";
import GatherBoxComponent from "../components/main/GatherBoxComponent";
import { useSelector } from "react-redux";

const MainPage = () => {
  const loginSlice = useSelector((state) => state.authSlice) || {};

  useEffect(() => {
    console.log("로그인정보 : ", loginSlice);
  }, []);

  return (
    <MainLayout>
      <div className="cntRow adBox">광고 박스</div>

      <div className="cntColumn">
        <div className="searhBox">
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

        <div className="cntWrapRow gatherList">
          <GatherBoxComponent />
          <GatherBoxComponent />
          <GatherBoxComponent />
          <GatherBoxComponent />
          <GatherBoxComponent />
        </div>
      </div>
    </MainLayout>
  );
};

export default MainPage;
