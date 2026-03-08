import { Image } from 'expo-image';
import React from 'react';
import { ImageStyle, StyleProp } from 'react-native';

interface OptimizedImageProps {
  source: any;
  style?: StyleProp<ImageStyle>;
  resizeMode?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  placeholder?: string;
}

const OptimizedImage: React.FC<OptimizedImageProps> = React.memo(({
  source,
  style,
  resizeMode = 'cover',
  placeholder
}) => {
  return (
    <Image
      source={source}
      style={style}
      contentFit={resizeMode}
      placeholder={placeholder}
      transition={300}
      cachePolicy="memory-disk"
    />
  );
});

OptimizedImage.displayName = 'OptimizedImage';

export default OptimizedImage;