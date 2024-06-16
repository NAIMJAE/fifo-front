import { v4 as uuidv4 } from 'uuid';

/**
    < 설명서 >
    * changeImages 함수가 하는 일 *
    - changeImages 를 import해서 부르면 사용 가능
    - changeImages의 파라미터로 Editor의 contents를 주면 됨
    - base64 이미지를 file객체로 변환 / 랜덤 난수로 이미지가 저장될 이름 생성
    - 파일객체 배열(imageList)과 원래 base64문자열(srcPull)을 resultData로 반환 함

    * 리턴 받은 후 해야할 것 *
    - resultData의 imageList는 formData에 넣어주면 됨
    - resultData의 imageList의 name(랜덤 난수로 생성된 이름)을 꺼내서
      resultData의 srcPull를 이용해 <img src="base64"> 이미지 태그의 base64 부분을 추출해
      '이미지를 저장할 주소 + 랜덤이름'으로 치환하면 서버에 넘길 contents 생성 완료
    - 마지막으로 contents를 formData에 추가

    - 이해 안되면 ☎문의 박임재☎
 */

/** 게시글 이미지 변환 (base64 -> file) */
const base64ToFile = (base64, fileName) => {
    const arr = base64.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], fileName, { type: mime });
};

/** 게시글에서 base64 추출 */
export const changeImages = async (contents) => {
    const matchSrc = /src="([^"]*)"/g;
    const srcPull = contents.match(matchSrc);

    let imageList = [];
    if (srcPull !== null) {
        for (let i = 0; i < srcPull.length; i++) {
            const base64 = srcPull[i].slice(5, -1);  // base64 코드
            const imgData = base64.match(/data:(.*?);/)[1];  // 이미지 data
            const extension = imgData.split('/')[1];  // 확장자
            const fileName = `${uuidv4()}.${extension}`;  // 랜덤 이름 생성
            
            const file = base64ToFile(base64, fileName);  // 게시글 이미지 변환 (base64 -> file)
            imageList.push(file);
        }
    }else {
        return null;
    }
    const resultData = {
        imageList : imageList,
        srcPull : srcPull
    }
    console.log(resultData);
    return resultData;
}
