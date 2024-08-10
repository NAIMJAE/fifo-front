import axios from 'axios';
import { RootUrl } from './RootUrl';
const rootURL = RootUrl();

/** 칸반 조회 API */
export const selectKanbanApi = async (mooimno) => {
    const response = await axios.get(`${rootURL}/kanban/${mooimno}`);
    return response.data;
};

/** 칸반 아이템 생성 API */
export const insertItemApi = async (data) => {
    const response = await axios.post(`${rootURL}/kanban`, data);
    return response.data;
};

/** 칸반 아이템 내용 수정 API */
export const updatedItemApi = async (data) => {
    const response = await axios.put(`${rootURL}/kanban`, data);
    return response.data;
};