import { twMerge } from 'tailwind-merge'
import clsx, { ClassValue } from 'clsx'
/**
 * Handy utility to make className usage more convenient. See readme for examples and usage.
 */
export function cn(...classes: ClassValue[]): string {
    return twMerge(clsx(classes))
}
