import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Shop.css';

function Shop() {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'all items' },
    { id: 'tops', label: 'tops' },
    { id: 'bottoms', label: 'bottoms' },
    { id: 'accessories', label: 'accessories' },
    { id: 'sets', label: 'matching sets' },
  ];

  const products = [
    {
      id: 1,
      name: 'BetterMe Pink Hoodie',
      price: 45.00,
      category: 'tops',
      image: 'linear-gradient(135deg, #ff69b4 0%, #ff8fab 100%)',
      description: 'cozy oversized hoodie with embroidered logo',
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      bestseller: true
    },
    {
      id: 2,
      name: 'Coquette Baby Tee',
      price: 28.00,
      category: 'tops',
      image: 'linear-gradient(135deg, #ffb6c1 0%, #ffc0cb 100%)',
      description: 'fitted crop top with bow detail',
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      bestseller: true
    },
    {
      id: 3,
      name: 'Self Love Club Crewneck',
      price: 52.00,
      category: 'tops',
      image: 'linear-gradient(135deg, #dda0dd 0%, #e6a8d7 100%)',
      description: 'vintage wash crewneck sweatshirt',
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      bestseller: false
    },
    {
      id: 4,
      name: 'Wellness Babe Tank',
      price: 24.00,
      category: 'tops',
      image: 'linear-gradient(135deg, #f8c8dc 0%, #ffb7c5 100%)',
      description: 'ribbed tank with subtle logo',
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      bestseller: false
    },
    {
      id: 5,
      name: 'Pink Cloud Sweatpants',
      price: 48.00,
      category: 'bottoms',
      image: 'linear-gradient(135deg, #ffb6c1 0%, #ff69b4 100%)',
      description: 'ultra soft joggers with pockets',
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      bestseller: true
    },
    {
      id: 6,
      name: 'Glow Up Shorts',
      price: 32.00,
      category: 'bottoms',
      image: 'linear-gradient(135deg, #ffc0cb 0%, #ffb6c1 100%)',
      description: 'comfy lounge shorts',
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      bestseller: false
    },
    {
      id: 7,
      name: 'Affirmation Scrunchie Set',
      price: 15.00,
      category: 'accessories',
      image: 'linear-gradient(135deg, #ff69b4 0%, #dda0dd 100%)',
      description: 'set of 5 silk scrunchies',
      sizes: ['One Size'],
      bestseller: true
    },
    {
      id: 8,
      name: 'Self Care Tote Bag',
      price: 22.00,
      category: 'accessories',
      image: 'linear-gradient(135deg, #f0a1c2 0%, #ff8fab 100%)',
      description: 'canvas tote with cute print',
      sizes: ['One Size'],
      bestseller: false
    },
    {
      id: 9,
      name: 'Bow Hair Clips',
      price: 12.00,
      category: 'accessories',
      image: 'linear-gradient(135deg, #ffb7c5 0%, #ffc0cb 100%)',
      description: 'set of 3 satin bow clips',
      sizes: ['One Size'],
      bestseller: false
    },
    {
      id: 10,
      name: 'BetterMe Matching Set',
      price: 75.00,
      category: 'sets',
      image: 'linear-gradient(135deg, #ff69b4 0%, #ffb6c1 100%)',
      description: 'hoodie + sweatpants combo',
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      bestseller: true
    },
    {
      id: 11,
      name: 'Pilates Princess Set',
      price: 58.00,
      category: 'sets',
      image: 'linear-gradient(135deg, #e6a8d7 0%, #dda0dd 100%)',
      description: 'sports bra + leggings set',
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      bestseller: false
    },
    {
      id: 12,
      name: 'Confidence Queen Cap',
      price: 18.00,
      category: 'accessories',
      image: 'linear-gradient(135deg, #ff8fab 0%, #ff69b4 100%)',
      description: 'embroidered dad cap',
      sizes: ['One Size'],
      bestseller: false
    },
  ];

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const addToCart = (product, size) => {
    const existingItem = cart.find(item => item.id === product.id && item.size === size);
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id && item.size === size 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, size, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId, size) => {
    setCart(cart.filter(item => !(item.id === productId && item.size === size)));
  };

  const updateQuantity = (productId, size, delta) => {
    setCart(cart.map(item => {
      if (item.id === productId && item.size === size) {
        const newQuantity = item.quantity + delta;
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="shop-page">
      <div className="shop-header">
        <h1>BetterMe Shop</h1>
        <p>cute merch for your glow up journey</p>
        
        {/* Cart button in top right */}
        <button 
          className="cart-top-btn"
          onClick={() => setShowCart(true)}
        >
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="9" cy="21" r="1"/>
            <circle cx="20" cy="21" r="1"/>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
          </svg>
          <span className="cart-label">cart</span>
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </button>
      </div>

      <div className="shop-categories">
        {categories.map(cat => (
          <button
            key={cat.id}
            className={`category-btn ${selectedCategory === cat.id ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat.id)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="products-grid">
        {filteredProducts.map(product => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onAddToCart={addToCart}
          />
        ))}
      </div>


      {/* Cart Drawer */}
      {showCart && (
        <div className="cart-overlay" onClick={() => setShowCart(false)}>
          <div className="cart-drawer" onClick={e => e.stopPropagation()}>
            <div className="cart-header">
              <h2>your bag</h2>
              <button className="close-cart" onClick={() => setShowCart(false)}>x</button>
            </div>
            
            {cart.length === 0 ? (
              <div className="cart-empty">
                <span className="empty-icon">shopping bag icon</span>
                <p>your bag is empty!</p>
                <button className="continue-btn" onClick={() => setShowCart(false)}>
                  continue shopping
                </button>
              </div>
            ) : (
              <>
                <div className="cart-items">
                  {cart.map((item, index) => (
                    <div key={`${item.id}-${item.size}-${index}`} className="cart-item">
                      <div 
                        className="cart-item-image"
                        style={{ background: item.image }}
                      />
                      <div className="cart-item-details">
                        <h4>{item.name}</h4>
                        <p>size: {item.size}</p>
                        <p className="cart-item-price">${item.price.toFixed(2)}</p>
                      </div>
                      <div className="cart-item-actions">
                        <div className="quantity-controls">
                          <button onClick={() => updateQuantity(item.id, item.size, -1)}>-</button>
                          <span>{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.size, 1)}>+</button>
                        </div>
                        <button 
                          className="remove-item"
                          onClick={() => removeFromCart(item.id, item.size)}
                        >
                          remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="cart-footer">
                  <div className="cart-total">
                    <span>total:</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                  <button className="checkout-btn">
                    checkout
                  </button>
                  <p className="checkout-note">free shipping on orders over $50!</p>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function ProductCard({ product, onAddToCart }) {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [showSizes, setShowSizes] = useState(false);

  const handleAddToCart = () => {
    onAddToCart(product, selectedSize);
    setShowSizes(false);
  };

  return (
    <div className="product-card">
      {product.bestseller && <span className="bestseller-badge">bestseller</span>}
      <div 
        className="product-image"
        style={{ background: product.image }}
      >
        <div className="product-image-icon">
          {product.category === 'tops' && 'top icon'}
          {product.category === 'bottoms' && 'bottom icon'}
          {product.category === 'accessories' && 'accessory icon'}
          {product.category === 'sets' && 'set icon'}
        </div>
      </div>
      <div className="product-info">
        <h3>{product.name}</h3>
        <p className="product-description">{product.description}</p>
        <p className="product-price">${product.price.toFixed(2)}</p>
        
        {showSizes ? (
          <div className="size-selector">
            <div className="sizes">
              {product.sizes.map(size => (
                <button
                  key={size}
                  className={`size-btn ${selectedSize === size ? 'selected' : ''}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
            <button className="add-to-cart-btn" onClick={handleAddToCart}>
              add to bag
            </button>
          </div>
        ) : (
          <button 
            className="select-size-btn"
            onClick={() => setShowSizes(true)}
          >
            select size
          </button>
        )}
      </div>
    </div>
  );
}

export default Shop;

