// src/components/Icon.jsx

import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Foundation from 'react-native-vector-icons/Foundation';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';



const Icon = ({ type, name, color, size, ...props }) => {
  switch (type) {
    case 'AntDesign':
      return <AntDesign name={name} color={color} size={size} {...props} />;
    case 'Entypo':
      return <Entypo name={name} color={color} size={size} {...props} />;
    case 'EvilIcons':
      return <EvilIcons name={name} color={color} size={size} {...props} />;
    case 'FontAwesome':
      return <FontAwesome name={name} color={color} size={size} {...props} />;
    case 'Foundation':
      return <Foundation name={name} color={color} size={size} {...props} />;
    case 'FontAwesome6':
      return <FontAwesome6 name={name} color={color} size={size} {...props} />;
    case 'Feather':
      return <Feather name={name} color={color} size={size} {...props} />;
    case 'MaterialCommunityIcons':
      return <MaterialCommunityIcons name={name} color={color} size={size} {...props} />;
    case 'Ionicons':
        return <Ionicons name={name} color={color} size={size} {...props} />;
    case 'SimpleLineIcons':
        return <SimpleLineIcons name={name} color={color} size={size} {...props} />;
    default:
      return null;
  }
};

export default Icon;