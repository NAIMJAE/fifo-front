//const Host = "3.39.72.175";
//export const Host = '3.39.72.175';
export const Host = "localhost";
export const RootUrl = () => {
  return `http://${Host}:8080/fifo-back`;
};

export const FrontUrl = () => {
  return "http://localhost:3000";
  //return 'http://3.39.72.175:3000';
};
