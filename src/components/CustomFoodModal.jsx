import { useState } from 'react'
import { X } from 'lucide-react'

export default function CustomFoodModal({ onClose, onSave }) {
  const [form, setForm] = useState({
    name: '',
    category: '',
    gramsPerUnit: '',
    cookingFactor: '1.0',
  })
  const [error, setError] = useState('')

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    setError('')
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!form.name.trim()) return setError('El nombre es obligatorio.')
    if (!form.category.trim()) return setError('La categoría es obligatoria.')
    const factor = parseFloat(form.cookingFactor)
    if (isNaN(factor) || factor <= 0) return setError('El factor de cocción debe ser un número positivo.')

    onSave({
      id: `custom_${crypto.randomUUID()}`,
      name: form.name.trim(),
      category: form.category.trim(),
      gramsPerUnit: form.gramsPerUnit ? parseFloat(form.gramsPerUnit) : null,
      cookingFactor: factor,
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-semibold text-gray-800">Alimento personalizado</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Field label="Nombre del alimento *">
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Ej: Chucrut"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </Field>

          <Field label="Categoría *">
            <input
              name="category"
              value={form.category}
              onChange={handleChange}
              placeholder="Ej: Fermentados"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </Field>

          <Field label="Gramos por unidad (opcional)" hint="Dejar vacío si se mide en gramos">
            <input
              name="gramsPerUnit"
              type="number"
              min="0"
              step="any"
              value={form.gramsPerUnit}
              onChange={handleChange}
              placeholder="Ej: 150"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </Field>

          <Field
            label="Factor de cocción *"
            hint="< 1: pierde peso (carnes) | > 1: gana peso (cereales) | 1: sin cambio"
          >
            <input
              name="cookingFactor"
              type="number"
              min="0.01"
              step="0.01"
              value={form.cookingFactor}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </Field>

          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}

          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

function Field({ label, hint, children }) {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      {hint && <p className="text-xs text-gray-400">{hint}</p>}
      {children}
    </div>
  )
}
