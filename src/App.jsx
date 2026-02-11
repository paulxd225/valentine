import React, { useState, useRef, useEffect } from "react";
import "./style.css";
import song from "./assets/song.mp3";
import rejectionVideo from "./assets/video.mp4";

// --- COMPONENTE: PÉTALOS/FLORES CAYENDO ---
function FallingParticles({ type = "petal" }) {
	const icons =
		type === "petal" ? ["🌸", "💮", "🍃"] : ["🌻", "🌹", "🌷", "🌼"];
	const particles = Array.from({ length: 20 }, (_, i) => ({
		id: i,
		icon: icons[Math.floor(Math.random() * icons.length)],
		left: Math.random() * 100,
		delay: Math.random() * 10,
		duration: 5 + Math.random() * 10,
		size: 15 + Math.random() * 20,
	}));

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
		<div className="w-full min-h-screen flex flex-col items-center justify-center bg-black p-4 z-[200] relative">
			<button
				type="button"
				onClick={onBack}
				className="fixed top-4 left-4 z-100 text-white bg-red-600/60 p-3 border-b-4 border-r-4 border-black font-pixel-love text-xl"
			>
				← Regresar
			</button>
			<div className="w-full max-w-md border-4 border-white bg-gray-900 p-2 shadow-2xl">
				<p className="font-pixel-love text-white text-xl md:text-2xl mt-4 mb-4 animate-pulse text-center">
					Hijole... creo que no se va a poder
				</p>
				<video
					src={rejectionVideo}
					autoPlay
					controls
					className="w-full border-2 border-white"
				>
					<track kind="captions" srcLang="es" label="Español" />
				</video>
			</div>
			<p className="font-pixel-love text-red-500 text-xl mt-6 animate-bounce text-center">
				Lo siento, esta opción no es seleccionable.
			</p>
		</div>
	);
}

// --- COMPONENTE: PÁGINA DE SAN VALENTÍN (SÍ) ---
function ValentinePage({ onBack }) {
	const startDate = new Date("2019-06-06T00:00:00");
	const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

	function calculateTimeLeft() {
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

	useEffect(() => {
		const start = new Date("2019-06-06T00:00:00");
		function getTimeLeft() {
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
		}
		const timer = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
		return () => clearInterval(timer);
	}, []);

	const heartColors = ["#FF0000", "#FF69B4", "#FF1493", "#FFFFFF", "#FFB6C1"];
	const hearts = Array.from({ length: 120 }, (_, i) => {
		let x, y, r, t;
		if (i < 60) {
			t = (i / 60) * 2 * Math.PI;
			r = 1;
		} else {
			t = Math.random() * 2 * Math.PI;
			r = Math.sqrt(Math.random());
		}
		x = r * 16 * Math.pow(Math.sin(t), 3);
		y =
			r *
			-(
				13 * Math.cos(t) -
				5 * Math.cos(2 * t) -
				2 * Math.cos(3 * t) -
				Math.cos(4 * t)
			);
		return {
			id: i,
			x: x * 7.5,
			y: y * 7.5,
			delay: 1.8 + (i < 60 ? i * 0.03 : Math.random() * 2),
			size: i < 60 ? 18 : Math.random() * 12 + 10,
			color: heartColors[Math.floor(Math.random() * heartColors.length)],
			rotate: Math.random() * 40 - 20,
		};
	});

	return (
		<div className="w-full min-h-screen flex flex-col items-center bg-[#0ea5e9] p-4 text-white overflow-y-auto pb-20 relative">
			<FallingParticles type="petal" />
			{onBack()}
			<div className="mt-24 text-center space-y-8 w-full max-w-2xl flex flex-col items-center z-10">
				<h2 className="font-pixel-love text-2xl md:text-3xl text-[#cac3d6] drop-shadow-[2px_2px_0px_#000] px-2">
					Gracias por aceptar "voluntariamente" jsjs uwu, y gracias por aceptar
					compartir mi vida contigo hace...
				</h2>
				<div className="grid grid-cols-2 md:grid-cols-3 gap-3 font-pixel-love w-full">
					{Object.entries(timeLeft).map(([label, value]) => (
						<div
							key={label}
							className="bg-black/40 p-3 border-b-4 border-r-4 border-black"
						>
							<div className="text-3xl text-qhite-500">{value}</div>
							<div className="text-xs uppercase">{label}</div>
						</div>
					))}
				</div>

				<div className="relative h-[450px] w-full flex items-end justify-center mt-10 mb-10 scale-90 md:scale-100">
					<div className="w-7 h-40 bg-[#3d2523] border-2 border-black animate-trunk relative z-10">
						<div className="absolute top-12 right-full w-24 h-3 bg-[#3d2523] border-2 border-black origin-right -rotate-[35deg] animate-branch">
							<div className="absolute top-0 right-full w-14 h-2 bg-[#3d2523] border-2 border-black origin-right rotate-[40deg]">
								<div className="absolute top-0 right-full w-8 h-1 bg-[#3d2523] border-black origin-right -rotate-[20deg]" />
							</div>
						</div>
						<div className="absolute top-6 left-full w-28 h-3 bg-[#3d2523] border-2 border-black origin-left rotate-[40deg] animate-branch">
							<div className="absolute top-0 left-full w-16 h-2 bg-[#3d2523] border-2 border-black origin-left -rotate-[30deg]">
								<div className="absolute top-0 left-full w-10 h-1 bg-[#3d2523] border-black origin-left rotate-[25deg]" />
							</div>
						</div>
						<div className="absolute -top-12 left-1/2 -translate-x-1/2 w-3 h-16 bg-[#3d2523] border-2 border-black animate-branch">
							<div className="absolute top-0 left-full w-10 h-2 bg-[#3d2523] border-2 border-black origin-left -rotate-[45deg]" />
							<div className="absolute top-0 right-full w-10 h-2 bg-[#3d2523] border-2 border-black origin-right rotate-[45deg]" />
						</div>
					</div>
					<div className="absolute bottom-56 z-20">
						{hearts.map((h) => (
							<div
								key={h.id}
								className="absolute animate-pop opacity-0 pointer-events-none"
								style={{
									left: `${h.x}px`,
									top: `${h.y}px`,
									animationDelay: `${h.delay}s`,
									fontSize: `${h.size}px`,
									color: h.color,
									transform: `rotate(${h.rotate}deg)`,
									textShadow:
										h.color === "#FFFFFF" ? "0 0 5px #FF69B4" : "none",
								}}
							>
								❤️
							</div>
						))}
					</div>
					<div className="absolute bottom-0 w-80 h-3 bg-[#2d1a1a] border-b-4 border-black" />
				</div>
			</div>
		</div>
	);
}

// --- COMPONENTE: NUESTRA HISTORIA ---
function HistoryPage({ onBack }) {
	const fotos = [
		{
			id: 1,
			url: "/src/assets/foto7.jpg",
			text: "La verdad es que me empecé a enamorar de ti desde antes que lo sospecharas... ❤️",
		},
		{
			id: 2,
			url: "/src/assets/foto1.jpg",
			text: "Y cuando menos lo sospechamos ya estabamos soteniendo el corazon del otro",
		},
		{
			id: 3,
			url: "/src/assets/foto3.jpg",
			text: "Nunca olvidare nuestro primer 14 de febrero juntos...",
		},
		{
			id: 4,
			url: "/src/assets/foto2.jpeg",
			text: "Ni todas las adversidades que pasamos juntos",
		},
		{
			id: 5,
			url: "/src/assets/foto4.jpg",
			text: "Ni nuestras aventuras por mas grandes o pequeñas que sean",
		},
		{ id: 6, url: "/src/assets/foto5.jpg", text: "Adoro cada salida contigo" },
		{
			id: 7,
			url: "/src/assets/foto6.jpg",
			text: "Porque eres el motor que me motiva a vivir",
		},
		{
			id: 8,
			url: "/src/assets/foto8.jpg",
			text: "Y adoro vivir cada dia y fecha especial contigo",
		},
		{
			id: 9,
			url: "/src/assets/foto9.jpeg",
			text: "Siempre serás mi inspiración",
		},
		{
			id: 10,
			url: "/src/assets/foto10.png",
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
						className={`bg-white p-3 pb-10 shadow-2xl w-64 transform ${index % 2 === 0 ? "rotate-3" : "-rotate-3"}`}
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
			<p className="mt-20 text-center font-pixel-love text-3xl text-yellow-400 mb-12 drop-shadow-[3px_3px_0px_#000] z-10 relative">
				Esta historia aun no termina...{" "}
			</p>
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
				<div className="flex flex-col items-center gap-8 animate-in fade-in zoom-in duration-500 p-4 max-w-lg text-center bg-[#2a2a2a]">
					<p className="font-pixel-love text-yellow-100 text-lg md:text-xl italic bg-black/20 p-4 border-2 border-dashed border-white/30">
						Quiero que sepas la verdad detrás de mi esfuerzo. Todo lo que
						estudio no es solo por plata, sino para formar los cimientos de
						nuestro porvenir. No estudio para tener, estudio para podernos: para
						poder darte estabilidad, compartir viajes, y levantar juntos los
						muros de nuestro amor. Eres mi 'por qué' más fuerte. Feliz San
						Valentín, mi razón uwu
					</p>
					<h1 className="text-xl md:text-3xl text--300 drop-shadow-[4px_4px_0px_red] leading-snug">
						ACEPTAS SER MI NAKAMA PARA TODA LA VIDA?? UWU 🏴‍☠️
					</h1>
					<div className="flex flex-col gap-4 w-full max-w-xs">
						<div className="flex gap-4">
							<button
								type="button"
								onClick={() => setPage("valentine")}
								className="pixel-btn bg-white flex-1 uppercase  text-red-600"
							>
								SÍ
							</button>
							<button
								type="button"
								onClick={() => setPage("no")}
								className="pixel-btn bg-red-600 flex-1 uppercase text-gray-300"
							>
								NO
							</button>
						</div>
						<button
							type="button"
							onClick={() => setPage("history")}
							className="pixel-btn bg-blue-600 uppercase text-sm md:text-lg"
						>
							Nuestra Historia
						</button>
					</div>
				</div>
			)}

			{page === "valentine" && <ValentinePage onBack={renderBackButton} />}
			{page === "history" && <HistoryPage onBack={renderBackButton} />}
			{page === "no" && <VideoPage onBack={() => setPage("menu")} />}
		</main>
	);
}
