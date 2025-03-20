import { useGeolocationStore } from '@/store/geoStore';
import { useEffect } from 'react';

/* granted: 사용자가 위치 접근을 허용함
denied: 사용자가 위치 접근을 거부함
prompt: 사용자가 아직 위치 권한을 허용/거부하지 않음, 권한 요청 창이 뜸
null: 초기 상태. 권한 확인 전이거나 브라우저가 navigator.permissions API를 지원하지 않을 때 사용 가능 */

export default function useGeolocationPermission() {
  const { permission, setPermission, open, setOpen, position, setPosition } = useGeolocationStore();

  const checkPermission = async () => {
    if (!('permissions' in navigator)) return;

    try {
      const result = await navigator.permissions.query({ name: 'geolocation' });
      setPermission(result.state);

      // "prompt" 상태이면 모달 열기
      if (result.state === 'prompt') {
        setOpen(true);
      }

      // 권한 변경 감지 (예: "prompt" → "granted")
      result.onchange = () => {
        setPermission(result.state);
        if (result.state === 'granted') {
          setOpen(false);
        }
      };
    } catch (error) {
      console.error('위치 권한 확인 중 오류 발생:', error);
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setPosition({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error('현재 위치를 가져오는 중 오류 발생:', error);
        }
      );
    }
  };

  useEffect(() => {
    checkPermission();
  }, []);

  useEffect(() => {
    if (permission === 'granted') {
      getCurrentLocation();
    }
  }, [permission]);

  return { permission, open, setOpen, position };
}
