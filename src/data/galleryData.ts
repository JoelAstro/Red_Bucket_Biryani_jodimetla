export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  categoryKey:
    | 'all'
    | 'chicken-dum'
    | 'chicken-fry'
    | 'chicken-65'
    | 'mutton'
    | 'prawns'
    | 'fish'
    | 'veg'
    | 'buckets'
    | 'party';
  imageUrl: string;
  description: string;
  tag: string;
}

export const GALLERY_CATEGORIES = [
  { key: 'all', label: 'All Specialties' },
  { key: 'chicken-dum', label: 'Chicken Dum' },
  { key: 'chicken-fry', label: 'Chicken Fry' },
  { key: 'chicken-65', label: 'Chicken 65' },
  { key: 'mutton', label: 'Mutton Biryani' },
  { key: 'prawns', label: 'Prawns Biryani' },
  { key: 'fish', label: 'Fish Biryani' },
  { key: 'veg', label: 'Veg Biryani' },
  { key: 'buckets', label: 'Signature Buckets' },
  { key: 'party', label: 'Party & Celebration' },
] as const;

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Signature RBB Chicken Dum Biryani',
    category: 'Chicken Dum Biryani',
    categoryKey: 'chicken-dum',
    imageUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=1200&q=80',
    description: 'Slow-cooked fragrant basmati rice infused with saffron, caramelized onions, and tender marinated chicken.',
    tag: 'Dum Special',
  },
  {
    id: 'gal-2',
    title: 'Fiery RBB Chicken Fry Biryani',
    category: 'Chicken Fry Biryani',
    categoryKey: 'chicken-fry',
    imageUrl: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=1200&q=80',
    description: 'Crisp, spicy Andhra-style chicken fry layered over steaming basmati biryani with green chillies and curry leaves.',
    tag: 'Crisp & Spicy',
  },
  {
    id: 'gal-3',
    title: 'Spicy RBB Chicken 65 Biryani',
    category: 'Chicken 65 Biryani',
    categoryKey: 'chicken-65',
    imageUrl: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=1200&q=80',
    description: 'Signature tossed Chicken 65 bites nestled into aromatic dum rice for an explosive punch of flavor.',
    tag: 'Chef Favorite',
  },
  {
    id: 'gal-4',
    title: 'Royal RBB Mutton Dum Biryani',
    category: 'Mutton Biryani',
    categoryKey: 'mutton',
    imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80',
    description: 'Tender bone-in mutton slow-steamed to falling-off-the-bone tenderness in aromatic whole spices.',
    tag: 'Royal Feast',
  },
  {
    id: 'gal-5',
    title: 'Succulent RBB Prawns Biryani',
    category: 'Prawns Biryani',
    categoryKey: 'prawns',
    imageUrl: 'https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=1200&q=80',
    description: 'Fresh coastal prawns marinated in coastal spices, layered gently with long-grain basmati.',
    tag: 'Coastal Delight',
  },
  {
    id: 'gal-6',
    title: 'Delicate RBB Fish Biryani',
    category: 'Fish Biryani',
    categoryKey: 'fish',
    imageUrl: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=1200&q=80',
    description: 'Juicy spiced fish steaks infused with fragrant herbs, mint, and saffron basmati.',
    tag: 'Seafood Special',
  },
  {
    id: 'gal-7',
    title: 'Garden-Fresh RBB Veg Biryani',
    category: 'Veg Biryani',
    categoryKey: 'veg',
    imageUrl: 'https://images.unsplash.com/photo-1645177628172-a94c1f96e6db?auto=format&fit=crop&w=1200&q=80',
    description: 'Wholesome medley of garden vegetables, paneer, aromatic mint, and saffron dum rice.',
    tag: '100% Vegetarian',
  },
  {
    id: 'gal-8',
    title: 'Signature Red Biryani Buckets Lineup',
    category: 'Signature Red Buckets',
    categoryKey: 'buckets',
    imageUrl: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=1200&q=80',
    description: 'Our iconic cylindrical takeaway buckets engineered to keep biryani steaming hot and aromatic.',
    tag: 'Signature Packaging',
  },
  {
    id: 'gal-9',
    title: 'Grand Party & Celebration Packs',
    category: 'Party and Celebration Packs',
    categoryKey: 'party',
    imageUrl: 'https://images.unsplash.com/photo-1505253758473-96b3015f27eb?auto=format&fit=crop&w=1200&q=80',
    description: 'Party packs and massive celebration buckets crafted to turn every gathering into a feast.',
    tag: 'For 4 to 60 People',
  },
];
