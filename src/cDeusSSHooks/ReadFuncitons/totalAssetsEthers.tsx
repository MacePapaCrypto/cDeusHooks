import { ethers } from 'ethers';

export const totalAssetsEthers = async (cDeusSSContract:ethers.Contract) => {
    try {
        const totalAssetsReturned = await cDeusSSContract.totalAssets();
        return totalAssetsReturned.toString();
    } catch(error) {
        return console.log(error);
    }
}