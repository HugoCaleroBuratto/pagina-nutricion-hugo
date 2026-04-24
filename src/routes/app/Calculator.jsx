import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Icon } from "../../components/ui/Icon";
import { KcalRing } from "../../components/nutrition/KcalRing";
import {
  ACTIVITY_FACTORS,
  GOAL_ADJUSTMENTS,
  calcMacros,
  calcTDEE,
  suggestPresetPlan,
} from "../../utils/tdee";
import { useAuth } from "../../context/AuthContext";
import { updateProfile } from "../../lib/queries/profiles";

const num = (min, max, { int = false } = {}) =>
  int ? z.number().int().min(min).max(max) : z.number().min(min).max(max);

const schema = z.object({
  age: num(10, 100, { int: true }),
  sex: z.enum(["male", "female", "other"]),
  heightCm: num(120, 230),
  weightKg: num(30, 300),
  activity: z.enum(Object.keys(ACTIVITY_FACTORS)),
  goal: z.enum(Object.keys(GOAL_ADJUSTMENTS)),
});

// Custom resolver: coerce numeric string fields to numbers before zod parsing.
// Avoids issues with preprocess + valueAsNumber + zod v4 in @hookform/resolvers.
const NUMERIC_FIELDS = ["age", "heightCm", "weightKg"];
const numericResolver = async (values) => {
  const coerced = { ...values };
  for (const k of NUMERIC_FIELDS) {
    const v = coerced[k];
    if (typeof v === "number") continue;
    if (v === "" || v === null || v === undefined) {
      coerced[k] = NaN;
    } else {
      const n = Number(v);
      coerced[k] = n;
    }
  }
  const result = schema.safeParse(coerced);
  if (result.success) return { values: result.data, errors: {} };
  const errors = {};
  for (const issue of result.error.issues) {
    const path = issue.path.join(".");
    if (!errors[path]) errors[path] = { type: issue.code, message: issue.message };
  }
  return { values: {}, errors };
};

const GOAL_ICONS = { lose: "local_fire_department", maintain: "balance", gain: "fitness_center" };

export function Calculator() {
  const { user, profile, refreshProfile } = useAuth();
  const navigate = useNavigate();
  const [result, setResult] = useState(null);
  const [saving, setSaving] = useState(false);

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      age: profile?.age ?? 28,
      sex: profile?.sex ?? "male",
      heightCm: profile?.height_cm ?? 175,
      weightKg: profile?.weight_kg ?? 75,
      activity: profile?.activity_level ?? "moderate",
      goal: profile?.goal ?? "maintain",
    },
  });

  const goal = watch("goal");

  function onCalc(values) {
    const { tdee } = calcTDEE(values);
    const macros = calcMacros(tdee);
    const suggested = suggestPresetPlan(tdee);
    setResult({ tdee, macros, suggested, values });
    setTimeout(() => {
      document.getElementById("result")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  }

  async function saveAsTarget() {
    if (!result || !user) return;
    setSaving(true);
    try {
      await updateProfile(user.id, {
        age: result.values.age,
        sex: result.values.sex,
        height_cm: result.values.heightCm,
        weight_kg: result.values.weightKg,
        activity_level: result.values.activity,
        goal: result.values.goal,
        target_kcal: result.tdee,
      });
      await refreshProfile();
      navigate("/app/catalogo");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-display text-3xl font-bold text-on-surface">Calculadora de objetivo</h1>
        <p className="text-on-surface-variant mt-2">
          Ajustá tu plan nutricional según tu cuerpo y tus metas.
        </p>
      </header>

      <form onSubmit={handleSubmit(onCalc)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <NumberCard label="Edad" suffix="años" {...register("age")} error={errors.age} />
          <NumberCard label="Altura" suffix="cm" {...register("heightCm")} error={errors.heightCm} />
        </div>

        <NumberCard label="Peso actual" suffix="kg" step="0.1" {...register("weightKg")} error={errors.weightKg} large />

        <Card className="space-y-3">
          <span className="text-xs font-semibold tracking-wider text-outline uppercase">Sexo biológico</span>
          <div className="grid grid-cols-3 gap-2">
            {[
              { v: "male",   label: "Hombre" },
              { v: "female", label: "Mujer" },
              { v: "other",  label: "Otro" },
            ].map((opt) => (
              <PillToggle
                key={opt.v}
                label={opt.label}
                active={watch("sex") === opt.v}
                onClick={() => setValue("sex", opt.v, { shouldValidate: true })}
              />
            ))}
          </div>
        </Card>

        <Card className="space-y-3">
          <span className="text-xs font-semibold tracking-wider text-outline uppercase">Nivel de actividad</span>
          <div className="grid grid-cols-1 gap-2">
            {Object.entries(ACTIVITY_FACTORS).map(([k, v]) => (
              <SelectableRow
                key={k}
                label={v.label}
                active={watch("activity") === k}
                onClick={() => setValue("activity", k, { shouldValidate: true })}
              />
            ))}
          </div>
        </Card>

        <Card className="space-y-3">
          <span className="text-xs font-semibold tracking-wider text-outline uppercase">Tu objetivo</span>
          <div className="grid grid-cols-1 gap-2">
            {Object.entries(GOAL_ADJUSTMENTS).map(([k, v]) => (
              <SelectableRow
                key={k}
                icon={GOAL_ICONS[k]}
                label={v.label}
                hint={v.detail}
                active={goal === k}
                onClick={() => setValue("goal", k, { shouldValidate: true })}
              />
            ))}
          </div>
        </Card>

        <Button type="submit" fullWidth size="lg">
          Calcular objetivo
        </Button>
      </form>

      {result && (
        <section
          id="result"
          className="relative overflow-hidden mt-10 p-8 rounded-3xl bg-primary-container/20 border border-primary-container/40"
        >
          <div className="relative z-10 space-y-8">
            <h3 className="text-xs font-semibold tracking-widest text-primary uppercase text-center">
              Calorías diarias recomendadas
            </h3>
            <div className="flex justify-center">
              <KcalRing value={result.tdee} max={4000} />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <Macro label="Proteína" value={`${result.macros.protein}g`} />
              <Macro label="Carbos"   value={`${result.macros.carbs}g`} />
              <Macro label="Grasas"   value={`${result.macros.fat}g`} />
            </div>
            <div className="bg-surface-lowest/80 rounded-2xl p-5 flex items-start gap-4">
              <div className="bg-secondary-container/60 p-2 rounded-xl">
                <Icon name="lightbulb" className="text-secondary" />
              </div>
              <div className="text-sm">
                <p className="font-semibold text-on-surface mb-1">Plan sugerido</p>
                <p className="text-on-surface-variant">
                  Tu objetivo está cerca del plan de <strong>{result.suggested} kcal</strong>.
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <Button fullWidth size="lg" onClick={saveAsTarget} disabled={saving}>
                {saving ? "Guardando…" : "Guardar y elegir plan"}
              </Button>
              <Link to="/app/catalogo">
                <Button fullWidth size="md" variant="ghost">Ver catálogo sin guardar</Button>
              </Link>
            </div>
          </div>
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-secondary/10 rounded-full blur-3xl" />
        </section>
      )}
    </div>
  );
}

function NumberCard({ label, suffix, error, large = false, ...rest }) {
  return (
    <Card className="flex flex-col gap-2" padding={large ? "p-6" : "p-5"}>
      <label className="text-xs font-semibold tracking-wider text-outline uppercase">{label}</label>
      <div className="flex items-baseline gap-1">
        <input
          type="number"
          inputMode="decimal"
          {...rest}
          className="w-full bg-transparent border-none p-0 font-display font-semibold text-2xl text-primary focus:outline-none focus:ring-0"
        />
        <span className="text-sm text-outline">{suffix}</span>
      </div>
      {error && <p className="text-xs text-error">{error.message}</p>}
    </Card>
  );
}

function PillToggle({ label, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`py-3 rounded-full font-display font-semibold text-sm transition-all ${
        active
          ? "bg-primary text-on-primary shadow-soft"
          : "bg-surface-low text-on-surface-variant hover:bg-surface-container"
      }`}
    >
      {label}
    </button>
  );
}

function SelectableRow({ icon, label, hint, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center justify-between p-4 rounded-lg border-2 transition-all ${
        active
          ? "border-primary-container bg-secondary-container/30 text-on-primary-container"
          : "border-transparent bg-surface-low text-on-surface-variant hover:border-outline-variant"
      }`}
    >
      <div className="flex items-center gap-3 text-left">
        {icon && <Icon name={icon} className={active ? "text-primary" : ""} />}
        <div>
          <p className="font-medium text-sm">{label}</p>
          {hint && <p className="text-xs opacity-70">{hint}</p>}
        </div>
      </div>
      {active && <Icon name="check_circle" filled className="text-primary" />}
    </button>
  );
}

function Macro({ label, value }) {
  return (
    <div className="text-center">
      <p className="text-xs font-semibold tracking-wider text-outline uppercase mb-1">{label}</p>
      <p className="font-display font-semibold text-xl text-on-surface">{value}</p>
    </div>
  );
}
