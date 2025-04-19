import LoginStatusButtons from '@/components/Header/MainHeader/components/LoginStatusButtons';
import { EarthIcon } from '@/components/Icons';
import { HOME } from '@/constants/pathname';
import LoginModal from '@/features/login/LoginModal';
import SearchBar from '@/features/search/SearchBar';
import { Link } from 'react-router-dom';
import SearchBarButton from './components/SearchBarButton';
const MainHeader = () => {
  return (
    <header className="sticky w-full z-50 bg-black px-4 web:px-[50px] py-4 web:py-5 left-0 top-0">
      <section className="flex justify-between w-full">
        <Link to={HOME}>
          <span className="text-white text-[23px] font-prompt">Spoteditor</span>
        </Link>
        <section className="flex items-center text-white web:gap-[46px] gap-5">
          <SearchBarButton />
          <button>
            <EarthIcon />
          </button>
          <LoginStatusButtons />
        </section>
      </section>
      <SearchBar />
      <LoginModal />
    </header>
  );
};

export default MainHeader;
