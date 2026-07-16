# Security Policy

## Reporting a vulnerability

If you discover a security vulnerability in KeyMap, please report it privately
rather than opening a public issue.

- Use GitHub's **[Private vulnerability reporting](../../security/advisories/new)**
  (Security tab → "Report a vulnerability"), or
- Contact the maintainer via [github.com/KumarDeepak16](https://github.com/KumarDeepak16).

Please include:

- a description of the vulnerability and its impact,
- steps to reproduce (proof of concept if possible),
- affected version or commit.

You can expect an acknowledgement within a few days. Please give us reasonable
time to address the issue before any public disclosure.

## Scope

KeyMap is a static, client-side reference site. It stores only your OS/theme
preference, favorites, and recently-viewed apps in your browser's
`localStorage` — no accounts, no server-side user data, no tracking. The most
relevant classes of issues are therefore XSS, dependency vulnerabilities, and
build/supply-chain concerns.

Thank you for helping keep KeyMap and its users safe.
