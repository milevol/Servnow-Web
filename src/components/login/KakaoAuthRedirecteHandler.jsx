import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { kakaoLogin } from '../../redux/authSlice';

const KakaoRedirectHandler = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch(); 
    const getKakaoToken = async (authorizationCode) => {
        try {
           
            const tokenResponse = await axios.post(
                "https://kauth.kakao.com/oauth/token",
                null,
                {
                    params: {
                        grant_type: 'authorization_code',
                        client_id: '81edc8661035881efc3646c4d8737c10', // 카카오 REST API 키
                        redirect_uri: 'http://localhost:5173/oauth/kakao', // 동일한 리다이렉트 URI
                        code: authorizationCode,
                    },
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                }
            );
            console.log('Authorization Code:', authorizationCode);
            console.log('Token Request URL:', tokenResponse.config.url);
            console.log('Token Request Params:', tokenResponse.config.params);
            
            const kakaoAccessToken = tokenResponse.data.access_token;
            const kakaoRefreshToken = tokenResponse.data.refresh_token;
            
            console.log(kakaoAccessToken,"카카오액세스토큰");
           
            const response = await axios.post(
                '/api/v1/auth/kakao',  
                {}, // 본문 내용이 필요하지 않으므로 빈 객체 전달
                {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
                        "Authorization": `Bearer ${kakaoAccessToken}`,
                    },
                }
        );

            const { accessToken, refreshToken, isRegistered } = response.data.data;


            // 성공적인 로그인 후에 메인 페이지 또는 회원 가입 페이지로 리다이렉트
            if (isRegistered) {
                
                 // JWT 토큰을 로컬 스토리지에 저장
                localStorage.setItem('accessToken', accessToken);
                localStorage.setItem('refreshToken', refreshToken);
                //로그인 상태 디스패치
                dispatch(kakaoLogin({
                    accessToken: accessToken,
                    refreshToken: refreshToken,
                    userId: '',

                }))
                alert('로그인이 완료되었습니다.');
                navigate('/');
            } else {
                alert('회원가입을 진행해주세요.');
                navigate('/signup');
            }
        } catch (error) {
            
            if (error.response) {
              const { status, data } = error.response;
      
              if (status === 404) {
                console.error("로그인 오류: 사용자를 찾을 수 없습니다.");
                alert("사용자를 찾을 수 없습니다.");
              } 
              else {
                console.error("로그인 중 오류 발생:", data.message);
                alert(data.message || "로그인 중 오류가 발생했습니다.");
              }
            } 
            
            else {
              // 네트워크 오류 등 기타 오류 처리
              console.error("로그인 중 네트워크 오류 발생:", error.message);
              alert("네트워크 오류가 발생했습니다. 다시 시도해주세요.");
            }
            navigate('/login');
          }
        }
    
    useEffect( () => {
        const urlParams = new URLSearchParams(window.location.search);
        const authorizationCode = urlParams.get('code');

        if (authorizationCode) {
            getKakaoToken(authorizationCode);
        } else {  
            alert('카카오 토큰 불러오기 실패');
            navigate('/login');
        }
    }, []);

    return <div>카카오 로그인 중...</div>
};

export default KakaoRedirectHandler;

