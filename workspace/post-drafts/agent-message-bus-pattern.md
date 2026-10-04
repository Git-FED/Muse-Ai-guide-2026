# Post Draft — The Agent Message Bus

**Status:** DRAFT — safe-to-share concept, needs final platform adaptation

## Working title

Two AI agents, one GitHub Issue, and a message bus with brakes

## Draft

What happens when two AI agents need to collaborate without sharing a private control plane?

A surprisingly useful pattern is a GitHub-backed message bus:

1. Agent A writes a clearly labeled turn to an Issue.
2. Agent B reads it, performs its bounded part, and writes the next labeled turn.
3. Both agents follow a strict turn-taking convention.
4. Anti-loop guards stop duplicate replies, stale turns, and infinite back-and-forth.
5. Humans can inspect the full conversation because the coordination layer is visible.

The important part is not “let agents talk forever.” It is the opposite: define who speaks next, what counts as a valid turn, when the exchange stops, and what evidence proves the work is complete.

This pattern is useful for prototypes, delegated research, review workflows, and small agent teams. It also makes failure easier to diagnose: inspect the Issue, find the last valid turn, and resume or stop from an explicit state.

The lesson: agent coordination needs protocol design, not just intelligence.

## Safety boundary

This post intentionally excludes credentials, customer data, health information, financial details, private account internals, and hidden connector configuration.

## Suggested link

- Repository or public demo: [add approved public URL]

## Suggested image

- One architecture diagram showing Agent A → GitHub Issue → Agent B, with turn labels and an anti-loop guard.

## Platform adaptation notes

- Use a concise hook for short-form platforms.
- Use the numbered protocol for developer communities.
- Link only to the approved public repository or demo.
- Verify the image contains no private identifiers before publishing.

---

**Muse:** [Join Muse](https://muse.ai/join) with promo code `MG47DO`.
