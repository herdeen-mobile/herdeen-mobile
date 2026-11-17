/**
 * TanStack React Query hooks for Authentic Hisn al-Muslim Adhkar
 */

import { AdhkarService } from '@/src/services/api/adhkar-service';
import {
  AdhkarCategory,
  AdhkarChapter,
  AdhkarChapterMeta,
} from '@/src/types/adhkar';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const ADHKAR_QUERY_KEYS = {
  all: ['adhkar'] as const,
  categories: () => [...ADHKAR_QUERY_KEYS.all, 'categories'] as const,
  categoryList: (category?: string) =>
    [...ADHKAR_QUERY_KEYS.all, 'chapters', category || 'all'] as const,
  chapter: (idOrTitle: string | number) =>
    [...ADHKAR_QUERY_KEYS.all, 'chapter', String(idOrTitle)] as const,
  favorites: () => [...ADHKAR_QUERY_KEYS.all, 'favorites'] as const,
};

/**
 * Fetch categorized Hisn al-Muslim categories
 */
export const useAdhkarCategoriesQuery = () => {
  return useQuery<AdhkarCategory[], Error>({
    queryKey: ADHKAR_QUERY_KEYS.categories(),
    queryFn: () => AdhkarService.getCategories(),
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    retry: 2,
  });
};

/**
 * Fetch chapters filtered by category name
 */
export const useAdhkarByCategoryQuery = (category?: string) => {
  return useQuery<AdhkarChapterMeta[], Error>({
    queryKey: ADHKAR_QUERY_KEYS.categoryList(category),
    queryFn: () => AdhkarService.getChaptersByCategory(category),
    staleTime: 1000 * 60 * 60 * 12,
    retry: 2,
  });
};

/**
 * Fetch supplications (duas) for a specific chapter ID or title
 */
export const useAdhkarChapterQuery = (idOrTitle: string | number, fallbackTitle?: string) => {
  return useQuery<AdhkarChapter, Error>({
    queryKey: ADHKAR_QUERY_KEYS.chapter(idOrTitle),
    queryFn: () => AdhkarService.getChapter(idOrTitle, fallbackTitle),
    staleTime: 1000 * 60 * 60 * 12,
    enabled: Boolean(idOrTitle),
    retry: 2,
  });
};

/**
 * Alias for useAdhkarChapterQuery
 */
export const useAdhkarDetailQuery = useAdhkarChapterQuery;

/**
 * Fetch user's favorited Dua IDs
 */
export const useAdhkarFavoritesQuery = () => {
  return useQuery<string[], Error>({
    queryKey: ADHKAR_QUERY_KEYS.favorites(),
    queryFn: () => AdhkarService.getFavorites(),
  });
};

/**
 * Toggle favorite status of a Dua
 */
export const useToggleAdhkarFavoriteMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<string[], Error, string>({
    mutationFn: (duaId: string) => AdhkarService.toggleFavorite(duaId),
    onSuccess: (updated) => {
      queryClient.setQueryData(ADHKAR_QUERY_KEYS.favorites(), updated);
    },
  });
};

/**
 * Complete Adhkar session & sync with backend today tracker (PATCH /tracker/adhkaar)
 */
export const useCompleteAdhkarSessionMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => AdhkarService.completeAdhkarSession(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tracker', 'today'] });
    },
  });
};
