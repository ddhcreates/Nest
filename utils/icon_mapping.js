import { 
  MessageCircle, 
  Users, 
  MapPin, 
  Heart, 
  Shield, 
  BookOpen,
  ChevronDown,
  Mail,
  Phone,
  ArrowRight,
  Check,
  Star
} from 'lucide-react';

const iconMap = {
  'MessageCircle': MessageCircle,
  'Users': Users,
  'MapPin': MapPin,
  'Heart': Heart,
  'Shield': Shield,
  'BookOpen': BookOpen,
  'ChevronDown': ChevronDown,
  'Mail': Mail,
  'Phone': Phone,
  'ArrowRight': ArrowRight,
  'Check': Check,
  'Star': Star
};

export const getIcon = (iconName, props = {}) => {
  const IconComponent = iconMap[iconName];
  if (!IconComponent) {
    console.warn(`Icon "${iconName}" not found, using default`);
    return <BookOpen {...props} />;
  }
  return <IconComponent {...props} />;
};

export default iconMap;