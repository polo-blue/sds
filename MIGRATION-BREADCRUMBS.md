# Migracja komponentu `Breadcrumbs` — uniwersalne propsy

> **BREAKING CHANGE** → bump major (np. `1.x` → `2.0.0`).
> Dotyczy konsumentów paczki `spoko-design-system` używających `Breadcrumbs`
> (m.in. `sale.polo.blue`, `catalog.polo.blue`).

## Co się zmieniło

Komponent przestał być związany z domeną produktu/marką i używa teraz
uniwersalnych nazw propsów.

| Przed (1.x) | Po (2.0) | Uwagi |
|-------------|----------|-------|
| `productNumber` | **`suffix`** | tekst doklejany po ostatnim okruszku (np. numer produktu) |
| _(zahardkodowany `Polo 6R` w `title`)_ | **`titlePrefix`** | opcjonalny prefiks tytułów linków; domyślnie `''` (brak) |
| _(zawsze `hidden sm:inline`)_ | **`hideOnMobile`** | `Array<'suffix' \| 'home' \| 'separators' \| 'trail'>`, domyślnie `['suffix']` |

### Pełna lista propsów po zmianie

| Prop | Typ | Domyślnie |
|------|-----|-----------|
| `breadcrumbs` | `Array<{ name: string; path: string }>` | — (wymagane) |
| `showBack` | `boolean` | `false` |
| `textBack` | `string` | `'Back'` |
| `showHome` | `boolean` | `false` |
| `suffix` | `string` | `undefined` |
| `titlePrefix` | `string` | `''` |
| `hideOnMobile` | `Array<'suffix' \| 'home' \| 'separators' \| 'trail'>` | `['suffix']` |
| `withMicrodata` | `boolean` | `true` |

## Jak zaktualizować konsumenta

### 1. Zmień nazwę propsa `productNumber` → `suffix`

W Vue atrybut był kebab-case (`product-number`), w Astro/JSX camelCase
(`productNumber`). Znajdź oba warianty:

```bash
# w repo konsumenta
grep -rEn "product-number|productNumber" src
```

**Przed:**
```vue
<Breadcrumbs
  :breadcrumbs="trail"
  product-number="6R0XXXXXX"
/>
```
```astro
<Breadcrumbs breadcrumbs={trail} productNumber="6R0XXXXXX" client:visible />
```

**Po:**
```vue
<Breadcrumbs
  :breadcrumbs="trail"
  suffix="6R0XXXXXX"
/>
```
```astro
<Breadcrumbs breadcrumbs={trail} suffix="6R0XXXXXX" client:visible />
```

### 2. (Opcjonalnie) Przywróć prefiks marki w tytułach linków

Wcześniej tytuły linków (`title="..."`) miały na sztywno prefiks `Polo 6R`.
Teraz domyślnie go nie ma. Jeśli zależy Ci na tym samym tekście tooltipów,
podaj `titlePrefix`:

```vue
<Breadcrumbs :breadcrumbs="trail" suffix="6R0XXXXXX" title-prefix="Polo 6R" />
```

### 3. Zachowanie na mobile bez zmian (domyślnie)

Domyślnie `hideOnMobile` to `['suffix']` — czyli suffix jest ukrywany poniżej
breakpointu `sm` (640px) i wraca od `sm` w górę, **dokładnie jak wcześniej**.
Nic nie trzeba robić, żeby zachować dotychczasowe zachowanie.

Jeśli chcesz to zmienić:

```vue
<!-- suffix widoczny też na mobile -->
<Breadcrumbs :breadcrumbs="trail" suffix="6R0XXXXXX" :hide-on-mobile="[]" />

<!-- ukryj na mobile także separatory i ikonę domu -->
<Breadcrumbs
  :breadcrumbs="trail"
  suffix="6R0XXXXXX"
  show-home
  :hide-on-mobile="['suffix', 'separators', 'home']"
/>

<!-- ukryj cały trail na mobile (zostaje np. tylko przycisk Back) -->
<Breadcrumbs :breadcrumbs="trail" show-back :hide-on-mobile="['trail']" />
```

Dozwolone wartości: `'suffix'`, `'home'`, `'separators'`, `'trail'`.

## Checklista PR w repo konsumenta

- [ ] `grep -rEn "product-number|productNumber"` — wszystkie wystąpienia w użyciach `Breadcrumbs` zamienione na `suffix`.
- [ ] (jeśli potrzebne) dodany `title-prefix` tam, gdzie tooltipy miały prefiks marki.
- [ ] zweryfikowane zachowanie na mobile (suffix ukryty domyślnie — bez zmian).
- [ ] bump wersji `spoko-design-system` do `^2.0.0` w `package.json`.
