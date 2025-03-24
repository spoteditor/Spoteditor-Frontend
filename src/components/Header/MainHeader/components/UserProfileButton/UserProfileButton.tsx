import HeadPhoneIcon from '@/components/Icons/HeadPhoneIcon';
import SettingIcon from '@/components/Icons/SettingIcon';
import UserIcon from '@/components/Icons/UserIcon';
import VerifiedLabelIcon from '@/components/Icons/VerifiedLabelIcon';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import LogoutButton from '@/features/profile/LogoutButton';
import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import MyProfileButton from './MyProfileButton';
import useUser from '@/hooks/queries/user/useUser';
import { useTranslation } from 'react-i18next';

function UserProfileButton() {
  const { t } = useTranslation();
  const { user } = useUser();
  const textRef = useRef<HTMLSpanElement>(null);
  const [isTruncated, setIsTruncated] = useState(false);

  useEffect(() => {
    const checkTruncate = () => {
      if (textRef.current) {
        setIsTruncated(textRef.current.scrollWidth > textRef.current.clientWidth);
      }
    };

    // ResizeObserver를 사용하여 크기 변화를 감지
    const observer = new ResizeObserver(checkTruncate);
    if (textRef.current) observer.observe(textRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="focus:outline-none" asChild>
        <button>
          <UserIcon />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className="font-bold text-text-lg flex justify-start gap-[5px] px-4 items-center">
          <span ref={textRef} className="truncate">
            {user?.name}
          </span>
          {!isTruncated && <VerifiedLabelIcon />}
        </DropdownMenuItem>
        <DropdownMenuItem className="px-4 py-5 focus:bg-white">
          <MyProfileButton />
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <div className="m-1">
          <DropdownMenuItem className="flex items-center justify-start gap-2 px-4 py-3 text-text-sm">
            <SettingIcon />
            {t('profile.userMenu.settings')}
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center justify-start gap-2 px-4 py-3 text-text-sm">
            <HeadPhoneIcon />
            {t('profile.userMenu.support')}
          </DropdownMenuItem>
        </div>
        <DropdownMenuSeparator />
        <div className="m-1">
          <DropdownMenuItem asChild className="flex items-center justify-start text-text-sm">
            <LogoutButton />
          </DropdownMenuItem>
        </div>
        <DropdownMenuSeparator />
        <div className="flex items-center justify-start px-4 py-[10px] gap-[15px] text-[#81858F]">
          <Link to="/notice" className="flex">
            <DropdownMenuItem>
              <button className="text-text-xs">{t('profile.userMenu.notice')}</button>
            </DropdownMenuItem>
          </Link>
          <button className="text-text-xs">{t('profile.userMenu.terms')}</button>
          <button className="text-text-xs">{t('profile.userMenu.privacy')}</button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserProfileButton;
