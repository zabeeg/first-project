import { useState, useRef, useEffect } from 'react';
import useStore from '../store';
import './Chat.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

function Chat() {
  const { user } = useStore();
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'assistant',
      content: `hi ${user?.username || 'bestie'}! i'm your wellness companion powered by AI. i can help with literally anything - math homework, life advice, comebacks for haters, random questions, or just chatting. what's on your mind?`
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [conversationContext, setConversationContext] = useState([]);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Smart math solver
  const solveMath = (message) => {
    const msg = message.toLowerCase().replace(/what is|what's|calculate|solve|equals|=|\?/gi, '').trim();
    
    try {
      // Handle word problems
      if (msg.includes('plus') || msg.includes('add')) {
        const nums = msg.match(/\d+/g);
        if (nums && nums.length >= 2) {
          const result = nums.reduce((a, b) => parseInt(a) + parseInt(b), 0);
          return result;
        }
      }
      if (msg.includes('minus') || msg.includes('subtract')) {
        const nums = msg.match(/\d+/g);
        if (nums && nums.length >= 2) {
          return parseInt(nums[0]) - parseInt(nums[1]);
        }
      }
      if (msg.includes('times') || msg.includes('multiply') || msg.includes('multiplied')) {
        const nums = msg.match(/\d+/g);
        if (nums && nums.length >= 2) {
          return parseInt(nums[0]) * parseInt(nums[1]);
        }
      }
      if (msg.includes('divided') || msg.includes('divide')) {
        const nums = msg.match(/\d+/g);
        if (nums && nums.length >= 2) {
          return parseInt(nums[0]) / parseInt(nums[1]);
        }
      }
      
      // Handle expressions like "2+2", "5*3", "10/2", "8-3"
      // Clean up the expression
      let expr = msg
        .replace(/x/g, '*')
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/[^0-9+\-*/().^ ]/g, '')
        .trim();
      
      if (expr) {
        // Handle powers/exponents
        expr = expr.replace(/(\d+)\s*\^\s*(\d+)/g, (match, base, exp) => {
          return Math.pow(parseInt(base), parseInt(exp));
        });
        
        // Safely evaluate basic math
        // eslint-disable-next-line no-eval
        const result = Function('"use strict"; return (' + expr + ')')();
        if (!isNaN(result) && isFinite(result)) {
          return result;
        }
      }
    } catch (e) {
      return null;
    }
    return null;
  };

  // Smart response generator
  const getSmartResponse = (message, context) => {
    const msg = message.toLowerCase().trim();
    
    // INAPPROPRIATE CONTENT FILTER
    const inappropriateWords = ['marry me', 'date me', 'sex', 'sexual', 'nude', 'naked', 'kiss me', 'hook up'];
    if (inappropriateWords.some(word => msg.includes(word))) {
      return "i can't respond to that. let's keep things appropriate! is there something else i can help you with?";
    }

    // MATH QUESTIONS
    const mathKeywords = ['what is', 'what\'s', 'calculate', 'solve', '+', '-', '*', '/', 'plus', 'minus', 'times', 'divided', 'multiply', 'add', 'subtract', 'equals', 'square root', 'squared', 'cubed', 'percent', '%'];
    const hasMathKeyword = mathKeywords.some(k => msg.includes(k));
    const hasNumbers = /\d/.test(msg);
    
    if (hasMathKeyword && hasNumbers) {
      const result = solveMath(msg);
      if (result !== null) {
        const responses = [
          `the answer is **${result}**! need help with anything else?`,
          `that equals **${result}**! any other math questions?`,
          `**${result}**! math is fun when you have help, right?`,
          `easy! it's **${result}**. what else you got?`,
          `the answer is **${result}**. want me to explain how i got that?`
        ];
        return responses[Math.floor(Math.random() * responses.length)];
      }
    }

    // GREETINGS
    if (msg.match(/^(hi|hey|hello|hii+|heyy+|sup|yo|what's up|whats up)$/i) || msg.match(/^(hi|hey|hello)/i) && msg.length < 20) {
      const greetings = [
        `hey!! what's going on? i'm here for whatever you need - homework help, advice, or just vibes.`,
        `hii! how are you doing today? anything on your mind?`,
        `hey bestie! what can i help you with?`,
        `hi! i'm ready to chat about literally anything. what's up?`
      ];
      return greetings[Math.floor(Math.random() * greetings.length)];
    }

    // HOW ARE YOU
    if (msg.includes('how are you') || msg.includes('how r u') || msg.includes('how are u')) {
      return `i'm doing great, thanks for asking! more importantly, how are YOU doing? anything you want to talk about?`;
    }

    // WHAT CAN YOU DO
    if (msg.includes('what can you do') || msg.includes('what do you do') || msg.includes('help me with')) {
      return `i can help with SO much! here's what i'm good at:\n\n📚 **homework & learning** - math, definitions, explanations\n💪 **comebacks** - savage responses for haters\n💕 **friend drama** - toxic friend advice, relationship tips\n🧠 **mental health** - anxiety, stress, confidence boosts\n❓ **random questions** - trivia, fun facts, anything!\n💬 **just chatting** - i'm here if you need someone to talk to\n\nwhat would you like help with?`;
    }

    // DEFINITIONS / WHAT IS (non-math)
    if ((msg.startsWith('what is a ') || msg.startsWith('what is an ') || msg.startsWith('what are ') || msg.startsWith('define ') || msg.startsWith('meaning of ')) && !hasNumbers) {
      const word = msg.replace(/what is an? |what are |define |meaning of |the /gi, '').replace(/\?/g, '').trim();
      const definitions = {
        'love': `love is a deep feeling of affection and care for someone or something. it can be romantic, familial, or platonic. it's one of the most powerful emotions we can experience!`,
        'friendship': `friendship is a close bond between people based on trust, support, and mutual care. good friends are there for you through thick and thin!`,
        'anxiety': `anxiety is a feeling of worry, nervousness, or unease about something. it's totally normal to feel anxious sometimes, but if it's overwhelming, there are ways to manage it!`,
        'confidence': `confidence is believing in yourself and your abilities. it's not about being perfect - it's about knowing your worth even when things aren't perfect!`,
        'toxic': `toxic means something or someone that's harmful or negative. toxic relationships or friendships drain your energy and make you feel bad about yourself.`,
        'self-care': `self-care is taking time to do things that help your physical, mental, and emotional health. it can be anything from skincare to setting boundaries!`,
        'boundaries': `boundaries are limits you set to protect your mental and emotional health. they're super important in all relationships!`,
        'gaslighting': `gaslighting is when someone makes you question your own reality or feelings. it's a form of manipulation and it's NOT okay.`,
        'red flag': `a red flag is a warning sign that something might be wrong in a relationship or situation. trust your gut when you see them!`,
        'aesthetic': `aesthetic is the overall look or vibe of something. it's about visual style and what feels pleasing to you!`,
        'manifestation': `manifestation is the practice of thinking positively and visualizing your goals to help make them reality. it's about mindset and intention!`,
        'affirmation': `an affirmation is a positive statement you tell yourself to boost confidence and self-belief. like "i am worthy" or "i am capable"!`,
        'slay': `slay means to do something incredibly well or look absolutely amazing. when you slay, you're killing it in the best way!`,
        'bestie': `bestie is short for best friend - someone who's always there for you and gets you!`,
        'vibe': `a vibe is the feeling or atmosphere of something. good vibes = positive energy!`,
        'tea': `tea (slang) means gossip or the truth about a situation. "spill the tea" means tell me what happened!`,
        'snatched': `snatched means looking really good, like your look is on point!`,
        'periodt': `periodt (with the t) means "and that's that" - emphasizing that something is final and true!`,
        'no cap': `no cap means "no lie" or "for real" - you're being totally honest!`,
        'lowkey': `lowkey means somewhat or secretly. like "i lowkey love that song"`,
        'highkey': `highkey is the opposite of lowkey - openly or very much. "i highkey need coffee"`,
        'sus': `sus is short for suspicious - something seems off or sketchy`,
        'fomo': `fomo stands for "fear of missing out" - that anxious feeling when you think others are having fun without you`,
        'ghosting': `ghosting is when someone suddenly stops responding to messages without explanation. it's not cool to do to people!`,
        'planet': `a planet is a large celestial body that orbits around a star (like Earth orbits the Sun). there are 8 planets in our solar system!`,
        'gravity': `gravity is the force that pulls objects toward each other. it's why we stay on the ground and why things fall!`,
        'photosynthesis': `photosynthesis is how plants make their food! they use sunlight, water, and carbon dioxide to create energy and release oxygen.`,
        'democracy': `democracy is a system of government where citizens vote to choose their leaders and make decisions together.`,
        'empathy': `empathy is the ability to understand and share the feelings of others. it's like putting yourself in someone else's shoes!`
      };
      
      if (definitions[word]) {
        return definitions[word];
      }
      
      // Generic response for unknown definitions
      return `hmm, i don't have a definition for "${word}" saved, but i can try to help! is this for homework? tell me more about what you're looking for.`;
    }

    // MEANING OF LIFE / PHILOSOPHICAL
    if (msg.includes('meaning of life') || msg.includes('purpose of life') || msg.includes('why are we here')) {
      return `ooh deep question! honestly, i think the meaning of life is different for everyone. for some it's about love and connection, for others it's about creating things or making a difference. what matters is finding what makes YOU feel fulfilled and happy. what do you think gives your life meaning?`;
    }

    // JOKES
    if (msg.includes('tell me a joke') || msg.includes('make me laugh') || msg.includes('say something funny')) {
      const jokes = [
        `why don't scientists trust atoms? because they make up everything! 😄`,
        `what do you call a fake noodle? an impasta! 🍝`,
        `why did the scarecrow win an award? because he was outstanding in his field! 🌾`,
        `what do you call a bear with no teeth? a gummy bear! 🐻`,
        `why don't eggs tell jokes? they'd crack each other up! 🥚`,
        `what did the ocean say to the beach? nothing, it just waved! 🌊`,
        `why was the math book sad? because it had too many problems! 📚`,
        `what do you call a fish without eyes? a fsh! 🐟`
      ];
      return jokes[Math.floor(Math.random() * jokes.length)];
    }

    // COMPLIMENTS / FEELING DOWN
    if (msg.includes('i\'m ugly') || msg.includes('im ugly') || msg.includes('i look ugly') || msg.includes('i hate how i look')) {
      return `stop right there! you are NOT ugly. beauty isn't one-size-fits-all, and the things that make you "different" are exactly what make you unique and beautiful. social media and filters have messed with everyone's perception of beauty. the real you is gorgeous - i promise. what's making you feel this way?`;
    }

    if (msg.includes('i\'m stupid') || msg.includes('im stupid') || msg.includes('i\'m dumb') || msg.includes('im dumb')) {
      return `you are NOT stupid! everyone learns differently and at their own pace. struggling with something doesn't mean you're dumb - it means you're human. what are you working on? maybe i can help!`;
    }

    // COMEBACKS
    const wantsComeback = msg.includes('comeback') || msg.includes('clap back') || msg.includes('say back') || 
      msg.includes('respond to') || msg.includes('what do i say') || msg.includes('what should i say') ||
      msg.includes('someone said') || msg.includes('they said') || msg.includes('she said') || msg.includes('he said') ||
      msg.includes('called me') || msg.includes('roast');

    if (wantsComeback) {
      if (msg.includes('fake')) {
        return `ooh they called you fake? here are some savage comebacks:\n\n- "girl im not fake, barbie is literally jealous of you tho"\n- "fake? babe i'm the realest thing you'll ever meet"\n- "the only thing fake here is your personality"\n- "at least i'm consistent, you switch up like seasons"\n- "fake is when you pretend to be my friend then talk behind my back... sound familiar?"\n\npick your favorite and deliver it with confidence!`;
      }
      if (msg.includes('ugly') || msg.includes('look')) {
        return `they came for your looks? let's end them:\n\n- "funny coming from someone who looks like they were drawn with the wrong hand"\n- "girl you must own zero mirrors"\n- "i'd rather be me than look like i gave up"\n- "at least i don't have to use filters to feel confident"\n- "my face is my business, maybe focus on your own situation"\n\nyou're gorgeous and they're just jealous!`;
      }
      if (msg.includes('annoying') || msg.includes('boring')) {
        return `they said you're annoying? here's what to say:\n\n- "and yet here you are, still talking to me"\n- "boring? you're the human equivalent of a plain rice cake"\n- "if i'm so annoying why do you keep bringing me up"\n- "i'd rather be annoying than irrelevant like you"\n- "you find me annoying because i don't worship you like you think i should"`;
      }
      if (msg.includes('fat') || msg.includes('skinny') || msg.includes('weight') || msg.includes('body')) {
        return `body shaming? absolutely not. shut them down:\n\n- "my body is none of your business, focus on yourself"\n- "imagine being so insecure you comment on other people's bodies"\n- "that says more about you than it does about me"\n- "at least i'm comfortable in my skin"\n- "your opinion on my body was not asked for"\n\nyou're beautiful exactly as you are.`;
      }
      // General comebacks
      return `here are some fire comebacks:\n\n- "the only thing you're good at is being forgettable"\n- "i'd agree with you but then we'd both be wrong"\n- "keep talking, you're making me look better"\n- "i've been called worse by better people"\n- "the trash gets picked up tomorrow, be ready"\n- "you're not pretty enough to be this mean"\n- "the bar was low and you still tripped over it"\n\ndeliver with confidence and walk away!`;
    }

    // MORE (follow up)
    if ((msg === 'more' || msg === 'another' || msg === 'give me more' || msg === 'another one') && context.length > 0) {
      const lastTopic = context[context.length - 1];
      if (lastTopic.includes('comeback') || lastTopic.includes('roast')) {
        return `here's more heat:\n\n- "you're like a cloud - when you disappear it's a beautiful day"\n- "sorry i can't hear you over how irrelevant you are"\n- "girl you're not the main character, you're not even an extra"\n- "the audacity is giving delusion"\n- "stay pressed, it's a good look on you... wait no it's not"\n- "i've seen better insults on a candy heart"`;
      }
    }

    // TOXIC FRIENDS
    if (msg.includes('toxic') || (msg.includes('friend') && (msg.includes('mean') || msg.includes('drama') || msg.includes('bad') || msg.includes('hurt')))) {
      return `toxic friends are the worst. here's the real talk:\n\n1. **trust your gut** - if something feels off, it probably is\n2. **you don't owe anyone your peace** - your mental health comes first\n3. **real friends hype you up**, not tear you down\n4. **you can distance yourself** without a big dramatic exit\n5. **quality > quantity** always\n\nwhat's happening with your situation? i'm here to help you figure out what to do.`;
    }

    // FEELING SAD
    if (msg.includes('sad') || msg.includes('depressed') || msg.includes('down') || msg.includes('crying') || msg.includes('upset')) {
      return `i hear you, and i'm sorry you're feeling this way. your feelings are completely valid.\n\nsome things that might help:\n- let yourself feel it - don't push it away\n- comfort food, cozy blanket, favorite show - the basics work\n- remember this feeling is temporary\n- talking about it can help (i'm here!)\n\nwant to tell me more about what's going on?`;
    }

    // ANXIETY
    if (msg.includes('anxious') || msg.includes('anxiety') || msg.includes('stressed') || msg.includes('worried') || msg.includes('nervous') || msg.includes('overwhelmed')) {
      return `anxiety is so frustrating. let's work through it.\n\n**try this:** breathe in for 4 counts... hold for 4... out for 4. do it a few times.\n\nsome things that help:\n- ground yourself: name 5 things you can see right now\n- remember: most of what we worry about literally never happens\n- break big scary things into tiny steps\n- one moment at a time\n\nwhat's weighing on you the most?`;
    }

    // CONFIDENCE
    if (msg.includes('confident') || msg.includes('confidence') || msg.includes('insecure') || msg.includes('not good enough') || msg.includes('hate myself')) {
      return `listen to me: you are worthy, capable, and enough exactly as you are.\n\nthose negative thoughts are loud but they're lying to you. here's the truth:\n\n- your worth isn't determined by anyone else's opinion\n- comparison is a trap - everyone's on their own journey\n- the things that make you "different" make you YOU\n- even the most confident people have insecurities\n\nbe nicer to yourself. you deserve the same kindness you give others. what's one thing you actually like about yourself?`;
    }

    // RELATIONSHIPS / CRUSH
    if (msg.includes('crush') || msg.includes('boyfriend') || msg.includes('girlfriend') || msg.includes('dating') || msg.includes('like someone')) {
      return `ooh let's talk about it!\n\nmy love advice:\n- be yourself - the right person will love the REAL you\n- don't rush things\n- communication > playing games, always\n- your worth doesn't depend on whether someone likes you back\n- trust your gut\n\nwhat's the situation? tell me everything!`;
    }

    // SCHOOL / HOMEWORK
    if (msg.includes('school') || msg.includes('homework') || msg.includes('exam') || msg.includes('test') || msg.includes('grades') || msg.includes('study')) {
      return `the pressure is SO real. i get it.\n\nsome tips:\n- break big tasks into smaller chunks so it's less overwhelming\n- take breaks to avoid burnout (pomodoro technique works!)\n- your grades don't define your worth as a person\n- asking for help is smart, not weak\n- celebrate the small wins\n\nwhat's stressing you out the most? maybe i can help with specific homework!`;
    }

    // POSITIVE / THANK YOU
    if (msg.includes('thank') || msg.includes('thanks') || msg.includes('thx')) {
      return `you're so welcome! i'm always here if you need me. anything else you want to chat about? 💕`;
    }

    if (msg.includes('i love you') || msg.includes('ily') || msg.includes('you\'re the best') || msg.includes('youre the best')) {
      return `aww you're so sweet! i love being here for you. you're pretty amazing yourself! 💕`;
    }

    // YES/NO answers
    if (msg === 'yes' || msg === 'yeah' || msg === 'yep' || msg === 'yea' || msg === 'sure') {
      return `okay great! tell me more - what would you like to know or talk about?`;
    }

    if (msg === 'no' || msg === 'nope' || msg === 'nah') {
      return `no worries! is there something else i can help you with?`;
    }

    // RANDOM FACTS
    if (msg.includes('random fact') || msg.includes('tell me something') || msg.includes('fun fact')) {
      const facts = [
        `did you know? honey never spoils! archaeologists found 3000-year-old honey in Egyptian tombs that was still edible! 🍯`,
        `fun fact: octopuses have three hearts and blue blood! 🐙`,
        `did you know butterflies taste with their feet? 🦋`,
        `here's a cool one: you can't hum while holding your nose closed! (try it!) 👃`,
        `fun fact: the shortest war in history lasted only 38-45 minutes (between Britain and Zanzibar)! ⚔️`,
        `did you know? a group of flamingos is called a "flamboyance"! 🦩`,
        `here's one: bananas are berries, but strawberries aren't! 🍌`,
        `fun fact: the average person spends 6 months of their lifetime waiting for red lights to turn green! 🚦`
      ];
      return facts[Math.floor(Math.random() * facts.length)];
    }

    // WHO ARE YOU
    if (msg.includes('who are you') || msg.includes('what are you') || msg.includes('your name')) {
      return `i'm your wellness bestie - an AI companion built into the BetterMe app! i'm here to help with anything you need - homework, advice, comebacks, or just chatting. think of me as a friend who's always available and never judges. what can i help you with?`;
    }

    // WEATHER (can't actually check, but acknowledge)
    if (msg.includes('weather') || msg.includes('temperature') || msg.includes('raining')) {
      return `i wish i could check the weather for you, but i don't have access to that info! you can check your phone's weather app though. is there anything else i can help with?`;
    }

    // TIME (acknowledge limitation)
    if (msg.includes('what time') || msg.includes('what\'s the time')) {
      return `i can't check the time for you, but your device should show it! anything else you need help with?`;
    }

    // DEFAULT - try to be helpful
    const defaultResponses = [
      `hmm, i'm not 100% sure what you're asking, but i want to help! could you tell me more? i can help with math, definitions, comebacks, advice, and lots more!`,
      `i didn't quite catch that - could you rephrase? i'm here to help with homework, life advice, fun facts, or whatever you need!`,
      `interesting! tell me more about what you're looking for. i can help with so many things - just let me know what you need!`,
      `i want to make sure i give you a good answer! can you give me a bit more detail? i'm good with math, advice, comebacks, definitions, and more!`
    ];
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: input.trim()
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    const currentInput = input.trim();
    setInput('');
    setIsTyping(true);

    // Update context for follow-up responses
    setConversationContext(prev => [...prev, currentInput].slice(-5));

    try {
      // Try calling the backend AI API first
      const response = await fetch(`${API_URL}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: updatedMessages.map(m => ({
            role: m.role,
            content: m.content
          }))
        })
      });

      let aiContent;
      
      if (response.ok) {
        const data = await response.json();
        // If it's a fallback response from the server, use our smarter local one
        if (data.fallback) {
          aiContent = getSmartResponse(currentInput, conversationContext);
        } else {
          aiContent = data.message;
        }
      } else {
        // Use smart local fallback
        aiContent = getSmartResponse(currentInput, conversationContext);
      }

      const aiResponse = {
        id: Date.now() + 1,
        role: 'assistant',
        content: aiContent
      };

      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error('Chat error:', error);
      // Use smart local fallback
      const aiResponse = {
        id: Date.now() + 1,
        role: 'assistant',
        content: getSmartResponse(currentInput, conversationContext)
      };
      setMessages(prev => [...prev, aiResponse]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const suggestedTopics = [
    "what is 25 + 17?",
    "i need comebacks for haters",
    "tell me a fun fact",
    "i need confidence tips"
  ];

  return (
    <div className="chat-page">
      <div className="chat-container">
        <div className="chat-header">
          <div className="chat-header-icon">
            <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
              <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
              <circle cx="9" cy="10" r="1" fill="currentColor"/>
              <circle cx="15" cy="10" r="1" fill="currentColor"/>
            </svg>
          </div>
          <div className="chat-header-info">
            <h1>wellness bestie</h1>
            <span className="chat-status">AI powered - here for anything you need</span>
          </div>
        </div>

        <div className="chat-messages">
          {messages.map((message) => (
            <div key={message.id} className={`message ${message.role}`}>
              {message.role === 'assistant' && (
                <div className="message-avatar">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
                    <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
                    <circle cx="9" cy="10" r="1" fill="currentColor"/>
                    <circle cx="15" cy="10" r="1" fill="currentColor"/>
                  </svg>
                </div>
              )}
              <div className="message-content">
                {message.content.split('\n').map((line, i) => (
                  <span key={i}>
                    {line.split('**').map((part, j) => 
                      j % 2 === 1 ? <strong key={j}>{part}</strong> : part
                    )}
                    {i < message.content.split('\n').length - 1 && <br />}
                  </span>
                ))}
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="message assistant">
              <div className="message-avatar">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
                  <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
                  <circle cx="9" cy="10" r="1" fill="currentColor"/>
                  <circle cx="15" cy="10" r="1" fill="currentColor"/>
                </svg>
              </div>
              <div className="message-content typing">
                <span className="typing-dot"></span>
                <span className="typing-dot"></span>
                <span className="typing-dot"></span>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {messages.length === 1 && (
          <div className="suggested-topics">
            <p>try asking:</p>
            <div className="topics-grid">
              {suggestedTopics.map((topic, index) => (
                <button 
                  key={index}
                  className="topic-btn"
                  onClick={() => {
                    setInput(topic);
                    inputRef.current?.focus();
                  }}
                >
                  {topic}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="chat-input-container">
          <textarea
            ref={inputRef}
            className="chat-input"
            placeholder="ask me anything..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            rows={1}
          />
          <button 
            className="send-btn"
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 2L11 13"/>
              <path d="M22 2L15 22L11 13L2 9L22 2Z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
