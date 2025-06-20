'use server';

/**
 * @fileOverview AI-powered accommodation suggestion flow.
 *
 * - smartMatch - A function that suggests accommodations based on user preferences.
 * - SmartMatchInput - The input type for the smartMatch function.
 * - SmartMatchOutput - The return type for the smartMatch function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SmartMatchInputSchema = z.object({
  budget: z.number().describe('The student\u2019s budget for accommodation.'),
  amenitiesPreferences: z
    .string()
    .describe('The student\u2019s preferred amenities, as a comma separated list.'),
  reviews: z
    .string()
    .describe('The reviews of the accommodation, if available, as comma separated values.'),
});
export type SmartMatchInput = z.infer<typeof SmartMatchInputSchema>;

const SmartMatchOutputSchema = z.object({
  accommodationSuggestions: z.array(z.string()).describe('A list of suggested accommodations.'),
  reasoning: z.string().describe('The reasoning behind the suggestions.'),
});
export type SmartMatchOutput = z.infer<typeof SmartMatchOutputSchema>;

export async function smartMatch(input: SmartMatchInput): Promise<SmartMatchOutput> {
  return smartMatchFlow(input);
}

const prompt = ai.definePrompt({
  name: 'smartMatchPrompt',
  input: {schema: SmartMatchInputSchema},
  output: {schema: SmartMatchOutputSchema},
  prompt: `You are an AI assistant helping students find suitable accommodations near their college.

  Based on the student's budget, amenities preferences, and available reviews, suggest a list of accommodations that best match their needs.
  Explain the reasoning behind each suggestion.

  Budget: {{budget}}
  Amenities Preferences: {{amenitiesPreferences}}
  Reviews: {{reviews}}

  Provide the suggestions in a structured format.
  `,
});

const smartMatchFlow = ai.defineFlow(
  {
    name: 'smartMatchFlow',
    inputSchema: SmartMatchInputSchema,
    outputSchema: SmartMatchOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
