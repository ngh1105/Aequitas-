'use client';

import { useState } from 'react';
import { Plus, CircleNotch } from '@phosphor-icons/react';
import { clsx } from 'clsx';

interface DepositPanelProps {
    onDeposit: (amount: string) => Promise<void>;
    disabled?: boolean;
}

export function DepositPanel({ onDeposit, disabled }: DepositPanelProps) {
    const [amount, setAmount] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const handleDeposit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!amount) return;
        setSubmitting(true);
        try {
            await onDeposit(amount);
            setAmount('');
        } catch {
            // Error handled upstream
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="glass-card p-5">
            <h3 className="text-[11px] font-semibold uppercase tracking-widest text-text-muted mb-3 font-heading">
                Add to Treasury
            </h3>
            <form onSubmit={handleDeposit} className="flex gap-2">
                <input
                    type="number"
                    placeholder="Amount (GEN)"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="flex-1 bg-black/40 border border-border rounded-xl px-3 py-2.5 text-sm text-text-primary placeholder:text-text-muted/40 transition-all"
                    min="1"
                    disabled={submitting || disabled}
                />
                <button
                    type="submit"
                    disabled={submitting || disabled || !amount}
                    className={clsx(
                        'px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-1.5',
                        'bg-success/10 text-success border border-success/20',
                        'hover:bg-success/20 hover:border-success/40',
                        'transition-all cursor-pointer',
                        'disabled:opacity-40 disabled:cursor-not-allowed'
                    )}
                >
                    {submitting ? (
                        <CircleNotch size={16} weight="bold" className="animate-spin" />
                    ) : (
                        <Plus size={16} weight="bold" />
                    )}
                    Deposit
                </button>
            </form>
        </div>
    );
}
