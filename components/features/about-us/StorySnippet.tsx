import type { ReactNode } from "react";

interface SnippetProps {
  title: string;
  time: string;
  story: string;
  style: "left" | "right";
  icon: ReactNode;
}

function StorySnippet({ title, time, story, style, icon }: SnippetProps) {
  const isLeft = style === "left";

  return (
    <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
      {/*
        Mobile: [line | content]
        md+:    [left content | line | right content]
      */}
      <div className="grid grid-cols-[3rem_1fr] md:grid-cols-[1fr_3rem_1fr]">
        {/* Center icon + vertical line */}
        <div className="col-start-1 row-start-1 flex flex-col items-center md:col-start-2">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-accent">
            {icon}
          </div>
          <div className="w-0.5 flex-1 bg-secondary" />
        </div>

        {/* Story content: sits on the left or right of the line */}
        <div
          className={`row-start-1 col-start-2 pb-2 pl-6 text-left md:pb-0 ${
            isLeft
              ? "md:col-start-1 md:items-end md:pl-0 md:pr-10 md:text-right"
              : "md:col-start-3 md:items-start md:pl-10 md:pr-0 md:text-left"
          } flex flex-col gap-3 font-['Open_Sans']`}
        >
          <h3 className="sr-only text-secondary">{title}</h3>

          <p className="text-accent text-lg font-bold md:text-xl">{time}</p>

          <p className="max-w-xl text-base font-semibold leading-relaxed text-[#ACA790] md:text-lg">
            {story}
          </p>
        </div>
      </div>
    </div>
  );
}

export default StorySnippet;