export interface TermData {
  period: string;
  "Series A": number;
  "Series B": number;
  "Series C": number;
}

export interface AutocompleteRef {
  focus: () => void;
  select: () => void;
}
