import { SuggestionChip } from './types';

export const suggestionChips: SuggestionChip[] = [
  {
    id: '1',
    category: 'LUNAR MISSION',
    label: 'Chandrayaan-3 findings',
    prompt: 'Summarize the key findings of the Pragyan rover on the Moon.',
  },
  {
    id: '2',
    category: 'HUMAN SPACEFLIGHT',
    label: 'Gaganyaan status',
    prompt: 'What is the current status of the Gaganyaan mission?',
  },
  {
    id: '3',
    category: 'SOLAR OBSERVATION',
    label: 'Aditya-L1 orbit',
    prompt: 'Explain the halo orbit mechanism used for Aditya-L1.',
  },
  {
    id: '4',
    category: 'MARS ORBITER',
    label: 'Mangalyaan legacy',
    prompt: 'What made the Mars Orbiter Mission (Mangalyaan) globally significant?',
  }
];
