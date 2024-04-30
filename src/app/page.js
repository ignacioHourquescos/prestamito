"use client";
import { useState, useEffect, useRef } from "react";
import styles from "./page.module.css";

export default function Home() {
	const [showSplash, setShowSplash] = useState(true);
	const [isPlaying, setIsPlaying] = useState(false);

	const videoRef = useRef(null);

	// useEffect(() => {
	// 	const timer = setTimeout(() => {
	// 		setShowSplash(false);
	// 	}, 5000); // 5000 milliseconds = 5 seconds

	// 	return () => clearTimeout(timer);
	// }, []); // Run only once on component mount

	const handlePlay = () => {
		setIsPlaying(true);
		videoRef.current.play();
	};

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
		</main>
	);
}
