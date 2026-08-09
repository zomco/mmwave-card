import en from './languages/en.json';
import zhHans from './languages/zh-Hans.json';

const languages: Record<string, typeof en> = { en, 'zh-Hans': zhHans };

/** Language codes that ship with the card, in lookup order. */
export const SUPPORTED_LANGUAGES = Object.keys(languages);

/**
 * Look up a translated string.
 *
 * `params` fills `{name}` placeholders, which is what lets messages carrying a
 * value live in the JSON instead of being assembled in the component. Missing
 * keys fall back to the key itself so a typo is visible rather than blank.
 */
export function localize(key: string, lang?: string, params?: Record<string, unknown>): string {
  const language = lang ?? navigator.language?.split('-')[0] ?? 'en';
  const dict =
    languages[lang ?? ''] ?? Object.entries(languages).find(([k]) => k.startsWith(language))?.[1] ?? languages['en'];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let r: any = dict;
  for (const k of key.split('.')) {
    r = r?.[k];
    if (r === undefined) break;
  }
  // Fall back to English before falling back to the raw key, so a string that
  // has not been translated yet still reads as a sentence.
  if (typeof r !== 'string') {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let fallback: any = languages['en'];
    for (const k of key.split('.')) {
      fallback = fallback?.[k];
      if (fallback === undefined) break;
    }
    r = fallback;
  }
  if (typeof r !== 'string') return key;
  if (!params) return r;
  return r.replace(/\{(\w+)\}/g, (match, name) => (name in params ? String(params[name]) : match));
}

/**
 * Substrings that identify a radar entity, per concept, in every shipped
 * language. Entity auto-detection matches the entity_id and the integration's
 * own name first — both of which ESPHome emits in ASCII — and consults these
 * only as a fallback for radars whose YAML names the entities in the user's
 * own language.
 *
 * Sourced from the language files so adding a language adds its aliases too,
 * rather than requiring another hardcoded branch in the editor.
 */
export function entityAliases(concept: string): string[] {
  const out: string[] = [];
  for (const dict of Object.values(languages)) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const aliases = (dict as any)?.entity_aliases?.[concept];
    if (Array.isArray(aliases)) out.push(...aliases.map((a: unknown) => String(a).toLowerCase()));
  }
  return out;
}
