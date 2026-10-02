# Ledger limits and overhead

The ledger is bookkeeping, not a telemetry instrument. It cannot see network traffic, model billing, or provider-side usage unless the person or integration supplies evidence.

## When it is worth using

Use it for a genuinely multi-step, data-sensitive job where action boundaries, permissions, downloads, uploads, or uncertainty matter. Do not use it for a short conversational answer where the bookkeeping would be more work than the task.

## Overhead model

The prompt and each ledger update add work. A rough accounting model is:

```text
ledger overhead ≈ setup prompt tokens
                 + (per-action log tokens × action count)
                 + (interim-report tokens × report count)
```

This project does not claim a universal percentage because tokenization, model, context compression, and reporting format vary. Measure the overhead in the same run if it matters: record prompt/output tokens for the audit run separately from network bytes, and compare against an otherwise equivalent run without the audit prompt.

The local ledger reduces repeated model bookkeeping after the page is open: the user can enter evidence directly and export CSV/JSON without asking an agent to narrate every row.

## Hard limits

- A blank byte field means **Unavailable**, not zero.
- **Estimated** requires a stated basis or calculation.
- **Reported** is not independently measured.
- Model tokens and network bytes must remain separate.
- A browser/PWA cannot promise complete traffic visibility without browser, proxy, server, connector, or provider telemetry.
