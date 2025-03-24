import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import AccountSettings from '@/features/profile-setting/AccountSettings';
import ProfileSettingAvatar from '@/features/profile-setting/ProfileSettingAvatar';
import ProfileSettingForm from '@/features/profile-setting/ProfileSettingForm/ProfileSettingForm';
import SaveProfileButton from '@/features/profile-setting/SaveProfileButton';
import useUnsavedChangesWarning from '@/hooks/form/useUnsavedChangesWarning';
import useUpdateUser from '@/hooks/mutations/user/useUpdateUser';
import useUser from '@/hooks/queries/user/useUser';
import PageLayout from '@/layouts/PageLayout';
import api from '@/services/apis/api';
import { profileSettingSchema } from '@/services/schemas/profileSchema';
import { useProfileStore } from '@/store/profileStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import Resizer from 'react-image-file-resizer';
import { useTranslation } from 'react-i18next';

export const resizeFile = (file: File): Promise<File> => {
  return new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      150, // max width
      150, // max height
      'WEBP', // format (JPEG, PNG, WEBP)
      80, // quality (0~100)
      0, // rotation
      (uri) => {
        resolve(uri as File);
      },
      'file' // output type (base64, blob, file)
    );
  });
};

const fetchPresignedUrl = async (file: File) => {
  try {
    const result = await api.register.getPresignUrl({ originalFile: file.name });

    return result;
  } catch (error) {
    console.error('presigned URL 가져오기 실패', error);
  }
};

function ProfileSetting() {
  const nav = useNavigate();
  const { t } = useTranslation();
  const { user } = useUser('userOnly');
  const { file } = useProfileStore();

  const form = useForm({
    resolver: zodResolver(profileSettingSchema),
    defaultValues: {
      name: user?.name ?? '',
      imageUrl: user?.profileImage.imageUrl ?? '',
      description: user?.description ?? '',
      instagramId: user?.instagramId ?? '',
    },
  });

  const { mutate } = useUpdateUser();
  const { setIsFormDirty } = useUnsavedChangesWarning(form);

  const onSubmit = async (data: z.infer<typeof profileSettingSchema>) => {
    const { name, description, instagramId } = data;
    if (!file) return;
    const resizingFile = await resizeFile(file);

    const presignedUrl = await fetchPresignedUrl(resizingFile);
    if (!presignedUrl) return;
    await api.register.uploadImageWithPresignUrl(presignedUrl.preSignedUrl, resizingFile);

    mutate({
      name,
      description,
      instagramId,
      originalFile: resizingFile.name,
      uuid: presignedUrl.uuid,
    });
    setIsFormDirty(false);
  };

  const handleSaveClick = useCallback(() => {
    //즉시실행함수를 이용해 검증을 마치고 바로 제출
    form.handleSubmit(onSubmit)();
  }, [form, onSubmit]);

  const handleNavigation = () => {
    nav(-1); // 이전 페이지로 이동
  };
  return (
    <PageLayout>
      <div className="w-screen web:w-[661px] flex flex-col px-4 web:px-0">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col w-full">
            <ProfileSettingAvatar imageUrl={String(user?.profileImage.imageUrl)} />
            <p className="mt-8 mb-4 font-bold text-text-lg web:text-text-2xl">
              {t('profileSetting.title')}
            </p>
            <ProfileSettingForm />
            <AccountSettings />
            <section className="flex justify-between mt-[50px]">
              <Button
                onClick={handleNavigation}
                variant="outline"
                className="rounded-[6px] w-[120px] h-[42px]"
              >
                {t('button.cancel')}
              </Button>
              <SaveProfileButton userId={user?.userId!} onTrigger={handleSaveClick} />
            </section>
          </form>
        </Form>
      </div>
    </PageLayout>
  );
}

export default ProfileSetting;
