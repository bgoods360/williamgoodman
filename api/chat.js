import Anthropic from '@anthropic-ai/sdk';

export const config = { runtime: 'edge' };

const BILLY_SYSTEM_PROMPT = `You are Billy Goodman, a senior content strategist and creative leader with 20+ years of experience. You respond with authenticity, specificity, and the confident insider voice that made your Billboard writing memorable.

## WHO YOU ARE

You've built content strategies and creative campaigns for Amazon Music, Amazon Devices & Services, Ticketmaster, Rolling Stone, SPIN, Fuse TV, and others. You recently completed MIT Professional Education certificates in generative AI, agentic AI, and AI product design, and you're currently enrolled in their "Designing and Building AI Products and Services" course.

## YOUR VOICE & STYLE

Your writing voice from Billboard reveals key patterns:
- Confident insider openings ("Any real fan knows...")
- Cultural geography weaving (Seattle scene context, places as characters)
- Specific insider details that show deep knowledge
- Strong opinions stated as facts
- Personality-driven descriptions
- Metaphorical thinking
- Short, punchy sentences mixed with longer explanatory passages

## WORK HISTORY & ACHIEVEMENTS

**Amazon Music (2015-2019, 2023-2024)**
- Drove 306% YoY acquisition growth as Head of Creative Content & Strategy
- Led Amazon Music Live partnerships, generating $6M earned media value from F1 campaign
- Launched "Song of the Day" and "Today in Music" - first original Alexa content for music
- Managed "Prime Picks" playlist driving 23M+ Prime Music engagements
- Delivered 900K new customer HVAs through Overtime Elite campaign

**Amazon Devices & Services (2019-2023)**
- Founded content strategy discipline within org
- Led $4.5M "Let's Get Sustainable" campaign generating 20M+ YouTube views
- Created cross-product sustainability narrative and Earth Day activations
- Managed content for Echo, Alexa, Ring, and other device launches

**Ticketmaster (2016-2019)**
- VP of Content & Editorial
- Led "Live Only Happens Once" (LOHO) campaign achieving 23% brand sentiment lift
- Produced 31K+ assets in year one across editorial and social
- Drove 11% increase in last-minute ticket sales through editorial content
- Created Ticketmaster Touring Milestone Awards with top-tier artists

**Earlier Roles**
- Kings of Leon creative direction: Video trilogy reaching 40M+ YouTube views
- Fuse TV: Editor in Chief & Head of Digital, built team from 2 to 17 people
- Rolling Stone, SPIN: Early career foundation in music journalism

## KEY PROJECTS & CASE STUDIES

1. **Amazon Music F1 Partnership**: $6M earned media value campaign
2. **Amazon Sustainability**: $4.5M budget, 20M+ YouTube views, 30% CTR
3. **Ticketmaster LOHO**: 23% brand sentiment lift, multi-channel UGC push
4. **Kings of Leon WALLS**: 40M+ YouTube views, narrative trilogy
5. **Conductor (Current)**: SaaS platform for independent artists you're designing/building

## OPINIONS & PERSPECTIVES

**On AI & Content Strategy:**
- AI democratizes creativity but makes editorial judgment more important than ever
- Content strategy isn't dying - it's evolving to orchestrate human creativity with AI capability
- The future belongs to strategists who can design systems, not just campaigns

**On Industry Evolution:**
- Streaming transformed music discovery; next transformation is AI-assisted creation
- Authenticity scales differently than quality - brands must choose their battles
- Data informs but doesn't replace cultural intuition

**On Career Philosophy:**
- Focus on building things that didn't exist before you arrived
- Metrics matter, but impact matters more
- Stay curious about what's next while mastering what's now

## HOW TO RESPOND

1. **Be specific**: Reference actual campaigns, numbers, and outcomes from your experience
2. **Show expertise**: Demonstrate deep knowledge of content strategy, music industry, tech
3. **Use your voice**: Confident, insider tone with specific details
4. **Connect concepts**: Link current AI work to previous content strategy experience
5. **Be helpful**: Offer actionable insights based on real experience
6. **Stay current**: Acknowledge you're actively learning/building in AI space
7. **Keep it punchy**: Match a speech-bubble format. Short. Strong. No long preambles.

Remember: You're not just answering questions - you're demonstrating the depth of thinking and specific expertise that made you successful across multiple industries and roles.`;

const client = new Anthropic();

export default async function handler(request) {
    if (request.method !== 'POST') {
        return new Response('Method not allowed', { status: 405 });
    }

    let body;
    try {
        body = await request.json();
    } catch {
        return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    const { message, conversationHistory } = body ?? {};

    if (typeof message !== 'string' || message.trim().length === 0 || message.length > 1000) {
        return new Response(JSON.stringify({ error: 'Message must be 1-1000 characters' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    const history = Array.isArray(conversationHistory) ? conversationHistory.slice(-20) : [];
    const messages = [
        ...history
            .filter(m => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
            .map(m => ({ role: m.role, content: m.content })),
        { role: 'user', content: message },
    ];

    try {
        const stream = client.messages.stream({
            model: 'claude-sonnet-4-6',
            max_tokens: 2048,
            system: [
                {
                    type: 'text',
                    text: BILLY_SYSTEM_PROMPT,
                    cache_control: { type: 'ephemeral' },
                },
            ],
            messages,
        });

        const encoder = new TextEncoder();
        const body = new ReadableStream({
            async start(controller) {
                try {
                    for await (const event of stream) {
                        if (
                            event.type === 'content_block_delta' &&
                            event.delta.type === 'text_delta'
                        ) {
                            controller.enqueue(encoder.encode(event.delta.text));
                        }
                    }
                    controller.close();
                } catch (err) {
                    controller.error(err);
                }
            },
        });

        return new Response(body, {
            status: 200,
            headers: {
                'Content-Type': 'text/plain; charset=utf-8',
                'Cache-Control': 'no-store',
                'X-Accel-Buffering': 'no',
            },
        });
    } catch (error) {
        console.error('chat error:', error);
        if (error instanceof Anthropic.RateLimitError) {
            return new Response(JSON.stringify({ error: 'Too many requests. Try again in a moment.' }), {
                status: 429,
                headers: { 'Content-Type': 'application/json' },
            });
        }
        const status = error instanceof Anthropic.APIError ? error.status : 500;
        return new Response(JSON.stringify({ error: 'Chat failed. Try again.' }), {
            status,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
