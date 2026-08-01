import { Flashcard } from '../types';

// 93 flashcards across the 8 modules (m1=12, m2=12, m3=11, m4=12, m5=11, m6=11, m7=12, m8=12).
type Raw = [string, string, string];

const raw: Raw[] = [
  // ===== M1 — Employment Status & Onboarding (12) =====
  ['m1', 'What is PAYE?', 'HMRC\'s system for collecting Income Tax and NI from employment income in real time, via the employer.'],
  ['m1', 'Who regulates auto-enrolment?', 'The Pensions Regulator.'],
  ['m1', 'What must an employer do before its first payday?', 'Register as an employer for PAYE with HMRC.'],
  ['m1', 'What are the three classic tests of employee status?', 'Control, personal service, and mutuality of obligation.'],
  ['m1', 'What is a "worker" (vs employee/self-employed)?', 'A middle category with some rights (e.g. NMW, holiday pay) but not all (e.g. redundancy pay).'],
  ['m1', 'How do the self-employed pay tax?', 'Via Self Assessment, not PAYE.'],
  ['m1', 'When must a written statement of employment particulars be given?', 'From day one of employment.'],
  ['m1', 'When must right-to-work checks happen?', 'Before employment starts.'],
  ['m1', 'How long must right-to-work records be kept after employment ends?', 'A further two years.'],
  ['m1', 'What does a P45 allow a new employer to do?', 'Continue the employee\'s tax position on a cumulative basis.'],
  ['m1', 'What replaces a P45 when none is available?', 'The HMRC Starter Checklist.'],
  ['m1', 'What does the Starter Checklist determine?', 'The emergency tax code applied until HMRC issues an accurate one.'],

  // ===== M2 — PAYE, Tax Codes & Income Tax (12) =====
  ['m2', 'What does the number in a tax code represent?', 'The annual tax-free Personal Allowance, multiplied by 10 (e.g. 1257L = £12,570).'],
  ['m2', 'What does tax code BR mean?', 'All pay taxed at the basic rate, with no tax-free allowance — often used for a second job.'],
  ['m2', 'What does tax code NT mean?', 'No tax is deducted at all.'],
  ['m2', 'What is unusual about a K tax code?', 'It adds to taxable pay instead of reducing it (capped at 50% of pay deducted per period).'],
  ['m2', '2024/25 rest-of-UK basic rate band?', '20% up to £50,270.'],
  ['m2', '2024/25 rest-of-UK higher rate band?', '40% between £50,270 and £125,140.'],
  ['m2', '2024/25 rest-of-UK additional rate?', '45% above £125,140.'],
  ['m2', 'How does the Personal Allowance taper?', '£1 lost for every £2 earned above £100,000, fully gone by £125,140.'],
  ['m2', 'How is a Scottish taxpayer\'s tax code identified?', 'With an "S" prefix.'],
  ['m2', 'What does a P60 show?', 'Total pay and deductions for the tax year, for employees still employed at 5 April — due by 31 May.'],
  ['m2', 'What does a P11D report?', 'The cash value of taxable benefits in kind provided outside payroll.'],
  ['m2', 'Who pays Class 1A NIC on benefits in kind?', 'The employer only.'],

  // ===== M3 — National Insurance Contributions (11) =====
  ['m3', 'Which NI class is collected through payroll?', 'Class 1 (employee and employer).'],
  ['m3', 'What is Class 1A NIC?', 'An employer-only charge on most benefits in kind.'],
  ['m3', 'What is NI category A used for?', 'Most standard employees.'],
  ['m3', '2024/25 employee NI rate between PT and UEL?', '8%.'],
  ['m3', '2024/25 employee NI rate above the UEL?', '2%.'],
  ['m3', '2024/25 employer NI rate above the ST?', '13.8%, uncapped.'],
  ['m3', 'What is the Lower Earnings Limit for?', 'The point below which no NI is due, but benefit entitlement is still protected.'],
  ['m3', '2024/25 Primary Threshold (employee NI starts)?', '£12,570 a year.'],
  ['m3', '2024/25 Secondary Threshold (employer NI starts)?', '£9,100 a year — lower than the Primary Threshold.'],
  ['m3', 'Maximum annual Employment Allowance (2024/25)?', 'Up to £5,000, for eligible employers.'],
  ['m3', 'Who is generally excluded from Employment Allowance?', 'Single-director companies with no other employees, and employers with a prior-year NIC bill over £100,000.'],

  // ===== M4 — Statutory Payments (12) =====
  ['m4', 'When does SSP become payable?', 'After 4 or more consecutive days of sickness.'],
  ['m4', '2024/25 SSP weekly rate?', '£116.75, for up to 28 weeks.'],
  ['m4', 'What are "waiting days" for SSP?', 'The first 3 unpaid qualifying days of a sickness spell.'],
  ['m4', 'Maximum weeks of SMP within maternity leave?', 'Up to 39 weeks (within up to 52 weeks of leave).'],
  ['m4', 'SMP rate for the first 6 weeks?', '90% of average weekly earnings.'],
  ['m4', 'SMP rate for weeks 7-39?', 'The lower of £184.03/week (2024/25) or 90% of average weekly earnings.'],
  ['m4', 'How much SPP leave can be taken?', 'One or two consecutive weeks.'],
  ['m4', 'What must happen before Shared Parental Leave is used?', 'The mother/adopter must curtail their own maternity/adoption leave and pay.'],
  ['m4', 'How does SAP compare to SMP?', 'It mirrors SMP\'s structure: 90% for 6 weeks, then the lower of the flat rate or 90% for 33 weeks.'],
  ['m4', 'What does SPBP cover?', 'Up to 2 weeks\' pay after the death of a child under 18 (or a stillbirth after 24 weeks), within 56 weeks.'],
  ['m4', 'What % of statutory payments can small employers reclaim?', '103% (100% plus 3% Small Employers\' Relief).'],
  ['m4', 'How do employers recover statutory payments from HMRC?', 'By reducing the PAYE/NI amount remitted to HMRC.'],

  // ===== M5 — Pensions & Auto-Enrolment (11) =====
  ['m5', 'What defines an "eligible jobholder"?', 'Aged 22 to State Pension age, earning over £10,000 a year, working in the UK.'],
  ['m5', 'When do new employers get auto-enrolment duties?', 'From day one, at their first payday.'],
  ['m5', 'What are "qualifying earnings"?', 'A band of pay (£6,240-£50,270 in 2024/25) used to calculate minimum contributions.'],
  ['m5', 'Statutory minimum total contribution?', '8% of qualifying earnings, at least 3% from the employer.'],
  ['m5', 'How long is the pension opt-out window?', 'One month — contributions already deducted are refunded in full.'],
  ['m5', 'What is a "non-eligible jobholder"?', 'Earns £6,240-£10,000; can opt in and receive an employer contribution.'],
  ['m5', 'What is an "entitled worker"?', 'Earns below £6,240; can join a scheme but with no guaranteed employer contribution.'],
  ['m5', 'Is inducing a worker to opt out lawful?', 'No — it is unlawful and heavily penalised.'],
  ['m5', 'How often is re-enrolment of opted-out staff required?', 'Roughly every three years.'],
  ['m5', 'Net Pay Arrangement — when is the deduction taken?', 'Before tax, from gross pay — no benefit for non-taxpayers.'],
  ['m5', 'Relief at Source — when is the deduction taken?', 'After tax, from net pay — provider claims 20% relief, benefiting even non-taxpayers.'],

  // ===== M6 — National Minimum Wage & National Living Wage (11) =====
  ['m6', 'NLW age threshold (from April 2024)?', '21 and over.'],
  ['m6', 'April 2024 NLW rate?', '£11.44 an hour.'],
  ['m6', 'Who recommends NMW/NLW rate changes?', 'The Low Pay Commission.'],
  ['m6', 'When do NMW/NLW rates typically change?', '1 April each year.'],
  ['m6', 'How is NMW compliance calculated?', 'NMW-counted pay ÷ hours worked in the pay reference period.'],
  ['m6', '2024/25 Accommodation Offset?', '£9.99 a night — charges above this reduce counted NMW pay.'],
  ['m6', 'Do tips count towards NMW pay?', 'No, never — even if paid through payroll.'],
  ['m6', 'Does the normal commute count as working time?', 'No — but required travel between assignments during the day does.'],
  ['m6', 'Who enforces NMW/NLW compliance?', 'HMRC.'],
  ['m6', 'At what rate must NMW arrears be repaid?', 'Current NMW rates, not the historic rate that applied at the time.'],
  ['m6', 'Maximum NMW penalty?', 'Up to 200% of arrears, per worker (subject to a cap).'],

  // ===== M7 — Termination Payments & Redundancy (12) =====
  ['m7', 'Statutory minimum notice formula?', 'One week per complete year of service, capped at 12 weeks.'],
  ['m7', 'What is PILON?', 'Payment in Lieu of Notice — ending employment immediately by paying out notice instead of it being worked.'],
  ['m7', 'How is PILON taxed since 2018?', 'Fully taxable and NI\'able, regardless of a PILON clause.'],
  ['m7', 'Minimum service for statutory redundancy pay?', 'Two years\' continuous service.'],
  ['m7', '2024/25 capped weekly pay for redundancy calculations?', '£700 a week.'],
  ['m7', 'Redundancy multiplier by age?', '0.5 / 1 / 1.5 week\'s pay per year for under-22 / 22-40 / 41+.'],
  ['m7', 'Max years counted in redundancy calculation?', '20 years.'],
  ['m7', 'Is statutory redundancy pay taxed?', 'No — it is entirely tax and NI free.'],
  ['m7', 'Tax-free termination payment limit?', 'Up to £30,000 for genuinely non-contractual payments.'],
  ['m7', 'Who pays NIC above £30,000 on termination pay (since April 2020)?', 'The employer (Class 1A) — not the employee.'],
  ['m7', 'What does PENP represent?', 'The basic pay the employee would have earned during their unworked notice period — taxed in full as earnings.'],
  ['m7', 'What must an employer issue when someone leaves?', 'A P45.'],

  // ===== M8 — Payroll Administration, RTI & Compliance (12) =====
  ['m8', 'What does RTI stand for?', 'Real Time Information.'],
  ['m8', 'When must an FPS be sent?', 'On or before each payday.'],
  ['m8', 'What does an EPS report?', 'Non-employee-specific data — e.g. statutory payment recovery or Employment Allowance claims.'],
  ['m8', 'What is a "nil EPS"?', 'Confirms no employees were paid in a period, avoiding an assumed missed FPS.'],
  ['m8', 'What must every payslip show?', 'Gross pay, itemised deductions, net pay (and total hours if variable and pay-affecting).'],
  ['m8', 'Minimum payroll record retention?', 'Three years from the end of the relevant tax year.'],
  ['m8', 'Plan 2 student loan deduction rate?', '9% of earnings above the plan\'s threshold, calculated per pay period.'],
  ['m8', 'What is a DEO used for?', 'Collecting child maintenance payments through payroll.'],
  ['m8', 'What must be protected when operating an AEO/DEO?', 'A legally guaranteed minimum "protected earnings" amount for the employee.'],
  ['m8', 'UK tax year dates?', '6 April to 5 April.'],
  ['m8', 'What is a P9X?', 'General uplift instructions from HMRC for tax codes ending in L, applied at year end.'],
  ['m8', 'What classification often applies to payroll health data under UK GDPR?', 'Special category data.'],
];

export const flashcards: Flashcard[] = raw.map(([moduleId, front, back], i) => ({
  id: `f${i + 1}`,
  moduleId,
  front,
  back,
}));

export function getFlashcardsForModule(moduleId: string): Flashcard[] {
  return flashcards.filter((f) => f.moduleId === moduleId);
}
