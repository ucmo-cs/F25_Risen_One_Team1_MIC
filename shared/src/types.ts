import { z } from 'zod';

export const timesheetSchema = z.array(
  z.object({
    username: z.string(),
    hours: z.array(z.number())
  })
);

export type Timesheet = z.infer<typeof timesheetSchema>;

export const projectsSchema = z.object({
  id: z.number(),
  name: z.string(),
  years: z.record(z.string(), z.record(z.string(), timesheetSchema))
});

export type Project = z.infer<typeof projectsSchema>;
