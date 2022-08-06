import { useRef, useEffect } from "react";

export const useEffectOnce = (effect) => {
  const destoryFunc = useRef();
  const calledOnce = useRef(false);
  const renderAfterCalled = useRef(false);

  if (calledOnce.current) {
    renderAfterCalled.current = true;
  }

  useEffect(() => {
    if (calledOnce.current) return;

    calledOnce.current = true;
    destoryFunc.current = effect();

    return () => {
      if (!renderAfterCalled.current) return;
      if (destoryFunc.current) {
        destoryFunc.current();
      }
    };
  });
};
