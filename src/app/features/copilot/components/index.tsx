'use client';

import { MouseEvent, useCallback, useEffect, useRef, useState } from 'react';
import { CopilotButton } from './CopilotButton';
import { CopilotChat } from './CopilotChat';

const DRAG_THRESHOLD = 5;

export function Copilot() {
  const [isOpen, _setIsOpen] = useState(true);

  const [position, setPosition] = useState({
    top: window.innerHeight / 2, //65
    left: window.innerWidth / 2 //135
  });

  const startPositionRef = useRef({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const dragCheckRef = useRef(false);
  const offsetRef = useRef({ x: 0, y: 0 });

  const snapAfterOpenRef = useRef(false);

  const snapToEdge = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const { innerWidth: vw, innerHeight: vh } = window;
    const { offsetWidth, offsetHeight } = container;
    const { left: x, top: y } = position;

    let isOutOfEdge = false;
    const newPosition = { ...position };

    if (x + offsetWidth > vw) {
      isOutOfEdge = true;
      newPosition.left -= x + offsetWidth - vw;
    }

    if (x < 0) {
      isOutOfEdge = true;
      newPosition.left = 0;
    }

    if (y + offsetHeight > vh) {
      isOutOfEdge = true;
      newPosition.top -= y + offsetHeight - vh;
    }

    if (y < 0) {
      isOutOfEdge = true;
      newPosition.top = 0;
    }

    if (isOutOfEdge) {
      setPosition(newPosition);
    }
  }, [position]);

  useEffect(() => {
    if (isOpen && snapAfterOpenRef.current) {
      snapAfterOpenRef.current = false;

      snapToEdge();
    }
  }, [isOpen, snapToEdge]);

  useEffect(() => {
    function handleMouseMove(event: globalThis.MouseEvent) {
      if (dragCheckRef.current) {
        const deltaX = event.clientX - startPositionRef.current.x;
        const deltaY = event.clientY - startPositionRef.current.y;

        if (
          !isDraggingRef.current &&
          (Math.abs(deltaX) > DRAG_THRESHOLD || Math.abs(deltaY) > DRAG_THRESHOLD)
        ) {
          isDraggingRef.current = true;
        }

        setPosition({
          top: event.clientY - offsetRef.current.y,
          left: event.clientX - offsetRef.current.x
        });
      }
    }

    function handleMouseUp() {
      if (dragCheckRef.current) {
        dragCheckRef.current = false;
        snapToEdge();
      }
    }

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('resize', snapToEdge);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('resize', snapToEdge);
    };
  }, [snapToEdge]);

  function setIsOpen(isOpen: boolean) {
    if (isOpen && dragCheckRef.current) {
      return;
    }

    _setIsOpen(isOpen);

    if (isOpen) {
      snapAfterOpenRef.current = true;
    }
  }

  function handleMouseDown(event: MouseEvent<HTMLDivElement> | MouseEvent<HTMLButtonElement>) {
    dragCheckRef.current = true;
    isDraggingRef.current = false;

    startPositionRef.current = {
      x: event.clientX,
      y: event.clientY
    };

    offsetRef.current = {
      x: event.clientX - position.left,
      y: event.clientY - position.top
    };
  }

  return (
    <div
      ref={containerRef}
      className="fixed z-[200] flex flex-col items-end"
      style={{ top: position.top, left: position.left }}
    >
      {!isOpen && (
        <CopilotButton
          onMouseDown={handleMouseDown}
          onClick={(event) => {
            if (isDraggingRef.current) {
              event.preventDefault();
              event.stopPropagation();
              return;
            }

            setIsOpen(true);
          }}
        />
      )}

      {isOpen && (
        <CopilotChat onHeaderMouseDown={handleMouseDown} onClose={() => setIsOpen(false)} />
      )}
    </div>
  );
}
