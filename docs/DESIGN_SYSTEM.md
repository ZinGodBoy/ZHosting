# ZHosting Design System

## 1. Typography

### Body

```text
Inter
```

Dùng cho:

- Paragraph.
- Form.
- Navigation.
- Metadata.
- Button.
- Utility text.

### Display

```text
Space Grotesk
```

Dùng cho:

- H1/H2/H3.
- Brand.
- Price.
- Dashboard headings.
- Important numeric values.

## 2. Color tokens

| Token | Purpose |
|---|---|
| `--bg` | Main background |
| `--panel` | Surface |
| `--line` | Border |
| `--text` | Primary text |
| `--muted` | Secondary text |
| `--cyan` | Primary accent |
| `--blue` | Secondary accent |
| `--green` | Operational/success |

## 3. Shape

- Large cards: ~22px radius.
- Controls: ~10–14px radius.
- Pills: 999px.
- Buttons: rounded, compact and high contrast.

## 4. Motion

Motion tokens:

- Fast: ~180ms.
- Normal: ~280ms.
- Slow: ~650ms.

Timing function:

```css
cubic-bezier(.2,.8,.2,1)
```

Spring-like UI:

```css
cubic-bezier(.16,1,.3,1)
```

## 5. Interaction principles

- Hover should communicate affordance.
- Focus must remain visible.
- Destructive actions should be clearly separated.
- Loading must not look like failure.
- Error state must explain the next action.
- Mobile interaction must not depend only on hover.

## 6. Animation

Shared animation lives in:

```text
assets/css/ui.css
assets/js/ui.js
```

Available patterns include:

- Reveal.
- Stagger.
- Ripple.
- Spotlight.
- Glow.
- Tilt.
- Toast.
- Modal.
- Logout transition.
- Password strength.

## 7. Accessibility

Minimum expectations:

- Semantic elements.
- Visible focus.
- Keyboard operation.
- Labels for inputs.
- `aria-label` where visual-only controls need names.
- Reduced-motion fallback.
- Readable contrast.

## 8. Responsive breakpoints

Design should be validated at:

- Desktop: >= 1200px.
- Tablet: ~768–1199px.
- Mobile: <= 767px.

## 9. Content style

ZHosting voice:

- Technical.
- Clear.
- Short.
- Confident without overclaiming.
- Avoid fake production claims.

Ví dụ:

Tốt:

> “Giao diện sẵn sàng kết nối API monitoring.”

Không nên:

> “Hệ thống có 99.99% uptime thật.”

nếu backend monitoring chưa tồn tại.
