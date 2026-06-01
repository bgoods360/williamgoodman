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
        company: 'Adopt/Publicis',
        role: 'Director, Creative',
        applied: '2026-05-19',
        expires: '2026-08-17',
        aliases: ['publicis groupe', 'publicis', 'adopt', 'adopt agency', 'publicis sapient'],
        roleFocus: ['creative direction at an agency', 'multi-client brand storytelling', 'agency-side creative leadership'],
        pitchAngle:
            '20+ years fluent on BOTH sides of the agency/client relationship. Ran the integrated agency model at Ticketmaster — Contend was embedded on-site, in daily standups, inside our project management infrastructure, not a vendor relationship. Knows what agencies need from clients AND what clients need from agencies. Combined with brand-reposition track record (Jameson, Fuse TV, Ticketmaster) and active AI practitioner credentials.',
        emphasize: [
            'Ticketmaster + Contend embedded agency model (full integration, not vendor relationship)',
            'Jameson Irish Whiskey Creative Director — Sine Metu always-on, Black Barrel + Caskmates launches',
            'Multi-brand creative across Fuse TV, Amazon Music, Amazon Devices',
            'Brand reposition track record (Ticketmaster 23% sentiment lift)',
            'MIT AI + Conductor for the practitioner-not-just-strategist angle',
        ],
        openers: [
            'How do you think about the agency/client relationship in 2026?',
            'Tell me about the Contend embedded agency model at Ticketmaster',
            'What does great creative direction look like across multiple brands?',
        ],
        heroSubtitle: 'Creative leader fluent on both sides — agency-embedded and brand-side.',
        bubbleBlurb: '20+ years of creative across Jameson, Fuse TV, Ticketmaster, Amazon.',
        toneNote: "Lead with the agency-fluency angle. Most candidates have only worked one side; you've run both.",
    },
    {
        company: 'Expedia',
        role: 'Senior Manager, Integrated Marketing',
        applied: '2026-05-19',
        expires: '2026-08-17',
        aliases: ['expedia group', 'expedia inc', 'expedia.com'],
        roleFocus: ['integrated marketing', 'cross-channel campaigns', 'travel + lifestyle brand'],
        pitchAngle:
            'Built integrated marketing campaigns that ran natively across every owned channel. Amazon Devices "Alexa, Let\'s Get Sustainable" ($4.5M, 20M+ YouTube views, < $100K paid social) is the cleanest case study of integrated-marketing-done-right. Plus Ticketmaster\'s multi-channel content engine and Jameson Sine Metu always-on. Bonus: based in Seattle (Expedia\'s HQ).',
        emphasize: [
            '"Alexa, Let\'s Get Sustainable" — integrated Earth Day comms across Alexa, Kindle, Echo, web, social, app, email, homepage',
            'Ticketmaster multi-channel content engine (31K+ assets year one)',
            'Jameson Sine Metu — always-on integrated brand work',
            'Seattle-based (geographic match)',
        ],
        openers: [
            'How do you build a campaign that runs natively across every channel?',
            "Tell me about Alexa, Let's Get Sustainable",
            'What makes integrated marketing work at platform scale?',
        ],
        heroSubtitle: 'Integrated marketer who ran $4.5M campaigns natively across every channel.',
        bubbleBlurb: 'Built integrated brand campaigns at Amazon Devices, Ticketmaster, and Jameson.',
        toneNote: "Seattle home base is a real plus for Expedia. Mention it if location comes up.",
    },
    {
        company: 'Anthropic',
        role: 'Engineering Editorial Lead (reapplication)',
        applied: '2026-05-19',
        expires: '2026-08-17',
        aliases: ['anthropic pbc'],
        roleFocus: ['editorial leadership at an AI lab', 'technical communications', 'editorial inside engineering culture'],
        pitchAngle:
            'Editorial leader who built with Claude. This portfolio is the demo: a fully agentic conversational system grounded in 20+ years of work history, with visitor-aware tailoring, deployed to Vercel, all built by an editorial-leader-not-engineer using Claude as pair programmer. Anthropic visitors will see the proof before reading any pitch.',
        emphasize: [
            'This portfolio itself — agentic Billy, visitor detection, the works (built with Claude API)',
            'MIT certificates: generative AI, agentic AI, AI product design',
            'Conductor — AI-powered SaaS for independent artists',
            'Editorial roots predating AI: Rolling Stone, SPIN, Billboard, Fuse TV',
            'Founded content strategy at Amazon Devices (cross-functional with engineering)',
        ],
        openers: [
            "How would you build editorial inside an AI lab?",
            "What's the role of editorial in technical product documentation?",
            "Tell me about Conductor — what are you building with AI?",
        ],
        heroSubtitle: 'Editorial leader who builds with AI — this site is the proof.',
        bubbleBlurb: 'Built this whole site as an agent. With Claude as pair programmer.',
        toneNote: "Anthropic visitors are technical. Lead with this portfolio itself as the demo — they\'ll inspect the code.",
    },
    {
        company: 'Pinterest (Lead Creative Producer)',
        role: 'Lead Creative Producer, Editorial Content',
        applied: '2026-05-19',
        expires: '2026-08-17',
        aliases: ['pinterest inc'],
        roleFocus: ['creative producing', 'editorial content at a visual discovery platform', 'taste-led storytelling'],
        pitchAngle:
            'Editorial producer with platform-scale instincts. Built Amazon Music\'s in-app content as a discovery engine (the closest analog to Pinterest\'s job). Editorial roots at Rolling Stone, SPIN, Billboard, and Fuse TV. Visual-arts sensibility runs deep — Turner, Impressionists, the whole reference set.',
        emphasize: [
            'Amazon Music in-app content as discovery engine (direct analog)',
            'Editorial roots: Rolling Stone, SPIN, Billboard, Fuse TV',
            'Front Row video/interview platform (visual storytelling at scale)',
            'Visual sensibility: Turner, Impressionists, the broader cultural-references set',
        ],
        openers: [
            "How does editorial content drive discovery at a visual platform?",
            "Tell me about Front Row at Amazon Music",
            "What does taste-led editorial look like at platform scale?",
        ],
        heroSubtitle: 'Editorial producer with platform-scale instincts. Taste as strategy.',
        bubbleBlurb: 'Editorial roots + Amazon Music in-app content as a discovery engine.',
        toneNote: "Pinterest is taste-driven. Lead with the visual + editorial overlap.",
    },
    {
        company: 'SeatGeek',
        role: 'Head of PR & Communications',
        applied: '2026-05-19',
        expires: '2026-08-17',
        aliases: ['seatgeek inc'],
        roleFocus: ['PR + communications', 'live event ticketing brand', 'cultural reposition'],
        pitchAngle:
            'Ran the Ticketmaster reposition (transactional villain to advocate for the live experience, 23% sentiment lift) — SeatGeek\'s opportunity is the same playbook. Plus editorial engine (31K+ assets, City Guides, $12M+ Disney on Ice article), Touring Milestone Awards. Direct competitor experience at the depth this role actually needs.',
        emphasize: [
            'Ticketmaster reposition (23% brand sentiment lift) — THE direct analog',
            'LOHO campaign — multi-channel UGC push around the emotional truth of live music',
            'Editorial engine driving last-minute ticket sales (13% lift via City Guides)',
            'Touring Milestone Awards (artist-side relationship building)',
        ],
        openers: [
            "How would you position SeatGeek against Ticketmaster?",
            "Tell me about repositioning Ticketmaster",
            "What does great PR look like for a live-music brand right now?",
        ],
        heroSubtitle: 'Repositioned Ticketmaster — 23% brand sentiment lift across live music.',
        bubbleBlurb: 'Repositioned Ticketmaster from transactional villain to live-experience advocate.',
        toneNote: "Direct competitor experience. Lead with the reposition — they want exactly that playbook.",
    },
    {
        company: 'Airbnb',
        role: 'Host Communications Strategy Lead',
        applied: '2026-05-19',
        expires: '2026-08-17',
        aliases: ['airbnb inc'],
        roleFocus: ['host-facing communications strategy', 'B2B/SMB-facing comms', 'operator support'],
        pitchAngle:
            'Amazon Global Brands is the direct parallel — built communications for Third Party Sellers (operators running businesses on a platform, exactly like Airbnb Hosts). Audited three fragmented Seller-facing properties and consolidated them into one master experience; the seller-onboarding revamp drove an 11% completion lift. Same shape of work Airbnb needs for Hosts.',
        emphasize: [
            'Amazon Global Brands — Third Party Seller experience (direct shape parallel to Airbnb Hosts)',
            '78-step seller onboarding revamp (11% completion lift)',
            'Editorial leadership for operator-facing content',
            'Cross-functional with product/engineering teams',
        ],
        openers: [
            "How would you approach communications strategy for Airbnb Hosts?",
            "Tell me about the Amazon Global Brands seller experience",
            "What makes operator-facing comms different from consumer comms?",
        ],
        heroSubtitle: 'Communications strategist for operators — Amazon Sellers are Airbnb Hosts in another category.',
        bubbleBlurb: 'Built comms for Amazon Third Party Sellers. Same shape as Airbnb Hosts.',
        toneNote: "The Sellers/Hosts parallel is THE angle. Lead with Amazon Global Brands work.",
    },
    {
        company: 'Docusign',
        role: 'Head of Communications AI Systems & Social Production',
        applied: '2026-05-19',
        expires: '2026-08-17',
        aliases: ['docusign inc'],
        roleFocus: ['communications', 'AI systems', 'social production at scale'],
        pitchAngle:
            'Communications leader who actively builds with AI. Founded content strategy at Amazon Devices, ran Amazon Music\'s social growth to millions, plus MIT AI work, Conductor, and this portfolio (built as a working agent). Rare to find a comms leader who can actually architect the AI-systems-and-social-production work the role is asking for.',
        emphasize: [
            'Amazon Music social growth (millions of followers via editorial-led programming)',
            'Founded content strategy at Amazon Devices (parallel comms-inside-product-org work)',
            'MIT certificates: generative AI, agentic AI, AI product design',
            'Conductor — AI-powered SaaS, proves practitioner credibility',
            'This portfolio itself — agent Billy as proof of AI-systems literacy',
        ],
        openers: [
            "How would you build a communications AI system?",
            "Tell me about Amazon Music's social growth playbook",
            "What does AI in social production actually look like?",
        ],
        heroSubtitle: 'Communications leader at the AI-systems seam.',
        bubbleBlurb: 'Built content systems and social production at scale. Now deep in AI.',
        toneNote: "DocuSign role is rare — comms + AI systems together. Few candidates can do both. Surface both clearly.",
    },
    {
        company: 'UnitedMasters (VP Marketing)',
        role: 'VP of Marketing',
        applied: '2026-05-19',
        expires: '2026-08-17',
        aliases: ['united masters', 'unitedmasters inc'],
        roleFocus: ['marketing leadership at an artist services platform', 'growth marketing for independent artists', 'music industry marketing'],
        pitchAngle:
            'Mission-aligned with UnitedMasters at a level few candidates can match — currently building Conductor as a SaaS for independent artists. Plus drove the team\'s 306% YoY acquisition growth at Amazon Music, ran cultural-moment activation (F1, Overtime Elite), and built brand-side marketing across Ticketmaster, Jameson, Fuse TV. Marketing leader who actually understands what independent artists need because Billy is building for them.',
        emphasize: [
            'Conductor — directly mission-aligned (independent artist SaaS)',
            '306% YoY acquisition growth at Amazon Music (team metric)',
            'Amazon Music Live + F1 partnership ($6M EMV) and Overtime Elite (280K HVAs)',
            'Music industry depth: Rolling Stone, SPIN, Billboard, Fuse TV, Amazon Music',
            'Front Row at Amazon Music (artist storytelling at platform scale)',
        ],
        openers: [
            "How would you drive growth marketing for an artist services platform?",
            "Tell me about Conductor and what it serves",
            "What did you learn from the Amazon Music acquisition growth playbook?",
        ],
        heroSubtitle: 'Marketing leader who grew Amazon Music 306% YoY — now building for independent artists.',
        bubbleBlurb: 'Marketing leader for independent artists. Conductor + Amazon Music chops.',
        toneNote: "Mission alignment with Conductor is your unfair advantage. Lead with it.",
    },
    {
        company: 'Apple',
        role: 'Owned Social Senior Strategist, XLOB (Cross-Line-of-Business)',
        applied: '2026-05-08',
        expires: '2026-08-06',
        aliases: ['apple inc', 'apple computer'],
        roleFocus: ['owned social at scale', 'cross-product narrative', 'brand voice consistency across product lines'],
        pitchAngle:
            'Senior brand-side leader who has done exactly this kind of cross-product social work — Amazon Devices XPL ("Alexa, Let\'s Get Sustainable") across Echo, Alexa, Kindle, Ring + Amazon Music social growth into the millions across platforms. The XLOB challenge — holding voice and narrative across many product surfaces simultaneously — is the parallel architecture you ran at Amazon.',
        emphasize: [
            'Amazon Devices XPL "Alexa, Let\'s Get Sustainable" — multi-product narrative ran natively across every owned channel',
            'Amazon Music social growth (millions of followers via editorial-led programming)',
            'Founded content strategy discipline at Amazon Devices — directly parallel to XLOB shape',
            'Cross-functional fluency operating across product orgs',
        ],
        openers: [
            'How would you approach owned social across multiple product lines?',
            "Tell me about cross-product narrative work at Amazon Devices",
            'What does great brand voice look like at platform scale?',
        ],
        heroSubtitle: 'Cross-product brand storyteller. Founded content strategy inside Amazon\'s device ecosystem.',
        bubbleBlurb: 'Built cross-product brand stories across Amazon\'s device ecosystem.',
        toneNote: "Apple respects builders and product-org fluency. Lead with the parallel XLOB architecture you actually ran.",
    },
    {
        company: 'Google',
        role: 'Senior Brand Marketing Manager, Brand Studio',
        applied: '2026-05-08',
        expires: '2026-08-06',
        aliases: ['google llc', 'alphabet inc'],
        roleFocus: ['brand marketing at platform scale', 'brand studio practices', 'cultural-moment campaigns'],
        pitchAngle:
            'Founded content strategy inside a product org at Amazon Devices — the closest parallel to Google Brand Studio\'s role. Brings cross-discipline fluency (creative direction + content strategy + AI practitioner) that brand teams inside tech companies actively need now.',
        emphasize: [
            'Amazon Devices content strategy founding (parallel role architecture)',
            '"Alexa, Let\'s Get Sustainable" — cross-product brand storytelling at scale',
            'Amazon Music F1 partnership ($6M EMV) and Overtime Elite cultural-moment work',
            'MIT AI work + Conductor for the practitioner-not-just-strategist angle',
        ],
        openers: [
            'How would you build brand campaigns at platform scale?',
            "What did you learn founding content strategy at Amazon Devices?",
            'How does AI change brand storytelling?',
        ],
        heroSubtitle: 'Brand strategist who founded content disciplines inside product orgs.',
        bubbleBlurb: 'Founded content strategy inside a product org. Built from zero.',
        toneNote: "Google Brand Studio respects systems thinkers who can scale. Show product-org fluency and AI practitioner credibility.",
    },
    {
        company: 'T-Mobile',
        role: 'Creative Director, Copy & Story',
        applied: '2026-05-08',
        expires: '2026-08-06',
        aliases: ['t-mobile us', 't-mobile usa', 'tmobile'],
        roleFocus: ['copy leadership', 'narrative and story', 'cultural fluency at scale'],
        pitchAngle:
            'Writing-first creative leader with the voice-shaping chapter (Billboard, Rolling Stone, SPIN) AND the scaled creative-ops chops (31K+ assets in year one at Ticketmaster, 800/week peak). Rare combination of editorial origin + creative leadership at the volume T-Mobile actually operates at.',
        emphasize: [
            'Billboard / Rolling Stone / SPIN — voice was forged in editorial',
            'Ticketmaster 31K+ assets year one — proof of writing leadership at scale',
            'LOHO cultural reposition — copy and story working together',
            'Fuse TV brand-building from scratch — culture-first creative',
        ],
        openers: [
            "What does great brand copy look like at carrier scale?",
            "Tell me about the editorial engine at Ticketmaster",
            "How do you keep brand voice consistent at 800 assets per week?",
        ],
        heroSubtitle: 'Writer-first creative leader. Editorial origin, scaled creative ops.',
        bubbleBlurb: 'Editorial roots. 31K+ assets year one at Ticketmaster.',
        toneNote: "Lead with the writing-origin angle — that\'s the differentiator for a copy-leadership role.",
    },
    {
        company: 'GitHub',
        role: 'Senior Director, Brand Strategy & Narrative',
        applied: '2026-05-08',
        expires: '2026-08-06',
        aliases: ['github inc', 'microsoft corporation'],
        roleFocus: ['brand strategy at scale', 'narrative architecture', 'developer/builder culture'],
        pitchAngle:
            'Brand reposition track record (Ticketmaster: transactional villain → live experience advocate, 23% sentiment lift) + builder credibility (this very portfolio is a working agentic system Billy built with Claude). The combination GitHub needs: strategist who can reposition a brand AND speak the builder dialect natively.',
        emphasize: [
            'Ticketmaster reposition — 23% brand sentiment lift, real proof at scale',
            'This portfolio itself — built as an AI agent, deployed to Vercel, demonstrates the builder fluency',
            'Founded content strategy at Amazon Devices (cross-functional with engineering)',
            'MIT AI + Conductor — practitioner credibility',
        ],
        openers: [
            'How would you approach brand strategy at a developer platform?',
            "Tell me about repositioning Ticketmaster",
            "What\'s your take on brand storytelling for builder communities?",
        ],
        heroSubtitle: 'Brand strategist with builder-fluency. This portfolio is proof.',
        bubbleBlurb: 'Built this whole site myself — with Claude as pair programmer.',
        toneNote: "GitHub culture rewards builder-fluency. Mention this portfolio itself as proof — they\'ll respect it.",
    },
    {
        company: 'Mozilla',
        role: 'Head of Editorial + Platforms',
        applied: '2026-05-08',
        expires: '2026-08-06',
        aliases: ['mozilla foundation', 'mozilla corporation'],
        roleFocus: ['editorial leadership', 'platform thinking', 'mission-driven content', 'open-web values'],
        pitchAngle:
            'Editorial leader with platform-thinking credentials (Amazon Music in-app content as retention engine, Amazon Devices XPL across owned channels) — exactly the editorial-meets-platform discipline Mozilla needs. Mission alignment: spent 20 years closing the distance between creators and audiences; the open-web mission is the same impulse at infrastructure scale.',
        emphasize: [
            'Editorial roots: Rolling Stone, SPIN, Billboard, Fuse TV',
            'Platform/product fluency: Amazon Music in-app, Amazon Devices XPL',
            'Founded discipline at Amazon Devices (built editorial inside a platform org)',
            'Independent-creator ethos: Conductor is built specifically for independent artists',
        ],
        openers: [
            'How would you build editorial inside a platform organization?',
            "What does mission-driven content look like in 2026?",
            "Tell me about Conductor — what are you building for independent creators?",
        ],
        heroSubtitle: 'Editorial leader. Platform thinker. Mission-aligned.',
        bubbleBlurb: 'Editorial leader who thinks in platforms. Building Conductor for indie creators.',
        toneNote: "Mozilla\'s mission-driven DNA matches Billy\'s independent-creator instinct. The Conductor connection is real.",
    },
    {
        company: 'Runway',
        role: 'Creative Director',
        applied: '2026-05-08',
        expires: '2026-08-06',
        aliases: ['runway ml', 'runwayml inc'],
        roleFocus: ['creative leadership at an AI video tools company', 'storytelling-meets-AI', 'video-native brand'],
        pitchAngle:
            'Rare profile: deep video storytelling chops (Kings of Leon WALLS trilogy 40M+ views with fan co-author model, Fuse TV YouTube to 3M/wk, Amazon Sustainability 20M+ views) + active AI practitioner (MIT certificates, Conductor, this portfolio). Runway needs a creative director who has actually used the tools and shipped at scale — Billy is one of the few who has both.',
        emphasize: [
            'Kings of Leon WALLS trilogy (40M+ views, fan co-author model — narrative video at scale)',
            'Fuse TV YouTube buildout (3M+ views/week, original artist franchises)',
            'Amazon "Alexa, Let\'s Get Sustainable" 20M+ YouTube views',
            'MIT AI work + Conductor — practitioner credibility',
            'Personal: producing demos in Suno Studio (uses AI tools)',
        ],
        openers: [
            "What\'s the future of AI in video production?",
            "Tell me about Kings of Leon WALLS — long-form story in the short-form era",
            "How would you build brand creative for an AI tools company?",
        ],
        heroSubtitle: 'Video storyteller at scale. Active AI practitioner.',
        bubbleBlurb: 'Narrative video at scale. Built Kings of Leon WALLS trilogy (40M+ views).',
        toneNote: "Lead with the video chops AND the AI-practitioner angle. Runway will respect that Billy uses AI tools personally, not just talks about them.",
    },
    {
        company: 'Suno (GM, Songkick)',
        role: 'GM, Songkick (Suno-acquired live music ticketing/discovery)',
        applied: '2026-05-08',
        expires: '2026-08-06',
        aliases: ['suno inc', 'suno ai', 'songkick'],
        roleFocus: ['live music + ticketing leadership', 'AI music + live discovery integration', 'GM-level business ownership'],
        pitchAngle:
            'Uniquely overlapping background: led the Ticketmaster reposition (live music + ticketing at scale, 23% sentiment lift, $12M Disney on Ice editorial, City Guides driving last-minute sales), Amazon Music brand work (streaming + cultural-moment activation), AND active AI practitioner using Suno Studio personally. The Songkick GM role at Suno needs someone who understands live music, ticketing, AI, AND can run a business — Billy is one of the few people who hits all four.',
        emphasize: [
            'Ticketmaster: 23% sentiment lift, 31K+ assets year one, $12M+ Disney on Ice article, City Guides driving 13% last-minute lift',
            'Amazon Music F1 partnership ($6M EMV), Amazon Music Live programming',
            'Personal Suno Studio user (producing AI-augmented demos)',
            'Cross-functional GM-style operation at AD&S (founded discipline, ran budget, drove SVP-level work)',
        ],
        openers: [
            "How would you grow Songkick within Suno?",
            "Tell me about repositioning Ticketmaster",
            "Where do AI music and live discovery intersect?",
        ],
        heroSubtitle: 'Live music + ticketing + AI — the rare overlap your role needs.',
        bubbleBlurb: 'Ticketmaster reposition + Suno Studio user. Live + AI in one resume.',
        toneNote: "The Ticketmaster + Suno-Studio-personal-use combination is the killer angle. Mention that you actually USE Suno Studio for your own music.",
    },
    {
        company: 'Suno (Director of Social Media)',
        role: 'Director of Social Media',
        applied: '2026-05-08',
        expires: '2026-08-06',
        aliases: ['suno inc', 'suno ai'],
        roleFocus: ['social media leadership at an AI music platform', 'creator-first social', 'product-aware social'],
        pitchAngle:
            'Grew Amazon Music\'s social following by millions through editorial-led programming and cultural-moment activation — directly parallel to what Suno needs. Plus: active Suno Studio user personally, producing demos with AI backing tracks. Combination of platform-scale social growth + native creator-side product use is rare.',
        emphasize: [
            'Amazon Music social growth — millions of followers via editorial-led programming',
            'Cultural-moment activation: Amazon Music Live, F1 partnership, Overtime Elite (280K HVAs)',
            'Personal Suno Studio user — practitioner credibility',
            'Conductor — independent-artist-focused SaaS, mission-aligned',
        ],
        openers: [
            'How would you grow social for an AI music platform?',
            "Tell me about Amazon Music\'s social growth playbook",
            "What\'s your take on the creator economy for AI music tools?",
        ],
        heroSubtitle: 'Platform-scale social growth. Active Suno Studio user.',
        bubbleBlurb: 'Grew Amazon Music social to millions. Use Suno Studio for my own demos.',
        toneNote: "Suno is creator-first. Lead with platform-scale social growth + personal use of their product.",
    },
    {
        company: 'UnitedMasters',
        role: 'Creative Director',
        applied: '2026-05-08',
        expires: '2026-08-06',
        aliases: ['united masters', 'unitedmasters inc'],
        roleFocus: ['creative direction for an artist-services platform', 'artist storytelling at scale', 'brand work for independent music'],
        pitchAngle:
            'Music industry depth + artist-side creative chops + builder for independent artists. UnitedMasters\' mission of empowering independent artists is the same problem Billy is solving with Conductor. Plus: Front Row, Kings of Leon WALLS, Amazon Music artist storytelling — directly relevant artist-platform work.',
        emphasize: [
            'Conductor — SaaS Billy is currently building for independent artists (direct mission alignment)',
            'Front Row at Amazon Music — artist storytelling at platform scale',
            'Kings of Leon WALLS trilogy — fan co-author model, narrative-led artist work',
            'Music industry depth: Rolling Stone, SPIN, Billboard, Fuse TV, Amazon Music',
        ],
        openers: [
            "Tell me about Conductor and how it serves independent artists",
            "What did you learn about artist collaboration from Kings of Leon?",
            "How should creative work for an artist-services platform?",
        ],
        heroSubtitle: 'Building for independent artists at MIT. Mission-aligned.',
        bubbleBlurb: 'Building Conductor — a SaaS for independent artists.',
        toneNote: "Direct mission alignment with Conductor. Lead with that.",
    },
    {
        company: 'Microsoft',
        role: 'Director, Content Engineering, MAI',
        applied: '2026-05-08',
        expires: '2026-08-06',
        aliases: ['microsoft corporation', 'microsoft ai', 'mai'],
        roleFocus: ['editorial strategy at scale', 'AI-powered content experiences', 'prompt-engineering guidance', 'cultural-moment editorial (World Cup, Met Gala, F1)', 'cross-functional with product + engineering'],
        pitchAngle:
            'Rare combination: deep editorial roots (Rolling Stone, SPIN, Billboard, Fuse TV) + founding-discipline experience at Amazon Devices + cultural-moment activation including the F1 partnership at Amazon Music ($6M EMV) + practitioner-level AI work through MIT and Conductor. The role is explicitly editorial leadership at the AI-product seam — exactly the bridge Billy has been building toward.',
        emphasize: [
            'Amazon Music F1 partnership ($6M EMV) — this role explicitly cites F1 as a cultural-moment example',
            'Founded content strategy at Amazon Devices — parallel role architecture (editorial inside a product org)',
            'MIT certificates: generative AI, agentic AI, AI product design',
            'Conductor — currently building an AI-powered SaaS',
            'Editorial roots that pre-date AI: Rolling Stone, SPIN, Billboard, Fuse TV',
        ],
        openers: [
            "How would you lead editorial for AI-powered content experiences at scale?",
            "Tell me about the F1 partnership at Amazon Music",
            "How does prompt engineering fit into editorial strategy?",
        ],
        heroSubtitle: 'Editorial leadership at the AI-product seam.',
        bubbleBlurb: 'Ran the F1 partnership at Amazon Music. $6M earned media.',
        toneNote: "Microsoft Redmond — you\'re already in Seattle, geography is ideal. The F1 mention in the role itself is gold.",
    },
    {
        company: 'Toast',
        role: 'Senior Director, Content & Audience Growth',
        applied: '2026-05-08',
        expires: '2026-08-06',
        aliases: ['toast inc', 'toast tab'],
        roleFocus: ['content for audience growth', 'restaurant/SMB-facing content', 'editorial + growth marketing intersection'],
        pitchAngle:
            'Audience-growth-through-content is your discipline. 306% YoY acquisition growth at Amazon Music came from treating content as a discovery and retention engine, not a marketing add-on. Same playbook applies to Toast: build the content engine that scales the customer base.',
        emphasize: [
            '306% YoY acquisition growth at Amazon Music (team metric)',
            'In-app content as retention engine (Amazon Music)',
            'Ticketmaster editorial engine driving sales (City Guides → 13% last-minute lift, Disney on Ice → $12M)',
            'Amazon Global Brands seller onboarding revamp — 11% completion lift on a SMB-facing experience (closest analog to Toast\'s restaurant audience)',
        ],
        openers: [
            'How would you grow audience through content at Toast?',
            "Tell me about content-as-retention-engine at Amazon Music",
            "What did you learn from the Amazon Global Brands seller experience?",
        ],
        heroSubtitle: 'Content as a discovery and retention engine. 306% YoY growth at Amazon Music.',
        bubbleBlurb: 'Grew Amazon Music 306% YoY by treating content as a discovery engine.',
        toneNote: "Amazon Global Brands is the closest analog (B2B/SMB-facing). Surface it.",
    },
    {
        company: 'Burton Snowboards',
        role: 'Creative Director',
        applied: '2026-05-01',
        expires: '2026-07-30',
        aliases: ['burton', 'burton corporation', 'burton snowboards inc'],
        roleFocus: ['creative direction', 'brand storytelling', 'action sports authenticity', 'culture-driven brand building'],
        pitchAngle:
            'Creative leader with 35 years on a snowboard, 50+ days a season, heli and cat experience in British Columbia, plus 2026 Olympics in Livigno — paired with 20+ years of brand-building work across music, entertainment, and consumer brands. Authentic to the audience AND brings the system thinking Burton needs to scale storytelling in the AI era.',
        emphasize: [
            'Lifelong snowboarder (35 years, 50+ days/season — actual authenticity, not borrowed)',
            'Jameson Irish Whiskey Creative Director (Sine Metu, Black Barrel, Caskmates) — proof brand-side creative travels beyond music',
            'Fuse TV brand-building from scratch (2 to 17 team, original artist franchises, sponsorships)',
            'Kings of Leon WALLS trilogy + fan-co-author model',
            'Conductor + MIT AI work as the "where culture meets tooling" angle',
        ],
        openers: [
            'How would you bring AI into an action sports brand like Burton?',
            "Tell me about your work with Kings of Leon — how do you think about artist-and-brand culture?",
            "What does authentic action sports storytelling look like in 2026?",
        ],
        heroSubtitle: '35 years on snow. 20+ years of brand-building. Lifelong, not borrowed.',
        bubbleBlurb: '35 years snowboarding. 50+ days a season. The 2026 Olympics in Livigno this winter.',
        toneNote: "Lead with the snowboarding bona fides naturally — they're the unfair advantage here. Don't fake it; you don't have to. 35 years on snow + brand-building chops is the rare combination Burton actually needs.",
    },
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
        heroSubtitle: 'Editorial leader who built scaled content engines — now deep in AI.',
        bubbleBlurb: 'Editorial leader. SPIN, Fuse TV, Amazon Music — now deep in AI through MIT.',
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
            'How do you build content around cultural moments?',
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
            'How do you build content around cultural moments?',
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
        company: 'Shopify',
        aliases: ['shopify inc', 'shopify commerce'],
        space: 'commerce platform for merchants and creators; content infrastructure for sellers and brand-builders',
        leadWith:
            'Amazon Global Brands work (consolidating fragmented Third Party Seller resources into one master experience — directly analogous to Shopify\'s merchant-content challenge), Conductor (current SaaS for independent creators/artists), editorial leadership across multi-stakeholder ecosystems, plus the breadth across journalism, brand-side, and product orgs',
        openers: [
            'What does great content look like for a merchant platform?',
            'How do you build editorial that helps creators succeed?',
            'Tell me about Amazon Global Brands and the Third Party Seller experience',
        ],
        toneNote: 'Recently interviewed for Head of Content here — the merchant-and-creator audience overlaps heavily with Conductor\'s thinking. Lead with the operator-empathy angle.',
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
    // Shopify promoted to BESPOKE (Head of Content interviews)

    // Tech giants
    { company: 'Google', aliases: ['google llc', 'alphabet inc'], category: 'tech-giant' },
    { company: 'Amazon', aliases: ['amazon.com inc', 'amazon web services'], category: 'tech-giant' },

    // Outdoor / action sports
    // Burton Snowboards promoted to APPLICATIONS (Creative Director interviews)
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
// (tier, company, openers for chips, heroSubtitle, bubbleBlurb).
// Internal pitch angles stay server-side.
export function publicVisitorInfo(match) {
    if (!match) return null;
    return {
        tier: match.tier,
        company: match.entry.company,
        role: match.entry.role || null,
        openers: match.entry.openers || [],
        heroSubtitle: match.entry.heroSubtitle || null,
        bubbleBlurb: match.entry.bubbleBlurb || null,
    };
}
