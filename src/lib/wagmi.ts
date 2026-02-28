import { http, createConfig } from 'wagmi'
import { injected } from 'wagmi/connectors'

export const studionet = {
    id: 61999,
    name: 'Genlayer Studio Network',
    nativeCurrency: { name: 'GenLayer', symbol: 'GL', decimals: 18 },
    rpcUrls: {
        default: { http: [process.env.NEXT_PUBLIC_RPC_URL || 'https://studio.genlayer.com/api'] },
    },
} as const;

export const config = createConfig({
    chains: [studionet],
    connectors: [
        injected(),
    ],
    transports: {
        [studionet.id]: http(),
    },
});
