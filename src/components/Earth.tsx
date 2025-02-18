"use client";

import R3fGlobe from 'r3f-globe';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import ufosData from '@/datasets/ufo.json';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { MeshLambertMaterial, DoubleSide } from 'three';
import * as topojson from 'topojson';
import PostProcessingEffects from '@/components/Effects';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { Column, Flex } from '@/once-ui/components';
import styles from '@/components/Earth.module.scss';
import ShowUfoData from '@/components/ShowUfoData';
import * as THREE from 'three';


const landColor = getComputedStyle(document.documentElement).getPropertyValue('--brand-on-background-weak');
const seaColor = getComputedStyle(document.documentElement).getPropertyValue('--brand-on-background-medium');

const polygonsMaterial = new MeshLambertMaterial({ color: landColor, side: DoubleSide });
const globeMaterial = new MeshLambertMaterial({ color: seaColor });




export const Earth = () => {

  const [scanData, setScanData] = useState<string | undefined>(" ");

  const handleUfoData = (...args) => {
    const ufos: string = (args[0] === 'object' && args[1].city ? args[1].city : null);
    if (ufos !== null) {
      setScanData(ufos)
    }
  }

  const globeRef = useRef<any>(null!);
  // const { camera } = useThree();
  // console.log('CAMERA: ', camera);
  // useEffect(() => { globeRef.current.setPointOfView(camera); }, []);
  const [landPolygons, setLandPolygons] = useState([]);

  const lodz = {
    lat: 51.759445,
    lng: 19.457216,
    altitude: 1.8
  }

  const lat = 51.759445;
  const lng = 19.457216;

  useEffect(() => {
    // load data
    fetch('//unpkg.com/world-atlas/land-110m.json').then(res => res.json())
      .then(landTopo => {
        // @ts-expect-error
        setLandPolygons(topojson.feature(landTopo, landTopo.objects.land).features);
      });
  }, []);

  // useEffect(() => { globeRef.current.setPointOfView(lodz); }, []);

  const matches = useMediaQuery('(max-width: 767px)')

  // let globeWidth = matches ? 300 : 500;
  // let globeHeight = matches ? 300 : 500;

  const ringsData = [
    {
      lat: lat,
      lng: lng,
    },
  ];

  return <>
    <Column
      alignItems="center"
      className={styles.earth}
    >
      <Canvas flat camera={useMemo(() => ({ fov: 60, position: [51, 177, 170], rotation: [0, 0, 200] }), [])}>
      <OrbitControls minDistance={101} maxDistance={1e4} dampingFactor={0.1} zoomSpeed={0} rotateSpeed={0.5} />
        <ambientLight color={0xffffff} intensity={Math.PI} />
        <spotLight color={0xffffff} intensity={0.6 * Math.PI} />
        <PostProcessingEffects />
        <R3fGlobe
          ref={globeRef} 
          showGlobe={true}
          // backgroundColor="rgba(0,0,0,0)"
          waitForGlobeReady={false}
          showGraticules={false}
          showAtmosphere={true}
          atmosphereColor={"lightgreen"}
          atmosphereAltitude={0.10}
          globeMaterial={globeMaterial}
          // onHover={useCallback((...args) => console.log('hover', ...args), [])}
          // onClick={useCallback((...args) => console.log('click', ...args), [])}
          onClick={useCallback((...args) => handleUfoData(...args), [scanData])}
          // width={globeWidth}
          // height={globeHeight}

          ringsData={ringsData}
          ringMaxRadius={20}
          ringPropagationSpeed={-3}
          ringRepeatPeriod={2000}
          ringAltitude={.1}
          ringColor={() => "white"}

          polygonsData={landPolygons}
          polygonCapMaterial={polygonsMaterial}
          polygonSideColor={() => 'rgba(0, 0, 0, 0)'}

          objectsData={ufosData}
          objectLat={"latitude"}
          objectLng={"longitude"}
          objectAltitude={0.15}
          objectThreeObject={(() => new THREE.Mesh(
            new THREE.DodecahedronGeometry(1.5, 0),
            new THREE.MeshLambertMaterial({
              color: "white",
              // transparent: true,
              // opacity: 0.2,
            })
          ))}
        />
      </Canvas>
      <Column>
        <ShowUfoData data={scanData} />
      </Column>
    </Column>


  </>
};

// export const Earth = () => {

//   // const [globeRadius, setGlobeRadius] = useState();

//   // const ufoObject = useMemo(() => {
//   //   if (!globeRadius) return undefined;

//   //   const ufoGeometry = new THREE.DodecahedronGeometry(1.5, 0);
//   //   const ufoMaterial = new THREE.MeshLambertMaterial({
//   //     color: "white",
//   //     transparent: true,
//   //     opacity: 0.8,
//   //   });
//   //   return new THREE.Mesh(ufoGeometry, ufoMaterial);
//   // }, [globeRadius]);

//   return <>
//     <Column
//       alignItems="center"
//       className={styles.earth}
//     >
//       <Canvas flat camera={useMemo(() => ({ fov: 60, position: [51, 177, 170], rotation: [0, 0, 23.28] }), [])}>
//         <PostProcessingEffects />
//         <Globe />
//         {/* <ambientLight color={0xcccccc} intensity={Math.PI} />
//         <directionalLight intensity={0.6 * Math.PI} /> */}
//         <ambientLight color={0xffffff} intensity={5} />
//         <directionalLight color={0xffffff} intensity={1} />
//       </Canvas>
//       {/* <ShowUfoData data={UFOsData} /> */}
//     </Column>
//   </>
// }