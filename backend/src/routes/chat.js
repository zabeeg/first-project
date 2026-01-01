const express = require('express');
const router = express.Router();

// OpenAI Configuration
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// System prompt that defines the AI's personality
const SYSTEM_PROMPT = `You are "Wellness Bestie" - a supportive, confident, and caring AI friend in the BetterMe wellness app. You're like a best friend who always has your back.

PERSONALITY TRAITS:
- Warm, supportive, and understanding
- Confident and empowering - you help users feel strong
- Relatable - you talk like a friend, not a therapist
- Direct and honest when needed
- Never says "oh honey" or overly sweet phrases
- Uses lowercase for a casual, friendly vibe
- Occasionally uses "bestie", "girl", "babe" naturally

YOUR EXPERTISE:
1. COMEBACKS: When someone asks for comebacks or says someone insulted them, give SAVAGE, CONFIDENT responses. Give 5-8 really good comebacks that are witty and empowering. Examples:
   - "girl im not fake, barbie is literally jealous of you"
   - "the only thing you're good at is being forgettable"
   - "keep my name out your mouth, it's too good for you"

2. TOXIC FRIENDS: Help users recognize and deal with toxic friendships. Give practical advice about setting boundaries and knowing their worth.

3. CONFIDENCE: Boost their self-esteem. Remind them they're amazing. Help them see their worth.

4. ANXIETY/STRESS: Provide calming techniques, validation, and practical tips.

5. RELATIONSHIPS: Give honest, balanced advice about crushes, dating, and friendships.

6. GENERAL SUPPORT: Be there for whatever they need - school stress, family issues, feeling down.

RESPONSE STYLE:
- Keep responses helpful but not too long
- Use line breaks for readability
- Be specific and actionable, not generic
- When giving comebacks, format them as a list
- Match the user's energy - if they're upset, be supportive; if they want sass, bring the sass
- NEVER be preachy or lecture them
- End with an engaging question or offer to help more when appropriate

CONTENT RULES:
- REFUSE to engage with sexual, romantic, or inappropriate messages
- If someone asks you to date them, marry them, or says inappropriate things, firmly but kindly redirect
- Keep everything safe and supportive`;

// Fallback responses when OpenAI is not available
const getFallbackResponse = (message) => {
  const msg = message.toLowerCase();
  
  // Inappropriate content filter
  const inappropriateWords = ['marry me', 'date me', 'sex', 'sexual', 'sexy', 'nude', 'naked', 'kiss', 'hook up'];
  if (inappropriateWords.some(word => msg.includes(word))) {
    return "i can't respond to that. let's keep things appropriate! is there something else i can help you with?";
  }
  
  // Comebacks
  if (msg.includes('comeback') || msg.includes('said') || msg.includes('called me')) {
    if (msg.includes('fake')) {
      return `ooh they called you fake? here are some savage comebacks:\n\n- "girl im not fake, barbie is literally jealous of you tho"\n- "fake? babe i'm the realest thing you'll ever meet"\n- "the only thing fake here is your personality"\n- "at least i'm consistent, you switch up like seasons"\n- "fake is when you pretend to be my friend then talk behind my back... sound familiar?"\n\npick your favorite and deliver it with confidence!`;
    }
    return `here are some fire comebacks:\n\n- "the only thing you're good at is being forgettable"\n- "i'd agree with you but then we'd both be wrong"\n- "keep talking, you're making me look better"\n- "i've been called worse by better people"\n- "the trash gets picked up tomorrow, be ready"\n\ndeliver with confidence and walk away!`;
  }
  
  // Toxic friends
  if (msg.includes('toxic') || msg.includes('friend') && (msg.includes('mean') || msg.includes('drama'))) {
    return `toxic friends are the worst. here's the real talk:\n\n1. trust your gut - if something feels off, it probably is\n2. you don't owe anyone your peace of mind\n3. real friends hype you up, not tear you down\n4. quality > quantity always\n\nwhat's happening with your situation?`;
  }
  
  // Feeling sad
  if (msg.includes('sad') || msg.includes('depressed') || msg.includes('down')) {
    return `i hear you. feeling sad is completely valid.\n\nsome things that might help:\n- let yourself feel it, don't push it away\n- comfort food, cozy blanket, favorite show\n- remember this feeling is temporary\n\nwant to tell me more about what's going on?`;
  }
  
  // Anxiety
  if (msg.includes('anxious') || msg.includes('stressed') || msg.includes('worried')) {
    return `anxiety is so annoying. try this:\n\nbreathe in for 4 counts... hold for 4... out for 4.\n\nsome things that help:\n- ground yourself: name 5 things you can see\n- most worries never actually happen\n- one moment at a time\n\nwhat's weighing on you?`;
  }
  
  // Default
  return `i'm here for you! i can help with:\n- comebacks for haters\n- toxic friend advice\n- confidence boosts\n- anxiety/stress tips\n\nwhat do you need?`;
};

// Chat endpoint
router.post('/', async (req, res) => {
  try {
    const { messages } = req.body;
    
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Messages array is required' });
    }

    // If no OpenAI key, use fallback
    if (!OPENAI_API_KEY) {
      const lastMessage = messages[messages.length - 1];
      const response = getFallbackResponse(lastMessage?.content || '');
      return res.json({ 
        message: response,
        fallback: true 
      });
    }

    // Call OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...messages.map(m => ({
            role: m.role,
            content: m.content
          }))
        ],
        max_tokens: 1000,
        temperature: 0.8
      })
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('OpenAI API error:', error);
      // Fallback on error
      const lastMessage = messages[messages.length - 1];
      return res.json({ 
        message: getFallbackResponse(lastMessage?.content || ''),
        fallback: true 
      });
    }

    const data = await response.json();
    const aiMessage = data.choices[0]?.message?.content;

    res.json({ 
      message: aiMessage,
      fallback: false 
    });

  } catch (error) {
    console.error('Chat error:', error);
    // Fallback on any error
    const lastMessage = req.body.messages?.[req.body.messages.length - 1];
    res.json({ 
      message: getFallbackResponse(lastMessage?.content || ''),
      fallback: true 
    });
  }
});

module.exports = router;

