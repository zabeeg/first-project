import { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import Card from '../components/Card';
import './Outfits.css';

// Outfit inspiration data with aesthetic collages - using CSS icon classes instead of emojis
const outfitInspo = [
  { 
    id: 1, 
    title: 'Pink Bow Princess', 
    description: 'A dreamy coquette look with ribbons, bows, and all things girly',
    iconClass: 'outfit-icon-bow',
    weather: ['spring', 'summer'],
    colors: ['pink', 'pastel'],
    occasion: ['casual', 'date-night'],
    style: ['coquette'],
    items: ['White ruffle blouse', 'Pink pleated mini skirt', 'Ballet flats', 'Satin bow hair clips', 'Pearl accessories']
  },
  { 
    id: 2, 
    title: 'Lace & Grace', 
    description: 'Delicate lace details for an elegant, soft romantic aesthetic',
    iconClass: 'outfit-icon-swan',
    weather: ['spring', 'fall'],
    colors: ['neutral', 'pastel'],
    occasion: ['semi-formal', 'date-night'],
    style: ['coquette', 'vintage'],
    items: ['Lace trim cami', 'High-waisted trousers', 'Kitten heels', 'Pearl earrings', 'Mini structured bag']
  },
  { 
    id: 3, 
    title: 'Cloud Nine Gym', 
    description: 'Cute and comfy workout fits that motivate you to move',
    iconClass: 'outfit-icon-smiley',
    weather: ['all-seasons'],
    colors: ['pastel', 'neutral'],
    occasion: ['casual', 'athletic'],
    style: ['sporty', 'minimalist'],
    items: ['Matching sports bra & leggings set', 'Cloud sneakers', 'Oversized scrunchie', 'Water bottle aesthetic']
  },
  { 
    id: 4, 
    title: 'Coffee Run Cutie', 
    description: 'Effortlessly chic for running errands or casual meetups',
    iconClass: 'outfit-icon-coffee',
    weather: ['fall', 'winter'],
    colors: ['neutral', 'dark'],
    occasion: ['casual', 'everyday'],
    style: ['minimalist', 'trendy'],
    items: ['Oversized cardigan', 'Basic white tee', 'Mom jeans', 'White sneakers', 'Tote bag']
  },
  { 
    id: 5, 
    title: 'Sunset Romance', 
    description: 'Glamorous look perfect for a romantic dinner date',
    iconClass: 'outfit-icon-sunset',
    weather: ['summer', 'spring'],
    colors: ['dark', 'colorful'],
    occasion: ['date-night', 'formal'],
    style: ['trendy'],
    items: ['Satin slip dress', 'Strappy heels', 'Dainty gold necklace', 'Mini clutch', 'Statement earrings']
  },
  { 
    id: 6, 
    title: 'Boss Babe Energy', 
    description: 'Polished and professional for work or school presentations',
    iconClass: 'outfit-icon-briefcase',
    weather: ['all-seasons'],
    colors: ['neutral', 'dark'],
    occasion: ['semi-formal', 'everyday'],
    style: ['minimalist'],
    items: ['Tailored blazer', 'Straight leg pants', 'Pointed flats', 'Structured bag', 'Delicate jewelry']
  },
  { 
    id: 7, 
    title: 'Garden Party Fairy', 
    description: 'Floral and feminine for outdoor events and brunches',
    iconClass: 'outfit-icon-flower',
    weather: ['spring', 'summer'],
    colors: ['pastel', 'colorful', 'pink'],
    occasion: ['semi-formal', 'casual'],
    style: ['coquette', 'vintage'],
    items: ['Floral midi dress', 'Straw hat', 'Espadrille wedges', 'Wicker bag', 'Floral perfume']
  },
  { 
    id: 8, 
    title: 'Cozy Study Session', 
    description: 'Comfy yet put-together for productive study days',
    iconClass: 'outfit-icon-books',
    weather: ['fall', 'winter'],
    colors: ['neutral', 'pastel'],
    occasion: ['casual', 'everyday'],
    style: ['minimalist', 'trendy'],
    items: ['Oversized sweater', 'Leggings or joggers', 'Fuzzy socks', 'Hair claw clip', 'Reading glasses']
  },
  { 
    id: 9, 
    title: 'Y2K Dreams', 
    description: 'Nostalgic 2000s vibes with a modern twist',
    iconClass: 'outfit-icon-sparkle',
    weather: ['summer', 'spring'],
    colors: ['pink', 'colorful'],
    occasion: ['casual', 'date-night'],
    style: ['trendy', 'vintage'],
    items: ['Baby tee', 'Low-rise jeans', 'Platform sneakers', 'Butterfly clips', 'Mini shoulder bag']
  },
  { 
    id: 10, 
    title: 'Winter Wonderland', 
    description: 'Cozy and chic layers for cold weather adventures',
    iconClass: 'outfit-icon-snowflake',
    weather: ['winter'],
    colors: ['neutral', 'dark', 'pastel'],
    occasion: ['casual', 'everyday'],
    style: ['minimalist', 'trendy'],
    items: ['Puffer jacket', 'Chunky knit sweater', 'Fleece-lined leggings', 'Ugg boots', 'Beanie & scarf set']
  },
  { 
    id: 11, 
    title: 'Beach Babe', 
    description: 'Sun-kissed looks for beach days and poolside lounging',
    iconClass: 'outfit-icon-beach',
    weather: ['summer'],
    colors: ['colorful', 'pastel', 'neutral'],
    occasion: ['casual'],
    style: ['trendy'],
    items: ['Cute bikini set', 'Flowy cover-up', 'Straw beach bag', 'Oversized sunglasses', 'Platform sandals']
  },
  { 
    id: 12, 
    title: 'Midnight Glam', 
    description: 'Show-stopping look for parties and special events',
    iconClass: 'outfit-icon-moon',
    weather: ['all-seasons'],
    colors: ['dark', 'colorful'],
    occasion: ['formal', 'date-night'],
    style: ['trendy'],
    items: ['Sparkly mini dress', 'Strappy heels', 'Statement jewelry', 'Clutch purse', 'Bold lip color']
  },
  { 
    id: 13, 
    title: 'Parisian Chic', 
    description: 'Effortlessly elegant French girl aesthetic',
    iconClass: 'outfit-icon-tower',
    weather: ['spring', 'fall'],
    colors: ['neutral', 'dark'],
    occasion: ['casual', 'semi-formal'],
    style: ['minimalist', 'vintage'],
    items: ['Striped Breton top', 'High-waisted trousers', 'Ballet flats', 'Red lipstick', 'Beret']
  },
  { 
    id: 14, 
    title: 'Balletcore Dreams', 
    description: 'Delicate and graceful ballet-inspired aesthetic',
    iconClass: 'outfit-icon-ballet',
    weather: ['spring', 'summer'],
    colors: ['pink', 'pastel', 'neutral'],
    occasion: ['casual', 'date-night'],
    style: ['coquette'],
    items: ['Wrap cardigan', 'Tulle skirt', 'Leg warmers', 'Satin ribbon hair tie', 'Ballet flats']
  },
  { 
    id: 15, 
    title: 'Soft Girl Sunday', 
    description: 'Sweet and innocent aesthetic with pastel tones',
    iconClass: 'outfit-icon-cloud',
    weather: ['spring', 'summer'],
    colors: ['pastel', 'pink'],
    occasion: ['casual', 'everyday'],
    style: ['coquette', 'trendy'],
    items: ['Oversized pastel sweater', 'Pleated skirt', 'Platform sneakers', 'Blush & highlighter', 'Hair clips']
  },
  { 
    id: 16, 
    title: 'Downtown Girl', 
    description: 'Cool city vibes with an edge of sophistication',
    iconClass: 'outfit-icon-city',
    weather: ['fall', 'winter'],
    colors: ['dark', 'neutral'],
    occasion: ['casual', 'semi-formal'],
    style: ['trendy', 'minimalist'],
    items: ['Leather jacket', 'Black turtleneck', 'Straight leg jeans', 'Ankle boots', 'Mini crossbody']
  },
  { 
    id: 17, 
    title: 'Cottage Core', 
    description: 'Romantic countryside aesthetic with vintage charm',
    iconClass: 'outfit-icon-sunflower',
    weather: ['spring', 'summer'],
    colors: ['pastel', 'neutral', 'colorful'],
    occasion: ['casual', 'everyday'],
    style: ['vintage', 'coquette'],
    items: ['Puff sleeve blouse', 'Prairie skirt', 'Straw basket bag', 'Flower crown', 'Lace-up boots']
  },
  { 
    id: 18, 
    title: 'Tennis Club', 
    description: 'Preppy sporty look for an active lifestyle',
    iconClass: 'outfit-icon-tennis',
    weather: ['spring', 'summer'],
    colors: ['neutral', 'pastel'],
    occasion: ['athletic', 'casual'],
    style: ['sporty', 'minimalist'],
    items: ['Tennis skirt', 'Polo shirt', 'White sneakers', 'Visor cap', 'Gold jewelry']
  },
  { 
    id: 19, 
    title: 'Library Aesthetic', 
    description: 'Cozy intellectual vibes for book lovers',
    iconClass: 'outfit-icon-book',
    weather: ['fall', 'winter'],
    colors: ['neutral', 'dark'],
    occasion: ['casual', 'everyday'],
    style: ['vintage', 'minimalist'],
    items: ['Chunky knit vest', 'Button-up shirt', 'Pleated pants', 'Loafers', 'Round glasses']
  },
  { 
    id: 20, 
    title: 'Festival Ready', 
    description: 'Boho-chic look for outdoor concerts and festivals',
    iconClass: 'outfit-icon-rainbow',
    weather: ['summer'],
    colors: ['colorful', 'neutral'],
    occasion: ['casual'],
    style: ['trendy'],
    items: ['Crochet top', 'Denim shorts', 'Fringe bag', 'Layered necklaces', 'Cowboy boots']
  },
  { 
    id: 21, 
    title: 'Pilates Princess', 
    description: 'Elevated athleisure for workout-to-brunch vibes',
    iconClass: 'outfit-icon-yoga',
    weather: ['all-seasons'],
    colors: ['pastel', 'neutral'],
    occasion: ['athletic', 'casual'],
    style: ['sporty', 'minimalist'],
    items: ['Matching workout set', 'Cropped hoodie', 'Cloud slides', 'Slick back bun', 'Stanley cup']
  },
  { 
    id: 22, 
    title: 'Cherry Girl', 
    description: 'Sweet and flirty with red accents throughout',
    iconClass: 'outfit-icon-cherry',
    weather: ['spring', 'summer'],
    colors: ['colorful', 'neutral'],
    occasion: ['casual', 'date-night'],
    style: ['trendy', 'coquette'],
    items: ['White crop top', 'Red midi skirt', 'Cherry print accessories', 'Red lip gloss', 'Gold hoops']
  },
  { 
    id: 23, 
    title: 'Clean Girl Era', 
    description: 'Minimal makeup, effortless hair, and simple fits',
    iconClass: 'outfit-icon-sparkle',
    weather: ['all-seasons'],
    colors: ['neutral'],
    occasion: ['everyday', 'casual'],
    style: ['minimalist'],
    items: ['White basics', 'Gold hoops', 'Slicked bun', 'Lip gloss', 'Fresh skincare glow']
  },
  { 
    id: 24, 
    title: 'Old Money Aesthetic', 
    description: 'Timeless elegance with understated luxury',
    iconClass: 'outfit-icon-diamond',
    weather: ['fall', 'spring'],
    colors: ['neutral', 'dark'],
    occasion: ['semi-formal', 'everyday'],
    style: ['minimalist', 'vintage'],
    items: ['Cashmere sweater', 'Tailored trousers', 'Loafers', 'Pearl jewelry', 'Structured handbag']
  },
  { 
    id: 25, 
    title: 'Brunch Beauty', 
    description: 'Chic and comfortable for weekend brunch with friends',
    iconClass: 'outfit-icon-coffee',
    weather: ['spring', 'summer'],
    colors: ['pastel', 'neutral'],
    occasion: ['casual', 'everyday'],
    style: ['trendy', 'minimalist'],
    items: ['Flowy midi dress', 'Strappy sandals', 'Woven bag', 'Sunglasses', 'Gold bangles']
  },
  { 
    id: 26, 
    title: 'Movie Night Cozy', 
    description: 'Comfy yet cute for a night in with friends',
    iconClass: 'outfit-icon-cloud',
    weather: ['fall', 'winter'],
    colors: ['neutral', 'pastel'],
    occasion: ['casual'],
    style: ['minimalist'],
    items: ['Matching loungewear set', 'Fuzzy slippers', 'Oversized blanket scarf', 'Messy bun', 'Lip mask']
  },
  { 
    id: 27, 
    title: 'Graduation Glam', 
    description: 'Elegant and celebratory for your big day',
    iconClass: 'outfit-icon-sparkle',
    weather: ['spring', 'summer'],
    colors: ['neutral', 'pastel', 'colorful'],
    occasion: ['formal', 'semi-formal'],
    style: ['minimalist', 'trendy'],
    items: ['Elegant midi dress', 'Block heels', 'Delicate jewelry', 'Polished makeup', 'Structured clutch']
  },
  { 
    id: 28, 
    title: 'Airport Chic', 
    description: 'Travel in style and comfort',
    iconClass: 'outfit-icon-sunset',
    weather: ['all-seasons'],
    colors: ['neutral', 'dark'],
    occasion: ['casual', 'everyday'],
    style: ['minimalist', 'trendy'],
    items: ['Matching sweater set', 'Wide leg pants', 'Clean sneakers', 'Crossbody bag', 'Silk scrunchie']
  },
  { 
    id: 29, 
    title: 'Art Gallery Date', 
    description: 'Sophisticated and artsy for cultural outings',
    iconClass: 'outfit-icon-tower',
    weather: ['fall', 'spring'],
    colors: ['dark', 'neutral'],
    occasion: ['date-night', 'semi-formal'],
    style: ['minimalist', 'vintage'],
    items: ['Turtleneck dress', 'Pointed boots', 'Statement earrings', 'Leather tote', 'Red lip']
  },
  { 
    id: 30, 
    title: 'Picnic Princess', 
    description: 'Sweet and romantic for outdoor dates',
    iconClass: 'outfit-icon-flower',
    weather: ['spring', 'summer'],
    colors: ['pastel', 'pink', 'colorful'],
    occasion: ['casual', 'date-night'],
    style: ['coquette', 'vintage'],
    items: ['Gingham dress', 'Straw hat', 'White sneakers', 'Wicker basket bag', 'Ribbon hair ties']
  },
  { 
    id: 31, 
    title: 'Concert Ready', 
    description: 'Stand out in the crowd at your favorite show',
    iconClass: 'outfit-icon-sparkle',
    weather: ['summer', 'spring'],
    colors: ['colorful', 'dark'],
    occasion: ['casual'],
    style: ['trendy'],
    items: ['Band tee', 'Leather pants', 'Platform boots', 'Layered necklaces', 'Statement belt']
  },
  { 
    id: 32, 
    title: 'Spa Day Look', 
    description: 'Relaxed and fresh for self-care days',
    iconClass: 'outfit-icon-cloud',
    weather: ['all-seasons'],
    colors: ['neutral', 'pastel'],
    occasion: ['casual'],
    style: ['minimalist'],
    items: ['Linen set', 'Slide sandals', 'Headband', 'Minimal jewelry', 'Fresh face']
  },
  { 
    id: 33, 
    title: 'Shopping Spree', 
    description: 'Practical yet stylish for a day of retail therapy',
    iconClass: 'outfit-icon-briefcase',
    weather: ['spring', 'fall'],
    colors: ['neutral', 'dark'],
    occasion: ['casual', 'everyday'],
    style: ['trendy', 'minimalist'],
    items: ['Blazer', 'Straight jeans', 'Loafers', 'Large tote', 'Chic sunglasses']
  },
  { 
    id: 34, 
    title: 'Birthday Queen', 
    description: 'Make a statement on your special day',
    iconClass: 'outfit-icon-sparkle',
    weather: ['all-seasons'],
    colors: ['pink', 'colorful'],
    occasion: ['formal', 'date-night'],
    style: ['trendy', 'coquette'],
    items: ['Sequin dress', 'Strappy heels', 'Birthday sash', 'Statement jewelry', 'Glam makeup']
  },
  { 
    id: 35, 
    title: 'Farmers Market', 
    description: 'Casual and cute for weekend errands',
    iconClass: 'outfit-icon-sunflower',
    weather: ['spring', 'summer'],
    colors: ['neutral', 'colorful'],
    occasion: ['casual', 'everyday'],
    style: ['minimalist', 'vintage'],
    items: ['Linen pants', 'Tank top', 'Straw tote', 'Sandals', 'Minimal makeup']
  },
  { 
    id: 36, 
    title: 'First Day Fit', 
    description: 'Make a great impression on day one',
    iconClass: 'outfit-icon-books',
    weather: ['fall', 'spring'],
    colors: ['neutral', 'pastel'],
    occasion: ['everyday', 'semi-formal'],
    style: ['minimalist', 'trendy'],
    items: ['Blouse', 'Tailored pants', 'Mules', 'Tote bag', 'Delicate necklace']
  },
  { 
    id: 37, 
    title: 'Rainy Day Chic', 
    description: 'Stay stylish even in wet weather',
    iconClass: 'outfit-icon-cloud',
    weather: ['spring', 'fall'],
    colors: ['neutral', 'dark'],
    occasion: ['casual', 'everyday'],
    style: ['minimalist', 'trendy'],
    items: ['Trench coat', 'Ankle boots', 'Umbrella', 'Waterproof bag', 'Hair up']
  },
  { 
    id: 38, 
    title: 'Thanksgiving Cozy', 
    description: 'Comfortable and festive for family gatherings',
    iconClass: 'outfit-icon-coffee',
    weather: ['fall'],
    colors: ['neutral', 'colorful'],
    occasion: ['casual', 'semi-formal'],
    style: ['minimalist', 'vintage'],
    items: ['Cozy sweater dress', 'Knee-high boots', 'Gold jewelry', 'Belt', 'Natural makeup']
  },
  { 
    id: 39, 
    title: 'New Years Eve', 
    description: 'Ring in the new year with glamour',
    iconClass: 'outfit-icon-moon',
    weather: ['winter'],
    colors: ['dark', 'colorful'],
    occasion: ['formal'],
    style: ['trendy'],
    items: ['Sparkly jumpsuit', 'Strappy heels', 'Statement earrings', 'Clutch', 'Bold lip']
  },
  { 
    id: 40, 
    title: 'Valentine\'s Day', 
    description: 'Romantic and feminine for date night',
    iconClass: 'outfit-icon-bow',
    weather: ['winter'],
    colors: ['pink', 'dark'],
    occasion: ['date-night', 'semi-formal'],
    style: ['coquette', 'trendy'],
    items: ['Red dress', 'Heels', 'Heart jewelry', 'Mini bag', 'Romantic makeup']
  },
  { 
    id: 41, 
    title: 'Spring Break Ready', 
    description: 'Vacation vibes for tropical getaways',
    iconClass: 'outfit-icon-beach',
    weather: ['summer', 'spring'],
    colors: ['colorful', 'pastel'],
    occasion: ['casual'],
    style: ['trendy'],
    items: ['Maxi dress', 'Platform sandals', 'Beach bag', 'Sun hat', 'Waterproof makeup']
  },
  { 
    id: 42, 
    title: 'Bookstore Date', 
    description: 'Intellectual and cozy for quiet outings',
    iconClass: 'outfit-icon-book',
    weather: ['fall', 'winter'],
    colors: ['neutral', 'dark'],
    occasion: ['casual', 'date-night'],
    style: ['vintage', 'minimalist'],
    items: ['Oversized cardigan', 'Turtleneck', 'Corduroy pants', 'Loafers', 'Reading glasses']
  },
  { 
    id: 43, 
    title: 'Sleepover Style', 
    description: 'Cute and comfy for staying over',
    iconClass: 'outfit-icon-cloud',
    weather: ['all-seasons'],
    colors: ['pastel', 'pink'],
    occasion: ['casual'],
    style: ['coquette'],
    items: ['Matching pajama set', 'Fuzzy socks', 'Silk eye mask', 'Hair ties', 'Skincare bag']
  },
  { 
    id: 44, 
    title: 'Ice Cream Date', 
    description: 'Sweet and playful for casual outings',
    iconClass: 'outfit-icon-cherry',
    weather: ['spring', 'summer'],
    colors: ['pastel', 'colorful'],
    occasion: ['casual', 'date-night'],
    style: ['coquette', 'trendy'],
    items: ['Ruffle top', 'Denim shorts', 'Platform sneakers', 'Crossbody bag', 'Fun earrings']
  },
  { 
    id: 45, 
    title: 'Study Session Cute', 
    description: 'Look put together while hitting the books',
    iconClass: 'outfit-icon-books',
    weather: ['all-seasons'],
    colors: ['neutral', 'pastel'],
    occasion: ['casual', 'everyday'],
    style: ['minimalist'],
    items: ['Crewneck sweatshirt', 'Bike shorts', 'Clean sneakers', 'Backpack', 'Hair claw']
  }
];

// Filter options - using CSS class names for icons instead of emojis
const filterOptions = {
  weather: [
    { id: 'spring', label: 'Spring', iconClass: 'icon-tulip' },
    { id: 'summer', label: 'Summer', iconClass: 'icon-sun' },
    { id: 'fall', label: 'Fall', iconClass: 'icon-leaf' },
    { id: 'winter', label: 'Winter', iconClass: 'icon-snowflake' },
    { id: 'all-seasons', label: 'All Seasons', iconClass: 'icon-rainbow' }
  ],
  colors: [
    { id: 'pink', label: 'Pink', iconClass: 'icon-heart-pink' },
    { id: 'pastel', label: 'Pastel', iconClass: 'icon-heart-pastel' },
    { id: 'neutral', label: 'Neutral', iconClass: 'icon-heart-white' },
    { id: 'dark', label: 'Dark', iconClass: 'icon-heart-dark' },
    { id: 'colorful', label: 'Colorful', iconClass: 'icon-rainbow' }
  ],
  occasion: [
    { id: 'casual', label: 'Casual', iconClass: 'icon-sneaker' },
    { id: 'everyday', label: 'Everyday', iconClass: 'icon-home' },
    { id: 'date-night', label: 'Date Night', iconClass: 'icon-hearts' },
    { id: 'semi-formal', label: 'Semi-Formal', iconClass: 'icon-dress' },
    { id: 'formal', label: 'Formal', iconClass: 'icon-sparkle' },
    { id: 'athletic', label: 'Athletic', iconClass: 'icon-runner' }
  ],
  style: [
    { id: 'coquette', label: 'Coquette', iconClass: 'icon-bow' },
    { id: 'minimalist', label: 'Minimalist', iconClass: 'icon-square' },
    { id: 'trendy', label: 'Trendy', iconClass: 'icon-fire' },
    { id: 'vintage', label: 'Vintage', iconClass: 'icon-rose' },
    { id: 'sporty', label: 'Sporty', iconClass: 'icon-bolt' }
  ]
};

function Outfits() {
  const [selectedFilters, setSelectedFilters] = useState({
    weather: [],
    colors: [],
    occasion: [],
    style: []
  });
  const [savedOutfits, setSavedOutfits] = useState(() => {
    const saved = localStorage.getItem('savedOutfits');
    return saved ? JSON.parse(saved) : [];
  });
  const [showBoard, setShowBoard] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(null);

  useEffect(() => {
    localStorage.setItem('savedOutfits', JSON.stringify(savedOutfits));
  }, [savedOutfits]);

  const handleSaveOutfit = (outfit) => {
    if (savedOutfits.some(o => o.id === outfit.id)) {
      // Already saved, remove it
      setSavedOutfits(savedOutfits.filter(o => o.id !== outfit.id));
      setSaveSuccess({ id: outfit.id, action: 'removed' });
    } else {
      // Save it
      setSavedOutfits([...savedOutfits, outfit]);
      setSaveSuccess({ id: outfit.id, action: 'saved' });
    }
    setTimeout(() => setSaveSuccess(null), 2000);
  };

  const handleRemoveFromBoard = (outfitId) => {
    setSavedOutfits(savedOutfits.filter(o => o.id !== outfitId));
  };

  const isOutfitSaved = (outfitId) => {
    return savedOutfits.some(o => o.id === outfitId);
  };

  const handleFilterChange = (category, value) => {
    setSelectedFilters(prev => {
      const current = prev[category];
      if (current.includes(value)) {
        return { ...prev, [category]: current.filter(v => v !== value) };
      } else {
        return { ...prev, [category]: [...current, value] };
      }
    });
  };

  const clearAllFilters = () => {
    setSelectedFilters({
      weather: [],
      colors: [],
      occasion: [],
      style: []
    });
  };

  const hasActiveFilters = Object.values(selectedFilters).some(arr => arr.length > 0);

  const filteredOutfits = outfitInspo.filter(outfit => {
    // If no filters selected, show all
    if (!hasActiveFilters) return true;
    
    // Check each category - outfit must match at least one selected option in each active category
    const matchesWeather = selectedFilters.weather.length === 0 || 
      selectedFilters.weather.some(w => outfit.weather.includes(w));
    const matchesColors = selectedFilters.colors.length === 0 || 
      selectedFilters.colors.some(c => outfit.colors.includes(c));
    const matchesOccasion = selectedFilters.occasion.length === 0 || 
      selectedFilters.occasion.some(o => outfit.occasion.includes(o));
    const matchesStyle = selectedFilters.style.length === 0 || 
      selectedFilters.style.some(s => outfit.style.includes(s));
    
    return matchesWeather && matchesColors && matchesOccasion && matchesStyle;
  });

  return (
    <div className="outfits-page page">
      {/* Clipboard Board Modal */}
      {showBoard && (
        <div className="board-modal-overlay" onClick={() => setShowBoard(false)}>
          <div className="clipboard-board" onClick={e => e.stopPropagation()}>
            {/* Clipboard Clip at top */}
            <div className="clipboard-clip">
              <div className="clip-base"></div>
              <div className="clip-lever"></div>
            </div>
            
            {/* Clipboard Paper */}
            <div className="clipboard-paper">
              <div className="paper-header">
                <h2>my outfit board</h2>
                <button className="close-board-btn" onClick={() => setShowBoard(false)}>✕</button>
              </div>
              
              <div className="paper-content">
                {savedOutfits.length === 0 ? (
                  <div className="board-empty">
                    <div className="empty-clipboard-icon">
                      <svg viewBox="0 0 24 24" width="64" height="64" fill="none" stroke="#ffb6c1" strokeWidth="1.5">
                        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
                        <rect x="8" y="2" width="8" height="4" rx="1" ry="1"/>
                        <line x1="12" y1="11" x2="12" y2="17"/>
                        <line x1="9" y1="14" x2="15" y2="14"/>
                      </svg>
                    </div>
                    <h3>no saved outfits yet!</h3>
                    <p>click "save to board" on any outfit to pin it here</p>
                  </div>
                ) : (
                  <div className="pinned-photos-grid">
                    {savedOutfits.map((outfit, index) => (
                      <div 
                        key={outfit.id} 
                        className="pinned-photo"
                        style={{ 
                          '--rotation': `${(index % 2 === 0 ? -1 : 1) * (Math.random() * 4 + 1)}deg`,
                          '--delay': `${index * 0.1}s`
                        }}
                      >
                        {/* Pin/Pushpin */}
                        <div className="photo-pin">
                          <div className="pin-head"></div>
                          <div className="pin-point"></div>
                        </div>
                        
                        {/* Photo Polaroid Style */}
                        <div className="photo-frame">
                          <div className="photo-image">
                            {/* Simple SVG icons for the board */}
                            <div className={`board-icon board-icon-${outfit.iconClass.replace('outfit-icon-', '')}`}></div>
                          </div>
                          <div className="photo-caption">
                            <h4>{outfit.title}</h4>
                            <p className="photo-description">{outfit.description}</p>
                            <div className="photo-items">
                              {outfit.items.slice(0, 3).map((item, i) => (
                                <span key={i} className="photo-item">{item}</span>
                              ))}
                              {outfit.items.length > 3 && (
                                <span className="photo-item-more">+{outfit.items.length - 3} more</span>
                              )}
                            </div>
                            <div className="caption-tags">
                              {outfit.style.map((s, i) => (
                                <span key={i} className="caption-tag">{s}</span>
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        {/* Remove button */}
                        <button 
                          className="remove-pin-btn"
                          onClick={() => handleRemoveFromBoard(outfit.id)}
                          title="Unpin from board"
                        >
                          x
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Paper texture lines */}
              <div className="paper-lines">
                {[...Array(20)].map((_, i) => (
                  <div key={i} className="paper-line"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <Hero
        variant="small"
        title={<><span style={{color: '#ffffff', WebkitTextFillColor: '#ffffff', textShadow: '0 2px 8px rgba(0,0,0,0.3), 0 0 25px rgba(255,255,255,0.8)'}}>outfit</span> <span className="pink-text">inspo</span> <span style={{color: '#ffffff', WebkitTextFillColor: '#ffffff', textShadow: '0 2px 8px rgba(0,0,0,0.3), 0 0 25px rgba(255,255,255,0.8)'}}>✧</span></>}
        subtitle="find your perfect look with our curated outfit collages"
      />

      <div className="container">
        <div className="outfits-layout">
          {/* Sidebar Filters */}
          <aside className="filter-sidebar">
            {/* Clipboard/Board Button */}
            <button 
              className="board-btn"
              onClick={() => setShowBoard(true)}
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
                <rect x="8" y="2" width="8" height="4" rx="1" ry="1"/>
              </svg>
              my board
              {savedOutfits.length > 0 && (
                <span className="board-count">{savedOutfits.length}</span>
              )}
            </button>

            <div className="filter-header">
              <h3><span className="icon-sparkle-header"></span> find your look</h3>
              {hasActiveFilters && (
                <button className="clear-filters" onClick={clearAllFilters}>
                  clear all
                </button>
              )}
            </div>

            {/* Weather Filter */}
            <div className="filter-section">
              <h4 className="filter-title"><span className="icon-sun-small"></span> Weather / Season</h4>
              <div className="checkbox-group">
                {filterOptions.weather.map(option => (
                  <label key={option.id} className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={selectedFilters.weather.includes(option.id)}
                      onChange={() => handleFilterChange('weather', option.id)}
                    />
                    <span className="checkbox-custom"></span>
                    <span className={`filter-icon ${option.iconClass}`}></span>
                    <span className="checkbox-text">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Color Filter */}
            <div className="filter-section">
              <h4 className="filter-title"><span className="icon-palette"></span> Color Palette</h4>
              <div className="checkbox-group">
                {filterOptions.colors.map(option => (
                  <label key={option.id} className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={selectedFilters.colors.includes(option.id)}
                      onChange={() => handleFilterChange('colors', option.id)}
                    />
                    <span className="checkbox-custom"></span>
                    <span className={`filter-icon ${option.iconClass}`}></span>
                    <span className="checkbox-text">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Occasion Filter */}
            <div className="filter-section">
              <h4 className="filter-title"><span className="icon-sparkle-small"></span> Occasion / Fanciness</h4>
              <div className="checkbox-group">
                {filterOptions.occasion.map(option => (
                  <label key={option.id} className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={selectedFilters.occasion.includes(option.id)}
                      onChange={() => handleFilterChange('occasion', option.id)}
                    />
                    <span className="checkbox-custom"></span>
                    <span className={`filter-icon ${option.iconClass}`}></span>
                    <span className="checkbox-text">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Style Filter */}
            <div className="filter-section">
              <h4 className="filter-title"><span className="icon-heart-small"></span> Aesthetic / Style</h4>
              <div className="checkbox-group">
                {filterOptions.style.map(option => (
                  <label key={option.id} className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={selectedFilters.style.includes(option.id)}
                      onChange={() => handleFilterChange('style', option.id)}
                    />
                    <span className="checkbox-custom"></span>
                    <span className={`filter-icon ${option.iconClass}`}></span>
                    <span className="checkbox-text">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="outfits-main">
            <div className="results-header">
              <p className="results-count">
                {filteredOutfits.length} outfit{filteredOutfits.length !== 1 ? 's' : ''} found ♡
              </p>
            </div>

            {/* Outfits Grid */}
            <div className="outfits-grid stagger-children">
              {filteredOutfits.map((outfit) => (
                <Card key={outfit.id} className="outfit-card">
                  <div className="outfit-collage">
                    <span className={`collage-icon ${outfit.iconClass}`}>
                      {outfit.iconClass === 'outfit-icon-bow' && (
                        <>
                          <span className="ribbon-tail-left"></span>
                          <span className="ribbon-tail-right"></span>
                          <span className="bow-knot"></span>
                        </>
                      )}
                      {outfit.iconClass === 'outfit-icon-smiley' && (
                        <>
                          <span className="smiley-mouth"></span>
                          <span className="smiley-cheek-left"></span>
                          <span className="smiley-cheek-right"></span>
                        </>
                      )}
                    </span>
                    <div className="collage-overlay">
                      <span className="save-heart">♡</span>
                    </div>
                  </div>
                  
                  <div className="outfit-content">
                    <div className="outfit-tags-row">
                      {outfit.style.map((s, i) => (
                        <span key={i} className="style-tag">{s}</span>
                      ))}
                    </div>
                    
                    <h3 className="outfit-title">{outfit.title}</h3>
                    <p className="outfit-description">{outfit.description}</p>
                    
                    <div className="outfit-meta">
                      <span className="meta-item">
                        {outfit.weather.map(w => 
                          filterOptions.weather.find(f => f.id === w)?.icon
                        ).join(' ')}
                      </span>
                      <span className="meta-item">
                        {outfit.colors.map(c => 
                          filterOptions.colors.find(f => f.id === c)?.icon
                        ).join(' ')}
                      </span>
                    </div>

                    <div className="outfit-items">
                      <span className="items-label">✨ outfit pieces:</span>
                      <ul className="items-list">
                        {outfit.items.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>

                    <button 
                      className={`btn btn-primary save-btn ${isOutfitSaved(outfit.id) ? 'saved' : ''}`}
                      onClick={() => handleSaveOutfit(outfit)}
                    >
                      {isOutfitSaved(outfit.id) ? 'saved ✓' : 'save to board'}
                    </button>
                  </div>
                </Card>
              ))}
            </div>

            {filteredOutfits.length === 0 && (
              <div className="empty-state">
                <span className="empty-icon">👗</span>
                <h3>no outfits match your criteria</h3>
                <p>try adjusting your filters to see more looks!</p>
                <button className="btn btn-secondary" onClick={clearAllFilters}>
                  clear all filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

export default Outfits;
