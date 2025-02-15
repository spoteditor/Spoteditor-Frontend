import { Button } from '@/components/ui/button';
import { REGISTER_SEARCH } from '@/constants/pathname';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

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
  return (
    <div className="h-full flex flex-col py-5">
      <header>
        <ArrowLeft size={24} />
      </header>

      <main className="flex flex-col items-center justify-center grow ">
        {/* 제목 */}
        <div className="flex flex-col items-center font-bold py-5 gap-[7px]">
          <h3 className="text-md">어떤 하루인가요?</h3>
          <p className="text-text-sm text-primary-300">여러개를 선택할 수 있어요.</p>
        </div>

        {/* 선택지 */}
        <div className="flex flex-col gap-5 grow">
          <div className="w-full">
            <h5 className="text-text-xs font-bold py-2.5">누구와</h5>
            <div className="flex gap-2 flex-wrap">
              {WHO.map((who, idx) => (
                <Button key={idx} variant={'muted'} size={'m'}>
                  {who}
                </Button>
              ))}
            </div>
          </div>

          {/* 장소 */}
          <div className="w-full">
            <h5 className="text-text-xs font-bold py-2.5">어떤 느낌으로</h5>
            <div className="flex gap-2 flex-wrap">
              {WHERE.map((who, idx) => (
                <Button key={idx} variant={'muted'} size={'m'}>
                  {who}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* 버튼 */}
      <div className="w-full flex flex-col items-center gap-[15px]">
        <Button className="w-full" asChild>
          <Link to={REGISTER_SEARCH}>다음</Link>
        </Button>

        <p className="underline text-primary-300 text-text-sm">다음에 하기</p>
      </div>
    </div>
  );
};

export default SelectPage;
