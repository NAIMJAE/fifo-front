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
    const response = await axios.get(`${rootURL}/post/${pno}`);
    return response.data;
};

/** 게시글 좋아요 API */
export const increaseHeartApi = async (data) => {
    const response = await axios.post(`${rootURL}/post/heart`, data);
    return response.data;
};

/** 게시글 수정 API */
export const articleModifyApi = async (formData) => {
    const response = await axios.put(`${rootURL}/post`, formData ,{
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

/** 게시글 삭제 API */
export const deletePostApi = async (pno) => {
    const response = await axios.delete(`${rootURL}/post/${pno}`);
    return response.data;
};

/** 게시글 파일 다운로드 */
export const postFileDownloadApi = async (pno) => {
    const response = await axios.get(`${rootURL}/post/download/${pno}`, {
        responseType: 'blob', // Blob 형태로 응답을 처리
      });
    return response;
};

/** 댓글 작성 API */
export const commentInsertApi = async (comment) => {
    const response = await axios.post(`${rootURL}/comment`, comment);
    return response.data;
};

/** 댓글 불러오기 API */
export const selectCommentApi = async (data) => {
    const response = await axios.get(`${rootURL}/comment`, {
        params :{
            pg: data.pg,
            pno: data.pno,
        }
    });
    return response.data;
};

/** 댓글 수정 API */
export const commentModifyApi = async (data) => {
    const response = await axios.patch(`${rootURL}/comment`, data);
    return response.data;
};

/** 댓글 삭제 API */
export const deleteCommentApi = async (cno) => {
    const response = await axios.delete(`${rootURL}/comment/${cno}`);
    return response.data;
};

/** 댓글 좋아요 */
export const commentHeartApi = async (data) => {
    console.log("ads",data)
    const response = await axios.post(`${rootURL}/comment/heart`, data);
    return response.data;
};

/** 답글 작성 API */
export const replyInsertApi = async (comment) => {
    const response = await axios.post(`${rootURL}/reply`, comment);
    return response.data;
};

/** 캘린더 조회 API */
export const selectCalendarApi = async (mooimno) => {
    const response = await axios.get(`${rootURL}/calendar/${mooimno}`);
    return response.data;
};

/** 캘린더 이벤트 생성 API */
export const createCalendarEventApi = async (newEvent) => {
    const response = axios.post(`${rootURL}/calendar/create`, newEvent)
    .then(response => response.data)
    .catch(error => { throw error });
    return response.data;
};

/** 캘린더 이벤트 수정 API */
export const modifyCalendarEventApi = (eventId, changes) => {
    const response = axios.put(`${rootURL}/calendar/${eventId}`, changes)
    .then(response => response.data)
    .catch(error => { throw error });
    return response.data;
};

/** 캘린더 이벤트 삭제 API */
export const deleteCalendarEventApi = (eventId) => {
    const response = axios.delete(`${rootURL}/calendar/${eventId}`)
    .then(response => response.data)
    .catch(error => { throw error });
    return response.data;
};