'use client';

import { clsx } from 'clsx';

interface BentoCardProps {
    children: React.ReactNode;
    className?: string;
    span?: 1 | 2 | 3;
    rowSpan?: 1 | 2;
}

const colSpanMap = {
    1: '',
    2: 'md:col-span-2',
    3: 'md:col-span-3',
};

const rowSpanMap = {
    1: '',
    2: 'md:row-span-2',
};

export function BentoCard({ children, className, span = 1, rowSpan = 1 }: BentoCardProps) {
    return (
        <div
            className={clsx(
                'glass-card p-6',
                colSpanMap[span],
                rowSpanMap[rowSpan],
                className
            )}
        >
            {children}
        </div>
    );
}

export function BentoGrid({ children, className }: { children: React.ReactNode; className?: string }) {
    return (
        <div className={clsx('grid grid-cols-1 md:grid-cols-3 gap-5', className)}>
            {children}
        </div>
    );
}
