import { PostgrestError } from "@supabase/supabase-js";

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

export interface GraphProps {
  terms: TermData[];
  loading: boolean;
  error: PostgrestError | null;
  activeLines: number;
}
