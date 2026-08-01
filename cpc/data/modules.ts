import { CpcModule, Lesson } from '../types';

// 8 modules / 35 lessons covering the core syllabus of UK payroll compliance
// (the "Certificate in Payroll & Compliance" — CPC). Figures cited (tax bands,
// NI thresholds, statutory rates) reflect the 2024/25 UK tax year and are for
// learning purposes only — always confirm current figures against gov.uk / HMRC.

interface RawLesson {
  title: string;
  summary: string;
  content: string[];
  keyPoints: string[];
}

function buildModule(
  id: string,
  order: number,
  slug: string,
  title: string,
  description: string,
  icon: string,
  raw: RawLesson[]
): CpcModule {
  const lessons: Lesson[] = raw.map((l, i) => ({
    id: `${id}-l${i + 1}`,
    moduleId: id,
    order: i + 1,
    title: l.title,
    summary: l.summary,
    content: l.content,
    keyPoints: l.keyPoints,
  }));
  return { id, order, slug, title, description, icon, lessons };
}

const m1 = buildModule('m1', 1, 'employment-status', 'Employment Status & Onboarding',
  'How UK payroll fits into the wider employment framework, and how to bring a new starter onto payroll correctly.',
  'UserCheck', [
  {
    title: 'The Role of Payroll & the UK Regulatory Framework',
    summary: 'Why payroll exists, who regulates it, and the obligations it discharges on behalf of employer and employee.',
    content: [
      'Payroll is the process by which an employer calculates and pays wages, deducts Income Tax and National Insurance contributions (NICs) under PAYE (Pay As You Earn), and reports these figures to HMRC. It sits at the intersection of employment law, tax law and pensions law, which is why payroll professionals must stay current across all three.',
      'The main bodies a payroll administrator interacts with are HMRC (tax and NI), The Pensions Regulator (auto-enrolment), and the Department for Business and Trade (employment rights, including the National Minimum Wage). Getting payroll wrong is not just an administrative error — it can trigger penalties, interest, and reputational damage.',
      'Every UK employer running payroll must register as an employer with HMRC, operate PAYE correctly for every employee (even if only one), and submit real-time reports every time employees are paid.',
    ],
    keyPoints: [
      'Payroll discharges tax, NI, pension and employment-law obligations simultaneously.',
      'Key regulators: HMRC, The Pensions Regulator, and employment rights bodies.',
      'Employers must register for PAYE before the first payday.',
    ],
  },
  {
    title: 'Employment Status: Employee, Worker or Self-Employed',
    summary: 'Employment status determines which rights, tax treatment and payroll obligations apply.',
    content: [
      'Employment status is not a matter of what a contract is titled — it is determined by the reality of the working relationship. The three broad categories are employee, worker, and self-employed contractor, each carrying different rights and different payroll treatment.',
      'Employees work under a "contract of service" and are taxed through PAYE. Key indicators include control (the employer dictates how, when and where work is done), personal service (the individual must do the work themselves, with no right of substitution), and mutuality of obligation (the employer must offer work and the individual must accept it).',
      'Workers sit between employees and the self-employed: they have some rights (holiday pay, National Minimum Wage) but not others (unfair dismissal protection, redundancy pay), and are usually still taxed via PAYE. Genuinely self-employed contractors invoice for services and are responsible for their own tax via Self Assessment — engaging them incorrectly as "outside payroll" when they are really employees is a common and costly compliance failure, closely policed under IR35/off-payroll working rules for those operating through intermediaries.',
    ],
    keyPoints: [
      'Status is determined by the working reality, not the contract label.',
      'Control, personal service and mutuality of obligation are the classic tests for employee status.',
      'Misclassifying an employee as self-employed exposes the employer to backdated tax, NI and penalties.',
    ],
  },
  {
    title: 'The Employment Contract & Right to Work Checks',
    summary: 'What must be in a written statement of terms, and why right-to-work checks are a payroll gatekeeper.',
    content: [
      'Employees and workers are entitled to a written statement of employment particulars from day one of employment. It must cover pay and how it is calculated, hours, holiday entitlement, notice periods, and pension arrangements — all of which feed directly into how payroll is set up for that individual.',
      'Before the first payment is ever made, every employer has a legal duty to carry out a right-to-work check, confirming the individual is legally permitted to work in the UK. This is typically done via original documents (passport, visa) or the Home Office online checking service, and records must be retained for the duration of employment plus a further two years.',
      'Failing to carry out or evidence a right-to-work check exposes the employer to civil penalties and, in serious cases, criminal liability — so payroll and HR onboarding checklists always place this step before the employee is added to the pay run.',
    ],
    keyPoints: [
      'A written statement of terms is due from day one and underpins payroll setup.',
      'Right-to-work checks must happen before employment starts, not retrospectively.',
      'Records of right-to-work checks must be kept and are subject to civil/criminal penalties if missed.',
    ],
  },
  {
    title: 'Onboarding New Starters: P45s and the Starter Checklist',
    summary: 'Getting a new employee onto the correct tax code from day one.',
    content: [
      'When a new employee joins, payroll needs enough information to tax them correctly from the first payday. The best source is a P45 from their previous employer, which shows their tax code, the PAYE reference of the old employer, and pay/tax figures for the current tax year to date — allowing the new employer to continue on a cumulative basis.',
      'If no P45 is available (common for a first job, or where one was not provided in time), the employee completes a HMRC Starter Checklist instead. This asks the employee to select one of three statements about other income/previous employment in the tax year, which determines the emergency tax code applied until HMRC issues an accurate code.',
      'Employers must also record the employee\'s full name, date of birth, address and National Insurance number, and set up a starter declaration correctly in the payroll software — an incorrect starter statement is one of the most common causes of employees being over- or under-taxed in their first months.',
    ],
    keyPoints: [
      'A P45 lets the new employer continue the employee\'s tax position on a cumulative basis.',
      'No P45 means a Starter Checklist is used to select the correct emergency tax treatment.',
      'Accurate starter data prevents incorrect tax deductions in the first payslips.',
    ],
  },
]);

const m2 = buildModule('m2', 2, 'paye-tax-codes', 'PAYE, Tax Codes & Income Tax',
  'The mechanics of PAYE: how tax codes work, how Income Tax is banded, and how to handle non-standard situations.',
  'Receipt', [
  {
    title: 'How PAYE Works: Cumulative vs Non-Cumulative Basis',
    summary: 'PAYE spreads an employee\'s annual tax-free allowance and tax bands across the year.',
    content: [
      'PAYE (Pay As You Earn) is HMRC\'s system for collecting Income Tax and NI as income is earned, rather than in one annual bill. Each employee has a tax code that tells the employer how much pay is tax-free before deductions begin, and the payroll software applies the appropriate bands to work out tax on each payment.',
      'Most employees are taxed on a cumulative basis: at each payday, PAYE looks at total pay and total tax paid since 6 April, and works out the tax due to date, then deducts whatever is owed for the current period. This means gaps in earning (e.g. an employee who joins mid-year) can self-correct automatically as unused allowance from earlier in the year is applied.',
      'Some employees are taxed on a non-cumulative ("Week 1/Month 1") basis instead — each pay period is treated in isolation, with no reference to earlier pay or tax in the year. This is typically used where HMRC or the starter checklist indicates the employee\'s year-to-date position is uncertain, to avoid under- or over-deducting tax while their record is corrected.',
    ],
    keyPoints: [
      'PAYE collects tax and NI in real time via the employer, not as one annual bill.',
      'Cumulative basis reconciles pay and tax across the whole tax year at each payday.',
      'Week 1/Month 1 (non-cumulative) treats each pay period independently.',
    ],
  },
  {
    title: 'Reading & Applying Tax Codes',
    summary: 'Decoding the letters and numbers that make up a UK tax code.',
    content: [
      'A standard tax code is a number followed by a letter, e.g. 1257L. The number, multiplied by 10, gives the annual tax-free personal allowance — 1257L means £12,570 can be earned before tax applies, which is the standard Personal Allowance for most employees in 2024/25.',
      'The letter indicates the employee\'s situation: L is the standard code for most people entitled to the basic Personal Allowance; M and N relate to the Marriage Allowance (receiving or transferring 10% of a partner\'s allowance); BR taxes all income at the basic rate with no free pay, often used for a second job; D0 taxes everything at the higher rate; and NT means no tax is deducted at all.',
      'A K code is unusual in that it adds to taxable pay rather than reducing it — used where deductions (such as company benefits or previously underpaid tax) exceed the personal allowance, meaning tax must be collected on an amount greater than gross pay in that period, subject to a regulatory limit capping deductions at 50% of pay.',
    ],
    keyPoints: [
      '1257L means £12,570 of tax-free pay in the year — the standard 2024/25 code.',
      'BR, D0 and D1 tax all pay at a flat rate with no free pay allowance.',
      'K codes increase taxable pay rather than reduce it, subject to a 50%-of-pay deduction cap.',
    ],
  },
  {
    title: 'Income Tax Bands and Rates',
    summary: 'How much tax is due once pay exceeds the tax-free Personal Allowance.',
    content: [
      'For most of the UK (rest-of-UK rates, i.e. England and Northern Ireland) in 2024/25, the Personal Allowance is £12,570. Above that, the basic rate of 20% applies up to £50,270 of total income, the higher rate of 40% applies between £50,270 and £125,140, and the additional rate of 45% applies above £125,140.',
      'Scotland has its own set of Income Tax bands and rates set by the Scottish Parliament (Scottish taxpayers are identified by an "S" prefix on their tax code), while Wales can vary rates but has kept them aligned with the rest of the UK. Payroll software needs the correct regional flag to apply the right bands.',
      'The Personal Allowance itself tapers away for high earners: for every £2 of income above £100,000, £1 of allowance is lost, meaning it is fully withdrawn once income reaches £125,140 — which is why the additional-rate threshold and the point of total allowance loss coincide.',
    ],
    keyPoints: [
      'Rest-of-UK 2024/25 bands: 20% to £50,270, 40% to £125,140, 45% above.',
      'Scotland has separate bands/rates identified by an "S" prefix on the tax code.',
      'The Personal Allowance tapers by £1 for every £2 earned above £100,000.',
    ],
  },
  {
    title: 'Emergency Tax Codes & Starter Declarations',
    summary: 'What happens when HMRC does not yet have accurate information for an employee.',
    content: [
      'An emergency tax code gives an employee the standard Personal Allowance but is applied on a non-cumulative (Week 1/Month 1) basis, so it does not account for pay or tax earlier in the year. It is used when an employer does not have enough information to tax someone correctly — commonly a new starter without a P45.',
      'The Starter Checklist statement selected by the employee drives the code used: Statement A ("this is my only job, and I haven\'t received taxable benefits") usually gives a standard cumulative code; Statement B ("this is currently my only job, but I have had another since 6 April") gives an emergency Week 1/Month 1 code; Statement C ("I have another job or pension") applies a BR, D0 or D1 code with no free pay.',
      'Emergency and Week 1/Month 1 codes are usually temporary — HMRC will issue an updated tax code once it reconciles its records, at which point the employer must apply the new code and, where the basis changes to cumulative, may need to adjust for any under- or over-payment automatically.',
    ],
    keyPoints: [
      'Emergency codes give standard allowance but on a non-cumulative basis.',
      'The Starter Checklist statement (A, B or C) determines the emergency code applied.',
      'HMRC updates codes once its records catch up; the employer must action the change promptly.',
    ],
  },
  {
    title: 'P60s, P11Ds and Benefits in Kind',
    summary: 'End-of-year statements and how non-cash benefits are taxed.',
    content: [
      'A P60 is issued to every employee still employed at 5 April, summarising total pay and deductions for the tax year just ended. It must be provided by 31 May and is often needed by employees for mortgage applications, tax credit claims, or Self Assessment.',
      'A P11D reports the cash value of taxable benefits in kind (company cars, private medical insurance, interest-free loans over the threshold, etc.) provided outside of payroll. Where an employer instead chooses to "payroll" benefits — taxing them through the payslip in real time — a P11D is not required for those benefits, but this option must be registered with HMRC in advance of the tax year.',
      'Class 1A NIC is payable by the employer (not the employee) on most benefits in kind, reported annually via a P11D(b), separately from the regular Class 1 NIC collected through payroll on cash pay.',
    ],
    keyPoints: [
      'P60s summarise the whole tax year and must be issued by 31 May.',
      'P11Ds report benefits in kind unless the employer payrolls benefits instead.',
      'Employers pay Class 1A NIC on benefits, reported via the P11D(b).',
    ],
  },
]);

const m3 = buildModule('m3', 3, 'national-insurance', 'National Insurance Contributions',
  'Who pays what NI, on which earnings, and the thresholds that drive the calculation.',
  'ShieldCheck', [
  {
    title: 'NI Categories and Classes',
    summary: 'National Insurance is collected in different "classes" depending on the type of income, and different "categories" for employees.',
    content: [
      'Class 1 NICs are paid by employees and employers on earnings from employment, collected through payroll alongside Income Tax. Class 1A is paid solely by employers on most benefits in kind. Class 2 and Class 4 apply to the self-employed and are collected via Self Assessment, outside the payroll system entirely.',
      'Within Class 1, every employee is assigned an NI category letter based on their circumstances — category A is the standard letter for most employees, category H is used for apprentices under 25, category M for employees under 21, and category X is used where no NI is due (for example, earnings below the threshold or over State Pension age). Each category has its own set of rates.',
      'The employee\'s NI category is recorded on the payroll record and reported to HMRC with every Full Payment Submission — using the wrong category is a common payroll error that under- or over-charges both employee and employer NI.',
    ],
    keyPoints: [
      'Class 1 (employee/employer) is collected through payroll; Class 2/4 (self-employed) is not.',
      'Class 1A is an employer-only charge on benefits in kind.',
      'NI category letters (A, H, M, X, etc.) determine which rates apply to an individual.',
    ],
  },
  {
    title: 'Calculating Employee and Employer NI',
    summary: 'The percentages applied above the relevant thresholds for category A employees.',
    content: [
      'For a standard category A employee in 2024/25, employee Class 1 NIC is charged at 8% on earnings between the Primary Threshold (£12,570 a year) and the Upper Earnings Limit (£50,270 a year), and at 2% on earnings above the Upper Earnings Limit, with no upper cap.',
      'Employer Class 1 NIC is charged separately, at 13.8% on earnings above the Secondary Threshold (£9,100 a year), with no upper limit. Unlike the employee charge, there is no reduced rate band for standard category A — the 13.8% applies to everything above the threshold.',
      'NI, unlike Income Tax, is generally calculated on a non-cumulative, period-by-period basis (each pay period is assessed independently against a pro-rated threshold), which is why an irregular bonus paid in one period can trigger a disproportionately large NI deduction compared to spreading the same amount evenly across the year.',
    ],
    keyPoints: [
      'Employee NI (Cat. A, 2024/25): 8% between the Primary Threshold and UEL, 2% above.',
      'Employer NI (Cat. A, 2024/25): 13.8% above the Secondary Threshold, uncapped.',
      'NI is usually calculated per pay period rather than cumulatively across the year.',
    ],
  },
  {
    title: 'NI Thresholds: LEL, PT, ST and UEL',
    summary: 'Four key thresholds drive NI liability and entitlement to contributory benefits.',
    content: [
      'The Lower Earnings Limit (LEL, £6,396 a year in 2024/25) is the point below which no NI liability arises at all, but earning at or above it still protects entitlement to contributory state benefits, including the State Pension — this is why earnings between the LEL and the Primary Threshold are recorded as a "notional" contribution even though no NI is actually deducted.',
      'The Primary Threshold (PT, £12,570 a year) is where employee NI starts being deducted, and the Secondary Threshold (ST, £9,100 a year) is the separate, lower point where employer NI starts — the gap between PT and ST means employers start paying NI on an employee\'s earnings before the employee does.',
      'The Upper Earnings Limit (UEL, £50,270 a year) is where the employee rate drops from 8% to 2% (it does not stop NI, just reduces the rate); there is no equivalent upper limit for employer NI, which continues at 13.8% indefinitely.',
    ],
    keyPoints: [
      'LEL protects benefit entitlement even where no NI is actually paid.',
      'The Secondary Threshold (employer) is lower than the Primary Threshold (employee).',
      'The Upper Earnings Limit reduces the employee rate but does not cap employer NI.',
    ],
  },
  {
    title: 'Employment Allowance and NI Reliefs',
    summary: 'Reliefs that reduce the employer NI bill for eligible businesses.',
    content: [
      'Employment Allowance lets eligible employers reduce their employer Class 1 NIC bill by up to £5,000 a year (2024/25). It is claimed via payroll software against the employer\'s NI liability as it accrues through the year, rather than as a lump sum, and must be claimed afresh (or carried forward as an ongoing claim) each tax year.',
      'Not every employer qualifies — the allowance is restricted for businesses whose employer NI bill in the previous year exceeded £100,000, and single-director companies with no other employees are generally excluded, since the allowance is intended to support genuine employment.',
      'Separate reliefs exist for specific groups: employers pay 0% employer NI (up to the Upper Secondary Threshold) for apprentices under 25, employees under 21, veterans in their first year of civilian employment, and employees in Freeports/Investment Zones — each requires the correct NI category letter to be applied for the relief to take effect.',
    ],
    keyPoints: [
      'Employment Allowance can reduce employer NI by up to £5,000 a year for eligible employers.',
      'Employers with a prior-year NI bill over £100,000, or single-director companies, are typically excluded.',
      'Targeted reliefs (apprentices, under-21s, veterans, Freeports) rely on the correct NI category being used.',
    ],
  },
]);

const m4 = buildModule('m4', 4, 'statutory-payments', 'Statutory Payments',
  'Sick pay, family leave pay, and the eligibility rules and recovery mechanisms behind each.',
  'HeartPulse', [
  {
    title: 'Statutory Sick Pay (SSP)',
    summary: 'The minimum an employer must pay an eligible employee who is off sick.',
    content: [
      'Statutory Sick Pay is paid by the employer to eligible employees who are off sick for four or more consecutive days (a "period of incapacity for work"), at a flat weekly rate of £116.75 in 2024/25, for up to 28 weeks. It is only payable for "qualifying days" — the days an employee would normally have worked.',
      'To qualify, average weekly earnings must be at least the Lower Earnings Limit, and the employee must have notified the employer of their sickness in line with the employer\'s rules (or, absent specific rules, within a reasonable time). The first three qualifying days in a period of sickness are "waiting days" and are unpaid, unless the employee has been sick and claimed SSP within the previous 8 weeks, linking the periods.',
      'SSP is treated as normal pay for tax and NI purposes — it is not a separate tax-free payment, so Income Tax and Class 1 NIC are still deducted through the normal payroll run in the usual way.',
    ],
    keyPoints: [
      '2024/25 SSP rate: £116.75 a week, payable for up to 28 weeks.',
      'The first three qualifying days in a spell of sickness are unpaid waiting days.',
      'SSP is taxed and NI\'d through payroll exactly like ordinary pay.',
    ],
  },
  {
    title: 'Statutory Maternity Pay (SMP) and Maternity Leave',
    summary: 'How SMP is structured across a 39-week payment period, within up to 52 weeks of leave.',
    content: [
      'Eligible employees can take up to 52 weeks of maternity leave (26 weeks Ordinary Maternity Leave plus 26 weeks Additional Maternity Leave), and receive Statutory Maternity Pay for up to 39 of those weeks, provided they meet the continuous employment and earnings tests (26 weeks\' service into the qualifying week, and average weekly earnings at or above the Lower Earnings Limit).',
      'SMP is paid at 90% of average weekly earnings for the first 6 weeks, then for the remaining 33 weeks at the lower of £184.03 a week (2024/25) or 90% of average weekly earnings — meaning most employees drop to the flat statutory rate after week 6 unless their employer offers enhanced contractual maternity pay on top.',
      'Maternity leave can start any time from 11 weeks before the expected week of childbirth, and at least two weeks after the birth must be taken as compulsory leave (four weeks for factory workers) during which the employee cannot work at all.',
    ],
    keyPoints: [
      'Up to 39 weeks of SMP within up to 52 weeks of maternity leave.',
      'First 6 weeks at 90% of average earnings, then the lower of the flat rate or 90% for 33 weeks.',
      'A minimum compulsory leave period applies immediately after the birth.',
    ],
  },
  {
    title: 'Statutory Paternity Pay and Shared Parental Pay',
    summary: 'Leave and pay options for partners, and how parents can share the remaining maternity/adoption leave.',
    content: [
      'Statutory Paternity Pay (SPP) allows eligible employees to take one or two weeks of leave (consecutively, not split further) around the birth or adoption of a child, paid at the lower of £184.03 a week (2024/25) or 90% of average weekly earnings. It must usually be taken within 52 weeks of the birth/placement.',
      'Shared Parental Leave and Pay (ShPL/ShPP) lets eligible parents convert the mother\'s or adopter\'s untaken maternity/adoption leave and pay into a shared pot, which can be split between both parents and taken in blocks, including overlapping periods — giving families more flexibility than the fixed maternity/paternity structure alone.',
      'To use Shared Parental Leave, the birth mother or adopter must first curtail (end early) their own maternity or adoption leave/pay, and both parents must separately meet continuity of employment and earnings tests, with notice given to each of their own employers.',
    ],
    keyPoints: [
      'SPP: one or two consecutive weeks, at the lower of the flat rate or 90% of average earnings.',
      'ShPL/ShPP allows the remaining maternity/adoption leave and pay to be shared and split flexibly.',
      'Using Shared Parental Leave requires curtailing the original maternity/adoption leave first.',
    ],
  },
  {
    title: 'Statutory Adoption Pay and Parental Bereavement Pay',
    summary: 'Two further statutory payments mirroring maternity pay in structure.',
    content: [
      'Statutory Adoption Pay (SAP) mirrors SMP closely: up to 39 weeks of pay within up to 52 weeks of adoption leave, at 90% of average weekly earnings for the first 6 weeks and then the lower of £184.03 a week (2024/25) or 90% of average earnings for the remaining 33 weeks, available to one member of an adopting couple (the other may claim paternity leave/pay or Shared Parental Leave).',
      'Statutory Parental Bereavement Pay (SPBP) supports employed parents who lose a child under 18, or suffer a stillbirth after 24 weeks of pregnancy. Eligible parents can take up to two weeks of leave (consecutively or as two separate weeks) within 56 weeks of the death, paid at the lower of £184.03 a week (2024/25) or 90% of average weekly earnings.',
      'Unlike SSP, SMP, SPP and SAP — which all require a minimum length of service — Parental Bereavement Leave itself is a day-one right for all employees, though the statutory pay element still requires the usual continuity of employment and earnings tests.',
    ],
    keyPoints: [
      'SAP mirrors SMP\'s 39-week/90%-then-flat-rate structure for one adopting parent.',
      'SPBP gives up to two weeks\' pay following the loss of a child, within a 56-week window.',
      'Parental Bereavement Leave is a day-one right; the pay element still has service/earnings tests.',
    ],
  },
  {
    title: 'Eligibility, Notice Periods and Recovering Statutory Payments',
    summary: 'How employers reclaim statutory family-leave payments from HMRC.',
    content: [
      'Eligibility for family-related statutory payments generally hinges on two tests: continuous employment with the employer up to the relevant "qualifying week" (commonly 26 weeks\' service), and average weekly earnings at or above the Lower Earnings Limit. Employees must also give the correct notice — typically at least 28 days for SMP/SAP, and specific shorter windows for SPP.',
      'Where an employee does not qualify for a statutory payment (for example, earnings below the LEL), the employer must explain why using the relevant HMRC form (e.g. SMP1 for maternity), so the employee can consider claiming a state benefit such as Maternity Allowance instead.',
      'Employers recover most of the cost of statutory family payments from HMRC: small employers (whose total Class 1 NIC in the previous tax year was £45,000 or less) can reclaim 100% of SMP/SAP/SPP/ShPP/SPBP plus an additional 3% in Small Employers\' Relief, while larger employers reclaim 92%. This is done by reducing the amount of PAYE/NI paid over to HMRC, not by a separate cash claim.',
    ],
    keyPoints: [
      'Qualifying week service (commonly 26 weeks) and LEL earnings are the core eligibility tests.',
      'Employers must formally explain ineligibility so employees can pursue alternative state benefits.',
      'Small employers reclaim 103% of statutory payments; larger employers reclaim 92%, via reduced HMRC remittances.',
    ],
  },
]);

const m5 = buildModule('m5', 5, 'pensions-auto-enrolment', 'Pensions & Auto-Enrolment',
  'Employer duties under automatic enrolment, and how pension contributions are calculated and tax-relieved.',
  'PiggyBank', [
  {
    title: 'Auto-Enrolment Duties and Staging Dates',
    summary: 'Every UK employer has ongoing duties to assess and enrol eligible staff into a workplace pension.',
    content: [
      'Automatic enrolment requires employers to assess every worker at each payday and, where they meet the criteria for an "eligible jobholder" — aged between 22 and State Pension age, earning above the earnings trigger of £10,000 a year, and working in the UK — automatically enrol them into a qualifying workplace pension scheme, usually within six weeks.',
      'All new employers now have "day one" duties from the moment they take on their first worker (historic staging dates applied only to employers registered before auto-enrolment fully rolled out), so assessment must happen from the very first payday, not after a grace period.',
      'Employers must also complete a Declaration of Compliance with The Pensions Regulator confirming duties have been met, and must re-run the assessment at every subsequent payday as an employee\'s age or earnings change, since eligibility can shift into or out of scope over time.',
    ],
    keyPoints: [
      'Eligible jobholders: aged 22 to State Pension age, earning over £10,000 a year, working in the UK.',
      'New employers have day-one auto-enrolment duties from their very first payday.',
      'Assessment is not one-off — it repeats at every payday as circumstances change.',
    ],
  },
  {
    title: 'Qualifying Earnings and Contribution Calculations',
    summary: 'Pension contributions are usually based on a band of earnings, not full salary.',
    content: [
      'The most common method for calculating minimum contributions uses "qualifying earnings" — a band of pay between a lower limit (£6,240 a year, 2024/25) and an upper limit (£50,270 a year, 2024/25). Contributions are only calculated on earnings that fall within this band, not on the full salary.',
      'The statutory minimum total contribution is 8% of qualifying earnings, made up of at least 3% from the employer and the remainder (typically 5%, which usually includes tax relief) from the employee. Employers can choose to contribute more, and some cover the whole 8% themselves.',
      'Alternative "certification" methods let an employer base contributions on total pay or basic pay instead of the qualifying earnings band (typically requiring a slightly higher percentage, e.g. 9% of basic pay with at least 4% from the employer, if only basic pay is used), which can simplify payroll for employers whose pay structures make qualifying earnings calculations cumbersome.',
    ],
    keyPoints: [
      'Qualifying earnings band (2024/25): £6,240 to £50,270 a year.',
      'Statutory minimum: 8% total, at least 3% employer, remainder from the employee.',
      'Certification allows contributions on total or basic pay as an alternative to qualifying earnings.',
    ],
  },
  {
    title: 'Opt-Outs, Opt-Ins and Re-Enrolment',
    summary: 'Workers can leave a pension scheme, but employers cannot encourage them to.',
    content: [
      'An eligible jobholder who is auto-enrolled has a one-month opt-out window from the date of enrolment during which any contributions already deducted must be refunded in full, as if they were never enrolled. Opting out after this window instead means simply ceasing membership going forward, with contributions already made staying in the pension.',
      'Workers who do not meet the automatic enrolment criteria — for example, earning between £6,240 and £10,000 a year ("non-eligible jobholders") — still have the right to opt in and receive employer contributions, while those earning below £6,240 ("entitled workers") have the right to join a scheme but without a guaranteed employer contribution.',
      'It is unlawful for an employer to induce a worker to opt out (this is called "inducement" and is heavily penalised), and employers must re-enrol eligible staff who previously opted out approximately every three years, giving them a fresh chance to remain in or leave the scheme.',
    ],
    keyPoints: [
      'A one-month opt-out window guarantees a full refund of contributions already made.',
      'Non-eligible jobholders can opt in; entitled workers can join but without a guaranteed employer contribution.',
      'Inducing a worker to opt out is unlawful; re-enrolment of opted-out staff happens roughly every three years.',
    ],
  },
  {
    title: 'Pension Tax Relief: Relief at Source vs Net Pay Arrangement',
    summary: 'The two main methods of giving tax relief on employee pension contributions change the payslip mechanics.',
    content: [
      'Under a Net Pay Arrangement, the employee\'s pension contribution is deducted from gross pay before Income Tax is calculated, so tax relief is given automatically and immediately at the employee\'s marginal rate — but this only benefits taxpayers, since someone earning below the Personal Allowance gets no tax saving at all under this method.',
      'Under Relief at Source, the employee\'s contribution is deducted from net (after-tax) pay, and the pension provider then claims basic-rate tax relief (20%) from HMRC and adds it to the pension pot — meaning even non-taxpayers get a 20% top-up, and higher/additional-rate taxpayers must claim the extra relief themselves via Self Assessment.',
      'Because the two methods produce different payslip deductions and different outcomes for low earners, payroll professionals need to know which method their pension scheme uses in order to calculate net pay correctly and to advise employees accurately about how their contribution is being tax-relieved.',
    ],
    keyPoints: [
      'Net Pay Arrangement: contribution deducted before tax; no benefit for non-taxpayers.',
      'Relief at Source: contribution deducted after tax; provider claims 20% relief for everyone, including non-taxpayers.',
      'Higher/additional-rate taxpayers under Relief at Source must claim extra relief via Self Assessment.',
    ],
  },
]);

const m6 = buildModule('m6', 6, 'minimum-wage', 'National Minimum Wage & National Living Wage',
  'Rates, what counts as pay, and the traps that catch employers out on minimum wage compliance.',
  'Coins', [
  {
    title: 'NMW and NLW Rates and Age Bands',
    summary: 'Minimum hourly rates vary by age and apprentice status, and change every April.',
    content: [
      'The National Living Wage (NLW) is the top rate, applying to workers aged 21 and over — £11.44 an hour from April 2024. Below that, the National Minimum Wage (NMW) applies at lower rates for younger age bands: £8.60 an hour for 18-20 year olds, and £6.40 an hour for 16-17 year olds and apprentices in their first year (or apprentices under 19), as at April 2024.',
      'These rates are reviewed and almost always increase every 1 April, based on recommendations from the Low Pay Commission, so payroll systems and any relevant pay elements (like piece rates) must be updated annually — using last year\'s rate even one pay period into the new tax year is a compliance breach.',
      'Apprentices are entitled to the apprentice rate only in their first year of the apprenticeship or while under 19; once they pass their first year and turn 19 or older, they move onto the NMW/NLW rate for their age band.',
    ],
    keyPoints: [
      'April 2024 NLW (21+): £11.44/hour; rates step down for younger age bands.',
      'Rates are reviewed and typically increased every 1 April — systems must be updated on time.',
      'Apprentices get the apprentice rate only in year one (or while under 19); then their age-band rate applies.',
    ],
  },
  {
    title: 'What Counts as Pay for NMW Purposes',
    summary: 'Not everything on a payslip counts towards the minimum wage calculation.',
    content: [
      'NMW compliance is checked by dividing total pay counted for NMW purposes by total hours worked in the relevant pay reference period. Basic salary, most bonuses and commission generally count, but certain deductions can reduce "counted" pay below the legal minimum even if the gross figure looks compliant.',
      'Deductions or payments the worker makes for items connected with the job — for example, compulsory uniform costs, tools, or accommodation charged above the statutory Accommodation Offset (£9.99 a night, 2024/25) — reduce the pay counted for NMW purposes, even though the payslip shows a higher gross figure. This is one of the most common causes of "accidental" NMW underpayment.',
      'Conversely, benefits in kind, most expenses reimbursements, pension contributions, and tips/service charges (even when paid through payroll) do not count towards NMW pay at all — an employer cannot rely on generous tips to make up a shortfall in the base hourly rate.',
    ],
    keyPoints: [
      'NMW compliance = pay counted for NMW purposes ÷ hours worked in the pay reference period.',
      'Job-related deductions (uniform, tools, excess accommodation charges) can reduce counted pay below gross.',
      'Tips, benefits in kind and pension contributions never count towards the NMW calculation.',
    ],
  },
  {
    title: 'Working Time and Common NMW Pitfalls',
    summary: 'Time that must be paid, even when it is not "on the clock" in the ordinary sense.',
    content: [
      'For NMW purposes, "working time" is broader than scheduled shifts. It generally includes travel between work assignments during the working day (though not the normal home-to-work commute), training required by the employer, and time spent on call and required to be at or near the workplace ready to work.',
      'A frequent pitfall is unpaid "trial shifts" or requiring staff to arrive early for unpaid handovers/briefings — if the worker is required to be present and performing tasks, that time generally counts as working time and must be paid at least at the NMW rate, regardless of how the employer labels it.',
      'Salaried workers on "salaried hours" contracts are particularly at risk of accidental underpayment: if actual hours worked regularly exceed the contracted hours used to set the salary, the effective hourly rate can fall below the NMW even though the annual salary looks adequate on paper.',
    ],
    keyPoints: [
      'Working time includes required travel between assignments, training, and being on-call at the workplace.',
      'Unpaid trial shifts and mandatory unpaid briefings are common enforcement risks.',
      'Salaried staff working more hours than contracted can unintentionally fall below the NMW hourly rate.',
    ],
  },
  {
    title: 'Enforcement, Penalties and Naming Rounds',
    summary: 'The consequences of getting minimum wage pay wrong.',
    content: [
      'HMRC enforces NMW/NLW compliance and can investigate any employer, whether prompted by a worker complaint or proactively. Where underpayment is found, the employer must pay arrears at current NMW rates (not the lower historic rate that applied at the time), plus a financial penalty of up to 200% of the arrears, capped per worker.',
      'Deliberate non-compliance can also lead to the employer being "named and shamed" in periodic government naming rounds, and in the most serious cases, criminal prosecution — reputational damage from naming rounds is often considered a bigger deterrent than the financial penalty itself.',
      'Because penalties are calculated on current rather than historic rates, and arrears must be repaid promptly, NMW underpayment can become very expensive very quickly if it goes undetected for a long period across many workers — making proactive payroll audits an important part of compliance.',
    ],
    keyPoints: [
      'Arrears must be paid at current NMW rates, not the (lower) rate in force at the time of underpayment.',
      'Penalties of up to 200% of arrears can apply, alongside potential naming and criminal prosecution.',
      'Long-undetected underpayment across many workers can escalate into very large liabilities.',
    ],
  },
]);

const m7 = buildModule('m7', 7, 'termination-redundancy', 'Termination Payments & Redundancy',
  'Notice, redundancy calculations, and how leaving payments are taxed.',
  'FileX', [
  {
    title: 'Notice Pay and Payment in Lieu of Notice (PILON)',
    summary: 'What an employee is owed for their notice period, whether they work it or not.',
    content: [
      'Statutory minimum notice is one week for each complete year of service (up to a maximum of 12 weeks) once an employee has worked at least one month, though contracts commonly specify longer notice — the employee is entitled to whichever is longer, statutory or contractual.',
      'Where an employer ends employment immediately instead of the employee working their notice, a Payment in Lieu of Notice (PILON) is made instead. If the contract contains a PILON clause, the payment is contractual and is always taxed and NI\'d in full as normal earnings.',
      'Since 2018, all PILON payments are taxable and subject to NI in full regardless of whether the contract has a PILON clause — this closed a previous loophole where some PILON payments could be paid tax-free as damages for breach of contract.',
    ],
    keyPoints: [
      'Statutory notice: one week per complete year of service, capped at 12 weeks.',
      'PILON lets the employer end employment immediately by paying out the notice period instead of it being worked.',
      'All PILON is taxed and NI\'d as earnings, regardless of whether a PILON clause exists in the contract.',
    ],
  },
  {
    title: 'Statutory Redundancy Pay',
    summary: 'The formula-based minimum owed to employees made redundant after two years\' service.',
    content: [
      'Statutory redundancy pay is available to employees with at least two years\' continuous service, calculated using length of service, age, and a capped weekly pay figure (£700 a week in 2024/25) — even if actual weekly pay is higher, the calculation uses the capped figure.',
      'The multiplier depends on age during each year of service: half a week\'s pay for each full year under age 22, one week\'s pay for each full year aged 22 to 40, and one and a half week\'s pay for each full year aged 41 and over. A maximum of 20 years\' service can be counted, working back from the redundancy date.',
      'Statutory redundancy pay is entirely tax-free and NI-free, and does not itself use up any of the £30,000 termination payment exemption — though it does count towards that £30,000 limit when added together with other non-contractual termination payments for the purpose of applying the exemption.',
    ],
    keyPoints: [
      '2 years\' service required; capped weekly pay of £700 (2024/25) used in the calculation.',
      'Multiplier by age: 0.5/1/1.5 weeks\' pay per year for under-22 / 22-40 / 41+ respectively, capped at 20 years.',
      'Statutory redundancy pay is tax/NI-free but counts within the overall £30,000 exemption alongside other termination pay.',
    ],
  },
  {
    title: 'Taxing Termination Payments: the £30,000 Exemption and PENP',
    summary: 'How to split a termination package between taxable earnings and the tax-free exemption.',
    content: [
      'Genuinely non-contractual termination payments (such as an ex-gratia redundancy payment above the statutory minimum) can be paid tax-free up to £30,000, with Income Tax (but not employer NI, since 2020) due on any excess above that. Employee NI is not charged on the excess at all, but employer Class 1A NIC applies above £30,000.',
      'Post-Employment Notice Pay (PENP) is a calculation used to determine how much of a termination payment must be treated as fully taxable earnings (as if it were notice pay) even where the employer did not describe it that way — broadly, PENP represents the basic pay the employee would have earned had they worked their full notice period, and it must be taxed and NI\'d in full before any remaining balance can be set against the £30,000 exemption.',
      'Getting this split wrong is one of the most common payroll errors on termination: PENP must be calculated and taxed as earnings first, and only the genuinely non-contractual remainder (e.g. compensation for loss of office) can be tested against the £30,000 tax-free band.',
    ],
    keyPoints: [
      'Up to £30,000 of genuinely non-contractual termination pay can be tax-free.',
      'Employer (not employee) NIC applies above £30,000, since April 2020 rules changed employer NIC treatment.',
      'PENP must be calculated and taxed as earnings first, before applying the £30,000 exemption to any remainder.',
    ],
  },
  {
    title: 'Final Payslips and Leaver Documentation',
    summary: 'Closing out an employee\'s payroll record correctly.',
    content: [
      'The final payslip should include any outstanding basic pay, payment for accrued but untaken holiday (calculated in line with the employment contract and Working Time Regulations), any PILON, and any termination payment — each taxed and NI\'d according to its own rules as covered in this module.',
      'On leaving, the employer must provide a P45, showing pay and tax to date in the tax year, the employee\'s tax code, and the leaving date. This is submitted to HMRC via the payroll software\'s leaver process (part of the Full Payment Submission) and a copy is given to the employee for their next employer or for Universal Credit/benefit claims.',
      'Failing to mark an employee as a leaver correctly in the payroll system — or continuing to pay them by mistake — creates duplicate PAYE records and incorrect year-to-date figures that can be difficult to unpick at year end, so the leaver process should be completed on or before the final payday.',
    ],
    keyPoints: [
      'Final pay covers outstanding basic pay, accrued holiday, PILON and any termination payment.',
      'A P45 must be issued on leaving, generated through the payroll leaver process.',
      'Prompt, accurate leaver processing avoids duplicate records and year-to-date errors.',
    ],
  },
]);

const m8 = buildModule('m8', 8, 'payroll-admin-rti', 'Payroll Administration, RTI & Compliance',
  'Reporting to HMRC, record-keeping, deductions from pay, and the payroll year-end cycle.',
  'ClipboardCheck', [
  {
    title: 'Real Time Information: FPS and EPS',
    summary: 'How payroll figures are reported to HMRC on or before every payday.',
    content: [
      'Under Real Time Information (RTI), employers must submit a Full Payment Submission (FPS) to HMRC on or before each payday, detailing pay, deductions, tax, NI and student loan figures for every employee paid in that run. Late FPS submissions can trigger automatic penalties.',
      'An Employer Payment Summary (EPS) is a separate submission used to report information that is not employee-specific — for example, recovering statutory payments, claiming Employment Allowance, or declaring that no employees were paid in a particular period (a "nil EPS"), which must still be sent to avoid HMRC assuming a missed FPS.',
      'RTI data feeds directly into other government systems, including Universal Credit calculations for employees claiming benefits, which is why accuracy and timeliness of submissions matters beyond just tax compliance — errors can have knock-on effects on an employee\'s benefit entitlement.',
    ],
    keyPoints: [
      'FPS is submitted on or before every payday with employee-level pay and deduction data.',
      'EPS reports non-employee-specific information, including statutory payment recovery and Employment Allowance claims.',
      'RTI data also feeds Universal Credit calculations, so errors can affect employees\' benefits.',
    ],
  },
  {
    title: 'Payslips and Record-Keeping Requirements',
    summary: 'What must legally appear on a payslip, and how long payroll records must be kept.',
    content: [
      'Every employee and worker has a legal right to an itemised payslip on or before payday, showing gross pay, the amount and reason for each deduction (or total deductions with a separate breakdown available), and net pay. Where hours worked vary and affect pay, the total number of hours worked must also be shown.',
      'Payroll records — including pay, deductions, statutory payment calculations, and starter/leaver information — must be kept for a minimum of three years from the end of the relevant tax year, though many employers retain records for longer to cover pension auto-enrolment (six years) or potential tribunal claims.',
      'HMRC can inspect payroll records at any time, and inadequate record-keeping is treated as a compliance failure in its own right, separate from any underlying tax or NI error it might otherwise have prevented.',
    ],
    keyPoints: [
      'Payslips must show gross pay, itemised deductions, net pay, and variable hours where relevant.',
      'Minimum retention: three tax years, though longer retention is often needed (e.g. six years for pensions).',
      'Poor record-keeping is itself a compliance failure, regardless of whether pay was calculated correctly.',
    ],
  },
  {
    title: 'Court Orders, Student Loans and Attachment of Earnings',
    summary: 'Third-party deductions payroll is legally required to make from an employee\'s pay.',
    content: [
      'Employers must deduct student loan and postgraduate loan repayments through payroll once notified by HMRC (via a Start Notice), based on the relevant plan type\'s threshold and rate — for example, Plan 2 deducts 9% of earnings above its annual threshold, calculated per pay period like NI, not cumulatively.',
      'Attachment of Earnings Orders (AEOs) and Deduction from Earnings Orders (DEOs, used for child maintenance) require the employer to deduct a set amount or percentage from an employee\'s pay and send it to the court, local authority, or Child Maintenance Service, following a strict priority order when multiple orders apply to the same employee.',
      'Employers can usually charge the employee a small fixed administration fee per deduction period for operating an AEO/DEO (subject to statutory limits), but must apply the correct protected earnings proportion so the employee is left with a legally guaranteed minimum amount of pay.',
    ],
    keyPoints: [
      'Student/postgraduate loan deductions are calculated per pay period once HMRC issues a Start Notice.',
      'AEOs and DEOs require payroll to make third-party deductions in a set priority order.',
      'A protected earnings proportion ensures the employee retains a guaranteed minimum amount of pay.',
    ],
  },
  {
    title: 'Payroll Year End Processes',
    summary: 'The tasks that close out one tax year and open the next.',
    content: [
      'The UK tax year runs from 6 April to 5 April. At year end, the final FPS (or an EPS confirming it is the final submission) must be sent, and employers must give every current employee a P60 by 31 May summarising the year\'s pay and deductions.',
      'Before the new tax year begins, payroll software must be updated with new tax codes (including the general uplift HMRC issues for many employees), new NI and statutory payment rates, and new NMW/NLW rates where relevant — most of this is automated in modern payroll software, but it must be verified, not assumed.',
      'Employers must also action any P9 (individual coding notice) or P9X (general uplift instructions for codes ending in L) received from HMRC before the first payday of the new tax year, so employees start the year on the correct tax code from day one.',
    ],
    keyPoints: [
      'UK tax year: 6 April to 5 April; P60s due to employees by 31 May.',
      'New tax codes, NI thresholds and statutory rates must be loaded before the new year\'s first payday.',
      'P9/P9X coding notices from HMRC must be actioned promptly at year end.',
    ],
  },
  {
    title: 'GDPR, Data Protection and Payroll Compliance',
    summary: 'Payroll data is highly sensitive personal data and must be handled accordingly.',
    content: [
      'Payroll data (salary, bank details, National Insurance number, tax code, and often health information behind sick pay or disability-related adjustments) is personal data under UK GDPR, and special category data where health information is involved — requiring a lawful basis for processing and extra safeguards for the sensitive elements.',
      'Access to payroll data should be restricted to those who need it, with technical controls (encryption, access logs) and organisational controls (confidentiality agreements, need-to-know access) in place — oversharing payroll data internally is a common but avoidable data protection breach.',
      'Data retention must be balanced against data minimisation principles: records should be kept as long as legally required (see the record-keeping lesson) but not indefinitely "just in case," and secure disposal processes should be in place once the retention period expires.',
    ],
    keyPoints: [
      'Payroll data is personal data (and often special category data) under UK GDPR.',
      'Access should be restricted on a need-to-know basis with appropriate technical and organisational controls.',
      'Retain records only as long as legally required, then dispose of them securely.',
    ],
  },
]);

export const cpcModules: CpcModule[] = [m1, m2, m3, m4, m5, m6, m7, m8];

export const allLessons: Lesson[] = cpcModules.flatMap((m) => m.lessons);

export function getModuleById(id: string): CpcModule | undefined {
  return cpcModules.find((m) => m.id === id);
}

export function getLessonById(id: string): Lesson | undefined {
  return allLessons.find((l) => l.id === id);
}
