// Mifflin-St Jeor BMR + factores de actividad estándar (Harris-Benedict revisado).
// Devuelve TDEE ajustado por objetivo y reparto de macros (ratio típico: 30/40/30).

export const ACTIVITY_FACTORS = {
  sedentary:   { factor: 1.2,   label: "Sedentario (poco o nada)" },
  light:       { factor: 1.375, label: "Ligero (1-3 días/sem)" },
  moderate:    { factor: 1.55,  label: "Moderado (3-5 días/sem)" },
  active:      { factor: 1.725, label: "Activo (6-7 días/sem)" },
  very_active: { factor: 1.9,   label: "Muy activo (físico intenso o doble turno)" },
};

export const GOAL_ADJUSTMENTS = {
  lose:     { delta: -500, label: "Perder peso", detail: "Déficit ~0.5 kg/sem" },
  maintain: { delta: 0,    label: "Mantener",    detail: "Sin cambio" },
  gain:     { delta: +400, label: "Ganar masa",  detail: "Superávit moderado" },
};

export const PRESET_PLANS = [1500, 2000, 2500, 3000, 3500];

export function calcBMR({ sex, weightKg, heightCm, age }) {
  const base = 10 * weightKg + 6.25 * heightCm - 5 * age;
  if (sex === "male") return base + 5;
  if (sex === "female") return base - 161;
  // 'other' → promedio
  return base - 78;
}

export function calcTDEE({ sex, weightKg, heightCm, age, activity, goal }) {
  const bmr = calcBMR({ sex, weightKg, heightCm, age });
  const factor = ACTIVITY_FACTORS[activity]?.factor ?? 1.2;
  const adj = GOAL_ADJUSTMENTS[goal]?.delta ?? 0;
  const tdee = Math.round(bmr * factor + adj);
  return { bmr: Math.round(bmr), maintenance: Math.round(bmr * factor), tdee };
}

export function calcMacros(targetKcal) {
  // 30% proteína, 40% carbos, 30% grasa
  const protein = Math.round((targetKcal * 0.3) / 4);
  const carbs   = Math.round((targetKcal * 0.4) / 4);
  const fat     = Math.round((targetKcal * 0.3) / 9);
  return { protein, carbs, fat };
}

export function suggestPresetPlan(targetKcal) {
  return PRESET_PLANS.reduce((best, p) =>
    Math.abs(p - targetKcal) < Math.abs(best - targetKcal) ? p : best
  );
}
