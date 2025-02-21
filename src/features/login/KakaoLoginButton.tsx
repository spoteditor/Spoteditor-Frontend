import { Button } from '@/components/ui/button';
import kakaoLoginButton from '@/assets/login/kakao-login-button.png';

export default function KakaoLoginButton() {
  const handleLogin = () => {
    window.location.href = `${import.meta.env.VITE_KAKAO_LOGIN_URL}`;
  };
  return (
    <Button variant={null} onClick={handleLogin} className="w-auto web:my-5 mobile:my-10">
      <img className="object-contain" src={kakaoLoginButton} alt="카카오 로그인 버튼" />
    </Button>
  );
}
