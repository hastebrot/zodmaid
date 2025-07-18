"use client";

// https://github.com/chakra-ui/chakra-ui/tree/%40chakra-ui/react%403.22.0/packages/react/src/hooks
// MIT License. Copyright (c) 2019 Segun Adebayo

import { useCallback, useInsertionEffect, useRef } from "react";

/**
 * This hook is user-land implementation of the experimental `useEffectEvent` hook.
 * React docs: https://react.dev/learn/separating-events-from-effects#declaring-an-effect-event
 */
export function useCallbackRef<Args extends unknown[], Return>(
  callback: ((...args: Args) => Return) | undefined,
  deps: React.DependencyList = [],
) {
  const callbackRef = useRef<typeof callback>(() => {
    throw new Error("Cannot call an event handler while rendering.");
  });

  useInsertionEffect(() => {
    callbackRef.current = callback;
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useCallback((...args: Args) => callbackRef.current?.(...args), deps);
}
