import React, { useEffect, useRef, useState } from "react";
import "../../styles/user/myProfile.scss";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
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
import { differenceInYears, set } from "date-fns";

const MyProfile = () => {
  // 스킬 추가 트리거
  const [skillTriger, SetSkillTriger] = useState(false);

  const authSlice = useSelector((state) => state.authSlice);

  const userno = authSlice.userno;

  const url = RootUrl();

  /** 유저 정보 */
  const [information, setInformation] = useState({
    name: "",
    nick: "",
    email: "",
    hp: "",
    birth: "",
    gender: "",
    rdate: "",
    thumb: "",
    languagename: [],
    levels: [],
  });

  /**유저 지역 정보 */
  const [userRegion, setUserRegion] = useState([]);

  /**유저 지역 정보 가져오기 */
  useEffect(() => {
    axios
      .get(`${url}/profile/selectMyRegion?userno=${authSlice.userno}`)
      .then((response) => {
        console.log(response.data);
        setUserRegion(response.data.map((data) => data.regionname));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [skillTriger]);

  /**나이 계산하기 */
  const calcAge = () => {
    const date = new Date();
    return differenceInYears(date, information.birth);
  };
  const age = calcAge();

  /**내 정보 가져오기 */
  useEffect(() => {
    axios
      .get(`${url}/profile/select?userno=${userno}`)
      .then((response) => {
        setInformation(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [skillTriger]);

  /** input 입력 활성화 상태 관리 useState */
  const [inputModify, setInputModify] = useState({
    name: false,
    nick: false,
    email: false,
    hp: false,
    region: false,
    skill: false,
    experience: false,
  });

  /**스킬 리스트 가져오기 */
  const [skillList, setSkillList] = useState([]);
  const [skillSelect, setSkillSelect] = useState([]);

  useEffect(() => {
    axios
      .get(`${url}/profile/distinctLanguage?userno=${authSlice.userno}`)
      .then((response) => {
        console.log(response.data);
        setSkillList(response.data);
        setSkillSelect(
          response.data.map((language, index) => ({
            id: index,
            state: false,
            languagename: language,
          }))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, [skillTriger]);

  const fileInputRef = useRef(null);

  /** 프로필 사진 수정 */
  const modifythumb = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  /** 프로필 사진 수정 */
  const handlerFileChange = async (e) => {
    const file = e.target.files[0];
    console.log(file);
    if (file) {
      console.log("들어옴");
      const fileName = file.name;
      const fileData = new FormData();

      fileData.append("file", file);
      /**백에 파일 업로드 로직 */
      try {
        const response = await axios.post(
          `${url}/profile/upload?userno=${authSlice.userno}`,
          fileData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (response.data) {
          alert("프로필 사진이 업데이트 되었습니다.");
          SetSkillTriger(!skillTriger);
        } else {
          alert("프로필 사진 업데이트에 실패했습니다.");
        }
      } catch (err) {
        console.error("오류 발생", err);
        alert("사진 업데이트 중 오류가 발생했습니다.");
      }
    }
  };
  /** 기본 정보 편집 input 활성 */
  const changeMyInfo = (e) => {
    const targetId = e.currentTarget.getAttribute("data-target-id");
    const input = document.getElementById(targetId);

    input.style.border = "1px solid #111";
    input.readOnly = false;
    setInputModify((prev) => ({ ...prev, [targetId]: true }));
  };

  /**지역들을 담을 state */
  const [regionOptions, setRegionOptions] = useState([]);

  /**지역들 가져오기 */
  useEffect(() => {
    axios
      .get(`${url}/profile/selectRegion`)
      .then((response) => {
        console.log(response.data);
        const sortedData = response.data.sort((a, b) => a.rno - b.rno);
        setRegionOptions(sortedData.map((region) => region.regionname));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  /**내 지역 checkBox 활성 */
  const changeMyRegion = (e) => {
    const targetId = e.currentTarget.getAttribute("data-target-id");
    const input = document.getElementById(targetId);

    // div 생성
    const div = document.createElement("div");
    div.id = targetId + "Div";

    regionOptions.forEach((optionText) => {
      const label = document.createElement("label");
      label.classList.add("regionLabel");

      const checkbox = document.createElement("input");

      checkbox.type = "checkbox";
      checkbox.value = optionText;
      checkbox.classList.add("region-checkbox");

      userRegion.forEach((users) => {
        if (users === checkbox.value) {
          checkbox.checked = users;
        }
      });

      label.appendChild(checkbox);
      label.appendChild(document.createTextNode(optionText));

      div.appendChild(label);
    });

    // input을 div로 교체
    input.parentNode.replaceChild(div, input);

    setInputModify((prev) => ({ ...prev, [targetId]: true }));
  };

  // 선택한 지역 배열에 넣기
  const [regionArr, setRegionArr] = useState([]);

  const checkRegion = (e) => {};

  useEffect(() => {
    console.log(regionArr);
  }, [regionArr]);

  /** 내 지역 정보 수정 저장 */
  const saveMyRegion = async (e) => {
    const targetId = e.currentTarget.getAttribute("data-target-id");
    const option = document.getElementsByClassName(targetId + "-checkbox");

    Array.from(option).forEach((each) => {
      if (each.checked) {
        setRegionArr((prev) => [...prev, each.value]);
      }
    });

    const response = axios.post(
      `${url}/profile/updateRegion?userno=${authSlice.userno}`,
      regionArr
    );
    console.log(response.data);
    if (response.data) {
      SetSkillTriger(!skillTriger);

      // input 생성
      const input = document.createElement("input");
      input.type = "text";
      input.id = targetId;
      input.readOnly = true;
      input.value = userRegion;

      //div를 다시 input으로 교체
      const div = document.getElementById(targetId + "Div");
      div.parentNode.replaceChild(input, div);

      // 아이콘도 다시 연필
      setInputModify((prev) => ({ ...prev, [targetId]: false }));

      alert("수정되었습니다.");
    }
    console.log(targetId + "-checkbox");
  };

  /** 기본 정보 수정 */
  const inputMyInfo = (e) => {
    const { name, value } = e.target;
    setInformation((prev) => ({ ...prev, [name]: value }));
    console.log("information : ", information);

    console.log(name);
    console.log(value);

    if (name === "nick") {
      isValidNick(value);
    }
    if (name === "email") {
      isValidEmail(value);
    }
    if (name === "hp") {
      isValidHp(value);
    }
  };

  /**유효성 검사 */
  const [emailValid, setEmailValid] = useState(null);
  const [nickValid, setNickValid] = useState(null);
  const [hpValid, setHpValid] = useState(null);

  /**이메일 검사 함수 */
  const isValidEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailValid(emailPattern.test(email));
  };

  /**닉네임 검사 함수 */
  const isValidNick = (nick) => {
    const nickPattern =
      /^(?=.*[가-힣]{2,})(?!.*[^\가-힣a-zA-Z0-9]).{2,10}$|^(?=.*[a-zA-Z]{4,})(?!.*[^\가-힣a-zA-Z0-9]).{4,10}$/;
    setNickValid(nickPattern.test(nick));
    console.log(nickValid);
  };
  /**연락처 검사 함수 */
  const isValidHp = (hp) => {
    const hpPattern = /^\d{3}-\d{3,4}-\d{4}$/;
    setHpValid(hpPattern.test(hp));
  };

  /**적기 시작할 때 유효성검사 */
  const handlerNickInput = () => {
    setNickValid(false);
    //setDuplicateNick(null);
  };
  const handlerEmailInput = () => {
    setEmailValid(false);
    //setDuplicateEmial(null);
  };
  const handlerHpInput = () => {
    setHpValid(false);
  };

  /** 기본 정보 수정 저장 */
  const saveMyinfo = async (e) => {
    const targetId = e.currentTarget.getAttribute("data-target-id");
    const input = document.getElementById(targetId);

    console.log(input.value);
    console.log(targetId);

    let isValid = true;

    if (targetId === "nick" && nickValid != null && !nickValid) {
      alert("올바르지 않은 닉네임입니다.");
      isValid = false;
      return;
    }
    if (targetId === "email" && emailValid != null && !emailValid) {
      alert("올바르지 않은 이메일입니다.");
      isValid = false;
      return;
    }
    if (targetId === "hp" && hpValid != null && !hpValid) {
      alert("올바르지 않은 휴대폰입니다.");
      isValid = false;
      return;
    }
    if (isValid) {
      try {
        const response = await axios.post(
          `${url}/profile/update?userno=${authSlice.userno}`,
          {
            type: targetId,
            information: input.value,
          }
        );

        if (response.data) {
          SetSkillTriger(!skillTriger);
          input.style.border = "1px solid white";
          input.readOnly = true;
          alert("수정되었습니다.");
        } else {
          alert("수정에 실패했습니다.");
        }

        setInputModify((prev) => ({ ...prev, [targetId]: false }));
      } catch (error) {
        console.log(error);
      }
    }
  };

  /** 내 스킬 편집 input 활성화 */
  const changeMySkill = (e) => {
    const targetId = e.currentTarget.getAttribute("data-target-id");
    setInputModify((prev) => ({ ...prev, [targetId]: true }));
  };

  /** 내 스킬 편집 */
  const iconClick = (e, index) => {
    e.preventDefault();

    setSkillSelect((prev) =>
      prev.map((lan) =>
        lan.id === index ? { ...lan, state: !lan.state } : lan
      )
    );
  };

  /**추가 클릭시 선택한 스킬 추가 */
  const clickAdd = (e) => {
    e.preventDefault();

    axios
      .post(`${url}/profile/addSkill?userno=${authSlice.userno}`, inputSkill)
      .then((response) => {
        console.log(response.data);
        alert("추가 되었습니다.");
        SetSkillTriger(!skillTriger);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  /**스킬 추가 취소버튼 */
  const clickCancle = (e) => {
    e.preventDefault();

    setInputModify((prev) => ({
      ...prev,
      skill: false,
    }));
  };

  /** 내 스킬 추가 저장 */
  const [inputSkill, setInputSkill] = useState([]);

  /**선택한 스킬 추가하기 */
  useEffect(() => {
    const selectedSkill = skillSelect
      .filter((skill) => skill.state)
      .map((skill) => skill.languagename);

    setInputSkill(selectedSkill);
  }, [skillSelect]);

  useEffect(() => {
    console.log(inputSkill);
  }, [inputSkill]);

  /**경력 기입 */
  const [exe, setExe] = useState({
    userno: `${authSlice.userno}`,
    period: "1년 이하",
    job: "백엔드 개발",
    skill: "",
  });
  const [job, setJob] = useState("");

  /** 내 경력 편집 input 활성화 */
  const changeMyExe = (e) => {
    const targetId = e.currentTarget.getAttribute("data-target-id");
    setInputModify((prev) => ({ ...prev, [targetId]: true }));
  };

  /**선택시 state에 넣기 */
  const exeHandler = (e) => {
    const { name, value, checked } = e.target;
    console.log(checked);

    if (name === "skill") {
      const checkbox = document.getElementsByName(name);
      let selected = [];
      checkbox.forEach((checkbox) => {
        if (checkbox.checked) {
          selected.push(checkbox.value);
        }
      });
      const selectedSkillsString = selected.join(",");
      setExe((prev) => ({
        ...prev,
        [name]: selectedSkillsString,
      }));
    } else {
      setExe((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  /**직무 종류 가져오기 */
  useEffect(() => {
    axios
      .post(`${url}/profile/selectJob`)
      .then((response) => {
        console.log(response.data);
        const sortedJob = response.data.sort((a, b) => a.rno - b.rno);
        setJob(sortedJob.map((jobs) => jobs.jobname));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  /**추가 클릭시 선택한 경력 추가 */
  const clickAddExe = (e) => {
    e.preventDefault();

    axios
      .post(`${url}/profile/addExe`, exe)
      .then((response) => {
        console.log(response.data);
        alert("추가 되었습니다.");
        SetSkillTriger(!skillTriger);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  /**내 경력 가져오기 */
  const [myExp, setMyExp] = useState({
    job: "",
    skill: "",
    period: "",
  });
  useState(() => {
    axios
      .get(`${url}/profile/selectMyExp?userno=${authSlice.userno}`)
      .then((response) => {
        console.log(response.data);
        // List형태의 response.data의 첫 번째 항목 추출
        const [firstItem] = response.data;
        setMyExp({
          job: firstItem.job,
          skill: firstItem.skill,
          period: firstItem.period,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    console.log(myExp);
  }, [myExp]);
  const clickCancleExe = (e) => {
    e.preventDefault();

    setInputModify((prev) => ({
      ...prev,
      experience: false,
    }));
  };

  return (
    <>
      <main>
        <div id="contentArea" style={{ marginTop: "20px" }}>
          <div className="cntColumn myProfile">
            <h1>내 정보 수정</h1>

            <h2>기본 정보</h2>

            <div className="basicInfo">
              <div className="myThumb">
                <img src={`${url}/uploads/user/${information.thumb}`} alt="" />

                <label htmlFor="thumb">
                  <FontAwesomeIcon
                    icon={faPencil}
                    size="lg"
                    color="#FF0000"
                    onClick={modifythumb}
                  />
                </label>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handlerFileChange}
                />
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
                    onInput={handlerNickInput}
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
                {nickValid != null && !nickValid && (
                  <span className="validContext">
                    올바르지 않은 닉네임입니다.
                  </span>
                )}
                <label htmlFor="">
                  <h3>이메일 : </h3>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={information.email}
                    onInput={handlerEmailInput}
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
                {emailValid != null && !emailValid && (
                  <span className="validContext">
                    올바르지 않은 이메일입니다.
                  </span>
                )}
                <label htmlFor="">
                  <h3>연락처 : </h3>
                  <input
                    type="text"
                    id="hp"
                    name="hp"
                    value={information.hp}
                    onInput={handlerHpInput}
                    onChange={(e) => inputMyInfo(e)}
                    placeholder="정보를 입력해주세요"
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
                {hpValid != null && !hpValid && (
                  <span className="validContext">
                    -를 포함하여 작성해주세요.
                  </span>
                )}
                <label htmlFor="">
                  <h3>활동지역 : </h3>
                  <input
                    type="textarea"
                    id="region"
                    name="region"
                    value={userRegion}
                    onChange={(e) => inputMyInfo(e)}
                    placeholder="정보를 입력해주세요"
                    readOnly
                  />
                  {inputModify.region ? (
                    <FontAwesomeIcon
                      icon={faFloppyDisk}
                      size="lg"
                      color="#7b7b7b"
                      data-target-id="region"
                      onClick={(e) => saveMyRegion(e)}
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faPencil}
                      size="lg"
                      color="#7b7b7b"
                      data-target-id="region"
                      onClick={(e) => changeMyRegion(e)}
                    />
                  )}
                </label>
              </div>
            </div>

            <h2>나의 스킬</h2>
            <div className="mySkill">
              <div className="inputSkill">
                {inputModify.skill ? (
                  <div className="skillIconList">
                    {skillList
                      .filter(
                        (selected) =>
                          !information.languagename.includes(selected)
                      )
                      .map((skill, index) => (
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
            </div>
            <h2>나의 경력</h2>
            <div className="myExperience">
              <div className="myExp">
                <div className="period">
                  <p>{myExp.period}</p>
                </div>
                <div className="jobAndSkill">
                  <h1>{myExp.job}</h1>
                  <h2>{myExp.skill}</h2>
                </div>
              </div>
              {inputModify.experience ? (
                <div className="jobForm">
                  <div className="periodAndJob">
                    <div className="period">
                      <span>경력</span>
                      <select name="period" onChange={exeHandler}>
                        <option value={"1년 이하"}>1년 이하</option>
                        <option value={"1년~3년"}>1년~3년</option>
                        <option value={"3~4년"}>3~4년</option>
                        <option value={"5년 이상"}>5년 이상</option>
                        <option value={"10년 이상"}>10년 이상</option>
                      </select>
                    </div>

                    <div className="job">
                      <span>직무</span>
                      <select name="job" onChange={exeHandler}>
                        {job.map((option, index) => (
                          <option key={index} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="skill">
                    <p>사용 기술스택</p>
                    {skillList.map((skill, index) => (
                      <FormControlLabel
                        name="skill"
                        key={index}
                        control={<Checkbox />}
                        label={skill}
                        value={skill}
                        onChange={exeHandler}
                      />
                    ))}
                  </div>
                  <div className="btnDiv">
                    <button className="btn add-btn" onClick={clickAddExe}>
                      추가
                    </button>
                    <button className="btn cancel-btn" onClick={clickCancleExe}>
                      취소
                    </button>
                  </div>
                </div>
              ) : (
                <label onClick={changeMyExe} data-target-id="experience">
                  <p>내 경력 수정</p>
                  <FontAwesomeIcon
                    icon={faPlusCircle}
                    size="lg"
                    color="#7b7b7b"
                  />
                </label>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default MyProfile;
