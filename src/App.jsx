import React, { useState, useEffect, useMemo } from 'react';
import { 
  Search, 
  Copy, 
  Star, 
  Zap, 
  Home, 
  Grid, 
  Info, 
  X, 
  Check, 
  Smartphone, 
  Layers, 
  Aperture,
  PenTool,
  Cpu,
  Sparkles,
  Wand2,
  Loader2,
  Palette,
  Instagram,
  Globe,
  Youtube,
  Linkedin,
  Monitor,
  Maximize,
  Shield // أيقونة الأبطال الخارقين الجديدة
} from 'lucide-react';

// --- أيقونات مخصصة (Custom SVGs) ---

const XIcon = ({ size = 20, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
  </svg>
);

const TikTokIcon = ({ size = 20, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

// --- خيارات الأبعاد ---
const ASPECT_RATIOS = [
  { id: '1:1', label: 'مربع', w: 24, h: 24, desc: 'Instagram Post' },
  { id: '16:9', label: 'سينمائي', w: 32, h: 18, desc: 'YouTube / Desktop' },
  { id: '9:16', label: 'ستوري', w: 18, h: 32, desc: 'TikTok / Reels' },
  { id: '4:3', label: 'كلاسيك', w: 28, h: 21, desc: 'TV Style' },
  { id: '3:4', label: 'بورتريه', w: 21, h: 28, desc: 'Portrait' },
  { id: '21:9', label: 'عريض', w: 36, h: 15, desc: 'Ultra Wide' },
];

// --- الثيمات ---
const THEMES = {
  gold: {
    id: 'gold', name: 'Cyberpunk', type: 'tech',
    colors: { bg: '#050505', text: 'text-gray-200', accent: 'text-yellow-500', accentBg: 'bg-yellow-500', border: 'border-yellow-500/30', cardBg: 'bg-[#111]', glass: 'backdrop-blur-md bg-yellow-900/10', gradient: 'from-yellow-600 via-yellow-500 to-amber-600' },
    shapes: { radius: 'rounded-xl', borderWidth: 'border', cardStyle: 'hover:shadow-[0_0_30px_rgba(234,179,8,0.2)] hover:border-yellow-500', buttonStyle: 'uppercase tracking-wider font-bold' },
    bgPattern: (<div className="absolute inset-0 opacity-20 pointer-events-none"><div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(234, 179, 8, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(234, 179, 8, 0.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} /><div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-yellow-500/10 blur-[100px] rounded-full" /></div>)
  },
  purple: {
    id: 'purple', name: 'Nebula', type: 'dreamy',
    colors: { bg: '#0f0c29', text: 'text-purple-100', accent: 'text-fuchsia-400', accentBg: 'bg-fuchsia-500', border: 'border-fuchsia-500/30', cardBg: 'bg-white/5', glass: 'backdrop-blur-xl bg-white/5 border border-white/10', gradient: 'from-purple-600 via-fuchsia-500 to-pink-500' },
    shapes: { radius: 'rounded-3xl', borderWidth: 'border-0', cardStyle: 'hover:bg-white/10 hover:scale-105 shadow-2xl', buttonStyle: 'font-medium tracking-wide' },
    bgPattern: (<div className="absolute inset-0 overflow-hidden pointer-events-none"><div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/40 via-[#0f0c29] to-[#0f0c29]" /><div className="absolute top-1/4 left-1/4 w-96 h-96 bg-fuchsia-600/20 rounded-full blur-[128px] animate-pulse" /><div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-[128px] animate-pulse delay-1000" /><div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(white 1px, transparent 1px)', backgroundSize: '50px 50px' }} /></div>)
  },
  blue: {
    id: 'blue', name: 'Ocean Glass', type: 'clean',
    colors: { bg: '#001220', text: 'text-cyan-50', accent: 'text-cyan-400', accentBg: 'bg-cyan-500', border: 'border-cyan-400/40', cardBg: 'bg-cyan-900/10', glass: 'backdrop-blur-sm bg-cyan-950/40 border border-cyan-500/30', gradient: 'from-cyan-500 via-blue-500 to-indigo-600' },
    shapes: { radius: 'rounded-2xl', borderWidth: 'border', cardStyle: 'backdrop-filter backdrop-blur-sm hover:shadow-[0_0_20px_rgba(34,211,238,0.3)]', buttonStyle: 'font-semibold' },
    bgPattern: (<div className="absolute inset-0 pointer-events-none"><div className="absolute inset-0 bg-gradient-to-b from-[#001e36] to-[#001220]" /><div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #06b6d4 0, #06b6d4 1px, transparent 0, transparent 50%)', backgroundSize: '20px 20px' }} /><div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-cyan-900/20 to-transparent" /></div>)
  },
  green: {
    id: 'green', name: 'Zen Garden', type: 'organic',
    colors: { bg: '#1a1c1a', text: 'text-emerald-50', accent: 'text-emerald-400', accentBg: 'bg-emerald-500', border: 'border-emerald-500/20', cardBg: 'bg-[#222422]', glass: 'backdrop-blur-none bg-[#2a2c2a] border border-emerald-500/10', gradient: 'from-emerald-600 to-green-500' },
    shapes: { radius: 'rounded-lg', borderWidth: 'border-0', cardStyle: 'hover:translate-y-[-5px] shadow-lg hover:shadow-emerald-900/50', buttonStyle: 'font-serif tracking-tight' },
    bgPattern: (<div className="absolute inset-0 pointer-events-none"><div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} /><div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-emerald-900/20 rounded-full blur-[80px]" /><div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-[#111] to-transparent" /></div>)
  },
  red: {
    id: 'red', name: 'Arcade 80s', type: 'retro',
    colors: { bg: '#1a0505', text: 'text-rose-100', accent: 'text-rose-500', accentBg: 'bg-rose-600', border: 'border-rose-500', cardBg: 'bg-black', glass: 'bg-black border-2 border-rose-900', gradient: 'from-red-600 via-rose-600 to-pink-600' },
    shapes: { radius: 'rounded-none', borderWidth: 'border-2', cardStyle: 'hover:shadow-[4px_4px_0px_0px_rgba(225,29,72,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-none', buttonStyle: 'font-mono uppercase' },
    bgPattern: (<div className="absolute inset-0 pointer-events-none overflow-hidden"><div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(transparent 50%, rgba(20, 0, 0, 0.5) 50%)', backgroundSize: '100% 4px' }} /><div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(90deg, rgba(244, 63, 94, 0.1) 1px, transparent 1px)', backgroundSize: '40px 100%' }} /><div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-rose-900/30 to-transparent" /></div>)
  }
};

// --- بيانات التطبيق الموسعة (أكثر من 100 برومبت) ---
const INITIAL_DATA = [
  // --- أبطال خارقين (Superheroes) - 25+ Items ---
  {
    id: 101, title: "باتمان - جوثام نوار", category: "أبطال خارقين",
    prompt: "Batman standing on a gargoyle, Gotham City raining night, noir style, black and white with splash of yellow, dramatic shadows, lightning strike, cinematic lighting, 8k --v 6.0",
    tags: ["DC", "Batman", "Noir"], color: "from-gray-900 to-gray-600"
  },
  {
    id: 102, title: "سبايدر مان - نيون طوكيو", category: "أبطال خارقين",
    prompt: "Spider-Man swinging through futuristic Tokyo, neon signs, cyberpunk style, vibrant red and blue suit, motion blur, dynamic pose, rainy reflection, ultra-detailed --v 6.0",
    tags: ["Marvel", "Spiderman", "Cyberpunk"], color: "from-red-600 to-blue-600"
  },
  {
    id: 103, title: "أيرون مان - ستيم بانك", category: "أبطال خارقين",
    prompt: "Iron Man suit designed by Da Vinci, steampunk style, brass and copper gears, steam pipes, vintage parchment texture, intricate engineering details, sepia tone --v 6.0",
    tags: ["Marvel", "IronMan", "Steampunk"], color: "from-yellow-700 to-red-800"
  },
  {
    id: 104, title: "وندر وومان - إغريقي قديم", category: "أبطال خارقين",
    prompt: "Wonder Woman as an ancient Greek marble statue, gold accents coming to life, temple background, ethereal sunlight, god rays, majestic, cinematic composition --v 6.0",
    tags: ["DC", "WonderWoman", "Art"], color: "from-yellow-500 to-red-500"
  },
  {
    id: 105, title: "الجوكر - سريالي", category: "أبطال خارقين",
    prompt: "The Joker in a psychedelic chaotic world, melting colors, insane laughter visualised as smoke, vibrant purple and green, horror surrealism, detailed texture --v 6.0",
    tags: ["DC", "Villain", "Surreal"], color: "from-purple-600 to-green-500"
  },
  {
    id: 106, title: "بلاك بانثر - واكاندا", category: "أبطال خارقين",
    prompt: "Black Panther sitting on the throne of Wakanda, vibranium glowing purple patterns, tribal futuristic tech, jungle sunset background, regal atmosphere, photorealistic --v 6.0",
    tags: ["Marvel", "BlackPanther", "Royal"], color: "from-purple-900 to-black"
  },
  {
    id: 107, title: "ثور - أسطورة الفايكنج", category: "أبطال خارقين",
    prompt: "Thor Odinson in authentic Viking armor, holding Mjolnir with lightning crackling, stormy sea background, heavy rain, epic beard, Norse mythology art style --v 6.0",
    tags: ["Marvel", "Thor", "Mythology"], color: "from-blue-400 to-gray-500"
  },
  {
    id: 108, title: "ديدبول - فن الشارع", category: "أبطال خارقين",
    prompt: "Deadpool breaking the fourth wall, graffiti art style on a brick wall, vibrant spray paint colors, chaotic and funny, urban setting, street art masterpiece --v 6.0",
    tags: ["Marvel", "Deadpool", "Graffiti"], color: "from-red-500 to-black"
  },
  {
    id: 109, title: "سوبرمان - ريترو 50s", category: "أبطال خارقين",
    prompt: "Superman flying over Metropolis, classic 1950s poster art style, bright primary colors, hopeful expression, sunbeam background, grain texture, vintage comic vibe --v 6.0",
    tags: ["DC", "Superman", "Retro"], color: "from-blue-600 to-red-500"
  },
  {
    id: 110, title: "دكتور سترينج - فركتال", category: "أبطال خارقين",
    prompt: "Doctor Strange casting a spell, mandalas and fractal geometry magic, mirror dimension background, kaleidoscope effect, glowing orange runes, mystic atmosphere --v 6.0",
    tags: ["Marvel", "Magic", "Abstract"], color: "from-orange-500 to-purple-800"
  },
  {
    id: 111, title: "وولفرين - حبر سومي", category: "أبطال خارقين",
    prompt: "Wolverine unleashed, Japanese Sumi-e ink wash painting style, aggressive brush strokes, black and white with red claw marks, minimalist but intense --v 6.0",
    tags: ["Marvel", "Wolverine", "Ink"], color: "from-yellow-600 to-black"
  },
  {
    id: 112, title: "هالك - لوحة زيتية", category: "أبطال خارقين",
    prompt: "The Incredible Hulk smashing through a wall, classical renaissance oil painting style, dramatic lighting like Caravaggio, intense emotion, cracked texture --v 6.0",
    tags: ["Marvel", "Hulk", "ClassicArt"], color: "from-green-600 to-green-800"
  },
  {
    id: 113, title: "فلاش - سرعة الضوء", category: "أبطال خارقين",
    prompt: "The Flash running at light speed, long exposure photography effect, light trails, blurred background city, electricity sparks, dynamic perspective --v 6.0",
    tags: ["DC", "Flash", "Speed"], color: "from-red-500 to-yellow-400"
  },
  {
    id: 114, title: "أكوامان - عالم البحار", category: "أبطال خارقين",
    prompt: "Aquaman commanding sharks, deep underwater photorealistic, bioluminescent creatures, Atlantis ruins background, bubbles and light refraction, epic scale --v 6.0",
    tags: ["DC", "Aquaman", "Underwater"], color: "from-cyan-600 to-teal-500"
  },
  {
    id: 115, title: "جروت - ماكرو طبيعة", category: "أبطال خارقين",
    prompt: "Baby Groot sitting on a mossy rock, macro photography, shallow depth of field, morning dew drops, hyper-detailed wood texture, forest bokeh background --v 6.0",
    tags: ["Marvel", "Groot", "Nature"], color: "from-green-700 to-yellow-800"
  },
  {
    id: 116, title: "سكارليت ويتش - فوضى", category: "أبطال خارقين",
    prompt: "Scarlet Witch warping reality, red chaos magic swirling, glitch art effect, dark atmosphere, glowing eyes, telekinetic power, cinematic shot --v 6.0",
    tags: ["Marvel", "Wanda", "Magic"], color: "from-red-700 to-red-900"
  },
  {
    id: 117, title: "ثانوس - تمثال رخامي", category: "أبطال خارقين",
    prompt: "Thanos headshot, carved from white marble, museum lighting, classical sculpture, infinity stones glowing faintly, stoic expression, detailed texture --v 6.0",
    tags: ["Marvel", "Thanos", "Statue"], color: "from-purple-500 to-gray-300"
  },
  {
    id: 118, title: "فينوم - سائل", category: "أبطال خارقين",
    prompt: "Venom symbiote taking form, glossy black liquid simulation, slime texture, sharp white teeth, terrifying, studio lighting, high contrast, macro detail --v 6.0",
    tags: ["Marvel", "Venom", "Horror"], color: "from-black to-gray-800"
  },
  {
    id: 119, title: "ستورم - الطقس", category: "أبطال خارقين",
    prompt: "Storm from X-Men controlling a hurricane, white eyes, lightning bolts surrounding her, majestic pose, dark clouds, elemental power, epic scale --v 6.0",
    tags: ["Marvel", "XMen", "Weather"], color: "from-gray-400 to-blue-300"
  },
  {
    id: 120, title: "ديرديفيل - رادار", category: "أبطال خارقين",
    prompt: "Daredevil perched on a church cross, view of Hell's Kitchen through 'radar sense' red wireframe visual style, rainy night, moody atmosphere --v 6.0",
    tags: ["Marvel", "Daredevil", "Unique"], color: "from-red-800 to-red-600"
  },

  // --- تصوير واقعي (Photorealistic) ---
  {
    id: 201, title: "بورتريت الصياد العجوز", category: "تصوير واقعي",
    prompt: "Hyper-realistic portrait of an old fisherman, deep wrinkles, weathered skin, white beard, wearing a yellow raincoat, stormy sea background, dramatic lighting, 85mm lens --v 6.0",
    tags: ["Portrait", "Human", "Detailed"], color: "from-blue-800 to-gray-600"
  },
  {
    id: 202, title: "شارع ممطر ليلاً", category: "تصوير واقعي",
    prompt: "Cinematic shot of a rainy street in London at night, reflections in puddles, bokeh street lights, person with umbrella walking away, moody atmosphere, 4k --v 6.0",
    tags: ["City", "Rain", "Night"], color: "from-blue-900 to-black"
  },
  {
    id: 203, title: "عين عن قرب", category: "تصوير واقعي",
    prompt: "Extreme macro shot of a human blue eye, detailed iris texture, eyelashes, reflection of a window in the pupil, studio lighting, sharp focus --v 6.0",
    tags: ["Macro", "Eye", "Human"], color: "from-blue-400 to-cyan-300"
  },
  {
    id: 204, title: "قهوة صباحية", category: "تصوير واقعي",
    prompt: "Steaming cup of coffee on a rustic wooden table, morning sunlight streaming through window, dust motes dancing in light, cozy atmosphere, shallow depth of field --v 6.0",
    tags: ["Cozy", "Coffee", "Morning"], color: "from-orange-800 to-yellow-700"
  },
  {
    id: 205, title: "أسد في السافانا", category: "تصوير واقعي",
    prompt: "Majestic male lion roaring in the African savanna, golden hour lighting, dust flying, highly detailed fur, national geographic style photography --v 6.0",
    tags: ["Wildlife", "Lion", "Nature"], color: "from-yellow-600 to-orange-500"
  },
  {
    id: 206, title: "سيارة كلاسيكية", category: "تصوير واقعي",
    prompt: "Vintage 1960s Mustang driving on a coastal highway, sunset reflection on chrome, motion blur on wheels, cinematic composition, color graded --v 6.0",
    tags: ["Car", "Vintage", "Travel"], color: "from-red-700 to-orange-600"
  },
  {
    id: 207, title: "غابة شتوية", category: "تصوير واقعي",
    prompt: "Aerial drone shot of a pine forest covered in heavy snow, misty mountains in background, cold blue tones, serene and quiet atmosphere --v 6.0",
    tags: ["Nature", "Snow", "Landscape"], color: "from-white to-blue-200"
  },
  {
    id: 208, title: "سوق شعبي", category: "تصوير واقعي",
    prompt: "Bustling spice market in Marrakech, colorful piles of spices, cinematic lighting, dust in air, vibrant colors, cultural photography --v 6.0",
    tags: ["Travel", "Culture", "Colors"], color: "from-orange-500 to-red-500"
  },
  {
    id: 209, title: "قطة تحت المطر", category: "تصوير واقعي",
    prompt: "Stray cat sitting under a Japanese shelter during rain, wet fur texture, sad eyes, neon sign reflection in background, emotional shot --v 6.0",
    tags: ["Animal", "Cat", "Mood"], color: "from-gray-500 to-blue-400"
  },
  {
    id: 210, title: "نيران المخيم", category: "تصوير واقعي",
    prompt: "Close up of a campfire at night, sparks flying upwards, glowing embers, dark background, warm lighting illuminating hands holding a mug --v 6.0",
    tags: ["Fire", "Night", "Camping"], color: "from-orange-600 to-red-900"
  },
  {
    id: 211, title: "رائد فضاء يعكس الأرض", category: "تصوير واقعي",
    prompt: "Close up of astronaut helmet visor reflecting the Earth, deep space background, stars, high detail, realistic lighting, solitude theme --v 6.0",
    tags: ["Space", "SciFi", "Realistic"], color: "from-blue-600 to-black"
  },
  {
    id: 212, title: "بومة الثلج", category: "تصوير واقعي",
    prompt: "Snowy owl flying towards camera, wings spread, yellow eyes focused, snowy blurred background, fast shutter speed, wildlife photography --v 6.0",
    tags: ["Bird", "Winter", "Action"], color: "from-white to-gray-200"
  },
  {
    id: 213, title: "مطبخ إيطالي", category: "تصوير واقعي",
    prompt: "Chef hands tossing pasta in a pan, flour in air, fresh ingredients, tomato sauce, dynamic motion, kitchen lighting, food photography --v 6.0",
    tags: ["Food", "Chef", "Italian"], color: "from-red-500 to-yellow-500"
  },
  {
    id: 214, title: "فقاعة صابون", category: "تصوير واقعي",
    prompt: "Macro shot of a soap bubble, iridescent rainbow colors swirling, reflection of photographer, black background, abstract realism --v 6.0",
    tags: ["Abstract", "Macro", "Colorful"], color: "from-pink-400 to-blue-400"
  },
  {
    id: 215, title: "صحراء عند الغروب", category: "تصوير واقعي",
    prompt: "Vast desert sand dunes at sunset, sharp ridges, long shadows, gradient sky from orange to purple, minimalist landscape --v 6.0",
    tags: ["Desert", "Landscape", "Sunset"], color: "from-orange-400 to-purple-600"
  },

  // --- تصاميم 3D (3D Design) ---
  {
    id: 301, title: "غرفة آيزومترية", category: "تصاميم 3D",
    prompt: "Cute isometric gamer room, neon lighting, pc setup, tiny plants, cozy atmosphere, blender 3d, soft clay render, pastel colors --v 6.0",
    tags: ["Isometric", "Room", "Cute"], color: "from-purple-400 to-pink-400"
  },
  {
    id: 302, title: "أشكال زجاجية", category: "تصاميم 3D",
    prompt: "Abstract geometric glass shapes floating, dispersion of light, rainbow caustics, clean white background, cinema 4d, octane render, minimalism --v 6.0",
    tags: ["Abstract", "Glass", "Clean"], color: "from-white to-gray-300"
  },
  {
    id: 303, title: "وحش فروي لطيف", category: "تصاميم 3D",
    prompt: "Adorable fluffy monster holding a cookie, pixar style, bright colors, soft fur texture, studio lighting, 3d character design, expressive eyes --v 6.0",
    tags: ["Character", "Cute", "Pixar"], color: "from-blue-400 to-teal-400"
  },
  {
    id: 304, title: "سائل ذهبي", category: "تصاميم 3D",
    prompt: "Gold liquid splashing in zero gravity, droplets, glossy metallic texture, black background, high contrast, fluid simulation, luxurious --v 6.0",
    tags: ["Fluid", "Gold", "Luxury"], color: "from-yellow-500 to-yellow-700"
  },
  {
    id: 305, title: "مدينة لو بولي", category: "تصاميم 3D",
    prompt: "Low poly cyberpunk city, flying cars, neon billboards, night time, isometric view, game asset style, vibrant colors --v 6.0",
    tags: ["LowPoly", "City", "Game"], color: "from-purple-600 to-blue-600"
  },
  {
    id: 306, title: "حلوى لامعة", category: "تصاميم 3D",
    prompt: "Glossy jelly candies, sugar coating, translucent, gummy texture, heap of sweets, bright pop colors, macro 3d render --v 6.0",
    tags: ["Food", "Candy", "Colorful"], color: "from-pink-500 to-yellow-400"
  },
  {
    id: 307, title: "جزيرة عائمة", category: "تصاميم 3D",
    prompt: "Fantasy floating island with a waterfall, low poly style, clouds, magical tree, vibrant green and blue, dreamlike atmosphere --v 6.0",
    tags: ["Fantasy", "Landscape", "Magic"], color: "from-green-400 to-blue-400"
  },
  {
    id: 308, title: "أنابيب نيون", category: "تصاميم 3D",
    prompt: "Tangled neon glowing tubes, dark background, reflective floor, abstract composition, synthwave aesthetic, blue and magenta --v 6.0",
    tags: ["Neon", "Abstract", "Synthwave"], color: "from-blue-500 to-pink-500"
  },
  {
    id: 309, title: "لعبة خشبية", category: "تصاميم 3D",
    prompt: "Wooden toy robot, realistic wood grain texture, scratches, vintage feel, studio lighting, depth of field, closeup --v 6.0",
    tags: ["Wood", "Toy", "Vintage"], color: "from-orange-800 to-yellow-800"
  },
  {
    id: 310, title: "قلب سيبراني", category: "تصاميم 3D",
    prompt: "Mechanical heart, glowing circuits, metal plates, pumping, sci-fi medical concept, hyper-realistic 3d render, red lighting --v 6.0",
    tags: ["SciFi", "Tech", "Heart"], color: "from-red-600 to-gray-800"
  },
  {
    id: 311, title: "كهف كريستال", category: "تصاميم 3D",
    prompt: "Underground cave filled with glowing crystals, purple and blue bioluminescence, water reflection, mysterious atmosphere, unreal engine 5 --v 6.0",
    tags: ["Environment", "Crystal", "Cave"], color: "from-purple-700 to-blue-700"
  },
  {
    id: 312, title: "حذاء سنيكرز", category: "تصاميم 3D",
    prompt: "Futuristic sneaker design floating, deconstructed parts, mesh and leather textures, dynamic angle, product visualization, clean background --v 6.0",
    tags: ["Product", "Fashion", "Shoe"], color: "from-orange-500 to-gray-500"
  },
  {
    id: 313, title: "نص بالون", category: "تصاميم 3D",
    prompt: "Inflatable balloon text saying 'SUMMER', glossy pink foil texture, floating, blue sky background, joyful vibe, 3d typography --v 6.0",
    tags: ["Typography", "Balloon", "Fun"], color: "from-pink-500 to-blue-300"
  },
  {
    id: 314, title: "منزل مصغر", category: "تصاميم 3D",
    prompt: "Cutaway view of a tiny cozy house inside a glass jar, miniature furniture, warm lighting, detailed plants, magical realism --v 6.0",
    tags: ["Miniature", "Cozy", "House"], color: "from-green-600 to-yellow-600"
  },
  {
    id: 315, title: "فيروس مجرد", category: "تصاميم 3D",
    prompt: "Abstract representation of a virus cell, spikes, subsurface scattering, depth of field, medical illustration style, green and red --v 6.0",
    tags: ["Science", "Micro", "Abstract"], color: "from-green-500 to-red-500"
  },

  // --- أنيمي (Anime) ---
  {
    id: 401, title: "فتاة السايبر بانك", category: "أنيمي",
    prompt: "Anime girl with cybernetic implants, neon city background, glowing headphones, rain, reflective jacket, detailed eyes, makoto shinkai style --niji 6",
    tags: ["Cyberpunk", "Girl", "SciFi"], color: "from-pink-500 to-purple-600"
  },
  {
    id: 402, title: "محارب الساموراي", category: "أنيمي",
    prompt: "Epic samurai standing in a field of red spider lilies, blood moon, katakana sword drawn, traditional japanese clothes, intense expression, ufotable style --niji 6",
    tags: ["Samurai", "Action", "Japan"], color: "from-red-700 to-black"
  },
  {
    id: 403, title: "سطح المدرسة", category: "أنيمي",
    prompt: "Slice of life anime scene, students eating lunch on school rooftop, blue sky with cumulus clouds, fence, city view below, kyoto animation style --niji 6",
    tags: ["SliceOfLife", "School", "Peaceful"], color: "from-blue-400 to-white"
  },
  {
    id: 404, title: "فتاة ساحرة", category: "أنيمي",
    prompt: "Magical girl transformation sequence, sparkling ribbons, floating accessories, starry background, vibrant pink and gold, dynamic pose, 90s anime aesthetic --niji 6",
    tags: ["Magic", "Retro", "Shojo"], color: "from-pink-400 to-yellow-400"
  },
  {
    id: 405, title: "ميكا روبوت", category: "أنيمي",
    prompt: "Giant mecha robot in a hangar, mechanics working, sparks flying, detailed metal plating, scale perspective, gundam style, dramatic lighting --niji 6",
    tags: ["Mecha", "Robot", "SciFi"], color: "from-gray-600 to-blue-600"
  },
  {
    id: 406, title: "طعام جيبلي", category: "أنيمي",
    prompt: "Delicious looking ramen bowl, steam rising, glistening broth, chopsticks, cozy wooden table, studio ghibli food art style, high detail --niji 6",
    tags: ["Food", "Ghibli", "Cozy"], color: "from-orange-400 to-yellow-500"
  },
  {
    id: 407, title: "غرفة لوفاي", category: "أنيمي",
    prompt: "Lofi hip hop girl studying in messy room, rain on window, cat sleeping, desk lamp, night time, cozy vibe, relaxing atmosphere --niji 6",
    tags: ["Lofi", "Chill", "Room"], color: "from-purple-800 to-blue-800"
  },
  {
    id: 408, title: "قزم خيالي", category: "أنيمي",
    prompt: "Elf archer in a fantasy forest, glowing bow, long blonde hair, detailed leaf armor, sunlight filtering through trees, fantasy anime style --niji 6",
    tags: ["Fantasy", "Elf", "Nature"], color: "from-green-500 to-yellow-300"
  },
  {
    id: 409, title: "قاتل الشياطين", category: "أنيمي",
    prompt: "Demon slayer using water breathing technique, water dragon effect, dynamic sword slash, traditional patterns on clothes, action shot --niji 6",
    tags: ["Action", "Water", "Battle"], color: "from-blue-600 to-cyan-400"
  },
  {
    id: 410, title: "أنيمي ريترو 90s", category: "أنيمي",
    prompt: "Retro 90s anime screenshot, vaporwave aesthetic, city sunset, old car, vhs glitch effect, pastel colors, nostalgic vibe --niji 6",
    tags: ["Retro", "Vaporwave", "90s"], color: "from-pink-400 to-purple-400"
  },
  {
    id: 411, title: "منظر مائي", category: "أنيمي",
    prompt: "Watercolor anime landscape, train crossing the ocean on rails, spirited away vibe, reflection in water, soft clouds, peaceful --niji 6",
    tags: ["Landscape", "Watercolor", "Train"], color: "from-blue-300 to-cyan-200"
  },
  {
    id: 412, title: "ساحر الظلام", category: "أنيمي",
    prompt: "Dark wizard casting forbidden magic, purple flames, hood covering face, glowing eyes, dark fantasy setting, intense aura --niji 6",
    tags: ["Dark", "Magic", "Fantasy"], color: "from-purple-900 to-black"
  },
  {
    id: 413, title: "سباق سيارات", category: "أنيمي",
    prompt: "Drifting car on mountain pass, anime style initial d vibe, motion lines, tire smoke, night time, eurobeat intensity --niji 6",
    tags: ["Car", "Drift", "Racing"], color: "from-red-600 to-gray-700"
  },
  {
    id: 414, title: "أميرة الفضاء", category: "أنيمي",
    prompt: "Space princess looking out a spaceship window, stars and nebula outside, futuristic dress, sad expression, sci-fi anime drama --niji 6",
    tags: ["Space", "Princess", "SciFi"], color: "from-blue-800 to-pink-300"
  },
  {
    id: 415, title: "تشيبي لطيف", category: "أنيمي",
    prompt: "Chibi style characters having a tea party, big heads, small bodies, pastel colors, cake, cute animals, kawaii aesthetic --niji 6",
    tags: ["Chibi", "Kawaii", "Cute"], color: "from-pink-300 to-yellow-200"
  },

  // --- شعارات (Logos) ---
  {
    id: 501, title: "ثعلب مينيمالي", category: "شعارات",
    prompt: "Minimalist logo of a fox head, geometric shapes, orange and white, flat design, vector art, white background, clean lines --v 6.0",
    tags: ["Minimalist", "Animal", "Orange"], color: "from-orange-500 to-red-500"
  },
  {
    id: 502, title: "قهوة لاين آرت", category: "شعارات",
    prompt: "Continuous line art logo of a steaming coffee cup, elegant, simple, black line on white background, sophisticated branding --v 6.0",
    tags: ["LineArt", "Coffee", "Elegant"], color: "from-gray-800 to-black"
  },
  {
    id: 503, title: "سداسي تقني", category: "شعارات",
    prompt: "Tech logo, hexagon shape with circuit board lines inside, gradient blue and purple, modern, futuristic, app icon style --v 6.0",
    tags: ["Tech", "Modern", "Gradient"], color: "from-blue-600 to-purple-600"
  },
  {
    id: 504, title: "ورقة عضوية", category: "شعارات",
    prompt: "Organic logo design, green leaf forming a water drop, eco-friendly concept, soft gradients, fresh look, vector illustration --v 6.0",
    tags: ["Nature", "Eco", "Green"], color: "from-green-500 to-emerald-600"
  },
  {
    id: 505, title: "دب مساحة سلبية", category: "شعارات",
    prompt: "Negative space logo, silhouette of a bear with a mountain landscape inside, clever design, black and white, outdoor brand --v 6.0",
    tags: ["NegativeSpace", "Bear", "Outdoor"], color: "from-gray-700 to-black"
  },
  {
    id: 506, title: "حرف A متدرج", category: "شعارات",
    prompt: "Letter mark logo for 'A', colorful fluid gradient, 3d glossy finish, modern typography, creative agency branding --v 6.0",
    tags: ["Typography", "Letter", "3D"], color: "from-pink-500 to-orange-500"
  },
  {
    id: 507, title: "درع حماية", category: "شعارات",
    prompt: "Security logo, shield shape with a lock hole, blue and silver, strong, trustworthy, flat vector design --v 6.0",
    tags: ["Security", "Shield", "Blue"], color: "from-blue-700 to-gray-400"
  },
  {
    id: 508, title: "برجر فلات", category: "شعارات",
    prompt: "Flat design icon of a burger, delicious colors, simplified shapes, food delivery app logo, rounded corners --v 6.0",
    tags: ["Food", "Flat", "Icon"], color: "from-orange-400 to-yellow-500"
  },
  {
    id: 509, title: "صاروخ بسيط", category: "شعارات",
    prompt: "Simple rocket logo launching, upward trajectory, startup concept, red and grey, minimal, clean vector --v 6.0",
    tags: ["Startup", "Rocket", "Simple"], color: "from-red-600 to-gray-500"
  },
  {
    id: 510, title: "دائرة الدماغ", category: "شعارات",
    prompt: "Artificial intelligence logo, human brain formed by digital nodes and lines, glowing dots, tech blue background, modern --v 6.0",
    tags: ["AI", "Brain", "Tech"], color: "from-cyan-500 to-blue-700"
  },
  {
    id: 511, title: "تاج ذهبي", category: "شعارات",
    prompt: "Luxury brand logo, golden crown, serif typography, elegant, premium feel, black background, gold foil texture --v 6.0",
    tags: ["Luxury", "Gold", "Royal"], color: "from-yellow-600 to-yellow-400"
  },
  {
    id: 512, title: "بومة تعليمية", category: "شعارات",
    prompt: "Education logo, wise owl wearing glasses, book shape, blue and yellow, academic, friendly mascot style --v 6.0",
    tags: ["Education", "Owl", "Mascot"], color: "from-blue-500 to-yellow-400"
  },
  {
    id: 513, title: "عقارات منزل", category: "شعارات",
    prompt: "Real estate logo, house roof combined with a key, modern lines, trustworthy blue, corporate identity --v 6.0",
    tags: ["RealEstate", "House", "Business"], color: "from-blue-600 to-gray-600"
  },
  {
    id: 514, title: "كاميرا شاتر", category: "شعارات",
    prompt: "Photography logo, camera shutter aperture lens, colorful segments, creative, media studio branding --v 6.0",
    tags: ["Photography", "Camera", "Creative"], color: "from-purple-500 to-pink-500"
  },
  {
    id: 515, title: "طائر الفينيق", category: "شعارات",
    prompt: "Phoenix logo rising from flames, abstract wings, vibrant orange and red gradients, symbol of rebirth, dynamic shape --v 6.0",
    tags: ["Abstract", "Fire", "Bird"], color: "from-red-500 to-orange-400"
  }
];

const CATEGORIES = [
  { id: 'all', name: 'الكل', icon: Layers },
  { id: 'أبطال خارقين', name: 'أبطال خارقين', icon: Shield }, // القسم الجديد
  { id: 'تصوير واقعي', name: 'تصوير واقعي', icon: Aperture },
  { id: 'تصاميم 3D', name: 'تصاميم 3D', icon: Cpu },
  { id: 'أنيمي', name: 'أنيمي', icon: Zap },
  { id: 'شعارات', name: 'شعارات', icon: PenTool },
];

const SOCIAL_LINKS = [
  { id: 'web', Icon: Globe, url: 'https://link.gettap.co/samcodesing', label: 'الموقع الرسمي' },
  { id: 'insta', Icon: Instagram, url: 'https://www.instagram.com/samco_design/', label: 'انستجرام' },
  { id: 'x', Icon: XIcon, url: 'https://x.com/Designer_Samco', label: 'X (تويتر سابقاً)' },
  { id: 'youtube', Icon: Youtube, url: 'https://www.youtube.com/@samco-desing', label: 'يوتيوب' },
  { id: 'linkedin', Icon: Linkedin, url: 'https://linkedin.com/in/samcodesing', label: 'لينكد إن' },
  { id: 'tiktok', Icon: TikTokIcon, url: 'https://www.tiktok.com/@samco_designer', label: 'تيك توك' },
];

// --- المكونات الفرعية ---

const GlassButton = ({ children, onClick, active, disabled, className = "", theme }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`
      relative overflow-hidden group px-4 py-2 transition-all duration-300
      ${theme.shapes.radius} 
      ${theme.shapes.buttonStyle}
      ${active 
        ? `${theme.colors.accentBg} text-black ${theme.shapes.borderWidth === 'border-2' ? 'border-black' : ''}` 
        : `${theme.colors.glass} ${theme.colors.text} hover:${theme.colors.accentBg}/10 hover:${theme.colors.accent}`}
      ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
      ${className}
    `}
  >
    <span className="relative z-10 flex items-center justify-center gap-2">
      {children}
    </span>
    {!disabled && active && (
       <div className="absolute inset-0 bg-white/20 animate-pulse" />
    )}
  </button>
);

const PromptCard = ({ item, onOpen, isFav, toggleFav, theme }) => (
  <div 
    onClick={() => onOpen(item)}
    className={`
      group relative cursor-pointer overflow-hidden transition-all duration-300
      ${theme.colors.cardBg}
      ${theme.shapes.radius}
      ${theme.shapes.borderWidth}
      ${theme.colors.border}
      ${theme.shapes.cardStyle}
    `}
  >
    {theme.shapes.radius !== 'rounded-3xl' && (
       <div className={`absolute top-0 right-0 bottom-0 w-1 bg-gradient-to-b ${item.color} opacity-70 group-hover:opacity-100 transition-opacity`} />
    )}
    
    <div className="p-5 flex flex-col h-full relative z-10">
      <div className="flex justify-between items-start mb-3">
        <span className={`text-xs font-bold px-2 py-1 ${theme.shapes.radius} ${theme.colors.glass} ${theme.colors.text} opacity-80`}>
          {item.category}
        </span>
        <button 
          onClick={(e) => { e.stopPropagation(); toggleFav(item.id); }}
          className={`p-2 transition-all ${theme.shapes.radius} ${isFav ? `${theme.colors.accent} ${theme.colors.accentBg}/10` : 'text-gray-500 hover:text-gray-300'}`}
        >
          <Star size={18} fill={isFav ? "currentColor" : "none"} />
        </button>
      </div>
      
      <h3 className={`text-lg font-bold mb-2 leading-tight group-hover:${theme.colors.accent} transition-colors ${theme.colors.text}`}>
        {item.title}
      </h3>
      
      <p className={`text-sm line-clamp-2 mb-4 font-mono dir-ltr text-left opacity-60 group-hover:opacity-100 transition-opacity ${theme.colors.text}`}>
        {item.prompt}
      </p>

      <div className={`mt-auto flex justify-between items-center pt-3 ${theme.shapes.borderWidth === 'border-0' ? 'border-t border-white/5' : `border-t ${theme.colors.border}`}`}>
        <div className="flex gap-2">
           {item.tags.slice(0, 2).map((tag, idx) => (
             <span key={idx} className="text-[10px] opacity-50">#{tag}</span>
           ))}
        </div>
        <div className={`group-hover:${theme.colors.accent} transition-all transform translate-x-2 group-hover:translate-x-0 flex items-center gap-1 text-xs opacity-0 group-hover:opacity-100`}>
          عرض <Info size={14} />
        </div>
      </div>
    </div>
  </div>
);

const DetailModal = ({ item, onClose, isFav, toggleFav, theme }) => {
  const [copied, setCopied] = useState(false);
  const [generated916, setGenerated916] = useState(false);
  const [displayPrompt, setDisplayPrompt] = useState(item.prompt);

  useEffect(() => {
    setDisplayPrompt(item.prompt);
    setGenerated916(false);
  }, [item]);

  const handleCopy = () => {
    navigator.clipboard.writeText(displayPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleGenerate916 = () => {
    const suffix = " --ar 9:16 --style raw --s 250";
    if (!displayPrompt.includes("9:16")) {
        setDisplayPrompt(prev => prev + suffix);
        setGenerated916(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <div className={`relative w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in duration-200 ${theme.colors.bg} ${theme.shapes.radius} ${theme.shapes.borderWidth} ${theme.colors.border}`}>
        
        <div className={`h-32 bg-gradient-to-r ${item.color || 'from-gray-700 to-gray-900'} relative`}>
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute bottom-0 right-0 p-6">
            <h2 className="text-3xl font-bold text-white mb-1">{item.title}</h2>
            <span className={`text-sm px-2 py-1 backdrop-blur-md bg-black/30 text-white/80 ${theme.shapes.radius}`}>
              {item.category}
            </span>
          </div>
          <button onClick={onClose} className={`absolute top-4 left-4 p-2 bg-black/30 text-white hover:bg-black/50 transition-colors ${theme.shapes.radius}`}>
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          <div className={`bg-black/20 p-4 mb-6 relative group ${theme.shapes.radius} ${theme.shapes.borderWidth} ${theme.colors.border}`}>
            <p className={`font-mono text-sm leading-relaxed text-left dir-ltr whitespace-pre-wrap ${theme.colors.text}`}>
              {displayPrompt}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <GlassButton onClick={handleCopy} active={copied} theme={theme} className="flex-1">
              {copied ? <Check size={18} /> : <Copy size={18} />}
              {copied ? "تم النسخ" : "نسخ البرومبت"}
            </GlassButton>
            <GlassButton onClick={handleGenerate916} active={generated916} theme={theme} className="flex-1">
              <Smartphone size={18} />
              {generated916 ? "9:16 جاهز" : "تحويل 9:16"}
            </GlassButton>
            <GlassButton onClick={() => toggleFav(item.id)} active={isFav} theme={theme} className="w-12 px-0 flex items-center justify-center">
              <Star size={18} fill={isFav ? "currentColor" : "none"} />
            </GlassButton>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- مولد البرومبت الذكي مع اختيار الأبعاد ---
const AIGeneratorView = ({ theme }) => {
  const [input, setInput] = useState('');
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [selectedRatio, setSelectedRatio] = useState('16:9'); // الافتراضي

  const generateAIPrompt = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setGeneratedPrompt('');
    try {
      const apiKey = import.meta.env.VITE_GEMINI_KEY || "";
      const userQuery = `
        Act as a professional prompt engineer for Midjourney.
        Input Concept: "${input}"
        Target Aspect Ratio: ${selectedRatio}
        
        Task: Create a highly detailed, creative, and professional English prompt based on the input.
        Ensure the composition fits the aspect ratio (e.g., wide angle for 16:9, portrait for 9:16).
        IMPORTANT: Append " --ar ${selectedRatio}" at the very end of the prompt string.
        
        Output ONLY the prompt text string.
      `;
      
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: userQuery }] }] })
      });
      const data = await response.json();
      if (data.candidates?.[0]?.content) {
        setGeneratedPrompt(data.candidates[0].content.parts[0].text);
      }
    } catch (error) {
      console.error(error);
      setGeneratedPrompt("حدث خطأ في الاتصال. يرجى المحاولة مرة أخرى.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className={`p-1 overflow-hidden relative shadow-2xl ${theme.colors.cardBg} ${theme.shapes.radius} ${theme.shapes.borderWidth} ${theme.colors.border}`}>
        <div className={`absolute inset-0 bg-gradient-to-br ${theme.colors.gradient} opacity-5 pointer-events-none`} />
        
        <div className="p-6 md:p-8 relative z-10">
          <div className="text-center mb-8">
            <div className={`inline-flex items-center justify-center p-3 mb-4 ${theme.colors.accentBg}/10 ${theme.colors.accent} ${theme.shapes.radius}`}>
              <Sparkles size={32} />
            </div>
            <h2 className={`text-3xl font-black mb-2 ${theme.colors.text}`}>مولد البرومبت الذكي</h2>
            <p className={`text-sm opacity-60 ${theme.colors.text}`}>حول أفكارك إلى فن بصري مع اختيار الأبعاد المناسبة</p>
          </div>

          <div className="space-y-6">
            <div className="relative group">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="صف خيالك بكلمة (عربي/إنجليزي)..."
                className={`w-full bg-white/5 px-4 py-4 pr-12 text-lg focus:outline-none transition-all ${theme.colors.text} ${theme.shapes.radius} ${theme.shapes.borderWidth} ${theme.colors.border} focus:${theme.colors.border}`}
                onKeyDown={(e) => e.key === 'Enter' && generateAIPrompt()}
              />
              <PenTool className={`absolute left-4 top-1/2 -translate-y-1/2 opacity-50 group-focus-within:opacity-100 transition-opacity ${theme.colors.text}`} size={20} />
            </div>

            <div>
              <div className={`text-xs font-bold mb-3 opacity-70 ${theme.colors.text}`}>اختر مقاس الصورة:</div>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {ASPECT_RATIOS.map((ratio) => (
                  <button
                    key={ratio.id}
                    onClick={() => setSelectedRatio(ratio.id)}
                    className={`
                      flex flex-col items-center justify-center gap-2 p-2 h-24 transition-all duration-300 relative overflow-hidden group
                      ${theme.shapes.radius}
                      ${selectedRatio === ratio.id 
                        ? `${theme.colors.accentBg} text-black font-bold shadow-lg scale-105` 
                        : `bg-white/5 ${theme.colors.text} hover:bg-white/10`}
                    `}
                  >
                    <div 
                      className={`border-2 transition-all ${selectedRatio === ratio.id ? 'border-black' : 'border-current opacity-40 group-hover:opacity-80'}`}
                      style={{ width: ratio.w, height: ratio.h }}
                    />
                    <div className="text-[10px] text-center leading-tight">
                      <div>{ratio.id}</div>
                      <div className={`text-[8px] opacity-70 ${selectedRatio === ratio.id ? 'text-black' : ''}`}>{ratio.label}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={generateAIPrompt}
              disabled={loading || !input.trim()}
              className={`
                w-full py-4 font-bold text-lg flex items-center justify-center gap-2 transition-all duration-300
                ${theme.shapes.radius}
                ${loading || !input.trim() 
                  ? 'bg-gray-800 text-gray-500 cursor-not-allowed' 
                  : `bg-gradient-to-r ${theme.colors.gradient} text-white hover:shadow-lg hover:scale-[1.01]`}
              `}
            >
              {loading ? <Loader2 className="animate-spin" size={24} /> : <Wand2 size={24} />}
              {loading ? "جاري التوليد..." : "توليد سحري"}
            </button>
          </div>

          {generatedPrompt && (
            <div className="mt-8 animate-in fade-in zoom-in duration-300">
              <div className={`bg-black/30 p-4 relative group ${theme.shapes.radius} ${theme.shapes.borderWidth} ${theme.colors.border}`}>
                <div className={`absolute top-0 right-0 p-1 px-2 text-[10px] bg-black/50 ${theme.shapes.radius} rounded-bl-lg rounded-tr-none text-gray-400`}>
                  {selectedRatio}
                </div>
                <p className={`font-mono text-sm leading-relaxed text-left dir-ltr whitespace-pre-wrap pt-4 ${theme.colors.text}`}>
                  {generatedPrompt}
                </p>
                <button 
                     onClick={() => {navigator.clipboard.writeText(generatedPrompt); setCopied(true); setTimeout(()=>setCopied(false),2000)}}
                     className={`absolute bottom-2 right-2 p-2 rounded-lg hover:bg-white/10 transition-colors ${theme.colors.text}`}
                     title="نسخ"
                >
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// --- التطبيق الرئيسي ---
export default function SamcoApp() {
  const [view, setView] = useState('home'); 
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [selectedPrompt, setSelectedPrompt] = useState(null);
  
  const [currentThemeId, setCurrentThemeId] = useState('gold');
  const [showThemeMenu, setShowThemeMenu] = useState(false);

  const theme = THEMES[currentThemeId];

  useEffect(() => {
    const saved = localStorage.getItem('samco_favs');
    if (saved) setFavorites(JSON.parse(saved));
    const savedTheme = localStorage.getItem('samco_theme');
    if (savedTheme && THEMES[savedTheme]) setCurrentThemeId(savedTheme);
  }, []);

  useEffect(() => {
    localStorage.setItem('samco_favs', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('samco_theme', currentThemeId);
  }, [currentThemeId]);

  const toggleFav = (id) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fid => fid !== id) : [...prev, id]
    );
  };

  const filteredPrompts = useMemo(() => {
    let data = INITIAL_DATA;
    if (view === 'favorites') {
      data = data.filter(item => favorites.includes(item.id));
    } else if (activeCategory !== 'all' && view === 'home') {
      data = data.filter(item => item.category === activeCategory);
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      data = data.filter(item => 
        item.title.toLowerCase().includes(q) || item.prompt.toLowerCase().includes(q)
      );
    }
    return data;
  }, [view, activeCategory, searchQuery, favorites]);

  return (
    <div className={`min-h-screen font-sans transition-colors duration-500 overflow-hidden relative selection:bg-white/20`} 
         style={{ backgroundColor: theme.colors.bg }}
         dir="rtl">
      
      {theme.bgPattern}
      
      <div className="relative z-10 max-w-5xl mx-auto px-4 pb-24 pt-6">
        
        {/* الهيدر */}
        <header className="flex flex-col md:flex-row justify-between items-center mb-8 gap-6">
          <div className="text-center md:text-right cursor-pointer group" onClick={() => setView('home')}>
             <h1 className={`text-4xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r ${theme.colors.gradient} drop-shadow-sm transition-all duration-500`}>
               SAMCO <span className={theme.colors.text}>VAULT</span>
             </h1>
             <div className={`h-1 w-0 group-hover:w-full transition-all duration-500 bg-gradient-to-r ${theme.colors.gradient}`} />
          </div>

          <div className="flex flex-col gap-4 w-full md:w-auto">
            <div className="flex items-center gap-3 w-full">
              <div className="relative">
                <button 
                  onClick={() => setShowThemeMenu(!showThemeMenu)}
                  className={`p-3 transition-colors ${theme.colors.glass} ${theme.colors.text} ${theme.shapes.radius} hover:${theme.colors.accent}`}
                >
                  <Palette size={20} />
                </button>
                
                {showThemeMenu && (
                  <div className={`absolute top-full left-0 mt-2 p-3 flex flex-col gap-2 shadow-xl z-50 animate-in fade-in zoom-in duration-200 min-w-[150px] ${theme.colors.glass} ${theme.shapes.radius}`}>
                    {Object.values(THEMES).map(t => (
                      <button
                        key={t.id}
                        onClick={() => { setCurrentThemeId(t.id); setShowThemeMenu(false); }}
                        className={`flex items-center gap-3 w-full p-2 hover:bg-white/10 ${theme.shapes.radius} transition-colors`}
                      >
                        <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${t.colors.gradient}`} />
                        <span className={`text-sm ${theme.colors.text}`}>{t.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="relative flex-1 md:w-96 group">
                <input 
                  type="text" 
                  placeholder="ابحث..." 
                  value={searchQuery}
                  onChange={(e) => { setSearchQuery(e.target.value); if(view !== 'home' && view !== 'favorites') setView('home'); }}
                  className={`w-full px-12 py-3 text-sm focus:outline-none transition-all shadow-inner ${theme.colors.glass} ${theme.colors.text} ${theme.shapes.radius} ${theme.shapes.borderWidth} ${theme.colors.border}`}
                />
                <Search className={`absolute right-4 top-3.5 opacity-50 group-focus-within:opacity-100 ${theme.colors.text}`} size={18} />
              </div>
            </div>

            <div className="flex items-center justify-center md:justify-end gap-3 px-2">
              {SOCIAL_LINKS.map((link) => {
                const Icon = link.Icon;
                return (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={link.label}
                    className={`
                      p-3 relative group overflow-hidden transition-all duration-500
                      ${theme.colors.glass} ${theme.colors.text} ${theme.shapes.radius}
                      hover:scale-110 hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]
                      hover:${theme.colors.accent} hover:border-${theme.colors.accentBg}
                    `}
                  >
                    <Icon size={18} className="relative z-10" />
                    <div className={`absolute inset-0 bg-gradient-to-t ${theme.colors.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300`} />
                  </a>
                );
              })}
            </div>
          </div>
        </header>

        {view === 'home' && (
          <>
            <div 
              onClick={() => setView('generator')}
              className={`
                mb-8 relative overflow-hidden cursor-pointer group transition-all duration-500
                bg-gradient-to-r ${theme.colors.gradient}
                ${theme.shapes.radius}
                ${theme.shapes.cardStyle}
              `}
            >
              <div className="absolute inset-0 bg-black/60 group-hover:bg-black/50 transition-colors" />
              <div className="relative p-6 flex items-center justify-between">
                 <div className="flex items-center gap-4">
                   <div className={`p-3 bg-white/10 text-white backdrop-blur-sm ${theme.shapes.radius}`}>
                     <Wand2 size={24} />
                   </div>
                   <div>
                     <h3 className="text-xl font-bold text-white mb-1">صمم برومبتك الخاص</h3>
                     <p className="text-gray-300 text-sm">استخدم الذكاء الاصطناعي لتحويل أفكارك.</p>
                   </div>
                 </div>
                 <div className={`hidden md:flex items-center gap-2 bg-white/20 px-4 py-2 text-white text-sm font-bold backdrop-blur-md transition-all ${theme.shapes.radius}`}>
                    جرب الآن <Sparkles size={16} />
                 </div>
              </div>
            </div>

            <div className="flex gap-3 overflow-x-auto pb-4 mb-6 scrollbar-hide">
              {CATEGORIES.map(cat => {
                 const Icon = cat.icon;
                 return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`
                      flex items-center gap-2 px-5 py-2 whitespace-nowrap transition-all text-sm font-medium border
                      ${theme.shapes.radius}
                      ${activeCategory === cat.id 
                        ? `${theme.colors.accentBg} text-white border-transparent` 
                        : `${theme.colors.glass} ${theme.colors.text} border-transparent hover:bg-white/10`}
                    `}
                  >
                    <Icon size={14} />
                    {cat.name}
                  </button>
              )})}
            </div>
          </>
        )}

        <main className="animate-in fade-in slide-in-from-bottom-4 duration-500 min-h-[50vh]">
          {view === 'generator' ? (
            <AIGeneratorView theme={theme} />
          ) : view === 'about' ? (
            <div className={`p-8 max-w-2xl mx-auto text-center relative overflow-hidden ${theme.colors.glass} ${theme.shapes.radius} ${theme.shapes.borderWidth} ${theme.colors.border}`}>
               <h2 className={`text-3xl font-bold mb-6 ${theme.colors.accent}`}>عن سامكو</h2>
               <p className={`leading-relaxed mb-6 ${theme.colors.text}`}>
                 خزنة سامكو هي وجهتك الأولى للحصول على برومبتات احترافية ومجربة.
               </p>
               
               <div className="flex justify-center gap-4 mt-8">
                 {SOCIAL_LINKS.map(link => {
                   const Icon = link.Icon;
                   return (
                     <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer" className={`p-3 hover:scale-110 transition-transform ${theme.colors.text} opacity-70 hover:opacity-100`}>
                       <Icon size={24} />
                     </a>
                   )
                 })}
               </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPrompts.map(item => (
                <PromptCard 
                  key={item.id} 
                  item={item} 
                  onOpen={setSelectedPrompt}
                  isFav={favorites.includes(item.id)}
                  toggleFav={toggleFav}
                  theme={theme}
                />
              ))}
            </div>
          )}
        </main>
      </div>

      <nav className={`fixed bottom-6 left-1/2 -translate-x-1/2 px-6 py-3 flex gap-8 shadow-2xl z-40 transition-all duration-300 ${theme.colors.glass} ${theme.shapes.radius} ${theme.shapes.borderWidth} ${theme.colors.border}`}>
        {[['home', Home, 'الرئيسية'], ['generator', Sparkles, 'AI'], ['favorites', Star, 'المفضلة'], ['about', Info, 'عن']].map(([v, Icon, label]) => (
          <button 
            key={v}
            onClick={() => setView(v)} 
            className={`flex flex-col items-center gap-1 transition-colors ${view === v ? theme.colors.accent : `text-gray-500 hover:${theme.colors.text}`}`}
          >
            <Icon size={20} fill={view === v && v === 'favorites' ? "currentColor" : "none"} />
            <span className="text-[10px] font-medium">{label}</span>
          </button>
        ))}
      </nav>

      {selectedPrompt && (
        <DetailModal 
          item={selectedPrompt} 
          onClose={() => setSelectedPrompt(null)}
          isFav={favorites.includes(selectedPrompt.id)}
          toggleFav={toggleFav}
          theme={theme}
        />
      )}
    </div>
  );
}