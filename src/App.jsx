import { useState } from 'react'
import AddFoodForm from './components/AddFoodForm'
import CartTable from './components/CartTable'
import CustomFoodModal from './components/CustomFoodModal'
import NutritionPanel from './components/NutritionPanel'
import ProgressCharacter from './components/ProgressCharacter'
import { useCart } from './hooks/useCart'
import { FOODS } from './data/foods'
import { DIET_PLAN } from './data/plan'

export default function App() {
  const { items, boughtIds, addItem, removeItem, toggleBought, clearCart, loadPlan } = useCart()
  const [showModal, setShowModal] = useState(false)
  const [customFoods, setCustomFoods] = useState([])
  const [showPlanConfirm, setShowPlanConfirm] = useState(false)

  function handleSaveCustom(food) {
    setCustomFoods(prev => [...prev, food])
  }

  function handleLoadPlan() {
    if (items.length > 0) {
      setShowPlanConfirm(true)
    } else {
      loadPlan(DIET_PLAN, [...FOODS, ...customFoods])
    }
  }

  function confirmLoadPlan() {
    loadPlan(DIET_PLAN, [...FOODS, ...customFoods])
    setShowPlanConfirm(false)
  }

  const boughtCount = boughtIds.size
  const totalCount  = items.length
  const allDone     = totalCount > 0 && boughtCount === totalCount

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-emerald-600 to-green-500 shadow-lg">
        <div className="max-w-6xl mx-auto px-4 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🥗</span>
            <div>
              <h1 className="text-xl font-extrabold text-white leading-none tracking-tight">
                Calculadora de Alimentos
              </h1>
              <p className="text-emerald-100 text-xs mt-0.5">
                Planificá tu compra para 1, 7 y 14 días 🛒
              </p>
            </div>
          </div>
          {totalCount > 0 && (
            <div className="text-right hidden sm:block">
              <p className="text-emerald-100 text-xs">Productos en lista</p>
              <p className="text-white font-bold text-2xl leading-none">{totalCount}</p>
            </div>
          )}
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6 space-y-5">

        {/* ── Plan loader banner ─────────────────────────────────────────── */}
        <div className="bg-gradient-to-r from-violet-500 to-purple-500 rounded-2xl shadow-md p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <span className="text-3xl shrink-0">📋</span>
            <div>
              <p className="text-white font-bold text-sm leading-tight">Plan de dieta de 5 comidas</p>
              <p className="text-violet-100 text-xs mt-1 leading-relaxed">
                Desayuno · Almuerzo · Cena temprana · Merienda · Cena
                <br />
                Incluye pollo, carne roja, pescado, arroz, huevos, verduras y más.
              </p>
            </div>
          </div>
          <button
            onClick={handleLoadPlan}
            className="shrink-0 bg-white text-violet-600 font-bold text-sm px-5 py-2.5 rounded-xl hover:bg-violet-50 transition-colors shadow-sm"
          >
            ✨ Cargar mi plan
          </button>
        </div>

        {/* ── Add food form ──────────────────────────────────────────────── */}
        <AddFoodForm
          onAdd={addItem}
          onAddCustom={() => setShowModal(true)}
          customFoods={customFoods}
        />

        {/* ── Character + progress bar ──────────────────────────────────── */}
        {totalCount > 0 && (
          <ProgressCharacter boughtCount={boughtCount} totalCount={totalCount} />
        )}

        {/* ── Nutrition panel ───────────────────────────────────────────── */}
        <NutritionPanel items={items} />

        {/* ── Shopping progress bar ─────────────────────────────────────── */}
        {totalCount > 0 && (
          <div className={`rounded-2xl shadow-sm border p-5 transition-all duration-500 ${
            allDone
              ? 'bg-gradient-to-r from-emerald-400 to-green-400 border-emerald-300'
              : 'bg-white border-gray-100'
          }`}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-xl">{allDone ? '🎉' : '🛍️'}</span>
                <span className={`font-semibold text-sm ${allDone ? 'text-white' : 'text-gray-700'}`}>
                  {allDone
                    ? '¡Compra completada! ¡Sos un crack! 🏆'
                    : 'Progreso de compra'}
                </span>
              </div>
              <span className={`text-sm font-bold tabular-nums ${allDone ? 'text-white' : 'text-emerald-600'}`}>
                {boughtCount} / {totalCount}
              </span>
            </div>

            {/* Bar */}
            <div className={`w-full rounded-full h-4 overflow-hidden ${allDone ? 'bg-emerald-300/50' : 'bg-gray-100'}`}>
              <div
                className={`h-4 rounded-full transition-all duration-700 ease-out ${
                  allDone
                    ? 'bg-white'
                    : boughtCount === 0
                    ? 'bg-emerald-300'
                    : 'bg-gradient-to-r from-emerald-400 to-green-500'
                }`}
                style={{ width: totalCount === 0 ? '0%' : `${(boughtCount / totalCount) * 100}%` }}
              />
            </div>

            {/* Item pills */}
            <div className="flex flex-wrap gap-1.5 mt-3">
              {items.map(item => (
                <button
                  key={item.id}
                  onClick={() => toggleBought(item.id)}
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer ${
                    boughtIds.has(item.id)
                      ? allDone
                        ? 'bg-white/30 text-white line-through'
                        : 'bg-emerald-100 text-emerald-600 line-through opacity-60'
                      : allDone
                      ? 'bg-white/20 text-white hover:bg-white/30'
                      : 'bg-gray-100 text-gray-600 hover:bg-emerald-50 hover:text-emerald-700'
                  }`}
                  title={boughtIds.has(item.id) ? 'Marcar como pendiente' : 'Marcar como comprado'}
                >
                  <span>{item.food.emoji || '🍽️'}</span>
                  <span>{item.food.name}</span>
                  {boughtIds.has(item.id) && <span>✓</span>}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── Cart table ────────────────────────────────────────────────── */}
        <CartTable
          items={items}
          boughtIds={boughtIds}
          onRemove={removeItem}
          onToggleBought={toggleBought}
          onClear={clearCart}
        />

        {/* ── Legend ────────────────────────────────────────────────────── */}
        {items.length > 0 && (
          <div className="flex flex-wrap gap-4 text-xs text-gray-400 no-print pb-6">
            <span className="flex items-center gap-1.5">
              <span className="text-base">🥩</span>
              Crudo = peso antes de cocinar
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-base">🍳</span>
              Cocido = peso estimado después de cocinar
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-base">☑️</span>
              Tildá los ítems ya comprados
            </span>
          </div>
        )}
      </main>

      {/* ── Custom food modal ─────────────────────────────────────────────── */}
      {showModal && (
        <CustomFoodModal
          onClose={() => setShowModal(false)}
          onSave={handleSaveCustom}
        />
      )}

      {/* ── Confirm overwrite plan modal ──────────────────────────────────── */}
      {showPlanConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 text-center">
            <p className="text-4xl mb-3">⚠️</p>
            <h2 className="text-base font-bold text-gray-800 mb-2">¿Reemplazar el carrito?</h2>
            <p className="text-sm text-gray-500 mb-5">
              Ya tenés ítems en el carrito. Si cargás el plan, se van a borrar todos y se cargará el plan de 5 comidas.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowPlanConfirm(false)}
                className="flex-1 py-2 border border-gray-300 rounded-xl text-sm text-gray-600 hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                onClick={confirmLoadPlan}
                className="flex-1 py-2 bg-gradient-to-r from-violet-500 to-purple-500 text-white rounded-xl text-sm font-bold hover:opacity-90"
              >
                Sí, cargar plan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
