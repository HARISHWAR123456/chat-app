// Generates deterministic gradient backgrounds and initials for avatars

const GRADIENTS = [
  "linear-gradient(135deg, #6366f1 0%, #a855f7 100%)", // Indigo -> Purple
  "linear-gradient(135deg, #3b82f6 0%, #2dd4bf 100%)", // Blue -> Teal
  "linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)", // Pink -> Violet
  "linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)", // Amber -> Red
  "linear-gradient(135deg, #10b981 0%, #06b6d4 100%)", // Emerald -> Cyan
  "linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)", // Violet -> Pink
  "linear-gradient(135deg, #0284c7 0%, #6366f1 100%)", // Sky -> Indigo
  "linear-gradient(135deg, #f43f5e 0%, #fb923c 100%)", // Rose -> Orange
];

export function getAvatarGradient(seed?: string | number | null): string {
  if (!seed) return GRADIENTS[0];
  const str = String(seed);
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  const index = Math.abs(hash) % GRADIENTS.length;
  return GRADIENTS[index];
}

export function getInitials(name?: string | null): string {
  if (!name || !name.trim()) return "?";
  const trimmed = name.trim();
  const parts = trimmed.split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return trimmed.slice(0, 2).toUpperCase();
}
