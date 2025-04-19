import { useLoginModalStore } from '@/store/loginStore';

export default function LoginButton() {
  const { openLoginModal } = useLoginModalStore();
  return (
    <button onClick={openLoginModal} className="font-bold text-text-sm align-middle">
      회원가입/로그인
    </button>
  );
}
