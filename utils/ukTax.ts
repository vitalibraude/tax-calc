
export const DEFAULT_EXCHANGE_RATE = 4.78;

export interface TaxResult {
  gross: number;
  taxableIncome: number;
  incomeTax: number;
  nationalInsurance: number;
  net: number;
  personalAllowance: number;
  netILS: number;
  grossILS: number;
  exchangeRate: number;
}

export const calculateUKTax = (gross: number, exchangeRate: number = DEFAULT_EXCHANGE_RATE): TaxResult => {
  // 2024/2025 Tax Constants
  const MAX_PERSONAL_ALLOWANCE = 12570;
  const INCOME_LIMIT_FOR_PA = 100000;
  
  // Tax Bands
  const BASIC_RATE_LIMIT = 50270;
  const HIGHER_RATE_LIMIT = 125140;
  
  // Tax Rates
  const BASIC_RATE = 0.20;
  const HIGHER_RATE = 0.40;
  const ADDITIONAL_RATE = 0.45;

  // NI Thresholds (Weekly equivalent roughly annualized for simplicity in this estimate model)
  // Using annual thresholds for Class 1 NI
  const NI_PRIMARY_THRESHOLD = 12570;
  const NI_UPPER_LIMIT = 50270;
  const NI_MAIN_RATE = 0.08; // 8% as of April 2024
  const NI_ADDITIONAL_RATE = 0.02;

  // 1. Calculate Personal Allowance
  let personalAllowance = MAX_PERSONAL_ALLOWANCE;
  if (gross > INCOME_LIMIT_FOR_PA) {
    const reduction = (gross - INCOME_LIMIT_FOR_PA) / 2;
    personalAllowance = Math.max(0, MAX_PERSONAL_ALLOWANCE - reduction);
  }

  // 2. Calculate Taxable Income
  const taxableIncome = Math.max(0, gross - personalAllowance);

  // 3. Calculate Income Tax
  let incomeTax = 0;
  
  const basicBandWidth = 37700;
  
  let remainingTaxable = taxableIncome;
  
  // Basic Rate
  const taxableAtBasic = Math.min(remainingTaxable, basicBandWidth);
  incomeTax += taxableAtBasic * BASIC_RATE;
  remainingTaxable -= taxableAtBasic;
  
  // Higher Rate
  const higherBandWidth = 125140 - 50270; // 74870
  
  if (remainingTaxable > 0) {
      const taxableAtHigher = Math.min(remainingTaxable, higherBandWidth);
      incomeTax += taxableAtHigher * HIGHER_RATE;
      remainingTaxable -= taxableAtHigher;
  }
  
  if (remainingTaxable > 0) {
      incomeTax += remainingTaxable * ADDITIONAL_RATE;
  }

  // 4. Calculate National Insurance (Class 1)
  let nationalInsurance = 0;
  
  if (gross > NI_PRIMARY_THRESHOLD) {
      const niBand1 = Math.min(gross, NI_UPPER_LIMIT) - NI_PRIMARY_THRESHOLD;
      nationalInsurance += niBand1 * NI_MAIN_RATE;
  }
  
  if (gross > NI_UPPER_LIMIT) {
      const niBand2 = gross - NI_UPPER_LIMIT;
      nationalInsurance += niBand2 * NI_ADDITIONAL_RATE;
  }

  const net = gross - incomeTax - nationalInsurance;

  return {
    gross,
    taxableIncome,
    incomeTax,
    nationalInsurance,
    net,
    personalAllowance,
    netILS: net * exchangeRate,
    grossILS: gross * exchangeRate,
    exchangeRate
  };
};
