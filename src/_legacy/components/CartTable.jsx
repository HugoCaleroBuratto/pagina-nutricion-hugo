import { useRef } from 'react'
import { Printer, Trash2 } from 'lucide-react'
import { useReactToPrint } from 'react-to-print'
import CartRow from './CartRow'
import { rawForDays, cookedForDays, formatGrams } from '../utils/calculations'

const TH = 'px-3 py-2.5 text-xs font-semibold uppercase tracking-wide text-left'

export default function CartTable({ items, boughtIds, onRemove, onToggleBought, onClear }) {
  const printRef = useRef(null)

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: 'Lista de compras — Calculadora de Alimentos',
  })

  if (items.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 py-14 text-center">
        <p className="text-4xl mb-3">🛒</p>
        <p className="text-gray-400 text-sm font-medium">Tu carrito está vacío</p>
        <p className="text-gray-300 text-xs mt-1">Buscá un alimento arriba para comenzar</p>
      </div>
    )
  }

  const totals = items.reduce(
    (acc, item) => {
      acc.raw1   += rawForDays(item.gramsPerDay, 1)
      acc.raw7   += rawForDays(item.gramsPerDay, 7)
      acc.raw14  += rawForDays(item.gramsPerDay, 14)
      acc.cook1  += cookedForDays(item.gramsPerDay, 1,  item.food.cookingFactor)
      acc.cook7  += cookedForDays(item.gramsPerDay, 7,  item.food.cookingFactor)
      acc.cook14 += cookedForDays(item.gramsPerDay, 14, item.food.cookingFactor)
      return acc
    },
    { raw1: 0, raw7: 0, raw14: 0, cook1: 0, cook7: 0, cook14: 0 }
  )

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-100 no-print bg-gradient-to-r from-gray-50 to-white">
        <h2 className="text-base font-bold text-gray-700 flex items-center gap-2">
          📋 Lista de compras
          <span className="bg-emerald-100 text-emerald-600 text-xs font-semibold px-2 py-0.5 rounded-full">
            {items.length} ítems
          </span>
        </h2>
        <div className="flex gap-2">
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600 transition-colors"
          >
            <Printer className="w-4 h-4" />
            <span className="hidden sm:inline">Imprimir</span>
          </button>
          <button
            onClick={onClear}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm border border-red-200 rounded-lg hover:bg-red-50 text-red-500 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            <span className="hidden sm:inline">Vaciar</span>
          </button>
        </div>
      </div>

      {/* Printable area */}
      <div ref={printRef}>
        {/* Print-only header */}
        <div className="hidden print:block px-5 py-4 border-b">
          <h1 className="text-xl font-bold">🛒 Lista de compras</h1>
          <p className="text-sm text-gray-500">Generada el {new Date().toLocaleDateString('es-AR')}</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[740px]">
            <thead>
              <tr className="bg-gray-50">
                <th className="w-8 no-print" />
                <th className={`${TH} text-gray-500 w-40`}>Alimento</th>

                {/* Crudo group header */}
                <th
                  colSpan={3}
                  className="px-3 py-1.5 text-xs font-semibold text-gray-500 text-center border-l border-gray-200"
                >
                  🥩 Crudo
                </th>

                {/* Cocido group header */}
                <th
                  colSpan={3}
                  className="px-3 py-1.5 text-xs font-semibold text-amber-600 text-center border-l border-gray-200"
                >
                  🍳 Cocido
                </th>
                <th className="w-10 no-print" />
              </tr>
              <tr className="border-b-2 border-gray-200">
                <th className="no-print" />
                <th className={`${TH} text-gray-400`} />
                <th className={`${TH} text-gray-500 text-center border-l border-gray-100`}>1 día</th>
                <th className={`${TH} text-gray-500 text-center`}>7 días</th>
                <th className={`${TH} text-gray-500 text-center`}>14 días</th>
                <th className={`${TH} text-amber-500 text-center border-l border-gray-100`}>1 día</th>
                <th className={`${TH} text-amber-500 text-center`}>7 días</th>
                <th className={`${TH} text-amber-500 text-center`}>14 días</th>
                <th className="no-print" />
              </tr>
            </thead>
            <tbody>
              {items.map(item => (
                <CartRow
                  key={item.id}
                  item={item}
                  bought={boughtIds.has(item.id)}
                  onRemove={onRemove}
                  onToggleBought={onToggleBought}
                />
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-gradient-to-r from-emerald-50 to-green-50 border-t-2 border-emerald-200 font-bold">
                <td className="no-print" />
                <td className="py-3 px-3 text-sm text-emerald-700">📊 TOTAL</td>
                <td className="py-3 px-3 text-sm text-center text-gray-700">{formatGrams(totals.raw1)}</td>
                <td className="py-3 px-3 text-sm text-center text-gray-700">{formatGrams(totals.raw7)}</td>
                <td className="py-3 px-3 text-sm text-center text-gray-700">{formatGrams(totals.raw14)}</td>
                <td className="py-3 px-3 text-sm text-center text-amber-700">{formatGrams(totals.cook1)}</td>
                <td className="py-3 px-3 text-sm text-center text-amber-700">{formatGrams(totals.cook7)}</td>
                <td className="py-3 px-3 text-sm text-center text-amber-700">{formatGrams(totals.cook14)}</td>
                <td className="no-print" />
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  )
}
