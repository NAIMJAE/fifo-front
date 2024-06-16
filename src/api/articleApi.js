import axios from 'axios';
import { RootUrl } from './RootUrl';
const rootURL = RootUrl();

/** 게시글 작성 API */
export const articleWriteApi = async (formData) => {
    const response = await axios.post(`${rootURL}/post`, formData ,{
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};
/** 게시글 목록 API */
export const articleListApi = async (data) => {
    const response = await axios.post(`${rootURL}/post/list`, data);
    return response.data;
};
/** 게시글 보기 API */
export const articleViewApi = async (pno) => {
    const response = await axios.get(`${rootURL}/post`, pno);
    return response.data;
};