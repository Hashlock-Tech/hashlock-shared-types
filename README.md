# @hashlock-tech/shared-types

TypeScript types, HTLC contract addresses + ABIs, and theme tokens shared across the Hashlock Markets ecosystem.

Consumers:

- [`Hashlock-Tech/cayman-hashlock`](https://github.com/Hashlock-Tech/hashlock-markets) — backend + web frontend
- [`Hashlock-Tech/hashlock-wallet`](https://github.com/Hashlock-Tech/hashlock-wallet) — self-custodial mobile wallet
- [`Hashlock-Tech/hashlock-mcp`](https://github.com/Hashlock-Tech/hashlock-mcp) — MCP server for AI agents

## Why this package exists

The wallet is a separate repository from the backend (different release cycle, App Store signing, mobile-specific tooling) but it has to agree with the backend on:

- Domain enums (`TradeStatus`, `HTLCStatus`, `RFQStatus`, `QuoteStatus`, etc.)
- HTLC contract addresses for every supported chain
- Platform fee + rebate constants
- Theme tokens (HUD palette, fonts, spacing) — the wallet uses the same visual language as the web app

Hosting this in one published package means a contract change is a versioned event everyone sees, instead of a silent drift between three repos.

## Source of truth

| Surface | Backend file | This package |
|---|---|---|
| Domain enums | `cayman-hashlock/backend/shared/src/types/trading.ts` | `src/domain.ts` |
| HTLC contract addresses | `cayman-hashlock/backend/shared/src/blockchain/registry.ts` | `src/contracts/index.ts` |
| Theme tokens | `cayman-hashlock/web/tailwind.config.ts` | `src/theme/index.ts` |

When the backend changes, bump this package's patch version and republish. The CI in `cayman-hashlock` enforces that enum string values match.

## Install

```bash
pnpm add @hashlock-tech/shared-types
```

## Usage

```ts
import { TradeStatus, HTLCStatus, ChainType, CHAIN_IDS } from '@hashlock-tech/shared-types';
import { HTLC_CONTRACTS, PLATFORM_FEE_BPS } from '@hashlock-tech/shared-types/contracts';
import { colors, fonts, space } from '@hashlock-tech/shared-types/theme';

const sepoliaHtlc = HTLC_CONTRACTS[CHAIN_IDS.ETHEREUM_SEPOLIA]?.etherFee;
```

## Publish

Maintainers only:

```bash
pnpm version patch       # or minor / major
git tag v$(jq -r .version package.json)
git push --tags
pnpm publish --access public
```

The git tag MUST exist before `pnpm publish` so `gitHead` in the published `package.json` resolves to the right commit (memory: `feedback_publish_tag_before_npm.md`).

## License

MIT — see [LICENSE](./LICENSE).
