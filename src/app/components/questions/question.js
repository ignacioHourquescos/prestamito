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

	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
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
	};

	return (
		<div className={styles.container}>
			<MobileStepper
				variant="dots"
				steps={questions.length}
				position="static"
				activeStep={activeStep}
				sx={{ maxWidth: 600, flexGrow: 1 }}
				nextButton={
					<Button
						size="small"
						onClick={handleNext}
						disabled={activeStep === questions.length - 1}
					>
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
			<WebcamVideo />
			<div className={styles.questions}>
				{questions[activeStep].map((question, index) => (
					<React.Fragment key={index}>
						<div className={styles.questions_specific}>{question}</div>
						{index !== questions[activeStep].length - 1}
					</React.Fragment>
				))}
			</div>
		</div>
	);
}
