import { Center, PerspectiveCamera, useGLTF } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useState, RefObject, Suspense } from "react";

function Basilium3DLogoModel() {
  const { scene } = useGLTF("/animations/BasiliumLogo.glb");
  return <primitive object={scene} scale={[2, 2, 2]} />;
}

interface CameraSettingProps {
  scrollProgress: RefObject<{ value: number }>;
}

function CameraSetting({ scrollProgress }: CameraSettingProps) {
  const { camera } = useThree();

  useFrame(({ clock }) => {
    const baseHeight = 1.5;
    const floatAmplitude = 0.1;
    const floatSpeed = 0.5;
    const yFloat =
      baseHeight + Math.sin(clock.elapsedTime * floatSpeed) * floatAmplitude;

    const scrollValue = scrollProgress.current?.value ?? 0;
    const startZ = 0.4;
    const scrollIntensity = 2;
    const zScroll = startZ + scrollValue * scrollIntensity;

    camera.position.set(-0.2, yFloat, zScroll);
    camera.lookAt(0, 0, 0);
  });

  return null;
}

interface Basilium3DLogoProps {
  scrollProgress: RefObject<{ value: number }>;
}

function Basilium3DLogoMain({ scrollProgress }: Basilium3DLogoProps) {
  const [contextLost, setContextLost] = useState(false);

  return (
    <div style={{ position: "relative", height: "100vh", width: "100%" }}>
      {contextLost && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
            backgroundColor: "rgba(0,0,0,0.7)",
            zIndex: 1,
          }}
        />
      )}
      <Canvas
        shadows
        style={{ height: "100%" }}
        camera={{ fov: 85, near: 0.1, far: 1000 }}
        onCreated={({ gl }) => {
          gl.domElement.addEventListener("webglcontextlost", () =>
            setContextLost(true),
          );
          gl.domElement.addEventListener("webglcontextrestored", () =>
            setContextLost(false),
          );
        }}
      >
        <Suspense fallback={null}>
          <Model scrollProgress={scrollProgress} />
        </Suspense>
      </Canvas>
    </div>
  );
}

function Model({
  scrollProgress,
}: {
  scrollProgress: RefObject<{ value: number }>;
}) {
  return (
    <group>
      <Center>
        <Basilium3DLogoModel />
      </Center>
      <pointLight position={[10, 10, 10]} intensity={1} color={0xffffff} />
      <PerspectiveCamera makeDefault position={[0, 0.0, 0.5]} />
      <CameraSetting scrollProgress={scrollProgress} />
    </group>
  );
}

export { Basilium3DLogoMain };
