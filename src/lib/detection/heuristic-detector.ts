const SCOPE_CREEP_KEYWORDS = [
  'can you also',
  'one more thing',
  'new feature',
  'additional',
  'could you add',
  'i also need',
  "while you're at it",
  'small change',
  'quick change',
  'modify',
  'extra',
  'update the scope',
  'new requirement',
  'different from what we discussed',
  'change request',
  'on top of',
  'another thing',
  'i forgot to mention',
  'we also need',
];

export function analyzeMessage(
  text: string,
  inScopeTaskTitles: string[]
): boolean {
  const lowerText = text.toLowerCase();
  const hasKeyword = SCOPE_CREEP_KEYWORDS.some((k) => lowerText.includes(k));

  if (!hasKeyword) return false;

  // Check if message overlaps with existing in-scope task titles
  const textWords = new Set(
    lowerText.replace(/[^a-z0-9\s]/g, '').split(/\s+/).filter((w) => w.length > 3)
  );

  for (const title of inScopeTaskTitles) {
    const titleWords = title
      .toLowerCase()
      .split(/\s+/)
      .filter((w) => w.length > 3);
    const overlap = titleWords.filter((w) => textWords.has(w)).length;

    if (overlap >= 2) return false; // Likely referring to existing task
  }

  return true;
}
