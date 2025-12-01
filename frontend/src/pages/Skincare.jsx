import { useEffect, useState } from 'react';
import Hero from '../components/Hero';
import Card from '../components/Card';
import api from '../api';
import './Skincare.css';

// Default data
const defaultSkinTypes = [
  { id: 1, name: 'Oily', description: 'Produces excess sebum, may have enlarged pores', tips: 'Use oil-free products, dont skip moisturizer, use clay masks weekly' },
  { id: 2, name: 'Dry', description: 'Feels tight, may have flaky patches', tips: 'Use rich creams, avoid harsh cleansers, hydrate from within' },
  { id: 3, name: 'Combination', description: 'Oily T-zone with dry cheeks', tips: 'Use different products for different areas, balance is key' },
  { id: 4, name: 'Sensitive', description: 'Easily irritated, may have redness', tips: 'Use fragrance-free products, patch test everything, keep routine simple' },
  { id: 5, name: 'Normal', description: 'Well-balanced, few imperfections', tips: 'Maintain with consistent routine, focus on prevention' }
];

const defaultCategories = [
  { id: 1, name: 'Cleanser', description: 'Remove makeup and impurities', order: 1, iconClass: 'cleanser-icon' },
  { id: 2, name: 'Toner', description: 'Balance and prep skin', order: 2, iconClass: 'toner-icon' },
  { id: 3, name: 'Serum', description: 'Target specific concerns', order: 3, iconClass: 'serum-icon' },
  { id: 4, name: 'Moisturizer', description: 'Hydrate and protect', order: 4, iconClass: 'moisturizer-icon' },
  { id: 5, name: 'Sunscreen', description: 'Protect from UV damage', order: 5, iconClass: 'sunscreen-icon' },
  { id: 6, name: 'Mask', description: 'Weekly treatment', order: 6, iconClass: 'mask-icon' }
];

const defaultItems = [
  { id: 1, category_id: 1, skin_type_id: 1, name: 'Gentle Foaming Cleanser', description: 'A lightweight foam cleanser that removes excess oil without stripping', benefits: 'Controls oil, unclogs pores, gentle formula', how_to_use: 'Massage onto damp face, rinse with lukewarm water' },
  { id: 2, category_id: 1, skin_type_id: 2, name: 'Cream Cleanser', description: 'A nourishing cream cleanser for dry skin', benefits: 'Hydrating, soothing, maintains moisture barrier', how_to_use: 'Apply to dry face, massage gently, rinse or wipe off' },
  { id: 3, category_id: 3, skin_type_id: null, name: 'Vitamin C Serum', description: 'Brightening serum with 15% Vitamin C', benefits: 'Brightens skin, fades dark spots, antioxidant protection', how_to_use: 'Apply 3-4 drops to clean face before moisturizer' },
  { id: 4, category_id: 3, skin_type_id: null, name: 'Hyaluronic Acid Serum', description: 'Intense hydration booster', benefits: 'Plumps skin, reduces fine lines, locks in moisture', how_to_use: 'Apply to damp skin for best absorption' },
  { id: 5, category_id: 4, skin_type_id: 1, name: 'Oil-Free Gel Moisturizer', description: 'Lightweight gel that hydrates without greasiness', benefits: 'Hydrates, mattifies, non-comedogenic', how_to_use: 'Apply after serum, morning and night' },
  { id: 6, category_id: 5, skin_type_id: null, name: 'SPF 50 Sunscreen', description: 'Lightweight, no white cast formula', benefits: 'Protects from UVA/UVB, prevents aging, no greasy feel', how_to_use: 'Apply generously as last step of morning routine, reapply every 2 hours' }
];

function Skincare() {
  const [skinTypes, setSkinTypes] = useState(defaultSkinTypes);
  const [categories, setCategories] = useState(defaultCategories);
  const [items, setItems] = useState(defaultItems);
  const [selectedSkinType, setSelectedSkinType] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [skinTypesRes, categoriesRes, itemsRes] = await Promise.all([
        api.get('/skincare/skin-types'),
        api.get('/skincare/categories'),
        api.get('/skincare')
      ]);
      setSkinTypes(skinTypesRes.data.length > 0 ? skinTypesRes.data : defaultSkinTypes);
      setCategories(categoriesRes.data.length > 0 ? categoriesRes.data : defaultCategories);
      setItems(itemsRes.data.length > 0 ? itemsRes.data : defaultItems);
    } catch (error) {
      console.log('Using default data');
    } finally {
      setLoading(false);
    }
  };

  const filteredItems = items.filter(item => {
    if (selectedSkinType && item.skin_type_id && item.skin_type_id !== selectedSkinType) return false;
    if (selectedCategory && item.category_id !== selectedCategory) return false;
    return true;
  });

  const selectedSkinTypeData = skinTypes.find(st => st.id === selectedSkinType);

  return (
    <div className="skincare-page page">
      <Hero
        variant="small"
        title={<><span className="white-text">glow up with</span> <span className="pink-text">skincare</span><div className="star-container"><span className="gold-star-icon">★</span></div></>}
        subtitle="personalized skincare routines and tips for your unique skin type"
      />

      <div className="container">
        {/* Skin Type Selector */}
        <div className="skin-type-section">
          <h3 className="section-title white-title">what's your skin type?</h3>
          <div className="skin-type-grid">
            {skinTypes.map((type) => (
              <button
                key={type.id}
                className={`skin-type-btn ${selectedSkinType === type.id ? 'active' : ''}`}
                onClick={() => setSelectedSkinType(selectedSkinType === type.id ? null : type.id)}
              >
                <span className="skin-type-name">{type.name}</span>
                <span className="skin-type-desc">{type.description}</span>
              </button>
            ))}
          </div>

          {selectedSkinTypeData && (
            <div className="skin-type-tips">
              <span className="tips-icon">💡</span>
              <p>{selectedSkinTypeData.tips}</p>
            </div>
          )}
        </div>

        {/* Routine Steps */}
        <div className="routine-section">
          <h3 className="section-title white-title">skincare routine steps</h3>
          <div className="routine-steps">
            {categories.sort((a, b) => a.order - b.order).map((category) => (
              <button
                key={category.id}
                className={`routine-step ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)}
              >
                <span className={`step-icon ${category.iconClass}`}></span>
                <span className="step-name">{category.name}</span>
                <span className="step-order">step {category.order}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="products-section">
          <h3 className="section-title white-title">recommended products</h3>
          <div className="products-grid stagger-children">
            {filteredItems.map((item) => (
              <Card key={item.id} className="product-card">
                <div className="product-category">
                  <span className={`product-icon ${categories.find(c => c.id === item.category_id)?.iconClass}`}></span>
                  {categories.find(c => c.id === item.category_id)?.name}
                </div>
                <h3 className="product-name">{item.name}</h3>
                <p className="product-description">{item.description}</p>
                
                <div className="product-details">
                  <div className="detail-block">
                    <span className="detail-label"><span className="star-icon-small"></span> benefits</span>
                    <p>{item.benefits}</p>
                  </div>
                  <div className="detail-block">
                    <span className="detail-label"><span className="sparkle-icon-small"></span> how to use</span>
                    <p>{item.how_to_use}</p>
                  </div>
                </div>

                <button className="btn btn-primary add-to-routine-btn">
                  add to routine <span className="btn-flower-icon"></span>
                </button>
              </Card>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="empty-state">
              <span className="empty-icon">✨</span>
              <p>no products found with these filters!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Skincare;



