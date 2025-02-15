import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { REGISTER_SEARCH } from '@/constants/pathname';
import PlaceDetailFormItem from '@/features/registerpage/PlaceDetailFormItem';
import { ArrowLeft, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

// 스크롤 수정 필요
const DetailsPage = () => {
  return (
    <div className="h-full flex flex-col py-5">
      <header className="flex items-center gap-2.5 pb-3">
        <ArrowLeft size={24} />
        <h3 className="text-text-2xl font-bold">서울 · 종로구</h3>
      </header>

      <main className="flex flex-col items-center grow gap-3 overflow-y-auto">
        <Input
          placeholder="제목을 입력해주세요. (최대 30자)"
          className="border-b px-0 placeholder:text-primary-300"
        />
        <Textarea
          className="bg-primary-50 text-primary-300 text-text-sm placeholder:text-primary-300 border-none"
          placeholder="내용을 입력해주세요. (최대 500자)"
        />

        {/* 버튼 클릭하면  PlaceDetailFormItem 추가하기*/}
        <PlaceDetailFormItem />
        <PlaceDetailFormItem />
        <PlaceDetailFormItem />

        <Button className="w-full text-primary-600 font-bold text-text-sm" variant={'outline'}>
          <Plus />
          장소 추가
        </Button>
      </main>

      {/* 버튼 */}
      <div className="w-full flex flex-col items-center gap-[15px]">
        <Button className="w-full" asChild>
          <Link to={REGISTER_SEARCH}>완료</Link>
        </Button>
      </div>
    </div>
  );
};

export default DetailsPage;
