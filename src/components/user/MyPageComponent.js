/* eslint-disable no-duplicate-case */
import React, { useEffect, useState } from "react";
import MyPageHeader from "./MyPageHeader";
import MyArtile from "./MyArtile";
import DeleteAcc from "./DeleteAcc";
import MyProfile from "./MyProfile";
import { logout } from "../../slices/authSlice";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
const MyPageComponent = () => {
  const [pageState, setPageState] = useState("MyProfile");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const renderComponent = () => {
    switch (pageState) {
      case "MyArticle":
        return <MyArtile />;
      case "Logout":
        return handlerLogout();
      case "DeleteAcc":
        return <DeleteAcc setPageState={setPageState} />;
      default:
        return <MyProfile />;
    }
  };
  /**로그아웃 버튼 클릭 */
  const handlerLogout = () => {
    dispatch(logout());

    navigate(`/`);

    window.location.reload();

    alert("로그아웃 되었습니다.");
  };
  useEffect(() => {
    console.log(pageState);
  }, [pageState]);
  return (
    <div>
      <MyPageHeader setPageState={setPageState} />
      {renderComponent()}
    </div>
  );
};

export default MyPageComponent;
