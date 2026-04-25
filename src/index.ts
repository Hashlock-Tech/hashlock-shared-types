/**
 * @hashlock-tech/shared-types
 *
 * Types and constants shared between Hashlock Markets backend, web, and the
 * Hashlock Wallet mobile app. This package is the contract surface — adding
 * a field here is a versioning event for every consumer.
 *
 * Source of truth: cayman-hashlock/backend/shared/src/types/. This package
 * republishes the subset that mobile + external integrations need, stripped
 * of server-only dependencies (no `pg`, no `redis`, no `zod`).
 */

export * from './domain.js';
export * from './contracts/index.js';
export * from './theme/index.js';
