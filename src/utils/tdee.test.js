import { describe, it, expect } from "vitest";
import { calcBMR, calcTDEE, calcMacros, suggestPresetPlan } from "./tdee";

describe("calcBMR (Mifflin-St Jeor)", () => {
  it("hombre 30 años, 80kg, 180cm => 1780", () => {
    expect(calcBMR({ sex: "male", weightKg: 80, heightCm: 180, age: 30 })).toBeCloseTo(1780, 0);
  });
  it("mujer 25 años, 60kg, 165cm => 1345.25", () => {
    expect(calcBMR({ sex: "female", weightKg: 60, heightCm: 165, age: 25 })).toBeCloseTo(1345.25, 1);
  });
});

describe("calcTDEE", () => {
  it("hombre moderado mantener => bmr * 1.55 redondeado", () => {
    const r = calcTDEE({
      sex: "male", weightKg: 80, heightCm: 180, age: 30,
      activity: "moderate", goal: "maintain",
    });
    expect(r.tdee).toBe(Math.round(1780 * 1.55));
  });
  it("hombre sedentario perder => -500", () => {
    const r = calcTDEE({
      sex: "male", weightKg: 80, heightCm: 180, age: 30,
      activity: "sedentary", goal: "lose",
    });
    expect(r.tdee).toBe(Math.round(1780 * 1.2 - 500));
  });
});

describe("calcMacros (30/40/30)", () => {
  it("2000 kcal => 150p / 200c / 67f", () => {
    expect(calcMacros(2000)).toEqual({ protein: 150, carbs: 200, fat: 67 });
  });
});

describe("suggestPresetPlan", () => {
  it.each([
    [1450, 1500],
    [1800, 2000],
    [2300, 2500],
    [2750, 2500],
    [2800, 3000],
    [3400, 3500],
    [4000, 3500],
  ])("tdee %i => %i", (kcal, expected) => {
    expect(suggestPresetPlan(kcal)).toBe(expected);
  });
});
