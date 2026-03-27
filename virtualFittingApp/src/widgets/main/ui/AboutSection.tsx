import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { HOODIE_IMAGES } from "../model/constants";

gsap.registerPlugin(ScrollTrigger);

const imageTrack = [...HOODIE_IMAGES, ...HOODIE_IMAGES];

function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const textElements = [headlineRef.current, descRef.current];

    gsap.fromTo(
      textElements,
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        stagger: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center+=100",
          toggleActions: "play none none reverse",
        },
      },
    );
    const track = trackRef.current;
    if (track) {
      gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth + 200),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full min-h-screen justify-center flex flex-col items-center gap-8"
    >
      <div className="flex flex-col items-center gap-6 md:gap-8 px-6 text-center">
        <h2 className="text-h4 md:text-h3 font-semibold text-basilium-blue">
          Virtual Fitting System &
          <br className="block md:hidden" /> Brand Onboarding Website
        </h2>
        <div
          ref={headlineRef}
          className="text-display-lg font-bold text-basilium-100 text-center leading-tight "
        >
          공식입점 브랜드부터,
          <br className="md:hidden" />
          다양한 스토어를.
        </div>

        <div ref={descRef} className="flex flex-col items-center w-full">
          <p className="max-w-4xl text-body-lg md:text-h4 font-semibold text-basilium-100 text-center leading-relaxed mb-8 md:mb-32 break-keep">
            공식 계약을 통해 입점한 검증된 브랜드의 제품만을 취급하여 고객들에게
            확실한 정품과 최상의 경험을 제공합니다. 매장에서 직접 입어보는 듯한
            경험을, 화면 속에서도 손끝 하나로 완성하세요. 브랜드 오너에게
            안정적인 판매 채널을, 고객에게 믿고 구매할 수 있는 안전한 쇼핑
            환경을 제공하며, 모든 취향을 만족시킬 수 있는 무한한 선택의 폭을
            제안합니다. 지금, 비즈니스의 성장을 시작하세요.
          </p>
        </div>
      </div>

      <div className="w-full mt-12 md:mt-0 flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div ref={trackRef} className="flex gap-8 md:gap-16 whitespace-nowrap">
          {imageTrack.map((hoodie, index) => (
            <img
              key={index}
              src={hoodie.src}
              alt={hoodie.name}
              className="w-[120px] h-[162px] md:w-[200px] md:h-[270px] object-cover rounded-lg flex-shrink-0 pointer-events-none select-none"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export { AboutSection };
