import React, { useState, useRef, useEffect } from "react";
import "./style.css";
import song from "./assets/song.mp3";

// --- COMPONENTE: PÁGINA DE SAN VALENTÍN (Contador y Árbol) ---
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

	return (
		<div className="w-full min-h-screen flex flex-col items-center bg-[#5c1a1a] p-4 text-white overflow-y-auto pb-20">
			{onBack()} {/* Ejecutamos la función del botón */}
			<div className="mt-24 text-center space-y-8 w-full max-w-2xl">
				<h2 className="font-pixel-love text-3xl text-pink-400 drop-shadow-[2px_2px_0px_#000]">
					Mi amor por ti comenzó hace...
				</h2>

				{/* CONTADOR EN GRID */}
				<div className="grid grid-cols-2 md:grid-cols-3 gap-3 font-pixel-love">
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

				<div className="p-6 bg-black/20 border-2 border-dashed border-red-500/50">
					<p className="font-pixel-love text-xl leading-relaxed">
						"Cada segundo a tu lado es un tesoro en el Grand Line de mi vida."
					</p>
				</div>

				{/* ANIMACIÓN DEL ÁRBOL (BASE) */}
				<div className="relative h-48 w-full flex items-end justify-center mt-12">
					<div className="w-6 h-24 bg-orange-900 border-2 border-black relative">
						{/* Hojas/Corazones del árbol */}
						<div className="absolute -top-16 -left-12 text-5xl animate-bounce">
							❤️
						</div>
						<div className="absolute -top-20 -right-8 text-4xl animate-pulse delay-75">
							💖
						</div>
						<div className="absolute -top-12 left-2 text-4xl animate-bounce delay-150">
							💗
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

// --- COMPONENTE: NUESTRA HISTORIA (Polaroids) ---
function HistoryPage({ onBack }) {
	// Aquí configuras cada foto manualmente con su formato y texto
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
						className={`bg-white p-3 pb-10 shadow-2xl w-64 transform transition-transform hover:scale-105 ${
							index % 2 === 0
								? "rotate-3 translate-x-4"
								: "-rotate-3 -translate-x-4"
						}`}
					>
						<div className="bg-gray-200 w-full aspect-square overflow-hidden border-2 border-gray-100">
							<img
								src={foto.url}
								alt="Nuestra foto"
								className="w-full h-full object-cover"
								// Esto evita que las imágenes se estiren feo
								style={{ imageRendering: "auto" }}
							/>
						</div>
						<p className="font-pixel-love text-black text-center mt-4 text-lg italic leading-tight">
							{foto.text}
						</p>
					</div>
				))}
			</div>
		</div>
	);
}

// --- COMPONENTE PRINCIPAL ---
function App() {
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

	// Función que devuelve el botón de regreso
	const renderBackButton = () => (
		<button
			onClick={() => setPage("menu")}
			className="fixed top-4 left-4 z-[100] text-white bg-black/60 p-3 border-b-4 border-r-4 border-black font-pixel-love text-xl active:translate-y-1 active:border-0"
		>
			← Volver
		</button>
	);

	return (
		<main className="min-h-screen bg-[#4c1d95] text-white flex flex-col items-center justify-center relative overflow-hidden">
			<audio ref={audioRef} src={song} loop />

			{page === "start" && (
				<div
					className={`flex flex-col items-center justify-center cursor-pointer transition-all duration-700 ${isOpen ? "scale-[15] opacity-0" : "scale-100"}`}
					onClick={handleStart}
				>
					<div className="grid grid-cols-13 w-[300px] md:w-[400px] gap-0 heart-beat relative">
						{heartGrid.flat().map((pixel, i) => (
							<div
								key={i}
								className={`aspect-square ${
									pixel === 1
										? "bg-red-600"
										: pixel === 3
											? "bg-white"
											: pixel === 2
												? "bg-black"
												: "bg-transparent"
								}`}
							/>
						))}
						<div className="absolute inset-0 flex items-center justify-center pointer-events-none">
							<span className="font-pixel-love text-white text-center text-xl md:text-2xl drop-shadow-[2px_2px_0px_#000] leading-tight px-4">
								PULSA PARA CONTINUAR
							</span>
						</div>
					</div>
				</div>
			)}

			{page === "menu" && (
				<div className="flex flex-col items-center gap-8 animate-in fade-in zoom-in duration-500">
					<h1 className="text-xl md:text-2xl text-center text-yellow-300 drop-shadow-[4px_4px_0px_#000]">
						¡HOLA MI NAKAMA! 🏴‍☠️
					</h1>
					<div className="flex flex-col gap-6 w-80 p-4 text-center">
						<button
							onClick={() => setPage("valentine")}
							className="pixel-btn bg-red-600"
						>
							¿QUIERES SER MI VALENTIN?
						</button>
						<button
							onClick={() => setPage("history")}
							className="pixel-btn bg-blue-600"
						>
							NUESTRA HISTORIA
						</button>
					</div>
				</div>
			)}

			{page === "valentine" && <ValentinePage onBack={renderBackButton} />}
			{page === "history" && <HistoryPage onBack={renderBackButton} />}
		</main>
	);
}

export default App;
