const mark = {
  left: "16,3 31,31 1,31",
  right: "32,9 47,37 17,37",
} as const;

const cols = 7;
const rows = 5;
const grid = { x: 86, y: 58, w: 308, h: 244 };

function cell(col: number, row: number) {
  const w = grid.w / cols;
  const h = grid.h / rows;
  return {
    x: grid.x + col * w,
    y: grid.y + row * h,
    w,
    h,
  };
}

export function AnimShip() {
  const cells = Array.from({ length: cols * rows }, (_, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    return { key: `${col}-${row}`, ...cell(col, row), header: row === 0 };
  });

  return (
    <svg
      className="work-anim work-anim-ship h-auto w-[min(92vw,28rem)] text-white sm:w-[min(56vw,38rem)] lg:w-[42rem]"
      viewBox="0 0 480 360"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      overflow="visible"
      aria-hidden="true"
    >
      <g className="work-ship-grid" stroke="currentColor" strokeWidth="0.7">
        <rect x={grid.x} y={grid.y} width={grid.w} height={grid.h} />
        {cells.map((item) => (
          <rect
            key={item.key}
            x={item.x}
            y={item.y}
            width={item.w}
            height={item.h}
            className={item.header ? "work-ship-head" : undefined}
          />
        ))}
      </g>

      <g className="work-ship-lift" stroke="currentColor" strokeWidth="1">
        <rect {...cell(2, 2)} />
        <rect {...cell(4, 1)} />
        <rect {...cell(3, 3)} />
      </g>

      <g transform="translate(240 180) scale(5.15) translate(-24 -20)">
        <polygon
          className="work-ship-mark-left work-stroke-late"
          points={mark.left}
          stroke="currentColor"
          strokeWidth="1.15"
          strokeLinejoin="miter"
          pathLength={1}
        />
        <polygon
          className="work-ship-mark-right work-stroke-late"
          points={mark.right}
          stroke="currentColor"
          strokeWidth="1.15"
          strokeLinejoin="miter"
          pathLength={1}
        />
      </g>
    </svg>
  );
}
