import React from 'react';
import { IWord } from 'src/store/types';

export interface IDifficultWordProps {
  word: IWord | null;
  audio: React.MutableRefObject<HTMLAudioElement>;
}
