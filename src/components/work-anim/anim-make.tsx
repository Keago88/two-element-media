const mark = {
  left: "16,3 31,31 1,31",
  right: "32,9 47,37 17,37",
} as const;

export function AnimMake() {
  return (
    <svg
      className="work-anim work-anim-make h-auto w-[min(92vw,28rem)] text-white sm:w-[min(56vw,38rem)] lg:w-[42rem]"
      viewBox="0 0 480 360"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      overflow="visible"
      aria-hidden="true"
    >
      <g className="work-make-guides" stroke="currentColor" strokeWidth="0.7">
        <path d="M46 38h22M46 38v22" />
        <path d="M434 38h-22M434 38v22" />
        <path d="M46 322h22M46 322v-22" />
        <path d="M434 322h-22M434 322v-22" />
      </g>

      <g className="work-make-shards" stroke="currentColor" strokeWidth="1" strokeLinejoin="miter">
        <polygon className="work-make-shard-a" points="86,58 108,96 64,96" />
        <polygon className="work-make-shard-b" points="392,78 418,118 366,112" />
        <polygon className="work-make-shard-c" points="214,292 246,328 186,324" />
      </g>

      <g transform="translate(240 180) scale(5.15) translate(-24 -20)">
        <polygon
          className="work-make-left work-stroke"
          points={mark.left}
          stroke="currentColor"
          strokeWidth="1.15"
          strokeLinejoin="miter"
          pathLength={1}
        />
        <polygon
          className="work-make-right work-stroke"
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
