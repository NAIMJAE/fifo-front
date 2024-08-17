import React, { useEffect, useState } from "react";
import "../../styles/user/DeleteAcc.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootUrl } from "../../api/RootUrl";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import { logout } from "../../slices/authSlice";
import { useNavigate } from "react-router-dom";

const DeleteAcc = ({ setPageState }) => {
  const dispatch = useDispatch();
  const authSlice = useSelector((state) => state.authSlice);
  const navigate = useNavigate();

  const userno = authSlice.userno;
  const nick = authSlice.nick;
  const email = authSlice.emial;

  const [progrecss, setProgrecss] = useState(null);

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
    skillList: [],
  });

  /**내 정보 가져오기 */
  useEffect(() => {
    axios
      .get(`${RootUrl()}/profile/select?userno=${userno}`)
      .then((response) => {
        console.log(response.data);
        setInformation(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  /**확인할 비밀번호 */
  const [pass, setPass] = useState("");

  const inputPass = (e) => {
    const { value } = e.target;
    setPass(value);
  };

  const chnageBtnHandler = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    /**이전으로*/
    if (name === "prev") {
      setPageState("MyProfile");
    }

    /**회원탙퇴 */
    if (name === "delete") {
      if (window.confirm("회원을 탈퇴하시겠습니까?")) {
        setProgrecss(true);

        setTimeout(() => {
          axios
            .post(`${RootUrl()}/profile/deleteAcc`, {
              userno: userno,
              pass: pass,
            })
            .then((response) => {
              console.log(response.data);
              if (response.data) {
                setProgrecss(false);

                dispatch(logout());

                navigate(`/`);

                window.location.reload();
                alert("탈퇴되었습니다. 안녕히가세요.");
              } else {
                alert("비밀번호를 확인해주세요");
                setPass("");
                setProgrecss(false);

                return;
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }, 2000);
      }
    }
  };

  useEffect(() => {
    console.log(pass);
  }, [pass]);
  return (
    <>
      <div id="DeleteAcc">
        <h1>회원 탈퇴</h1>
        <h2>탈퇴를 위해 비밀번호를 입력해주세요.</h2>
        <div className="account">
          <h1>탈퇴할 계정</h1>
          <h2>
            {nick} ({information.email})
          </h2>
        </div>
        <form className="FormDel">
          <div className="DelDiv1">
            <span>비밀번호 확인</span>
            <input
              type="password"
              name="pass"
              value={pass}
              onChange={inputPass}
            ></input>

            <div id="progrecss">
              {progrecss != null && progrecss && (
                <CircularProgress className="progrecss" size={"30px"} />
              )}
            </div>
          </div>

          <div className="btn">
            <button className="btn1" name="prev" onClick={chnageBtnHandler}>
              〈 이전으로
            </button>
            <button className="btn2" name="delete" onClick={chnageBtnHandler}>
              탈퇴하기
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default DeleteAcc;
