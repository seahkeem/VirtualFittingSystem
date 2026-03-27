import { Basilium3DLogoMain } from "@/shared";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useNavigate } from "react-router-dom";
import { GlassButton } from "@/shared/components/glass-button";
import { Starfield } from "@/shared/components/star";
import { useRef, useEffect } from "react";
import { rawSvgContent } from "../model/constants";
import awardAiIconColor from "@/assets/awards/award-ai-icon-color.svg";
import awardWebIconColor from "@/assets/awards/award-web-icon-color.svg";

gsap.registerPlugin(ScrollTrigger);

function HeroSection({
  onScrollToVirtualFitting,
}: {
  onScrollToVirtualFitting?: () => void;
}) {
  const navigate = useNavigate();
  const titleRef = useRef(null);
  const textRef1 = useRef(null);
  const textRef2 = useRef(null);
  const buttonRef = useRef(null);
  const scrollProgress = useRef({ value: 0 });

  const handleScheduleClick = () => navigate("/signup");
  const handleStoreClick = () => navigate("/products");

  useEffect(() => {
    gsap.set(
      [titleRef.current, textRef1.current, textRef2.current, buttonRef.current],
      {
        opacity: 0,
        y: 30,
      },
    );

    const tl = gsap.timeline({
      defaults: { duration: 1.8, ease: "power3.out" },
    });
    tl.fromTo(
      titleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1 },
      0.5,
    )
      .fromTo(
        textRef1.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1 },
        "-=1.1",
      )
      .fromTo(
        textRef2.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1 },
        "-=1.1",
      )
      .fromTo(
        buttonRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1 },
        "-=1.2",
      );

    gsap.to(scrollProgress.current, {
      value: 1,
      ease: "none",
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
    });
  }, []);

  return (
    <section className="relative flex min-h-screen w-full flex-col md:flex-row overflow-hidden">
      <Starfield theme="light" />

      <div className="order-1 flex h-[60vh] w-full items-center justify-center md:order-none md:h-screen md:w-1/3">
        <div className="w-full h-full flex items-center justify-center">
          <Basilium3DLogoMain scrollProgress={scrollProgress} />
        </div>
      </div>

      <div className="order-2 z-[2] flex flex-1 w-full flex-col justify-center md:order-none md:h-screen md:w-2/3 md:items-end">
        <div className="flex w-full items-center justify-start gap-4 md:justify-end">
          <img
            src={awardWebIconColor}
            alt="Web Award"
            className="h-[40px] w-auto md:h-[48px]"
          />
          <img
            src={awardAiIconColor}
            alt="AI Award"
            className="h-[40px] w-auto md:h-[48px]"
          />
        </div>
        <h1
          ref={titleRef}
          className="py-4 md:py-8 mb-4 whitespace-nowrap bg-clip-text text-left text-transparent font-accent bg-text-gradient-strong text-display-lg md:text-display-2xl md:text-right md:tracking-[-4px]"
        >
          Virtual Fitting System
        </h1>

        <div className="flex flex-col md:items-end mb-10">
          <p
            ref={textRef1}
            className="whitespace-nowrap bg-text-gradient bg-clip-text text-left text-body-md font-semibold text-transparent md:text-right sm:text-h4 md:text-h3 lg:text-h2"
          >
            바실리움의 다양한 IT 솔루션을 한곳에서 만나보세요.
          </p>
          <p
            ref={textRef2}
            className="whitespace-nowrap bg-text-gradient bg-clip-text text-left text-body-md font-semibold text-transparent md:text-right sm:text-h4 md:text-h3 lg:text-h2"
          >
            지금, 비즈니스의 성장을 시작하세요.
          </p>
        </div>

        <div
          ref={buttonRef}
          className="flex w-full flex-row flex-nowrap items-center justify-start gap-4 md:justify-end"
        >
          <GlassButton onClick={handleScheduleClick} size="large">
            입점상담
          </GlassButton>
          <GlassButton onClick={handleStoreClick} size="large">
            스토어
          </GlassButton>
        </div>
      </div>

      <div
        className="absolute bottom-30 left-1/2 z-10 -translate-x-1/2 cursor-pointer hidden md:block animate-bounce-soft text-basilium-100 [&_svg]:w-10 [&_svg]:h-auto [&_svg]:stroke-[1.5]"
        dangerouslySetInnerHTML={{ __html: rawSvgContent }}
        onClick={onScrollToVirtualFitting}
      />
    </section>
  );
}

export { HeroSection };
