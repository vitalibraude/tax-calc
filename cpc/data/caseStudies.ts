import { CaseStudy } from '../types';

// 3 integrative case studies, each drawing on multiple modules to mirror
// how payroll scenarios play out in practice.

export const caseStudies: CaseStudy[] = [
  {
    id: 'cs1',
    title: 'Onboarding Priya: A New Starter\'s First Payroll Run',
    moduleIds: ['m1', 'm2', 'm3', 'm5'],
    scenario: [
      'Priya joins Coastline Retail Ltd on 1 September as a full-time sales assistant, earning £26,000 a year. It is her first job since graduating, so she has no P45 to bring with her.',
      'On her first day, HR checks her passport to confirm her right to work in the UK, and asks her to complete a Starter Checklist. Priya selects Statement A, confirming this is her only job and she has not received taxable benefits or other taxable income since 6 April.',
      'Priya is 24 years old. Payroll needs to set her up correctly before the next payroll run: assigning a tax code and NI category, and assessing her for automatic enrolment into the company pension scheme.',
    ],
    questions: [
      {
        question: 'Why does payroll need Priya to complete a Starter Checklist?',
        options: ['Because she is under 25', 'Because she has no P45 to establish her tax position', 'Because she works part-time', 'Starter Checklists are only for company directors'],
        correctIndex: 1,
        explanation: 'With no P45 available, the Starter Checklist is the standard way to gather enough information to tax a new starter correctly.',
      },
      {
        question: 'Given Priya selected Statement A, what tax code basis would payroll normally expect to apply?',
        options: ['BR with no free pay', 'A standard cumulative code (e.g. 1257L)', 'A K code', 'NT — no tax at all'],
        correctIndex: 1,
        explanation: 'Statement A ("this is my only job") typically results in the standard cumulative tax code, giving the full Personal Allowance from day one.',
      },
      {
        question: 'What NI category would payroll most likely assign to Priya, absent any special circumstances?',
        options: ['Category H (apprentice under 25)', 'Category A (standard)', 'Category X (no NI due)', 'Category M (under 21)'],
        correctIndex: 1,
        explanation: 'As a standard employee over 21 with no special circumstances noted, category A is the default NI category.',
      },
      {
        question: 'At £26,000 a year and age 24, would Priya meet the criteria for automatic pension enrolment as an eligible jobholder?',
        options: ['No — she earns below the £10,000 trigger', 'No — she is outside the 22 to State Pension age band', 'Yes — she meets both the age and earnings criteria', 'Only if she opts in first'],
        correctIndex: 2,
        explanation: 'At 24 and earning above the £10,000 annual trigger, Priya meets the eligible jobholder criteria and should be automatically enrolled.',
      },
      {
        question: 'If Priya wants to leave the pension scheme shortly after being enrolled, what is she entitled to within the opt-out window?',
        options: ['Nothing — contributions are never refunded', 'A full refund of any contributions already deducted', 'Only a 50% refund', 'A refund only if she has worked over a year'],
        correctIndex: 1,
        explanation: 'Opting out within the one-month window entitles the employee to a full refund of contributions already made, as if never enrolled.',
      },
      {
        question: 'Suppose Priya had instead selected Starter Checklist Statement C (indicating another job). What would change?',
        options: ['Nothing — the tax code would be identical', 'She would likely be given a BR, D0 or D1 code with no free pay', 'She would be exempt from NI entirely', 'She would not need a right-to-work check'],
        correctIndex: 1,
        explanation: 'Statement C indicates other taxable income exists, so the new employer typically applies BR, D0 or D1 with no free pay allowance to avoid under-taxing her overall income.',
      },
    ],
  },
  {
    id: 'cs2',
    title: 'Managing Family Leave: Amira\'s Maternity Pay',
    moduleIds: ['m4', 'm8'],
    scenario: [
      'Amira has worked for Northfield Engineering for four years, earning £3,000 a month. She is due to have her baby in November and tells her employer in good time, giving the required notice and evidence of her expected week of childbirth.',
      'Amira plans to take the full 52 weeks of maternity leave available to her. Her partner, Tom, also works for a different employer and intends to take two weeks of paternity leave shortly after the birth.',
      'Payroll needs to calculate Amira\'s SMP entitlement, ensure the correct RTI submissions are made while she is on leave, and confirm how the employer can recover the statutory payments made — Northfield\'s total employer Class 1 NIC last year was £38,000.',
    ],
    questions: [
      {
        question: 'Does Amira meet the basic service test for SMP, having worked for four years?',
        options: ['No — SMP requires 5 years\' service', 'Yes — she comfortably exceeds the 26-week qualifying-week service test', 'No — only employees under 2 years\' service qualify', 'Service length is irrelevant to SMP'],
        correctIndex: 1,
        explanation: 'SMP requires 26 weeks\' continuous service into the qualifying week; four years\' service easily satisfies this.',
      },
      {
        question: 'For how many of her 52 weeks of maternity leave can Amira receive SMP?',
        options: ['All 52 weeks', 'Up to 39 weeks', 'Only 6 weeks', 'Only 33 weeks'],
        correctIndex: 1,
        explanation: 'SMP is payable for up to 39 of the 52 weeks of maternity leave; the remaining weeks of leave are unpaid unless the employer enhances pay.',
      },
      {
        question: 'How is Amira\'s SMP calculated for her first 6 weeks?',
        options: ['A flat £184.03 a week regardless of earnings', '90% of her average weekly earnings', '50% of her average weekly earnings', 'Her full monthly salary unchanged'],
        correctIndex: 1,
        explanation: 'The first 6 weeks of SMP are paid at 90% of average weekly earnings, regardless of the flat statutory rate.',
      },
      {
        question: 'For weeks 7 to 39, how is Amira\'s SMP rate determined?',
        options: ['Always 90% of average earnings', 'The lower of the flat statutory rate (£184.03/week, 2024/25) or 90% of average weekly earnings', 'A fixed amount set by her employer', 'Always the flat statutory rate, even if 90% of earnings would be lower'],
        correctIndex: 1,
        explanation: 'For weeks 7-39, SMP is paid at whichever is lower: the flat statutory rate or 90% of average weekly earnings — for most earners above the flat rate, this means the flat rate applies.',
      },
      {
        question: 'Since Northfield\'s employer Class 1 NIC bill last year was £38,000 (below £45,000), what percentage of Amira\'s SMP can it reclaim from HMRC?',
        options: ['92%', '100%', '103% (100% plus Small Employers\' Relief)', '0% — SMP cannot be reclaimed'],
        correctIndex: 2,
        explanation: 'As a small employer (prior-year NIC bill of £45,000 or less), Northfield can reclaim 103% of the SMP paid, including Small Employers\' Relief.',
      },
      {
        question: 'How does Northfield actually recover the SMP paid to Amira?',
        options: ['By submitting a separate cash claim form to HMRC', 'By reducing the PAYE/NI it pays over to HMRC', 'It cannot recover the cost', 'By invoicing Tom\'s employer'],
        correctIndex: 1,
        explanation: 'Statutory payment recovery is achieved by reducing what the employer remits to HMRC for PAYE/NI, reported via the EPS.',
      },
      {
        question: 'What must Tom check with his own employer regarding his two weeks of paternity leave?',
        options: ['Nothing — it is entirely automatic with no eligibility tests', 'That he separately meets the continuity of employment and earnings tests for SPP with his employer', 'That Amira\'s employer approves it', 'That he takes it within 6 months of Amira\'s due date only'],
        correctIndex: 1,
        explanation: 'SPP eligibility is assessed separately against Tom\'s own employment — his own service and earnings must meet the qualifying tests with his employer.',
      },
    ],
  },
  {
    id: 'cs3',
    title: 'Redundancy at Ferryman Logistics: Calculating David\'s Final Pay',
    moduleIds: ['m7', 'm3', 'm2', 'm8'],
    scenario: [
      'David, aged 45, has worked for Ferryman Logistics for 12 complete years. His role is made redundant, and Ferryman Logistics decides to end his employment immediately rather than have him work his 8-week contractual notice period, invoking the PILON clause in his contract.',
      'David\'s weekly pay is £900 (above the statutory redundancy cap), and his contract entitles him to a redundancy payment enhanced beyond the statutory minimum, alongside his PILON and pay for 15 days of accrued but untaken holiday.',
      'Payroll must work out David\'s statutory redundancy entitlement, correctly tax his PILON and any additional termination payment, and issue his final payslip and P45.',
    ],
    questions: [
      {
        question: 'What weekly pay figure is used for David\'s statutory redundancy calculation, given his actual pay is £900/week?',
        options: ['£900, his actual weekly pay', 'The capped figure of £700/week (2024/25)', '£450, half his weekly pay', 'Statutory redundancy uses monthly, not weekly, pay'],
        correctIndex: 1,
        explanation: 'Statutory redundancy calculations use the capped weekly pay figure (£700 in 2024/25), even though David actually earns more.',
      },
      {
        question: 'At age 45 with 12 complete years of service, what multiplier applies to each of those years?',
        options: ['0.5 week\'s pay per year', '1 week\'s pay per year', '1.5 week\'s pay per year', '2 weeks\' pay per year'],
        correctIndex: 2,
        explanation: 'For each full year of service at age 41 or over, the multiplier is 1.5 week\'s pay.',
      },
      {
        question: 'Since Ferryman Logistics has a PILON clause and pays David out instead of him working notice, how is the PILON taxed?',
        options: ['Tax-free, as compensation for loss of office', 'Fully taxable and subject to NI, as normal earnings', 'Tax-free up to £30,000 alongside redundancy pay', 'Only NI applies, no Income Tax'],
        correctIndex: 1,
        explanation: 'Since 2018, all PILON payments are fully taxable and NI-able as earnings, regardless of whether a PILON clause exists.',
      },
      {
        question: 'Is David\'s statutory redundancy pay itself subject to Income Tax and NI?',
        options: ['Yes, fully taxed like ordinary pay', 'No, it is entirely tax and NI free', 'Only the amount above £700/week is taxed', 'Only NI applies'],
        correctIndex: 1,
        explanation: 'Statutory redundancy pay is entirely tax-free and NI-free in the hands of the employee.',
      },
      {
        question: 'David\'s enhanced (above-statutory) redundancy payment is genuinely non-contractual compensation. How does it interact with the £30,000 exemption?',
        options: ['It is fully taxable with no exemption available', 'It can be tested against the £30,000 exemption, combined with his statutory redundancy pay', 'It automatically doubles the exemption to £60,000', 'It is exempt without any limit'],
        correctIndex: 1,
        explanation: 'Genuinely non-contractual termination payments — including statutory redundancy pay plus any enhanced ex-gratia element — are combined and tested against the single £30,000 exemption.',
      },
      {
        question: 'What must be calculated and taxed as earnings before any balance is set against the £30,000 exemption?',
        options: ['His holiday pay', 'PENP (Post-Employment Notice Pay)', 'His statutory redundancy pay', 'His pension contributions'],
        correctIndex: 1,
        explanation: 'PENP must be identified and taxed in full as earnings first; only the genuinely non-contractual remainder can then be tested against the £30,000 exemption.',
      },
      {
        question: 'How is David\'s accrued but untaken holiday pay treated on his final payslip?',
        options: ['It is tax and NI free like redundancy pay', 'It is taxed and NI\'d as normal earnings', 'It is excluded from the final payslip entirely', 'It is only payable if he is over 50'],
        correctIndex: 1,
        explanation: 'Payment for accrued, untaken holiday is treated as normal earnings and taxed/NI\'d accordingly, unlike the tax-free redundancy element.',
      },
      {
        question: 'What must Ferryman Logistics provide to David on leaving, generated through the payroll leaver process?',
        options: ['A Starter Checklist', 'A P45', 'A P60 only', 'Nothing, since he was made redundant'],
        correctIndex: 1,
        explanation: 'A P45 must be issued on leaving, generated via the payroll software\'s leaver process as part of the Full Payment Submission.',
      },
    ],
  },
];

export function getCaseStudyById(id: string) {
  return caseStudies.find((c) => c.id === id);
}
