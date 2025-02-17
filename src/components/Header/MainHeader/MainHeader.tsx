import global from '@/assets/homepage/global.png';
import search from '@/assets/homepage/search.png';
import LoginStatusButtons from '@/components/Header/MainHeader/LoginStatusButtons';
import LogoIcon from '@/components/Icons/LogoIcon';
import LoginModal from '@/features/login/LoginModal';
import SearchBar from '@/features/search/SearchBar';
import { useSearchStore } from '@/store/searchStore';
import { Link } from 'react-router-dom';
const MainHeader = () => {
  const { toggleSearchBar } = useSearchStore();

  return (
    <header className="sticky w-full z-50 bg-black web:px-[50px] mobile:px-4 web:py-5 mobile:py-[14px] web:min-w-[1440px] flex justify-center flex-col left-0 top-0">
      <section className="flex justify-between w-full">
        <Link to="/">
          <LogoIcon className="text-white w-[120px] h-5 cursor-pointer" fill="white" />
        </Link>
        <section className="flex web:gap-[46px] mobile:gap-[20px] items-center justify-between text-white">
          <button onClick={toggleSearchBar}>
            <img src={search} alt="search_logo" className="object-contain w-[20px] h-[20px]" />
          </button>
          <button>
            <img src={global} alt="global_logo" className="object-contain w-[20px] h-[20px]" />
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
