'use client';

import { useState } from 'react';
import { PaperPlaneTilt, GithubLogo, CurrencyEth, CircleNotch } from '@phosphor-icons/react';
import { clsx } from 'clsx';

interface SubmitFormProps {
    onSubmit: (githubUrl: string, requestedFunds: string) => Promise<void>;
    disabled?: boolean;
}

export function SubmitForm({ onSubmit, disabled }: SubmitFormProps) {
    const [githubUrl, setGithubUrl] = useState('');
    const [requestedFunds, setRequestedFunds] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!githubUrl || !requestedFunds) return;
        setError(null);
        setSubmitting(true);
        try {
            await onSubmit(githubUrl, requestedFunds);
            setGithubUrl('');
            setRequestedFunds('');
        } catch (err: any) {
            setError(err.message || 'Transaction failed');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="glass-card p-6 space-y-5">
            <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <PaperPlaneTilt size={18} weight="duotone" className="text-primary" />
                </div>
                <h2 className="text-sm font-semibold uppercase tracking-wider text-text-muted font-heading">
                    Apply for Funding
                </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* GitHub URL */}
                <div className="space-y-1.5">
                    <label className="text-[11px] uppercase tracking-widest text-text-muted font-semibold flex items-center gap-1.5">
                        <GithubLogo size={12} weight="bold" /> Repository URL
                    </label>
                    <input
                        type="url"
                        placeholder="https://github.com/org/repo"
                        value={githubUrl}
                        onChange={(e) => setGithubUrl(e.target.value)}
                        className="w-full bg-black/40 border border-border rounded-xl px-4 py-3 text-sm text-text-primary placeholder:text-text-muted/50 transition-all"
                        required
                        disabled={submitting || disabled}
                    />
                </div>

                {/* Requested Funds */}
                <div className="space-y-1.5">
                    <label className="text-[11px] uppercase tracking-widest text-text-muted font-semibold flex items-center gap-1.5">
                        <CurrencyEth size={12} weight="bold" /> Requested Funds (GEN)
                    </label>
                    <input
                        type="number"
                        placeholder="e.g. 10000"
                        value={requestedFunds}
                        onChange={(e) => setRequestedFunds(e.target.value)}
                        className="w-full bg-black/40 border border-border rounded-xl px-4 py-3 text-sm text-text-primary placeholder:text-text-muted/50 transition-all"
                        required
                        min="1"
                        disabled={submitting || disabled}
                    />
                </div>

                {/* Error */}
                {error && (
                    <p className="text-xs text-danger bg-danger/10 border border-danger/20 rounded-lg px-3 py-2">{error}</p>
                )}

                {/* Submit */}
                <button
                    type="submit"
                    disabled={submitting || disabled || !githubUrl || !requestedFunds}
                    className={clsx(
                        'w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm',
                        'bg-gradient-to-r from-primary to-secondary text-white',
                        'shadow-lg shadow-primary/20',
                        'hover:shadow-primary/30 hover:brightness-110',
                        'active:scale-[0.98] transition-all cursor-pointer',
                        'disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100'
                    )}
                >
                    {submitting ? (
                        <>
                            <CircleNotch size={18} weight="bold" className="animate-spin" />
                            AI Validators Analyzing...
                        </>
                    ) : (
                        <>
                            <PaperPlaneTilt size={18} weight="bold" />
                            Submit for Evaluation
                        </>
                    )}
                </button>
            </form>
        </div>
    );
}
