import { useEffect, useRef } from "preact/hooks";
import ThemeToggle from "@/islands/ThemeToggle.tsx";

class SinuStar {
  private x_speed: number = 0;
  private y_rate: number = 0;
  private y_phase_offset: number = 0;
  private x_phase_offset: number = 0;
  private size: number = 0;
  private points: number = 0;
  private position: number = 0;

  constructor(
    x_speed: number,
    y_rate: number,
    x_phase: number,
    y_phase: number,
    points: number,
    position: number
  ) {
    this.x_speed = x_speed;
    this.y_rate = y_rate;
    this.x_phase_offset = x_phase;
    this.y_phase_offset = y_phase;
    this.size = 20;
    this.points = points;
    this.position = position;
  }

  draw(ctx: CanvasRenderingContext2D, t: number, col: string) {
    if (!ctx) return;
    const cnv = ctx.canvas;

    let starposa, starposb;

    // bottom wave
    if (this.position == 1) {
      starposa = cnv.height;
      starposb = cnv.height;
    }
    // top wave
    if (this.position == -1) {
      starposa = cnv.height;
      starposb = 0;
    }
    // bottom line
    if (this.position == 2) {
      starposa = 0;
      starposb = innerHeight - 20;
    }
    // top line
    else if (this.position == -2) {
      starposa = 0;
      starposb = 20;
    }

    const x_phase = (t * this.x_speed + this.x_phase_offset) % 1;
    const x_pos = (cnv.width + this.size) * x_phase - this.size;

    const y_phase = (t * this.y_rate * Math.PI * 2 + this.y_phase_offset) % 1;
    const y_sig = Math.sin(y_phase * Math.PI * 2);
    const y_wid = starposa / 3;
    const y_pos = starposb - this.size / 2 + y_sig * y_wid;

    //ctx.fillStyle = col;
    // ctx.fillRect(x_pos, y_pos, this.size, this.size);
    this.drawStar(
      ctx,
      x_pos + this.size / 2,
      y_pos + this.size / 2,
      this.points,
      this.size / 2,
      this.size / 4,
      col
    );
  }

  // draw star
  private drawStar(
    ctx: CanvasRenderingContext2D,
    cx: number,
    cy: number,
    points: number,
    r2: number,
    r1: number,
    col: string
  ) {
    ctx.beginPath();
    ctx.fillStyle = col;

    // start at the top point
    let step = Math.PI / points;

    for (let i = 0; i < points * 2; i++) {
      // if i / 2 = 0 draw outer radius point
      // if not draw inner radius point
      let radius = i % 2 === 0 ? r2 : r1;
      let x = cx + radius * Math.sin(i * step);
      let y = cy - radius * Math.cos(i * step);

      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }

    ctx.closePath();
    ctx.fill();
  }
}

export default function LandingSketch() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cnv = canvasRef.current;
    if (!cnv) return;

    const resizeCanvas = () => {
      cnv.width = innerWidth;
      cnv.height = innerHeight;
    };

    resizeCanvas();
    globalThis.onresize = resizeCanvas;

    // Initialize animation
    const initAnimation = async () => {
      const ctx = cnv.getContext("2d");
      if (!ctx) return;

      // Create stars
      const x_speed = 0.05;
      const y_rate = 0.01;

      // Create regular stars
      const numStars = 36;
      // wave stars
      const starsA: SinuStar[] = [],
        starsB: SinuStar[] = [];
      // flat stars
      const starsC: SinuStar[] = [],
        starsD: SinuStar[] = [];
      for (let i = 0; i < numStars; i++) {
        const phase = i / numStars;
        const offset = (i % 3) / 3;
        const y_phase = phase + offset;
        const points = Math.floor(Math.random() * (9 - 4) + 4);
        // wave vars
        const positionA = 1,
          positionB = -1;
        // line vars
        const positionC = 2,
          positionD = -2;
        starsA.push(
          new SinuStar(x_speed, y_rate, phase, y_phase, points, positionA)
        );
        starsB.push(
          new SinuStar(x_speed, y_rate, phase, y_phase, points, positionB)
        );
        starsC.push(
          new SinuStar(x_speed, y_rate, phase, y_phase, points, positionC)
        );
        starsD.push(
          new SinuStar(x_speed, y_rate, phase, y_phase, points, positionD)
        );
      }

      const drawFrame = (ms: number) => {
        const bgColour = getComputedStyle(document.documentElement)
          .getPropertyValue("--color-background")
          .trim();

        const fgColour = getComputedStyle(document.documentElement)
          .getPropertyValue("--color-muted-foreground")
          .trim();

        const accentColour = getComputedStyle(document.documentElement)
          .getPropertyValue("--color-landing")
          .trim();

        ctx.fillStyle = bgColour;
        ctx.fillRect(0, 0, cnv.width, cnv.height);

        const t = ms / 1000;

        starsA.forEach((s, i) => {
          const col = i === 0 ? accentColour : fgColour;
          s.draw(ctx, t, col);
        });

        starsB.forEach((s, i) => {
          const col = i === 0 ? accentColour : fgColour;
          s.draw(ctx, t, col);
        });

        starsC.forEach((s, i) => {
          const col = i === 0 ? accentColour : fgColour;
          s.draw(ctx, t, col);
        });

        starsD.forEach((s, i) => {
          const col = i === 0 ? accentColour : fgColour;
          s.draw(ctx, t, col);
        });

        ctx.fillStyle = getComputedStyle(document.documentElement)
          .getPropertyValue("--color-foreground")
          .trim();
        ctx.font = `20px monospace`;
        ctx.textAlign = `center`;
        ctx.textBaseline = `middle`;
        ctx.font = `30px "prestige-elite-std"`;

        const text = `thou art arriv'd at sam's chronicle.`;
        ctx.fillText(text, cnv.width / 2, cnv.height / 2);

        requestAnimationFrame(drawFrame);
      };

      requestAnimationFrame(drawFrame);
    };

    document.fonts.ready.then(() => initAnimation());

    // Cleanup
    return () => {
      globalThis.onresize = null;
    };
  }, []);

  return (
    <div style={{ position: "relative", width: "100%", height: "100vh" }}>
      <canvas ref={canvasRef}></canvas>
      <div
        style={{
          position: "absolute",
          bottom: "1rem",
          right: "1rem",
          zIndex: 20,
        }}
      >
        <ThemeToggle />
      </div>
    </div>
  );
}
