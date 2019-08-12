import React from 'react';
import LazyLoad from 'react-lazyload';

interface ImageProps {
  src: string;
  alt?: string;
  className?: string;
  onError?: (e: any) => void;
}

const Image = ({
  src,
  alt,
  className,
  onError,
}: ImageProps) => (
  <LazyLoad>
    <img {...{ src, className, onError }} alt={alt || ''} />
  </LazyLoad>
);

export default Image;
