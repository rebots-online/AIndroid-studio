'use server';

/**
 * @fileOverview Estimates the cost to implement a feature based on a generated plan.
 *
 * - estimateImplementationCost - A function that estimates the implementation cost.
 * - EstimateImplementationCostInput - The input type for the function.
 * - EstimateImplementationCostOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

// Based on Gemini 1.5 Flash pricing as of mid-2024
const INPUT_TOKEN_COST_PER_MILLION = 0.35;
const OUTPUT_TOKEN_COST_PER_MILLION = 1.05;

const FileModificationSchema = z.object({
  filePath: z.string(),
  reason: z.string(),
  contentSummary: z.string(),
});

const EstimateImplementationCostInputSchema = z.object({
  planTitle: z.string(),
  architecturalOverview: z.string(),
  fileModifications: z.array(FileModificationSchema),
  dataSchemaChanges: z.string(),
  backendFlows: z.string(),
  testingStrategy: z.string(),
});
export type EstimateImplementationCostInput = z.infer<
  typeof EstimateImplementationCostInputSchema
>;

const CostEstimationSchema = z.object({
    taskDescription: z.string().describe("A summary of the task being estimated."),
    estimatedInputTokens: z.number().describe("Estimated number of input tokens required for the task."),
    estimatedOutputTokens: z.number().describe("Estimated number of output tokens generated for the task."),
    reasoning: z.string().describe("Brief reasoning for the token estimations.")
});

const EstimateImplementationCostOutputSchema = z.object({
  costBreakdown: z.array(CostEstimationSchema).describe("An array of cost estimations for each major task."),
  totalEstimatedInputTokens: z.number().describe("The sum of all estimated input tokens."),
  totalEstimatedOutputTokens: z.number().describe("The sum of all estimated output tokens."),
  totalEstimatedCostUSD: z.string().describe("The total estimated cost in USD, formatted to 4 decimal places."),
});
export type EstimateImplementationCostOutput = z.infer<
  typeof EstimateImplementationCostOutputSchema
>;

export async function estimateImplementationCost(
  input: EstimateImplementationCostInput
): Promise<EstimateImplementationCostOutput> {
  const result = await estimateImplementationCostFlow(input);
  
  const totalInputTokens = result.costBreakdown.reduce((acc, item) => acc + item.estimatedInputTokens, 0);
  const totalOutputTokens = result.costBreakdown.reduce((acc, item) => acc + item.estimatedOutputTokens, 0);

  const totalCost = (totalInputTokens / 1_000_000 * INPUT_TOKEN_COST_PER_MILLION) + (totalOutputTokens / 1_000_000 * OUTPUT_TOKEN_COST_PER_MILLION);

  return {
      ...result,
      totalEstimatedInputTokens: totalInputTokens,
      totalEstimatedOutputTokens: totalOutputTokens,
      totalEstimatedCostUSD: totalCost.toFixed(4)
  };
}


const prompt = ai.definePrompt({
  name: 'estimateImplementationCostPrompt',
  input: {schema: z.object({ plan: EstimateImplementationCostInputSchema })},
  output: {schema: z.object({ costBreakdown: z.array(CostEstimationSchema)})},
  prompt: `You are an expert AI software development cost estimator. Your task is to analyze a given implementation plan and estimate the token usage (both input and output) for a large language model to generate the necessary code.

  Base your estimates on the complexity and verbosity of the descriptions. Assume the model is a Gemini 1.5 Flash or similar.

  Here is the implementation plan:
  - Plan Title: {{{plan.planTitle}}}
  - Architectural Overview: {{{plan.architecturalOverview}}}
  - File Modifications:
    {{#each plan.fileModifications}}
    - Path: {{{this.filePath}}}
      - Reason: {{{this.reason}}}
      - Summary: {{{this.contentSummary}}}
    {{/each}}
  - Data Schema Changes: {{{plan.dataSchemaChanges}}}
  - Backend Flows: {{{plan.backendFlows}}}
  - Testing Strategy: {{{plan.testingStrategy}}}

  Break down the estimation into logical tasks (e.g., one task per file modification, one for schema changes, one for backend flows). For each task, provide:
  1. A description of the task.
  2. Estimated input tokens: Consider the length of the prompt and context needed. A simple component might be 500 tokens, a complex flow with context could be 2000+.
  3. Estimated output tokens: Consider the expected length of the generated code. A small component might be 1000 tokens, a full page with logic could be 4000+.
  4. Reasoning for your estimate.

  Be realistic. A simple utility file might be small, while a complex client component with state and effects will be much larger. A Genkit flow requires defining schemas, prompts, and the flow logic itself.

  Provide the output as a JSON object with a "costBreakdown" array.
  `,
});

const estimateImplementationCostFlow = ai.defineFlow(
  {
    name: 'estimateImplementationCostFlow',
    inputSchema: EstimateImplementationCostInputSchema,
    outputSchema: z.object({ costBreakdown: z.array(CostEstimationSchema)})
  },
  async (input) => {
    const {output} = await prompt({plan: input});
    return output!;
  }
);
