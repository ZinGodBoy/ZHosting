# ZHosting Release Checklist

## Before release

- [ ] Build/page smoke test
- [ ] JavaScript syntax validation
- [ ] Security audit
- [ ] Authentication test
- [ ] Account Center test
- [ ] Admin Center test
- [ ] Responsive test: 360px / 480px / 768px / 1024px / desktop
- [ ] Keyboard/focus accessibility test
- [ ] Reduced-motion test
- [ ] No plaintext passwords or secrets
- [ ] CSP/security metadata reviewed
- [ ] CHANGELOG updated
- [ ] README updated when product behavior changes
- [ ] Relevant docs updated

## Versioning

ZHosting follows Semantic Versioning:

- MAJOR — incompatible architecture/API changes
- MINOR — new backwards-compatible functionality
- PATCH — backwards-compatible fixes

Recommended milestones:

- v1.0.0 — initial product
- v1.1.0 — Account Center
- v1.2.0 — Authentication & Security
- v1.3.0 — Admin Center
- v1.4.0 — current frontend hardening/release preparation
- v2.0.0 — production backend architecture

## Release notes

Every release should summarize:
- Added
- Changed
- Fixed
- Security
- Documentation
- Known limitations

## v1.4.0 release candidate

- [x] Account Center regression pass.
- [x] Admin Center regression pass.
- [x] Trusted-device gate documented.
- [x] First-user admin auto-promotion removed.
- [x] Duplicate frontend runtime check completed.
- [x] Lifecycle-safe timer review completed.
- [x] Anchor/navigation hardening completed.
- [x] Documentation synchronized.
- [ ] Final browser smoke test on GitHub Pages.
- [ ] Verify GitHub Actions/security workflow.
- [ ] Create Git tag `v1.4.0` from final release commit.
