import { useState } from "react";
import styles from "./index.module.css";

export default function BasicComponent() {
	const [isPlaying, setIsPlaying] = useState(false);

	const handlePlay = () => {
		setIsPlaying(true);
	};

	const handleNextScreen = () => {
		// Add logic to navigate to the next screen
	};

	return (
		<div className={styles.container}>
			<h1 className={styles.title}>Título de la Página</h1>

			{!isPlaying ? (
				<div className={styles.videoContainer}>
					<p>Coloca aquí el reproductor de video para dispositivos móviles</p>
					<button className={styles.playButton} onClick={handlePlay}>
						Reproducir Video
					</button>
				</div>
			) : (
				<div className={styles.videoContainer}>
					{/* Aquí puedes colocar el reproductor de video */}
					<p>Video Reproduciéndose...</p>
				</div>
			)}

			<button className={styles.nextButton} onClick={handleNextScreen}>
				Siguiente Pantalla
			</button>
		</div>
	);
}
