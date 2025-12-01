exports.seed = async function(knex) {
  // Clear existing data
  await knex('affirmations').del();
  await knex('skincare_items').del();
  await knex('skincare_categories').del();
  await knex('skin_types').del();
  await knex('outfits').del();
  await knex('outfit_categories').del();
  await knex('workouts').del();
  await knex('workout_categories').del();

  // Seed Workout Categories
  await knex('workout_categories').insert([
    { id: 1, name: 'Pilates', description: 'Low-impact exercises for flexibility and core strength', icon: '🧘‍♀️', image_url: '/images/pilates.jpg' },
    { id: 2, name: 'Yoga', description: 'Mind-body practice for flexibility and relaxation', icon: '🕉️', image_url: '/images/yoga.jpg' },
    { id: 3, name: 'Dance', description: 'Fun cardio workouts through dance', icon: '💃', image_url: '/images/dance.jpg' },
    { id: 4, name: 'Strength', description: 'Build lean muscle and tone your body', icon: '💪', image_url: '/images/strength.jpg' },
    { id: 5, name: 'Cardio', description: 'Get your heart pumping with energizing workouts', icon: '🏃‍♀️', image_url: '/images/cardio.jpg' },
    { id: 6, name: 'Stretching', description: 'Improve flexibility and prevent injury', icon: '🌸', image_url: '/images/stretching.jpg' }
  ]);

  // Seed Workouts
  await knex('workouts').insert([
    { category_id: 1, title: 'Morning Glow Pilates', description: 'Start your day with this energizing 20-minute pilates routine', difficulty: 'beginner', duration_minutes: 20, calories_burned: 150, exercises: JSON.stringify(['Hundred', 'Roll Up', 'Single Leg Circles', 'Rolling Like a Ball']) },
    { category_id: 1, title: 'Slim Waist Sculpt', description: 'Target your core and waist for that hourglass figure', difficulty: 'intermediate', duration_minutes: 30, calories_burned: 200, exercises: JSON.stringify(['Criss Cross', 'Side Plank', 'Teaser', 'Swimming']) },
    { category_id: 2, title: 'Sunrise Flow', description: 'A gentle yoga flow to wake up your body', difficulty: 'beginner', duration_minutes: 15, calories_burned: 80, exercises: JSON.stringify(['Cat-Cow', 'Downward Dog', 'Warrior I', 'Childs Pose']) },
    { category_id: 3, title: 'Dance Cardio Party', description: 'Fun dance moves to your favorite songs', difficulty: 'beginner', duration_minutes: 25, calories_burned: 250, exercises: JSON.stringify(['Grapevine', 'Step Touch', 'Body Rolls', 'Hip Shakes']) },
    { category_id: 4, title: 'Booty Sculpt', description: 'Build a peachy booty with these targeted exercises', difficulty: 'intermediate', duration_minutes: 20, calories_burned: 180, exercises: JSON.stringify(['Squats', 'Lunges', 'Glute Bridges', 'Fire Hydrants']) },
    { category_id: 5, title: 'Hot Girl Walk Treadmill', description: 'Indoor walking workout for when you cant go outside', difficulty: 'beginner', duration_minutes: 30, calories_burned: 200, exercises: JSON.stringify(['Warm Up Walk', 'Incline Intervals', 'Power Walk', 'Cool Down']) }
  ]);

  // Seed Outfit Categories
  await knex('outfit_categories').insert([
    { id: 1, name: 'Everyday Cute', description: 'Adorable looks for daily life', icon: '🎀', image_url: '/images/everyday.jpg' },
    { id: 2, name: 'Gym Fits', description: 'Stylish workout wear', icon: '🏋️‍♀️', image_url: '/images/gym.jpg' },
    { id: 3, name: 'Date Night', description: 'Romantic and elegant looks', icon: '💕', image_url: '/images/date.jpg' },
    { id: 4, name: 'Coquette', description: 'Feminine, dainty, and romantic aesthetic', icon: '🩰', image_url: '/images/coquette.jpg' },
    { id: 5, name: 'School/Work', description: 'Put-together looks for productivity', icon: '📚', image_url: '/images/school.jpg' }
  ]);

  // Seed Outfits
  await knex('outfits').insert([
    { category_id: 4, title: 'Pink Bow Princess', description: 'A dreamy coquette look with ribbons and bows', style: 'coquette', season: 'spring', occasion: 'everyday', items: JSON.stringify(['White ruffle blouse', 'Pink pleated mini skirt', 'Ballet flats', 'Satin bow hair clips']), tags: JSON.stringify(['feminine', 'romantic', 'girly']) },
    { category_id: 4, title: 'Lace & Grace', description: 'Delicate lace details for a soft look', style: 'coquette', season: 'all', occasion: 'date', items: JSON.stringify(['Lace trim cami', 'High-waisted trousers', 'Kitten heels', 'Pearl earrings']), tags: JSON.stringify(['elegant', 'romantic', 'soft']) },
    { category_id: 2, title: 'Pilates Princess', description: 'Cute and functional gym wear', style: 'sporty', season: 'all', occasion: 'gym', items: JSON.stringify(['Matching sports bra', 'High-waisted leggings', 'Cloud sneakers', 'Scrunchie']), tags: JSON.stringify(['athletic', 'cute', 'matching']) },
    { category_id: 1, title: 'Coffee Run Cutie', description: 'Effortlessly chic for errands', style: 'casual', season: 'fall', occasion: 'everyday', items: JSON.stringify(['Oversized cardigan', 'Basic tee', 'Mom jeans', 'White sneakers']), tags: JSON.stringify(['cozy', 'simple', 'trendy']) },
    { category_id: 3, title: 'Sunset Romance', description: 'Perfect for a romantic dinner', style: 'elegant', season: 'summer', occasion: 'date', items: JSON.stringify(['Satin slip dress', 'Strappy heels', 'Dainty gold necklace', 'Mini clutch']), tags: JSON.stringify(['glamorous', 'romantic', 'chic']) }
  ]);

  // Seed Skin Types
  await knex('skin_types').insert([
    { id: 1, name: 'Oily', description: 'Produces excess sebum, may have enlarged pores', tips: 'Use oil-free products, dont skip moisturizer, use clay masks weekly' },
    { id: 2, name: 'Dry', description: 'Feels tight, may have flaky patches', tips: 'Use rich creams, avoid harsh cleansers, hydrate from within' },
    { id: 3, name: 'Combination', description: 'Oily T-zone with dry cheeks', tips: 'Use different products for different areas, balance is key' },
    { id: 4, name: 'Sensitive', description: 'Easily irritated, may have redness', tips: 'Use fragrance-free products, patch test everything, keep routine simple' },
    { id: 5, name: 'Normal', description: 'Well-balanced, few imperfections', tips: 'Maintain with consistent routine, focus on prevention' }
  ]);

  // Seed Skincare Categories
  await knex('skincare_categories').insert([
    { id: 1, name: 'Cleanser', description: 'Remove makeup and impurities', order: 1, icon: '🧴' },
    { id: 2, name: 'Toner', description: 'Balance and prep skin', order: 2, icon: '💧' },
    { id: 3, name: 'Serum', description: 'Target specific concerns', order: 3, icon: '✨' },
    { id: 4, name: 'Moisturizer', description: 'Hydrate and protect', order: 4, icon: '🌸' },
    { id: 5, name: 'Sunscreen', description: 'Protect from UV damage', order: 5, icon: '☀️' },
    { id: 6, name: 'Mask', description: 'Weekly treatment', order: 6, icon: '🎭' }
  ]);

  // Seed Skincare Items
  await knex('skincare_items').insert([
    { category_id: 1, skin_type_id: 1, name: 'Gentle Foaming Cleanser', description: 'A lightweight foam cleanser that removes excess oil without stripping', benefits: 'Controls oil, unclogs pores, gentle formula', how_to_use: 'Massage onto damp face, rinse with lukewarm water' },
    { category_id: 1, skin_type_id: 2, name: 'Cream Cleanser', description: 'A nourishing cream cleanser for dry skin', benefits: 'Hydrating, soothing, maintains moisture barrier', how_to_use: 'Apply to dry face, massage gently, rinse or wipe off' },
    { category_id: 3, skin_type_id: null, name: 'Vitamin C Serum', description: 'Brightening serum with 15% Vitamin C', benefits: 'Brightens skin, fades dark spots, antioxidant protection', how_to_use: 'Apply 3-4 drops to clean face before moisturizer' },
    { category_id: 3, skin_type_id: null, name: 'Hyaluronic Acid Serum', description: 'Intense hydration booster', benefits: 'Plumps skin, reduces fine lines, locks in moisture', how_to_use: 'Apply to damp skin for best absorption' },
    { category_id: 4, skin_type_id: 1, name: 'Oil-Free Gel Moisturizer', description: 'Lightweight gel that hydrates without greasiness', benefits: 'Hydrates, mattifies, non-comedogenic', how_to_use: 'Apply after serum, morning and night' },
    { category_id: 5, skin_type_id: null, name: 'SPF 50 Sunscreen', description: 'Lightweight, no white cast formula', benefits: 'Protects from UVA/UVB, prevents aging, no greasy feel', how_to_use: 'Apply generously as last step of morning routine, reapply every 2 hours' }
  ]);

  // Seed Affirmations
  await knex('affirmations').insert([
    { text: 'You are beautiful inside and out. Your worth is not determined by your appearance. 💖', category: 'beauty' },
    { text: 'You are stronger than you think. Every challenge makes you more powerful. 💪', category: 'strength' },
    { text: 'You deserve love, happiness, and all the good things coming your way. ✨', category: 'self-love' },
    { text: 'Your body is incredible. Thank it for carrying you through each day. 🌸', category: 'body-positivity' },
    { text: 'You are capable of achieving anything you set your mind to. Dream big! 🌟', category: 'motivation' },
    { text: 'Its okay to rest. Taking care of yourself is productive. 💤', category: 'self-care' },
    { text: 'You are worthy of respect and kindness, especially from yourself. 💕', category: 'self-love' },
    { text: 'Your uniqueness is your superpower. Embrace what makes you different! 🦋', category: 'confidence' },
    { text: 'Today is a fresh start. You can do hard things. 🌅', category: 'motivation' },
    { text: 'You radiate confidence and grace. Others are inspired by your energy. ✨', category: 'confidence' },
    { text: 'Progress, not perfection. Every small step counts! 👣', category: 'motivation' },
    { text: 'You are allowed to take up space and be seen. Shine bright! 💫', category: 'confidence' }
  ]);
};



