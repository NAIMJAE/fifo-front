import axios from 'axios';
import { RootUrl } from './RootUrl';
const rootURL = RootUrl();

/** 채팅 불러오기 API */
export const selectChatApi = async (mooimno) => {
    const response = await axios.get(`${rootURL}/chatting/${mooimno}`);
    return response.data;
};

/** 채팅 보내기 API */
export const sendMsgApi = async (data) => {
    const response = await axios.post(`${rootURL}/chatting`, data);
    return response.data;
};

/** 첨부파일 보내기 API */
export const sendFileApi = async (formData) => {
    const response = await axios.put(`${rootURL}/chatting`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response;
};

/** 첨부파일 다운로드 API */
export const DownloadFileApi = async (msgData) => {
    const response = await axios.post(`${rootURL}/chatting/download`, msgData, {
        responseType: 'blob', // Blob 형태로 응답을 처리
      });
    return response;
};