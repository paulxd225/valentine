import foto1 from "./assets/foto1.jpg";
import foto2 from "./assets/foto2.jpeg";
import foto3 from "./assets/foto3.jpg";
import foto4 from "./assets/foto4.jpg";
import foto5 from "./assets/foto5.jpg";
import foto6 from "./assets/foto6.jpg";
import foto7 from "./assets/foto7.jpg";
import foto8 from "./assets/foto8.jpg";
import foto9 from "./assets/foto9.jpeg";
import foto10 from "./assets/foto10.png";
import foto11 from "./assets/foto11.jpg";

import React, { useState, useRef, useEffect, useMemo } from "react";
import "./style.css";
import song from "./assets/song.mp3";
import rejectionVideo from "./assets/video.mp4";

// --- COMPONENTE: PÉTALOS/FLORES CAYENDO ---
function FallingParticles({ type = "petal" }) {
	const icons =
		type === "petal" ? ["🌸", "💮", "🍃"] : ["🌻", "🌹", "🌷", "🌼"];

	// useMemo evita que las partículas se regeneren y causen tirones al actualizar el contador
	const particles = useMemo(
		() =>
			Array.from({ length: 20 }, (_, i) => ({
				id: i,
				icon: icons[Math.floor(Math.random() * icons.length)],
				left: Math.random() * 100,
				delay: Math.random() * 10,
				duration: 5 + Math.random() * 10,
				size: 15 + Math.random() * 20,
			})),
		[icons],
	);

	return (
		<div className="fixed inset-0 pointer-events-none z-80 overflow-hidden">
			{particles.map((p) => (
				<div
					key={p.id}
					className="falling-particle absolute top-[-10%]"
					style={{
						left: `${p.left}%`,
						animationDelay: `${p.delay}s`,
						animationDuration: `${p.duration}s`,
						fontSize: `${p.size}px`,
					}}
				>
					{p.icon}
				</div>
			))}
		</div>
	);
}

// --- COMPONENTE: PÁGINA DEL VIDEO (Opción NO) ---
function VideoPage({ onBack }) {
	return (
		<div className="w-full min-h-screen flex flex-col items-center justify-center bg-[#2a0808] p-4 z-[200] relative">
			<div className="absolute top-10 text-6xl animate-pulse">🏴‍☠️</div>
			<button
				type="button"
				onClick={onBack}
				className="fixed top-4 left-4 z-100 text-white bg-red-600/60 p-3 border-b-4 border-r-4 border-black font-pixel-love text-xl"
			>
				← Volver
			</button>
			<div className="w-full max-w-md border-4 border-red-500 bg-black p-2 shadow-[0_0_20px_red]">
				<p className="font-pixel-love text-red-500 text-xl md:text-2xl mt-4 mb-4 animate-pulse text-center">
					Hijole...creo que no se va a poder <br /> Esta opción no existe en mi
					mundo
				</p>
				<video
					src={rejectionVideo}
					autoPlay
					controls
					className="w-full border-2 border-red-900"
				>
					<track kind="captions" srcLang="es" label="Español" />
				</video>
			</div>
			<div className="mt-8 flex gap-4 text-4xl">
				<span>☠️</span>
				<span>❤️</span>
				<span>☠️</span>
			</div>
			<span className="font-pixel-love text-red-500 text-xl md:text-2xl mt-4 mb-4 animate-pulse text-center">
				PORQUE PARA MI NO EXISTE UN MUNDO EN EL QUE NO ESTÉS A MI LADO 🥹
			</span>
		</div>
	);
}

// --- COMPONENTE: PÁGINA DE SAN VALENTÍN (SÍ) ---
function ValentinePage({ onBack }) {
	const startDate = useMemo(() => new Date("2019-06-06T00:00:00"), []);

	const calculateTimeLeft = (start) => {
		const now = new Date();
		const diff = now - start;
		return {
			años: Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25)),
			meses: Math.floor((diff / (1000 * 60 * 60 * 24 * 30.44)) % 12),
			días: Math.floor((diff / (1000 * 60 * 60 * 24)) % 30.44),
			horas: Math.floor((diff / (1000 * 60 * 60)) % 24),
			minutos: Math.floor((diff / 1000 / 60) % 60),
			segundos: Math.floor((diff / 1000) % 60),
		};
	};

	const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft(startDate));

	useEffect(() => {
		function getTimeLeft() {
			const now = new Date();
			const diff = now - startDate;
			return {
				años: Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25)),
				meses: Math.floor((diff / (1000 * 60 * 60 * 24 * 30.44)) % 12),
				días: Math.floor((diff / (1000 * 60 * 60 * 24)) % 30.44),
				horas: Math.floor((diff / (1000 * 60 * 60)) % 24),
				minutos: Math.floor((diff / 1000 / 60) % 60),
				segundos: Math.floor((diff / 1000) % 60),
			};
		}
		const timer = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
		return () => clearInterval(timer);
	}, [startDate]);

	const heartColors = ["#FF0000", "#FF69B4", "#FF1493", "#FFFFFF", "#FFB6C1"];

	// Memorizamos los corazones para que no se reinicien con el contador
	const hearts = useMemo(
		() =>
			Array.from({ length: 50 }, (_, i) => ({
				id: i,
				left: Math.random() * 100,
				top: Math.random() * 100,
				delay: Math.random() * 3,
				size: 20 + Math.random() * 30,
				color: heartColors[Math.floor(Math.random() * heartColors.length)],
			})),
		[],
	);

	return (
		<div className="w-full min-h-screen flex flex-col items-center bg-[#0ea5e9] p-4 text-white overflow-y-auto pb-20 relative">
			<FallingParticles type="petal" />
			{onBack()}
			<div className="mt-24 text-center space-y-8 w-full max-w-2xl flex flex-col items-center z-10">
				<h2 className="font-pixel-love text-2xl md:text-3xl text-white drop-shadow-[2px_2px_0px_#000] px-2">
					SABÍA QUE DIRÍAS QUE SÍ VOLUNTARIAMENTE :v ❤️ <br />
					Gracias por compartir tu vida conmigo desde hace...
				</h2>
				<div className="grid grid-cols-2 md:grid-cols-3 gap-3 font-pixel-love w-full">
					{Object.entries(timeLeft).map(([label, value]) => (
						<div
							key={label}
							className="bg-black/40 p-3 border-b-4 border-r-4 border-black"
						>
							<div className="text-3xl text-white">{value}</div>
							<div className="text-xs uppercase">{label}</div>
						</div>
					))}
				</div>

				<div className="relative w-full h-64 mt-4 overflow-hidden rounded-xl bg-white/10 border-2 border-dashed border-white/30">
					{hearts.map((h) => (
						<div
							key={h.id}
							className="absolute animate-bounce opacity-80"
							style={{
								left: `${h.left}%`,
								top: `${h.top}%`,
								animationDelay: `${h.delay}s`,
								fontSize: `${h.size}px`,
								color: h.color,
							}}
						>
							❤️
						</div>
					))}
					<div className="absolute inset-0 flex items-center justify-center">
						<span className="font-pixel-love text-4xl animate-pulse">
							Eres el motivo que convierte el cansancio en propósito
							<br></br>TE AMO
						</span>
					</div>
				</div>
			</div>
		</div>
	);
}

// --- COMPONENTE: NUESTRA HISTORIA ---
function HistoryPage({ onBack, onNext }) {
	const fotos = [
		{
			id: 1,
			url: foto7,
			text: "La verdad es que me empecé a enamorar de ti desde antes que lo sospecharas... ❤️",
		},
		{
			id: 2,
			url: foto1,
			text: "Y cuando menos lo sospechamos ya estabamos soteniendo el corazon del otro",
		},
		{
			id: 3,
			url: foto3,
			text: "Nunca olvidare nuestro primer 14 de febrero juntos...",
		},
		{
			id: 4,
			url: foto2,
			text: "Ni todas las adversidades que pasamos juntos",
		},
		{
			id: 5,
			url: foto4,
			text: "Ni nuestras aventuras por mas grandes o pequeñas que sean",
		},
		{ id: 6, url: foto5, text: "Adoro cada salida contigo" },
		{
			id: 7,
			url: foto6,
			text: "Porque eres el motor que me motiva a vivir",
		},
		{
			id: 8,
			url: foto8,
			text: "Y adoro vivir cada dia y fecha especial contigo",
		},
		{
			id: 9,
			url: foto9,
			text: "Siempre serás mi inspiración",
		},
		{
			id: 10,
			url: foto10,
			text: "Porque gracias a ti he sido mejor persona dia con dia",
		},
	];

	return (
		<div className="w-full min-h-screen bg-[#7c3aed] p-4 pb-20 overflow-y-auto relative">
			<FallingParticles type="flower" />
			{onBack()}
			<h2 className="mt-20 text-center font-pixel-love text-3xl text-yellow-400 mb-12 drop-shadow-[3px_3px_0px_#000] z-10 relative">
				BITÁCORA DE VIAJE 🏴‍☠️
			</h2>
			<div className="flex flex-col items-center gap-16 z-10 relative">
				{fotos.map((foto, index) => (
					<div
						key={foto.id}
						className={`bg-white p-3 pb-10 shadow-2xl w-64 border-4 border-pink-200 transform ${index % 2 === 0 ? "rotate-3" : "-rotate-3"}`}
					>
						<div className="bg-gray-200 w-full aspect-square overflow-hidden border-2 border-gray-100">
							<img
								src={foto.url}
								alt="Foto"
								className="w-full h-full object-cover"
							/>
						</div>
						<p className="font-pixel-love text-black text-center mt-4 text-lg italic">
							{foto.text}
						</p>
					</div>
				))}
			</div>

			<div className="mt-20 flex flex-col items-center gap-8 pb-10">
				<p className="text-center font-pixel-love text-3xl text-yellow-400 drop-shadow-[3px_3px_0px_#000] z-10 relative">
					Esta historia aún no termina...
				</p>
				<button
					type="button"
					onClick={onNext}
					className="pixel-btn bg-pink-500 animate-bounce !w-auto px-8 flex items-center gap-2"
				>
					❤️ Me acompañas?
				</button>
			</div>
		</div>
	);
}

// --- COMPONENTE: PÁGINA FINAL ---
function FinalPage({ onHome }) {
	return (
		<div className="w-full min-h-screen bg-[#ff4d6d] flex flex-col items-center justify-center p-6 text-center">
			<FallingParticles type="petal" />
			<h2 className="font-pixel-love text-4xl mb-8 animate-pulse text-white drop-shadow-[3px_3px_0px_#000]">
				TE AMARÉ PARA TODA LA VIDA
			</h2>
			<div className="bg-white p-4 shadow-2xl rotate-2 border-8 border-pink-100 mb-8 max-w-sm">
				<img src={foto11} alt="Final" className="w-full h-auto" />
			</div>
			<p className="font-pixel-love text-3xl mb-12 text-white drop-shadow-[2px_2px_0px_#000]">
				Eres mi historia inacabada, la melodía constante que desafía al tiempo y
				a la lógica. Aunque la distancia o la vida nos prueben, no puedo
				imaginar un mundo donde tu esencia no sea mi refugio y tu mirada mi
				único destino posible. Eres, simple y hermosamente, el 'sin embargo' más
				hermoso a todo. ❤️
			</p>
			<button
				type="button"
				onClick={onHome}
				className="pixel-btn bg-black !w-48"
			>
				HOME
			</button>
		</div>
	);
}

// --- APP PRINCIPAL ---
export default function App() {
	const [page, setPage] = useState("start");
	const [isOpen, setIsOpen] = useState(false);
	const audioRef = useRef(null);

	const heartGrid = [
		[0, 0, 2, 2, 2, 0, 0, 0, 2, 2, 2, 0, 0],
		[0, 2, 1, 1, 1, 2, 0, 2, 1, 1, 1, 2, 0],
		[2, 1, 3, 3, 1, 1, 2, 1, 1, 1, 1, 1, 2],
		[2, 1, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
		[2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
		[0, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0],
		[0, 0, 2, 1, 1, 1, 1, 1, 1, 1, 2, 0, 0],
		[0, 0, 0, 2, 1, 1, 1, 1, 1, 2, 0, 0, 0],
		[0, 0, 0, 0, 2, 1, 1, 1, 2, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 2, 1, 2, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0],
	];

	const handleStart = () => {
		setIsOpen(true);
		if (audioRef.current) audioRef.current.play();
		setTimeout(() => setPage("menu"), 800);
	};

	const handleHome = () => {
		setIsOpen(false); // Resetea el estado de apertura para que el corazón se vea
		setPage("start");
	};

	const renderBackButton = () => (
		<button
			type="button"
			onClick={() => setPage("menu")}
			className="fixed top-4 left-4 z-[100] text-white bg-black/60 p-3 border-b-4 border-r-4 border-black font-pixel-love text-xl"
		>
			← Volver
		</button>
	);

	return (
		<main className="min-h-screen bg-[#ff6bd6] text-white flex flex-col items-center justify-center relative overflow-hidden">
			<audio ref={audioRef} src={song} loop>
				<track kind="captions" srcLang="es" label="Español" />
			</audio>

			{page === "start" && (
				<div className="relative flex flex-col items-center w-full h-full justify-center">
					<FallingParticles type="petal" />
					<h2 className="font-pixel-love text-2xl text-white mb-8 drop-shadow-[2px_2px_0px_#000] animate-bounce text-center px-4">
						A MI PROMETIDA EVELYN 💍
					</h2>
					<button
						type="button"
						className={`flex flex-col items-center cursor-pointer transition-all duration-700 bg-transparent border-0 p-0 font-inherit ${isOpen ? "scale-[15] opacity-0" : "scale-100"}`}
						onClick={handleStart}
					>
						<div className="grid grid-cols-13 w-[300px] md:w-[400px] gap-0 heart-beat relative">
							{heartGrid
								.flat()
								.map((pixel, i) => ({ pixel, id: i }))
								.map((cell) => (
									<div
										key={cell.id}
										className={`aspect-square ${cell.pixel === 1 ? "bg-red-600" : cell.pixel === 3 ? "bg-white" : cell.pixel === 2 ? "bg-black" : "bg-transparent"}`}
									/>
								))}
							<div className="absolute inset-0 flex items-center justify-center pointer-events-none text-center px-4">
								<span className="font-pixel-love text-white text-2xl md:text-3xl drop-shadow-[2px_2px_0px_#000]">
									PULSA PARA CONTINUAR
								</span>
							</div>
						</div>
					</button>
				</div>
			)}

			{page === "menu" && (
				<div className="flex flex-col items-center gap-8 animate-in fade-in zoom-in duration-500 p-4 max-w-lg text-center bg-[#ff6bd6] border-4 border-double border-white shadow-2xl">
					<p className="font-pixel-love text-yellow-100 text-lg md:text-xl italic bg-black/40 p-4 border-2 border-dashed border-white/30">
						Quiero que sepas la verdad detrás de mi esfuerzo. Todo lo que
						estudio no es solo por plata... estudio para formar los cimientos de
						nuestro porvenir. No me esfuerzo solo para tener, lo hago para
						podernos, para poder darte estabilidad, compartir viajes, vivencias
						y levantar los muros de nuestro hogar y fortaleza de amor. Eres mi
						"por que" más fuerte. Felíz San Valentín, mi razón uwu.
					</p>
					<h1 className="text-xl md:text-3xl text-[#0b1020] drop-shadow-[2px_2px_0px_white] leading-snug">
						¿ACEPTAS SER MI NAKAMA PARA TODA LA VIDA?? UWU 🏴‍☠️
					</h1>
					<div className="flex flex-col gap-4 w-full max-w-xs">
						<div className="flex gap-4">
							<button
								type="button"
								onClick={() => setPage("valentine")}
								className="pixel-btn bg-[#fff] flex-1 !text-[#000] !text-shadow-2xs"
							>
								SI
							</button>
							<button
								type="button"
								onClick={() => setPage("no")}
								className="pixel-btn bg-red-600 flex-1 text-gray-300"
							>
								NO
							</button>
						</div>
						<button
							type="button"
							onClick={() => setPage("history")}
							className="pixel-btn bg-blue-600"
						>
							Nuestra Historia
						</button>
					</div>
				</div>
			)}

			{page === "valentine" && <ValentinePage onBack={renderBackButton} />}
			{page === "history" && (
				<HistoryPage
					onBack={renderBackButton}
					onNext={() => setPage("final")}
				/>
			)}
			{page === "final" && <FinalPage onHome={handleHome} />}
			{page === "no" && <VideoPage onBack={() => setPage("menu")} />}
		</main>
	);
}
