// WebcamVideo.js

import React, { useCallback, useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import style from "./webCam.module.css";

export default function WebcamVideo({ resetAnimation }) {
	const webcamRef = useRef(null);
	const mediaRecorderRef = useRef(null);
	const [capturing, setCapturing] = useState(false);
	const [recordedChunks, setRecordedChunks] = useState([]);
	const [showAnimation, setShowAnimation] = useState(false);
	const [blink, setBlink] = useState(false);
	const [completed, setCompleted] = useState(false);
	const [counter, setCounter] = useState(30); // Inicializar el contador en 30 segundos

	const handleDataAvailable = useCallback(
		({ data }) => {
			if (data.size > 0) {
				setRecordedChunks((prev) => prev.concat(data));
			}
		},
		[setRecordedChunks]
	);

	const handleStartCaptureClick = useCallback(() => {
		setCapturing(true);
		setShowAnimation(true);
		setCompleted(false);
		setCounter(30); // Reiniciar el contador cuando se inicia la captura
		mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
			mimeType: "video/webm",
		});
		mediaRecorderRef.current.addEventListener(
			"dataavailable",
			handleDataAvailable
		);
		mediaRecorderRef.current.start();
	}, [webcamRef, setCapturing, mediaRecorderRef, handleDataAvailable]);

	const handleStopCaptureClick = useCallback(() => {
		mediaRecorderRef.current.stop();
		setCapturing(false);
		setShowAnimation(false);
	}, [mediaRecorderRef, setCapturing]);

	useEffect(() => {
		if (showAnimation) {
			const timeout = setTimeout(() => {
				setShowAnimation(false);
				setCompleted(true);
			}, 30000); // 30 seconds
			const interval = setInterval(() => {
				setBlink((prev) => !prev);
				setCounter((prev) => prev - 1); // Reducir el contador en 1 cada segundo
			}, 1000); // Actualizar cada segundo
			return () => {
				clearInterval(interval);
				clearTimeout(timeout);
			};
		}
	}, [showAnimation]);
	useEffect(() => {
		if (resetAnimation) {
			setShowAnimation(false);
			setCompleted(false);
			setCounter(30);
			setCapturing(false); // Asegura que la captura se detenga cuando cambie de paso
		}
	}, [resetAnimation]);
	const handleDownload = useCallback(() => {
		if (recordedChunks.length) {
			const blob = new Blob(recordedChunks, {
				type: "video/webm",
			});
			const url = URL.createObjectURL(blob);
			const a = document.createElement("a");
			document.body.appendChild(a);
			a.style = "display: none";
			a.href = url;
			a.download = "react-webcam-stream-capture.webm";
			a.click();
			window.URL.revokeObjectURL(url);
			setRecordedChunks([]);
		}
	}, [recordedChunks]);

	const videoConstraints = {
		width: 420,
		height: 420,
		facingMode: "user",
	};

	return (
		<div className={style.container}>
			<div className={style.video_wrapper}>
				<div className={style.video_wrapper_center}>
					<Webcam
						width={300}
						audio={false}
						mirrored={true}
						ref={webcamRef}
						videoConstraints={videoConstraints}
					/>
					{showAnimation && !completed && (
						<div className={style.animationOverlay}>
							<div className={style.notificationWrapperRed}>
								<span
									className={`${style.redCircle} ${blink ? style.blink : ""}`}
								></span>
								<span className={style.recordingText}>Grabando</span>
							</div>
						</div>
					)}
					{completed && (
						<div className={style.animationOverlay}>
							<div className={style.notificationWrapperGreen}>
								<span className={style.completedText}>✅</span>
								<span className={style.completedText}>
									Video capturado con éxito
								</span>
							</div>
						</div>
					)}
				</div>
				{showAnimation && <div className={style.redLine}></div>}
			</div>

			<div
				style={{
					width: "100%",
					textAlign: "center",
					fontSize: "2rem",
					fontWeight: "bold",
				}}
			>
				{capturing ? (
					<button
						className={`${style.startButton2} ${style.stopButton}`}
						onClick={handleStopCaptureClick}
					>
						Reiniciar
					</button>
				) : (
					<button
						className={style.startButton2}
						onClick={() => {
							handleStartCaptureClick();
						}}
					>
						Iniciar captura
					</button>
				)}
			</div>
			{capturing && <div className={style.counter}>{counter} segundos</div>}
			{/* {recordedChunks.length > 0 && (
                <button className={style.startButton2} onClick={handleDownload}>
                    Download
                </button>
            )} */}
		</div>
	);
}
