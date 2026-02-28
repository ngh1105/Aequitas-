'use client';

import { clsx } from 'clsx';

type Status = 'APPROVED' | 'REJECTED' | 'PENDING' | 'PARSE_ERROR' | 'FINALIZING' | 'FINALIZED';

const statusStyles: Record<Status, string> = {
    APPROVED: 'bg-success/15 text-success border-success/30',
    REJECTED: 'bg-danger/15 text-danger border-danger/30',
    PENDING: 'bg-primary/15 text-primary border-primary/30',
    PARSE_ERROR: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/30',
    FINALIZING: 'bg-secondary/15 text-secondary border-secondary/30',
    FINALIZED: 'bg-success/15 text-success border-success/30',
};

export function StatusBadge({ status }: { status: string }) {
    const s = status as Status;
    return (
        <span
            className={clsx(
                'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-widest border',
                statusStyles[s] || 'bg-white/5 text-text-muted border-border'
            )}
        >
            {(s === 'PENDING' || s === 'FINALIZING') && (
                <span className="w-1.5 h-1.5 rounded-full bg-current dot-pulse" />
            )}
            {status}
        </span>
    );
}
