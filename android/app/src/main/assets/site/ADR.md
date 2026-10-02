# Architecture decision record

## ADR-001: Static-first delivery

The public site remains static so it is easy to inspect, deploy to GitHub Pages, and run without a backend. Dynamic payment controls are loaded only after the browser age gate.

## ADR-002: Evidence labels

Usage values must be labeled measured, reported, estimated, or unavailable; the system must not manufacture precision.
