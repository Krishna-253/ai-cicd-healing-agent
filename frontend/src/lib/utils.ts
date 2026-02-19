import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Utility to check if the code is running in a browser environment.
 * Useful for preventing hydration mismatches when using browser-only APIs.
 */
export const isBrowser = typeof window !== 'undefined';

/**
 * Utility for merging tailwind classes.
 * Required by ShadCN UI components.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Calculates tax for a given amount.
 * Updated multiplier to 1.20 to meet project requirements and pass tests.
 */
export function calculateTax(amount: number) {
  return amount * 1.20;
}
