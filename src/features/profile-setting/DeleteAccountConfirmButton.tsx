import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useDeleteUser } from '@/hooks/mutations/user/useDeleteUser';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

function DeleteAccountConfirmButton() {
  const nav = useNavigate();
  const { t } = useTranslation();
  const { isPending, isSuccess, mutate } = useDeleteUser();

  const onDeleteClick = () => {
    if (isPending) return;
    mutate();
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="font-medium text-red-600 text-text-xs">
          {t('profileSetting.delete.trigger')}
        </button>
      </DialogTrigger>
      <DialogContent hideCloseButton className="w-[300px] web:w-[390px] p-6">
        <DialogTitle className="w-full font-bold text-text-2xl">
          {t('profileSetting.delete.title')}
        </DialogTitle>
        <DialogDescription className="mt-2 text-text-sm text-[#6D727D] text-start w-full mb-4">
          {!isSuccess ? (
            <>
              {t('profileSetting.delete.description')
                .split('\n')
                .map((line, i) => (
                  <span key={i}>
                    {line}
                    <br />
                  </span>
                ))}
            </>
          ) : (
            <span>{t('profileSetting.delete.successMessage')}</span>
          )}
        </DialogDescription>
        {!isSuccess ? (
          <section className="flex justify-end w-full gap-x-2">
            <DialogClose asChild>
              <Button variant="outline" size="sm" className="w-[80px]">
                {t('button.cancel')}
              </Button>
            </DialogClose>
            <Button
              onClick={onDeleteClick}
              disabled={isPending}
              size="sm"
              className="w-[100px] text-[13px]"
            >
              {isPending ? `${t('button.deleting')}` : `${t('button.confirm')}`}
            </Button>
          </section>
        ) : (
          <DialogClose asChild className="flex justify-end w-full">
            <div>
              <Button onClick={() => nav('/')} size="sm" className="w-[100px]">
                {t('button.confirm')}
              </Button>
            </div>
          </DialogClose>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default DeleteAccountConfirmButton;
