'use server';

/**
 * @fileOverview Suggests suitable architecture patterns based on the app's features and complexity.
 *
 * - suggestArchitecturePatterns - A function that suggests architecture patterns.
 * - SuggestArchitecturePatternsInput - The input type for the suggestArchitecturePatterns function.
 * - SuggestArchitecturePatternsOutput - The return type for the suggestArchitecturePatterns function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestArchitecturePatternsInputSchema = z.object({
  appFeatures: z
    .string()
    .describe('A description of the app and its features.'),
  appComplexity: z
    .string()
    .describe(
      'A description of the complexity of the app, such as the number of screens, data models, and integrations.'
    ),
});
export type SuggestArchitecturePatternsInput = z.infer<
  typeof SuggestArchitecturePatternsInputSchema
>;

const SuggestArchitecturePatternsOutputSchema = z.object({
  suggestedPatterns: z
    .array(z.string())
    .describe(
      'An array of suggested architecture patterns, such as MVVM, Clean Architecture, etc.'
    ),
  rationale: z
    .string()
    .describe(
      'A rationale for each suggested architecture pattern, explaining why it is suitable for the app.'
    ),
});
export type SuggestArchitecturePatternsOutput = z.infer<
  typeof SuggestArchitecturePatternsOutputSchema
>;

export async function suggestArchitecturePatterns(
  input: SuggestArchitecturePatternsInput
): Promise<SuggestArchitecturePatternsOutput> {
  return suggestArchitecturePatternsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestArchitecturePatternsPrompt',
  input: {schema: SuggestArchitecturePatternsInputSchema},
  output: {schema: SuggestArchitecturePatternsOutputSchema},
  prompt: `You are an expert software architect specializing in Android application architecture.

Given the following information about an Android app, suggest suitable architecture patterns and explain why they are suitable.

App Features: {{{appFeatures}}}
App Complexity: {{{appComplexity}}}

Consider architecture patterns such as MVVM, Clean Architecture, MVP, MVC, and others.

Output the suggested patterns and a rationale for each.

Format your response as a JSON object with the following structure:
{
  "suggestedPatterns": ["pattern1", "pattern2", ...],
  "rationale": "Explanation of why the suggested patterns are suitable for the app."
}
`,
});

const suggestArchitecturePatternsFlow = ai.defineFlow(
  {
    name: 'suggestArchitecturePatternsFlow',
    inputSchema: SuggestArchitecturePatternsInputSchema,
    outputSchema: SuggestArchitecturePatternsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
