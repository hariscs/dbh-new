'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';

type DrugIndexItem = { href: string; title: string };

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const SKELETON_COUNT = 12;

export default function DrugIndexGlossary({
  initialLetter,
  initialItems,
}: {
  initialLetter: string;
  initialItems: DrugIndexItem[];
}) {
  const [letter, setLetter] = useState(initialLetter);
  const [items, setItems] = useState(initialItems);
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);
  const pending = useRef<string | null>(null);
  const controller = useRef<AbortController | null>(null);
  const buttonRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  async function loadLetter(next: string) {
    if (pending.current === next) return;
    pending.current = next;
    controller.current?.abort();
    const ac = new AbortController();
    controller.current = ac;

    setLetter(next);
    setLoading(true);
    setFailed(false);

    try {
      const res = await fetch(`/api/drug-index-letter?letter=${next}`, { signal: ac.signal });
      const payload = (await res.json()) as { success?: boolean; items?: DrugIndexItem[] };
      if (pending.current !== next) return;
      if (payload?.success && Array.isArray(payload.items)) {
        setItems(payload.items);
      } else {
        setFailed(true);
        setItems([]);
      }
    } catch (err) {
      if (err instanceof DOMException && err.name === 'AbortError') return;
      if (pending.current !== next) return;
      setFailed(true);
      setItems([]);
    } finally {
      if (pending.current === next) {
        pending.current = null;
        controller.current = null;
        setLoading(false);
      }
    }
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    const keys = ['ArrowLeft', 'ArrowRight', 'Home', 'End'];
    if (!keys.includes(e.key)) return;
    const index = ALPHABET.indexOf(letter);
    if (index === -1) return;
    e.preventDefault();

    let next = index;
    if (e.key === 'ArrowLeft') next = (index - 1 + ALPHABET.length) % ALPHABET.length;
    else if (e.key === 'ArrowRight') next = (index + 1) % ALPHABET.length;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = ALPHABET.length - 1;

    const nextLetter = ALPHABET[next];
    buttonRefs.current[nextLetter]?.focus();
    loadLetter(nextLetter);
  }

  return (
    <div className="index-glossary" data-skeleton-count={SKELETON_COUNT}>
      <div
        className="index-glossary__alphabet"
        role="tablist"
        aria-label="Filter index by first letter"
        onKeyDown={onKeyDown}
      >
        {ALPHABET.map((l) => (
          <button
            key={l}
            ref={(el) => {
              buttonRefs.current[l] = el;
            }}
            type="button"
            role="tab"
            className={l === letter ? 'index-glossary__letter active' : 'index-glossary__letter'}
            id={`index-glossary-tab-${l}`}
            aria-selected={l === letter}
            aria-controls="index-glossary-results"
            tabIndex={l === letter ? 0 : -1}
            onClick={() => l !== letter && loadLetter(l)}
          >
            {l}
          </button>
        ))}
      </div>
      <div
        className={loading ? 'index-glossary__results is-loading' : 'index-glossary__results'}
        id="index-glossary-results"
        role="tabpanel"
        aria-live="polite"
        aria-busy={loading}
        aria-labelledby={`index-glossary-tab-${letter}`}
      >
        {loading ? (
          <ul className="index-glossary__grid index-glossary__grid--skeleton" aria-hidden="true">
            {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
              <li key={i} className="index-glossary__item index-glossary__item--skeleton">
                <span className="index-glossary__shimmer" />
              </li>
            ))}
          </ul>
        ) : failed ? (
          <p className="index-glossary__empty">No pages found.</p>
        ) : items.length > 0 ? (
          <ul className="index-glossary__grid">
            {items.map((item) => (
              <li key={item.href} className="index-glossary__item">
                <Link className="index-glossary__link" href={item.href}>
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="index-glossary__empty">No pages found.</p>
        )}
      </div>
    </div>
  );
}
