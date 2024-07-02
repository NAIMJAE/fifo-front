/* eslint-disable no-duplicate-case */
import React, { useEffect, useState } from "react";
import MyPageHeader from "./MyPageHeader";
import MyArtile from "./MyArtile";
import MyProject from "./MyProject";
import MyProfile from "./MyProfile";
const MyPageComponent = () => {
  const [pageState, setPageState] = useState("MyProfile");

  const renderComponent = () => {
    switch (pageState) {
      case "MyArticle":
        return <MyArtile />;
      case "MyProject":
        return <MyProject />;
      case "MyProfile":
        return <MyProfile />;
      default:
        return <MyArtile />;
    }
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
