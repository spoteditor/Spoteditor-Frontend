import { Textarea } from '@/components/ui/textarea';
import { Camera, CircleX, Clock, MapPin, Star } from 'lucide-react';

const PlaceDetailFormItem = () => {
  return (
    <div className="w-full">
      {/* 장소 설명 */}
      <div className="flex flex-col gap-2">
        <div className="flex justify-between">
          <div className="text-text-lg font-bold">
            <p>01</p>
            <p>서촌 베란다</p>
          </div>
          <CircleX className="fill-primary-100 stroke-white" />
        </div>
        <div className="flex flex-col  text-primary-400">
          <div className="flex gap-2 items-center text-text-sm">
            <Clock size={16} />
            <p className="after:ml-1.5 after:content-['|'] after:text-primary-100">카페</p>
            <p className="text-info-500">영업중</p>
            <p>오후 8시에 영업종료</p>
          </div>
          <div className="flex gap-2 items-center text-text-sm">
            <MapPin size={16} />
            <p className="after:ml-1.5 after:content-['|'] after:text-primary-100">서울</p>
            <p>위치 세부정보</p>
          </div>
        </div>
      </div>
      {/* 사진 첨부 */}
      <div className="border rounded-md border-dashed flex items-center justify-center gap-[5px] text-primary-600 px-2.5 py-3 mt-[15px]">
        <Camera />
        <span className="text-text-sm font-bold">사진첨부 (최대 3장)</span>
      </div>
      {/* 평점 */}
      <div className="flex justify-center items-center gap-[5px] text-primary-400 px-4 py-3">
        <span>평점</span>
        <div className="flex">
          {[...Array(5)].map((_, idx) => (
            <Star key={idx} className="fill-primary-100 stroke-none" />
          ))}
        </div>
      </div>
      {/* 내용 */}
      <Textarea
        className="bg-primary-50 text-primary-300 text-text-sm placeholder:text-primary-300 border-none"
        placeholder="내용을 입력해주세요. (최대 500자)"
      />
    </div>
  );
};
export default PlaceDetailFormItem;
