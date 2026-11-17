/**
 * TanStack React Query Hooks for User Profile and Preferences
 */

import { useAuth } from '@/src/context/auth-context';
import { AuthService } from '@/src/services/api/auth-service';
import { UpdateProfileRequest } from '@/src/types/profile';
import { getErrorMessage } from '@/src/utils/error-handler';
import { editProfileSchema } from '@/src/validation/profile-schemas';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const PROFILE_QUERY_KEYS = {
  profile: ['user', 'profile'] as const,
};

export const useUpdateProfileMutation = () => {
  const queryClient = useQueryClient();
  const { updateUser } = useAuth();

  return useMutation({
    mutationFn: async (data: UpdateProfileRequest) => {
      // Validate with Zod
      const validated = editProfileSchema.parse(data);

      try {
        // Sync with backend user data if extra fields provided
        if (validated.lifeStage || validated.deenGoals) {
          await AuthService.updateUserData({
            lifeStage: validated.lifeStage,
            deenGoals: validated.deenGoals,
          });
        }

        // Update local auth context & persistent user storage
        await updateUser({
          firstName: validated.firstName,
          lastName: validated.lastName,
          email: validated.email,
        });

        return validated;
      } catch (error) {
        throw new Error(getErrorMessage(error));
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROFILE_QUERY_KEYS.profile });
    },
  });
};

