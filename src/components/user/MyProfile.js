import React, { useEffect, useRef, useState } from "react";
import "../../styles/user/myProfile.scss";
import { Button } from "@mui/material";
import { RootUrl } from "../../api/RootUrl";
import { useSelector } from "react-redux";
import SkillIcon from "../gathering/SkillIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleXmark,
  faFloppyDisk,
  faPencil,
  faPlus,
  faPlusCircle,
  faUserPen,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { globalPath } from "../../globalPaths";
import moment from "moment/moment";
import axios from "axios";
import { differenceInYears } from "date-fns";

const MyProfile = () => {
  const authSlice = useSelector((state) => state.authSlice);

  const userno = authSlice.userno;

  const url = globalPath.path;

  /** 유저 정보 */
  const [information, setInformation] = useState({
    name: "",
    nick: "",
    email: "",
    hp: "",
    region: "",
    birth: "",
    gender: "",
    rdate: "",
    languagename: [],
    levels: [],
  });

  useEffect(() => {
    console.log(information);
  }, [information]);
  /**나이 계산하기 */
  const calcAge = () => {
    const date = new Date();
    return differenceInYears(date, information.birth);
  };
  const age = calcAge();

  /**유저 정보 가져오기 */
  useEffect(() => {
    axios
      .get(`${url}/user/getProfile?userno=${userno}`)
      .then((response) => {
        setInformation(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  /** input 입력 활성화 상태 관리 useState */
  const [inputModify, setInputModify] = useState({
    name: false,
    nick: false,
    email: false,
    hp: false,
    region: false,
    skill: false,
  });

  /**스킬 리스트 가져오기 */
  const [skillList, setSkillList] = useState([]);
  const [skillSelect, setSkillSelect] = useState([]);

  useEffect(() => {
    axios
      .get(`${url}/user/language`)
      .then((response) => {
        console.log(response.data);
        setSkillList(response.data.map((language) => language.languagename));
        setSkillSelect(
          response.data.map((language, index) => ({
            id: index,
            state: false,
            languagename: language.languagename,
          }))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, [inputModify.skill]);

  const fileInputRef = useRef(null);
  /** 프로필 사진 수정 */
  const modifythumb = () => {
    fileInputRef.current.click();
  };

  /** 기본 정보 편집 input 활성 */
  const changeMyInfo = (e) => {
    const targetId = e.currentTarget.getAttribute("data-target-id");
    const input = document.getElementById(targetId);

    input.style.border = "1px solid #111";
    input.readOnly = false;
    setInputModify((prev) => ({ ...prev, [targetId]: true }));
  };

  /** 기본 정보 수정 */
  const inputMyInfo = (e) => {
    const { name, value } = e.target;
    setInformation((prev) => ({ ...prev, [name]: value }));
    console.log("information : ", information);

    // 유효성 검사 넣어주세요
  };

  /** 기본 정보 수정 저장 */
  const saveMyinfo = async (e) => {
    const targetId = e.currentTarget.getAttribute("data-target-id");
    const input = document.getElementById(targetId);

    try {
      // 서버에 수정된 정보 저장하고 오면 됨
      // const response = await Api();
      // if response가 수정 성공이면
      input.style.border = "1px solid white";
      input.readOnly = true;
      setInputModify((prev) => ({ ...prev, [targetId]: false }));
    } catch (error) {
      console.log(error);
    }
  };

  /** 내 스킬 편집 input 활성화 */
  const changeMySkill = (e) => {
    const targetId = e.currentTarget.getAttribute("data-target-id");
    setInputModify((prev) => ({ ...prev, [targetId]: true }));
  };

  /** 내 스킬 편집 */
  const iconClick = (e, index, skill) => {
    e.preventDefault();
    console.log(skill);

    setSkillSelect((prev) =>
      prev.map((lan) =>
        lan.id === index ? { ...lan, state: !lan.state } : lan
      )
    );
  };
  const clickAdd = (e) => {
    e.preventDefault();
  };
  const clickCancle = (e) => {
    e.preventDefault();

    setInputModify((prev) => ({
      ...prev,
      skill: false,
    }));
  };
  /** 내 스킬 편집 저장 */

  return (
    <>
      <main>
        <div id="contentArea" style={{ marginTop: "20px" }}>
          <div className="cntColumn myProfile">
            <h1>내 정보 수정</h1>

            <h2>기본 정보</h2>

            <div className="basicInfo">
              <div className="myThumb">
                <img src="../../images/ppoppi.png" alt="" />

                <label htmlFor="thumb">
                  <FontAwesomeIcon
                    icon={faPencil}
                    size="lg"
                    color="#FF0000"
                    onClick={modifythumb}
                  />
                </label>
                <input type="file" id="thumb" ref={fileInputRef} />
              </div>

              <div className="myInfo">
                <label htmlFor="">
                  <h2>{information.name}</h2>
                  <h4>{information.gender === "M" ? "남자" : "여자"}</h4>
                  <h4>{age}세</h4>
                  <h5>{moment(information.rdate).format("YYYY-MM-DD")} 가입</h5>
                </label>

                <label htmlFor="">
                  <h3>닉네임 : </h3>
                  <input
                    type="text"
                    id="nick"
                    name="nick"
                    value={information.nick}
                    onChange={(e) => inputMyInfo(e)}
                    readOnly
                  />
                  {inputModify.nick ? (
                    <FontAwesomeIcon
                      icon={faFloppyDisk}
                      size="lg"
                      color="#7b7b7b"
                      data-target-id="nick"
                      onClick={(e) => saveMyinfo(e)}
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faPencil}
                      size="lg"
                      color="#7b7b7b"
                      data-target-id="nick"
                      onClick={(e) => changeMyInfo(e)}
                    />
                  )}
                </label>

                <label htmlFor="">
                  <h3>이메일 : </h3>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={information.email}
                    onChange={(e) => inputMyInfo(e)}
                    readOnly
                  />
                  {inputModify.email ? (
                    <FontAwesomeIcon
                      icon={faFloppyDisk}
                      size="lg"
                      color="#7b7b7b"
                      data-target-id="email"
                      onClick={(e) => saveMyinfo(e)}
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faPencil}
                      size="lg"
                      color="#7b7b7b"
                      data-target-id="email"
                      onClick={(e) => changeMyInfo(e)}
                    />
                  )}
                </label>

                <label htmlFor="">
                  <h3>연락처 : </h3>
                  <input
                    type="text"
                    id="hp"
                    name="hp"
                    value={information.hp}
                    onChange={(e) => inputMyInfo(e)}
                    readOnly
                  />
                  {inputModify.hp ? (
                    <FontAwesomeIcon
                      icon={faFloppyDisk}
                      size="lg"
                      color="#7b7b7b"
                      data-target-id="hp"
                      onClick={(e) => saveMyinfo(e)}
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faPencil}
                      size="lg"
                      color="#7b7b7b"
                      data-target-id="hp"
                      onClick={(e) => changeMyInfo(e)}
                    />
                  )}
                </label>

                <label htmlFor="">
                  <h3>활동지역 : </h3>
                  <input
                    type="text"
                    id="region"
                    name="region"
                    value={information.region}
                    onChange={(e) => inputMyInfo(e)}
                    readOnly
                  />
                  {inputModify.region ? (
                    <FontAwesomeIcon
                      icon={faFloppyDisk}
                      size="lg"
                      color="#7b7b7b"
                      data-target-id="region"
                      onClick={(e) => saveMyinfo(e)}
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faPencil}
                      size="lg"
                      color="#7b7b7b"
                      data-target-id="region"
                      onClick={(e) => changeMyInfo(e)}
                    />
                  )}
                </label>
              </div>
            </div>

            <h2>내 스킬</h2>
            <div className="mySkill">
              <div className="inputSkill">
                {inputModify.skill ? (
                  <div className="skillIconList">
                    {skillList.map((skill, index) => (
                      <div
                        className={
                          skillSelect.find(
                            (lan) => lan.id === index && lan.state
                          )
                            ? "skillIconsClick"
                            : "skillIcons"
                        }
                        key={index}
                        onClick={(e) => iconClick(e, index, skill)}
                      >
                        <SkillIcon
                          className="skillIcon"
                          skill={skill}
                          classType={"bigSkillImg"}
                        />
                        <span className="skillName">{skill}</span>
                      </div>
                    ))}
                    <br />
                    <span>
                      <button className="btn add-btn" onClick={clickAdd}>
                        추가
                      </button>
                      <button className="btn cancel-btn" onClick={clickCancle}>
                        취소
                      </button>
                    </span>
                  </div>
                ) : (
                  <label
                    htmlFor=""
                    data-target-id="skill"
                    onClick={(e) => changeMySkill(e)}
                  >
                    <p>내 기술 스택 추가 {"  "}</p>

                    <FontAwesomeIcon
                      icon={faPlusCircle}
                      size="lg"
                      color="#7b7b7b"
                    />
                  </label>
                )}
              </div>

              <div className="skillList">
                {information.languagename &&
                  information.languagename.map((skill, index) => (
                    <div>
                      <SkillIcon skill={skill} classType={"bigSkillImg"} />
                      <p>{skill}</p>
                      <p>Level {information.levels[index]}</p>
                    </div>
                  ))}
              </div>
              <p className="explainLevel">
                내 기술 스텍을 클릭하여 레벨을 설정해주세요
              </p>
            </div>
            <h2>내 경력</h2>
          </div>
        </div>
      </main>
    </>
  );
};

export default MyProfile;
