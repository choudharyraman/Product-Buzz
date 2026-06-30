'use client';

import { useState } from 'react';

const initialFormState = {
  productName: '',
  productUrl: '',
  reason: '',
};

export default function SuggestProduct({ isOpen, onClose }) {
  const [form, setForm] = useState(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  function handleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (error) setError('');
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.productName.trim()) {
      setError('Product name is required.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const res = await fetch('/api/dictionary/suggest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productName: form.productName.trim(),
          productUrl: form.productUrl.trim(),
          reason: form.reason.trim(),
        }),
      });

      if (!res.ok) throw new Error('Server error');
      setIsSuccess(true);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleClose() {
    // Reset after a short delay so animation doesn't flash
    setForm(initialFormState);
    setIsSuccess(false);
    setError('');
    onClose();
  }

  return (
    <div
      className="modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label="Suggest a product"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div className="modal">
        {isSuccess ? (
          /* ── Success state ── */
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              gap: 'var(--space-4)',
              padding: 'var(--space-4) 0',
            }}
          >
            <span style={{ fontSize: '3rem' }}>🎉</span>
            <h2
              style={{
                fontSize: 'var(--text-xl)',
                fontWeight: 'var(--weight-bold)',
                color: 'var(--text-primary)',
              }}
            >
              Thanks for the suggestion!
            </h2>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
              We&apos;ll review your suggestion and add it to the Product Dictionary if it&apos;s a good fit.
            </p>
            <button
              className="btn btn-primary"
              onClick={handleClose}
              style={{ marginTop: 'var(--space-2)' }}
            >
              Done
            </button>
          </div>
        ) : (
          /* ── Form state ── */
          <>
            {/* Header */}
            <div
              className="flex justify-between items-center"
              style={{ marginBottom: 'var(--space-6)' }}
            >
              <div>
                <h2
                  style={{
                    fontSize: 'var(--text-xl)',
                    fontWeight: 'var(--weight-bold)',
                    color: 'var(--text-primary)',
                    letterSpacing: '-0.02em',
                  }}
                >
                  Suggest a Product
                </h2>
                <p
                  style={{
                    fontSize: 'var(--text-sm)',
                    color: 'var(--text-secondary)',
                    marginTop: 'var(--space-1)',
                  }}
                >
                  Know a great product worth learning from?
                </p>
              </div>
              <button
                type="button"
                className="btn btn-ghost btn-icon"
                onClick={handleClose}
                aria-label="Close modal"
                style={{ fontSize: '1.25rem', flexShrink: 0 }}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} noValidate>
              {/* Product Name */}
              <div style={{ marginBottom: 'var(--space-4)' }}>
                <label
                  htmlFor="suggest-product-name"
                  style={{
                    display: 'block',
                    fontSize: 'var(--text-sm)',
                    fontWeight: 'var(--weight-medium)',
                    color: 'var(--text-primary)',
                    marginBottom: 'var(--space-2)',
                  }}
                >
                  Product Name <span style={{ color: 'var(--error)' }} aria-hidden="true">*</span>
                </label>
                <input
                  id="suggest-product-name"
                  type="text"
                  className="input"
                  placeholder="e.g. Superhuman, Linear, Perplexity"
                  value={form.productName}
                  onChange={(e) => handleChange('productName', e.target.value)}
                  required
                  aria-required="true"
                  disabled={isSubmitting}
                />
              </div>

              {/* Product URL */}
              <div style={{ marginBottom: 'var(--space-4)' }}>
                <label
                  htmlFor="suggest-product-url"
                  style={{
                    display: 'block',
                    fontSize: 'var(--text-sm)',
                    fontWeight: 'var(--weight-medium)',
                    color: 'var(--text-primary)',
                    marginBottom: 'var(--space-2)',
                  }}
                >
                  Product Website{' '}
                  <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>(optional)</span>
                </label>
                <input
                  id="suggest-product-url"
                  type="url"
                  className="input"
                  placeholder="https://example.com"
                  value={form.productUrl}
                  onChange={(e) => handleChange('productUrl', e.target.value)}
                  disabled={isSubmitting}
                />
              </div>

              {/* Reason */}
              <div style={{ marginBottom: 'var(--space-6)' }}>
                <label
                  htmlFor="suggest-reason"
                  style={{
                    display: 'block',
                    fontSize: 'var(--text-sm)',
                    fontWeight: 'var(--weight-medium)',
                    color: 'var(--text-primary)',
                    marginBottom: 'var(--space-2)',
                  }}
                >
                  Why should we add it?{' '}
                  <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>(optional)</span>
                </label>
                <textarea
                  id="suggest-reason"
                  className="input"
                  placeholder="What makes it a great PM case study? What problem does it solve uniquely?"
                  value={form.reason}
                  onChange={(e) => handleChange('reason', e.target.value)}
                  rows={4}
                  disabled={isSubmitting}
                  style={{ resize: 'vertical', minHeight: 96 }}
                />
              </div>

              {/* Error */}
              {error && (
                <p
                  role="alert"
                  style={{
                    fontSize: 'var(--text-sm)',
                    color: 'var(--error)',
                    marginBottom: 'var(--space-4)',
                    padding: 'var(--space-3)',
                    background: 'var(--error-subtle)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid rgba(239,68,68,0.3)',
                  }}
                >
                  {error}
                </p>
              )}

              {/* Actions */}
              <div className="flex gap-3" style={{ justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleClose}
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isSubmitting || !form.productName.trim()}
                >
                  {isSubmitting ? 'Submitting…' : 'Submit Suggestion'}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
