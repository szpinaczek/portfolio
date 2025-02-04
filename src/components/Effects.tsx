"use client";
import {
    Bloom,
    EffectComposer,
    Glitch,
    Noise,
    Scanline,
  } from "@react-three/postprocessing";
  import { BlendFunction, GlitchMode } from "postprocessing";
  import { useEffect, useState } from "react";
  
  export default function PostProcessingEffects() {
    const [active, setActive] = useState(true);
  
    useEffect(() => {
      const timeout = setTimeout(() => setActive(false), 6000);
      return () => clearTimeout(timeout);
    }, []);
  
    return (
      <>
        <EffectComposer>
          {/* <Bloom luminanceThreshold={0.5} luminanceSmoothing={0.5} height={100} /> */}
          {/* <Noise opacity={0.1} /> */}
          <Scanline
            density={2.5}
            opacity={0.2}
            blendFunction={BlendFunction.OVERLAY}
          />
          <Glitch
            // @ts-ignore
            delay={[1, 5]}
            // @ts-ignore
            duration={[0, 0.5]}
            // @ts-ignore
            strength={[0.1, 0.5]}
            mode={GlitchMode.SPORADIC}
            active={active}
            ratio={1}
          />
        </EffectComposer>
      </>
    );
  }
  