/**
 * Domain enums — kept in lock-step with cayman-hashlock/backend/shared/src/types/trading.ts.
 *
 * If you change a value here, the corresponding enum in the backend must
 * change too. The CI in cayman-hashlock asserts these stay aligned.
 */

export enum TradeStatus {
  PROPOSED = 'PROPOSED',
  ACCEPTED = 'ACCEPTED',
  FUNDING = 'FUNDING',
  FUNDED = 'FUNDED',
  INITIATOR_LOCKED = 'INITIATOR_LOCKED',
  BOTH_LOCKED = 'BOTH_LOCKED',
  EXECUTING = 'EXECUTING',
  SETTLING = 'SETTLING',
  COMPLETED = 'COMPLETED',
  REFUNDED = 'REFUNDED',
  FAILED = 'FAILED',
  CANCELLED = 'CANCELLED',
  EXPIRED = 'EXPIRED',
}

export enum RFQStatus {
  ACTIVE = 'ACTIVE',
  QUOTES_RECEIVED = 'QUOTES_RECEIVED',
  ACCEPTED = 'ACCEPTED',
  FILLED = 'FILLED',
  EXPIRED = 'EXPIRED',
  CANCELLED = 'CANCELLED',
}

export enum QuoteStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
  EXPIRED = 'EXPIRED',
}

export enum TradeSide {
  BUY = 'BUY',
  SELL = 'SELL',
}

export enum HTLCStatus {
  PENDING = 'PENDING',
  ACTIVE = 'ACTIVE',
  WITHDRAWN = 'WITHDRAWN',
  REFUNDED = 'REFUNDED',
  EXPIRED = 'EXPIRED',
  INVALIDATED = 'INVALIDATED',
  UNDER_FUNDED = 'UNDER_FUNDED',
}

export enum HTLCRole {
  INITIATOR = 'initiator',
  COUNTERPARTY = 'counterparty',
}

/**
 * The chain families Hashlock supports.
 *
 * Canonical wire form (DB column `htlcs.chain_type`, GraphQL String values,
 * trade-service writes): `'evm' | 'sui' | 'bitcoin'`.
 *
 * The string `'ethereum'` is NOT a wire value — it appears only in human-facing
 * labels. Code paths that read DB or GraphQL must accept `'evm'`.
 */
export type ChainType = 'evm' | 'sui' | 'bitcoin';

/** Coerce a possibly-pretty value back to the canonical wire form. */
export function normalizeChainType(input: string): ChainType {
  if (input === 'ethereum' || input === 'EVM' || input === 'evm') return 'evm';
  if (input === 'sui' || input === 'Sui' || input === 'SUI') return 'sui';
  if (input === 'bitcoin' || input === 'btc' || input === 'BTC' || input === 'Bitcoin') return 'bitcoin';
  throw new Error(`Unknown chain type: ${input}`);
}

/** Chain identifiers — numeric for EVM/Sui, sentinel ints for Bitcoin variants. */
export const CHAIN_IDS = {
  ETHEREUM_MAINNET: 1,
  ETHEREUM_SEPOLIA: 11155111,
  BITCOIN_MAINNET: 0,
  BITCOIN_SIGNET: -1,
  SUI_MAINNET: 784,
  SUI_TESTNET: 785,
} as const;

export type ChainId = (typeof CHAIN_IDS)[keyof typeof CHAIN_IDS];

export interface TokenPair {
  base: string;
  quote: string;
}

/**
 * Lightweight trade view — the shape mobile/web typically render.
 * Mirrors Trade in backend/shared/src/types/trading.ts but drops server-only
 * fields (createdBy resolver context, internal correlation IDs).
 */
export interface TradeView {
  id: string;
  rfqId: string;
  status: TradeStatus;
  baseToken: string;
  quoteToken: string;
  side: TradeSide;
  amount: string;
  price: string;
  hashlock?: string;
  timelock?: number;
  createdAt: string;
  updatedAt: string;
}

export interface QuoteView {
  id: string;
  rfqId: string;
  marketMakerId: string;
  price: string;
  amount: string;
  status: QuoteStatus;
  expiresAt: string | null;
  createdAt: string | null;
}

export interface RFQView {
  id: string;
  baseToken: string;
  quoteToken: string;
  side: TradeSide;
  amount: string;
  status: RFQStatus;
  expiresAt: string | null;
  createdAt: string;
}

/**
 * GraphQL-aligned aliases — the trade-service SDL uses bare names (Trade, Quote,
 * RFQ, Side, HTLC). These aliases let consumers `import { Trade } from '@hashlock-tech/shared-types'`
 * and stay shape-compatible with codegen output. See trade-service/src/schema.ts.
 */
export type Trade = TradeView;
export type Quote = QuoteView;
export type RFQ = RFQView;
export type Side = TradeSide;

/**
 * HTLC view — the row shape rendered by wallet/web for the htlcs table.
 * Mirrors backend/shared/src/types/trading.ts HTLC and the GraphQL HTLC type.
 */
export interface HTLC {
  id: string;
  tradeId: string;
  role: HTLCRole;
  status: HTLCStatus;
  chainType: ChainType;
  hashlock: string;
  timelock: number;
  amount: string;
  txHash?: string | null;
  preimage?: string | null;
  contractAddress?: string | null;
  createdAt: string;
  updatedAt: string;
}
