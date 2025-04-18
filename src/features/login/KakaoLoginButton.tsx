import { Button } from '@/components/ui/button';
import kakaoLoginButton from '@/assets/login/kakao-login-button.png';
import { useNavigate } from 'react-router-dom';

export default function KakaoLoginButton() {
  const nav = useNavigate();

  const handleLogin = async () => {
    nav('/');
    const BASE_PATH = window.location.origin;
    window.location.href = `${import.meta.env.VITE_KAKAO_LOGIN_URL}?redirect=${BASE_PATH}`;
  };
  return (
    <Button variant={null} onClick={handleLogin} className="w-auto web:my-5 mobile:my-10">
      <img className="object-contain" src={kakaoLoginButton} alt="카카오 로그인 버튼" />
    </Button>
  );
}
