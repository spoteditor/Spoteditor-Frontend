import { useEffect, useState } from 'react';
import { useBlocker } from 'react-router-dom';
import { UseFormReturn } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

export default function useUnsavedChangesWarning(form: UseFormReturn<any>) {
  const [isFormDirty, setIsFormDirty] = useState(false);
  const [proceedNavigation, setProceedNavigation] = useState(false);
  const { t } = useTranslation();

  // 1. 폼 변경 감지
  useEffect(() => {
    const subscription = form.watch(() => {
      setIsFormDirty(true);
    });

    return () => subscription.unsubscribe();
  }, [form]);

  // 2. beforeunload 감지 (브라우저 닫기/새로고침)
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (isFormDirty) {
        event.preventDefault();
        event.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isFormDirty]);

  // 3. 라우터 이동 감지 및 차단
  const blocker = useBlocker(({ currentLocation, nextLocation }) => {
    // 진행 여부 결정: 취소 시 false 반환
    if (isFormDirty && currentLocation.pathname !== nextLocation.pathname && !proceedNavigation) {
      const confirmLeave = window.confirm(`${t('alert.unsavedChanges')}`);
      if (confirmLeave) {
        setProceedNavigation(true); // 다음 useEffect에서 proceed 처리
        return false; // 진행 허용
      } else {
        return true; // 차단
      }
    }
    return false;
  });

  // blocker.proceed()는 confirm이 true일 때만 실행
  useEffect(() => {
    if (blocker.state === 'blocked' && proceedNavigation) {
      blocker.proceed();
    }
  }, [blocker, proceedNavigation]);

  return { isFormDirty, setIsFormDirty };
}
