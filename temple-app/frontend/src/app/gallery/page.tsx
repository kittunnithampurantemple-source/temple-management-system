// Replace placeholder blocks with real temple photography.
const placeholders = Array.from({ length: 8 }, (_, i) => i);

export default function GalleryPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <h1 className="font-display text-4xl text-sanctum mb-6">Gallery</h1>
      <div className="threshold-border mb-8 w-32" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {placeholders.map((i) => (
          <div key={i} className="aspect-square bg-cream-dark border border-brass/30 rounded-sm flex items-center justify-center text-ink/30 text-sm">
            Photo {i + 1}
          </div>
        ))}
      </div>
    </div>
  );
}
