'use client';
import { useLottie } from 'lottie-react';
import DefaultLoadingAnimation from './DefaultLoading.json';
import { Title } from '../../Title';
import { defaultLoadingTv } from './defaultLoadingTV';

export function DefaultLoading() {
  const options = {
    animationData: DefaultLoadingAnimation,
    autoplay: true
  };

  const { View } = useLottie(options);

  return (
    <div className={defaultLoadingTv()}>
      {View}
      <Title title="Carregando..." color="white" />
    </div>
  );
}
