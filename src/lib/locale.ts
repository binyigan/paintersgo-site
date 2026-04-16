export const SUPPORTED_LOCALES = ["en", "zh"] as const;

export type Locale = (typeof SUPPORTED_LOCALES)[number];

export function resolveLocale(value: string | string[] | undefined): Locale {
  const raw = Array.isArray(value) ? value[0] : value;
  return raw === "zh" ? "zh" : "en";
}

export function withLocale(path: string, locale: Locale): string {
  const [withoutHash, hash] = path.split("#");
  const [pathname, query] = withoutHash.split("?");
  const params = new URLSearchParams(query ?? "");

  if (locale === "zh") {
    params.set("lang", "zh");
  } else {
    params.delete("lang");
  }

  const nextQuery = params.toString();
  const nextPath = nextQuery ? `${pathname}?${nextQuery}` : pathname;
  return hash ? `${nextPath}#${hash}` : nextPath;
}
