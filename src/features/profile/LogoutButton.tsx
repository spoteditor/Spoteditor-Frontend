import LogoutIcon from '@/components/Icons/LogoutIcon';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import LogoutConfirmButton from './LogoutConfirmButton';
import { useTranslation } from 'react-i18next';

function LogoutButton() {
  const { t } = useTranslation();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex items-center justify-start w-full gap-2 px-4 py-3 rounded-sm cursor-default text-text-sm hover:bg-neutral-100 focus:bg-neutral-100 focus:text-neutral-900">
          <LogoutIcon />
          <p>{t('logout.title')}</p>
        </button>
      </DialogTrigger>
      <DialogContent className="w-[300px] web:w-[390px] p-6">
        <DialogTitle className="w-full mb-2 text-text-2xl section-heading">
          {t('logout.title')}
        </DialogTitle>
        <DialogDescription className="w-full mb-4 text-text-sm text-primary-500 text-start">
          {t('logout.message')}
        </DialogDescription>
        <DialogClose asChild className="flex justify-end w-full">
          <div className="space-x-2">
            <Button variant="outline" size="sm" className="w-[80px]">
              {t('button.cancel')}
            </Button>
            <LogoutConfirmButton />
          </div>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}

export default LogoutButton;
