import React, { useState, useEffect, useRef } from 'react';
import { TimelineMax, TweenMax } from 'gsap';

function DoorUI() {
  const [open, setOpen] = useState(true);
  const hitBtnRef = useRef(null);

  const onLoaded = () => {};

  const setBtnEnabled = (isEnabled) => {
    hitBtnRef.current.setAttribute('class', isEnabled ? 'enabled' : 'disabled');
  };

  const toggle = () => {
    setBtnEnabled(false);
    setOpen(!open);
  };

  useEffect(() => {
    onLoaded();

    const tl = new TimelineMax({
      onComplete: () => setBtnEnabled(true),
      onCompleteParams: [true],
    }).timeScale(1.8);

    tl.staggerTo(
      '.radialGroup g',
      1,
      {
        fill: open ? '#41E969' : '#F70048',
      },
      0.2
    )
      .to(
        '.bar',
        0.4,
        {
          strokeWidth: open ? 0 : 4,
          transformOrigin: '50% 50%',
          stroke: open ? '#41E969' : '#F70048',
          ease: Sine.easeOut,
        },
        0
      )
      .to(
        '.ring',
        0.4,
        {
          stroke: open ? '#41E969' : '#F70048',
        },
        0
      )
      .staggerTo(
        '.radialGroup g',
        0.3,
        {
          cycle: {
            alpha: [0],
          },
          repeat: 1,
          ease: Sine.easeOut,
          yoyoEase: Sine.easeOut,
        },
        0.1,
        0
      )
      .staggerTo(
        '.radialGroup g path',
        0.3,
        {
          cycle: {
            scale: [0.95],
          },
          repeat: 1,
          svgOrigin: '400 300',
          ease: Sine.easeIn,
          yoyoEase: Sine.easeOut,
        },
        0.0163,
        0.1
      )
      .to(
        '.radialGroup',
        1,
        {
          svgOrigin: '400 300',
          ease: Elastic.easeOut.config(0.5, 0.75),
          rotation: '+=36',
        },
        0
      )
      .to(
        '.icon',
        1,
        {
          svgOrigin: '400 300',
          transformOrigin: '50% 50%',
          ease: Sine.easeOut,
          rotation: open ? '+=0' : '-=180',
        },
        0.1
      )
      .to(
        '.icon',
        0.4,
        {
          scale: 0.9,
          svgOrigin: '400 300',
          transformOrigin: '50% 50%',
          ease: Sine.easeOut,
          yoyoEase: Elastic.easeOut.config(0.5, 0.75),
          repeat: 1,
        },
        0
      );
  }, [open]);

  return (
    <svg viewBox="200 150 400 300" preserveAspectRatio="xMidYMid meet">
      {/* ... rest of the SVG content ... */}
      <use
        xlinkHref="#hitRing"
        stroke="none"
        fill="transparent"
        onClick={toggle}
        ref={hitBtnRef}
      />
    </svg>
  );
}

export default DoorUI;
