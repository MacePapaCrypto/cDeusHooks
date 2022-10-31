import type { Result } from 'ethers/lib/utils';
import type { CDeus_abi } from '../../contract-types';
import { useDeusFunctionReader } from '../hooks';

export function useTotalAssets(): number | undefined {
    const totalAssetsReader = useDeusFunctionReader({
        functionName: 'totalAssets',
    });

    const totalAssets:
        | Awaited<ReturnType<CDeus_abi["totalAssets"]>>
        | Result
        | undefined = totalAssetsReader.data;
    
    if(!totalAssets) return undefined;

    return parseInt(totalAssets.toString()) as number;
}