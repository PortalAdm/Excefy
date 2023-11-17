'use client';
import { useLottie } from 'lottie-react';
import { useEffect } from 'react';
import Hamburguer from './Hamburguer.json';
import { hamburguerTv } from './hamburguerTv';

export interface HamburguerAnimationProps {
  isClose: boolean;
  onClick: () => void;
}

export function HamburguerAnimation({ isClose, onClick }: HamburguerAnimationProps) {
  const options = {
    animationData: Hamburguer,
    autoplay: false,
    loop: 0
  };

  const { View, play, setDirection, setSpeed } = useLottie(options);

  useEffect(() => {
    isClose === false ? setDirection(-1) : setDirection(1);
    play();
    setSpeed(3);
  }, [isClose, play, setDirection, setSpeed]);

  return (
    <button onClick={() => onClick()} aria-label="Menu Mobile" className={hamburguerTv()}>
      {View}
    </button>
  );
}
