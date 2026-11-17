/**
 * Types for Tasbih Counter
 */

export interface DhikrDefinition {
  id: string;
  arabic: string;
  transliteration: string;
  translation: string;
  defaultTarget?: number;
}

export interface TasbihState {
  counts: Record<string, number>;
  selectedDhikrId: string;
  target: number; // 33, 99, 100, or 0 for free count
  soundEnabled: boolean;
  vibrationEnabled: boolean;
}

export const PRESET_DHIKRS: DhikrDefinition[] = [
  {
    id: '1',
    arabic: 'سُبْحَانَ اللَّهِ',
    transliteration: 'Subhanallah',
    translation: 'Glory be to Allah',
    defaultTarget: 33,
  },
  {
    id: '2',
    arabic: 'الْحَمْدُ لِلَّهِ',
    transliteration: 'Alhamdulillah',
    translation: 'Praise be to Allah',
    defaultTarget: 33,
  },
  {
    id: '3',
    arabic: 'اللَّهُ أَكْبَرُ',
    transliteration: 'Allahu Akbar',
    translation: 'Allah is the Greatest',
    defaultTarget: 34,
  },
  {
    id: '4',
    arabic: 'أَسْتَغْفِرُ اللَّهَ',
    transliteration: 'Astaghfirullah',
    translation: 'I seek forgiveness from Allah',
    defaultTarget: 100,
  },
  {
    id: '5',
    arabic: 'لَا إِلَهَ إِلَّا اللَّهُ',
    transliteration: 'La ilaha illallah',
    translation: 'There is no god but Allah',
    defaultTarget: 100,
  },
  {
    id: '6',
    arabic: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ',
    transliteration: 'Subhanallahi wa bihamdihi',
    translation: 'Glory and praise be to Allah',
    defaultTarget: 100,
  },
  {
    id: '7',
    arabic: 'لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ',
    transliteration: 'La hawla wa la quwwata illa billah',
    translation: 'There is no power nor might except with Allah',
    defaultTarget: 100,
  },
];

