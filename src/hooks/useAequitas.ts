import { useState, useEffect, useCallback } from 'react';
import { useAccount } from 'wagmi';
import { createAccount } from 'genlayer-js';
import { getGenLayerClient, getContractAddress, Project } from '@/lib/genlayer';

export function useAequitas() {
    const [treasury, setTreasury] = useState<string>('0');
    const [constitution, setConstitution] = useState<string>('');
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const contractAddress = getContractAddress();
    const client = getGenLayerClient();
    const { isConnected } = useAccount();

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            const addr = contractAddress as `0x${string}`;

            const [treasuryVal, constitutionVal, projectsJson] = await Promise.all([
                client.readContract({ address: addr, functionName: 'get_treasury', args: [] }),
                client.readContract({ address: addr, functionName: 'get_constitution', args: [] }),
                client.readContract({ address: addr, functionName: 'get_all_projects', args: [] }),
            ]);

            setTreasury(String(treasuryVal));
            setConstitution(String(constitutionVal));

            if (projectsJson) {
                const outer = JSON.parse(String(projectsJson)) as string[];
                setProjects(outer.map((p) => JSON.parse(p) as Project));
            }
            setError(null);
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : 'Failed to connect to GenLayer Studio';
            console.error('Failed to fetch contract data:', msg);
            setError(msg);
        } finally {
            setLoading(false);
        }
    }, [client, contractAddress]);

    useEffect(() => {
        if (contractAddress) fetchData();
    }, [fetchData, contractAddress]);

    const getSignerAccount = () => {
        if (!isConnected) {
            throw new Error('Please connect your wallet first to interact (UI check only, using throwaway key for GenLayer Studio compatibility)');
        }
        // MetaMask strictly blocks signing transactions sent to the Zero Address (which GenLayer uses).
        // For Studio compatibility, we generate a throwaway account here to sign the transaction,
        // while still enforcing that the user clicked "Connect Wallet" on the UI.
        return createAccount();
    };

    const evaluateProject = async (githubUrl: string, requestedFunds: string) => {
        const account = getSignerAccount();
        const txHash = await client.writeContract({
            address: contractAddress as `0x${string}`,
            functionName: 'evaluate_project',
            args: [githubUrl, BigInt(requestedFunds)],
            account,
            value: BigInt(0),
        });
        const receipt = await client.waitForTransactionReceipt({ hash: txHash });
        await fetchData();
        return receipt;
    };

    const depositFunds = async (amount: string) => {
        const account = getSignerAccount();
        const txHash = await client.writeContract({
            address: contractAddress as `0x${string}`,
            functionName: 'deposit_funds',
            args: [BigInt(amount)],
            account,
            value: BigInt(0),
        });
        const receipt = await client.waitForTransactionReceipt({ hash: txHash });
        await fetchData();
        return receipt;
    };

    return {
        treasury,
        constitution,
        projects,
        loading,
        error,
        evaluateProject,
        depositFunds,
        refresh: fetchData,
        isConnected,
    };
}
