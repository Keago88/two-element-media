const mark = {
  left: "16,3 31,31 1,31",
  right: "32,9 47,37 17,37",
} as const;

export function AnimGrow() {
  return (
    <svg
      className="work-anim work-anim-grow h-auto w-[min(92vw,28rem)] text-white sm:w-[min(56vw,38rem)] lg:w-[42rem]"
      viewBox="0 0 480 360"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      overflow="visible"
      aria-hidden="true"
    >
      <g
        className="work-grow-orbits"
        stroke="currentColor"
        strokeWidth="0.7"
        transform="translate(240 180)"
      >
        <circle className="work-grow-orbit-a" r="78" pathLength={1} />
        <circle className="work-grow-orbit-b" r="118" pathLength={1} />
        <circle className="work-grow-orbit-c" r="158" pathLength={1} />
        <g className="work-grow-ticks">
          <line x1="0" y1="-158" x2="0" y2="-148" />
          <line x1="158" y1="0" x2="148" y2="0" />
          <line x1="0" y1="158" x2="0" y2="148" />
          <line x1="-158" y1="0" x2="-148" y2="0" />
        </g>
      </g>

      <g className="work-grow-mark">
        <g transform="translate(240 180) scale(5.15) translate(-24 -20)">
          <polygon
            points={mark.left}
            stroke="currentColor"
            strokeWidth="1.15"
            strokeLinejoin="miter"
            vectorEffect="non-scaling-stroke"
          />
          <polygon
            points={mark.right}
            stroke="currentColor"
            strokeWidth="1.15"
            strokeLinejoin="miter"
            vectorEffect="non-scaling-stroke"
          />
        </g>
      </g>
    </svg>
  );
}
