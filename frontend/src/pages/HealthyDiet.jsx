import { useState } from 'react';
import Hero from '../components/Hero';
import Card from '../components/Card';
import './HealthyDiet.css';

function HealthyDiet() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const healthyFoods = [
    {
      id: 1,
      name: 'Avocado Toast',
      description: 'Whole grain bread topped with mashed avocado, cherry tomatoes, and a sprinkle of chia seeds',
      category: 'breakfast',
      calories: 280,
      benefits: 'Rich in healthy fats, fiber, and vitamins'
    },
    {
      id: 2,
      name: 'Greek Yogurt Bowl',
      description: 'Creamy Greek yogurt with fresh berries, granola, and a drizzle of honey',
      category: 'breakfast',
      calories: 250,
      benefits: 'High in protein and probiotics for gut health'
    },
    {
      id: 3,
      name: 'Quinoa Salad',
      description: 'Colorful quinoa salad with roasted vegetables, feta cheese, and lemon vinaigrette',
      category: 'lunch',
      calories: 320,
      benefits: 'Complete protein source with essential amino acids'
    },
    {
      id: 4,
      name: 'Salmon & Veggies',
      description: 'Baked salmon fillet with roasted sweet potatoes and steamed broccoli',
      category: 'dinner',
      calories: 380,
      benefits: 'Omega-3 fatty acids for heart and brain health'
    },
    {
      id: 5,
      name: 'Smoothie Bowl',
      description: 'Acai bowl topped with banana, strawberries, coconut flakes, and granola',
      category: 'snack',
      calories: 300,
      benefits: 'Packed with antioxidants and natural energy'
    },
    {
      id: 6,
      name: 'Chicken & Rice Bowl',
      description: 'Grilled chicken breast with brown rice, black beans, and fresh salsa',
      category: 'lunch',
      calories: 420,
      benefits: 'Lean protein and complex carbs for sustained energy'
    },
    {
      id: 7,
      name: 'Overnight Oats',
      description: 'Creamy oats soaked overnight with almond milk, chia seeds, and fresh fruit',
      category: 'breakfast',
      calories: 310,
      benefits: 'Fiber-rich for digestive health and lasting energy'
    },
    {
      id: 8,
      name: 'Veggie Wrap',
      description: 'Whole wheat wrap filled with hummus, spinach, cucumber, tomatoes, and feta',
      category: 'lunch',
      calories: 340,
      benefits: 'Plant-based protein and fiber for satiety'
    },
    {
      id: 9,
      name: 'Lemon Herb Chicken',
      description: 'Tender chicken breast with lemon, herbs, asparagus, and wild rice',
      category: 'dinner',
      calories: 410,
      benefits: 'High protein for muscle recovery and repair'
    },
    {
      id: 10,
      name: 'Dark Chocolate & Almonds',
      description: 'Rich dark chocolate squares paired with raw almonds and dried cranberries',
      category: 'snack',
      calories: 180,
      benefits: 'Antioxidants and healthy fats for brain health'
    },
    {
      id: 11,
      name: 'Banana Pancakes',
      description: 'Fluffy oat flour pancakes with mashed banana, topped with fresh berries',
      category: 'breakfast',
      calories: 290,
      benefits: 'Natural sweetness and potassium for energy'
    },
    {
      id: 12,
      name: 'Mediterranean Bowl',
      description: 'Falafel, tabbouleh, hummus, cucumber, and tzatziki over mixed greens',
      category: 'lunch',
      calories: 380,
      benefits: 'Heart-healthy fats and plant-based nutrients'
    },
    {
      id: 13,
      name: 'Shrimp Stir Fry',
      description: 'Garlic shrimp with colorful bell peppers, snap peas, and ginger sauce',
      category: 'dinner',
      calories: 320,
      benefits: 'Low-calorie protein with essential minerals'
    },
    {
      id: 14,
      name: 'Apple & Peanut Butter',
      description: 'Crisp apple slices with creamy natural peanut butter and a sprinkle of cinnamon',
      category: 'snack',
      calories: 220,
      benefits: 'Fiber and protein combo keeps you satisfied'
    },
    {
      id: 15,
      name: 'Egg White Omelette',
      description: 'Fluffy egg whites with spinach, mushrooms, tomatoes, and goat cheese',
      category: 'breakfast',
      calories: 190,
      benefits: 'High protein, low calorie for weight management'
    },
    {
      id: 16,
      name: 'Poke Bowl',
      description: 'Fresh ahi tuna with edamame, avocado, seaweed, and sesame over sushi rice',
      category: 'lunch',
      calories: 450,
      benefits: 'Omega-3s and lean protein for overall wellness'
    },
    {
      id: 17,
      name: 'Turkey Meatballs',
      description: 'Lean turkey meatballs in marinara sauce with zucchini noodles',
      category: 'dinner',
      calories: 350,
      benefits: 'Low-fat protein alternative with Italian herbs'
    },
    {
      id: 18,
      name: 'Energy Bites',
      description: 'No-bake balls with oats, honey, dark chocolate chips, and almond butter',
      category: 'snack',
      calories: 150,
      benefits: 'Quick energy boost without refined sugars'
    },
    {
      id: 19,
      name: 'Chia Pudding',
      description: 'Creamy coconut chia pudding layered with mango and passion fruit',
      category: 'breakfast',
      calories: 260,
      benefits: 'Omega-3s and fiber for heart health'
    },
    {
      id: 20,
      name: 'Buddha Bowl',
      description: 'Roasted chickpeas, sweet potato, kale, tahini dressing, and pickled onions',
      category: 'lunch',
      calories: 390,
      benefits: 'Balanced macros with plant-powered nutrition'
    },
    {
      id: 21,
      name: 'Grilled Steak Salad',
      description: 'Grass-fed steak strips over arugula with cherry tomatoes and balsamic',
      category: 'dinner',
      calories: 440,
      benefits: 'Iron and B12 for energy and vitality'
    },
    {
      id: 22,
      name: 'Cottage Cheese Bowl',
      description: 'Creamy cottage cheese with pineapple, walnuts, and a drizzle of honey',
      category: 'snack',
      calories: 200,
      benefits: 'Casein protein for muscle preservation'
    },
    {
      id: 23,
      name: 'Matcha Smoothie Bowl',
      description: 'Creamy matcha green tea blended with banana, spinach, and topped with kiwi and coconut',
      category: 'breakfast',
      calories: 275,
      benefits: 'Natural caffeine and antioxidants for focus'
    },
    {
      id: 24,
      name: 'Sweet Potato Toast',
      description: 'Roasted sweet potato slices topped with almond butter, banana, and cinnamon',
      category: 'breakfast',
      calories: 240,
      benefits: 'Complex carbs and vitamin A for energy'
    },
    {
      id: 25,
      name: 'Caprese Salad',
      description: 'Fresh mozzarella, ripe tomatoes, basil, and balsamic glaze drizzle',
      category: 'lunch',
      calories: 290,
      benefits: 'Calcium and lycopene for bone and skin health'
    },
    {
      id: 26,
      name: 'Teriyaki Tofu Bowl',
      description: 'Crispy baked tofu with teriyaki glaze, edamame, carrots, and jasmine rice',
      category: 'dinner',
      calories: 365,
      benefits: 'Plant-based protein and isoflavones'
    },
    {
      id: 27,
      name: 'Coconut Curry Soup',
      description: 'Creamy coconut milk soup with chickpeas, sweet potato, spinach, and warming spices',
      category: 'dinner',
      calories: 340,
      benefits: 'Anti-inflammatory spices and plant protein'
    },
    {
      id: 28,
      name: 'Berry Protein Shake',
      description: 'Mixed berries blended with vanilla protein powder, almond milk, and flax seeds',
      category: 'snack',
      calories: 210,
      benefits: 'Post-workout recovery and muscle building'
    },
    {
      id: 29,
      name: 'Cucumber Avocado Rolls',
      description: 'Fresh cucumber wrapped around avocado, crab, and cream cheese with soy dipping sauce',
      category: 'snack',
      calories: 165,
      benefits: 'Light and refreshing with healthy fats'
    },
    {
      id: 30,
      name: 'Stuffed Bell Peppers',
      description: 'Colorful bell peppers filled with ground turkey, quinoa, tomatoes, and melted cheese',
      category: 'dinner',
      calories: 395,
      benefits: 'Vitamin C boost with lean protein'
    },
    {
      id: 31,
      name: 'Acai Bowl',
      description: 'Frozen acai blended thick topped with granola, sliced almonds, and fresh berries',
      category: 'breakfast',
      calories: 330,
      benefits: 'Superfood antioxidants for glowing skin'
    },
    {
      id: 32,
      name: 'Tuna Poke Nachos',
      description: 'Crispy wonton chips topped with fresh ahi tuna, avocado, and spicy mayo drizzle',
      category: 'snack',
      calories: 285,
      benefits: 'Omega-3s in a fun, shareable form'
    },
    {
      id: 33,
      name: 'Lemon Garlic Pasta',
      description: 'Whole wheat spaghetti with garlic, lemon zest, parmesan, and fresh parsley',
      category: 'dinner',
      calories: 420,
      benefits: 'Comfort food with whole grain fiber'
    },
    {
      id: 34,
      name: 'Watermelon Feta Salad',
      description: 'Juicy watermelon cubes with crumbled feta, mint, and lime dressing',
      category: 'lunch',
      calories: 195,
      benefits: 'Hydrating and refreshing summer meal'
    },
    {
      id: 35,
      name: 'Protein Pancakes',
      description: 'Fluffy pancakes made with protein powder, topped with Greek yogurt and maple syrup',
      category: 'breakfast',
      calories: 350,
      benefits: 'High protein breakfast for active days'
    },
    {
      id: 36,
      name: 'Veggie Spring Rolls',
      description: 'Rice paper rolls filled with vermicelli, carrots, cucumber, and peanut dipping sauce',
      category: 'lunch',
      calories: 230,
      benefits: 'Light, fresh, and full of vegetables'
    },
    {
      id: 37,
      name: 'Honey Garlic Salmon',
      description: 'Glazed salmon with honey garlic sauce, served with steamed bok choy and rice',
      category: 'dinner',
      calories: 445,
      benefits: 'Heart-healthy omega-3s with natural sweetness'
    },
    {
      id: 38,
      name: 'Frozen Yogurt Bark',
      description: 'Greek yogurt spread thin with berries, dark chocolate chips, and frozen',
      category: 'snack',
      calories: 140,
      benefits: 'Healthy frozen treat with probiotics'
    },
    {
      id: 39,
      name: 'Mushroom Risotto',
      description: 'Creamy arborio rice with sautéed wild mushrooms, parmesan, and fresh thyme',
      category: 'dinner',
      calories: 380,
      benefits: 'B vitamins and umami satisfaction'
    },
    {
      id: 40,
      name: 'Breakfast Burrito',
      description: 'Scrambled eggs, black beans, avocado, salsa, and cheese in a whole wheat tortilla',
      category: 'breakfast',
      calories: 410,
      benefits: 'Protein-packed start to your morning'
    },
    {
      id: 41,
      name: 'Thai Peanut Noodles',
      description: 'Rice noodles with crunchy vegetables, cilantro, and creamy peanut sauce',
      category: 'lunch',
      calories: 375,
      benefits: 'Plant-based protein from peanuts'
    },
    {
      id: 42,
      name: 'Stuffed Avocado',
      description: 'Ripe avocado halves filled with chicken salad, corn, and lime crema',
      category: 'lunch',
      calories: 340,
      benefits: 'Healthy fats keep you full longer'
    },
    {
      id: 43,
      name: 'Veggie Omelette',
      description: 'Fluffy eggs filled with bell peppers, onions, spinach, and cheddar cheese',
      category: 'breakfast',
      calories: 280,
      benefits: 'Complete protein with vegetables'
    },
    {
      id: 44,
      name: 'Cauliflower Rice Bowl',
      description: 'Riced cauliflower topped with grilled chicken, avocado, and cilantro lime dressing',
      category: 'dinner',
      calories: 295,
      benefits: 'Low-carb alternative with tons of flavor'
    },
    {
      id: 45,
      name: 'Hummus & Veggie Plate',
      description: 'Creamy hummus served with carrot sticks, cucumber, bell peppers, and pita',
      category: 'snack',
      calories: 245,
      benefits: 'Fiber and plant protein for satiety'
    },
    {
      id: 46,
      name: 'Mango Sticky Rice',
      description: 'Sweet coconut sticky rice topped with fresh mango slices and sesame seeds',
      category: 'snack',
      calories: 320,
      benefits: 'Natural sweetness and tropical vitamins'
    },
    {
      id: 47,
      name: 'Grilled Cheese & Tomato Soup',
      description: 'Whole grain bread with melted cheddar, served with creamy tomato basil soup',
      category: 'lunch',
      calories: 385,
      benefits: 'Comfort food classic with lycopene'
    },
    {
      id: 48,
      name: 'Baked Falafel Wrap',
      description: 'Crispy baked falafel in pita with hummus, tomatoes, cucumber, and tahini',
      category: 'lunch',
      calories: 360,
      benefits: 'Plant protein powerhouse'
    },
    {
      id: 49,
      name: 'Lemon Blueberry Muffins',
      description: 'Light whole wheat muffins with fresh blueberries and lemon zest',
      category: 'breakfast',
      calories: 185,
      benefits: 'Antioxidant-rich grab-and-go breakfast'
    },
    {
      id: 50,
      name: 'Chicken Caesar Salad',
      description: 'Grilled chicken over crisp romaine with parmesan, croutons, and Caesar dressing',
      category: 'lunch',
      calories: 365,
      benefits: 'Classic protein-rich salad'
    },
    {
      id: 51,
      name: 'Beef & Broccoli',
      description: 'Tender beef strips stir-fried with broccoli in savory ginger garlic sauce',
      category: 'dinner',
      calories: 380,
      benefits: 'Iron and vitamin C for energy'
    },
    {
      id: 52,
      name: 'Trail Mix',
      description: 'Mixed nuts, dried cranberries, dark chocolate chips, and coconut flakes',
      category: 'snack',
      calories: 175,
      benefits: 'Portable energy with healthy fats'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Foods', iconClass: 'css-apple-filter' },
    { id: 'breakfast', name: 'Breakfast', iconClass: 'css-croissant' },
    { id: 'lunch', name: 'Lunch', iconClass: 'css-salad' },
    { id: 'dinner', name: 'Dinner', iconClass: 'css-plate' },
    { id: 'snack', name: 'Snacks', iconClass: 'css-strawberry' }
  ];

  // Filter foods based on selected category
  const filteredFoods = selectedCategory === 'all' 
    ? healthyFoods 
    : healthyFoods.filter(food => food.category === selectedCategory);

  return (
    <div className="healthy-diet-page page">
      <Hero
        variant="small"
        title={<><span className="white-text">nourish your</span> <span className="hot-pink-text">body</span></>}
        subtitle="delicious and nutritious meal ideas to fuel your wellness journey"
      />

      <div className="container">
        {/* Category Filter */}
        <div className="category-filter">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`filter-btn ${selectedCategory === category.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category.id)}
            >
              <span className={`filter-icon ${category.iconClass}`}></span> {category.name}
            </button>
          ))}
        </div>

        {/* Results Count */}
        <p className="results-count">{filteredFoods.length} {selectedCategory === 'all' ? 'foods' : selectedCategory} options ♡</p>

        {/* Foods Grid */}
        <div className="foods-grid stagger-children">
          {filteredFoods.map((food) => (
            <Card
              key={food.id}
              title={food.name}
              description={food.description}
              className="food-card"
            >
              <div className="food-meta">
                <span className="food-calories">{food.calories} cal</span>
                <span className="food-category">{food.category}</span>
              </div>
              <div className="food-benefits">
                <span className="benefits-label">benefits:</span>
                <p>{food.benefits}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HealthyDiet;

