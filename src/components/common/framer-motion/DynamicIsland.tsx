"use client";

import React, { useState, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface DynamicIslandProps {
  // 기본 상태 설정
  /** 외부에서 제어할 펼침 상태입니다. 생략하면 내부 상태를 사용합니다. */
  isExpanded?: boolean;
  /** 클릭·호버로 상태가 바뀔 때 다음 펼침 상태를 전달합니다. 제어 모드의 자동 닫힘에서도 호출됩니다. */
  onToggle?: (expanded: boolean) => void;

  // 스타일링
  /** 아일랜드 바깥 motion.div에 추가할 CSS 클래스입니다. */
  className?: string;
  /** 접힌 상태의 CSS 배경색이며 펼친 상태의 기본 배경색으로도 사용합니다. */
  backgroundColor?: string;
  /** 펼친 상태의 CSS 배경색입니다. 생략하면 backgroundColor를 사용합니다. */
  expandedBackgroundColor?: string;

  // 크기 설정
  /** 접힌 상태의 너비(px)입니다. */
  collapsedWidth?: number;
  /** 접힌 상태의 높이(px)입니다. 모서리 반경은 이 값의 절반입니다. */
  collapsedHeight?: number;
  /** 펼친 상태의 너비(px)입니다. */
  expandedWidth?: number;
  /** 펼친 상태의 높이(px)입니다. */
  expandedHeight?: number;

  // 콘텐츠
  /** 접힌 상태에 표시할 콘텐츠입니다. 생략하면 흰색 점을 표시합니다. */
  collapsedContent?: ReactNode;
  /** 펼친 상태에 표시할 콘텐츠입니다. 생략하면 기본 상태 메시지를 표시합니다. */
  expandedContent?: ReactNode;

  // 애니메이션 설정
  /** 콘텐츠 전환의 기준 시간(초)입니다. 크기 전환은 springConfig의 물리 설정을 사용합니다. */
  animationDuration?: number;
  /** 크기 전환에 적용할 스프링 강성(stiffness)과 감쇠(damping)입니다. */
  springConfig?: {
    stiffness: number;
    damping: number;
  };

  // 인터랙션 설정
  /** 클릭할 때 펼침 상태를 전환할지 설정합니다. */
  clickToToggle?: boolean;
  /** 마우스 진입 시 펼치고 이탈 시 접을지 설정합니다. */
  hoverToExpand?: boolean;
  /** 펼친 뒤 지정된 시간이 지나면 자동으로 접을지 설정합니다. */
  autoCollapse?: boolean;
  /** 자동으로 접기까지 기다릴 시간(ms)입니다. */
  autoCollapseDelay?: number;
}

export default function DynamicIsland({
  isExpanded: controlledExpanded,
  onToggle,
  className = "",
  backgroundColor = "#000000",
  expandedBackgroundColor,
  collapsedWidth = 120,
  collapsedHeight = 32,
  expandedWidth = 350,
  expandedHeight = 80,
  collapsedContent,
  expandedContent,
  animationDuration = 0.6,
  springConfig = { stiffness: 300, damping: 30 },
  clickToToggle = true,
  hoverToExpand = false,
  autoCollapse = false,
  autoCollapseDelay = 3000,
}: DynamicIslandProps) {
  const [internalExpanded, setInternalExpanded] = useState(false);

  // 제어된 컴포넌트인지 확인
  const isControlled = controlledExpanded !== undefined;
  const isExpanded = isControlled ? controlledExpanded : internalExpanded;

  // 상태 토글 함수
  const handleToggle = () => {
    const newExpanded = !isExpanded;

    if (isControlled) {
      onToggle?.(newExpanded);
    } else {
      setInternalExpanded(newExpanded);
      onToggle?.(newExpanded);
    }
  };

  // 자동 축소 타이머
  React.useEffect(() => {
    if (isExpanded && autoCollapse) {
      const timer = setTimeout(() => {
        if (isControlled) {
          onToggle?.(false);
        } else {
          setInternalExpanded(false);
        }
      }, autoCollapseDelay);

      return () => clearTimeout(timer);
    }
  }, [isExpanded, autoCollapse, autoCollapseDelay, isControlled, onToggle]);

  // 애니메이션 variants
  const variants = {
    collapsed: {
      width: collapsedWidth,
      height: collapsedHeight,
      borderRadius: collapsedHeight / 2,
    },
    expanded: {
      width: expandedWidth,
      height: expandedHeight,
      borderRadius: 20,
    },
  };

  const contentVariants = {
    collapsed: {
      opacity: 0,
      scale: 0.8,
    },
    expanded: {
      opacity: 1,
      scale: 1,
    },
  };

  return (
    <motion.div
      className={`relative flex items-center justify-center cursor-pointer select-none ${className}`}
      style={{
        backgroundColor: isExpanded ? expandedBackgroundColor || backgroundColor : backgroundColor,
      }}
      variants={variants}
      initial="collapsed"
      animate={isExpanded ? "expanded" : "collapsed"}
      transition={{
        duration: animationDuration,
        type: "spring",
        ...springConfig,
      }}
      onClick={clickToToggle ? handleToggle : undefined}
      onHoverStart={hoverToExpand ? () => !isExpanded && handleToggle() : undefined}
      onHoverEnd={hoverToExpand ? () => isExpanded && handleToggle() : undefined}
      whileHover={!hoverToExpand ? { scale: 1.02 } : undefined}
      whileTap={clickToToggle ? { scale: 0.98 } : undefined}
    >
      <AnimatePresence mode="wait">
        {!isExpanded ? (
          <motion.div
            key="collapsed"
            variants={contentVariants}
            initial="collapsed"
            animate="expanded"
            exit="collapsed"
            transition={{ duration: animationDuration * 0.7 }}
            className="flex items-center justify-center text-white"
          >
            {collapsedContent || <div className="w-2 h-2 bg-white rounded-full" />}
          </motion.div>
        ) : (
          <motion.div
            key="expanded"
            variants={contentVariants}
            initial="collapsed"
            animate="expanded"
            exit="collapsed"
            transition={{ duration: animationDuration * 0.7, delay: animationDuration * 0.3 }}
            className="flex items-center justify-center text-white p-4"
          >
            {expandedContent || (
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-green-500 rounded-full" />
                <span className="text-sm font-medium">Dynamic Island</span>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
