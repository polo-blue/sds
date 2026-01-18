# Plan migracji kolorów z base.css do UnoCSS

## Analiza obecnego stanu

### Kolory w base.css (hex)
| Zmienna CSS | Wartość HEX | Status |
|-------------|-------------|--------|
| `--clr-primary-300` | `#3572e3` | NIEUŻYWANA |
| `--clr-primary-400` | `#009adb` | używana (scrollbar, swiper, Headline) |
| `--clr-primary-500` | `#0f3170` | używana (.bg-primary) |
| `--clr-secondary-300` | `#8936e2` | NIEUŻYWANA |
| `--clr-secondary-400` | `#6319b3` | NIEUŻYWANA |
| `--clr-secondary-500` | `#3e1070` | NIEUŻYWANA |
| `--clr-accent-200` | `#f7a1a4` | NIEUŻYWANA |
| `--clr-accent-300` | `#e6656a` | NIEUŻYWANA |
| `--clr-accent-400` | `#db242a` | NIEUŻYWANA |
| `--clr-accent-500` | `#9a191d` | NIEUŻYWANA |

### Kolory w UnoCSS (uno-config/theme/colors.ts)
| Klucz | Wartość HEX |
|-------|-------------|
| `accent.light` | `#0099da` |
| `accent.default` | `#0087c1` |
| `blue.lightest` | `#3b82f6` |
| `blue.medium` | `#02307d` |
| `blue.darker` | `#001e50` |

## Mapowanie kolorów

| base.css | → | UnoCSS | Różnica |
|----------|---|--------|---------|
| `--clr-primary-400` (#009adb) | → | `accent.light` (#0099da) | ~1% |
| `--clr-primary-500` (#0f3170) | → | `blue.medium` (#02307d) | ~10% |
| `--clr-primary-300` (#3572e3) | → | `blue.lightest` (#3b82f6) | ~5% |

**Wniosek:** `accent.light` jest prawie identyczny z `--clr-primary-400` - można użyć bez zmian wizualnych.

## Błędy do naprawienia

`FaqItem.astro` używa niezdefiniowanych zmiennych:
- `--clr-primary-450` - nie istnieje!
- `--clr-primary-700` - nie istnieje!

## Plan migracji

### Krok 1: Naprawić FaqItem.astro
Zamienić niezdefiniowane zmienne na klasy UnoCSS:
- `color: var(--clr-primary-450)` → `class="text-accent-light"`
- `color: var(--clr-primary-700)` → `class="text-blue-medium"`

### Krok 2: Zrefaktorować Headline.vue
Zamienić:
```css
background-color: var(--headline-underline-accent, var(--clr-primary-400));
```
Na CSS variable z UnoCSS lub klasę.

### Krok 3: Przenieść style scrollbara do shortcuts
Stworzyć shortcut w UnoCSS zamiast CSS w base.css:
```typescript
// uno-config/theme/shortcuts/base.ts
'scrollbar-accent': 'scrollbar-thumb-accent-light scrollbar-track-black/10',
```

### Krok 4: Przenieść .bg-spoko, .bg-vw, .bg-primary do shortcuts
```typescript
// uno-config/theme/shortcuts/layout.ts
'bg-spoko': 'bg-gradient-radial from-accent-darker to-blue-darker text-white w-full',
'bg-vw': 'bg-gradient-radial from-accent-darker to-blue-darker text-white',
'bg-primary': 'bg-blue-medium',
```

### Krok 5: Wyczyścić base.css
Usunąć:
- Wszystkie `--clr-*` zmienne
- Wszystkie `--fs-*` zmienne (UnoCSS ma swoje)
- Klasy `.bg-spoko`, `.bg-vw`, `.bg-primary` (przeniesione do shortcuts)

Zostawić:
- Scrollbar styling (ale z klasami UnoCSS)
- Swiper variables
- Animacje `.fade-*`
- Font smoothing
- Print styles
- `.comma`, `.items` helper classes

### Krok 6: Zaktualizować dokumentację
Poinformować użytkowników, że:
- Kolory są teraz w UnoCSS theme
- Można je nadpisać przez `createSdsConfig({ theme: { colors: {...} } })`
- `base.css` jest opcjonalny dla projektów nie używających scrollbara/swipera

## Wynik końcowy

**Przed:**
- `base.css`: ~180 linii (z nieużywanymi kolorami)
- Konsumenci ładują wszystkie CSS variables

**Po:**
- `base.css`: ~60 linii (tylko niezbędne style)
- Konsumenci dostają tylko kolory których używają (tree-shaking UnoCSS)
- Możliwość łatwego nadpisania kolorów w `createSdsConfig()`

## Zmiany w plikach

1. `src/styles/base/base.css` - wyczyścić
2. `src/components/FaqItem.astro` - użyć klas UnoCSS
3. `src/components/Headline.vue` - użyć klas UnoCSS
4. `uno-config/theme/shortcuts/layout.ts` - dodać bg-spoko, bg-vw
5. `uno-config/theme/colors.ts` - bez zmian (kolory już są)
