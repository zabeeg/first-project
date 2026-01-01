import { useEffect, useState, useRef } from 'react';
import Hero from '../components/Hero';
import Card from '../components/Card';
import api from '../api';
import './Workouts.css';

// Custom workout routines - each workout has its own specific exercises
const workoutRoutines = {
  // Workout ID 1: Morning Glow Pilates (20 min)
  1: [
    { name: 'Warm-Up Breathing', reps: '10 deep breaths', duration: 60 },
    { name: 'The Hundred', reps: '100 arm pumps', duration: 90 },
    { name: 'Roll Ups', reps: '10 reps', duration: 90 },
    { name: 'Single Leg Circles', reps: '8 each leg', duration: 120 },
    { name: 'Rolling Like a Ball', reps: '10 rolls', duration: 60 },
    { name: 'Single Leg Stretch', reps: '10 each leg', duration: 90 },
    { name: 'Double Leg Stretch', reps: '10 reps', duration: 90 },
    { name: 'Criss Cross', reps: '20 reps', duration: 90 },
    { name: 'Spine Stretch Forward', reps: '8 reps', duration: 90 },
    { name: 'Swan Dive', reps: '8 reps', duration: 90 },
    { name: 'Side Kicks', reps: '10 each side', duration: 120 },
    { name: 'Teaser Prep', reps: '6 reps', duration: 60 },
    { name: 'Swimming', reps: '30 seconds', duration: 45 },
    { name: 'Cool Down Stretch', reps: '60 seconds', duration: 60 },
  ],
  // Workout ID 2: Slim Waist Sculpt (30 min)
  2: [
    { name: 'Warm-Up March', reps: '2 minutes', duration: 120 },
    { name: 'Standing Side Crunches', reps: '20 each side', duration: 120 },
    { name: 'Bicycle Crunches', reps: '30 reps', duration: 90 },
    { name: 'Russian Twists', reps: '40 reps', duration: 120 },
    { name: 'Plank Hold', reps: '45 seconds', duration: 60 },
    { name: 'Side Plank Dips', reps: '15 each side', duration: 120 },
    { name: 'Mountain Climbers', reps: '30 reps', duration: 90 },
    { name: 'Dead Bug', reps: '20 reps', duration: 90 },
    { name: 'Heel Touches', reps: '30 reps', duration: 90 },
    { name: 'Leg Raises', reps: '15 reps', duration: 90 },
    { name: 'Flutter Kicks', reps: '40 kicks', duration: 60 },
    { name: 'Plank Hip Dips', reps: '20 reps', duration: 90 },
    { name: 'Windshield Wipers', reps: '20 reps', duration: 90 },
    { name: 'Seated Twists', reps: '20 each side', duration: 90 },
    { name: 'Standing Oblique Stretch', reps: '30 seconds each side', duration: 90 },
    { name: 'Cat-Cow Stretch', reps: '10 reps', duration: 60 },
    { name: 'Child\'s Pose', reps: '60 seconds', duration: 60 },
  ],
  // Workout ID 3: Sunrise Flow (15 min)
  3: [
    { name: 'Seated Meditation', reps: '1 minute', duration: 60 },
    { name: 'Cat-Cow Stretches', reps: '10 reps', duration: 60 },
    { name: 'Downward Dog', reps: '30 seconds', duration: 45 },
    { name: 'Sun Salutation A', reps: '3 rounds', duration: 180 },
    { name: 'Warrior I', reps: '30 seconds each side', duration: 75 },
    { name: 'Warrior II', reps: '30 seconds each side', duration: 75 },
    { name: 'Triangle Pose', reps: '30 seconds each side', duration: 75 },
    { name: 'Tree Pose', reps: '30 seconds each side', duration: 75 },
    { name: 'Seated Forward Fold', reps: '45 seconds', duration: 60 },
    { name: 'Supine Twist', reps: '30 seconds each side', duration: 75 },
    { name: 'Savasana', reps: '2 minutes', duration: 120 },
  ],
  // Workout ID 4: Dance Cardio Party (25 min)
  4: [
    { name: 'Warm-Up March & Clap', reps: '2 minutes', duration: 120 },
    { name: 'Step Touches', reps: '32 counts', duration: 60 },
    { name: 'Grapevine Steps', reps: '16 each way', duration: 90 },
    { name: 'Body Rolls', reps: '16 reps', duration: 60 },
    { name: 'Cha-Cha Steps', reps: '32 counts', duration: 90 },
    { name: 'Hip Shakes', reps: '32 counts', duration: 60 },
    { name: 'Arm Waves', reps: '16 reps', duration: 60 },
    { name: 'Jump & Turn', reps: '16 reps', duration: 90 },
    { name: 'Shimmy Shoulders', reps: '32 counts', duration: 60 },
    { name: 'Salsa Steps', reps: '32 counts', duration: 90 },
    { name: 'Pop & Lock', reps: '16 reps', duration: 60 },
    { name: 'Freestyle Dance', reps: '2 minutes', duration: 120 },
    { name: 'High Knees Dance', reps: '32 counts', duration: 60 },
    { name: 'Spin & Pose', reps: '8 reps', duration: 60 },
    { name: 'Cool Down Sway', reps: '1 minute', duration: 60 },
    { name: 'Stretch & Breathe', reps: '1 minute', duration: 60 },
  ],
  // Workout ID 5: Booty Sculpt (20 min)
  5: [
    { name: 'Glute Activation Circles', reps: '20 each leg', duration: 90 },
    { name: 'Squats', reps: '20 reps', duration: 90 },
    { name: 'Sumo Squats', reps: '15 reps', duration: 75 },
    { name: 'Glute Bridges', reps: '20 reps', duration: 75 },
    { name: 'Single Leg Bridges', reps: '12 each leg', duration: 90 },
    { name: 'Donkey Kicks', reps: '20 each leg', duration: 120 },
    { name: 'Fire Hydrants', reps: '20 each leg', duration: 120 },
    { name: 'Pulse Squats', reps: '30 pulses', duration: 60 },
    { name: 'Curtsy Lunges', reps: '12 each leg', duration: 90 },
    { name: 'Frog Pumps', reps: '25 reps', duration: 75 },
    { name: 'Clam Shells', reps: '20 each side', duration: 90 },
    { name: 'Wall Sit', reps: '45 seconds', duration: 60 },
    { name: 'Glute Stretch', reps: '30 seconds each side', duration: 75 },
  ],
  // Workout ID 6: Hot Girl Walk Treadmill (30 min)
  6: [
    { name: 'Warm-Up Walk', reps: '3 minutes (easy pace)', duration: 180 },
    { name: 'Brisk Walk', reps: '4 minutes', duration: 240 },
    { name: 'Incline Walk (5%)', reps: '3 minutes', duration: 180 },
    { name: 'Power Walk', reps: '4 minutes', duration: 240 },
    { name: 'Incline Walk (8%)', reps: '2 minutes', duration: 120 },
    { name: 'Side Shuffle Right', reps: '1 minute', duration: 60 },
    { name: 'Side Shuffle Left', reps: '1 minute', duration: 60 },
    { name: 'Fast Walk', reps: '3 minutes', duration: 180 },
    { name: 'High Incline (10%)', reps: '2 minutes', duration: 120 },
    { name: 'Recovery Walk', reps: '2 minutes', duration: 120 },
    { name: 'Walking Lunges', reps: '20 steps', duration: 90 },
    { name: 'Cool Down Walk', reps: '3 minutes', duration: 180 },
    { name: 'Standing Stretches', reps: '2 minutes', duration: 120 },
  ],
  // Workout ID 7: Flat Tummy Flow (25 min)
  7: [
    { name: 'Deep Breathing', reps: '10 breaths', duration: 60 },
    { name: 'Dead Bug', reps: '16 reps', duration: 75 },
    { name: 'Crunches', reps: '25 reps', duration: 90 },
    { name: 'Reverse Crunches', reps: '20 reps', duration: 75 },
    { name: 'Plank Hold', reps: '45 seconds', duration: 60 },
    { name: 'Toe Touches', reps: '20 reps', duration: 75 },
    { name: 'Scissor Kicks', reps: '30 reps', duration: 75 },
    { name: 'Bicycle Crunches', reps: '30 reps', duration: 90 },
    { name: 'V-Ups', reps: '15 reps', duration: 75 },
    { name: 'Plank to Downward Dog', reps: '10 reps', duration: 75 },
    { name: 'Mountain Climbers', reps: '30 reps', duration: 75 },
    { name: 'Leg Raises', reps: '15 reps', duration: 75 },
    { name: 'Hollow Body Hold', reps: '30 seconds', duration: 45 },
    { name: 'Side Plank', reps: '30 seconds each side', duration: 75 },
    { name: 'Boat Pose Hold', reps: '30 seconds', duration: 45 },
    { name: 'Ab Stretch', reps: '1 minute', duration: 60 },
  ],
  // Workout ID 8: Pilates for Posture (20 min)
  8: [
    { name: 'Neck Stretches', reps: '30 seconds each side', duration: 75 },
    { name: 'Shoulder Rolls', reps: '16 rolls', duration: 60 },
    { name: 'Cat-Cow', reps: '12 reps', duration: 75 },
    { name: 'Thread the Needle', reps: '8 each side', duration: 90 },
    { name: 'Swimming', reps: '30 seconds', duration: 45 },
    { name: 'Swan Prep', reps: '10 reps', duration: 75 },
    { name: 'Chest Opener', reps: '45 seconds', duration: 60 },
    { name: 'Back Extension', reps: '12 reps', duration: 75 },
    { name: 'Spine Stretch', reps: '10 reps', duration: 75 },
    { name: 'Shoulder Bridge', reps: '12 reps', duration: 75 },
    { name: 'Mermaid Stretch', reps: '30 seconds each side', duration: 75 },
    { name: 'Wall Angels', reps: '15 reps', duration: 90 },
    { name: 'Standing Roll Down', reps: '8 reps', duration: 75 },
    { name: 'Final Posture Check', reps: '1 minute', duration: 60 },
  ],
  // Workout ID 9: Stress Relief Yoga (30 min)
  9: [
    { name: 'Seated Breathing', reps: '2 minutes', duration: 120 },
    { name: 'Gentle Neck Rolls', reps: '8 each direction', duration: 75 },
    { name: 'Seated Side Stretch', reps: '30 seconds each side', duration: 75 },
    { name: 'Cat-Cow Flow', reps: '12 rounds', duration: 90 },
    { name: 'Child\'s Pose', reps: '1 minute', duration: 75 },
    { name: 'Puppy Pose', reps: '45 seconds', duration: 60 },
    { name: 'Downward Dog', reps: '45 seconds', duration: 60 },
    { name: 'Low Lunge', reps: '45 seconds each side', duration: 105 },
    { name: 'Pigeon Pose', reps: '1 minute each side', duration: 135 },
    { name: 'Seated Forward Fold', reps: '1 minute', duration: 75 },
    { name: 'Happy Baby', reps: '1 minute', duration: 75 },
    { name: 'Supine Twist', reps: '45 seconds each side', duration: 105 },
    { name: 'Legs Up the Wall', reps: '2 minutes', duration: 135 },
    { name: 'Savasana', reps: '3 minutes', duration: 195 },
  ],
  // Workout ID 10: Power Yoga Flow (45 min)
  10: [
    { name: 'Centering Breath', reps: '2 minutes', duration: 120 },
    { name: 'Sun Salutation A', reps: '5 rounds', duration: 300 },
    { name: 'Sun Salutation B', reps: '3 rounds', duration: 240 },
    { name: 'Chair Pose', reps: '45 seconds', duration: 60 },
    { name: 'Warrior I Flow', reps: '1 minute each side', duration: 135 },
    { name: 'Warrior II', reps: '45 seconds each side', duration: 105 },
    { name: 'Extended Side Angle', reps: '45 seconds each side', duration: 105 },
    { name: 'Triangle Pose', reps: '45 seconds each side', duration: 105 },
    { name: 'Half Moon Balance', reps: '30 seconds each side', duration: 75 },
    { name: 'Crow Pose Practice', reps: '1 minute', duration: 75 },
    { name: 'Plank to Chaturanga', reps: '10 reps', duration: 120 },
    { name: 'Upward Dog', reps: '45 seconds', duration: 60 },
    { name: 'Dolphin Pose', reps: '45 seconds', duration: 60 },
    { name: 'Bridge Pose', reps: '45 seconds', duration: 60 },
    { name: 'Wheel Pose or Bridge', reps: '30 seconds x 3', duration: 120 },
    { name: 'Seated Twist', reps: '45 seconds each side', duration: 105 },
    { name: 'Cool Down Stretch', reps: '2 minutes', duration: 135 },
    { name: 'Savasana', reps: '3 minutes', duration: 195 },
  ],
  // Workout ID 11: Bedtime Wind Down (15 min)
  11: [
    { name: 'Seated Breathing', reps: '2 minutes', duration: 120 },
    { name: 'Gentle Neck Release', reps: '30 seconds each side', duration: 75 },
    { name: 'Seated Forward Fold', reps: '1 minute', duration: 75 },
    { name: 'Butterfly Stretch', reps: '1 minute', duration: 75 },
    { name: 'Reclined Twist', reps: '45 seconds each side', duration: 105 },
    { name: 'Happy Baby', reps: '1 minute', duration: 75 },
    { name: 'Legs Up Wall', reps: '2 minutes', duration: 135 },
    { name: 'Corpse Pose', reps: '3 minutes', duration: 195 },
  ],
  // Workout ID 12: K-Pop Dance Party (30 min)
  12: [
    { name: 'Warm-Up Bounce', reps: '2 minutes', duration: 120 },
    { name: 'Arm Isolations', reps: '32 counts', duration: 60 },
    { name: 'Body Wave Practice', reps: '16 reps', duration: 75 },
    { name: 'Hip Pops', reps: '32 counts', duration: 60 },
    { name: 'Point Choreography', reps: '32 counts', duration: 75 },
    { name: 'Slide & Glide Steps', reps: '16 each way', duration: 90 },
    { name: 'Hair Flip Combo', reps: '16 reps', duration: 60 },
    { name: 'Formation Practice', reps: '2 minutes', duration: 120 },
    { name: 'Chorus Dance', reps: '3 minutes', duration: 180 },
    { name: 'Verse Choreography', reps: '2 minutes', duration: 120 },
    { name: 'High Energy Freestyle', reps: '2 minutes', duration: 120 },
    { name: 'Kill Move Practice', reps: '16 reps', duration: 90 },
    { name: 'Full Routine Run', reps: '3 minutes', duration: 180 },
    { name: 'Cool Down & Stretch', reps: '2 minutes', duration: 120 },
  ],
  // Workout ID 13: Latin Dance Fitness (25 min)
  13: [
    { name: 'Salsa Basic Step', reps: '2 minutes', duration: 120 },
    { name: 'Cumbia Steps', reps: '32 counts', duration: 75 },
    { name: 'Merengue March', reps: '1 minute', duration: 75 },
    { name: 'Bachata Side Step', reps: '32 counts', duration: 75 },
    { name: 'Hip Circles', reps: '16 each direction', duration: 75 },
    { name: 'Reggaeton Bounce', reps: '1 minute', duration: 75 },
    { name: 'Arm Styling', reps: '32 counts', duration: 60 },
    { name: 'Partner Position Practice', reps: '1 minute', duration: 75 },
    { name: 'Turn Combinations', reps: '16 turns', duration: 90 },
    { name: 'Full Salsa Routine', reps: '3 minutes', duration: 180 },
    { name: 'Bachata Routine', reps: '2 minutes', duration: 135 },
    { name: 'Free Style Latin', reps: '2 minutes', duration: 120 },
    { name: 'Cool Down Sway', reps: '1 minute', duration: 75 },
  ],
  // Workout ID 14: Hip Hop Grooves (35 min)
  14: [
    { name: 'Bounce Warm-Up', reps: '2 minutes', duration: 120 },
    { name: 'Basic Groove', reps: '32 counts', duration: 75 },
    { name: 'Chest Pops', reps: '24 reps', duration: 75 },
    { name: 'Arm Waves', reps: '16 reps', duration: 60 },
    { name: 'Tutting Basics', reps: '32 counts', duration: 90 },
    { name: 'Footwork Drill', reps: '2 minutes', duration: 120 },
    { name: 'Body Rolls', reps: '16 reps', duration: 60 },
    { name: 'Locking Moves', reps: '16 reps', duration: 90 },
    { name: 'Popping Practice', reps: '32 counts', duration: 90 },
    { name: 'Combo 1', reps: '16 counts x 4', duration: 120 },
    { name: 'Combo 2', reps: '16 counts x 4', duration: 120 },
    { name: 'Freestyle Circle', reps: '3 minutes', duration: 180 },
    { name: 'Full Routine', reps: '3 minutes', duration: 180 },
    { name: 'Stretch & Cool Down', reps: '2 minutes', duration: 120 },
  ],
  // Workout ID 15: Ballet Barre Workout (40 min)
  15: [
    { name: 'Warm-Up Pliés', reps: '16 reps', duration: 90 },
    { name: 'Relevés', reps: '24 reps', duration: 90 },
    { name: 'Tendus Front', reps: '16 each leg', duration: 120 },
    { name: 'Tendus Side', reps: '16 each leg', duration: 120 },
    { name: 'Dégagés', reps: '16 each leg', duration: 120 },
    { name: 'Rond de Jambe', reps: '8 each direction', duration: 120 },
    { name: 'Battements', reps: '16 each leg', duration: 120 },
    { name: 'Grand Battements', reps: '12 each leg', duration: 120 },
    { name: 'Inner Thigh Lifts', reps: '20 each leg', duration: 120 },
    { name: 'Passé Balance', reps: '30 seconds each leg', duration: 75 },
    { name: 'Port de Bras', reps: '16 counts', duration: 75 },
    { name: 'Attitude Lifts', reps: '12 each leg', duration: 120 },
    { name: 'Center Work', reps: '3 minutes', duration: 180 },
    { name: 'Pirouette Practice', reps: '8 each direction', duration: 120 },
    { name: 'Reverence', reps: '1 minute', duration: 75 },
    { name: 'Final Stretch', reps: '2 minutes', duration: 135 },
  ],
  // Workout ID 16: Arm Toning Circuit (15 min)
  16: [
    { name: 'Arm Circles', reps: '20 each direction', duration: 60 },
    { name: 'Push-Ups', reps: '15 reps', duration: 75 },
    { name: 'Tricep Dips', reps: '15 reps', duration: 75 },
    { name: 'Plank Shoulder Taps', reps: '20 reps', duration: 75 },
    { name: 'Diamond Push-Ups', reps: '10 reps', duration: 60 },
    { name: 'Arm Pulses', reps: '30 seconds each position', duration: 75 },
    { name: 'Tricep Extensions', reps: '15 each arm', duration: 90 },
    { name: 'Bicep Curls (air)', reps: '20 reps', duration: 60 },
    { name: 'Plank Hold', reps: '45 seconds', duration: 60 },
    { name: 'Up-Down Planks', reps: '12 reps', duration: 75 },
    { name: 'Shoulder Stretch', reps: '30 seconds each arm', duration: 75 },
  ],
  // Workout ID 17: Full Body Strength (40 min)
  17: [
    { name: 'Jumping Jacks Warm-Up', reps: '30 reps', duration: 75 },
    { name: 'Squats', reps: '20 reps', duration: 90 },
    { name: 'Push-Ups', reps: '15 reps', duration: 90 },
    { name: 'Lunges', reps: '12 each leg', duration: 120 },
    { name: 'Plank Hold', reps: '45 seconds', duration: 60 },
    { name: 'Glute Bridges', reps: '20 reps', duration: 75 },
    { name: 'Mountain Climbers', reps: '30 reps', duration: 75 },
    { name: 'Tricep Dips', reps: '15 reps', duration: 75 },
    { name: 'Jump Squats', reps: '15 reps', duration: 75 },
    { name: 'Superman Hold', reps: '30 seconds x 3', duration: 105 },
    { name: 'Bicycle Crunches', reps: '30 reps', duration: 75 },
    { name: 'Burpees', reps: '10 reps', duration: 90 },
    { name: 'Side Lunges', reps: '12 each side', duration: 90 },
    { name: 'Pike Push-Ups', reps: '12 reps', duration: 75 },
    { name: 'Leg Raises', reps: '15 reps', duration: 75 },
    { name: 'Plank Jacks', reps: '20 reps', duration: 60 },
    { name: 'Cool Down Walk', reps: '1 minute', duration: 75 },
    { name: 'Full Body Stretch', reps: '3 minutes', duration: 195 },
  ],
  // Workout ID 18: Leg Day Burn (30 min)
  18: [
    { name: 'Leg Swings', reps: '15 each leg', duration: 75 },
    { name: 'Bodyweight Squats', reps: '25 reps', duration: 90 },
    { name: 'Sumo Squats', reps: '20 reps', duration: 90 },
    { name: 'Walking Lunges', reps: '20 steps', duration: 90 },
    { name: 'Glute Bridges', reps: '25 reps', duration: 90 },
    { name: 'Single Leg Deadlift', reps: '12 each leg', duration: 120 },
    { name: 'Jump Squats', reps: '15 reps', duration: 75 },
    { name: 'Curtsy Lunges', reps: '12 each leg', duration: 90 },
    { name: 'Calf Raises', reps: '30 reps', duration: 60 },
    { name: 'Wall Sit', reps: '45 seconds', duration: 60 },
    { name: 'Fire Hydrants', reps: '20 each leg', duration: 120 },
    { name: 'Donkey Kicks', reps: '20 each leg', duration: 120 },
    { name: 'Frog Jumps', reps: '12 reps', duration: 75 },
    { name: 'Squat Pulses', reps: '30 pulses', duration: 60 },
    { name: 'Quad Stretch', reps: '30 seconds each leg', duration: 75 },
    { name: 'Hamstring Stretch', reps: '30 seconds each leg', duration: 75 },
  ],
  // Workout ID 19: Core Power (25 min)
  19: [
    { name: 'Dead Bug', reps: '20 reps', duration: 75 },
    { name: 'Plank Hold', reps: '1 minute', duration: 75 },
    { name: 'Bicycle Crunches', reps: '40 reps', duration: 90 },
    { name: 'V-Ups', reps: '15 reps', duration: 75 },
    { name: 'Mountain Climbers', reps: '40 reps', duration: 75 },
    { name: 'Russian Twists', reps: '40 reps', duration: 90 },
    { name: 'Leg Raises', reps: '20 reps', duration: 75 },
    { name: 'Side Plank', reps: '45 seconds each side', duration: 105 },
    { name: 'Plank Up-Downs', reps: '16 reps', duration: 90 },
    { name: 'Toe Touches', reps: '25 reps', duration: 75 },
    { name: 'Flutter Kicks', reps: '50 kicks', duration: 75 },
    { name: 'Hollow Body Hold', reps: '45 seconds', duration: 60 },
    { name: 'Reverse Crunches', reps: '20 reps', duration: 75 },
    { name: 'Plank to Pike', reps: '12 reps', duration: 75 },
    { name: 'Cobra Stretch', reps: '45 seconds', duration: 60 },
  ],
  // Workout ID 20: HIIT Fat Burner (20 min)
  20: [
    { name: 'High Knees', reps: '30 seconds', duration: 45 },
    { name: 'Rest', reps: '15 seconds', duration: 15 },
    { name: 'Burpees', reps: '30 seconds', duration: 45 },
    { name: 'Rest', reps: '15 seconds', duration: 15 },
    { name: 'Jump Squats', reps: '30 seconds', duration: 45 },
    { name: 'Rest', reps: '15 seconds', duration: 15 },
    { name: 'Mountain Climbers', reps: '30 seconds', duration: 45 },
    { name: 'Rest', reps: '15 seconds', duration: 15 },
    { name: 'Tuck Jumps', reps: '30 seconds', duration: 45 },
    { name: 'Rest', reps: '30 seconds', duration: 30 },
    { name: 'Skaters', reps: '30 seconds', duration: 45 },
    { name: 'Rest', reps: '15 seconds', duration: 15 },
    { name: 'Plank Jacks', reps: '30 seconds', duration: 45 },
    { name: 'Rest', reps: '15 seconds', duration: 15 },
    { name: 'Star Jumps', reps: '30 seconds', duration: 45 },
    { name: 'Rest', reps: '15 seconds', duration: 15 },
    { name: 'Speed Punches', reps: '30 seconds', duration: 45 },
    { name: 'Rest', reps: '30 seconds', duration: 30 },
    { name: 'Burpees', reps: '30 seconds', duration: 45 },
    { name: 'Rest', reps: '15 seconds', duration: 15 },
    { name: 'High Knees', reps: '30 seconds', duration: 45 },
    { name: 'Rest', reps: '15 seconds', duration: 15 },
    { name: 'Jump Lunges', reps: '30 seconds', duration: 45 },
    { name: 'Cool Down Jog', reps: '1 minute', duration: 75 },
    { name: 'Stretch', reps: '2 minutes', duration: 135 },
  ],
  // Workout ID 21: Low Impact Cardio (30 min)
  21: [
    { name: 'Marching in Place', reps: '2 minutes', duration: 120 },
    { name: 'Step Touches', reps: '1 minute', duration: 75 },
    { name: 'Knee Lifts', reps: '30 each leg', duration: 90 },
    { name: 'Hamstring Curls', reps: '30 each leg', duration: 90 },
    { name: 'Side Steps', reps: '1 minute', duration: 75 },
    { name: 'Front Kicks', reps: '20 each leg', duration: 90 },
    { name: 'Arm Circles March', reps: '1 minute', duration: 75 },
    { name: 'Grapevine Steps', reps: '16 each way', duration: 90 },
    { name: 'Standing Oblique Crunch', reps: '20 each side', duration: 90 },
    { name: 'Toe Taps', reps: '40 taps', duration: 75 },
    { name: 'Step Back Lunges', reps: '12 each leg', duration: 90 },
    { name: 'Squat Steps', reps: '20 reps', duration: 90 },
    { name: 'Standing Bicycle', reps: '20 each side', duration: 90 },
    { name: 'Heel Digs', reps: '30 each leg', duration: 75 },
    { name: 'Cool Down Walk', reps: '2 minutes', duration: 120 },
    { name: 'Full Body Stretch', reps: '3 minutes', duration: 180 },
  ],
  // Workout ID 22: Jump Rope Cardio (20 min)
  22: [
    { name: 'Basic Jump', reps: '1 minute', duration: 75 },
    { name: 'Rest & March', reps: '30 seconds', duration: 30 },
    { name: 'Alternating Foot Jump', reps: '1 minute', duration: 75 },
    { name: 'Rest & March', reps: '30 seconds', duration: 30 },
    { name: 'High Knees Jump', reps: '45 seconds', duration: 60 },
    { name: 'Rest', reps: '30 seconds', duration: 30 },
    { name: 'Side to Side Jump', reps: '1 minute', duration: 75 },
    { name: 'Rest', reps: '30 seconds', duration: 30 },
    { name: 'Double Unders (or fast singles)', reps: '45 seconds', duration: 60 },
    { name: 'Rest', reps: '45 seconds', duration: 45 },
    { name: 'Criss Cross', reps: '45 seconds', duration: 60 },
    { name: 'Rest', reps: '30 seconds', duration: 30 },
    { name: 'Fast Basic Jump', reps: '1 minute', duration: 75 },
    { name: 'Rest', reps: '30 seconds', duration: 30 },
    { name: 'Boxer Skip', reps: '1 minute', duration: 75 },
    { name: 'Rest', reps: '30 seconds', duration: 30 },
    { name: 'Sprint Jump', reps: '30 seconds', duration: 45 },
    { name: 'Cool Down March', reps: '1 minute', duration: 75 },
    { name: 'Stretch', reps: '2 minutes', duration: 135 },
  ],
  // Workout ID 23: Stair Climber Challenge (25 min)
  23: [
    { name: 'Warm-Up Climb', reps: '3 minutes (easy)', duration: 180 },
    { name: 'Moderate Pace', reps: '3 minutes', duration: 180 },
    { name: 'Skip a Step', reps: '2 minutes', duration: 120 },
    { name: 'Side Steps Right', reps: '1 minute', duration: 75 },
    { name: 'Side Steps Left', reps: '1 minute', duration: 75 },
    { name: 'Fast Climb', reps: '2 minutes', duration: 120 },
    { name: 'Recovery Pace', reps: '1 minute', duration: 75 },
    { name: 'Skip a Step Fast', reps: '2 minutes', duration: 120 },
    { name: 'Single Step Sprint', reps: '1 minute', duration: 75 },
    { name: 'Recovery', reps: '1 minute', duration: 75 },
    { name: 'Crossover Steps', reps: '2 minutes', duration: 120 },
    { name: 'Final Push', reps: '2 minutes', duration: 120 },
    { name: 'Cool Down', reps: '2 minutes', duration: 120 },
    { name: 'Leg Stretches', reps: '2 minutes', duration: 135 },
  ],
  // Workout ID 24: Full Body Stretch (20 min)
  24: [
    { name: 'Neck Rolls', reps: '8 each direction', duration: 60 },
    { name: 'Shoulder Rolls', reps: '10 each direction', duration: 45 },
    { name: 'Chest Opener', reps: '30 seconds', duration: 45 },
    { name: 'Tricep Stretch', reps: '30 seconds each arm', duration: 75 },
    { name: 'Wrist Circles', reps: '10 each direction', duration: 30 },
    { name: 'Cat-Cow', reps: '10 reps', duration: 75 },
    { name: 'Child\'s Pose', reps: '45 seconds', duration: 60 },
    { name: 'Downward Dog', reps: '45 seconds', duration: 60 },
    { name: 'Low Lunge', reps: '45 seconds each side', duration: 105 },
    { name: 'Pigeon Pose', reps: '45 seconds each side', duration: 105 },
    { name: 'Seated Forward Fold', reps: '45 seconds', duration: 60 },
    { name: 'Butterfly Stretch', reps: '45 seconds', duration: 60 },
    { name: 'Supine Twist', reps: '30 seconds each side', duration: 75 },
    { name: 'Happy Baby', reps: '45 seconds', duration: 60 },
    { name: 'Knee to Chest', reps: '30 seconds each leg', duration: 75 },
    { name: 'Final Relaxation', reps: '1 minute', duration: 75 },
  ],
  // Continue with remaining workouts...
};

// Generate default routine based on category if specific routine doesn't exist
const generateDefaultRoutine = (categoryId, durationMinutes) => {
  const categoryExercises = {
    1: [ // Pilates
      { name: 'The Hundred', reps: '100 arm pumps' },
      { name: 'Roll Ups', reps: '12 reps' },
      { name: 'Single Leg Circles', reps: '10 each leg' },
      { name: 'Rolling Like a Ball', reps: '10 reps' },
      { name: 'Single Leg Stretch', reps: '10 each leg' },
      { name: 'Double Leg Stretch', reps: '12 reps' },
      { name: 'Criss Cross', reps: '20 reps' },
      { name: 'Spine Stretch', reps: '10 reps' },
      { name: 'Swan Dive', reps: '10 reps' },
      { name: 'Swimming', reps: '30 seconds' },
      { name: 'Side Kicks', reps: '15 each leg' },
      { name: 'Teaser', reps: '8 reps' },
    ],
    2: [ // Yoga
      { name: 'Mountain Pose', reps: '30 seconds' },
      { name: 'Sun Salutation', reps: '3 rounds' },
      { name: 'Warrior I', reps: '30 seconds each side' },
      { name: 'Warrior II', reps: '30 seconds each side' },
      { name: 'Triangle Pose', reps: '30 seconds each side' },
      { name: 'Tree Pose', reps: '30 seconds each side' },
      { name: 'Downward Dog', reps: '45 seconds' },
      { name: 'Child\'s Pose', reps: '45 seconds' },
      { name: 'Cobra Pose', reps: '30 seconds' },
      { name: 'Seated Forward Fold', reps: '45 seconds' },
      { name: 'Supine Twist', reps: '30 seconds each side' },
      { name: 'Savasana', reps: '2 minutes' },
    ],
    3: [ // Dance
      { name: 'Warm-Up March', reps: '2 minutes' },
      { name: 'Step Touch', reps: '32 counts' },
      { name: 'Grapevine', reps: '16 each way' },
      { name: 'Hip Shake', reps: '32 counts' },
      { name: 'Body Roll', reps: '16 reps' },
      { name: 'Arm Wave', reps: '16 reps' },
      { name: 'Cha-Cha Steps', reps: '32 counts' },
      { name: 'Freestyle', reps: '2 minutes' },
      { name: 'Jump & Clap', reps: '16 reps' },
      { name: 'Spin Move', reps: '8 each direction' },
      { name: 'Cool Down Sway', reps: '1 minute' },
    ],
    4: [ // Strength
      { name: 'Squats', reps: '20 reps' },
      { name: 'Push-Ups', reps: '15 reps' },
      { name: 'Lunges', reps: '12 each leg' },
      { name: 'Plank Hold', reps: '45 seconds' },
      { name: 'Glute Bridges', reps: '20 reps' },
      { name: 'Tricep Dips', reps: '15 reps' },
      { name: 'Mountain Climbers', reps: '30 reps' },
      { name: 'Bicycle Crunches', reps: '30 reps' },
      { name: 'Superman Hold', reps: '30 seconds' },
      { name: 'Burpees', reps: '10 reps' },
      { name: 'Wall Sit', reps: '45 seconds' },
    ],
    5: [ // Cardio
      { name: 'Jumping Jacks', reps: '30 reps' },
      { name: 'High Knees', reps: '30 seconds' },
      { name: 'Butt Kicks', reps: '30 seconds' },
      { name: 'Mountain Climbers', reps: '30 reps' },
      { name: 'Burpees', reps: '10 reps' },
      { name: 'Skaters', reps: '20 reps' },
      { name: 'Star Jumps', reps: '15 reps' },
      { name: 'Speed Punches', reps: '30 seconds' },
      { name: 'Tuck Jumps', reps: '12 reps' },
      { name: 'Jump Squats', reps: '15 reps' },
      { name: 'Cool Down Jog', reps: '1 minute' },
    ],
    6: [ // Stretching
      { name: 'Neck Rolls', reps: '8 each direction' },
      { name: 'Shoulder Stretch', reps: '30 seconds each arm' },
      { name: 'Cat-Cow', reps: '10 reps' },
      { name: 'Child\'s Pose', reps: '45 seconds' },
      { name: 'Downward Dog', reps: '30 seconds' },
      { name: 'Pigeon Pose', reps: '30 seconds each side' },
      { name: 'Seated Forward Fold', reps: '45 seconds' },
      { name: 'Butterfly Stretch', reps: '45 seconds' },
      { name: 'Figure Four Stretch', reps: '30 seconds each side' },
      { name: 'Supine Twist', reps: '30 seconds each side' },
      { name: 'Final Relaxation', reps: '1 minute' },
    ],
  };

  const exercises = categoryExercises[categoryId] || categoryExercises[1];
  const avgDurationPerExercise = (durationMinutes * 60) / exercises.length;
  
  return exercises.map(ex => ({
    ...ex,
    duration: Math.round(avgDurationPerExercise)
  }));
};

// Default data for when API isn't connected - using colored symbols not emojis
const defaultCategories = [
  { id: 1, name: 'Pilates', description: 'Low-impact exercises for flexibility and core strength', icon: '✿', color: '#ff85a2' },
  { id: 2, name: 'Yoga', description: 'Mind-body practice for flexibility and relaxation', icon: '❀', color: '#9b7bb8' },
  { id: 3, name: 'Dance', description: 'Fun cardio workouts through dance', icon: '♪', color: '#ff69b4' },
  { id: 4, name: 'Strength', description: 'Build lean muscle and tone your body', icon: '★', color: '#e87aa4' },
  { id: 5, name: 'Cardio', description: 'Get your heart pumping with energizing workouts', icon: '♡', color: '#ff6b8a' },
  { id: 6, name: 'Stretching', description: 'Improve flexibility and prevent injury', icon: '✧', color: '#ffb6c1' }
];

const defaultWorkouts = [
  { id: 1, category_id: 1, title: 'Morning Glow Pilates', description: 'Start your day with this energizing 20-minute pilates routine', difficulty: 'beginner', duration_minutes: 20, calories_burned: 150 },
  { id: 2, category_id: 1, title: 'Slim Waist Sculpt', description: 'Target your core and waist for that hourglass figure', difficulty: 'intermediate', duration_minutes: 30, calories_burned: 200 },
  { id: 3, category_id: 2, title: 'Sunrise Flow', description: 'A gentle yoga flow to wake up your body', difficulty: 'beginner', duration_minutes: 15, calories_burned: 80 },
  { id: 4, category_id: 3, title: 'Dance Cardio Party', description: 'Fun dance moves to your favorite songs', difficulty: 'beginner', duration_minutes: 25, calories_burned: 250 },
  { id: 5, category_id: 4, title: 'Booty Sculpt', description: 'Build a peachy booty with these targeted exercises', difficulty: 'intermediate', duration_minutes: 20, calories_burned: 180 },
  { id: 6, category_id: 5, title: 'Hot Girl Walk Treadmill', description: 'Indoor walking workout for when you cant go outside', difficulty: 'beginner', duration_minutes: 30, calories_burned: 200 },
  { id: 7, category_id: 1, title: 'Flat Tummy Flow', description: 'Targeted ab exercises for a toned midsection', difficulty: 'intermediate', duration_minutes: 25, calories_burned: 175 },
  { id: 8, category_id: 1, title: 'Pilates for Posture', description: 'Improve your posture and feel more confident', difficulty: 'beginner', duration_minutes: 20, calories_burned: 120 },
  { id: 9, category_id: 2, title: 'Stress Relief Yoga', description: 'Release tension and find inner peace', difficulty: 'beginner', duration_minutes: 30, calories_burned: 100 },
  { id: 10, category_id: 2, title: 'Power Yoga Flow', description: 'Build strength while improving flexibility', difficulty: 'intermediate', duration_minutes: 45, calories_burned: 250 },
  { id: 11, category_id: 2, title: 'Bedtime Wind Down', description: 'Gentle stretches to help you sleep better', difficulty: 'beginner', duration_minutes: 15, calories_burned: 50 },
  { id: 12, category_id: 3, title: 'K-Pop Dance Party', description: 'Learn fun K-pop choreography and burn calories', difficulty: 'intermediate', duration_minutes: 30, calories_burned: 300 },
  { id: 13, category_id: 3, title: 'Latin Dance Fitness', description: 'Salsa, bachata and reggaeton inspired moves', difficulty: 'beginner', duration_minutes: 25, calories_burned: 275 },
  { id: 14, category_id: 3, title: 'Hip Hop Grooves', description: 'Urban dance moves for a fun cardio session', difficulty: 'intermediate', duration_minutes: 35, calories_burned: 320 },
  { id: 15, category_id: 3, title: 'Ballet Barre Workout', description: 'Graceful ballet-inspired toning exercises', difficulty: 'beginner', duration_minutes: 40, calories_burned: 220 },
  { id: 16, category_id: 4, title: 'Arm Toning Circuit', description: 'Sculpt lean, toned arms without bulk', difficulty: 'beginner', duration_minutes: 15, calories_burned: 120 },
  { id: 17, category_id: 4, title: 'Full Body Strength', description: 'Complete body workout for overall toning', difficulty: 'intermediate', duration_minutes: 40, calories_burned: 280 },
  { id: 18, category_id: 4, title: 'Leg Day Burn', description: 'Build strong, sculpted legs and glutes', difficulty: 'intermediate', duration_minutes: 30, calories_burned: 220 },
  { id: 19, category_id: 4, title: 'Core Power', description: 'Intense core strengthening workout', difficulty: 'advanced', duration_minutes: 25, calories_burned: 200 },
  { id: 20, category_id: 5, title: 'HIIT Fat Burner', description: 'High intensity intervals for maximum calorie burn', difficulty: 'advanced', duration_minutes: 20, calories_burned: 350 },
  { id: 21, category_id: 5, title: 'Low Impact Cardio', description: 'Joint-friendly cardio that still gets results', difficulty: 'beginner', duration_minutes: 30, calories_burned: 180 },
  { id: 22, category_id: 5, title: 'Jump Rope Cardio', description: 'Fun jump rope routines for all levels', difficulty: 'intermediate', duration_minutes: 20, calories_burned: 280 },
  { id: 23, category_id: 5, title: 'Stair Climber Challenge', description: 'Intense lower body cardio workout', difficulty: 'intermediate', duration_minutes: 25, calories_burned: 260 },
  { id: 24, category_id: 6, title: 'Full Body Stretch', description: 'Head to toe stretching for flexibility', difficulty: 'beginner', duration_minutes: 20, calories_burned: 60 },
  { id: 25, category_id: 6, title: 'Hip Opening Flow', description: 'Release tight hips from sitting all day', difficulty: 'beginner', duration_minutes: 15, calories_burned: 45 },
  { id: 26, category_id: 6, title: 'Morning Mobility', description: 'Wake up your body with dynamic stretches', difficulty: 'beginner', duration_minutes: 10, calories_burned: 40 },
  { id: 27, category_id: 6, title: 'Post-Workout Recovery', description: 'Essential stretches after any workout', difficulty: 'beginner', duration_minutes: 15, calories_burned: 50 },
  { id: 28, category_id: 1, title: 'Pilates Ring Workout', description: 'Use a pilates ring for extra resistance', difficulty: 'intermediate', duration_minutes: 35, calories_burned: 190 },
  { id: 29, category_id: 2, title: 'Yin Yoga Deep Stretch', description: 'Hold poses longer for deep tissue release', difficulty: 'beginner', duration_minutes: 50, calories_burned: 90 },
  { id: 30, category_id: 3, title: 'TikTok Dance Workout', description: 'Learn trending TikTok dances while burning calories', difficulty: 'beginner', duration_minutes: 20, calories_burned: 200 },
  { id: 31, category_id: 4, title: 'Resistance Band Sculpt', description: 'Full body toning with resistance bands', difficulty: 'beginner', duration_minutes: 30, calories_burned: 160 },
  { id: 32, category_id: 5, title: 'Boxing Cardio', description: 'Punch and jab your way to fitness', difficulty: 'intermediate', duration_minutes: 30, calories_burned: 320 },
  { id: 33, category_id: 1, title: 'Wall Pilates', description: 'Use your wall for support and resistance', difficulty: 'beginner', duration_minutes: 25, calories_burned: 140 },
  { id: 34, category_id: 2, title: 'Chair Yoga', description: 'Accessible yoga for any fitness level', difficulty: 'beginner', duration_minutes: 20, calories_burned: 70 },
  { id: 35, category_id: 3, title: 'Zumba Party', description: 'High energy Latin-inspired dance fitness', difficulty: 'intermediate', duration_minutes: 45, calories_burned: 400 },
  { id: 36, category_id: 4, title: 'Dumbbell Basics', description: 'Learn proper form with light weights', difficulty: 'beginner', duration_minutes: 25, calories_burned: 150 }
];

function Workouts() {
  const [categories, setCategories] = useState(defaultCategories);
  const [workouts, setWorkouts] = useState(defaultWorkouts);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeWorkout, setActiveWorkout] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [workoutComplete, setWorkoutComplete] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [categoriesRes, workoutsRes] = await Promise.all([
        api.get('/workouts/categories'),
        api.get('/workouts')
      ]);
      setCategories(categoriesRes.data.length > 0 ? categoriesRes.data : defaultCategories);
      setWorkouts(workoutsRes.data.length > 0 ? workoutsRes.data : defaultWorkouts);
    } catch (error) {
      console.log('Using default data');
    } finally {
      setLoading(false);
    }
  };

  const filteredWorkouts = selectedCategory
    ? workouts.filter(w => w.category_id === selectedCategory)
    : workouts;

  const getDifficultyBadge = (difficulty) => {
    const badges = {
      beginner: 'beginner',
      intermediate: 'intermediate',
      advanced: 'advanced'
    };
    return badges[difficulty] || difficulty;
  };

  const getExercises = (workout) => {
    // Check if specific routine exists for this workout
    if (workoutRoutines[workout.id]) {
      return workoutRoutines[workout.id];
    }
    // Generate default routine based on category
    return generateDefaultRoutine(workout.category_id, workout.duration_minutes);
  };

  const handleStartWorkout = (workout) => {
    setActiveWorkout(workout);
    setCurrentExerciseIndex(0);
    setWorkoutComplete(false);
    const exercises = getExercises(workout);
    setTimeRemaining(exercises[0].duration);
    setIsPlaying(true);
    setIsPaused(false);
  };

  const handleCloseWorkout = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setActiveWorkout(null);
    setIsPlaying(false);
    setCurrentExerciseIndex(0);
    setTimeRemaining(0);
    setIsPaused(false);
    setWorkoutComplete(false);
  };

  const handlePauseResume = () => {
    setIsPaused(!isPaused);
  };

  const handleNextExercise = () => {
    if (!activeWorkout) return;
    const exercises = getExercises(activeWorkout);
    if (currentExerciseIndex < exercises.length - 1) {
      const nextIndex = currentExerciseIndex + 1;
      setCurrentExerciseIndex(nextIndex);
      setTimeRemaining(exercises[nextIndex].duration);
    } else {
      setWorkoutComplete(true);
      setIsPlaying(false);
    }
  };

  const handlePrevExercise = () => {
    if (!activeWorkout || currentExerciseIndex === 0) return;
    const exercises = getExercises(activeWorkout);
    const prevIndex = currentExerciseIndex - 1;
    setCurrentExerciseIndex(prevIndex);
    setTimeRemaining(exercises[prevIndex].duration);
  };

  // Timer effect
  useEffect(() => {
    if (isPlaying && !isPaused && timeRemaining > 0) {
      timerRef.current = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            // Move to next exercise
            handleNextExercise();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, isPaused, currentExerciseIndex]);

  return (
    <div className="workouts-page page">
      {/* Workout Player Modal */}
      {activeWorkout && (
        <div className="workout-modal-overlay" onClick={handleCloseWorkout}>
          <div className="workout-modal" onClick={e => e.stopPropagation()}>
            <div className="workout-modal-header">
              <div className="modal-workout-info">
                <h2>{activeWorkout.title}</h2>
                <p>{activeWorkout.description}</p>
              </div>
              <button className="close-workout-btn" onClick={handleCloseWorkout}>✕</button>
            </div>
            
            {workoutComplete ? (
              <div className="workout-complete">
                <div className="complete-icon">✓</div>
                <h2>amazing work!</h2>
                <p>you crushed this workout!</p>
                <div className="complete-stats">
                  <span>{activeWorkout.duration_minutes} min</span>
                  <span>•</span>
                  <span>{activeWorkout.calories_burned} cal burned</span>
                </div>
                <button className="btn btn-primary" onClick={handleCloseWorkout}>
                  finish
                </button>
              </div>
            ) : (
              <>
                {/* Exercise List Panel */}
                <div className="workout-exercise-panel">
                  <div className="exercise-list-container">
                    <div className="exercise-list">
                      {getExercises(activeWorkout).map((exercise, index) => (
                        <div 
                          key={index}
                          className={`exercise-list-item ${index === currentExerciseIndex ? 'active' : ''} ${index < currentExerciseIndex ? 'completed' : ''}`}
                          onClick={() => {
                            setCurrentExerciseIndex(index);
                            setTimeRemaining(exercise.duration);
                          }}
                        >
                          <div className="exercise-number">
                            {index < currentExerciseIndex ? '✓' : index + 1}
                          </div>
                          <div className="exercise-details">
                            <span className="exercise-list-name">{exercise.name}</span>
                            <span className="exercise-list-reps">{exercise.reps}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Current Exercise Display */}
                  <div className="current-exercise-display">
                    <div className="current-exercise-header">
                      <span className="exercise-count">
                        {currentExerciseIndex + 1} / {getExercises(activeWorkout).length}
                      </span>
                    </div>
                    
                    <div className="current-exercise-main">
                      <h2 className="current-exercise-name">
                        {getExercises(activeWorkout)[currentExerciseIndex]?.name}
                      </h2>
                      <div className="current-exercise-reps">
                        {getExercises(activeWorkout)[currentExerciseIndex]?.reps}
                      </div>
                    </div>

                    {/* Timer Circle */}
                    <div className="timer-circle">
                      <svg viewBox="0 0 100 100">
                        <circle className="timer-bg" cx="50" cy="50" r="45" />
                        <circle 
                          className="timer-progress" 
                          cx="50" cy="50" r="45"
                          style={{
                            strokeDasharray: 283,
                            strokeDashoffset: 283 - (283 * timeRemaining / (getExercises(activeWorkout)[currentExerciseIndex]?.duration || 60))
                          }}
                        />
                      </svg>
                      <div className="timer-text">{timeRemaining}s</div>
                    </div>

                    {/* Controls */}
                    <div className="player-controls">
                      <button 
                        className="control-btn prev-btn" 
                        onClick={handlePrevExercise}
                        disabled={currentExerciseIndex === 0}
                      >
                        ⟨
                      </button>
                      <button className="control-btn play-btn" onClick={handlePauseResume}>
                        {isPaused ? '▶' : '❚❚'}
                      </button>
                      <button 
                        className="control-btn next-btn" 
                        onClick={handleNextExercise}
                      >
                        ⟩
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
            
            <div className="workout-modal-footer">
              <div className="workout-stats-row">
                <span className="modal-stat">
                  <span className="stat-icon timer-icon"></span>
                  {activeWorkout.duration_minutes} min
                </span>
                <span className="modal-stat">
                  <span className="stat-icon fire-icon"></span>
                  {activeWorkout.calories_burned} cal
                </span>
                <span className="modal-stat difficulty-badge">
                  {getDifficultyBadge(activeWorkout.difficulty)}
                </span>
              </div>
              <div className="workout-controls">
                <button className="btn btn-secondary" onClick={handleCloseWorkout}>
                  end workout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Hero
        variant="small"
        title={<><span className="white-text">feel</span> <span className="neon-pink">STRONG</span> <span className="white-text">&</span> <span className="white-text">confident</span></>}
        subtitle="pilates, yoga, dance & more workouts designed to make you feel amazing"
      />

      <div className="container">
        {/* Category Filter */}
        <div className="category-filter">
          <button
            className={`filter-btn ${!selectedCategory ? 'active' : ''}`}
            onClick={() => setSelectedCategory(null)}
          >
            all workouts
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              className={`filter-btn ${selectedCategory === category.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category.id)}
            >
              <span className="filter-icon" style={{ color: category.color }}>{category.icon}</span> {category.name}
            </button>
          ))}
        </div>

        {/* Workouts Grid */}
        <div className="workouts-grid stagger-children">
          {filteredWorkouts.map((workout) => (
            <Card
              key={workout.id}
              title={workout.title}
              description={workout.description}
              badge={getDifficultyBadge(workout.difficulty)}
              className="workout-card"
            >
              <div className="workout-meta">
                <span className="workout-stat">
                  <span className="stat-icon timer-icon"></span>
                  {workout.duration_minutes} min
                </span>
                <span className="workout-stat">
                  <span className="stat-icon fire-icon"></span>
                  {workout.calories_burned} cal
                </span>
              </div>
              <button className="btn btn-primary btn-start" onClick={() => handleStartWorkout(workout)}>
                start workout <span className="btn-star-icon"></span>
              </button>
            </Card>
          ))}
        </div>

        {filteredWorkouts.length === 0 && (
          <div className="empty-state">
            <span className="empty-icon">🧘‍♀️</span>
            <p>no workouts found in this category yet!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Workouts;

