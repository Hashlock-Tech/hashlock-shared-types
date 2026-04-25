/**
 * HTLC contract addresses for every supported chain.
 *
 * Source of truth: cayman-hashlock/backend/shared/src/blockchain/registry.ts
 * + the Move package + Bitcoin script template.
 *
 * If a contract is redeployed, bump the package patch version.
 */

import type { ChainId } from '../domain.js';

export * from './abis.js';

export interface HTLCContractSet {
  /** Native asset HTLC, no fee — mainly testnet/legacy paths */
  ether?: `0x${string}`;
  /** Native asset HTLC with platform fee + rebate split */
  etherFee?: `0x${string}`;
  /** ERC20 HTLC with platform fee + rebate split */
  erc20Fee?: `0x${string}`;
  /** Sui Move package id (for Sui chains) */
  suiPackage?: `0x${string}`;
}

export const HTLC_CONTRACTS: Partial<Record<ChainId, HTLCContractSet>> = {
  // Ethereum mainnet — deployed 2026-04-09, Etherscan-verified.
  // Source: cayman-hashlock/contracts/deployments-mainnet.json
  1: {
    ether: '0x0CEDC56b17d714dA044954EE26F38e90eC10434A',
    etherFee: '0xfBAEA1423b5FBeCE89998da6820902fD8f159014',
    erc20Fee: '0x4B65490D140Bab3DB828C2386e21646Ed8c4D072',
  },
  // Sepolia testnet — same address triplet as mainnet for the no-fee Ether
  // contract since both used the canonical OpenZeppelin HTLC source.
  // Source: cayman-hashlock/.env.sepolia
  11155111: {
    ether: '0x99d56A8E9A4618ACcD21072e96804Bf19f96e699',
    erc20Fee: '0x150e6cf129430de2a0F063aaE43CAd64dC797EE7',
  },
  // Sui testnet — Move package id v2 (current production)
  784: {
    suiPackage: '0xfbefe54260dcf55a6f74beebab11eb2fd2e879284b94ba8a15dc78b5115e4c69',
  },
};

/** Treasury that collects platform fees on Ethereum mainnet. */
export const FEE_COLLECTOR_MAINNET = '0x5E28e1307479186a02Ad85E0b880126e27a7530C' as const;

/** Platform fee in basis points (7 bps = 0.07%) */
export const PLATFORM_FEE_BPS = 7;

/** Maximum rebate to the trader, in basis points of the platform fee (50%) */
export const MAX_REBATE_BPS = 5000;

/** Etherscan verification links for the mainnet contracts. */
export const ETHERSCAN_VERIFIED = {
  HashedTimelockEther: 'https://etherscan.io/address/0x0cedc56b17d714da044954ee26f38e90ec10434a',
  HashedTimelockEtherFee: 'https://etherscan.io/address/0xfbaea1423b5fbece89998da6820902fd8f159014',
  HashedTimelockERC20Fee: 'https://etherscan.io/address/0x4b65490d140bab3db828c2386e21646ed8c4d072',
} as const;
