export default function HomeButton() {
  return (
    <a
      href="/blog"
      class="rounded-md p-2 bg-transparent border border-primary text-foreground hover:var(--color-muted-foreground)"
      aria-label="Back to index"
    >
      ← back
    </a>
  );
}
