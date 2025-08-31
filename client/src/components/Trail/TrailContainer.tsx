"use client";

import { useEffect, useRef } from "react";

// Interface for mouse position objects
interface MousePosition {
  x: number;
  y: number;
}

// Interface for a single trail image item in the trailRef array
interface TrailItem {
  element: HTMLDivElement;
  maskLayers: HTMLDivElement[];
  imageLayers: HTMLDivElement[];
  removeTime: number;
}

const TrailContainer = () => {
  // Refs to store DOM elements and state that persists across renders without causing re-renders
  const trailContainerRef = useRef<HTMLDivElement | null>(null);
  // `number | null` is used because `requestAnimationFrame` returns a number, and `null` is the initial value.
  const animationStateRef = useRef<number | null>(null);
  const trailRef = useRef<TrailItem[]>([]);
  const currentImageIndexRef = useRef<number>(0);
  const mousePosRef = useRef<MousePosition>({ x: 0, y: 0 });
  const lastMousePosRef = useRef<MousePosition>({ x: 0, y: 0 });
  const interpolatedMousePosRef = useRef<MousePosition>({ x: 0, y: 0 });
  const isDesktopRef = useRef<boolean>(false);

  // Configuration for the animation and image effects
  const config = {
    imageLifespan: 1000,
    mouseThreshold: 150,
    inDuration: 750,
    outDuration: 1000,
    staggerIn: 100,
    staggerOut: 25,
    slideDuration: 1000,
    slideEasing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
    easing: "cubic-bezier(0.87, 0, 0.13, 1)",
  };

  // Utility functions for mathematical calculations with explicit types
  const MathUtils = {
    lerp: (a: number, b: number, n: number): number => (1 - n) * a + n * b,
    distance: (x1: number, y1: number, x2: number, y2: number): number =>
      Math.hypot(x2 - x1, y2 - y1),
  };

  // Total number of images in the trail
  const trailImageCount: number = 10;
  // Array of image paths, dynamically generated with a string array type
  const images: string[] = Array.from(
    { length: trailImageCount },
    (_, i) => `/assets/trail-images/img${i + 1}.avif`
  );

  //`/trail-images/img${i + 1}.jpeg`

  // Checks if the mouse is within the trail container
  const isInTrailContainer = (x: number, y: number): boolean => {
    const trailContainer = trailContainerRef.current;
    if (!trailContainer) return false;
    const rect = trailContainer.getBoundingClientRect();
    return (
      x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom
    );
  };

  // Calculates the distance between the current and last mouse positions
  const getMouseDistance = (): number => {
    return MathUtils.distance(
      mousePosRef.current.x,
      mousePosRef.current.y,
      lastMousePosRef.current.x,
      lastMousePosRef.current.y
    );
  };

  // Creates a new trail image element
  const createTrailImage = (): void => {
    const trailContainer = trailContainerRef.current;
    if (!trailContainer) return;

    const imgContainer = document.createElement("div");
    imgContainer.classList.add("trail-img");

    const imgSrc: string = images[currentImageIndexRef.current];
    currentImageIndexRef.current =
      (currentImageIndexRef.current + 1) % trailImageCount;

    const rect = trailContainer.getBoundingClientRect();
    const startX: number = interpolatedMousePosRef.current.x - rect.left - 87.5;
    const startY: number = interpolatedMousePosRef.current.y - rect.top - 87.5;
    const targetX: number = mousePosRef.current.x - rect.left - 87.5;
    const targetY: number = mousePosRef.current.y - rect.top - 87.5;

    imgContainer.style.left = `${startX}px`;
    imgContainer.style.top = `${startY}px`;
    imgContainer.style.transition = `left ${config.slideDuration}ms ${config.slideEasing}, top ${config.slideDuration}ms ${config.slideEasing}`;

    const maskLayers: HTMLDivElement[] = [];
    const imageLayers: HTMLDivElement[] = [];

    for (let i = 0; i < 10; i++) {
      const layer = document.createElement("div");
      layer.classList.add("mask-layer");

      const imageLayer = document.createElement("div");
      imageLayer.classList.add("image-layer");
      imageLayer.style.backgroundImage = `url(${imgSrc})`;

      const startYMask: number = i * 10;
      const endYMask: number = (i + 1) * 10;

      layer.style.clipPath = `polygon(50% ${startYMask}%, 50% ${startYMask}%, 50% ${endYMask}%, 50% ${endYMask}%)`;
      layer.style.transition = `clip-path ${config.inDuration}ms ${config.easing}`;
      layer.style.transform = "translateZ(0)";
      layer.style.backfaceVisibility = "hidden";

      layer.appendChild(imageLayer);
      imgContainer.appendChild(layer);
      maskLayers.push(layer);
      imageLayers.push(imageLayer);
    }

    trailContainer.appendChild(imgContainer);

    requestAnimationFrame(() => {
      imgContainer.style.left = `${targetX}px`;
      imgContainer.style.top = `${targetY}px`;

      maskLayers.forEach((layer, i) => {
        const startYMask: number = i * 10;
        const endYMask: number = (i + 1) * 10;
        const distanceFromMiddle: number = Math.abs(i - 4.5);
        const delay: number = distanceFromMiddle * config.staggerIn;

        setTimeout(() => {
          layer.style.clipPath = `polygon(0% ${startYMask}%, 100% ${startYMask}%, 100% ${endYMask}%, 0% ${endYMask}%)`;
        }, delay);
      });
    });

    trailRef.current.push({
      element: imgContainer,
      maskLayers: maskLayers,
      imageLayers: imageLayers,
      removeTime: Date.now() + config.imageLifespan,
    });
  };

  // Removes old images from the trail
  const removeOldImages = (): void => {
    const now: number = Date.now();
    if (trailRef.current.length === 0) return;

    const oldestImage: TrailItem = trailRef.current[0];
    if (now > oldestImage.removeTime) {
      const imgToRemove: TrailItem = trailRef.current.shift()!;

      // Animate clip-path of each mask layer to "pop" out with a stagger
      imgToRemove.maskLayers.forEach((layer, i) => {
        const startYMask: number = i * 10;
        const endYMask: number = (i + 1) * 10;
        const distanceFromEdge: number = 4.5 - Math.abs(i - 4.5);
        const delay: number = distanceFromEdge * config.staggerOut;

        layer.style.transition = `clip-path ${config.outDuration}ms ${config.easing}`;
        setTimeout(() => {
          layer.style.clipPath = `polygon(50% ${startYMask}%, 50% ${startYMask}%, 50% ${endYMask}%, 50% ${endYMask}%)`;
        }, delay);
      });

      // The image element is removed from the DOM after all staggered animations are complete
      const totalAnimationDuration =
        config.outDuration + 4.5 * config.staggerOut + 100;
      setTimeout(() => {
        if (imgToRemove.element.parentNode) {
          imgToRemove.element.parentNode.removeChild(imgToRemove.element);
        }
      }, totalAnimationDuration);
    }
  };

  // The main render loop for the animation
  const render = (): void => {
    if (!isDesktopRef.current) return;

    const distance: number = getMouseDistance();

    // Interpolate the mouse position for a smoother trail
    interpolatedMousePosRef.current.x = MathUtils.lerp(
      interpolatedMousePosRef.current.x || mousePosRef.current.x,
      mousePosRef.current.x,
      0.1
    );
    interpolatedMousePosRef.current.y = MathUtils.lerp(
      interpolatedMousePosRef.current.y || mousePosRef.current.y,
      mousePosRef.current.y,
      0.1
    );

    // Create a new trail image if the mouse has moved enough and is in the container
    if (
      distance > config.mouseThreshold &&
      isInTrailContainer(mousePosRef.current.x, mousePosRef.current.y)
    ) {
      createTrailImage();
      lastMousePosRef.current = { ...mousePosRef.current };
    }

    removeOldImages();
    animationStateRef.current = requestAnimationFrame(render);
  };

  // Starts the animation and adds the mouse move listener
  const startAnimation = (): (() => void) | undefined => {
    if (!isDesktopRef.current) return;

    const handleMouseMove = (e: MouseEvent): void => {
      mousePosRef.current = { x: e.clientX, y: e.clientY };
    };

    document.addEventListener("mousemove", handleMouseMove);
    animationStateRef.current = requestAnimationFrame(render);

    // Return a cleanup function
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  };

  // Stops the animation and removes all trail images
  const stopAnimation = (): void => {
    if (animationStateRef.current) {
      cancelAnimationFrame(animationStateRef.current);
      animationStateRef.current = null;
    }

    trailRef.current.forEach((item) => {
      if (item.element.parentNode) {
        item.element.parentNode.removeChild(item.element);
      }
    });
    trailRef.current.length = 0;
  };

  // Handles window resize to check for desktop size
  const handleResize = (): void => {
    const wasDesktop: boolean = isDesktopRef.current;
    isDesktopRef.current = window.innerWidth > 1000;

    if (isDesktopRef.current && !wasDesktop) {
      startAnimation();
    } else if (!isDesktopRef.current && wasDesktop) {
      stopAnimation();
    }
  };

  // Main effect hook for setting up and tearing down listeners
  useEffect(() => {
    const trailContainer = trailContainerRef.current;
    if (!trailContainer) return;

    isDesktopRef.current = window.innerWidth > 1000;

    let cleanupMouseListener: (() => void) | null | undefined = null;

    if (isDesktopRef.current) {
      cleanupMouseListener = startAnimation();
    }

    window.addEventListener("resize", handleResize);

    // Cleanup function
    return () => {
      stopAnimation();
      if (cleanupMouseListener) {
        cleanupMouseListener();
      }
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // JSX for the component
  return (
    <div className="trail-container" ref={trailContainerRef}>
    </div>
  );
};

export default TrailContainer;
