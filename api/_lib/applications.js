// Synced from docs/active-applications.md (gitignored).
// Server-only — never served to clients (lives under /api/, not the public root,
// and the _lib path doesn't register as a Vercel function route).
//
// THREE TIERS of tailoring (best-match wins):
//   1. APPLICATIONS    — active job applications. Strongest tailoring. Knows the role.
//   2. BESPOKE         — companies with hand-written talking points but no active app.
//   3. WATCHLIST       — companies you'd love to work with; uses category-level template.
//
// matchVisitor() returns the best match across all three tiers.
// buildVisitorContextBlock() builds the prompt-injection text for the matched tier.

// ─────────────────────────────────────────────────────────────────────────────
// TIER 1: ACTIVE APPLICATIONS
// ─────────────────────────────────────────────────────────────────────────────

export const APPLICATIONS = [
    {
        company: 'Cantina Labs',
        role: 'Head of Editorial',
        applied: '2026-04-15',
        expires: '2026-07-14',
        aliases: ['cantina labs', 'cantinalabs', 'cantina-labs', 'cantina labs inc'],
        roleFocus: ['editorial leadership', 'social media', 'AI-augmented content', 'brand voice'],
        pitchAngle:
            'Editorial leader who built scaled content engines (Rolling Stone, SPIN, Fuse TV) AND is now deep in AI through MIT — uniquely positioned to run editorial in 2026, where the through-line between voice and tooling matters as much as the words on the page.',
        emphasize: [
            'SPIN website/social/video buildout',
            'Fuse TV digital team scaling',
            'Front Row at Amazon Music',
            'Conductor + MIT AI program',
        ],
        openers: [
            'How would you scale editorial with AI in the loop?',
            'What does a great Head of Editorial role look like in 2026?',
            'Tell me about building social and editorial together',
        ],
        toneNote: 'Talk like a leader, not a journalist. Show the systems thinker.',
    },
    // Add new applications above this line — keep newest first.
];

// ─────────────────────────────────────────────────────────────────────────────
// CATEGORY TEMPLATES (used by tier 3 watchlist; can be reused by tier 2 entries)
// ─────────────────────────────────────────────────────────────────────────────

export const CATEGORIES = {
    'music-streaming': {
        space: 'music streaming, editorial curation, in-app discovery, retention through content',
        leadWith:
            'Amazon Music work — Front Row video/interview series, in-app content integration, 306% acquisition growth (team metric), social growth via editorial-led programming. Plus Rolling Stone/SPIN digital editorial roots.',
        openers: [
            'How would you grow music streaming through editorial?',
            'Tell me about Front Row at Amazon Music',
            'What works for in-app discovery in streaming?',
        ],
    },
    'music-creation-tools': {
        space: 'tools for musicians and creators — DAWs, AI music, sample libraries, distribution',
        leadWith:
            'Conductor (Billy\'s current SaaS for independent artists), MIT AI work, the fact that Billy actually plays (guitar, piano, drums, bass, keys) and has been producing demos in Suno Studio. Music-creation-tool brands respect builders who use the tools.',
        openers: [
            'What are you building with Conductor?',
            'How do AI music tools change how artists create?',
            'What\'s the future of tools for independent musicians?',
        ],
        toneNote: 'Lead with "you\'re actually a musician" — that\'s a real differentiator here.',
    },
    'music-labels-industry': {
        space: 'music labels, industry data, artist services, A&R, music business infrastructure',
        leadWith:
            'Music industry depth — Rolling Stone, SPIN, Billboard journalism roots, Amazon Music creative leadership across two stints, Kings of Leon creative direction (40M+ views WALLS trilogy with fan co-authoring), Ticketmaster reposition work. Plus current Conductor SaaS for independent artists.',
        openers: [
            'Tell me about your work with Kings of Leon',
            'What\'s changed about the music industry in 20 years?',
            'How do you build content that artists actually want?',
        ],
    },
    'streaming-video': {
        space: 'premium video, original programming, content marketing across global audiences',
        leadWith:
            'Fuse TV cross-platform work (digital ↔ linear schedule, content supporting on-air programming, TV ticker integration), Kings of Leon WALLS narrative trilogy (long-form story arc in streaming era), cultural fluency at scale.',
        openers: [
            'What does great show marketing look like in 2026?',
            'Tell me about long-form storytelling in the streaming era',
            'How do you build cultural moments around content?',
        ],
    },
    'social-platforms': {
        space: 'social platforms, creator economy, AI integration into social products',
        leadWith:
            'Amazon Music social growth (millions of followers via editorial-led programming), Fuse TV original franchises with artists, current AI work, take on creator economy.',
        openers: [
            'What\'s your take on the creator economy right now?',
            'How would you grow social at platform scale?',
            'Where does AI fit in social platforms?',
        ],
    },
    'creator-economy-tools': {
        space: 'tools that empower individual creators to publish, monetize, and grow audience',
        leadWith:
            'Conductor — the SaaS Billy is currently building for independent artists. Plus deep editorial / publishing background (Rolling Stone, SPIN, Fuse TV, Billboard) and brand-side creator-partnership work (Kings of Leon, Front Row).',
        openers: [
            'What are you building with Conductor?',
            'How do you make tools that creators actually adopt?',
            'What\'s missing in the creator-economy stack?',
        ],
    },
    'creative-tools': {
        space: 'creative software for design, video, audio, image — increasingly AI-augmented',
        leadWith:
            'AI work (MIT generative + agentic + AI product design certificates), Conductor, this very portfolio (built as an agentic system), plus content systems thinking (Front Row, in-app content, Fuse TV multi-platform).',
        openers: [
            'How will AI reshape creative workflows?',
            'Tell me about Conductor',
            'What\'s the future of tools for creators?',
        ],
    },
    'ai-labs': {
        space: 'AI labs, model providers, applied AI products and research',
        leadWith:
            'MIT generative AI / agentic AI / AI product design certificates, currently in MIT\'s "Designing and Building AI Products and Services" course, Conductor SaaS, this very portfolio (a working agentic system Billy built himself).',
        openers: [
            'What are you building in AI right now?',
            'Tell me about Conductor — your AI-powered SaaS',
            'How does AI change content strategy?',
        ],
        toneNote: 'This site itself is the strongest proof — a working agent Billy built. Mention it organically.',
    },
    'productivity-saas': {
        space: 'productivity software, business tools, content infrastructure',
        leadWith:
            'AI / MIT work, content strategy as systems work (founded discipline at Amazon Devices), large-org cross-functional influence at Amazon and Ticketmaster/Live Nation, Amazon Global Brands consolidation work.',
        openers: [
            'How will AI change content workflows at scale?',
            'What\'s your approach to influence across large, multi-layered companies?',
            'Tell me about founding content strategy at Amazon Devices',
        ],
    },
    'tech-giant': {
        space: 'big tech — broad product portfolio across consumer and enterprise',
        leadWith:
            'Breadth — 20+ years across journalism, brand-side, product orgs, devices, music, services. Founded content strategy at Amazon Devices. Cross-functional influence inside large multi-layered companies. AI work via MIT and Conductor.',
        openers: [
            'How do you operate inside large companies like Amazon?',
            'What does content strategy look like at platform scale?',
            'Tell me about founding a discipline from scratch',
        ],
    },
    'outdoor-action-sports': {
        space: 'outdoor gear, action sports, lifestyle brands rooted in real activity',
        leadWith:
            'Personal: Billy is from Seattle, lives there now, backpacks the Cascades, swims alpine lakes, camps. The work travels — Jameson Irish Whiskey for cultural lifestyle brand-building, Fuse TV for youth-culture brand work, brand storytelling fluency built across categories.',
        openers: [
            'How would you build content for an outdoor brand?',
            'Tell me about your brand-side work outside music',
            'What makes a lifestyle brand actually feel authentic?',
        ],
        toneNote: 'Lead with the Pacific Northwest authenticity. Billy actually does this stuff — that\'s the differentiator.',
    },
    'athletic-brands': {
        space: 'athletic apparel and footwear — culture-driven brand work',
        leadWith:
            'Cultural fluency at scale (Ticketmaster reposition, Amazon Music), brand-side storytelling (Jameson Irish Whiskey, Fuse TV), youth-culture roots, plus lived experience in active categories (35+ years snowboarding, hiking, music).',
        openers: [
            'How would you build brand storytelling for an athletic brand?',
            'What\'s your take on cultural authenticity in 2026?',
            'Tell me about repositioning a brand through content',
        ],
    },
    'audio-hardware': {
        space: 'premium audio hardware, headphones, speakers, instruments',
        leadWith:
            'Amazon Devices content strategy founding (Echo, Alexa, Ring launches), music + audio expertise (Amazon Music, Rolling Stone, SPIN, Billboard), brand-storytelling fluency. Plus Billy\'s personal music-making (multiple instruments, indie/punk bands).',
        openers: [
            'How would you approach content for a premium audio brand?',
            'What did you learn from Amazon Devices launches?',
            'How does music expertise translate to audio hardware?',
        ],
    },
    'automotive-lifestyle': {
        space: 'mobility brands, lifestyle hardware, identity-driven consumer brands',
        leadWith:
            'Brand-side storytelling across spirits (Jameson Sine Metu / Black Barrel / Caskmates), entertainment (Fuse TV), and devices (Amazon Devices Earth Day campaign). Cultural-moment work that earned media without paying to force reach.',
        openers: [
            'How do you build a culture-first brand campaign?',
            'Tell me about the "Alexa, Let\'s Get Sustainable" campaign',
            'What works for identity-driven consumer brands?',
        ],
    },
    'beverage-lifestyle': {
        space: 'spirits, beverage, lifestyle brands rooted in cultural moments',
        leadWith:
            'Jameson Irish Whiskey — Creative Director for ~1 year. Led creative for Sine Metu, launched Black Barrel and Caskmates, built the Drinking Buddies program. Plus Amazon Music Live + F1 partnership ($6M EMV) for cultural-moment work.',
        openers: [
            'Tell me about your work at Jameson Irish Whiskey',
            'What makes a great cultural-moment campaign?',
            'How do you build a lifestyle brand authentically?',
        ],
    },
    'podcasts-audio': {
        space: 'podcast platforms, spoken audio, podcast tools',
        leadWith:
            'Editorial roots (Rolling Stone, SPIN, Billboard, Fuse TV) translate naturally to audio storytelling. Plus Amazon Devices Alexa work (multi-turn voice experiences). Music-industry depth for music-podcast crossover.',
        openers: [
            'How would you grow a podcast platform editorially?',
            'What translates from music journalism to podcasts?',
            'Tell me about your Alexa voice experience work',
        ],
    },
};

// ─────────────────────────────────────────────────────────────────────────────
// TIER 2: BESPOKE COMPANIES
// (Companies with hand-written talking points beyond category defaults.)
// ─────────────────────────────────────────────────────────────────────────────

export const BESPOKE = [
    {
        company: 'Apple',
        aliases: ['apple inc', 'apple computer'],
        space: 'consumer hardware + software ecosystem; deep brand storytelling',
        leadWith:
            'Amazon Devices content strategy founding (3-year buildout from scratch), the integrated "Alexa, Let\'s Get Sustainable" campaign across owned channels, ecosystem-level narrative work',
        openers: [
            'How would you approach content strategy across a device ecosystem?',
            'What did you learn founding content strategy at Amazon Devices?',
            'How do you build brand narratives that hold across hardware and software?',
        ],
        toneNote: 'Show product-org fluency. Apple respects builders.',
    },
    {
        company: 'Apple Music',
        aliases: ['apple inc'],
        space: 'music streaming, editorial curation, artist storytelling',
        leadWith:
            'Amazon Music work — Front Row video/interview series, in-app content integration, 306% acquisition growth (team metric), Rolling Stone/SPIN digital editorial roots',
        openers: [
            'How would you grow music streaming through editorial?',
            'Tell me about Front Row at Amazon Music',
            'What works for in-app discovery in streaming?',
        ],
    },
    {
        company: 'Apple TV',
        aliases: ['apple inc'],
        space: 'premium video / streaming, supporting marketing for original programming',
        leadWith:
            'Fuse TV cross-platform work (digital ↔ linear schedule, content supporting on-air programming, TV ticker integration), Kings of Leon WALLS narrative trilogy',
        openers: [
            'How would you build content around premium video programming?',
            'Tell me about your Fuse TV cross-platform work',
            'What does great show marketing look like in 2026?',
        ],
    },
    {
        company: 'Apple Services',
        aliases: ['apple inc'],
        space: 'subscriptions, services bundle, retention-driven content',
        leadWith:
            'Amazon Music in-app content integration as retention engine, "Prime Picks" 23M+ engagements, Overtime Elite 900K HVAs, content-as-product systems thinking',
        openers: [
            'How does content drive subscription retention?',
            'Tell me about content-as-product at Amazon Music',
            'What\'s your take on bundling content into services?',
        ],
    },
    {
        company: 'Apple Marcom',
        aliases: ['apple inc'],
        space: 'brand marketing communications across product launches',
        leadWith:
            'Amazon Devices "Alexa, Let\'s Get Sustainable" integrated comms (multi-channel native execution), Ticketmaster LOHO cultural reposition, Front Row brand storytelling',
        openers: [
            'What makes a great brand campaign in 2026?',
            'How do you run integrated comms across many channels?',
            'Tell me about repositioning a brand through content',
        ],
    },
    {
        company: 'Apple Podcasts',
        aliases: ['apple inc'],
        space: 'podcast platform within Apple Services',
        leadWith:
            'Editorial / journalism roots translate to spoken audio (Rolling Stone, SPIN, Billboard). Amazon Devices voice work (multi-turn Alexa experiences). Music-industry depth for music-podcast crossover.',
        openers: [
            'How would you grow a podcast platform editorially?',
            'What translates from music journalism to podcasts?',
            'Tell me about your Alexa voice work',
        ],
    },
    {
        company: 'Adobe',
        aliases: ['adobe inc', 'adobe systems'],
        space: 'creative tools + content cloud + AI for creators',
        leadWith:
            'Conductor (current SaaS for independent artists), MIT AI work, content systems thinking (Front Row, in-app content), the through-line of "tools that empower creators"',
        openers: [
            'How will AI reshape creative workflows?',
            'Tell me about Conductor — what are you building?',
            'What\'s the future of tools for independent creators?',
        ],
    },
    {
        company: 'Meta',
        aliases: ['meta platforms', 'facebook', 'instagram'],
        space: 'social platforms, creator economy, AI integration',
        leadWith:
            'Amazon Music social growth (millions of followers via editorial-led programming), Fuse TV original franchises with artists, current AI work, take on creator economy',
        openers: [
            'What\'s your take on the creator economy right now?',
            'How would you grow social at platform scale?',
            'Where does AI fit in social platforms?',
        ],
    },
    {
        company: 'Microsoft',
        aliases: ['microsoft corporation'],
        space: 'enterprise + consumer software, AI integration (Copilot)',
        leadWith:
            'AI / MIT work, content strategy as systems work (founded discipline at Amazon Devices), large-org cross-functional influence',
        openers: [
            'How will AI change content workflows in the enterprise?',
            'What\'s your approach to influence in large, multi-layered companies?',
            'Tell me about founding content strategy at Amazon Devices',
        ],
    },
    {
        company: 'Pinterest',
        aliases: ['pinterest inc'],
        space: 'visual discovery, creator economy, taste-driven content',
        leadWith:
            'Amazon Music in-app content as discovery engine, editorial-led social growth, taste-as-strategy, broad visual-arts sensibility',
        openers: [
            'How does editorial drive discovery at scale?',
            'What\'s your take on taste-led platforms?',
            'How do you build content that gets shared?',
        ],
    },
    {
        company: 'Bose',
        aliases: ['bose corporation'],
        space: 'premium audio hardware, aspirational brand storytelling',
        leadWith:
            'Amazon Devices content strategy founding (Echo, Alexa, Ring launches), music + audio expertise (Amazon Music, Rolling Stone, SPIN, Billboard), brand-storytelling fluency',
        openers: [
            'How would you approach content for a premium audio brand?',
            'What did you learn from Amazon Devices launches?',
            'How does music expertise translate to audio hardware?',
        ],
    },
    {
        company: 'Fender',
        aliases: ['fender musical instruments', 'fender inc'],
        space: 'instruments + Fender Play (learning subscription) + artist relationships',
        leadWith:
            'You actually play (guitar, piano, drums, bass, keys; were in indie/punk bands), Kings of Leon creative direction, Conductor (SaaS for independent artists), Amazon Music artist storytelling',
        openers: [
            'How would you build content for a brand serving musicians?',
            'Tell me about your work with artists at Amazon Music and Kings of Leon',
            'What does Conductor mean for independent musicians?',
        ],
        toneNote: 'Lead with the "you\'re a musician too" angle — Fender is one of the few brands where this is a real differentiator.',
    },
    {
        company: 'Netflix',
        aliases: ['netflix inc'],
        space: 'streaming, original programming, content marketing across global audiences',
        leadWith:
            'Fuse TV cross-platform work supporting on-air programming, Kings of Leon WALLS narrative trilogy (long-form story arc in streaming era), cultural fluency at scale',
        openers: [
            'What does great show marketing look like in 2026?',
            'Tell me about long-form storytelling in the streaming era',
            'How do you build cultural moments around content?',
        ],
    },
    {
        company: 'Live Nation',
        aliases: ['live nation entertainment', 'live nation inc'],
        space: 'live music + ticketing (parent of Ticketmaster)',
        leadWith:
            'Ticketmaster work — cultural reposition from transactional villain to advocate for live, LOHO (23% sentiment lift), City Guides driving last-minute sales, Touring Milestone Awards, $10M+ "Disney on Ice" article',
        openers: [
            'Tell me about repositioning Ticketmaster',
            'What did you learn about live music as a brand?',
            'How does editorial drive ticket sales?',
        ],
    },
    {
        company: 'CAA',
        aliases: ['creative artists agency', 'caa inc'],
        space: 'talent representation across music, film, TV, sports, brand partnerships',
        leadWith:
            'Artist-collaboration work (Kings of Leon WALLS trilogy with fan co-authoring, Front Row at Amazon Music, Ticketmaster Touring Milestone Awards), brand-side fluency for partnership-building, music-industry relationships',
        openers: [
            'Tell me about your artist collaboration work',
            'How do you build brand-meets-artist partnerships?',
            'What did Kings of Leon teach you about working with talent?',
        ],
    },
    {
        company: 'YouTube',
        aliases: ['youtube inc', 'google llc'],
        space: 'video platform, creator economy, music + entertainment programming',
        leadWith:
            'Fuse TV YouTube buildout (3M+ views/week, original artist franchises), Amazon Sustainability 20M+ views / 30% CTR, Kings of Leon WALLS trilogy (40M+ views), Amazon Music Live + F1 ($6M EMV)',
        openers: [
            'How would you build for a video platform at scale?',
            'Tell me about your YouTube buildout at Fuse TV',
            'How do you grow original franchises with artists?',
        ],
    },
    {
        company: 'Google Devices & Services',
        aliases: ['google llc', 'google inc'],
        space: 'consumer device ecosystem (Pixel, Nest), services integration',
        leadWith:
            'Amazon Devices content strategy founding (parallel role), the integrated "Alexa, Let\'s Get Sustainable" campaign, ecosystem narrative thinking',
        openers: [
            'How would you approach content for a device ecosystem?',
            'What did you learn founding content strategy at Amazon Devices?',
            'How do you build a story that holds across hardware and services?',
        ],
    },
    {
        company: 'Google Labs',
        aliases: ['google llc'],
        space: 'experimental AI products, generative AI tooling, R&D',
        leadWith:
            'MIT certificates (gen AI, agentic AI, AI product design), current "Designing and Building AI Products and Services" course, Conductor SaaS, this very portfolio (a working agentic system Billy built)',
        openers: [
            'What are you building in AI right now?',
            'Tell me about Conductor — your AI-powered SaaS',
            'How does AI change content strategy?',
        ],
        toneNote: 'This site itself is the strongest proof. Mention it organically.',
    },
    // Add new bespoke entries above this line.
];

// ─────────────────────────────────────────────────────────────────────────────
// TIER 3: WATCHLIST
// (Companies you'd love to work with — minimal entries that use category templates.)
// To upgrade an entry, move it to BESPOKE above and add full talking points.
// ─────────────────────────────────────────────────────────────────────────────

export const WATCHLIST = [
    // Music streaming
    { company: 'Spotify', aliases: ['spotify ab'], category: 'music-streaming' },
    { company: 'SoundCloud', aliases: ['soundcloud ltd'], category: 'music-streaming' },
    { company: 'SiriusXM/Pandora', aliases: ['sirius xm', 'siriusxm', 'pandora'], category: 'music-streaming' },
    { company: 'Audiomack', aliases: ['audiomack inc'], category: 'music-streaming' },
    { company: 'iHeartMedia', aliases: ['iheartmedia inc', 'iheartradio'], category: 'music-streaming' },

    // Music creation tools
    { company: 'Suno', aliases: ['suno inc'], category: 'music-creation-tools' },
    { company: 'Udio', aliases: ['udio inc'], category: 'music-creation-tools' },
    { company: 'AIVA', aliases: ['aiva technologies'], category: 'music-creation-tools' },
    { company: 'BandLab', aliases: ['bandlab technologies'], category: 'music-creation-tools' },
    { company: 'Splice', aliases: ['splice.com', 'splice inc'], category: 'music-creation-tools' },
    { company: 'LANDR', aliases: ['landr audio'], category: 'music-creation-tools' },
    { company: 'Endel', aliases: ['endel sound'], category: 'music-creation-tools' },
    { company: 'Loudly', aliases: ['loudly gmbh'], category: 'music-creation-tools' },
    { company: 'ElevenLabs', aliases: ['eleven labs', 'elevenlabs inc'], category: 'music-creation-tools' },

    // Music labels and industry
    { company: 'Sony Music', aliases: ['sony music entertainment', 'sony corporation'], category: 'music-labels-industry' },
    { company: 'Universal Music Group', aliases: ['umg', 'universal music'], category: 'music-labels-industry' },
    { company: 'Warner Music Group', aliases: ['wmg', 'warner music'], category: 'music-labels-industry' },
    { company: 'UnitedMasters', aliases: ['united masters'], category: 'music-labels-industry' },
    { company: 'Venice Music', aliases: ['venice music inc'], category: 'music-labels-industry' },
    { company: 'Chartmetric', aliases: ['chartmetric inc'], category: 'music-labels-industry' },
    { company: 'Viberate', aliases: ['viberate.com'], category: 'music-labels-industry' },
    { company: 'Ticketmaster', aliases: ['ticketmaster entertainment'], category: 'music-labels-industry' },

    // Streaming video
    { company: 'Disney/Disney+', aliases: ['walt disney', 'disney inc', 'disney plus'], category: 'streaming-video' },
    { company: 'Hulu', aliases: ['hulu llc'], category: 'streaming-video' },
    { company: 'Amazon Prime Video', aliases: ['amazon.com inc', 'amazon prime'], category: 'streaming-video' },
    { company: 'Roku', aliases: ['roku inc'], category: 'streaming-video' },
    { company: 'Paramount', aliases: ['paramount global', 'viacomcbs'], category: 'streaming-video' },
    { company: 'NBCUniversal', aliases: ['nbc universal', 'comcast'], category: 'streaming-video' },
    { company: 'Warner Bros Discovery', aliases: ['warner brothers', 'wbd'], category: 'streaming-video' },
    { company: 'BBC', aliases: ['british broadcasting corporation'], category: 'streaming-video' },
    { company: 'ESPN', aliases: ['espn inc', 'walt disney'], category: 'streaming-video' },

    // Social platforms
    { company: 'TikTok/ByteDance', aliases: ['tiktok inc', 'bytedance'], category: 'social-platforms' },
    { company: 'Snap', aliases: ['snap inc', 'snapchat'], category: 'social-platforms' },
    { company: 'Reddit', aliases: ['reddit inc'], category: 'social-platforms' },
    { company: 'Twitch', aliases: ['twitch interactive'], category: 'social-platforms' },
    { company: 'Discord', aliases: ['discord inc'], category: 'social-platforms' },
    { company: 'Substack', aliases: ['substack inc'], category: 'social-platforms' },
    { company: 'Beehiiv', aliases: ['beehiiv inc'], category: 'social-platforms' },

    // Creator-economy tools
    { company: 'Patreon', aliases: ['patreon inc'], category: 'creator-economy-tools' },
    { company: 'Gumroad', aliases: ['gumroad inc'], category: 'creator-economy-tools' },
    { company: 'Linktree', aliases: ['linktree pty'], category: 'creator-economy-tools' },
    { company: 'Stan.store', aliases: ['stan store', 'stan.store inc'], category: 'creator-economy-tools' },
    { company: 'Passes', aliases: ['passes inc'], category: 'creator-economy-tools' },
    { company: 'Ko-fi', aliases: ['ko-fi.com'], category: 'creator-economy-tools' },
    { company: 'Fourthwall', aliases: ['fourthwall inc'], category: 'creator-economy-tools' },
    { company: 'Hype.kit', aliases: ['hype kit', 'hypekit'], category: 'creator-economy-tools' },
    { company: 'Spotter Studio', aliases: ['spotter inc'], category: 'creator-economy-tools' },

    // Creative tools
    { company: 'Figma', aliases: ['figma inc'], category: 'creative-tools' },
    { company: 'Canva', aliases: ['canva pty'], category: 'creative-tools' },
    { company: 'Frame.io', aliases: ['frame io', 'adobe inc'], category: 'creative-tools' },
    { company: 'Descript', aliases: ['descript inc'], category: 'creative-tools' },
    { company: 'CapCut', aliases: ['bytedance', 'capcut inc'], category: 'creative-tools' },
    { company: 'Captions', aliases: ['captions ai', 'captions inc'], category: 'creative-tools' },
    { company: 'Opus Clip', aliases: ['opus clip inc', 'opus pro'], category: 'creative-tools' },
    { company: 'Runway', aliases: ['runway ml', 'runwayml'], category: 'creative-tools' },
    { company: 'Synthesia', aliases: ['synthesia ltd'], category: 'creative-tools' },
    { company: 'HeyGen', aliases: ['heygen inc'], category: 'creative-tools' },
    { company: 'D-ID', aliases: ['d-id ltd', 'did inc'], category: 'creative-tools' },
    { company: 'Midjourney', aliases: ['midjourney inc'], category: 'creative-tools' },
    { company: 'Pika', aliases: ['pika labs'], category: 'creative-tools' },
    { company: 'Castmagic', aliases: ['castmagic inc'], category: 'creative-tools' },

    // AI labs
    { company: 'Anthropic', aliases: ['anthropic pbc'], category: 'ai-labs' },
    { company: 'OpenAI', aliases: ['openai inc', 'openai llc'], category: 'ai-labs' },
    { company: 'Stability AI', aliases: ['stability ltd'], category: 'ai-labs' },
    { company: 'Character.ai', aliases: ['character ai', 'character technologies'], category: 'ai-labs' },
    { company: 'Jasper', aliases: ['jasper ai'], category: 'ai-labs' },

    // Productivity/SaaS
    { company: 'Notion', aliases: ['notion labs'], category: 'productivity-saas' },
    { company: 'GitHub', aliases: ['github inc', 'microsoft corporation'], category: 'productivity-saas' },
    { company: 'Vercel', aliases: ['vercel inc'], category: 'productivity-saas' },
    { company: 'Wix', aliases: ['wix.com'], category: 'productivity-saas' },
    { company: 'Squarespace', aliases: ['squarespace inc'], category: 'productivity-saas' },
    { company: 'Salesforce', aliases: ['salesforce.com'], category: 'productivity-saas' },
    { company: 'HubSpot', aliases: ['hubspot inc'], category: 'productivity-saas' },
    { company: 'Manychat', aliases: ['manychat inc'], category: 'productivity-saas' },
    { company: 'Shopify', aliases: ['shopify inc'], category: 'productivity-saas' },

    // Tech giants
    { company: 'Google', aliases: ['google llc', 'alphabet inc'], category: 'tech-giant' },
    { company: 'Amazon', aliases: ['amazon.com inc', 'amazon web services'], category: 'tech-giant' },

    // Outdoor / action sports
    { company: 'Burton Snowboards', aliases: ['burton', 'burton corporation'], category: 'outdoor-action-sports' },
    { company: 'Patagonia', aliases: ['patagonia inc'], category: 'outdoor-action-sports' },
    { company: 'REI', aliases: ['rei co-op', 'recreational equipment'], category: 'outdoor-action-sports' },
    { company: 'Columbia Sportswear', aliases: ['columbia sportswear company'], category: 'outdoor-action-sports' },
    { company: 'The North Face/VF Corp', aliases: ['the north face', 'north face', 'vf corporation'], category: 'outdoor-action-sports' },
    { company: 'Yeti', aliases: ['yeti coolers', 'yeti holdings'], category: 'outdoor-action-sports' },
    { company: 'GoPro', aliases: ['gopro inc'], category: 'outdoor-action-sports' },

    // Athletic brands
    { company: 'Nike', aliases: ['nike inc'], category: 'athletic-brands' },
    { company: 'Adidas', aliases: ['adidas ag', 'adidas inc'], category: 'athletic-brands' },
    { company: 'Vans', aliases: ['vans inc', 'vf corporation'], category: 'athletic-brands' },
    { company: 'New Balance', aliases: ['new balance athletics'], category: 'athletic-brands' },
    { company: 'Converse', aliases: ['converse inc', 'nike inc'], category: 'athletic-brands' },
    { company: 'Under Armour', aliases: ['under armour inc'], category: 'athletic-brands' },
    { company: 'Lululemon', aliases: ['lululemon athletica'], category: 'athletic-brands' },

    // Audio hardware
    { company: 'Bang & Olufsen', aliases: ['bang and olufsen', 'b&o'], category: 'audio-hardware' },
    { company: 'Beats by Dre', aliases: ['beats electronics', 'apple inc'], category: 'audio-hardware' },
    { company: 'Marshall', aliases: ['marshall amplification', 'zound industries'], category: 'audio-hardware' },
    { company: 'Sonos', aliases: ['sonos inc'], category: 'audio-hardware' },
    { company: 'Gibson', aliases: ['gibson brands'], category: 'audio-hardware' },

    // Automotive/lifestyle
    { company: 'Tesla', aliases: ['tesla inc'], category: 'automotive-lifestyle' },
    { company: 'Rivian', aliases: ['rivian automotive'], category: 'automotive-lifestyle' },
    { company: 'Harley-Davidson', aliases: ['harley davidson inc'], category: 'automotive-lifestyle' },
    { company: 'Peloton', aliases: ['peloton interactive'], category: 'automotive-lifestyle' },

    // Beverage/lifestyle
    { company: 'Red Bull', aliases: ['red bull gmbh'], category: 'beverage-lifestyle' },
    { company: 'Starbucks', aliases: ['starbucks corporation'], category: 'beverage-lifestyle' },

    // Other
    { company: 'Zillow', aliases: ['zillow group'], category: 'productivity-saas' },

    // Add new watchlist entries above this line.
];

// ─────────────────────────────────────────────────────────────────────────────
// MATCHING + CONTEXT BUILDING
// ─────────────────────────────────────────────────────────────────────────────

function normalize(name) {
    if (!name) return '';
    return String(name)
        .toLowerCase()
        .replace(/[.,()&]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
}

function isExpired(entry, now) {
    if (!entry.expires) return false;
    const exp = new Date(entry.expires + 'T23:59:59Z');
    return Number.isFinite(exp.getTime()) && exp.getTime() < now.getTime();
}

function aliasMatches(needle, candidates) {
    return candidates
        .map(normalize)
        .some(c => c && (needle === c || needle.includes(c) || c.includes(needle)));
}

// Returns the best match across all three tiers, or null.
//   { tier: 'application' | 'bespoke' | 'watchlist', entry, category? }
export function matchVisitor(detectedCompanyName) {
    const needle = normalize(detectedCompanyName);
    if (!needle) return null;
    const now = new Date();

    // Tier 1: applications
    for (const app of APPLICATIONS) {
        if (isExpired(app, now)) continue;
        if (aliasMatches(needle, [app.company, ...(app.aliases || [])])) {
            return { tier: 'application', entry: app };
        }
    }

    // Tier 2: bespoke
    for (const b of BESPOKE) {
        if (aliasMatches(needle, [b.company, ...(b.aliases || [])])) {
            return { tier: 'bespoke', entry: b };
        }
    }

    // Tier 3: watchlist (resolve via category template)
    for (const w of WATCHLIST) {
        if (aliasMatches(needle, [w.company, ...(w.aliases || [])])) {
            const cat = CATEGORIES[w.category];
            if (!cat) return null;
            return {
                tier: 'watchlist',
                entry: {
                    company: w.company,
                    space: cat.space,
                    leadWith: cat.leadWith,
                    openers: cat.openers,
                    toneNote: cat.toneNote,
                    category: w.category,
                },
            };
        }
    }

    return null;
}

// Build the visitor-context block to inject into the chat system prompt.
export function buildVisitorContextBlock(match) {
    if (!match) return null;

    if (match.tier === 'application') {
        const a = match.entry;
        return [
            `## VISITOR CONTEXT (this conversation only)`,
            `The visitor's IP resolves to **${a.company}**, where you have an active application:`,
            ``,
            `- **Role applied for:** ${a.role}`,
            `- **Role focus:** ${a.roleFocus.join(', ')}`,
            `- **Your pitch angle:** ${a.pitchAngle}`,
            `- **Past work to lead with:** ${a.emphasize.join('; ')}`,
            a.toneNote ? `- **Tone:** ${a.toneNote}` : null,
            ``,
            `Speak to this audience naturally. Lead with the angle and examples above when relevant. Do NOT announce that you've detected their company — that's creepy. Just calibrate which past work you reach for and how you frame your fit. If they ask something off-topic, answer normally.`,
        ]
            .filter(Boolean)
            .join('\n');
    }

    // bespoke or watchlist — same context structure, just different source data
    const e = match.entry;
    const tierNote =
        match.tier === 'bespoke'
            ? `It's a company you'd love to work with.`
            : `It's a company in your target watchlist (no active application yet).`;
    return [
        `## VISITOR CONTEXT (this conversation only)`,
        `The visitor's IP resolves to **${e.company}**. ${tierNote}`,
        ``,
        `- **Their space:** ${e.space}`,
        `- **Lead with:** ${e.leadWith}`,
        e.toneNote ? `- **Tone:** ${e.toneNote}` : null,
        ``,
        `Speak to this audience naturally. When questions are open-ended, reach for the past work most relevant to ${e.company}'s space. Do NOT announce that you've detected their company — that's creepy. Just calibrate. If they ask something off-topic, answer normally.`,
    ]
        .filter(Boolean)
        .join('\n');
}

// Used by /api/visitor for the frontend response. Returns visitor-facing info
// (tier, company, openers for chips). Internal pitch angles stay server-side.
export function publicVisitorInfo(match) {
    if (!match) return null;
    return {
        tier: match.tier,
        company: match.entry.company,
        role: match.entry.role || null,
        openers: match.entry.openers || [],
    };
}
