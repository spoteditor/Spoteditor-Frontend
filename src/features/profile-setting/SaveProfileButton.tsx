import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

interface SaveProfileButtonProps {
  userId: number;
  onTrigger?: () => void;
}

function SaveProfileButton({ userId, onTrigger }: SaveProfileButtonProps) {
  const nav = useNavigate();
  const { t } = useTranslation();
  const onUpdateClick = () => {
    nav(`/profile/${userId}`);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          onClick={() => {
            if (onTrigger) {
              onTrigger();
            }
          }}
          className="rounded-[6px] h-[42px] px-5"
        >
          {t('button.save')}
        </Button>
      </DialogTrigger>
      <DialogContent hideCloseButton className="web:w-[390px] mobile:w-[300px] p-6">
        <DialogTitle className="w-full mb-2 section-heading">
          {t('profileSetting.modal.title')}
        </DialogTitle>
        <DialogDescription className="text-text-xs text-[#6D727D] text-start w-full mb-4">
          {t('profileSetting.modal.description')}
        </DialogDescription>
        <DialogClose asChild className="flex justify-end w-full">
          <div className="space-x-[15px]">
            <Button onClick={onUpdateClick} size="sm" className="w-[100px]">
              {t('button.confirm')}
            </Button>
          </div>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}

export default SaveProfileButton;
