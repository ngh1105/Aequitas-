'use client';
import { useAccount, useConnect, useDisconnect, useSwitchChain } from 'wagmi';
import { Wallet, Power, WarningCircle } from '@phosphor-icons/react';
import { studionet } from '@/lib/wagmi';

export function ConnectWallet() {
    const { address, isConnected, chain } = useAccount();
    const { connect, connectors, isPending } = useConnect();
    const { disconnect } = useDisconnect();
    const { switchChain } = useSwitchChain();

    const isWrongNetwork = chain && chain.id !== studionet.id;

    if (isConnected && address) {
        if (isWrongNetwork) {
            return (
                <button
                    onClick={() => switchChain({ chainId: studionet.id })}
                    className="flex items-center gap-2 px-4 py-2 bg-danger/10 border border-danger/30 hover:bg-danger/20 text-danger rounded-xl text-sm font-medium transition-colors"
                >
                    <WarningCircle size={18} weight="duotone" />
                    Switch to Studionet
                </button>
            );
        }

        return (
            <button
                onClick={() => disconnect()}
                className="flex items-center gap-2 px-4 py-2 bg-surface-glass border border-border hover:border-danger hover:text-danger rounded-xl text-sm font-medium transition-colors"
                title="Disconnect"
            >
                <Wallet size={18} weight="duotone" />
                <span className="font-mono">{`${address.slice(0, 6)}...${address.slice(-4)}`}</span>
                <Power size={14} className="ml-1 opacity-50" />
            </button>
        );
    }

    return (
        <button
            onClick={() => connect({ connector: connectors[0] })}
            disabled={isPending}
            className="flex items-center gap-2 px-5 py-2.5 bg-primary/10 border border-primary/20 hover:bg-primary/20 text-primary rounded-xl text-sm font-semibold transition-all hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] disabled:opacity-50"
        >
            <Wallet size={18} weight="duotone" />
            {isPending ? 'Connecting...' : 'Connect Wallet'}
        </button>
    );
}
