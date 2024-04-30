"use client";
import { useState, useRef } from "react";
import styles from "./page.module.css";

export default function Home() {
	const videoRef = useRef(null);
	const [isPlaying, setIsPlaying] = useState(false);

	const handlePlay = () => {
		setIsPlaying(true);
		videoRef.current.play();
	};

	return (
		<main className={styles.main}>
			<div className={styles.videoContainer}>
				<video ref={videoRef} className={styles.video} controls={false}>
					<source src="../../intro2.mp4" type="video/mp4" />
					Your browser does not support the video tag.
				</video>
				{!isPlaying && (
					<button className={styles.playButton} onClick={handlePlay}>
						Empezar
					</button>
				)}
			</div>
		</main>
	);
}
