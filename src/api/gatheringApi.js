import axios from 'axios';
import { RootUrl } from './RootUrl';
const rootURL = RootUrl();

/** 모임글 작성 API */
export const gatheringWriteApi = async (formData) => {
    const response = await axios.post(`${rootURL}/gathering`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

/** 모임글 목록 API */
export const gatheringListApi = async (data) => {
    const response = await axios.post(`${rootURL}/gatherings`, data);
    return response.data;
};

/** 모임글 보기 API */
export const gatheringViewApi = async (gathno) => {
    const response = await axios.get(`${rootURL}/gathering/${gathno}`);
    return response.data;
};

/** 모임글 수정 API */
export const gatheringModifyApi = async (formData) => {
    const response = await axios.put(`${rootURL}/gathering`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

/** 모임글 삭제 API */
export const gatheringDeleteApi = async (gathno) => {
    const response = await axios.delete(`${rootURL}/gathering/${gathno}`);
    return response.data;
};

/** 나의 모임글 목록 API */
export const myGatheringListApi = async (data) => {
    const response = await axios.post(`${rootURL}/my/gatherings`, data);
    return response.data;
};

/** 댓글 작성 API */
export const gathCommentInsertApi = async (comment) => {
    const response = await axios.post(`${rootURL}/gathcomment`, comment);
    return response.data;
};

/** 댓글 수정 API */
export const gathCommentModifyApi = async (data) => {
    const response = await axios.patch(`${rootURL}/gathcomment`, data);
    return response.data;
};

/** 댓글 삭제 API */
export const gathCommentDeleteApi = async (commentno) => {
    const response = await axios.delete(`${rootURL}/gathcomment/${commentno}`);
    return response.data;
};

/** 댓글 불러오기 API */
export const gathCommentsSelectApi = async (data) => {
    const response = await axios.get(`${rootURL}/gathcomment`, {
        params: {
            pg: data.pg,
            gathno: data.gathno,
        }
    });
    return response.data;
};

/** 모임 신청 API */
export const recruitApi = async (data) => {
    const response = await axios.post(`${rootURL}/gathRecruit`, data);
    return response.data;
};

/** 모임 신청 수락 API */
export const acceptRecruitApi = async (recruitno, state) => {
    const response = await axios.get(`${rootURL}/gathRecruit`, {
        params: {
            recruitno: recruitno,
            state: state,
        }
    });
    return response.data;
};

/** 모임 신청 모달 정보 불러오는 API */
export const applicationApi = async (userno) => {
    const response = await axios.get(`${rootURL}/userInfo/${userno}`);
    return response.data;
};

/** 모임 시작 모달 정보 불러오는 API */
export const selectGathStartApi = async (gathno) => {
    const response = await axios.get(`${rootURL}/gathStart/${gathno}`);
    return response.data;
};

/** 모임 시작 API */
export const startMooimApi = async (data) => {
    const response = await axios.post(`${rootURL}/mooim`, data);
    return response.data;
};

/** 모임 데이터 불러오기 API */
export const selectMooimApi = async (mooimno) => {
    const response = await axios.get(`${rootURL}/mooim/${mooimno}`);
    return response.data;
};

/** 모임 소개글 수정 API */
export const updateMooimintroApi = async (data) => {
    const response = await axios.put(`${rootURL}/mooimintro`, data);
    return response.data;
};

/** 모임 이미지 수정 API */
export const updateMooimthumbApi = async (formData) => {
    const response = await axios.put(`${rootURL}/mooimthumb`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

