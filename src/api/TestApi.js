import axios from 'axios';
import { RootUrl } from './RootUrl';
const rootURL = RootUrl();

// 서버 연결 테스트 api
export const testApi = async () => {
    const response = await axios.post(`${rootURL}/test`);
    return response.data;
};