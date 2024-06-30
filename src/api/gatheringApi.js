import axios from 'axios';
import { RootUrl } from './RootUrl';
const rootURL = RootUrl();

/** 모임글 작성 API */
export const gatheringWriteApi = async (formData) => {
    const response = await axios.post(`${rootURL}/gathering`, formData ,{
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};
/** 모임글 목록 API */
export const gatheringListApi = async (data) => {
    console.log("글 조회 전송!")
    const response = await axios.post(`${rootURL}/gatherings`, data);
    return response.data;
};
/** 모임글 보기 API */
export const gatheringViewApi = async (gathno) => {
    const response = await axios.get(`${rootURL}/gathering/${gathno}`);
    return response.data;
};
/** 댓글 작성 API */
export const gathCommentInsertApi = async (comment) => {
    const response = await axios.post(`${rootURL}/gathcomment`, comment);
    return response.data;
};

/** 댓글 불러오기 API */
export const gathCommentsSelectApi = async (gathno) => {
    const response = await axios.get(`${rootURL}/gathcomment/${gathno}`);
    return response.data;
};