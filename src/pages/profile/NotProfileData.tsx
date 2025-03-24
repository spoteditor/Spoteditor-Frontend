import { useTranslation } from 'react-i18next';

export default function NotProfileData() {
  const { t } = useTranslation();
  return (
    <div className="flex justify-center items-center py-[49px]">
      <h3 className="font-bold text-center text-text-sm text-primary-200">
        {t('myProfile.emptyState.noSavedPlacesTitle')}
        <br /> {t('myProfile.emptyState.noSavedPlacesDesc')}
      </h3>
    </div>
  );
}
