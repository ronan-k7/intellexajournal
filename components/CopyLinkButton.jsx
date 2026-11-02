'use client';

import { useState } from 'react';
import { Link2, Check } from 'lucide-react';

// Copies the given URL to the clipboard.
export default function CopyLinkButton({ url, className = '' }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.prompt('Copy this link:', url);
    }
  };

  return (
    <button type="button" onClick={copy} aria-label="Copy link" title={copied ? 'Copied!' : 'Copy link'} className={className}>
      {copied ? <Check className="h-3.5 w-3.5" /> : <Link2 className="h-3.5 w-3.5" />}
    </button>
  );
}
