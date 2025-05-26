// The directive enables strict mode for the entire file.
'use server';

/**
 * @fileOverview Generates a Termux-Kotlin framework with integrated AI libraries based on user inputs.
 *
 * - generateTermuxKotlinFramework - A function that initiates the framework generation process.
 * - GenerateTermuxKotlinFrameworkInput - The input type for the framework generation function.
 * - GenerateTermuxKotlinFrameworkOutput - The return type for the framework generation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateTermuxKotlinFrameworkInputSchema = z.object({
  appFunctionality: z
    .string()
    .describe('Detailed description of the desired app functionality.'),
  aiFeatures: z
    .string()
    .describe('Specific AI features to be integrated into the app.'),
  platformSpecifics: z
    .string()
    .describe('Platform-specific requirements or considerations for the app.'),
});

export type GenerateTermuxKotlinFrameworkInput = z.infer<
  typeof GenerateTermuxKotlinFrameworkInputSchema
>;

const GenerateTermuxKotlinFrameworkOutputSchema = z.object({
  frameworkCode: z
    .string()
    .describe('The generated Termux-Kotlin framework code.'),
  buildInstructions: z
    .string()
    .describe('Instructions for building and deploying the framework.'),
  libraryImportScripts: z
    .string()
    .describe('Scripts for importing necessary AI libraries.'),
});

export type GenerateTermuxKotlinFrameworkOutput = z.infer<
  typeof GenerateTermuxKotlinFrameworkOutputSchema
>;

export async function generateTermuxKotlinFramework(
  input: GenerateTermuxKotlinFrameworkInput
): Promise<GenerateTermuxKotlinFrameworkOutput> {
  return generateTermuxKotlinFrameworkFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateTermuxKotlinFrameworkPrompt',
  input: {schema: GenerateTermuxKotlinFrameworkInputSchema},
  output: {schema: GenerateTermuxKotlinFrameworkOutputSchema},
  prompt: `You are an expert Android app developer specializing in Termux-Kotlin framework generation with integrated AI libraries.

  Based on the user's input, generate a Termux-Kotlin framework tailored to their app's functionality, AI features, and platform specifics.
  Include necessary build instructions and library import scripts.

  App Functionality: {{{appFunctionality}}}
  AI Features: {{{aiFeatures}}}
  Platform Specifics: {{{platformSpecifics}}}

  Ensure the generated framework is well-structured, efficient, and easy to deploy.
  Provide clear and concise build instructions and library import scripts.
  Output the framework code, build instructions, and library import scripts in a structured format.
  `, 
});

const generateTermuxKotlinFrameworkFlow = ai.defineFlow(
  {
    name: 'generateTermuxKotlinFrameworkFlow',
    inputSchema: GenerateTermuxKotlinFrameworkInputSchema,
    outputSchema: GenerateTermuxKotlinFrameworkOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
