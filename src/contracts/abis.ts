/**
 * Minimal HTLC ABIs — only the functions a wallet actually needs:
 *   - withdraw(contractId, preimage)  → claim funds
 *   - refund(contractId)               → reclaim after timelock expires
 *   - getContract(contractId)          → read on-chain state
 *
 * Backend uses richer ABIs (with events for chain-watcher), but the
 * wallet only signs withdraw/refund and reads getContract for status —
 * lock txs are built and sent by the backend's mcpBuildLockCalldata flow.
 *
 * Source: cayman-hashlock/contracts/artifacts/ + forge-out/. Verified
 * against deployed bytecode on Etherscan (see ETHERSCAN_VERIFIED).
 */

export const HTLCEtherAbi = [
  {
    type: 'function',
    name: 'newContract',
    stateMutability: 'payable',
    inputs: [
      { name: '_receiver', type: 'address' },
      { name: '_hashlock', type: 'bytes32' },
      { name: '_timelock', type: 'uint256' },
    ],
    outputs: [{ name: 'contractId', type: 'bytes32' }],
  },
  {
    type: 'function',
    name: 'withdraw',
    stateMutability: 'nonpayable',
    inputs: [
      { name: '_contractId', type: 'bytes32' },
      { name: '_preimage', type: 'bytes32' },
    ],
    outputs: [],
  },
  {
    type: 'function',
    name: 'refund',
    stateMutability: 'nonpayable',
    inputs: [{ name: '_contractId', type: 'bytes32' }],
    outputs: [],
  },
  {
    type: 'function',
    name: 'getContract',
    stateMutability: 'view',
    inputs: [{ name: '_contractId', type: 'bytes32' }],
    outputs: [
      { name: 'sender', type: 'address' },
      { name: 'receiver', type: 'address' },
      { name: 'amount', type: 'uint256' },
      { name: 'hashlock', type: 'bytes32' },
      { name: 'timelock', type: 'uint256' },
      { name: 'withdrawn', type: 'bool' },
      { name: 'refunded', type: 'bool' },
      { name: 'preimage', type: 'bytes32' },
    ],
  },
] as const;

export const HTLCEtherFeeAbi = [
  {
    type: 'function',
    name: 'newContract',
    stateMutability: 'payable',
    inputs: [
      { name: '_receiver', type: 'address' },
      { name: '_hashlock', type: 'bytes32' },
      { name: '_timelock', type: 'uint256' },
      { name: '_feeRecipient', type: 'address' },
      { name: '_feeBps', type: 'uint16' },
      { name: '_rebateRecipient', type: 'address' },
      { name: '_rebateBps', type: 'uint16' },
    ],
    outputs: [{ name: 'contractId', type: 'bytes32' }],
  },
  {
    type: 'function',
    name: 'withdraw',
    stateMutability: 'nonpayable',
    inputs: [
      { name: '_contractId', type: 'bytes32' },
      { name: '_preimage', type: 'bytes32' },
    ],
    outputs: [],
  },
  {
    type: 'function',
    name: 'refund',
    stateMutability: 'nonpayable',
    inputs: [{ name: '_contractId', type: 'bytes32' }],
    outputs: [],
  },
] as const;

export const HTLCERC20FeeAbi = [
  {
    type: 'function',
    name: 'newContract',
    stateMutability: 'nonpayable',
    inputs: [
      { name: '_receiver', type: 'address' },
      { name: '_hashlock', type: 'bytes32' },
      { name: '_timelock', type: 'uint256' },
      { name: '_tokenContract', type: 'address' },
      { name: '_amount', type: 'uint256' },
      { name: '_feeRecipient', type: 'address' },
      { name: '_feeBps', type: 'uint16' },
      { name: '_rebateRecipient', type: 'address' },
      { name: '_rebateBps', type: 'uint16' },
    ],
    outputs: [{ name: 'contractId', type: 'bytes32' }],
  },
  {
    type: 'function',
    name: 'withdraw',
    stateMutability: 'nonpayable',
    inputs: [
      { name: '_contractId', type: 'bytes32' },
      { name: '_preimage', type: 'bytes32' },
    ],
    outputs: [],
  },
  {
    type: 'function',
    name: 'refund',
    stateMutability: 'nonpayable',
    inputs: [{ name: '_contractId', type: 'bytes32' }],
    outputs: [],
  },
] as const;

/** Standard ERC-20 view + transfer ABI for token balance fetching. */
export const ERC20Abi = [
  {
    type: 'function',
    name: 'balanceOf',
    stateMutability: 'view',
    inputs: [{ name: 'owner', type: 'address' }],
    outputs: [{ name: '', type: 'uint256' }],
  },
  {
    type: 'function',
    name: 'decimals',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ name: '', type: 'uint8' }],
  },
  {
    type: 'function',
    name: 'symbol',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ name: '', type: 'string' }],
  },
  {
    type: 'function',
    name: 'transfer',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'to', type: 'address' },
      { name: 'value', type: 'uint256' },
    ],
    outputs: [{ name: '', type: 'bool' }],
  },
  {
    type: 'function',
    name: 'approve',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'spender', type: 'address' },
      { name: 'value', type: 'uint256' },
    ],
    outputs: [{ name: '', type: 'bool' }],
  },
] as const;
