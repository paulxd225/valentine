import React, { useState, useRef, useEffect } from "react";
import "./style.css";
import song from "./assets/song.mp3";
import rejectionVideo from "./assets/video.mp4";

// --- COMPONENTE: PÁGINA DEL VIDEO (Opción NO) ---
function VideoPage({ onBack }) {
	return (
		<div className="w-full min-h-screen flex flex-col items-center justify-center bg-black p-4">
			{onBack()}
			<div className="w-full max-w-md border-4 border-white shadow-[0_0_20px_rgba(255,255,255,0.5)] bg-gray-900 p-2">
				<p className="font-pixel-love text-white text-xl md:text-2xl mt-4 mb-4 animate-pulse text-center">
					Hijole... creo que no se va a poder
				</p>
				<video
					src={rejectionVideo}
					autoPlay
					controls
					className="w-full border-2 border-white"
				/>
			</div>
			<p className="font-pixel-love text-red-500 text-xl mt-6 animate-bounce text-center">
				Lo siento, esta opción no es seleccionable.
			</p>
		</div>
	);
}

// --- COMPONENTE: PÁGINA DE SAN VALENTÍN ---
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
		const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
		return () => clearInterval(timer);
	}, []);

	// GENERACIÓN DE CORAZÓN ESTABLE (Contorno + Relleno)
	const heartColors = ["#FF0000", "#FF69B4", "#FF1493", "#FFFFFF", "#FFB6C1"];

	const hearts = Array.from({ length: 120 }, (_, i) => {
		let x, y, r, t;
		if (i < 60) {
			// Grupo 1: El contorno
			t = (i / 60) * 2 * Math.PI;
			r = 1;
		} else {
			// Grupo 2: Relleno
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
			x: x * 7.5,
			y: y * 7.5,
			delay: 1.8 + (i < 60 ? i * 0.03 : Math.random() * 2),
			size: i < 60 ? 18 : Math.random() * (22 - 10) + 10,
			color: heartColors[Math.floor(Math.random() * heartColors.length)],
			// Un pequeño giro aleatorio para que no todos se vean rectos
			rotate: Math.random() * 40 - 20,
		};
	});

	return (
		<div className="w-full min-h-screen flex flex-col items-center bg-[#5c1a1a] p-4 text-white overflow-y-auto pb-20">
			{onBack()}
			<div className="mt-24 text-center space-y-8 w-full max-w-2xl flex flex-col items-center">
				<h2 className="font-pixel-love text-2xl md:text-3xl text-pink-400 drop-shadow-[2px_2px_0px_#000] px-2">
					Gracias por aceptar "voluntariamente" jsjs uwu, y gracias por aceptar
					compartir mi vida contigo hace...
				</h2>
				<div className="grid grid-cols-2 md:grid-cols-3 gap-3 font-pixel-love w-full">
					{Object.entries(timeLeft).map(([label, value]) => (
						<div
							key={label}
							className="bg-black/40 p-3 border-b-4 border-r-4 border-black"
						>
							<div className="text-3xl text-red-500">{value}</div>
							<div className="text-xs uppercase">{label}</div>
						</div>
					))}
				</div>

				{/* --- ÁRBOL CON RAMAS TERCIARIAS --- */}
				<div className="relative h-[450px] w-full flex items-end justify-center mt-10 mb-10 scale-90 md:scale-100">
					<div className="w-7 h-40 bg-[#3d2523] border-2 border-black animate-trunk relative z-10">
						{/* RAMA PRINCIPAL IZQ */}
						<div className="absolute top-12 right-full w-24 h-3 bg-[#3d2523] border-2 border-black origin-right -rotate-[35deg] animate-branch">
							{/* Secundarias */}
							<div className="absolute top-0 right-full w-14 h-2 bg-[#3d2523] border-2 border-black origin-right rotate-[40deg]">
								{/* Terciaria */}
								<div className="absolute top-0 right-full w-8 h-1 bg-[#3d2523] border-black origin-right -rotate-[20deg]" />
							</div>
						</div>

						{/* RAMA PRINCIPAL DER */}
						<div className="absolute top-6 left-full w-28 h-3 bg-[#3d2523] border-2 border-black origin-left rotate-[40deg] animate-branch">
							{/* Secundarias */}
							<div className="absolute top-0 left-full w-16 h-2 bg-[#3d2523] border-2 border-black origin-left -rotate-[30deg]">
								{/* Terciaria */}
								<div className="absolute top-0 left-full w-10 h-1 bg-[#3d2523] border-black origin-left rotate-[25deg]" />
							</div>
						</div>

						{/* RAMA CENTRAL SUPERIOR */}
						<div className="absolute -top-12 left-1/2 -translate-x-1/2 w-3 h-16 bg-[#3d2523] border-2 border-black animate-branch">
							<div className="absolute top-0 left-full w-10 h-2 bg-[#3d2523] border-2 border-black origin-left -rotate-[45deg]" />
							<div className="absolute top-0 right-full w-10 h-2 bg-[#3d2523] border-2 border-black origin-right rotate-[45deg]" />
						</div>
					</div>

					{/* CORAZONES FORMANDO EL CORAZÓN GIGANTE */}
					<div className="absolute bottom-56 z-20">
						{hearts.map((h, i) => (
							<div
								key={i}
								className="absolute animate-pop opacity-0 pointer-events-none"
								style={{
									left: `${h.x}px`,
									top: `${h.y}px`,
									animationDelay: `${h.delay}s`,
									fontSize: `${h.size}px`,
									color: h.color, // <-- Aquí aplicamos el color variado
									transform: `rotate(${h.rotate}deg)`, // <-- Un toque extra de realismo
									textShadow:
										h.color === "#FFFFFF" ? "0 0 5px #FF69B4" : "none", // Brillo para los blancos
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
		{ id: 1, url: "/src/assets/foto7.jpg", text: "Nuestra primera cita ❤️" },
		{
			id: 2,
			url: "/src/assets/foto1.jpg",
			text: "Ese día que no paramos de reír",
		},
		{ id: 3, url: "/src/assets/foto3.jpg", text: "Viendo One Piece juntos" },
		{ id: 4, url: "/src/assets/foto2.jpeg", text: "Tu sonrisa favorita" },
		{ id: 5, url: "/src/assets/foto4.jpg", text: "Nuestra aventura en..." },
		{ id: 6, url: "/src/assets/foto5.jpg", text: "Un momento inolvidable" },
		{ id: 7, url: "/src/assets/foto6.jpg", text: "Nuestra mejor selfie" },
		{ id: 8, url: "/src/assets/foto8.jpg", text: "Celebrando juntos" },
		{ id: 9, url: "/src/assets/foto9.jpeg", text: "Eres mi nakama favorita" },
		{ id: 10, url: "/src/assets/foto10.png", text: "Por muchos años más" },
	];

	return (
		<div className="w-full min-h-screen bg-[#1a1c2c] p-4 pb-20 overflow-y-auto">
			{onBack()}
			<h2 className="mt-20 text-center font-pixel-love text-3xl text-yellow-400 mb-12 drop-shadow-[3px_3px_0px_#000]">
				BITÁCORA DE VIAJE 🏴‍☠️
			</h2>
			<div className="flex flex-col items-center gap-16">
				{fotos.map((foto, index) => (
					<div
						key={foto.id}
						className={`bg-white p-3 pb-10 shadow-2xl w-64 transform ${index % 2 === 0 ? "rotate-3 translate-x-4" : "-rotate-3 -translate-x-4"}`}
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
			onClick={() => setPage("menu")}
			className="fixed top-4 left-4 z-[100] text-white bg-black/60 p-3 border-b-4 border-r-4 border-black font-pixel-love text-xl"
		>
			← Volver
		</button>
	);

	return (
		<main className="min-h-screen bg-[#985fcb] text-white flex flex-col items-center justify-center relative overflow-hidden">
			<audio ref={audioRef} src={song} loop />

			{page === "start" && (
				<div
					className={`flex flex-col items-center cursor-pointer transition-all duration-700 ${isOpen ? "scale-[15] opacity-0" : "scale-100"}`}
					onClick={handleStart}
				>
					<div className="grid grid-cols-13 w-[300px] md:w-[400px] gap-0 heart-beat relative">
						{heartGrid.flat().map((pixel, i) => (
							<div
								key={i}
								className={`aspect-square ${pixel === 1 ? "bg-red-600" : pixel === 3 ? "bg-white" : pixel === 2 ? "bg-black" : "bg-transparent"}`}
							/>
						))}
						<div className="absolute inset-0 flex items-center justify-center pointer-events-none text-center px-4">
							<span className="font-pixel-love text-white text-2xl md:text-3xl drop-shadow-[2px_2px_0px_#000]">
								PULSA PARA CONTINUAR
							</span>
						</div>
					</div>
				</div>
			)}

			{page === "menu" && (
				<div className="flex flex-col items-center gap-8 animate-in fade-in zoom-in duration-500 p-4">
					<h1 className="text-xl md:text-3xl text-center text-yellow-300 drop-shadow-[4px_4px_0px_#000] leading-snug">
						¿ACEPTAS SER MI NAKAMA PARA TODA LA VIDA?? UWU 🏴‍☠️
					</h1>
					<div className="flex flex-col gap-4 w-full max-w-xs">
						<div className="flex gap-4">
							<button
								onClick={() => setPage("valentine")}
								className="pixel-btn bg-red-600 flex-1 uppercase"
							>
								SÍ
							</button>
							<button
								onClick={() => setPage("no")}
								className="pixel-btn bg-gray-600 flex-1 uppercase text-gray-300"
							>
								NO
							</button>
						</div>
						<button
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
			{page === "no" && <VideoPage onBack={renderBackButton} />}
		</main>
	);
}
