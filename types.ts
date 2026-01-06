
export type TransformationType = 
  | 'lowercase' 
  | 'uppercase' 
  | 'titlecase' 
  | 'sentencecase' 
  | 'alternating' 
  | 'inverse' 
  | 'clean';

export interface TextStats {
  characters: number;
  words: number;
  sentences: number;
}
