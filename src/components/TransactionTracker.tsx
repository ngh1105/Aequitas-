'use client';

import { useState } from 'react';
import { Gavel, ShieldCheck, CircleNotch, WarningCircle, ArrowRight } from '@phosphor-icons/react';
import { clsx } from 'clsx';

type TxStatus = 'idle' | 'pending' | 'finalizing' | 'finalized' | 'error';

interface TransactionTrackerProps {
    onAppeal?: (txHash: string) => void;
}

export function TransactionTracker({ onAppeal }: TransactionTrackerProps) {
    const [txHash, setTxHash] = useState('');
    const [status, setStatus] = useState<TxStatus>('idle');
    const [error, setError] = useState<string | null>(null);

    // In production, this would poll GenLayer for tx status
    // For now, it serves as a visual component for the Appeal flow
    const simulateCheck = () => {
        if (!txHash) return;
        setStatus('pending');
        setError(null);

        // Simulated — in production, use client.getTransactionReceipt
        setTimeout(() => setStatus('finalizing'), 2000);
    };

    const handleAppeal = () => {
        if (onAppeal && txHash) {
            onAppeal(txHash);
        }
    };

    return (
        <div className="glass-card p-6 space-y-5">
            <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-danger/10 flex items-center justify-center">
                    <Gavel size={18} weight="duotone" className="text-danger" />
                </div>
                <h2 className="text-sm font-semibold uppercase tracking-wider text-text-muted font-heading">
                    Transaction Tracker
                </h2>
            </div>

            {/* TX Hash Input */}
            <div className="flex gap-2">
                <input
                    type="text"
                    placeholder="0x... (Transaction Hash)"
                    value={txHash}
                    onChange={(e) => setTxHash(e.target.value)}
                    className="flex-1 bg-black/40 border border-border rounded-xl px-4 py-2.5 text-sm font-mono text-text-primary placeholder:text-text-muted/40 transition-all"
                />
                <button
                    onClick={simulateCheck}
                    disabled={!txHash || status === 'pending'}
                    className={clsx(
                        'px-4 py-2.5 rounded-xl text-sm font-semibold',
                        'bg-white/5 border border-border hover:border-border-hover',
                        'transition-all cursor-pointer disabled:opacity-40'
                    )}
                >
                    Track
                </button>
            </div>

            {/* Status Flow */}
            {status !== 'idle' && (
                <div className="space-y-4 pt-2">
                    {/* Progress Steps */}
                    <div className="flex items-center gap-2 text-xs font-mono text-text-muted">
                        <span className={clsx(status === 'pending' && 'text-primary font-semibold')}>PENDING</span>
                        <ArrowRight size={10} />
                        <span className={clsx((status === 'finalizing' || status === 'finalized') && 'text-secondary font-semibold')}>
                            FINALIZING
                        </span>
                        <ArrowRight size={10} />
                        <span className={clsx(status === 'finalized' && 'text-success font-semibold')}>FINALIZED</span>
                    </div>

                    {/* Finalizing State — Appeal Button */}
                    {status === 'finalizing' && (
                        <div className="bg-danger/5 border border-danger/20 rounded-2xl p-5 space-y-4">
                            <div className="flex items-start gap-3">
                                <WarningCircle size={22} weight="duotone" className="text-danger shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-sm font-semibold text-text-primary">AI Evaluation Complete — Review Period</p>
                                    <p className="text-xs text-text-secondary mt-1">
                                        The AI validators have reached consensus. If you disagree with the result,
                                        you can appeal to the Digital Jury during this window.
                                    </p>
                                </div>
                            </div>

                            {/* Appeal to Digital Jury Button — Micro-interaction */}
                            <button
                                onClick={handleAppeal}
                                className={clsx(
                                    'w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl',
                                    'bg-gradient-to-r from-danger to-red-600 text-white font-bold text-sm',
                                    'pulse-glow cursor-pointer',
                                    'hover:brightness-110 active:scale-[0.97] transition-all',
                                    'shadow-lg shadow-danger/30'
                                )}
                            >
                                <Gavel size={20} weight="bold" />
                                Appeal to Digital Jury
                            </button>
                        </div>
                    )}

                    {/* Pending State */}
                    {status === 'pending' && (
                        <div className="flex items-center gap-3 text-sm text-text-secondary">
                            <CircleNotch size={18} weight="bold" className="animate-spin text-primary" />
                            Waiting for validators...
                        </div>
                    )}

                    {/* Finalized State */}
                    {status === 'finalized' && (
                        <div className="flex items-center gap-3 text-sm text-success">
                            <ShieldCheck size={20} weight="duotone" />
                            Transaction finalized successfully.
                        </div>
                    )}

                    {/* Error */}
                    {error && (
                        <p className="text-xs text-danger bg-danger/10 border border-danger/20 rounded-lg px-3 py-2">
                            {error}
                        </p>
                    )}
                </div>
            )}
        </div>
    );
}
