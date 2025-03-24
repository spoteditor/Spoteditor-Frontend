import { animate, motion, useMotionValue, useTransform } from 'framer-motion';
import { useEffect } from 'react';
import CursorBlinker from './CursorBlinker';

export default function TypingText({ text }: { text: string }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const displayText = useTransform(rounded, (latest) => text.slice(0, latest));

  useEffect(() => {
    const charCount = text.length;
    const duration = charCount * 0.08; // 한 글자당 0.08초

    const controls = animate(count, charCount, {
      type: 'tween',
      duration,
      ease: 'easeInOut',
      repeat: Infinity,
      repeatType: 'reverse',
    });

    return controls.stop;
  }, [text]); // text가 바뀌면 다시 실행되도록

  return (
    <span>
      <motion.span className="text-sm font-bold web:text-xl">{displayText}</motion.span>
      <CursorBlinker />
    </span>
  );
}
