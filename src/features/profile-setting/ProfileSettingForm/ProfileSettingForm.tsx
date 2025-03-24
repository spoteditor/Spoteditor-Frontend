import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useFormContext } from 'react-hook-form';
import TextCounter from './TextCounter';
import { useTranslation } from 'react-i18next';

export default function ProfileSettingForm() {
  //useFormContext을 이용해 부모 컴포넌트의 useForm 데이터를 사용
  const { control, watch } = useFormContext();
  const { name: nameLeng, description: descLeng } = watch();
  const { t } = useTranslation();

  return (
    <section className="flex flex-col gap-5">
      <FormField
        control={control}
        name="name"
        render={({ field }) => (
          <FormItem className="border-b-[1px] border-b-primary-100">
            <div className="flex items-center justify-between py-[5px]">
              <FormLabel className="font-bold text-text-sm">
                {t('profileSetting.label.name')}
              </FormLabel>
              <TextCounter length={nameLeng.length} maxLength={30} />
            </div>
            <FormControl>
              <Input
                {...field}
                placeholder={t('profileSetting.placeholder.name')}
                className="text-text-sm placeholder:text-text-sm py-[5px] px-0"
              />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="description"
        render={({ field }) => (
          <FormItem className="border-b-[1px] border-b-primary-100">
            <div className="flex items-center justify-between py-[5px]">
              <FormLabel className="font-bold text-text-sm">
                {t('profileSetting.label.description')}
              </FormLabel>
              <TextCounter length={descLeng.length} maxLength={50} />
            </div>
            <FormControl>
              <Input
                {...field}
                placeholder={t('profileSetting.placeholder.description')}
                className="text-text-sm placeholder:text-text-sm py-[5px] px-0"
              />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="instagramId"
        render={({ field }) => (
          <FormItem className="border-b-[1px] border-b-primary-100">
            <div className="flex items-center justify-start py-[5px]">
              <FormLabel className="font-bold text-text-sm">
                {t('profileSetting.label.instagram')}
              </FormLabel>
            </div>
            <FormControl>
              <Input
                {...field}
                placeholder="@"
                className="text-text-sm placeholder:text-text-sm py-[5px] px-0"
              />
            </FormControl>
          </FormItem>
        )}
      />
    </section>
  );
}
