import GeoConsentModal from '@/components/GeoConsentModal';
import { Button } from '@/components/ui/button';
import useGeolocationPermission from '@/hooks/useGeolocationPermission';
import { useEffect, useMemo } from 'react';
import CitySearchDropbox from './CitySearchDropbox';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { citySearchSchema } from '@/services/schemas/searchSchema';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import useLocationToAddress from '@/hooks/useLocationToAddress';
import { useNavigate } from 'react-router-dom';
import { useCitySearchStore } from '@/store/searchStore';
import { AnimatePresence, motion, useMotionTemplate, Variants } from 'motion/react';
import { useTranslation } from 'react-i18next';

const dropboxVar: Variants = {
  start: {
    opacity: 0,
    scale: 0,
    transition: {
      duration: 0.2,
    },
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.25,
      ease: 'easeOut',
    },
  },
  end: {
    opacity: 0,
    scale: 0,
    transition: {
      duration: 0.2,
      ease: 'easeIn',
    },
  },
};
function CitySearchForm() {
  const nav = useNavigate();
  const { t } = useTranslation();
  const { position, checkPermission } = useGeolocationPermission();
  const { address } = useLocationToAddress(position?.latitude ?? null, position?.longitude ?? null);
  const { isDropBox, sido, bname, openDropBox } = useCitySearchStore();

  /* 드롭박스 마운트, 언마운트 시 transformOrigin 값 변경 */
  const transformOrigin = useMotionTemplate`top ${isDropBox ? 'left' : 'right'} `;

  const defaultValues = useMemo(
    () => ({
      sido: sido || address?.region_1depth_name || '서울',
      bname: bname || address?.region_2depth_name || '송파구',
    }),
    [sido, bname, address]
  );

  const form = useForm({
    resolver: zodResolver(citySearchSchema),
    defaultValues,
  });

  // 쥬스탄드 값이 변경되었을 때 form 상태 업데이트
  useEffect(() => {
    if (sido) {
      form.setValue('sido', sido);
    }
    if (bname) {
      form.setValue('bname', bname);
    }
  }, [sido, bname, form]);

  const onSearchSubmit = async ({ sido, bname }: z.infer<typeof citySearchSchema>) => {
    const currentPermission = await checkPermission();
    if (currentPermission === 'prompt') {
      return; // 모달은 checkPermission에서 열림
    }
    /* 추후 모달창 닫혔을 경우 검색할 수 있는 기능 추가 */
    nav('/search', {
      state: { sido, bname },
    });
  };

  const openDropBoxClick = () => {
    openDropBox();
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSearchSubmit)}
          className="flex flex-col gap-2.5 web:grid web:grid-cols-[3fr_70px] relative bottom-0 web:z-30"
        >
          <div className="grid grid-cols-2 gap-1.5">
            <FormField
              control={form.control}
              name="sido"
              render={({ field }) => (
                <FormItem className="flex flex-col bg-white px-3 py-2.5 gap-2">
                  <FormLabel className="text-primary-400 text-text-sm">
                    {t('searchForm.label.sido')}
                  </FormLabel>
                  <FormControl>
                    <Input
                      onClick={openDropBoxClick}
                      placeholder="서울"
                      readOnly
                      {...field}
                      className="p-0 font-bold text-black grow text-text-md placeholder:text-black web:text-sm"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bname"
              render={({ field }) => (
                <FormItem className="flex flex-col bg-white px-3 py-2.5 gap-2">
                  <FormLabel className="text-primary-400 text-text-sm">
                    {t('searchForm.label.bname')}
                  </FormLabel>
                  <FormControl>
                    <Input
                      onClick={openDropBoxClick}
                      placeholder="송파구"
                      readOnly
                      {...field}
                      className="p-0 font-bold text-black grow text-text-md placeholder:text-black web:text-sm"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <Button
            type="submit"
            className="h-full font-medium text-white rounded-none bg-primary-950 text-text-sm hover:bg-primary-900"
          >
            {t('searchForm.button')}
          </Button>
          <AnimatePresence>
            {isDropBox ? (
              <motion.section
                className="z-[1111] web:z-10 mobile:fixed mobile:top-0 mobile:left-0 web:absolute web:top-[93px] bg-white w-screen h-screen web:h-auto web:max-w-[calc(100%)] px-4 web:py-5 web:pl-[30px] web:pr-5 flex flex-col gap-[18px] web:gap-2.5"
                key="dropbox"
                variants={dropboxVar}
                initial="start"
                animate="visible"
                exit="end"
                style={{
                  transformOrigin,
                }}
              >
                <CitySearchDropbox />
              </motion.section>
            ) : null}
          </AnimatePresence>
        </form>
      </Form>
      <GeoConsentModal />
    </>
  );
}

export default CitySearchForm;
