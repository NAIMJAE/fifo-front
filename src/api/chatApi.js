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