"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  Sparkles, Phone, Star, ChevronDown, ChevronLeft, ChevronRight, Clock, MapPin,
  Droplets, Wrench, CreditCard, Headphones, ShieldCheck,
  MessageCircle, Paintbrush, Gauge, CheckCircle2,
  Mail, BadgeCheck,
  Building2, Package, FileText, Users,
  TrendingUp, Globe, Car, Bot, ArrowRight, RotateCcw, X, ChevronUp,
} from "lucide-react";

export default function Home() {
  const phoneNumber = "051-326-9316";
  const blogLink = "https://blog.naver.com/make-new-car/";
  const naverPlaceLink = "https://map.naver.com/p/entry/place/2003734983";
  const [scrollProgress, setScrollProgress] = useState(0);
  const [heroVisible, setHeroVisible] = useState(false);
  const [gallerySlide, setGallerySlide] = useState(0);
  const [caseSlide, setCaseSlide] = useState(0);

  // 챗봇 서비스 견적
  const [chatOpen, setChatOpen] = useState(false);
  const [chatStep, setChatStep] = useState(0);
  const [chatCategory, setChatCategory] = useState("");
  const [chatSub, setChatSub] = useState("");
  const [chatHistory, setChatHistory] = useState<{ role: "bot" | "user"; text: string }[]>([]);
  const chatScrollRef = useRef<HTMLDivElement>(null);

  const chatData: Record<string, { options: { label: string; value: string }[]; question: string }> = {
    root: {
      question: "어떤 서비스를 찾으시나요?",
      options: [
        { label: "✨ 외부 광택", value: "광택" },
        { label: "💨 스팀세차", value: "스팀세차" },
        { label: "🧹 실내세차", value: "실내세차" },
        { label: "🛡️ 유리막코팅", value: "유리막코팅" },
      ],
    },
    광택: {
      question: "차량 크기를 선택해주세요.",
      options: [
        { label: "소형차 (모닝·아반떼 등)", value: "소형" },
        { label: "중형·SUV (쏘나타·투싼 등)", value: "중형" },
        { label: "대형·수입차", value: "대형" },
      ],
    },
    스팀세차: {
      question: "차량 크기를 선택해주세요.",
      options: [
        { label: "소형차 (모닝·아반떼 등)", value: "소형" },
        { label: "중형·SUV (쏘나타·투싼 등)", value: "중형" },
        { label: "대형·수입차", value: "대형" },
      ],
    },
    실내세차: {
      question: "차량 크기를 선택해주세요.",
      options: [
        { label: "소형차 (모닝·아반떼 등)", value: "소형" },
        { label: "중형·SUV (쏘나타·투싼 등)", value: "중형" },
        { label: "대형·수입차", value: "대형" },
      ],
    },
    유리막코팅: {
      question: "차량 크기를 선택해주세요.",
      options: [
        { label: "소형차 (모닝·아반떼 등)", value: "소형" },
        { label: "중형·SUV (쏘나타·투싼 등)", value: "중형" },
        { label: "대형·수입차", value: "대형" },
      ],
    },
  };

  const chatResults: Record<string, { title: string; price: string; note: string }> = {
    "광택_소형": { title: "소형차 외부 광택", price: "15~20만원대", note: "컴파운드+폴리싱 · 약 3~4시간 소요" },
    "광택_중형": { title: "중형·SUV 외부 광택", price: "20~30만원대", note: "컴파운드+폴리싱 · 약 4~6시간 소요" },
    "광택_대형": { title: "대형·수입차 외부 광택", price: "30~50만원대", note: "프리미엄 약품 사용 · 당일 상담" },
    "스팀세차_소형": { title: "소형차 스팀세차", price: "3~5만원대", note: "고온 스팀 살균 · 약 1시간 소요" },
    "스팀세차_중형": { title: "중형·SUV 스팀세차", price: "5~7만원대", note: "고온 스팀 살균 · 약 1~2시간 소요" },
    "스팀세차_대형": { title: "대형·수입차 스팀세차", price: "7~10만원대", note: "고온 스팀 살균 · 꼼꼼 작업" },
    "실내세차_소형": { title: "소형차 실내세차", price: "5~8만원대", note: "시트·매트·천장 클리닝 포함" },
    "실내세차_중형": { title: "중형·SUV 실내세차", price: "8~12만원대", note: "시트·매트·천장 클리닝 포함" },
    "실내세차_대형": { title: "대형·수입차 실내세차", price: "12~18만원대", note: "가죽 시트 전용 케어 포함" },
    "유리막코팅_소형": { title: "소형차 유리막코팅", price: "30~50만원대", note: "광택 포함 · 지속 6개월~1년" },
    "유리막코팅_중형": { title: "중형·SUV 유리막코팅", price: "50~80만원대", note: "광택 포함 · 지속 6개월~1년" },
    "유리막코팅_대형": { title: "대형·수입차 유리막코팅", price: "80~120만원대", note: "프리미엄 코팅 · 당일 상담" },
  };

  const handleChatSelect = useCallback((value: string) => {
    if (chatStep === 0) {
      setChatHistory((prev) => [
        ...prev,
        { role: "bot", text: chatData.root.question },
        { role: "user", text: chatData.root.options.find((o) => o.value === value)?.label || value },
      ]);
      setChatCategory(value);
      setChatStep(1);
    } else if (chatStep === 1) {
      const catData = chatData[chatCategory];
      setChatHistory((prev) => [
        ...prev,
        { role: "bot", text: catData?.question || "" },
        { role: "user", text: catData?.options.find((o) => o.value === value)?.label || value },
      ]);
      setChatSub(value);
      setChatStep(2);
    }
  }, [chatStep, chatCategory, chatData]);

  const resetChat = useCallback(() => {
    setChatStep(0);
    setChatCategory("");
    setChatSub("");
    setChatHistory([]);
  }, []);

  const toggleChat = useCallback(() => {
    setChatOpen((prev) => !prev);
  }, []);

  // 챗봇 메시지 변경 시 스크롤 아래로
  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [chatHistory, chatStep]);

  const galleryImages = [
    "/gallery-01.webp",
    "/gallery-02.webp",
    "/gallery-03.webp",
    "/gallery-04.webp",
  ];

  const workCases = [
    {
      name: "마티즈 외부 광택",
      category: "외부 광택",
      service: "컴파운드 + 폴리싱 전체 작업",
      text: "오래된 차인데 광택 받으니까 새 차처럼 반짝반짝해졌어요. 잔기스가 다 사라졌습니다. 역시 새차만들기!",
      highlight: "새 차처럼 반짝반짝",
      stat: "잔기스 제거",
      image: "/gallery-01.webp",
    },
    {
      name: "카니발 실내세차",
      category: "실내세차",
      service: "시트·매트·천장 전체 클리닝",
      text: "아이들이 타서 과자 부스러기, 음료 얼룩이 많았는데 깔끔하게 새것처럼 만들어주셨어요. 냄새도 완전히 사라졌습니다.",
      highlight: "깔끔하게 새것처럼",
      stat: "냄새 완전 제거",
      image: "/gallery-02.webp",
    },
    {
      name: "쏘나타 유리막코팅",
      category: "유리막코팅",
      service: "광택 + 유리막코팅 풀패키지",
      text: "비 올 때 물이 쫙쫙 빠지니까 세차 횟수가 확 줄었어요. 코팅 후 6개월째인데 아직도 광이 살아있습니다.",
      highlight: "6개월째 광이 살아있습니다",
      stat: "6개월 유지",
      image: "/gallery-03.webp",
    },
    {
      name: "팰리세이드 스팀세차",
      category: "스팀세차",
      service: "고온 스팀 살균 + 실내 탈취",
      text: "반려견을 태우다 보니 냄새가 심했는데, 스팀세차 후 냄새가 완전히 없어졌어요. 살균까지 되니 안심이 됩니다.",
      highlight: "냄새가 완전히 없어졌어요",
      stat: "살균 탈취",
      image: "/gallery-04.webp",
    },
    {
      name: "포터 외부 광택",
      category: "외부 광택",
      service: "화물차 전용 광택 작업",
      text: "영업용 포터라 관리가 안 됐는데, 광택 한 번 받으니 손님들이 새 차 바꿨냐고 물어봅니다. 가격도 합리적이에요.",
      highlight: "새 차 바꿨냐고",
      stat: "영업차량 광택",
      image: "/gallery-01.webp",
    },
    {
      name: "산타페 실내+외부 풀케어",
      category: "풀케어",
      service: "외부광택 + 실내세차 + 스팀세차",
      text: "풀케어로 맡겼더니 안팎으로 완전 새 차가 됐어요. 한 곳에서 다 해결되니 편하고, 작업도 꼼꼼합니다.",
      highlight: "안팎으로 완전 새 차",
      stat: "풀케어 패키지",
      image: "/gallery-02.webp",
    },
  ];

  useEffect(() => {
    AOS.init({ duration: 800, once: true, easing: "ease-out-cubic", offset: 80 });

    const handleScroll = () => {
      const total = document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setScrollProgress(height > 0 ? total / height : 0);
    };
    window.addEventListener("scroll", handleScroll);
    const timer = setTimeout(() => setHeroVisible(true), 200);

    const galleryInterval = setInterval(() => {
      setGallerySlide((prev) => (prev + 1) % galleryImages.length);
    }, 4000);

    const caseInterval = setInterval(() => {
      setCaseSlide((prev) => (prev + 1) % workCases.length);
    }, 5000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
      clearInterval(galleryInterval);
      clearInterval(caseInterval);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const nextCase = useCallback(() => setCaseSlide((prev) => (prev + 1) % workCases.length), [workCases.length]);
  const prevCase = useCallback(() => setCaseSlide((prev) => (prev - 1 + workCases.length) % workCases.length), [workCases.length]);

  const serviceCategories = [
    { type: "외부 광택", spec: "컴파운드+폴리싱", usage: "잔기스 제거, 광택 복원" },
    { type: "스팀세차", spec: "고온 스팀 살균", usage: "외부 세차, 엔진룸" },
    { type: "실내세차", spec: "시트·매트·천장", usage: "실내 클리닝, 탈취" },
    { type: "유리막코팅", spec: "프리미엄 코팅제", usage: "발수, 광택 유지" },
    { type: "언더코팅", spec: "하부 방청 처리", usage: "부식 방지, 수명 연장" },
  ];

  return (
    <div className="min-h-screen bg-[#121212] text-white selection:bg-blue-500 selection:text-white overflow-x-hidden">
      {/* Scroll Progress */}
      <div
        className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-blue-600 to-blue-400 z-[60] transition-all duration-150"
        style={{ width: `${scrollProgress * 100}%` }}
      />

      {/* ━━━ 1. HERO ━━━ */}
      <section className="relative min-h-[100dvh] flex flex-col justify-center items-center text-center px-5 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero-bg1.webp"
            alt="새차만들기 프리미엄 광택"
            fill
            className="object-cover scale-105"
            priority
          />
          <div className="absolute inset-0 bg-black/65" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[#121212]" />
        </div>
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-600/8 rounded-full blur-[180px] z-0 animate-glow-pulse" />

        {heroVisible && (
          <div className="relative z-10 w-full max-w-5xl mx-auto">
            <div className="animate-slide-up inline-flex items-center gap-2 px-5 py-2.5 mb-8 rounded-full border border-blue-500/30 bg-blue-500/5 backdrop-blur-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500" />
              </span>
              <span className="text-sm font-bold text-blue-400 tracking-wider">부산 사상 자동차 광택·세차 전문</span>
            </div>

            <h1 className="animate-slide-up-delay-1 text-[2.75rem] sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.12] mb-5 tracking-tight">
              광택·세차 전문
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-700">
                새차만들기
              </span>
            </h1>

            <p className="animate-slide-up-delay-2 text-gray-200 text-xl md:text-2xl font-bold mb-2">
              광택 · 스팀세차 · 실내세차 · 유리막코팅
            </p>
            <p className="animate-slide-up-delay-2 text-gray-400 text-base md:text-lg mb-10 break-keep">
              꼼꼼한 작업으로 새 차처럼!<br className="sm:hidden" />부산 사상구 세차·광택 전문점
            </p>

            <div className="animate-slide-up-delay-3 grid grid-cols-3 gap-3 max-w-lg mx-auto mb-10">
              {[
                { icon: <Sparkles className="w-7 h-7" />, title: "프리미엄 광택" },
                { icon: <Droplets className="w-7 h-7" />, title: "스팀세차" },
                { icon: <ShieldCheck className="w-7 h-7" />, title: "유리막코팅" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-white/10 backdrop-blur-md rounded-2xl p-4 md:p-5 flex flex-col items-center gap-2 border border-white/10 hover:border-blue-500/40 transition-all duration-300"
                >
                  <span className="text-blue-500">{item.icon}</span>
                  <span className="text-white font-bold text-base md:text-lg">{item.title}</span>
                </div>
              ))}
            </div>

            <div className="animate-slide-up-delay-4 flex flex-wrap justify-center gap-3 md:gap-5">
              {[
                { icon: <BadgeCheck className="w-4 h-4" />, text: "전문 기술력" },
                { icon: <ShieldCheck className="w-4 h-4" />, text: "프리미엄 약품" },
                { icon: <MapPin className="w-4 h-4" />, text: "부산 사상구" },
              ].map((badge, i) => (
                <div key={i} className="flex items-center gap-1.5 text-gray-300 text-sm md:text-base">
                  <span className="text-blue-500">{badge.icon}</span>
                  <span className="font-medium">{badge.text}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="absolute bottom-8 z-10">
          <ChevronDown className="text-gray-500 w-8 h-8 animate-bounce" />
        </div>
      </section>

      {/* ━━━ 2. WHY CHOOSE US ━━━ */}
      <section className="py-24 px-5 bg-[#181818]">
        <div className="max-w-5xl mx-auto">
          <div data-aos="fade-up" className="text-center mb-16">
            <p className="text-blue-500 text-sm font-bold tracking-widest mb-4">WHY CHOOSE US?</p>
            <h2 className="text-[1.65rem] sm:text-4xl lg:text-[2.75rem] font-bold leading-snug mb-4 break-keep">
              왜 <span className="text-blue-500">새차만들기</span>를<br className="md:hidden" />선택해야 할까요?
            </h2>
            <p className="text-gray-400 text-[15px] md:text-lg break-keep">
              꼼꼼한 작업과 프리미엄 약품으로<br className="sm:hidden" />새 차처럼 만들어드립니다
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
            {[
              { icon: <Sparkles className="w-6 h-6 md:w-7 md:h-7" />, title: "전문 기술력", desc: "숙련된 기술자의 꼼꼼한 작업" },
              { icon: <Droplets className="w-6 h-6 md:w-7 md:h-7" />, title: "프리미엄 약품", desc: "검증된 고급 세차·코팅 약품" },
              { icon: <ShieldCheck className="w-6 h-6 md:w-7 md:h-7" />, title: "깔끔한 마감", desc: "디테일까지 놓치지 않는 마무리" },
              { icon: <Car className="w-6 h-6 md:w-7 md:h-7" />, title: "전 차종 대응", desc: "소형차~대형·수입차 모두 가능" },
            ].map((item, i) => (
              <div
                key={i}
                data-aos="fade-up"
                data-aos-delay={i * 100}
                className="bg-black p-4 md:p-6 rounded-2xl border border-gray-800 hover:border-blue-500/40 hover:bg-gray-900/30 transition-all duration-300 group"
              >
                <div className="w-11 h-11 md:w-14 md:h-14 bg-gray-800 rounded-xl md:rounded-2xl flex items-center justify-center mb-4 text-blue-500 group-hover:scale-110 transition-all duration-300 shadow-[0_0_20px_rgba(59,130,246,0.08)]">
                  {item.icon}
                </div>
                <h3 className="text-[15px] md:text-lg font-bold mb-1.5 break-keep">{item.title}</h3>
                <p className="text-gray-400 text-xs md:text-[15px] leading-relaxed break-keep">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div data-aos="fade-up" className="text-center mt-10">
            <a
              href={`tel:${phoneNumber.replace(/-/g, "")}`}
              className="inline-flex items-center gap-2.5 bg-blue-600 text-white font-bold text-base md:text-lg py-4 px-10 rounded-full hover:scale-105 active:scale-95 transition-all duration-300 shadow-[0_0_30px_rgba(37,99,235,0.25)]"
            >
              <Phone className="w-5 h-5" />
              지금 바로 전화하기
            </a>
          </div>

          {/* Photo Gallery Slider */}
          <div data-aos="fade-up" className="mt-14">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3">
              {(() => {
                const total = galleryImages.length;
                return [0, 1, 2].map((offset) => {
                  const idx = (gallerySlide + offset) % total;
                  return (
                    <div
                      key={`${gallerySlide}-${offset}`}
                      className={`relative aspect-[4/3] rounded-xl overflow-hidden group ${offset === 2 ? "hidden md:block" : ""}`}
                    >
                      <Image
                        src={galleryImages[idx]}
                        alt={`작업 사진 ${idx + 1}`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  );
                });
              })()}
            </div>
            <div className="flex justify-center gap-2 mt-5">
              {galleryImages.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setGallerySlide(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    gallerySlide === i ? "bg-blue-500 w-5" : "bg-white/25"
                  }`}
                />
              ))}
            </div>
          </div>

          <div data-aos="fade-up" className="text-center mt-8">
            <p className="text-base md:text-xl font-bold text-white mb-1.5 break-keep">
              꼼꼼한 작업으로 새 차처럼!<br className="sm:hidden" />광택·세차·코팅 전문
            </p>
            <p className="text-blue-500 font-bold text-sm md:text-lg break-keep">
              새차만들기 · 부산 사상구
            </p>
          </div>
        </div>
      </section>

      {/* ━━━ 3. SERVICE MENU ━━━ */}
      <section className="py-24 px-5 bg-[#121212]">
        <div className="max-w-5xl mx-auto">
          <div data-aos="fade-up" className="text-center mb-14">
            <p className="text-blue-500 text-sm font-bold tracking-widest mb-4">SERVICE MENU</p>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold leading-snug">
              <span className="text-blue-500">전문 서비스</span> 라인업
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6 items-stretch mb-10">
            <div data-aos="fade-right" className="rounded-2xl border border-gray-800 bg-[#1a1a1a] overflow-hidden flex flex-col">
              <table className="w-full text-left flex-1">
                <thead>
                  <tr className="bg-[#1a1a1a] text-blue-500">
                    <th className="p-4 md:p-5 border-b border-gray-800 text-sm md:text-base font-bold">서비스</th>
                    <th className="p-4 md:p-5 border-b border-gray-800 text-sm md:text-base font-bold hidden sm:table-cell">방식</th>
                    <th className="p-4 md:p-5 border-b border-gray-800 text-sm md:text-base font-bold">효과</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {serviceCategories.map((row, i) => (
                    <tr key={i} className="hover:bg-gray-900/50 transition-colors">
                      <td className="p-4 md:p-5 text-blue-500 font-bold text-sm md:text-base">{row.type}</td>
                      <td className="p-4 md:p-5 text-gray-300 text-sm md:text-[15px] hidden sm:table-cell">{row.spec}</td>
                      <td className="p-4 md:p-5 text-gray-300 text-sm md:text-[15px]">{row.usage}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div data-aos="fade-left" className="bg-[#1a1a1a] p-6 md:p-7 rounded-2xl border border-gray-800 relative flex flex-col">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-5 py-1.5 rounded-full font-bold text-xs md:text-sm">
                전 차종 대응
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-5 text-center mt-3">
                소형차부터 대형 수입차까지
              </h3>
              <div className="grid grid-cols-2 gap-6 flex-1">
                <div>
                  <h4 className="text-blue-500 font-bold mb-3 flex items-center gap-1.5 text-sm md:text-base">
                    <Car className="w-4 h-4 md:w-5 md:h-5" /> 국산차
                  </h4>
                  <ul className="text-gray-400 text-sm space-y-1.5 list-disc list-inside">
                    <li>현대 · 기아</li>
                    <li>르노 · 쌍용</li>
                    <li>포터 · 봉고 등</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-blue-500 font-bold mb-3 flex items-center gap-1.5 text-sm md:text-base">
                    <Globe className="w-4 h-4 md:w-5 md:h-5" /> 수입차
                  </h4>
                  <ul className="text-gray-400 text-sm space-y-1.5 list-disc list-inside">
                    <li>BMW · 벤츠</li>
                    <li>아우디 · 폭스바겐</li>
                    <li>테슬라 · 볼보</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━ 3-2. PRICING ━━━ */}
      <section className="py-24 px-5 bg-[#181818]">
        <div className="max-w-5xl mx-auto">
          <div data-aos="fade-up" className="text-center mb-14">
            <p className="text-blue-500 text-sm font-bold tracking-widest mb-4">PRICING</p>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold leading-snug">
              <span className="text-blue-500">합리적인</span> 가격 안내
            </h2>
            <p className="text-gray-400 text-sm mt-3 break-keep">
              차량 크기와 서비스에 따라<br className="sm:hidden" />맞춤 견적을 안내해드립니다
            </p>
          </div>

          <div data-aos="fade-up" className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 mb-8">
            {[
              { icon: <Sparkles className="w-8 h-8" />, title: "외부 광택", desc: "컴파운드+폴리싱\n잔기스 제거·광택 복원", highlight: "새 차 같은 광택" },
              { icon: <Droplets className="w-8 h-8" />, title: "스팀세차", desc: "고온 스팀 살균\n외부·엔진룸 세차", highlight: "살균·탈취 효과" },
              { icon: <ShieldCheck className="w-8 h-8" />, title: "유리막코팅", desc: "프리미엄 코팅제\n발수·광택 장기 유지", highlight: "6개월~1년 유지" },
            ].map((item, i) => (
              <div key={i} className="bg-black p-6 md:p-8 rounded-2xl border border-gray-800 hover:border-blue-500/30 transition-all text-center group">
                <div className="w-16 h-16 bg-gray-900 rounded-2xl flex items-center justify-center mx-auto mb-5 text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                  {item.icon}
                </div>
                <h3 className="text-lg md:text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm whitespace-pre-line mb-4">{item.desc}</p>
                <span className="inline-block bg-blue-600/10 text-blue-500 font-bold text-sm px-4 py-1.5 rounded-full border border-blue-600/20">
                  {item.highlight}
                </span>
              </div>
            ))}
          </div>

          <div data-aos="fade-up" className="text-center">
            <a
              href={`tel:${phoneNumber.replace(/-/g, "")}`}
              className="inline-flex items-center gap-2.5 bg-blue-600 text-white font-bold text-base md:text-lg py-4 px-10 rounded-full hover:scale-105 active:scale-95 transition-all duration-300 shadow-[0_0_30px_rgba(37,99,235,0.25)]"
            >
              <Phone className="w-5 h-5" />
              견적 문의하기
            </a>
            <p className="text-gray-500 text-sm mt-4">전화 한 통으로 빠른 견적 확인</p>
          </div>
        </div>
      </section>

      {/* ━━━ 4. PROCESS ━━━ */}
      <section className="py-24 px-5 bg-[#181818]">
        <div className="max-w-5xl mx-auto">
          <div data-aos="fade-up" className="text-center mb-14">
            <p className="text-blue-500 text-sm font-bold tracking-widest mb-4">HOW IT WORKS</p>
            <h2 className="text-2xl sm:text-4xl lg:text-[2.75rem] font-bold leading-snug break-keep">
              광택·세차,<br className="sm:hidden" />이렇게 진행됩니다
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4">
            {[
              { step: "01", title: "예약·상담", desc: "전화/방문 접수", icon: <Headphones className="w-6 h-6" /> },
              { step: "02", title: "차량 점검", desc: "상태 확인·안내", icon: <FileText className="w-6 h-6" /> },
              { step: "03", title: "작업 진행", desc: "꼼꼼한 시공", icon: <Wrench className="w-6 h-6" /> },
              { step: "04", title: "마감 검수", desc: "디테일 체크", icon: <CheckCircle2 className="w-6 h-6" /> },
              { step: "05", title: "차량 인도", desc: "새 차처럼 완성", icon: <Car className="w-6 h-6" /> },
            ].map((p, i) => (
              <div
                key={i}
                data-aos="fade-up"
                data-aos-delay={i * 80}
                className={`flex flex-col items-center text-center bg-black p-5 md:p-6 rounded-2xl border border-gray-800 hover:border-blue-500/30 transition-all duration-300 group ${i === 4 ? "col-span-2 md:col-span-1" : ""}`}
              >
                <div className="w-12 h-12 md:w-14 md:h-14 bg-gray-900 rounded-2xl flex items-center justify-center text-blue-500 mb-4 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                  {p.icon}
                </div>
                <h3 className="text-[15px] md:text-lg font-bold flex items-center gap-1.5 justify-center mb-1">
                  <span className="text-blue-500 text-xs font-bold">{p.step}</span>
                  {p.title}
                </h3>
                <p className="text-gray-400 text-sm">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ 5. WORK CASES ━━━ */}
      <section className="py-24 px-5 bg-[#121212]">
        <div className="max-w-5xl mx-auto">
          <div data-aos="fade-up" className="text-center mb-14">
            <p className="text-blue-500 text-sm font-bold tracking-widest mb-3">WORK CASES</p>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-3 break-keep">
              작업 사례 · 고객 후기
            </h2>
            <p className="text-gray-400 font-medium text-sm md:text-lg break-keep">
              새 차처럼 만들어드린 실제 작업 사례
            </p>
          </div>

          {/* Main Slide */}
          <div data-aos="fade-up" className="relative">
            <div className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-3xl overflow-hidden">
              {workCases.map((c, i) => (
                <div
                  key={i}
                  className={`absolute inset-0 transition-all duration-700 ${
                    caseSlide === i ? "opacity-100 scale-100" : "opacity-0 scale-105"
                  }`}
                >
                  <Image src={c.image} alt={c.name} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />

                  {/* Content Overlay */}
                  <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-14 max-w-2xl">
                    <div className="flex items-center gap-2 mb-3 md:mb-4">
                      <span className="bg-blue-600 text-white text-xs md:text-sm font-bold px-3 py-1 rounded-full">
                        {c.category}
                      </span>
                      <span className="bg-white/10 backdrop-blur-sm text-white text-xs md:text-sm font-bold px-3 py-1 rounded-full border border-white/20">
                        {c.stat}
                      </span>
                    </div>
                    <h3 className="text-2xl md:text-4xl font-black mb-2 md:mb-3">{c.name}</h3>
                    <p className="text-blue-400 text-sm md:text-base font-bold mb-2 md:mb-4">{c.service}</p>
                    <p className="text-gray-300 text-sm md:text-base leading-relaxed hidden sm:block">
                      &ldquo;{c.text.split(c.highlight).map((part, pi) =>
                        pi === 0 ? (
                          <span key={pi}>{part}<span className="text-blue-400 font-bold">{c.highlight}</span></span>
                        ) : (<span key={pi}>{part}</span>)
                      )}&rdquo;
                    </p>
                  </div>

                  {/* Case Number */}
                  <div className="absolute top-6 right-6 md:top-10 md:right-10">
                    <span className="text-6xl md:text-8xl font-black text-white/5">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                </div>
              ))}

              {/* Navigation Arrows */}
              <button
                onClick={prevCase}
                className="absolute left-3 md:left-5 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-blue-600 transition-all z-10"
              >
                <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
              </button>
              <button
                onClick={nextCase}
                className="absolute right-3 md:right-5 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-blue-600 transition-all z-10"
              >
                <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
              </button>
            </div>

            {/* Slide Indicators + Counter */}
            <div className="flex items-center justify-center gap-4 mt-6">
              <span className="text-blue-500 font-bold text-sm">
                {String(caseSlide + 1).padStart(2, "0")}
              </span>
              <div className="flex gap-1.5">
                {workCases.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCaseSlide(i)}
                    className={`h-1 rounded-full transition-all duration-500 ${
                      caseSlide === i ? "bg-blue-500 w-8" : "bg-white/20 w-4"
                    }`}
                  />
                ))}
              </div>
              <span className="text-gray-500 font-bold text-sm">
                {String(workCases.length).padStart(2, "0")}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━ 6. CONTACT ━━━ */}
      <section className="py-24 px-5 bg-[#1a1a1a] relative overflow-hidden">
        <div className="max-w-5xl mx-auto relative z-10">
          <div
            data-aos="fade-up"
            className="bg-black/80 backdrop-blur-sm rounded-3xl p-7 sm:p-10 md:p-14 border border-gray-800 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-blue-600 blur-[120px] opacity-10" />

            <div className="text-center mb-10 relative z-10">
              <p className="text-blue-500 text-sm font-bold tracking-widest mb-4">CONTACT US</p>
              <h2 className="text-3xl md:text-4xl font-bold">문의 · 방문 안내</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5 relative z-10 mb-10">
              <div className="bg-[#1a1a1a]/80 p-6 rounded-2xl border border-gray-800 hover:border-gray-700 transition-colors">
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="w-9 h-9 bg-blue-500/10 rounded-lg flex items-center justify-center">
                    <Clock className="w-5 h-5 text-blue-500" />
                  </div>
                  <h3 className="font-bold text-base md:text-lg">영업 안내</h3>
                </div>
                <ul className="space-y-3 text-gray-300 text-sm md:text-[15px]">
                  <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-blue-500/60 flex-shrink-0" /> 평일 09:00 ~ 19:00</li>
                  <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-blue-500/60 flex-shrink-0" /> 예약 우선 접수</li>
                  <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-blue-500/60 flex-shrink-0" /> 위치: <span className="text-blue-500 font-bold">부산 사상구</span></li>
                </ul>
              </div>
              <div className="bg-[#1a1a1a]/80 p-6 rounded-2xl border border-gray-800 hover:border-gray-700 transition-colors">
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="w-9 h-9 bg-blue-500/10 rounded-lg flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-blue-500" />
                  </div>
                  <h3 className="font-bold text-base md:text-lg">오시는 길</h3>
                </div>
                <ul className="space-y-3 text-gray-300 text-sm md:text-[15px]">
                  <li className="flex items-start gap-2.5"><CheckCircle2 className="w-4 h-4 text-blue-500/60 flex-shrink-0 mt-0.5" /> 부산 사상구 (상세주소 추후 안내)</li>
                  <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-blue-500/60 flex-shrink-0" /> 주차 공간 완비</li>
                  <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-blue-500/60 flex-shrink-0" /> 방문 전 전화 예약</li>
                </ul>
              </div>
            </div>

            <div className="text-center relative z-10">
              <p className="text-base md:text-lg font-bold mb-5 text-gray-200">
                지금 바로 문의하세요!
              </p>
              <a
                href={`tel:${phoneNumber.replace(/-/g, "")}`}
                className="group inline-flex items-center gap-3 bg-blue-600 text-white text-xl md:text-2xl font-bold py-5 px-12 rounded-full hover:scale-105 active:scale-95 transition-all duration-300 shadow-[0_0_40px_rgba(37,99,235,0.3)]"
              >
                <Phone className="w-6 h-6" />
                {phoneNumber}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━ FOOTER ━━━ */}
      <footer className="py-14 px-5 bg-black border-t border-gray-800">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:justify-between md:items-start gap-10">
          <div>
            <div className="flex items-center gap-2.5 mb-5">
              <Sparkles className="w-6 h-6 text-blue-500" />
              <span className="font-bold text-lg">새차만들기</span>
            </div>
            <div className="space-y-2 text-sm text-gray-400">
              <p>부산 사상 자동차 광택·세차 전문</p>
              <p>주소: 부산 사상구 (상세주소 추후 안내)</p>
              <p>업종: 자동차 광택, 스팀세차, 실내세차, 유리막코팅</p>
              <div className="flex gap-3 mt-3">
                <a href={naverPlaceLink} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors">
                  네이버 플레이스
                </a>
                <span className="text-gray-600">|</span>
                <a href={blogLink} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors">
                  블로그
                </a>
              </div>
            </div>
          </div>
          <div className="md:text-right">
            <p className="text-gray-400 text-sm mb-3">문의 전화</p>
            <a href={`tel:${phoneNumber.replace(/-/g, "")}`} className="text-2xl md:text-3xl font-bold text-white hover:text-blue-500 transition-colors">
              {phoneNumber}
            </a>
            <p className="text-gray-500 text-sm mt-2">평일 09:00~19:00</p>
            <p className="text-xs text-gray-600 mt-5">&copy; 2026 새차만들기. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* ━━━ CHAT OVERLAY ━━━ */}
      {chatOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-[3px] z-[55]" onClick={toggleChat} />
      )}

      {/* ━━━ CHAT WINDOW ━━━ */}
      <div
        className={`fixed z-[60] transition-all duration-500 ease-out
          left-1/2 -translate-x-1/2 w-[calc(100%-1rem)] max-w-[600px]
          ${chatOpen
            ? "bottom-[calc(env(safe-area-inset-bottom,0px)+72px)] opacity-100 translate-y-0"
            : "bottom-[calc(env(safe-area-inset-bottom,0px)+72px)] opacity-0 translate-y-4 pointer-events-none"
          }`}
      >
        <div className="bg-[#0d0d0d] rounded-2xl border border-gray-800 shadow-2xl shadow-black/60 overflow-hidden">
          {/* 헤더 */}
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-800/60 bg-[#111]">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center shadow-[0_0_12px_rgba(37,99,235,0.3)]">
                <Bot className="w-4.5 h-4.5 text-white" />
              </div>
              <div>
                <p className="text-white text-[15px] font-bold">새차만들기 견적 안내</p>
                <p className="text-gray-500 text-[11px]">클릭만으로 예상 견적을 확인하세요</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              {chatStep > 0 && (
                <button onClick={resetChat} className="h-8 px-3 flex items-center gap-1 text-gray-500 hover:text-blue-400 text-xs font-medium rounded-lg hover:bg-gray-800/60 transition-colors">
                  <RotateCcw className="w-3 h-3" />
                  초기화
                </button>
              )}
              <button onClick={toggleChat} className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-white rounded-lg hover:bg-gray-800 transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* 대화 영역 */}
          <div ref={chatScrollRef} className="p-5 space-y-3.5 min-h-[160px] max-h-[50vh] overflow-y-auto">
            {/* 히스토리 */}
            {chatHistory.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} animate-slide-up`}>
                <div className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm font-medium ${
                  msg.role === "user"
                    ? "bg-blue-600 text-white rounded-br-md"
                    : "bg-gray-800/80 text-gray-300 rounded-bl-md"
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}

            {/* 현재 질문 */}
            {chatStep < 2 && (
              <div className="flex justify-start">
                <div className="flex items-start gap-2.5">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 shadow-[0_0_10px_rgba(37,99,235,0.2)]">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="bg-gray-800/80 text-gray-200 px-4 py-2.5 rounded-2xl rounded-bl-md text-sm font-medium mb-3">
                      {chatStep === 0 ? chatData.root.question : chatData[chatCategory]?.question}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {(chatStep === 0 ? chatData.root.options : chatData[chatCategory]?.options || []).map((opt) => (
                        <button
                          key={opt.value}
                          onClick={() => handleChatSelect(opt.value)}
                          className="px-4 py-2 bg-[#1a1a1a] hover:bg-blue-600 text-white text-[13px] font-bold rounded-full border border-gray-700 hover:border-blue-500 transition-all duration-200 active:scale-95 hover:shadow-[0_0_12px_rgba(37,99,235,0.2)]"
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 결과 */}
            {chatStep === 2 && (() => {
              const key = `${chatCategory}_${chatSub}`;
              const result = chatResults[key];
              if (!result) return null;
              return (
                <div className="flex justify-start animate-slide-up">
                  <div className="flex items-start gap-2.5 w-full">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="bg-gradient-to-br from-gray-800/90 to-gray-900 p-5 rounded-2xl rounded-bl-md border border-gray-700/80">
                        <p className="text-blue-400 text-[11px] font-bold tracking-wider mb-2">견적 안내</p>
                        <h3 className="text-white text-lg font-black mb-1">{result.title}</h3>
                        <span className="text-blue-500 text-2xl font-black">{result.price}</span>
                        <p className="text-gray-400 text-sm mt-2 mb-4">{result.note}</p>
                        <div className="flex flex-wrap gap-2">
                          <a
                            href={`tel:${phoneNumber.replace(/-/g, "")}`}
                            className="inline-flex items-center gap-2 bg-blue-600 text-white text-sm font-bold px-5 py-2.5 rounded-full hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)]"
                          >
                            <Phone className="w-4 h-4" />
                            바로 전화하기
                          </a>
                          <button
                            onClick={resetChat}
                            className="inline-flex items-center gap-1.5 bg-gray-800 text-gray-300 text-sm font-medium px-4 py-2.5 rounded-full hover:bg-gray-700 transition-all"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                            다시 검색
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      </div>

      {/* ━━━ BOTTOM CTR BAR ━━━ */}
      <div className="fixed bottom-0 left-0 right-0 z-[58] safe-area-pb px-3 pb-3">
        <div className="max-w-[500px] mx-auto">
          <button
            onClick={toggleChat}
            className={`w-full bg-[#1a1a1a] rounded-full border transition-all duration-300 group ${
              chatOpen
                ? "border-gray-700 shadow-lg"
                : "border-blue-500/30 shadow-[0_0_20px_rgba(37,99,235,0.15)] hover:border-blue-500/50 hover:shadow-[0_0_25px_rgba(37,99,235,0.25)]"
            }`}
          >
            <div className="flex items-center gap-3 px-4 py-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                chatOpen ? "bg-gray-700" : "bg-blue-600 shadow-[0_0_12px_rgba(37,99,235,0.4)]"
              }`}>
                {chatOpen ? <ChevronDown className="w-5 h-5 text-gray-400" /> : <Bot className="w-5 h-5 text-white" />}
              </div>

              <div className="flex-1 text-left min-w-0">
                {chatOpen ? (
                  <p className="text-gray-400 text-sm">닫기</p>
                ) : (
                  <>
                    <p className="text-gray-400 text-sm truncate group-hover:text-gray-300 transition-colors">
                      원하시는 서비스를 선택해보세요...
                    </p>
                  </>
                )}
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                {!chatOpen && (
                  <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                    견적 확인
                  </span>
                )}
              </div>
            </div>
          </button>

          {/* 하단 빠른 연락 버튼 */}
          <div className="flex items-center justify-center gap-3 mt-2">
            <a
              href={`tel:${phoneNumber.replace(/-/g, "")}`}
              className="flex items-center gap-1.5 text-gray-400 hover:text-blue-400 text-xs font-medium transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              {phoneNumber}
            </a>
            <span className="text-gray-700">|</span>
            <a
              href={blogLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-gray-400 hover:text-green-400 text-xs font-medium transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              블로그
            </a>
          </div>
        </div>
      </div>

      {/* ━━━ FLOATING PHONE BUTTON ━━━ */}
      <a
        href={`tel:${phoneNumber.replace(/-/g, "")}`}
        className="fixed right-4 bottom-[calc(env(safe-area-inset-bottom,0px)+100px)] z-[59] w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(37,99,235,0.5)] hover:scale-110 active:scale-95 transition-all duration-300 animate-float"
        aria-label="전화 걸기"
      >
        <Phone className="w-6 h-6 text-white" />
      </a>
    </div>
  );
}
