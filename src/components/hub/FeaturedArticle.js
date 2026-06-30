'use client';

export default function FeaturedArticle({ article }) {
  if (!article) return null;

  const {
    title,
    url,
    source,
    category,
    publishedAt,
    description,
    imageUrl,
  } = article;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="featured-article"
      aria-label={`Featured: ${title}`}
    >
      {/* Mobile: image on top; Desktop: right column via grid */}
      <div className="featured-article-inner">
        {/* Left: text content */}
        <div className="featured-article-text">
          <div className="featured-article-eyebrow">
            <span className="featured-label">✦ Featured</span>
            {category && (
              <span className="badge badge-accent">{category}</span>
            )}
          </div>

          <h2 className="featured-article-title">{title}</h2>

          {description && (
            <p className="featured-article-excerpt">{description}</p>
          )}

          <div className="featured-article-footer">
            <span className="featured-source">{source}</span>
            {publishedAt && (
              <span className="featured-date">
                {new Date(publishedAt).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
              </span>
            )}
            <span className="featured-cta btn btn-primary btn-sm">
              Read Article →
            </span>
          </div>
        </div>

        {/* Right: article image */}
        {imageUrl && (
          <div className="featured-article-image-wrap">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imageUrl}
              alt={title}
              className="featured-article-image"
              loading="eager"
              onError={(e) => {
                e.currentTarget.parentElement.style.display = 'none';
              }}
            />
          </div>
        )}
      </div>
    </a>
  );
}
