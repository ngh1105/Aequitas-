'use client';

import { clsx } from 'clsx';

// ---- Skeleton Loader ----
export function Skeleton({ className }: { className?: string }) {
    return <div className={clsx('skeleton', className)} />;
}

export function SkeletonText({ lines = 3 }: { lines?: number }) {
    return (
        <div className="space-y-3">
            {Array.from({ length: lines }).map((_, i) => (
                <Skeleton
                    key={i}
                    className={clsx('h-4', i === lines - 1 ? 'w-3/5' : 'w-full')}
                />
            ))}
        </div>
    );
}

export function SkeletonCard() {
    return (
        <div className="glass-card p-6 space-y-4">
            <div className="flex items-center gap-3">
                <Skeleton className="w-10 h-10 rounded-full" />
                <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-2/3" />
                    <Skeleton className="h-3 w-1/3" />
                </div>
            </div>
            <SkeletonText lines={2} />
            <div className="flex gap-4">
                <Skeleton className="h-8 w-20 rounded-lg" />
                <Skeleton className="h-8 w-20 rounded-lg" />
            </div>
        </div>
    );
}
