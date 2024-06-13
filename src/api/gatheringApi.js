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