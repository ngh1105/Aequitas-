'use client';

import { Vault, TrendUp, CurrencyEth } from '@phosphor-icons/react';
import { Skeleton } from '@/components/ui/Skeleton';

interface TreasuryPanelProps {
    balance: string;
    loading: boolean;
    projectCount: number;
}

export function TreasuryPanel({ balance, loading, projectCount }: TreasuryPanelProps) {
    return (
        <div className="glass-card p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-success/10 flex items-center justify-center">
                        <Vault size={18} weight="duotone" className="text-success" />
                    </div>
                    <h2 className="text-sm font-semibold uppercase tracking-wider text-text-muted font-heading">Treasury</h2>
                </div>
                <TrendUp size={18} weight="bold" className="text-success" />
            </div>

            {/* Balance */}
            {loading ? (
                <Skeleton className="h-12 w-40" />
            ) : (
                <div>
                    <p className="text-4xl font-bold font-heading tracking-tight text-text-primary">
                        {Number(balance).toLocaleString()}
                    </p>
                    <p className="text-xs text-text-muted mt-1 flex items-center gap-1">
                        <CurrencyEth size={12} weight="bold" /> GEN Tokens
                    </p>
                </div>
            )}

            {/* Stats Row */}
            <div className="flex gap-4 pt-4 border-t border-border">
                <div>
                    <p className="text-2xl font-bold font-heading">{projectCount}</p>
                    <p className="text-[10px] uppercase tracking-widest text-text-muted">Evaluated</p>
                </div>
            </div>
        </div>
    );
}
