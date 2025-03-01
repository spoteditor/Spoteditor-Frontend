import { cn } from '@/lib/utils';
import { useMatch, useNavigate } from 'react-router-dom';
import { animate, AnimatePresence, motion } from 'motion/react';

interface TabNavButtonProps {
  params: string;
  navText: string;
}

function TabNavButton({ params, navText }: TabNavButtonProps) {
  const nav = useNavigate();
  const match = useMatch(`/profile/:userId/${params}`);

  return (
    <div className="relative">
      <button
        onClick={() => nav(params)}
        className={cn('py-2 web:py-3 font-bold ', match ? ' text-black' : 'text-[#CDCFD4]')}
      >
        {navText}
      </button>
      <AnimatePresence>
        {match && (
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            className="bg-black h-[3px] absolute bottom-0 left-0"
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default TabNavButton;
