"use client";
import { useState, useEffect, useRef } from "react";
import styles from "./page.module.css";
import DotsMobileStepper from "./components/questions/question";

export default function Home() {
	const [showSplash, setShowSplash] = useState(true);
	const [isPlaying, setIsPlaying] = useState(false);
	const [showRedBackground, setShowRedBackground] = useState(false); // State to control showing the red background

	const videoRef = useRef(null);

	const handlePlay = () => {
		setIsPlaying(true);
		videoRef.current?.play();
	};

	useEffect(() => {
		let timeout;
		if (isPlaying) {
			timeout = setTimeout(() => {
				setShowRedBackground(true);
			}, 14000); // 10 seconds
		}

		return () => clearTimeout(timeout);
	}, [isPlaying]);

	return (
		<main className={styles.main}>
			{showSplash && (
				<div className={styles.splashContainer}>
					<h1 className={styles.title}>
						<span className={styles.blackText}>presta</span>
						<span className={styles.redText}>MITO</span>
					</h1>
					<p className={styles.description}>
						pequeños PRESTAMOS para pequeños EMPRENDEDORES
					</p>
					<button className={styles.startButton} onClick={handlePlay}>
						Comenzar
					</button>
				</div>
			)}
			{isPlaying && (
				<div className={styles.videoContainer}>
					<video ref={videoRef} className={styles.video} autoPlay>
						<source src="../../intro2.mp4" type="video/mp4" />
						Your browser does not support the video tag.
					</video>
				</div>
			)}
			{showRedBackground && ( // Render red background div if showRedBackground is true
				<div className={styles.redBackground}>
					<DotsMobileStepper />
				</div>
			)}
		</main>
	);
}
