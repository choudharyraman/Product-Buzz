import Parser from 'rss-parser';
import newsSources from '@/data/news-sources.json';

// Next.js App Router ISR: revalidate cached response every 30 minutes
export const revalidate = 1800;

const parser = new Parser({
  timeout: 8000,
  headers: {
    'User-Agent': 'ProductBuzz/1.0 (RSS aggregator for PM news)',
    Accept: 'application/rss+xml, application/xml, text/xml, */*',
  },
  customFields: {
    item: [
      ['media:content', 'mediaContent', { keepArray: false }],
      ['media:thumbnail', 'mediaThumbnail', { keepArray: false }],
      ['enclosure', 'enclosure', { keepArray: false }],
    ],
  },
});

/**
 * Extract the best available image URL from an RSS item.
 */
function extractImageUrl(item) {
  // 1. media:content with url attribute
  if (item.mediaContent?.['$']?.url) return item.mediaContent['$'].url;
  // 2. media:thumbnail
  if (item.mediaThumbnail?.['$']?.url) return item.mediaThumbnail['$'].url;
  // 3. enclosure (podcasts / image attachments)
  if (item.enclosure?.url && item.enclosure.type?.startsWith('image/')) {
    return item.enclosure.url;
  }
  // 4. Scrape first <img> src from content / summary
  const html = item['content:encoded'] || item.content || item.summary || '';
  const imgMatch = html.match(/<img[^>]+src=["']([^"']+)["']/i);
  if (imgMatch?.[1]) return imgMatch[1];

  return null;
}

/**
 * Strip HTML tags and trim whitespace from a string.
 */
function stripHtml(html = '') {
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Normalise a single RSS item into a standard article shape.
 */
function normalizeItem(item, source) {
  const rawDescription =
    item.contentSnippet ||
    stripHtml(item.summary || item.content || item['content:encoded'] || '');

  return {
    id: `${source.id}-${encodeURIComponent(item.link || item.guid || item.title || Math.random())}`,
    title: stripHtml(item.title || ''),
    url: item.link || item.guid || '',
    source: source.id,
    sourceName: source.name,
    category: source.category,
    categoryId: source.categoryId,
    publishedAt: item.pubDate || item.isoDate || null,
    description: rawDescription ? rawDescription.slice(0, 280) : null,
    imageUrl: extractImageUrl(item),
  };
}

/**
 * Fetch and parse one RSS feed, returning normalised articles.
 * Returns an empty array on any error so the feed is silently skipped.
 */
async function fetchFeed(source) {
  try {
    const feed = await parser.parseURL(source.url);
    return (feed.items || []).map((item) => normalizeItem(item, source));
  } catch {
    // Silently skip failed feeds — don't break the whole response
    return [];
  }
}

export async function GET() {
  // Use the first 5 sources for performance
  const activeSources = newsSources.slice(0, 5);

  // Fetch all feeds in parallel, tolerating individual failures
  const results = await Promise.allSettled(
    activeSources.map((source) => fetchFeed(source))
  );

  const allArticles = results.flatMap((result) =>
    result.status === 'fulfilled' ? result.value : []
  );

  // Sort by date descending (newest first)
  allArticles.sort((a, b) => {
    const dateA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
    const dateB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
    return dateB - dateA;
  });

  // Cap total articles
  const articles = allArticles.slice(0, 30);

  return Response.json(
    { articles, fetchedAt: new Date().toISOString() },
    {
      headers: {
        'Cache-Control': 's-maxage=1800, stale-while-revalidate=300',
      },
    }
  );
}
