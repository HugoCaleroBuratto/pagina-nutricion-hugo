import { useEffect, useState } from 'react'

/**
 * Personaje animado que reacciona al progreso de compra.
 * Cambia expresión, color y mensaje según el % de ítems tildados.
 */

const STATES = [
  {
    min: 0, max: 0,
    emoji: '😴',
    face: '( ˘ω˘ )zzZ',
    name: 'Dormido',
    msg: '¡Cargá tu lista y a hacer las compras!',
    bg: 'from-slate-100 to-gray-200',
    ring: 'ring-gray-300',
    textColor: 'text-gray-500',
    bubble: 'bg-gray-100 text-gray-500',
    anim: 'animate-pulse',
  },
  {
    min: 1, max: 24,
    emoji: '😐',
    face: '( •_•)',
    name: 'Despierto',
    msg: 'Empezando de a poco... ¡dale que podés!',
    bg: 'from-blue-50 to-indigo-100',
    ring: 'ring-blue-300',
    textColor: 'text-blue-600',
    bubble: 'bg-blue-50 text-blue-600',
    anim: '',
  },
  {
    min: 25, max: 49,
    emoji: '🙂',
    face: '( ´ω`)',
    name: 'Animado',
    msg: '¡Buen arranque! Ya van unos cuantos.',
    bg: 'from-yellow-50 to-amber-100',
    ring: 'ring-yellow-300',
    textColor: 'text-amber-600',
    bubble: 'bg-amber-50 text-amber-600',
    anim: 'animate-bounce',
  },
  {
    min: 50, max: 74,
    emoji: '😄',
    face: '( ＾▽＾)',
    name: 'Contento',
    msg: '¡Más de la mitad! ¡Vamos con todo! 💪',
    bg: 'from-orange-50 to-orange-200',
    ring: 'ring-orange-300',
    textColor: 'text-orange-600',
    bubble: 'bg-orange-50 text-orange-600',
    anim: 'animate-bounce',
  },
  {
    min: 75, max: 99,
    emoji: '🤩',
    face: '(*ﾟ∀ﾟ*)',
    name: 'Emocionado',
    msg: '¡Casi llegamos! ¡Unos pocos más! 🔥',
    bg: 'from-pink-100 to-rose-200',
    ring: 'ring-pink-400',
    textColor: 'text-pink-600',
    bubble: 'bg-pink-50 text-pink-600',
    anim: 'animate-bounce',
  },
  {
    min: 100, max: 100,
    emoji: '🎉',
    face: '\\(≧▽≦)/',
    name: '¡Crack!',
    msg: '¡COMPRA COMPLETADA! ¡Sos un campeón! 🏆',
    bg: 'from-emerald-400 to-green-400',
    ring: 'ring-emerald-400',
    textColor: 'text-white',
    bubble: 'bg-white/20 text-white',
    anim: 'animate-spin-slow',
  },
]

function getState(boughtCount, totalCount) {
  if (totalCount === 0) return STATES[0]
  const pct = Math.round((boughtCount / totalCount) * 100)
  return STATES.find(s => pct >= s.min && pct <= s.max) ?? STATES[STATES.length - 1]
}

export default function ProgressCharacter({ boughtCount, totalCount }) {
  const state    = getState(boughtCount, totalCount)
  const pct      = totalCount === 0 ? 0 : Math.round((boughtCount / totalCount) * 100)
  const isWin    = pct === 100 && totalCount > 0

  // Confetti particles for win state
  const [confetti] = useState(() =>
    Array.from({ length: 18 }, (_, i) => ({
      id: i,
      left: `${(i * 5.5) % 100}%`,
      delay: `${(i * 0.12).toFixed(2)}s`,
      color: ['bg-yellow-400','bg-pink-400','bg-sky-400','bg-emerald-400','bg-violet-400','bg-orange-400'][i % 6],
    }))
  )

  return (
    <div className={`relative rounded-2xl shadow-sm border border-white/50 p-5 bg-gradient-to-br ${state.bg} transition-all duration-700 overflow-hidden`}>

      {/* Confetti rain on win */}
      {isWin && confetti.map(c => (
        <div
          key={c.id}
          className={`absolute top-0 w-2 h-2 rounded-sm ${c.color} opacity-80`}
          style={{
            left: c.left,
            animation: `confettiFall 1.4s ${c.delay} ease-in infinite`,
          }}
        />
      ))}

      <div className="flex items-center gap-4">
        {/* Character face */}
        <div className={`relative shrink-0 w-20 h-20 rounded-full bg-white/40 backdrop-blur-sm ring-4 ${state.ring} flex flex-col items-center justify-center shadow-inner transition-all duration-500 ${state.anim}`}>
          <span className="text-4xl leading-none select-none">{state.emoji}</span>
          <span className="text-xs font-mono text-gray-600 mt-1 leading-none">{state.face}</span>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-sm font-extrabold ${state.textColor}`}>{state.name}</span>
            {totalCount > 0 && (
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${state.bubble}`}>
                {boughtCount}/{totalCount} · {pct}%
              </span>
            )}
          </div>
          <p className={`text-xs leading-snug ${state.textColor} opacity-90`}>{state.msg}</p>

          {/* Mini progress bar */}
          {totalCount > 0 && (
            <div className="mt-3 w-full bg-white/30 rounded-full h-2 overflow-hidden">
              <div
                className="h-2 rounded-full bg-white/80 transition-all duration-700 ease-out"
                style={{ width: `${pct}%` }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
