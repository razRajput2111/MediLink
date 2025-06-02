'use server';

/**
 * @fileOverview AI-powered reply suggestions for contact form inquiries.
 *
 * - generateReplySuggestions - A function that generates reply suggestions based on the inquiry.
 * - GenerateReplySuggestionsInput - The input type for the generateReplySuggestions function.
 * - GenerateReplySuggestionsOutput - The return type for the generateReplySuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateReplySuggestionsInputSchema = z.object({
  inquiry: z.string().describe('The user inquiry from the contact form.'),
});
export type GenerateReplySuggestionsInput = z.infer<
  typeof GenerateReplySuggestionsInputSchema
>;

const GenerateReplySuggestionsOutputSchema = z.object({
  suggestions: z
    .array(z.string())
    .describe('An array of suggested replies to the inquiry.'),
  shouldRespond: z
    .boolean()
    .describe(
      'Whether canned options can apply to this question, to save time.'
    ),
});
export type GenerateReplySuggestionsOutput = z.infer<
  typeof GenerateReplySuggestionsOutputSchema
>;

export async function generateReplySuggestions(
  input: GenerateReplySuggestionsInput
): Promise<GenerateReplySuggestionsOutput> {
  return generateReplySuggestionsFlow(input);
}

const cannedResponseApplicabilityTool = ai.defineTool({
  name: 'cannedResponseApplicability',
  description: 'Determines if canned responses can effectively address a user inquiry.',
  inputSchema: z.object({
    inquiry: z.string().describe('The user inquiry.'),
  }),
  outputSchema: z.boolean().describe('Whether a canned response is applicable.'),
},
async (input) => {
  // In a real implementation, this would use a more sophisticated method
  // to determine if a canned response is applicable.
  // For now, we just check if the inquiry contains certain keywords.
  const inquiry = input.inquiry.toLowerCase();
  const keywords = ['appointment', 'hours', 'location', 'insurance'];
  const isApplicable = keywords.some(keyword => inquiry.includes(keyword));
  return isApplicable;
});

const prompt = ai.definePrompt({
  name: 'generateReplySuggestionsPrompt',
  input: {schema: GenerateReplySuggestionsInputSchema},
  output: {schema: GenerateReplySuggestionsOutputSchema},
  tools: [cannedResponseApplicabilityTool],
  prompt: `You are a helpful assistant providing reply suggestions for inquiries received through a hospital contact form.

  Generate a list of suggested replies appropriate for the given inquiry. Ensure the suggestions are concise and professional.
  Based on the inquiry, determine if canned responses are applicable using the cannedResponseApplicability tool.

  Inquiry: {{{inquiry}}}
  shouldRespond: {{cannedResponseApplicabilityTool inquiry=inquiry}}

  Suggestions:`, //Strict formatting is not required.
});

const generateReplySuggestionsFlow = ai.defineFlow(
  {
    name: 'generateReplySuggestionsFlow',
    inputSchema: GenerateReplySuggestionsInputSchema,
    outputSchema: GenerateReplySuggestionsOutputSchema,
  },
  async input => {
    const {
      output: {suggestions, shouldRespond},
    } = await prompt(input);
    return {suggestions: suggestions, shouldRespond: shouldRespond!};
  }
);
