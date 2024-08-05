import "../../styles/user/FindPass.scss";
import { RootUrl } from "../../api/RootUrl";
import React, { useEffect, useState } from "react";
import { Box, CircularProgress, Modal } from "@mui/material";
import axios from "axios";

const FindPass = ({ findPassModalOpen, findPassHandleClose }) => {
  /**입력한 이메일 저장 state */
  const [email, setEmail] = useState("");
  /** 확인할 코드 state*/
  const [code, setCode] = useState("");
  /**인코딩된 코드(서버에 다시 전송) */
  const [encoded, setEncoded] = useState("");
  /**인증번호 트리거 */
  const [triger, setTriger] = useState(null);
  /**비밀번호 변경 트리거 */
  const [triger2, setTriger2] = useState(null);

  const [progrecss, setProgrecss] = useState(null);
  const [progrecss2, setProgrecss2] = useState(null);

  /**이메일 state저장 */
  const handlerChange = (e) => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    }
    if (e.target.name === "code") {
      setCode(e.target.value);
    }
  };

  /**이메일 인증 */
  const handlerBtn = (e) => {
    e.preventDefault();
    setProgrecss(true);
    setTimeout(() => {
      axios
        .post(`${RootUrl()}/user/email-check`, { email: email })
        .then((response) => {
          console.log(response.data);
          setEncoded(response.data);
          setProgrecss(false);
          setTriger(true);
        })
        .catch((err) => {
          console.log(err);
          setProgrecss(false);
        });
    }, 1000);
  };

  /**인증번호 확인 */
  const handlerBtn2 = (e) => {
    e.preventDefault();
    setProgrecss2(true);
    setTimeout(() => {
      axios
        .post(`${RootUrl()}/user/check-code`, {
          emailCode: code,
          encodedCode: encoded,
        })
        .then((response) => {
          console.log(response.data);
          if (response.data.result === 1) {
            /**인증 성공 */
            setTriger2(true);
            setProgrecss2(false);
            alert("인증되었습니다!");
          } else {
            /**인증 실패 */
            alert("인증번호가 맞지 않습니다.");
            setProgrecss2(false);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }, 2000);
  };
  const chnageBtnHandler = (e) => {
    e.preventDefault();
    alert("잉");
  };
  return (
    <div>
      <Modal
        className="findModal"
        open={findPassModalOpen}
        onClose={findPassHandleClose}
      >
        <Box className="modalBox">
          <span className="close-btn" onClick={findPassHandleClose}>
            <p>&times;</p>
          </span>
          <img src="../../../../images/ppoppi_in_my_house.png" alt="" />
          <h1>비밀번호 변경</h1>
          <h2>회원 가입시 입력한 이메일을 입력하시면</h2>
          <h2>이메일 인증 후 비밀번호를 변경 하실 수 있습니다.</h2>
          {triger2 == null && (
            <div className="inputArea">
              <div className="area">
                <span className="email">이메일</span>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={handlerChange}
                  placeholder="가입한 이메일을 입력해주세요."
                ></input>
              </div>
              {triger != null && triger && (
                <div className="checkCode">
                  <span className="code">인증번호</span>
                  <input
                    type="text"
                    name="code"
                    value={code}
                    onChange={handlerChange}
                    placeholder="인증번호 입력"
                  ></input>
                  <div id="progrecss">
                    {progrecss2 != null && progrecss2 && (
                      <CircularProgress className="progrecss2" size={"20px"} />
                    )}
                  </div>
                  <button onClick={handlerBtn2}>확인</button>
                </div>
              )}

              <div id="progrecss">
                {progrecss != null && progrecss && (
                  <CircularProgress className="progrecss" size={"30px"} />
                )}
              </div>
              {triger == null && (
                <span className="spanBtn">
                  <button onClick={handlerBtn}>찾기</button>
                </span>
              )}
            </div>
          )}
          {triger2 != null && triger2 && (
            <form className="changePass">
              <div className="changeDiv1">
                <span>비밀번호 변경</span>
                <input type="password"></input>
              </div>
              <div className="changeDiv2">
                <span>비밀번호 확인</span>
                <input type="password"></input>
              </div>
              <div className="btn">
                <button onClick={chnageBtnHandler}>변경하기</button>
              </div>
            </form>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default FindPass;
