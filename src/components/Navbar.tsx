'use client';

import { Scales, GithubLogo, ArrowsClockwise } from '@phosphor-icons/react';
import { clsx } from 'clsx';
import { ConnectWallet } from '@/components/ConnectWallet';

interface NavbarProps {
    onRefresh?: () => void;
    loading?: boolean;
}

export function Navbar({ onRefresh, loading }: NavbarProps) {
    return (
        <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-xl">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                        <Scales size={20} weight="bold" className="text-white" />
                    </div>
                    <div>
                        <h1 className="text-lg font-bold font-heading tracking-tight gradient-text">AEQUITAS</h1>
                        <p className="text-[10px] uppercase tracking-[0.2em] text-text-muted -mt-0.5">RetroPGF Network</p>
                    </div>
                </div>

                {/* Right Controls */}
                <div className="flex items-center gap-4">
                    <a
                        href="https://github.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-text-muted hover:text-text-primary transition-colors cursor-pointer"
                    >
                        <GithubLogo size={22} weight="light" />
                    </a>
                    <button
                        onClick={onRefresh}
                        disabled={loading}
                        className={clsx(
                            'flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium',
                            'bg-white/5 border border-border hover:border-border-hover hover:bg-white/8',
                            'transition-all cursor-pointer disabled:opacity-50'
                        )}
                    >
                        <ArrowsClockwise
                            size={16}
                            weight="bold"
                            className={clsx(loading && 'animate-spin')}
                        />
                        Sync
                    </button>
                    <ConnectWallet />
                </div>
            </div>
        </nav>
    );
}
