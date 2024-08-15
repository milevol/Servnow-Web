import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const KakaoAuthRedirectHandler = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const code = new URL(window.location.href).searchParams.get('code');

        const getAccessToken = async () => {
            try {
                const response = await axios.post('https://kauth.kakao.com/oauth/token', null, {
                    params: {
                        grant_type: 'authorization_code',
                        client_id: '81edc8661035881efc3646c4d8737c10',
                        redirect_url: 'http://localhost:8080/api/v1/auth/kakao',
                        code,
                    },
                    headers: {
                        'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
                    },
                });
                const { access_token } = response.data;

                //서버로 액세스 토큰을 전달하여 JWT 발급 요청
                const jwtResponse = await axios.post('http://localhost:5000/api/v1/auth/kakao', {
                    accessToken: access_token,
                });

                // 서버로부터 JWT를 받았다면, 이를 로컬스토리지나 세션스토리지에 저장합니다.
                localStorage.setItem('token', jwtResponse.data.token);

                // 이후 로그인 완료 처리, 예를 들어 메인 페이지로 리디렉션
                navigate('/');
            } catch (error) {
                console.error('카카오 로그인 에러:', error);
                alert('로그인에 실패했습니다. 다시 시도해주세요.');
                navigate('/login');
            }
        };

        if (code) {
            getAccessToken();
        }
    }, [navigate]);

    return <div>카카오 로그인 중...</div>;
};

export default KakaoAuthRedirectHandler;