"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/** Respeita a preferência do sistema por movimento reduzido. */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
