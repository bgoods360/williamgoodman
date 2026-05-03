import { matchVisitor, publicVisitorInfo } from './_lib/applications.js';

export const config = { runtime: 'edge' };

// Resolve the visitor's company from their IP via IPinfo, then cross-reference
// against APPLICATIONS / BESPOKE / WATCHLIST.
//
// Privacy posture:
// - IP is read server-side only (from Vercel's x-forwarded-for header) and
//   passed once to IPinfo. Never logged. Never stored. Never returned to client.
// - The browser receives only { tier, company, openers } — no IP, no internal
//   pitch text, no detection metadata.
// - When IPinfo fails, the env var is missing, or no match is found, we return
//   null silently. The frontend falls back to default suggestion chips.

const IPINFO_TIMEOUT_MS = 1500;

function getClientIp(request) {
    // Vercel sets x-forwarded-for to "<client-ip>, <hop1>, ..." — first entry is client.
    // Other plausible headers as fallback.
    const xff = request.headers.get('x-forwarded-for');
    if (xff) return xff.split(',')[0].trim();
    return (
        request.headers.get('x-real-ip') ||
        request.headers.get('cf-connecting-ip') ||
        null
    );
}

async function lookupCompanyForIp(ip, token) {
    if (!ip || !token) return null;

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), IPINFO_TIMEOUT_MS);
    try {
        // IPinfo's /lite endpoint returns org info on the standard plan.
        // Use the /companies/{ip} endpoint when available (paid tier); fall
        // back to the basic /{ip} which includes "org" / "company" fields.
        const resp = await fetch(`https://ipinfo.io/${encodeURIComponent(ip)}?token=${encodeURIComponent(token)}`, {
            signal: controller.signal,
            headers: { Accept: 'application/json' },
        });
        if (!resp.ok) return null;
        const data = await resp.json();

        // Possible shapes:
        //   { company: { name, domain, type } }   ← paid
        //   { org: "AS#### Company Name" }        ← free / lite
        if (data.company && data.company.name) return data.company.name;
        if (data.org) {
            // "AS12345 Some Company Inc." → strip the AS number prefix
            return data.org.replace(/^AS\d+\s+/, '').trim();
        }
        return null;
    } catch {
        return null;
    } finally {
        clearTimeout(timer);
    }
}

export default async function handler(request) {
    if (request.method !== 'GET') {
        return new Response('Method not allowed', { status: 405 });
    }

    // Allow ?company=... query override for local testing without IPinfo
    const url = new URL(request.url);
    const overrideCompany = url.searchParams.get('company');

    const token = process.env.IPINFO_TOKEN;
    let detectedCompany = null;

    if (overrideCompany) {
        detectedCompany = overrideCompany;
    } else if (token) {
        const ip = getClientIp(request);
        detectedCompany = await lookupCompanyForIp(ip, token);
    }

    const match = matchVisitor(detectedCompany);
    const info = publicVisitorInfo(match);

    // Lightweight log for visitor-pattern visibility. No IP, no PII.
    if (match) {
        console.log(`[visitor] tier=${match.tier} company="${match.entry.company}"`);
    } else if (detectedCompany) {
        console.log(`[visitor] detected="${detectedCompany}" no_match`);
    }

    return new Response(JSON.stringify(info ?? null), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-store',
        },
    });
}
