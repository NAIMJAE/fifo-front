import axios from 'axios';
import { RootUrl } from './RootUrl';
const rootURL = RootUrl();

/** 게시글 작성 API */
export const articleWriteApi = async (formData) => {
    const response = await axios.post(`${rootURL}/post/write`, formData ,{
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};