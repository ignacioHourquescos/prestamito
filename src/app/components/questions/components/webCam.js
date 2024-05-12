import React, { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";
import style from "./webCam.module.css";

export default function WebcamVideo(videoRecordedHandler) {
	const webcamRef = useRef(null);
	const mediaRecorderRef = useRef(null);
	const [capturing, setCapturing] = useState(false);
	const [recordedChunks, setRecordedChunks] = useState([]);
	const [showAnimation, setShowAnimation] = useState(false);

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
				</div>
				{showAnimation && <div className={style.redLine}></div>}
			</div>
			<div style={{ width: "100%" }}>
				{capturing ? (
					<button
						className={style.startButton2}
						onClick={handleStopCaptureClick}
					>
						Stop Capture
					</button>
				) : (
					<button
						className={style.startButton2}
						onClick={() => {
							handleStartCaptureClick();
							videoRecordedHandler();
						}}
					>
						Start Capture
					</button>
				)}
			</div>
			{/* {recordedChunks.length > 0 && (
				<button className={style.startButton2} onClick={handleDownload}>
					Download
				</button>
			)} */}
		</div>
	);
}
