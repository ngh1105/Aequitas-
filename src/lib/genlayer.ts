import { createClient, chains } from 'genlayer-js';

const rpcUrl = process.env.NEXT_PUBLIC_RPC_URL || 'https://studio.genlayer.com/api';
const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as string;

type Client = ReturnType<typeof createClient>;
let client: Client | null = null;

export const getGenLayerClient = () => {
    if (!client) {
        client = createClient({
            chain: chains.studionet,
            endpoint: rpcUrl,
        });
    }
    return client;
};

export const createWalletClient = (address: string, provider: any) => {
    return createClient({
        chain: chains.studionet,
        endpoint: rpcUrl,
        account: address as `0x${string}`,
        provider,
    });
};

export const getContractAddress = () => contractAddress;

// Interface for project data returned by the contract
export interface Project {
    project_id: string;
    applicant: string;
    github_url: string;
    requested_funds: string;
    approved_funds: string;
    impact_score: number;
    status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'PARSE_ERROR';
}
