'use server';
/**
 * @fileOverview This file implements a Genkit flow that automatically generates
 * a targeted code fix for failing tests based on the file content and error message.
 *
 * - fixFailingTestsAutomatically - A function that initiates the fix generation process.
 * - FixFailingTestsInput - The input type for the fixFailingTestsAutomatically function.
 * - FixFailingTestsOutput - The return type for the fixFailingTestsAutomatically function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const FixFailingTestsInputSchema = z.object({
  failingFileContent: z.string().describe('The content of the file that contains the failing test.'),
  errorMessage: z.string().describe('The error message and stack trace from the failed test.'),
});
export type FixFailingTestsInput = z.infer<typeof FixFailingTestsInputSchema>;

const FixFailingTestsOutputSchema = z.object({
  suggestedPatch: z.string().describe('A minimal, targeted code patch to fix the failing test. This should be a diff-formatted patch if possible, or just the corrected code block.'),
});
export type FixFailingTestsOutput = z.infer<typeof FixFailingTestsOutputSchema>;

export async function fixFailingTestsAutomatically(input: FixFailingTestsInput): Promise<FixFailingTestsOutput> {
  return fixFailingTestsFlow(input);
}

const fixFailingTestsPrompt = ai.definePrompt({
  name: 'fixFailingTestsPrompt',
  input: { schema: FixFailingTestsInputSchema },
  output: { schema: FixFailingTestsOutputSchema },
  prompt: `You are an expert software engineer tasked with fixing failing tests.

Given the content of a failing file and the associated error message, your goal is to generate a minimal, targeted code patch that fixes the issue.

Only provide the patch or the corrected code snippet. Do not rewrite the entire file or project. Focus on the smallest change possible to resolve the error.
Maintain the existing code architecture and style.

Failing File Content:
---
{{{failingFileContent}}}
---

Error Message:
---
{{{errorMessage}}}
---

Generate the fix in the following JSON format, providing only the 'suggestedPatch' field:
`,
});

const fixFailingTestsFlow = ai.defineFlow(
  {
    name: 'fixFailingTestsFlow',
    inputSchema: FixFailingTestsInputSchema,
    outputSchema: FixFailingTestsOutputSchema,
  },
  async (input) => {
    const { output } = await fixFailingTestsPrompt(input);
    if (!output) {
      throw new Error('Failed to generate a patch.');
    }
    return output;
  }
);
