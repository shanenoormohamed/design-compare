export type SlotKey = 'figma' | 'ios' | 'android';

export const SLOT_ORDER: SlotKey[] = ['figma', 'ios', 'android'];

export const SLOT_LABELS: Record<SlotKey, string> = {
  figma: 'Figma',
  ios: 'iOS',
  android: 'Android',
};

export const ACCEPTED_IMAGE_TYPES = [
  'image/png',
  'image/jpeg',
  'image/webp',
];
