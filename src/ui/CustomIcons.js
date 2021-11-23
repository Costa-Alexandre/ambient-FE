import React from 'react';
import { View } from 'react-native';
import { createIconSetFromIcoMoon } from '@expo/vector-icons'

  const Icon = createIconSetFromIcoMoon(
    require('../assets/fonts/selection.json'),
    'IcoMoon',
    'icomoon.ttf'
  );

export default function CustomIcon({name, size, color}) {
    return (
      <Icon name={name} size={size} color={color}/>
    )}
