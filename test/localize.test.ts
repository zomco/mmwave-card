import { describe, expect, it } from 'vitest';

import { SUPPORTED_LANGUAGES, entityAliases, localize } from '../src/localize/localize';
import en from '../src/localize/languages/en.json';
import zhHans from '../src/localize/languages/zh-Hans.json';

/** Flatten a language file to dotted key paths, ignoring alias arrays. */
function keys(obj: unknown, prefix = ''): string[] {
  if (typeof obj !== 'object' || obj === null || Array.isArray(obj)) return [prefix];
  return Object.entries(obj).flatMap(([k, v]) => keys(v, prefix ? `${prefix}.${k}` : k));
}

describe('language files', () => {
  it('ship both supported languages', () => {
    expect(SUPPORTED_LANGUAGES).toEqual(expect.arrayContaining(['en', 'zh-Hans']));
  });

  it('have identical key sets', () => {
    // The editor used to inline both languages at each call site, so drift was
    // impossible but a third language was too. Now that the strings live here,
    // a missing key is the failure mode worth guarding.
    const e = keys(en).sort();
    const z = keys(zhHans).sort();
    expect(z.filter((k) => !e.includes(k))).toEqual([]);
    expect(e.filter((k) => !z.includes(k))).toEqual([]);
  });

  it('have no empty strings', () => {
    const walk = (obj: unknown, path = ''): string[] => {
      if (typeof obj === 'string') return obj.trim() ? [] : [path];
      if (Array.isArray(obj)) return obj.flatMap((v, i) => walk(v, `${path}[${i}]`));
      if (obj && typeof obj === 'object')
        return Object.entries(obj).flatMap(([k, v]) => walk(v, path ? `${path}.${k}` : k));
      return [];
    };
    expect(walk(en)).toEqual([]);
    expect(walk(zhHans)).toEqual([]);
  });

  it('never use a placeholder the caller does not supply', () => {
    // English is the reference because the extraction derived the parameter
    // list from the English literal. A translation may legitimately use fewer
    // placeholders — "{n} target{s}" needs a pluralisation slot that "{n} 个目标"
    // does not — but one the caller never passes would render as a literal
    // "{p1}" on screen.
    const placeholders = (s: string) => new Set(s.match(/\{\w+\}/g) ?? []);
    const walk = (a: unknown, b: unknown, path = ''): void => {
      if (typeof a === 'string' && typeof b === 'string') {
        const extra = [...placeholders(b)].filter((p) => !placeholders(a).has(p));
        expect(extra, `${path} uses placeholders English does not supply`).toEqual([]);
        return;
      }
      if (a && b && typeof a === 'object' && typeof b === 'object' && !Array.isArray(a)) {
        for (const k of Object.keys(a)) walk((a as never)[k], (b as never)[k], path ? `${path}.${k}` : k);
      }
    };
    walk(en, zhHans);
  });

  it('never leave a captured expression in place of a literal', () => {
    // The extraction that moved these strings out of the components read the
    // literal arguments of a two-language helper. A call whose arguments were
    // variables rather than literals would capture the expression text —
    // "label[1]" — and silently freeze a dynamic lookup into one constant.
    const suspicious: string[] = [];
    const walk = (obj: unknown, path = ''): void => {
      if (typeof obj === 'string') {
        if (/^[A-Za-z_$][\w$]*(\[|\.\w|\()/.test(obj)) suspicious.push(`${path} => ${obj}`);
        return;
      }
      if (obj && typeof obj === 'object' && !Array.isArray(obj)) {
        for (const [k, v] of Object.entries(obj)) walk(v, path ? `${path}.${k}` : k);
      }
    };
    walk(en);
    walk(zhHans);
    expect(suspicious).toEqual([]);
  });
});

describe('localize', () => {
  it('resolves a key in each language', () => {
    expect(localize('editor.operating_mode', 'en')).toBe('Operating mode');
    expect(localize('editor.operating_mode', 'zh-Hans')).not.toBe('Operating mode');
  });

  it('matches a language by prefix', () => {
    expect(localize('editor.operating_mode', 'zh')).toBe(localize('editor.operating_mode', 'zh-Hans'));
    expect(localize('editor.operating_mode', 'en-GB')).toBe(localize('editor.operating_mode', 'en'));
  });

  it('falls back to English for an unknown language rather than to the key', () => {
    expect(localize('editor.operating_mode', 'de')).toBe('Operating mode');
  });

  it('returns the key itself when it does not exist, so a typo is visible', () => {
    expect(localize('editor.no_such_key_here', 'en')).toBe('editor.no_such_key_here');
  });

  it('interpolates named parameters', () => {
    const out = localize('editor.imported_p0_revision_p1', 'en', { p0: 'Kitchen', p1: 7 });
    expect(out).toContain('Kitchen');
    expect(out).toContain('7');
    expect(out).not.toContain('{p0}');
  });

  it('leaves unknown placeholders untouched instead of printing undefined', () => {
    expect(localize('editor.imported_p0_revision_p1', 'en', { p0: 'Kitchen' })).toContain('{p1}');
  });

  it('interpolates in every language', () => {
    const zh = localize('editor.imported_p0_revision_p1', 'zh-Hans', { p0: 'Kitchen', p1: 7 });
    expect(zh).toContain('Kitchen');
    expect(zh).not.toContain('{p0}');
  });
});

describe('entityAliases', () => {
  it('collects aliases from every shipped language', () => {
    const distance = entityAliases('distance');
    expect(distance).toContain('distance');
    // The Chinese alias must be reachable without the editor hardcoding it.
    expect(distance.length).toBeGreaterThan(1);
  });

  it('is lowercased so callers can match case-insensitively', () => {
    for (const concept of ['distance', 'motion_state', 'polygon']) {
      for (const alias of entityAliases(concept)) expect(alias).toBe(alias.toLowerCase());
    }
  });

  it('returns an empty list for an unknown concept', () => {
    expect(entityAliases('teleporter')).toEqual([]);
  });

  it('covers the concepts the editor asks for', () => {
    for (const concept of ['distance', 'motion_state', 'polygon']) {
      expect(entityAliases(concept).length, `no aliases for ${concept}`).toBeGreaterThan(0);
    }
  });
});
