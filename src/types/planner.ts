/**
 * Types for Daily Planner & Background Generation
 */

export interface PlannerUserInputs {
  tasks?: string[];
  priorities?: string[];
  spiritualFocus?: string[];
  notes?: string;
}

export interface GenerateDailyPlanRequest {
  userInputs: PlannerUserInputs;
}

export interface GenerateDailyPlanResponse {
  success?: boolean;
  message?: string;
  payload?: any;
  data?: any;
  [key: string]: any;
}

export interface PlannerTask {
  id?: string | number;
  _id?: string;
  taskId?: string;
  title: string;
  description?: string;
  time?: string;
  completed?: boolean;
  priority?: string;
  category?: string;
  [key: string]: any;
}

export interface DailyPlan {
  date?: string;
  tasks?: PlannerTask[];
  summary?: string;
  userInputs?: PlannerUserInputs;
  [key: string]: any;
}

export interface DailyPlanResponse {
  success?: boolean;
  message?: string;
  payload?: DailyPlan | PlannerTask[] | any;
  data?: DailyPlan | PlannerTask[] | any;
  [key: string]: any;
}

export interface AddTaskRequest {
  task: {
    title: string;
    description?: string;
    time?: string;
  };
}

export interface EditTaskRequest {
  update: {
    title?: string;
    description?: string;
    time?: string;
  };
}

