// Placeholder AI service.
// In deployment, replace the generateDraft and summarizeText functions
// with calls to a real LLM provider (OpenAI, Claude, etc.).

export const generateDraft = async ({ type, inputs, caseContext }) => {
  const header = `DRAFT TYPE: ${type}\n\n`;
  const context = caseContext
    ? `Case: ${caseContext.caseNumber} - ${caseContext.title}\n\n`
    : "";
  const body = Object.entries(inputs || {})
    .map(([k, v]) => `${k.toUpperCase()}: ${v}`)
    .join("\n\n");

  return header + context + body + "\n\n-- Auto-generated legal draft (demo) --";
};

export const summarizeText = async (text) => {
  if (!text) return "";
  const maxLen = 400;
  const trimmed = text.length > maxLen ? `${text.slice(0, maxLen)}...` : text;
  return `Summary (auto-generated demo): ${trimmed}`;
};


