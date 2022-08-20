import React from 'react';
import { IImageProps } from './IImageProps';

const MemberCard: React.FC<IImageProps> = ({ srcImg, altImg, className = '' }) => (
  <img className={className} src={`${srcImg}`} alt={`${altImg}`} />
);

export default MemberCard;
