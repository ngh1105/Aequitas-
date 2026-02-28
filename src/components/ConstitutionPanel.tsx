'use client';

import { Scroll } from '@phosphor-icons/react';
import { Skeleton } from '@/components/ui/Skeleton';

interface ConstitutionPanelProps {
    constitution: string;
    loading: boolean;
}

export function ConstitutionPanel({ constitution, loading }: ConstitutionPanelProps) {
    return (
        <div className="glass-card p-6 space-y-4">
            <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center">
                    <Scroll size={18} weight="duotone" className="text-secondary" />
                </div>
                <h2 className="text-sm font-semibold uppercase tracking-wider text-text-muted font-heading">
                    Funding Constitution
                </h2>
            </div>

            {loading ? (
                <div className="space-y-3">
                    <Skeleton className="h-3 w-full" />
                    <Skeleton className="h-3 w-5/6" />
                    <Skeleton className="h-3 w-4/6" />
                </div>
            ) : (
                <div className="max-h-48 overflow-y-auto pr-2">
                    <p className="text-sm text-text-secondary leading-relaxed whitespace-pre-wrap">
                        {constitution || 'No constitution set.'}
                    </p>
                </div>
            )}
        </div>
    );
}
