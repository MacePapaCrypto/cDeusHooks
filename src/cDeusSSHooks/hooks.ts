import { useContract, useContractRead, useContractWrite } from 'wagmi';
import { CONTRACT_ADDRESS } from '../constants';
import cDeusAbi from '../contractABIs/cDeus_abi.json';
import type { CDeus_abi } from '../contract-types';

export function useCDeusContract(): CDeus_abi {
    const contract = useContract({
        address: CONTRACT_ADDRESS,
        abi: cDeusAbi
    });

    return contract as CDeus_abi;
}

export function useDeusFunctionWriter(
  functionName: string
): ReturnType<typeof useContractWrite> {
  /*const { config } = usePrepareContractWrite({
    address: CONTRACT_ADDRESS,
    abi: cDeusAbi,
    functionName: functionName,
  });*/

  const contractWrite = useContractWrite({
    mode: 'recklesslyUnprepared',
    address: CONTRACT_ADDRESS,
    abi: cDeusAbi,
    functionName: functionName
  });

  return contractWrite;
}

export interface UseDeusFunctionReaderProps {
  functionName: string;
  args?: any[];
}

export function useDeusFunctionReader({
    functionName,
    args,
  }: UseDeusFunctionReaderProps): ReturnType<typeof useContractRead> {
    const contractRead = useContractRead({
      address: CONTRACT_ADDRESS,
      abi: cDeusAbi,
      functionName: functionName,
      args: args,
      watch: true,
    });
   
    return contractRead;
}