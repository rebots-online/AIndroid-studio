'use server';

/**
 * @fileOverview Generates a detailed, placeholder-free implementation plan for a new feature.
 *
 * - generateImplementationPlan - A function that generates the implementation plan.
 * - GenerateImplementationPlanInput - The input type for the generateImplementationPlan function.
 * - GenerateImplementationPlanOutput - The return type for the generateImplementationPlan function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

const GenerateImplementationPlanInputSchema = z.object({
  featureDescription: z
    .string()
    .describe(
      'A detailed description of the feature to be implemented. Should include user stories and desired outcomes.'
    ),
  currentArchitecture: z
    .string()
    .describe(
      'A summary of the current application architecture, including existing components, flows, and data structures.'
    ),
});
export type GenerateImplementationPlanInput = z.infer<
  typeof GenerateImplementationPlanInputSchema
>;

const FileModificationSchema = z.object({
  filePath: z.string().describe('The full path of the file to be created or modified.'),
  reason: z.string().describe('The reason for creating or modifying this file.'),
  contentSummary: z.string().describe('A summary of the code or changes to be implemented in this file.'),
});

const GenerateImplementationPlanOutputSchema = z.object({
  planTitle: z.string().describe('A concise title for the implementation plan.'),
  architecturalOverview: z
    .string()
    .describe('A high-level overview of how the new feature will integrate into the existing architecture.'),
  fileModifications: z
    .array(FileModificationSchema)
    .describe('A list of files that need to be created or modified.'),
  dataSchemaChanges: z
    .string()
    .describe('Description of any new or modified data schemas (e.g., Zod schemas).'),
  backendFlows: z
    .string()
    .describe('Description of any new or modified Genkit flows or server actions needed.'),
  testingStrategy: z
    .string()
    .describe('A brief strategy for testing the new feature.'),
});
export type GenerateImplementationPlanOutput = z.infer<
  typeof GenerateImplementationPlanOutputSchema
>;

export async function generateImplementationPlan(
  input: GenerateImplementationPlanInput
): Promise<GenerateImplementationPlanOutput> {
  return generateImplementationPlanFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateImplementationPlanPrompt',
  input: {schema: GenerateImplementationPlanInputSchema},
  output: {schema: GenerateImplementationPlanOutputSchema},
  prompt: `You are a senior software architect specializing in creating detailed, placeholder-free implementation plans for Next.js applications using Genkit.

  Your task is to generate a comprehensive implementation plan based on the provided feature description and current architecture. The plan must be actionable and should not contain any placeholders or incomplete logic. Every component of the plan should be a concrete, buildable step.

  Feature Description: {{{featureDescription}}}
  Current Architecture: {{{currentArchitecture}}}

  Generate a plan that includes:
  - A clear title for the plan.
  - An architectural overview of how the new feature fits.
  - A detailed list of file modifications, including file paths, the reason for the change, and a summary of the content.
  - Specific details on any data schema changes (Zod schemas).
  - A description of the backend logic, including any new or modified Genkit flows.
  - A testing strategy.

  The output must be a complete, well-structured JSON object that can be directly used by a development team to implement the feature without ambiguity.
  `,
});

const generateImplementationPlanFlow = ai.defineFlow(
  {
    name: 'generateImplementationPlanFlow',
    inputSchema: GenerateImplementationPlanInputSchema,
    outputSchema: GenerateImplementationPlanOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
