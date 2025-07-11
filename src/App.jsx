import React, { useEffect, useState } from "react";
import { useRive, Layout, Fit, Alignment } from "@rive-app/react-webgl2";

function App() {
  const [animationSrc, setAnimationSrc] = useState(null);
  const [stateMachine, setStateMachine] = useState(null);

  // Fetch animation from your API and prepare Blob URL
  useEffect(() => {
    fetch("https://dbcms.ct.ws/get_animations.php")
      .then((res) => res.json())
      .then((data) => {
        const animation = data[0]; // take first animation

        // Decode base64 string to binary data
        const byteCharacters = atob(animation.rive_file);
        const byteNumbers = new Array(byteCharacters.length)
          .fill(0)
          .map((_, i) => byteCharacters.charCodeAt(i));
        const byteArray = new Uint8Array(byteNumbers);

        // Create blob URL from binary data
        const blob = new Blob([byteArray], {
          type: "application/octet-stream",
        });
        const blobUrl = URL.createObjectURL(blob);

        setAnimationSrc(blobUrl);
        setStateMachine(animation.state_machine);
      })
      .catch((e) => console.error("Failed to load animation:", e));
  }, []);

  // Initialize Rive when animationSrc is ready
  const { RiveComponent } = useRive({
    src: animationSrc,
    stateMachines: stateMachine,
    autoplay: true,
    layout: new Layout({
      fit: Fit.Contain,
      alignment: Alignment.Center,
    }),
  });

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#000",
      }}
    >
      <div style={{ width: "80vw", height: "80vh" }}>
        {animationSrc ? <RiveComponent /> : <p>Loading animation...</p>}
      </div>
    </div>
  );
}

export default App;
