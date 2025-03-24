import DeleteAccountConfirmButton from '@/features/profile-setting/DeleteAccountConfirmButton';
import { useTranslation } from 'react-i18next';

export default function AccountSettings() {
  const { t } = useTranslation();
  return (
    <section className="mt-10">
      <p className="mb-4 font-bold text-text-lg web:text-text-2xl">
        {t('profileSetting.account.title')}
      </p>
      <div className="flex items-center justify-between py-[5px]">
        <p className="font-bold text-text-sm">{t('profileSetting.account.deleteLabel')}</p>
        <DeleteAccountConfirmButton />
      </div>
      <p className="font-medium text-primarySlate text-text-xs">
        {t('profileSetting.account.description')
          .split('\n')
          .map((line, i) => (
            <span key={i}>
              {line}
              <br />
            </span>
          ))}
      </p>
    </section>
  );
}
