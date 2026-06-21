export type EnneagramType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export interface TypeInfo {
  number: EnneagramType;
  name: string;
  brief: string;
  keywords: string[];
  color: string;
}
