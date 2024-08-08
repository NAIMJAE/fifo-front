import { Box, CircularProgress, Modal } from "@mui/material";
import "../../styles/user/FindId.scss";
import React, { useState } from "react";
import axios from "axios";
import { RootUrl } from "../../api/RootUrl";

const FindId = ({ findIdModalOpen, findIdHandleClose, setFindIdModalOpen }) => {
  /**정보 저장 state */
  const [user, setUser] = useState({
    name: "",
    hp: "",
  });

  /**progress 상태 state */
  const [progrecss, setProgress] = useState(null);

  /**찾은 이메일 저장state */
  const [findEmail, setFindEmail] = useState("");
  const [triger, setTriger] = useState(null);
  /**정보 입력 onCange 함수 */
  const onChangeHandler = (e) => {
    e.preventDefault();
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  /**찾기 버튼 */
  const handlerBtn = (e) => {
    e.preventDefault();

    setProgress(true);

    setTimeout(() => {
      axios
        .post(`${RootUrl()}/user/findId`, user)
        .then((response) => {
          setFindEmail(response.data);
          setProgress(false);
          setTriger(true);
        })
        .catch((err) => {
          alert("일치하는 유저가 없습니다.");
          setProgress(false);
          setUser({
            name: "",
            hp: "",
          });
        });
    }, 2000);
  };

  const handlerBtn2 = (e) => {
    e.preventDefault();
    setFindIdModalOpen(false);
  };
  return (
    <div>
      <Modal
        className="findModal"
        open={findIdModalOpen}
        onClose={findIdHandleClose}
      >
        <Box className="modalBox">
          <span className="close-btn" onClick={findIdHandleClose}>
            <p>&times;</p>
          </span>
          <img src="../../../../images/ppoppi_in_my_house.png" alt="" />
          <h1>이메일 찾기</h1>
          <h2>회원 가입시 입력한 이름과 휴대폰을 입력하시면</h2>
          <h2>해당 이름과 휴대폰으로 가입한 이메일을 찾아드립니다.</h2>
          {triger == null && (
            <div className="inputArea">
              <div className="area name">
                <span className="name">이름</span>
                <input
                  type="text"
                  value={user.name}
                  name="name"
                  onChange={onChangeHandler}
                  placeholder="가입한 이름을 입력해주세요."
                ></input>
              </div>

              <div className="area hp">
                <span className="hp">휴대폰</span>
                <input
                  type="text"
                  value={user.hp}
                  name="hp"
                  onChange={onChangeHandler}
                  placeholder=" - 을 포함하여 입력해주세요."
                ></input>
              </div>
              <div id="progrecss">
                {progrecss != null && progrecss && (
                  <CircularProgress className="progrecss" size={"30px"} />
                )}
              </div>

              <span className="spanBtn">
                <button onClick={handlerBtn}>찾기</button>
              </span>
            </div>
          )}
          {triger != null && triger && (
            <div className="findDiv">
              <h1>{user.name}님이 가입하신 이메일은</h1>
              <h2>{findEmail}</h2>
              <h3>입니다.</h3>

              <button onClick={handlerBtn2}>로그인하기</button>
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default FindId;
