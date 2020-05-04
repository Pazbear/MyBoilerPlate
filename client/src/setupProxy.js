const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
  app.use(
    '/api', //주소 단축
    createProxyMiddleware({
      target: 'http://localhost:5000',//서버 주소
      changeOrigin: true,
    })
  );
};
//localhost:5000 과 client의 주소 3000번을 소통시키기 위해 사용
//cors 이슈 해결
//Proxy 란?
//
//유저 ----- proxy server ----- 인터넷
//하는 일
//1. 아이피를 proxy server에서 임의로 바꿔 인터넷에서는
//   접근하는 사람의 IP를 알수 없게 됨
//2. 보내는 데이터도 임의로 바꿀 수 있으
//3. 방화벽 기능
//4. 웹 필터 기능
//5. 캐쉬 데이터, 공유 데이터 제공 기능

//사용 이유
//인터넷 사이트 임의 제어
//캐쉬를 이용해 빠른 인터넷 이용 제공
//보안 제공
//이용 제한된 사이트 접근 가능