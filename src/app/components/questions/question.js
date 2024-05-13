// DotsMobileStepper.js

import * as React from "react";
import { useTheme } from "@mui/material/styles";
import MobileStepper from "@mui/material/MobileStepper";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";

import WebcamVideo from "./components/webCam";
import styles from "./question.module.css";

export default function DotsMobileStepper() {
	const theme = useTheme();
	const [activeStep, setActiveStep] = React.useState(0);
	const [resetAnimation, setResetAnimation] = React.useState(false);
	const [capturing, setCapturing] = React.useState(false);

	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
		setResetAnimation(true);
	};

	const questions = [
		[
			"¿Hace cuántos años comenzaste?",
			"¿Cuántas personas trabajan?",
			"¿Tienes otro trabajo aparte?",
		],
		[
			"¿Nos podrías hacer un breve video mostrando tus herramientas de trabajo (mobiliario, herramientas, mercadería, etc)?",
		],
		[
			"¿Nos podrías contar cómo manejas las finanzas de tu emprendimiento?",
			"¿Cómo llevas los números? (en un cuaderno, en una planilla, etc..)",
		],
		["Por último,", "¿Para qué utilizarías el dinero del préstamo?"],
	];

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
		setResetAnimation(true);
	};

	const stepTexts = [
		{
			title: "Acerca de vos",
			questions: [
				"¿Hace cuántos años comenzaste?",
				"¿Cuántas personas trabajan?",
				"¿Tienes otro trabajo aparte?",
			],
		},
		{
			title: "Acerca de tu emprendimiento",
			questions: [
				"¿Nos podrías hacer un breve video mostrando tus herramientas de trabajo (mobiliario, herramientas, mercadería, etc)?",
			],
		},

		{
			title: "Acerca de tus finanzas",
			questions: [
				"¿Nos podrías contar cómo manejas las finanzas de tu emprendimiento?",
				"¿Cómo llevas los números? (en un cuaderno, en una planilla, etc..)",
			],
		},
		{
			title: "Acerca del préstamo",
			questions: [
				"Por último,",
				"¿Para qué utilizarías el dinero del préstamo?",
			],
		},
		{
			title: "Gracias",
			questions: ["Nos conctataremos con vo via Whatsapp"],
		},
	];

	// Restablecer resetAnimation cada vez que cambia el paso activo
	React.useEffect(() => {
		setResetAnimation(false);
	}, [activeStep]);

	const handleStartCaptureClick = () => {
		setCapturing(true);
	};

	const handleStopCaptureClick = () => {
		setCapturing(false);
		setResetAnimation(true);
	};

	return (
		<div className={`${styles.container} ${styles.koho_regular}`}>
			{activeStep % 2 == 0 && (
				<div className={styles.introStep}>
					{stepTexts[Math.floor(activeStep / 2)].title} {/* Título */}
					{/* Preguntas debajo del título */}
					{stepTexts[Math.floor(activeStep / 2)].questions.map(
						(question, index) => (
							<div className={styles.questions_specific} key={index}>
								{question}
							</div>
						)
					)}
				</div>
			)}
			<MobileStepper
				variant="dots"
				steps={8}
				position="static"
				activeStep={activeStep}
				sx={{ maxWidth: 600, flexGrow: 1 }}
				nextButton={
					<Button size="small" onClick={handleNext} disabled={activeStep === 8}>
						Siguiente
						{theme.direction === "rtl" ? (
							<KeyboardArrowLeft />
						) : (
							<KeyboardArrowRight />
						)}
					</Button>
				}
				backButton={
					<Button size="small" onClick={handleBack} disabled={activeStep === 0}>
						{theme.direction === "rtl" ? (
							<KeyboardArrowRight />
						) : (
							<KeyboardArrowLeft />
						)}
						Anterior
					</Button>
				}
			/>
			<WebcamVideo
				resetAnimation={resetAnimation}
				capturing={capturing}
				onStartCaptureClick={handleStartCaptureClick}
				onStopCaptureClick={handleStopCaptureClick}
			/>
			{/* <div className={styles.questions}>
            {activeStep % 2 === 0 ? (
              questions[activeStep].map((question, index) => (
                <div key={index} className={styles.questions_specific}>
                  {question}
                </div>
              ))
            ) : (
              <div className={styles.questions_specific}>
                {questions[activeStep]}
              </div>
            )}
          </div> */}
		</div>
	);
}
