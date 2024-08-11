import React, { useEffect, useRef, useState } from "react";
import MainLayout from "../../layout/MainLayout";
import Breadcrumb from "../../components/common/main/Breadcrumb";
import "../../styles/mooim.scss";
import { Link, useLocation } from "react-router-dom";
import SkillIcon from "../../components/gathering/SkillIcon";
import {
  selectMooimApi,
  updateMooimintroApi,
  updateMooimthumbApi,
} from "../../api/gatheringApi";
import { RootUrl } from "../../api/RootUrl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { faSave } from "@fortawesome/free-regular-svg-icons";
import MemberList from "../../components/mooim/MemberList";
import Chatting from "../../components/mooim/Chatting";
import MooimCalendar from "../../components/mooim/MooimCalendar";
import Kanban from "../../components/mooim/Kanban";
import Document from "../../components/mooim/Document";

const MooimPage = () => {
  // URL에서 파라미터값 추출
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  let mooimno = queryParams.get("mooimno");

  /** 모임 데이터 */
  const [mooim, setMooim] = useState([]);

  /** 모임 진행도 막대 */
  useEffect(() => {
    const bar = document.getElementById("bar");
    const img = bar.querySelector("img");

    if (bar) {
      // 막대 너비 설정
      bar.style.width = mooim.progress + "%";

      // transition이 시작될 때 이미지를 구르게 설정
      const handleTransitionStart = () => {
        img.style.animation = "roll 0.5s linear infinite";
      };

      // transition이 끝날 때 이미지 구르기 중지
      const handleTransitionEnd = () => {
        img.style.animation = "";
      };

      bar.addEventListener("transitionstart", handleTransitionStart);
      bar.addEventListener("transitionend", handleTransitionEnd);

      // 클린업 함수에서 이벤트 리스너 제거
      return () => {
        bar.removeEventListener("transitionstart", handleTransitionStart);
        bar.removeEventListener("transitionend", handleTransitionEnd);
      };
    }
  }, [mooim]);

  /** 모임 진행도 업데이트 */
  const updateProgress = (data) => {
    console.log(data);
    setMooim((prevMooim) => ({
      ...prevMooim,
      progress: data,
    }));
  };

  /** 모임 불러오기 */
  useEffect(() => {
    const selectMooim = async () => {
      try {
        const response = await selectMooimApi(mooimno);
        console.log(response);
        setMooim(response);
        setMooimIntro({
          state: false,
          value: response.mooimintro || "우리 모임을 소개해주세요!",
        });
      } catch (error) {
        console.log(error);
        alert("모임을 찾을 수 없습니다.");
      }
    };
    selectMooim();
  }, [mooimno]);

  /** 모임 소개 변경 */
  const [mooimIntro, setMooimIntro] = useState({
    state: false,
    value: " ",
  });

  /** 모임 소개 변경 함수 */
  const modifyIntro = async () => {
    if (mooimIntro.state) {
      try {
        const response = await updateMooimintroApi({
          mooimno: mooim.mooimno,
          mooimintro: mooimIntro.value,
        });

        /** Mooim state의 intro 부분 변경 */
        setMooim((prevMooim) => ({
          ...prevMooim,
          mooimintro: mooimIntro.value,
        }));
      } catch (error) {
        console.log(error);
      }
    }
    setMooimIntro((prevState) => ({
      ...prevState,
      state: !prevState.state,
    }));
  };

  /** 모임 소개 변경 UI 활성화 useEffect */
  useEffect(() => {
    const intro = document.getElementById("intro");
    if (intro) {
      if (mooimIntro.state) {
        intro.style.border = "1px solid #7b7b7b";
        intro.readOnly = false;
      } else {
        intro.style.border = "none";
        intro.readOnly = true;
      }
    }
  }, [mooimIntro.state]);

  /** input 태그 가로 크기 내용물에 맞게 자동 조절 함수 */
  const introRef = useRef(null);

  const adjustInputWidth = () => {
    if (introRef.current) {
      introRef.current.style.width = `${introRef.current.scrollWidth}px`;
    }
  };

  useEffect(() => {
    adjustInputWidth(); // 초기 값으로 설정
  }, [mooimIntro.value]);

  // 여기까지가 크기 조절 함수

  /** 변경할 이미지 선택하는 창 띄우는 함수 */
  const changeThumb = () => {
    document.getElementById("thumbInput").click();
  };

  /** 이미지 변경 함수 */
  const saveThumb = async (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("file : ", file);
      const formData = new FormData();
      formData.append("thumbnail", file);
      formData.append("mooimno", mooimno);

      try {
        // 이미지 업로드 API
        const response = await updateMooimthumbApi(formData);

        /* 업로드된 이미지 URL을 응답에서 받아와서 상태 업데이트 */
        if (response) {
          setMooim((prevMooim) => ({
            ...prevMooim,
            thumb: response,
          }));
        }

        alert("모임 대표사진이 변경되었습니다.");
      } catch (error) {
        console.error(error);
      }
    }
  };

  /** 메뉴 변경 */
  const [mooimMenu, setMooimMenu] = useState({
    memberList: true,
    chatting: false,
    calender: false,
    kanban: false,
    document: false,
  });

  const changeMenu = (menu) => {
    setMooimMenu({
      memberList: false,
      chatting: false,
      calendar: false,
      kanban: false,
      document: false,
      [menu]: true,
    });
  };

  return (
    <MainLayout>
      <Breadcrumb crumb={"모임? / 모임인덱스?"} />
      <div className="mooimIndex">
        <div className="Info">
          <div className="mooimInfo">
            {mooim.thumb && mooim.thumb.trim() ? (
              <img
                src={`${RootUrl()}/uploads/mooim/${mooim.mooimno}/thumb/${
                  mooim.thumb
                }`}
                alt="thumb"
              />
            ) : (
              <img src="../../images/sample/ppoppi_angry.png" alt="sample" />
            )}
            <FontAwesomeIcon
              icon={faPencil}
              size="lg"
              color="#7b7b7b"
              onClick={changeThumb}
            />
            <input
              type="file"
              id="thumbInput"
              accept="image/*"
              style={{ display: "none" }}
              onChange={saveThumb}
            />
            <div>
              <h1>
                {mooim.mooimtitle}
                <span>
                  [
                  {mooim.mooimstate === 1
                    ? "진행중"
                    : mooim.mooimstate === 2
                    ? "완료"
                    : ""}
                  ]
                </span>
              </h1>

              <label htmlFor="">
                <input
                  type="text"
                  id="intro"
                  readOnly
                  value={mooimIntro.value}
                  onChange={(e) => {
                    setMooimIntro({ ...mooimIntro, value: e.target.value });
                    adjustInputWidth();
                  }}
                  ref={introRef}
                  style={{ width: `${mooimIntro.value.length}ch` }}
                />

                {mooimIntro.state ? (
                  <FontAwesomeIcon
                    onClick={modifyIntro}
                    icon={faSave}
                    size="lg"
                    color="#7b7b7b"
                  />
                ) : (
                  <FontAwesomeIcon
                    onClick={modifyIntro}
                    icon={faPencil}
                    size="lg"
                    color="#7b7b7b"
                  />
                )}
              </label>

              <div>
                <h2>
                  {mooim.mooimcate === 1
                    ? "프로젝트"
                    : mooim.mooimcate === 2
                    ? "스터디"
                    : mooim.mooimcate === 3
                    ? "모임"
                    : ""}
                </h2>
              </div>
              <div>
                <h3>{mooim.mooimstart} ~ </h3>
              </div>
            </div>
          </div>
          <div className="mooimProgress">
            <div>
              <div id="bar">
                {mooim.progress}
                <img src="../../../../images/mooim/ppoppi_bar.png" alt="" />
              </div>
            </div>
          </div>
        </div>
        <div className="function">
          <button
            className="memberList"
            onClick={() => changeMenu("memberList")}
          >
            정보
          </button>
          <button className="chatting" onClick={() => changeMenu("chatting")}>
            채팅
          </button>
          <button className="calendar" onClick={() => changeMenu("calendar")}>
            캘린더
          </button>
          <button className="kanban" onClick={() => changeMenu("kanban")}>
            칸반
          </button>
          <button className="document" onClick={() => changeMenu("document")}>
            문서
          </button>
        </div>

        <div className="components">
          {mooimMenu.memberList && <MemberList mooim={mooim} />}
          {mooimMenu.chatting && <Chatting mooim={mooim} />}
          {mooimMenu.calendar && <MooimCalendar mooimno={mooimno} />}
          {mooimMenu.kanban && (
            <Kanban
              mooimno={mooimno}
              memberList={mooim.memberList}
              updateProgress={updateProgress}
            />
          )}
          {mooimMenu.document && <Document mooimno={mooimno} />}
        </div>
      </div>
    </MainLayout>
  );
};

export default MooimPage;
