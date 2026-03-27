import { Trash2, CheckCircle2, Circle } from 'lucide-react'
import { rawForDays, cookedForDays, formatGrams } from '../utils/calculations'

export default function CartRow({ item, bought, onRemove, onToggleBought }) {
  const { food, gramsPerDay, inputType, inputValue } = item

  const raw1   = rawForDays(gramsPerDay, 1)
  const raw7   = rawForDays(gramsPerDay, 7)
  const raw14  = rawForDays(gramsPerDay, 14)
  const cook1  = cookedForDays(gramsPerDay, 1,  food.cookingFactor)
  const cook7  = cookedForDays(gramsPerDay, 7,  food.cookingFactor)
  const cook14 = cookedForDays(gramsPerDay, 14, food.cookingFactor)

  const inputLabel = inputType === 'units'
    ? `${inputValue} ud${inputValue !== 1 ? 's' : ''}`
    : `${inputValue} g`

  return (
    <tr
      className={`border-b border-gray-100 transition-all duration-300 ${
        bought ? 'bg-emerald-50/60 opacity-70' : 'hover:bg-gray-50'
      }`}
    >
      {/* Checkbox */}
      <td className="py-2.5 pl-3 pr-1 no-print">
        <button
          onClick={() => onToggleBought(item.id)}
          className={`transition-colors ${bought ? 'text-emerald-500' : 'text-gray-300 hover:text-emerald-400'}`}
          title={bought ? 'Desmarcar' : 'Marcar como comprado'}
        >
          {bought
            ? <CheckCircle2 className="w-5 h-5" />
            : <Circle className="w-5 h-5" />
          }
        </button>
      </td>

      {/* Name */}
      <td className="py-2.5 px-3 text-sm">
        <div className={`font-medium flex items-center gap-1.5 ${bought ? 'text-gray-400 line-through' : 'text-gray-800'}`}>
          <span className="text-base">{food.emoji || '🍽️'}</span>
          {food.name}
        </div>
        <div className="text-xs text-gray-400">{inputLabel} / día</div>
        {item.meal && (
          <div className="text-xs text-emerald-500 mt-0.5">{item.meal}</div>
        )}
      </td>

      {/* Crudo */}
      <td className={`py-2.5 px-3 text-sm text-center ${bought ? 'text-gray-400' : 'text-gray-600'}`}>{formatGrams(raw1)}</td>
      <td className={`py-2.5 px-3 text-sm text-center ${bought ? 'text-gray-400' : 'text-gray-600'}`}>{formatGrams(raw7)}</td>
      <td className={`py-2.5 px-3 text-sm text-center ${bought ? 'text-gray-400' : 'text-gray-600'}`}>{formatGrams(raw14)}</td>

      {/* Cocido */}
      <td className={`py-2.5 px-3 text-sm text-center ${bought ? 'text-gray-400' : 'text-amber-600'}`}>{formatGrams(cook1)}</td>
      <td className={`py-2.5 px-3 text-sm text-center ${bought ? 'text-gray-400' : 'text-amber-600'}`}>{formatGrams(cook7)}</td>
      <td className={`py-2.5 px-3 text-sm text-center ${bought ? 'text-gray-400' : 'text-amber-600'}`}>{formatGrams(cook14)}</td>

      {/* Delete */}
      <td className="py-2.5 px-3 text-center no-print">
        <button
          onClick={() => onRemove(item.id)}
          className="text-gray-300 hover:text-red-500 transition-colors"
          title="Eliminar"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </td>
    </tr>
  )
}
