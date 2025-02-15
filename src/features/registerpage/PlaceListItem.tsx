import { Button } from '@/components/ui/button';

const PlaceListItem = () => {
  return (
    <div className="flex justify-between py-1 items-center">
      <div className="text-text-sm font-medium">
        <h5>장소명</h5>
        <p className="text-primary-300">관광명소 · 포항 · 안동</p>
      </div>
      <Button variant={'ghost'} size={'m'} fullRounded>
        선택
      </Button>
    </div>
  );
};

export default PlaceListItem;
