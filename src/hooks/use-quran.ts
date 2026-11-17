/**
 * TanStack React Query hooks for Holy Quran
 */

import { QuranService } from '@/src/services/api/quran-service';
import {
  JuzMeta,
  LastReadMeta,
  SurahMeta,
  VerseItem,
} from '@/src/types/quran';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const QURAN_QUERY_KEYS = {
  all: ['quran'] as const,
  surahs: () => [...QURAN_QUERY_KEYS.all, 'surahs'] as const,
  verses: (surahNumber: number) => [...QURAN_QUERY_KEYS.all, 'verses', surahNumber] as const,
  juzList: () => [...QURAN_QUERY_KEYS.all, 'juz'] as const,
  favorites: () => [...QURAN_QUERY_KEYS.all, 'favorites'] as const,
  lastRead: () => [...QURAN_QUERY_KEYS.all, 'lastRead'] as const,
};

/**
 * Fetch all 114 Surahs
 */
export const useSurahsQuery = () => {
  return useQuery<SurahMeta[], Error>({
    queryKey: QURAN_QUERY_KEYS.surahs(),
    queryFn: () => QuranService.getAllSurahs(),
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    retry: 2,
  });
};

/**
 * Fetch Verses for a given Surah
 */
export const useSurahVersesQuery = (surahNumber: number) => {
  return useQuery<VerseItem[], Error>({
    queryKey: QURAN_QUERY_KEYS.verses(surahNumber),
    queryFn: () => QuranService.getSurahVerses(surahNumber),
    staleTime: 1000 * 60 * 60 * 12, // 12 hours
    enabled: Boolean(surahNumber),
    retry: 2,
  });
};

/**
 * Fetch 30 Juz Breakdown
 */
export const useJuzQuery = () => {
  return useQuery<JuzMeta[], Error>({
    queryKey: QURAN_QUERY_KEYS.juzList(),
    queryFn: () => QuranService.getJuzList(),
    staleTime: 1000 * 60 * 60 * 24,
  });
};

/**
 * Fetch Favorite Surah Numbers
 */
export const useQuranFavoritesQuery = () => {
  return useQuery<number[], Error>({
    queryKey: QURAN_QUERY_KEYS.favorites(),
    queryFn: () => QuranService.getFavorites(),
  });
};

/**
 * Toggle Favorite Surah
 */
export const useToggleQuranFavoriteMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<number[], Error, number>({
    mutationFn: (surahNumber: number) => QuranService.toggleFavorite(surahNumber),
    onSuccess: (updated) => {
      queryClient.setQueryData(QURAN_QUERY_KEYS.favorites(), updated);
    },
  });
};

/**
 * Fetch Last Read Position
 */
export const useLastReadQuery = () => {
  return useQuery<LastReadMeta | null, Error>({
    queryKey: QURAN_QUERY_KEYS.lastRead(),
    queryFn: () => QuranService.getLastRead(),
  });
};

/**
 * Update Last Read Position
 */
export const useUpdateLastReadMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<LastReadMeta, Error, Partial<LastReadMeta>>({
    mutationFn: (meta) => QuranService.saveLastRead(meta),
    onSuccess: (updated) => {
      queryClient.setQueryData(QURAN_QUERY_KEYS.lastRead(), updated);
    },
  });
};

/**
 * Log pages read to backend tracker
 */
export const useLogQuranPagesMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (pagesRead: number) => QuranService.logPagesRead(pagesRead),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tracker', 'today'] });
    },
  });
};
