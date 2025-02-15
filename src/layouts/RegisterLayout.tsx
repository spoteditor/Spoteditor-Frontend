import { Outlet } from 'react-router-dom';

const RegisterLayout = () => {
  return (
    <div className="flex flex-col items-center h-screen mx-auto max-w-[724px]">
      <div className="w-full grow px-4">
        <Outlet />
      </div>
    </div>
  );
};

export default RegisterLayout;
