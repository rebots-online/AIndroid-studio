'use server';

/**
 * @fileOverview Generates detailed build notes for Android app development, including Termux setup, Kotlin compilation, and Google Play Store policy navigation.
 *
 * - generateBuildDocumentation - A function that generates the build documentation.
 * - GenerateBuildDocumentationInput - The input type for the generateBuildDocumentation function.
 * - GenerateBuildDocumentationOutput - The return type for the generateBuildDocumentation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateBuildDocumentationInputSchema = z.object({
  appName: z.string().describe('The name of the application.'),
  targetPlatform: z.string().describe('The target platform for the app (e.g., Termux).'),
  aiFeatures: z.string().describe('Description of the AI features implemented in the app.'),
  architecturePattern: z
    .string()
    .optional()
    .describe('The architectural pattern used in the app (e.g., MVVM, Clean Architecture).'),
});
export type GenerateBuildDocumentationInput = z.infer<
  typeof GenerateBuildDocumentationInputSchema
>;

const GenerateBuildDocumentationOutputSchema = z.object({
  buildNotes: z.string().describe('Detailed build notes for the Android application.'),
});
export type GenerateBuildDocumentationOutput = z.infer<
  typeof GenerateBuildDocumentationOutputSchema
>;

export async function generateBuildDocumentation(
  input: GenerateBuildDocumentationInput
): Promise<GenerateBuildDocumentationOutput> {
  return generateBuildDocumentationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateBuildDocumentationPrompt',
  input: {schema: GenerateBuildDocumentationInputSchema},
  output: {schema: GenerateBuildDocumentationOutputSchema},
  prompt: `You are an expert in Android app development and deployment.
  Your task is to generate detailed build notes for an Android application, including setting up the Termux environment, compiling the Kotlin code, and navigating Google Play Store policy.

  Application Name: {{{appName}}}
  Target Platform: {{{targetPlatform}}}
  AI Features: {{{aiFeatures}}}
  Architecture Pattern: {{{architecturePattern}}}

  Provide comprehensive and step-by-step instructions to guide the developer through the entire build and deployment process, including:
  - Setting up the Termux environment (if applicable).
  - Compiling the Kotlin code.
  - Integrating any AI libraries (e.g., TensorFlow Lite, PyTorch Mobile).
  - Addressing Google Play Store policy requirements related to AI and data privacy.
  - Including example code snippets and configuration files where necessary.
  - Build notes should be comprehensive and easy to follow.
  `,
});

const generateBuildDocumentationFlow = ai.defineFlow(
  {
    name: 'generateBuildDocumentationFlow',
    inputSchema: GenerateBuildDocumentationInputSchema,
    outputSchema: GenerateBuildDocumentationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
