"use client";

import Globe from "react-globe.gl";
// import R3fGlobe, { GlobeMethods } from 'r3f-globe';
// import Globe from 'react-globe';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import ufosData from '@/datasets/ufo.json';
import { useEffect, useMemo, useRef, useState } from 'react';
import { MeshLambertMaterial, DoubleSide } from 'three';
import * as topojson from 'topojson';
// import * as THREE from 'three';
// import { GlitchPass } from "three/addons/postprocessing/GlitchPass.js";
import PostProcessingEffects from '@/components/Effects';
import { useMediaQuery } from "@/app/hooks/useMediaQuery";


const landColor = getComputedStyle(document.documentElement).getPropertyValue('--brand-on-background-weak');
const seaColor = getComputedStyle(document.documentElement).getPropertyValue('--brand-on-background-medium');

const polygonsMaterial = new MeshLambertMaterial({ color: landColor, side: DoubleSide });
const globeMaterial = new MeshLambertMaterial({ color: seaColor });
// const glitchPass = new GlitchPass(8);

const getTooltip = (d: any) => `
    <div style="cursor: pointer; text-align: center; background-color: #000; color: #fff; border-radius: 0.5rem; border: 1px solid green; padding: 1rem; text-transform: capitalize; font-size: .8rem;">
      <div>Probe: ${String(d.id).padStart(4, '0')}</div>
      <div>Scan data:</div>
      <div>Status: corrupted</div>
      <div>loc: <b>${d.city}</b>, ${d.country}</div>
      <div>time: ${d.datetime}</div>
    </div>
  `;


export const Earth = () => {

  const [globeRadius, setGlobeRadius] = useState();

  useEffect(() => {
    globeRef.current.pointOfView(
      {
        lat: 51.759445,
        lng: 19.457216,
        altitude: 1.8,
      },
      5000
    );
  }, []);

  // const ufoObject = useMemo(() => {
  //   if (!globeRadius) return undefined;

  //   const ufoGeometry = new THREE.DodecahedronGeometry(1.5, 0);
  //   const ufoMaterial = new THREE.MeshLambertMaterial({
  //     color: "white",
  //     transparent: true,
  //     opacity: 0.8,
  //   });
  //   return new THREE.Mesh(ufoGeometry, ufoMaterial);
  // }, [globeRadius]);

  const globeRef = useRef<any>(null!);

  // useEffect(() => {
  //   if (globeRef.current) {
  //     globeRef.current.postProcessingComposer().addPass(glitchPass);
  //     const timeout = setTimeout(() => {
  //       globeRef.current.postProcessingComposer().removePass(glitchPass);
  //       return () => clearTimeout(timeout);
  //     }, 5000);
  //   }
  // }, []);

  const [landPolygons, setLandPolygons] = useState([]);

  useEffect(() => {
    // load data
    fetch('//unpkg.com/world-atlas/land-110m.json').then(res => res.json())
      .then(landTopo => {
        // @ts-expect-error
        setLandPolygons(topojson.feature(landTopo, landTopo.objects.land).features);
      });
  }, []);

  const matches = useMediaQuery('(max-width: 767px)')

  let globeWidth = matches ? 300 : 500;
  let globeHeight = matches ? 300 : 500;

  const lat = 51.759445;
  const lng = 19.457216;

  const ringsData = [
    {
      lat: lat,
      lng: lng,
    },
  ];

  const gData = useMemo(() => ufosData.map((ufo) => ({
    lat: ufo.latitude,
    lng: ufo.longitude,
    size: Math.random() / 3,
    // color: ['white', 'green'][Math.round(Math.random() * 3)]
    color: ['white'][Math.round(Math.random() * 3)]
  })), [ufosData.length]);

  const handleObjectClick = (d: any) => {
    globeRef.current.pointOfView(
      {
        lat: d.latitude,
        lng: d.longitude,
        altitude: 1.8,
      },
      1000
    );
    // globeRef.current.getTooltip();
  };

  // const globeMaterial = new THREE.MeshPhongMaterial();
  //   globeMaterial.bumpScale = 10;
  //   new THREE.TextureLoader().load('//unpkg.com/three-globe/example/img/earth-water.png', texture => {
  //     globeMaterial.specularMap = texture;
  //     globeMaterial.specular = new THREE.Color('grey');
  //     globeMaterial.shininess = 15;
  //   });

  return (
    // <Canvas camera={useMemo(() => ({ position: [0, 0, 250] }), [])}>
    //   <OrbitControls minDistance={101} maxDistance={1e4} dampingFactor={0.1} zoomSpeed={0} rotateSpeed={0.3} />
    //   <PostProcessingEffects />
      <Globe
        ref={globeRef}
        backgroundColor="rgba(0,0,0,0)"
        showGlobe={true}
        atmosphereColor={landColor}
        atmosphereAltitude={0.10}
        globeMaterial={globeMaterial}
        width={globeWidth}
        height={globeHeight}

        // globeImageUrl="images/earthspec1k.jpg"
        pointAltitude="size"
        pointColor="color"
        pointsData={ufosData}

        ringsData={ringsData}
        ringMaxRadius={20}
        ringPropagationSpeed={-4}
        ringRepeatPeriod={2000}
        ringAltitude={.1}
        ringColor={() => "white"}

        polygonsData={landPolygons}
        polygonCapMaterial={polygonsMaterial}
        polygonSideColor={() => 'rgba(0, 0, 0, 0)'}

        objectsData={ufosData}
        objectLat={"latitude"}
        objectLng={"longitude"}
        objectAltitude={0.1}
        objectLabel={getTooltip}
        // objectThreeObject={ufoObject}
        onObjectClick={handleObjectClick}
      />
    //   <ambientLight intensity={1.5} />
    //   <directionalLight intensity={0.3 * Math.PI} />
    // </Canvas>
  )
}