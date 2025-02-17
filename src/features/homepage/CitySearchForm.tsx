import { Button } from '@/components/ui/button';

function CitySearchForm() {
  return (
    <form className="flex flex-col gap-2.5 web:grid web:grid-cols-[3fr_70px] ">
      <div className="grid grid-cols-2 gap-1.5">
        <div className="flex flex-col bg-white px-3 py-2.5 gap-2">
          <label htmlFor="sido" className="text-primary-400 text-text-sm">
            어디로 놀러갈까요?
          </label>
          <input
            id="sido"
            type="text"
            placeholder="서울"
            className="grow text-black text-text-md font-bold placeholder:text-black web:text-sm"
          />
        </div>
        <div className="flex flex-col bg-white px-3 py-2.5 gap-2">
          <label htmlFor="gu" className="text-primary-400 text-text-sm">
            더 상세히 검색!
          </label>
          <input
            id="gu"
            type="text"
            placeholder="종로구, 중구"
            className="grow text-black text-text-md font-bold placeholder:text-black web:text-sm"
          />
        </div>
      </div>
      <Button className="bg-primary-950 text-text-sm font-medium text-white rounded-none" asChild>
        <p className="h-full">검색</p>
      </Button>
    </form>
  );
}

export default CitySearchForm;
