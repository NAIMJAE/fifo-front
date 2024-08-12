import React from "react";
import { RootUrl } from "./RootUrl";
import axios from "axios";

/** 파일 업로드 */
export const uploadFile = async (file) => {
  const body = new FormData();
  body.append("file", file);

  try {
    const response = await axios.post(`${RootUrl()}/page/upload`, body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    const sName = response.data; // 서버가 반환한 이미지 URL
    console.log("파일 전송 성공 sName : ", sName);
    const src = `${RootUrl()}/uploads/${sName}`;
    console.log("file 경로 : ", src);
    return src;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};

/**현재 존재하는 모임의 문서들 가져오기 */
export const getDocumentSection = async (mooimno) => {
  try {
    const response = await axios.get(
      `${RootUrl()}/document/selectDocument?mooimno=${mooimno}`
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }

  //**db에서 선택한 문서 가져오기 */
};
