import { z } from 'zod';

export const menstrualCycleSchema = z.object({
  lastFlowDate: z
    .string()
    .min(1, 'Please select your last period date'),
  cycleLength: z
    .number()
    .min(15, 'Cycle length must be at least 15 days')
    .max(50, 'Cycle length cannot exceed 50 days'),
  averageFlowDuration: z
    .union([z.number(), z.string()])
    .optional(),
  useStandardCycle: z.boolean().optional(),
});

export type MenstrualCycleInput = z.infer<typeof menstrualCycleSchema>;
