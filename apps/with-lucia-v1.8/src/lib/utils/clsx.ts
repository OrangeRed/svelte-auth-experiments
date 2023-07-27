import clsx, { type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

const classNames = (...classes: ClassValue[]) => twMerge(clsx(...classes));

export default classNames;
