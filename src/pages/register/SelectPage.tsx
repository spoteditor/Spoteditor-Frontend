import { Button } from '@/components/ui/button';
import { REGISTER_SEARCH } from '@/constants/pathname';
import { useRegisterStore } from '@/store/registerStore';
import { ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const WHO = ['혼자', '친구랑', '연인과', '가족과', '동료와', '반려동물과'];
const WHERE = [
  'SNS 핫플레이스',
  '체험 · 액티비티',
  '자연과 함께',
  '유명 관광지',
  '여유롭게 힐링',
  '미술관 · 갤러리',
  '알차고 바쁘게!',
  '역사가 물든',
  '여행지',
  '쇼핑',
  '맛집투어',
  '음악',
  '페스티벌',
  '독서하며 잔잔하게',
  '모임 · 동호회 ',
  '가성비 굿',
];

const SelectPage = () => {
  const navi = useNavigate();
  const companions = useRegisterStore((state) => state.experience.selectedCompanions);
  const feelings = useRegisterStore((state) => state.experience.selectedFeelings);

  const setCompanions = useRegisterStore((state) => state.setCompanions);
  const setFeelings = useRegisterStore((state) => state.setFeelings);

  const handleGoBack = () => navi(-1);

  return (
    <div className="h-full flex flex-col px-4">
      <header className="pt-5">
        <ArrowLeft size={24} className="cursor-pointer" onClick={handleGoBack} />
      </header>

      <main className="flex flex-col items-center justify-center grow ">
        {/* 제목 */}
        <div className="flex flex-col items-center mt-5 mb-[25px] gap-[7px]">
          <h3 className="text-md font-bold">어떤 하루인가요?</h3>
          <p className="text-text-sm text-primary-300 font-medium">여러개를 선택할 수 있어요.</p>
        </div>

        {/* 선택지 */}
        <div className="flex flex-col gap-5 grow">
          <div className="w-full">
            <h5 className="text-text-sm font-bold py-2.5">누구와</h5>
            <div className="flex gap-2 flex-wrap">
              {WHO.map((who, idx) => (
                <Button
                  key={idx}
                  variant={companions.includes(who) ? 'default' : 'muted'}
                  size={'m'}
                  className="font-bold"
                  onClick={() => setCompanions(who)}
                >
                  {who}
                </Button>
              ))}
            </div>
          </div>

          {/* 장소 */}
          <div className="w-full">
            <h5 className="text-text-sm font-bold py-2.5">어떤 느낌으로</h5>
            <div className="flex gap-2 flex-wrap">
              {WHERE.map((who, idx) => (
                <Button
                  key={idx}
                  variant={feelings.includes(who) ? 'default' : 'muted'}
                  size={'m'}
                  className="font-bold"
                  onClick={() => setFeelings(who)}
                >
                  {who}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* 버튼 */}
      <div className="w-full flex flex-col items-center gap-[15px] mb-6">
        <Button
          className="w-full !text-text-sm text-gray-50"
          size={'xl'}
          disabled={!companions.length || !feelings.length}
          onClick={() => navi(REGISTER_SEARCH)}
        >
          다음
        </Button>

        <p className="underline text-primary-300 text-text-sm !font-medium">
          <Link to={REGISTER_SEARCH}>다음에 하기</Link>
        </p>
      </div>
    </div>
  );
};

export default SelectPage;
