import LandingSketch from "@/islands/LandingSketch.tsx";

export default function LandingPage() {
  return (
    <div
      style={{
        position: "relative",
        width: "50%",
        height: "100vh",
        color: "pink",
        background: "deeppink",
      }}
    >
      <LandingSketch />
      <a
        href="/blog"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 10,
          display: "block",
          cursor: "pointer",
        }}
        onClick={(e) => {
          // Don't navigate if clicking on the theme toggle (or its children)
          const target = e.target as HTMLElement;
          if (target.closest('button[aria-label*="Switch to"]')) {
            e.preventDefault();
          }
        }}
      >
        {/* Transparent overlay */}
      </a>
    </div>
  );
}
