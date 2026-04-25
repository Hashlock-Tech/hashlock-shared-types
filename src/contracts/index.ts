/**
 * HTLC contract addresses for every supported chain.
 *
 * Source of truth: cayman-hashlock/backend/shared/src/blockchain/registry.ts
 * + the Move package + Bitcoin script template.
 *
 * If a contract is redeployed, bump the package patch version.
 */

import type { ChainId } from '../domain.js';

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
  // EVM mainnet — production-deployed 2026-04-09 (memory: project_mainnet_deployment.md)
  1: {
    ether: '0x0000000000000000000000000000000000000000',     // TODO: paste mainnet address
    etherFee: '0x0000000000000000000000000000000000000000',
    erc20Fee: '0x0000000000000000000000000000000000000000',
  },
  11155111: {
    ether: '0x0000000000000000000000000000000000000000',     // TODO: Sepolia HTLC
    etherFee: '0x0000000000000000000000000000000000000000',
    erc20Fee: '0x0000000000000000000000000000000000000000',
  },
  784: {
    suiPackage: '0x0000000000000000000000000000000000000000000000000000000000000000',
  },
};

/** Platform fee in basis points (7 bps = 0.07%) */
export const PLATFORM_FEE_BPS = 7;

/** Maximum rebate to the trader, in basis points of the platform fee */
export const MAX_REBATE_BPS = 5000; // 50%

export type {} from '../domain.js';
