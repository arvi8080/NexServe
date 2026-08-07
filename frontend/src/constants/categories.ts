import { BeautyCategory } from '@/types';

export interface CategoryInfo {
  id: BeautyCategory;
  name: string;
  description: string;
  iconName: string;
  badgeColor: string;
  imageUrl: string;
}

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'FACIAL',
    name: 'Facial & Glow',
    description: 'Deep cleansing, organic hydra-facials and skin rejuvenation',
    iconName: 'Sparkles',
    badgeColor: 'bg-pink-500/10 text-pink-500 border-pink-500/20',
    imageUrl: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'HAIR_CUT',
    name: 'Hair Styling & Cut',
    description: 'Trending cuts, precision styling and blow dry treatments',
    iconName: 'Scissors',
    badgeColor: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
    imageUrl: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'HAIR_SPA',
    name: 'Hair Spa & Therapy',
    description: 'Nourishing keratin spa, scalp massage and moisture lock',
    iconName: 'Droplets',
    badgeColor: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
    imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'HAIR_COLOR',
    name: 'Hair Coloring',
    description: 'Global highlights, balayage and vibrant ammonia-free tones',
    iconName: 'Palette',
    badgeColor: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
    imageUrl: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'WAXING',
    name: 'Waxing & Smooth Skin',
    description: 'Rica painless waxing, full body smooth skin packages',
    iconName: 'Flame',
    badgeColor: 'bg-rose-500/10 text-rose-500 border-rose-500/20',
    imageUrl: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'THREADING',
    name: 'Threading & Brows',
    description: 'Precision eyebrow shaping, upper lip and facial threading',
    iconName: 'Eye',
    badgeColor: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
    imageUrl: 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'MANICURE',
    name: 'Luxury Manicure',
    description: 'Nail art, spa nail treatments and cuticle care',
    iconName: 'HeartHandshake',
    badgeColor: 'bg-indigo-500/10 text-indigo-500 border-indigo-500/20',
    imageUrl: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'PEDICURE',
    name: 'Relaxing Pedicure',
    description: 'Foot soak, scrub, crack heel treatment and polish',
    iconName: 'Footprints',
    badgeColor: 'bg-teal-500/10 text-teal-500 border-teal-500/20',
    imageUrl: 'https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'PARTY_MAKEUP',
    name: 'Party & Glam Makeup',
    description: 'HD party makeup, false lashes and glowing finish',
    iconName: 'Wand2',
    badgeColor: 'bg-violet-500/10 text-violet-500 border-violet-500/20',
    imageUrl: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'BRIDAL_MAKEUP',
    name: 'Bridal Makeover',
    description: 'Airbrush bridal packages, saree draping and trial makeup',
    iconName: 'Crown',
    badgeColor: 'bg-amber-600/10 text-amber-600 border-amber-600/20',
    imageUrl: 'https://images.unsplash.com/photo-1526045612212-70caf35c14df?auto=format&fit=crop&w=600&q=80',
  },
];
