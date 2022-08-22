import React from 'react';
import { IImageProps } from 'src/components/Image/IImageProps';

const MemberCard: React.FC<IImageProps> = ({ srcImg, altImg, className = '' }) => (
  <img className={className} src={`${srcImg}`} alt={`${altImg}`} />
);

export default MemberCard;
