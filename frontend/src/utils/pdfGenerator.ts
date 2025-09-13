import jsPDF from 'jspdf';
import { ESocFormData } from '@/types/form-types';

export class ESocPDFGenerator {
  private pdf: jsPDF;
  private currentY: number = 20;
  private pageHeight: number = 280;
  private margin: number = 20;
  private pageWidth: number = 210;

  constructor() {
    this.pdf = new jsPDF('p', 'mm', 'a4');
  }

  private addNewPage() {
    this.pdf.addPage();
    this.currentY = 20;
  }

  private checkPageBreak(requiredHeight: number = 10) {
    if (this.currentY + requiredHeight > this.pageHeight) {
      this.addNewPage();
    }
  }

  private addCompanyHeader() {
    // Company logo area (placeholder)
    this.pdf.setFillColor(140, 198, 63); // Green color
    this.pdf.rect(this.margin, this.currentY, 8, 8, 'F');
    
    this.pdf.setFontSize(14);
    this.pdf.setFont('helvetica', 'bold');
    this.pdf.text('METROPOLITAN', this.margin + 12, this.currentY + 4);
    
    this.pdf.setFontSize(12);
    this.pdf.setFont('helvetica', 'normal');
    this.pdf.text('HOME HEALTH CARE', this.margin + 12, this.currentY + 8);
    
    this.currentY += 12;
    
    // Address
    this.pdf.setFontSize(9);
    this.pdf.text('212 S Milwaukee Ave. Ste G Wheeling, IL 60090', this.pageWidth / 2, this.currentY, { align: 'center' });
    this.currentY += 6;
  }

  private addFormHeader(title: string) {
    this.checkPageBreak(40);
    this.addCompanyHeader();
    this.currentY += 8;
    
    this.pdf.setFontSize(14);
    this.pdf.setFont('helvetica', 'bold');
    this.pdf.text(title.toUpperCase(), this.pageWidth / 2, this.currentY, { align: 'center' });
    this.currentY += 15;
  }

  private addField(label: string, value: string | boolean | Date | null, isCheckbox: boolean = false) {
    this.checkPageBreak();
    this.pdf.setFontSize(10);
    this.pdf.setFont('helvetica', 'normal');
    
    if (isCheckbox) {
      const checkmark = value ? '☑' : '☐';
      this.pdf.text(`${checkmark} ${label}`, this.margin, this.currentY);
    } else {
      const displayValue = value ? 
        (value instanceof Date ? value.toLocaleDateString() : String(value)) : 
        '_________________';
      this.pdf.text(`${label}: ${displayValue}`, this.margin, this.currentY);
    }
    this.currentY += 6;
  }

  private addSection(title: string) {
    this.checkPageBreak(15);
    this.currentY += 5;
    this.pdf.setFontSize(12);
    this.pdf.setFont('helvetica', 'bold');
    this.pdf.text(title, this.margin, this.currentY);
    this.currentY += 10;
  }

  private addSignatureField(label: string, signature: string, date: Date | null) {
    this.checkPageBreak(15);
    this.pdf.setFontSize(10);
    this.pdf.setFont('helvetica', 'normal');
    
    const signatureText = signature || '________________________________';
    const dateText = date ? date.toLocaleDateString() : '____________';
    
    this.pdf.text(`${label}:`, this.margin, this.currentY);
    this.currentY += 6;
    this.pdf.text(`Signature: ${signatureText}`, this.margin + 10, this.currentY);
    this.pdf.text(`Date: ${dateText}`, this.margin + 100, this.currentY);
    this.currentY += 10;
  }

  generateHMONotice(data: ESocFormData) {
    this.addFormHeader('HMO Notice');
    
    this.currentY += 5;
    
    this.pdf.setFontSize(11);
    this.pdf.setFont('helvetica', 'bold');
    this.pdf.text('IF YOU JOIN A HEALTH MAINTENANCE ORGANIZATION (HMO), YOU MUST NOTIFY', this.margin, this.currentY);
    this.currentY += 6;
    this.pdf.text('OUR OFFICE IMMEDIATELY.', this.margin, this.currentY);
    this.currentY += 12;
    
    this.pdf.setFontSize(10);
    this.pdf.setFont('helvetica', 'normal');
    
    const hmoContent = [
      'An HMO administrates your Medicare health benefits and designates which',
      'home health agency must use along with the Physician and Hospital.',
      '',
      'If we are not notified of your enrollment in an HMO or that you are currently',
      'enrolled, you will be billed for all visits made because Medicare will no longer pay',
      'Metropolitan Home Health Care, Inc.',
      '',
      'It is your responsibility to call us at 847-568-1033 to notify us of the date you',
      'enrollment in the HMO takes place. If you are enrolled in an HMO, it takes 30',
      'days to withdraw.',
      '',
      'If you have any questions, do not hesitate to call our office at 847-568-1033.',
      '',
      'The above information has been explained to me.',
    ];
    
    hmoContent.forEach(line => {
      this.pdf.text(line, this.margin, this.currentY);
      this.currentY += 6;
    });
    
    this.currentY += 10;
    
    // Signature lines
    this.pdf.text(`Patient's Signature: ${data.hmoNoticeAcknowledgement.patientSignature || '_'.repeat(30)}`, this.margin, this.currentY);
    const patientDate = data.hmoNoticeAcknowledgement.patientSignatureDate 
      ? data.hmoNoticeAcknowledgement.patientSignatureDate.toLocaleDateString() 
      : '_'.repeat(10);
    this.pdf.text(`Date: ${patientDate}`, this.margin + 120, this.currentY);
    
    this.currentY += 12;
    this.pdf.text(`Witness: ${data.hmoNoticeAcknowledgement.witnessSignature || '_'.repeat(35)}`, this.margin, this.currentY);
    const witnessDate = data.hmoNoticeAcknowledgement.witnessSignatureDate 
      ? data.hmoNoticeAcknowledgement.witnessSignatureDate.toLocaleDateString() 
      : '_'.repeat(10);
    this.pdf.text(`Date: ${witnessDate}`, this.margin + 120, this.currentY);
    
    this.currentY += 12;
    this.pdf.text(`Patient's Name: ${data.hmoNoticeAcknowledgement.patientName || '_'.repeat(30)}`, this.margin, this.currentY);
  }

  generateBeneficiaryTransfer(data: ESocFormData) {
    this.addNewPage();
    this.addFormHeader('Beneficiary-Elected Transfer');
    
    this.currentY += 5;
    
    // Add phone/fax info
    this.pdf.setFontSize(9);
    this.pdf.text('(847) 568-1033 | Fax: (847) 568-1034', this.pageWidth / 2, this.currentY, { align: 'center' });
    this.currentY += 15;
    
    this.pdf.setFontSize(10);
    this.pdf.setFont('helvetica', 'normal');
    
    const transferText = `I understand that my previous Home Health Agency ${data.beneficiaryElectedTransfer.previousHomeHealthAgency || '_'.repeat(20)} located at`;
    this.pdf.text(transferText, this.margin, this.currentY);
    this.currentY += 8;
    
    this.pdf.text(`${data.beneficiaryElectedTransfer.previousAgencyLocation || '_'.repeat(35)} will no longer:`, this.margin, this.currentY);
    this.currentY += 12;
    
    // Bullet points
    this.pdf.text('• Provide home health services to me after today\'s date.', this.margin + 10, this.currentY);
    this.currentY += 8;
    
    this.pdf.text('• Receive any payment from any health insurance on my behalf.', this.margin + 10, this.currentY);
    this.currentY += 15;
    
    this.pdf.text('I also understand that I am now electing transfer to Metropolitan Home Health Care, Inc. to', this.margin, this.currentY);
    this.currentY += 6;
    this.pdf.text('provide home health services effective immediately.', this.margin, this.currentY);
    this.currentY += 25;
    
    // Signature section
    this.pdf.text('_'.repeat(25), this.margin, this.currentY);
    this.pdf.text('_'.repeat(20), this.margin + 100, this.currentY);
    this.currentY += 4;
    this.pdf.text('Patient Signature', this.margin + 8, this.currentY);
    this.pdf.text('Date', this.margin + 115, this.currentY);
    
    this.currentY += 20;
    this.pdf.text('_'.repeat(25), this.margin, this.currentY);
    this.pdf.text('_'.repeat(20), this.margin + 100, this.currentY);
    this.currentY += 4;
    this.pdf.text('Witness', this.margin + 15, this.currentY);
    this.pdf.text('Date', this.margin + 115, this.currentY);
  }

  generateMedicationProfile(data: ESocFormData) {
    this.addNewPage();
    this.addFormHeader('Medication Profile');
    
    // Add contact info
    this.pdf.setFontSize(9);
    this.pdf.text('Tel: (847) 568-1033', this.pageWidth - 80, 40);
    this.pdf.text('Fax: (847) 568-1034', this.pageWidth - 80, 45);
    this.pdf.text('Email: metro@emetrocare.com', this.pageWidth - 80, 50);
    this.pdf.text('http://www.emetrocare.com', this.pageWidth - 80, 55);
    
    this.currentY = 70;
    
    // Patient info section
    this.pdf.setFontSize(10);
    this.pdf.text(`Patient Name: ${data.medicationProfile.patientName || '_'.repeat(25)}`, this.margin, this.currentY);
    this.pdf.text(`Pharmacy: ${data.medicationProfile.pharmacy || '_'.repeat(15)}`, this.margin + 120, this.currentY);
    this.currentY += 8;
    
    this.pdf.text(`Physician: ${data.medicationProfile.physician || '_'.repeat(25)}`, this.margin, this.currentY);
    this.pdf.text(`Address: ${data.medicationProfile.pharmacyAddress || '_'.repeat(15)}`, this.margin + 120, this.currentY);
    this.currentY += 8;
    
    this.pdf.text(`Allergy: ${data.medicationProfile.allergy || '_'.repeat(25)}`, this.margin, this.currentY);
    this.pdf.text(`Phone: ${data.medicationProfile.pharmacyPhone || '_'.repeat(15)}`, this.margin + 120, this.currentY);
    this.currentY += 8;
    
    this.pdf.text(`DX: ${data.medicationProfile.dx || '_'.repeat(30)}`, this.margin, this.currentY);
    this.pdf.text(`HT: ${data.medicationProfile.height || '_'.repeat(5)} WT: ${data.medicationProfile.weight || '_'.repeat(5)}`, this.margin + 120, this.currentY);
    this.currentY += 15;
    
    // Medication table
    this.pdf.setFillColor(240, 240, 240);
    this.pdf.rect(this.margin, this.currentY, this.pageWidth - 2 * this.margin, 8, 'F');
    
    this.pdf.setFontSize(9);
    this.pdf.setFont('helvetica', 'bold');
    this.pdf.text('Start Date', this.margin + 2, this.currentY + 5);
    this.pdf.text('C/N', this.margin + 25, this.currentY + 5);
    this.pdf.text('Medication', this.margin + 40, this.currentY + 5);
    this.pdf.text('Dose/Route', this.margin + 85, this.currentY + 5);
    this.pdf.text('Frequency', this.margin + 125, this.currentY + 5);
    this.pdf.text('Purpose', this.margin + 155, this.currentY + 5);
    this.pdf.text('C/DC Date', this.margin + 180, this.currentY + 5);
    this.currentY += 10;
    
    // Add medication rows
    this.pdf.setFont('helvetica', 'normal');
    for (let i = 0; i < 15; i++) {
      const med = data.medicationProfile.medications[i];
      if (med) {
        const startDate = med.startDate ? med.startDate.toLocaleDateString().substring(0, 8) : '';
        this.pdf.text(startDate, this.margin + 2, this.currentY);
        this.pdf.text(med.changeType || '', this.margin + 25, this.currentY);
        this.pdf.text((med.medication || '').substring(0, 18), this.margin + 40, this.currentY);
        this.pdf.text((med.doseRoute || '').substring(0, 15), this.margin + 85, this.currentY);
        this.pdf.text((med.frequency || '').substring(0, 12), this.margin + 125, this.currentY);
        this.pdf.text((med.purpose || '').substring(0, 10), this.margin + 155, this.currentY);
        const dcDate = med.changeDcDate ? med.changeDcDate.toLocaleDateString().substring(0, 8) : '';
        this.pdf.text(dcDate, this.margin + 180, this.currentY);
      }
      
      // Draw line
      this.pdf.line(this.margin, this.currentY + 2, this.pageWidth - this.margin, this.currentY + 2);
      this.currentY += 8;
    }
    
    // Date Reviewed/Clinician Signature section
    this.currentY += 5;
    this.pdf.text('Date Reviewed/ Clinician Signature', this.margin, this.currentY);
    this.currentY += 10;
    
    for (let i = 0; i < 3; i++) {
      this.pdf.line(this.margin, this.currentY, this.margin + 50, this.currentY);
      this.pdf.line(this.margin + 60, this.currentY, this.margin + 120, this.currentY);
      this.pdf.line(this.margin + 130, this.currentY, this.pageWidth - this.margin, this.currentY);
      this.currentY += 15;
    }
    
    // Footer
    this.pdf.setFontSize(8);
    this.pdf.text('METROPOLITAN HOME HEALTH CARE, INC.', this.margin, this.pageHeight - 15);
    this.pdf.text('CODE: N = New, C = Change, DC = Discontinue', this.pageWidth - 100, this.pageHeight - 15);
  }

  generatePressureUlcerRisk(data: ESocFormData) {
    this.addNewPage();
    
    // Header without company logo for this form
    this.pdf.setFontSize(12);
    this.pdf.setFont('helvetica', 'bold');
    this.pdf.text('Skin Conditions', this.pageWidth - 60, 20);
    this.pdf.text('Pressure Ulcer/Injury Risk', this.pageWidth - 60, 26);
    
    this.currentY = 35;
    
    this.pdf.setFontSize(10);
    this.pdf.setFont('helvetica', 'normal');
    this.pdf.text(`Patient Name: ${data.pressureUlcerRisk.patientName || '_'.repeat(20)}`, this.margin, this.currentY);
    this.currentY += 8;
    const riskDate = data.pressureUlcerRisk.date ? data.pressureUlcerRisk.date.toLocaleDateString() : '_'.repeat(10);
    this.pdf.text(`Date: ${riskDate}`, this.margin, this.currentY);
    this.currentY += 15;
    
    // Norton Scale Title
    this.pdf.setFontSize(12);
    this.pdf.setFont('helvetica', 'bold');
    this.pdf.text('The Norton Pressure Sore', this.pageWidth / 2, this.currentY, { align: 'center' });
    this.currentY += 6;
    this.pdf.text('Risk-Assessment Scale Scoring System', this.pageWidth / 2, this.currentY, { align: 'center' });
    this.currentY += 15;
    
    // Description
    this.pdf.setFontSize(9);
    this.pdf.setFont('helvetica', 'normal');
    const description = [
      'The Norton Scoring system, shown below, and created in England in 1962, has been the first pressure sore',
      'risk evaluation scale to be created, back in 1962, and for this it is now criticized in the wake of the results of',
      'modern research. Its ease of use, however, makes it still widely used today.',
      '',
      'To evaluate the Norton Rating for a certain patient look at the tables below and add up the values beside each',
      'parameter which apply to the patient. The total sum is the Norton Rating (NR) for that patient and may vary from',
      '20 (minimum risk) to 5 (maximum risk).',
      '',
      '(Indicatively: a Norton Rating below 9 means Very High Risk, 10 to 13 means High Risk, 14 to 17 medium risk',
      'and above 18 means low risk)'
    ];
    
    description.forEach(line => {
      this.pdf.text(line, this.margin, this.currentY);
      this.currentY += 4;
    });
    
    this.currentY += 8;
    
    // Norton Scale Table
    const tableData = [
      ['Physical\nCondition', ['Good', 'Fair', 'Poor', 'Very Bad'], [4, 3, 2, 1]],
      ['Mental\nCondition', ['Alert', 'Apathetic', 'Confused', 'Stuporous'], [4, 3, 2, 1]],
      ['Activity', ['Ambulant', 'Walks with help', 'Chairbound', 'Bedfast'], [4, 3, 2, 1]],
      ['Mobility', ['Full', 'Slightly Impaired', 'Very Limited', 'Immobile'], [4, 3, 2, 1]],
      ['Incontinence', ['None', 'Occasional', 'Usually Urinary', 'Urinary and Fecal'], [4, 3, 2, 1]]
    ];
    
    // Table borders and content
    const tableWidth = 140;
    const tableStartX = this.margin + 15;
    
    tableData.forEach((row, index) => {
      const rowY = this.currentY + (index * 15);
      
      // Draw table borders
      this.pdf.rect(tableStartX, rowY, 25, 15);
      this.pdf.rect(tableStartX + 25, rowY, 90, 15);
      this.pdf.rect(tableStartX + 115, rowY, 25, 15);
      
      // Category
      this.pdf.setFont('helvetica', 'bold');
      this.pdf.setFontSize(9);
      this.pdf.text(row[0] as string, tableStartX + 2, rowY + 8);
      
      // Options
      this.pdf.setFont('helvetica', 'normal');
      this.pdf.setFontSize(8);
      (row[1] as string[]).forEach((option, optIndex) => {
        this.pdf.text(option, tableStartX + 27 + (optIndex * 20), rowY + 4 + (optIndex * 3));
        this.pdf.text((row[2] as number[])[optIndex].toString(), tableStartX + 117 + (optIndex * 5), rowY + 4 + (optIndex * 3));
      });
    });
    
    this.currentY += 80;
    
    // Risk interpretation
    this.pdf.setFontSize(9);
    this.pdf.text('Generally, the risk factor is coded this way:', this.margin, this.currentY);
    this.currentY += 8;
    
    const riskLevels = [
      ['Greater than 18', 'Low Risk'],
      ['Between 18 and 14', 'Medium risk'],
      ['Between 14 and 10', 'High Risk'],
      ['Lesser than 10', 'Very High Risk']
    ];
    
    riskLevels.forEach(([range, risk]) => {
      this.pdf.text(range, this.margin + 20, this.currentY);
      this.pdf.text(risk, this.margin + 60, this.currentY);
      this.currentY += 6;
    });
    
    this.currentY += 10;
    
    // Braden Scale note
    this.pdf.text('Another rating system getting more and more popularity is the Braden Scale, created in the USA, more recent', this.margin, this.currentY);
    this.currentY += 5;
    this.pdf.text('and precise than the Norton scale, which evaluates factors such as sensory perception, skin wetness, nutrition', this.margin, this.currentY);
    this.currentY += 5;
    this.pdf.text('and such.', this.margin, this.currentY);
    
    this.currentY += 20;
    
    // Signature section
    this.pdf.text(`Nurse Signature: ${data.pressureUlcerRisk.nurseSignature || '_'.repeat(30)}`, this.margin, this.currentY);
    const nurseDate = data.pressureUlcerRisk.nurseSignatureDate 
      ? data.pressureUlcerRisk.nurseSignatureDate.toLocaleDateString() 
      : '_'.repeat(10);
    this.pdf.text(`Date: ${nurseDate}`, this.margin + 120, this.currentY);
  }

  generatePatientServiceAgreement(data: ESocFormData) {
    this.addFormHeader('Patient Service Agreement');
    
    // Patient info section
    this.pdf.setFontSize(10);
    this.pdf.setFont('helvetica', 'normal');
    this.pdf.text(`PATIENT NAME: ${data.patientServiceAgreement.patientName || '_'.repeat(30)}`, this.margin, this.currentY);
    this.pdf.text(`SS # ${data.patientServiceAgreement.ssNumber || '_'.repeat(15)}`, this.pageWidth - 80, this.currentY);
    this.currentY += 12;
    
    // Consent sections with detailed text
    this.addConsentSection('CONSENT FOR CARE:', 
      'I authorize METROPOLITAN HOME HEALTH CARE, Inc. to perform necessary treatments to facilitate proper health care in accordance with the orders of my physician. The nature and purpose of all treatments have been explained to me. I understand that I may refuse treatment within the confines of the law and will be informed of the consequences of my actions.',
      data.patientServiceAgreement.consentForCare);
    
    this.addConsentSection('RELEASE OF INFORMATION:', 
      'I authorize the release of medical and other information needed to determine these benefits to METROPOLITAN HOME HEALTH CARE, Inc. or Medicare / Public Aid, and/or other insurance and its agents. I authorize METROPOLITAN HOME HEALTH CARE, Inc. to disclose to, furnish a copy of, or permit bearer (agency employee) to view or copy clinical record information in connection with any past or present illness, treatment or prescription pertinent to my care. I give authorization for a copy of this service agreement to be considered as effective and valid as the original. If my care is transferred to another agency or facility, I authorize METROPOLITAN HOME HEALTH CARE, Inc. to increase all pertinent information related to my care to the new home health agency or facility.',
      data.patientServiceAgreement.releaseOfInformation);
    
    this.addConsentSection('FINANCIAL AGREEMENT/ASSIGNMENT OF BENEFITS:', 
      'I request that my Medicare / Public Aid benefits be paid directly to METROPOLITAN HOME HEALTH CARE, Inc. on my behalf for services provided to me by or through METROPOLITAN HOME HEALTH CARE, Inc. METROPOLITAN HEALTH CARE, Inc. agrees to accept the Medicare / Public Aid benefits as total payment and will not bill the patient for any services provided. To the best of my knowledge, all information given to my admission nurse, by me, regarding my source of payment is correct. I agree to inform METROPOLITAN HOME HEALTH CARE, Inc. immediately if there are any changes in the above insurance information. I understand that METROPOLITAN HOME HEALTH CARE, Inc. will forward all necessary information to my source of payment for billing purposes. I have been informed of my agency\'s charges and policies concerning payment for services, including, to the extent possible, insurance coverage and other methods of payment.\nI have received the Medicare explanation of Patient Fees for services and equipment. For transfer of care from another HH agency the other HH agency will no longer receive Medicare payment on my behalf and will no longer provide Medicare covered services to me after the date of the transfer.',
      data.patientServiceAgreement.financialAgreement);
    
    this.addConsentSection('PATIENT\'S RIGHTS AND RESPONSIBILITIES:', 
      'I have received a copy of the Patient\'s Bill of Rights and Responsibilities/Non discrimination form, which I have read. I understand both my responsibilities to my care and the agency\'s responsibility for my care. I understand that I will be discharged from the agency for verbal, physical and or mental abuse staff.',
      data.patientServiceAgreement.patientRightsReceived);
    
    this.addConsentSection('ADVANCE DIRECTIVES:', 
      'I have received written and verbal notice of my right to complete an advance directive. I have been given the opportunity to ask questions when information was not clear.',
      data.patientServiceAgreement.advanceDirectivesReceived);
    
    // Add checkboxes for advance directives
    this.currentY += 5;
    this.pdf.setFontSize(9);
    const adCheckbox1 = data.patientServiceAgreement.declineAdvanceDirective ? '☑' : '☐';
    this.pdf.text(`${adCheckbox1} I do not choose to have an Advance Directive at this time.`, this.margin + 20, this.currentY);
    this.currentY += 6;
    const adCheckbox2 = data.patientServiceAgreement.provideMedicalPowerOfAttorney ? '☑' : '☐';
    this.pdf.text(`${adCheckbox2} I will provide the agency a copy of my medical power of attorney.`, this.margin + 20, this.currentY);
    this.currentY += 6;
    const adCheckbox3 = data.patientServiceAgreement.provideLivingWill ? '☑' : '☐';
    this.pdf.text(`${adCheckbox3} I will provide the agency a copy of my Living Will.`, this.margin + 20, this.currentY);
    
    // Add signature section at bottom
    this.currentY += 10;
    this.pdf.text('Page 1 of 2', this.pageWidth / 2, this.pageHeight - 10, { align: 'center' });
  }

  private addConsentSection(title: string, content: string, checked: boolean) {
    this.checkPageBreak(25);
    
    // Add checkbox
    const checkbox = checked ? '☑' : '☐';
    this.pdf.setFont('helvetica', 'bold');
    this.pdf.text(`${checkbox} ${title}`, this.margin, this.currentY);
    this.currentY += 6;
    
    // Add content text
    this.pdf.setFont('helvetica', 'normal');
    this.pdf.setFontSize(9);
    const lines = this.pdf.splitTextToSize(content, this.pageWidth - 2 * this.margin);
    this.pdf.text(lines, this.margin, this.currentY);
    this.currentY += lines.length * 4 + 8;
  }

  generatePatientRightsAcknowledgement(data: ESocFormData) {
    this.addNewPage();
    this.addFormHeader('Patient Rights/Responsibilities Acknowledgement');
    
    if (data.patientRightsAcknowledgement.otherInstructions) {
      this.addSection('Other Pertinent Instructions');
      const instructions = data.patientRightsAcknowledgement.otherInstructions;
      const lines = this.pdf.splitTextToSize(instructions, 170);
      this.pdf.text(lines, this.margin, this.currentY);
      this.currentY += lines.length * 6 + 5;
    }
    
    this.addField('Clinical Manager Name', data.patientRightsAcknowledgement.clinicalManagerName);
    this.addField('Clinical Manager Contact', data.patientRightsAcknowledgement.clinicalManagerContact);
    
    this.addSection('Acknowledgement Statement');
    this.pdf.text('I acknowledge that I have received a copy of the notice of Rights/Responsibilities', this.margin, this.currentY);
    this.currentY += 6;
    this.pdf.text('and Transfer/Discharge Criteria.', this.margin, this.currentY);
    this.currentY += 15;
    
    this.addSignatureField('Patient', data.patientRightsAcknowledgement.patientSignature, data.patientRightsAcknowledgement.patientSignatureDate);
    if (data.patientRightsAcknowledgement.representativeSignature) {
      this.addSignatureField('Representative', data.patientRightsAcknowledgement.representativeSignature, data.patientRightsAcknowledgement.representativeSignatureDate);
    }
    this.addSignatureField('Agency Representative', data.patientRightsAcknowledgement.agencyRepresentativeSignature, data.patientRightsAcknowledgement.agencyRepresentativeDate);
  }

  generateEmergencyPreparedness(data: ESocFormData) {
    this.addNewPage();
    this.addFormHeader('Individual Patient Emergency Preparedness Plan');
    
    this.addSection('Identifying Information');
    this.addField('Patient Name', data.emergencyPreparedness.patientName);
    this.addField('SOC Date', data.emergencyPreparedness.socDate);
    this.addField('Phone Number', data.emergencyPreparedness.phoneNumber);
    this.addField('Physician', data.emergencyPreparedness.physician);
    this.addField('Address', data.emergencyPreparedness.address);
    this.addField('City', data.emergencyPreparedness.city);
    this.addField('State', data.emergencyPreparedness.state);
    this.addField('ZIP Code', data.emergencyPreparedness.zip);
    
    this.addSection('Healthcare Information');
    this.addField('Primary Diagnosis', data.emergencyPreparedness.primaryDx);
    this.addField('Secondary Diagnosis', data.emergencyPreparedness.secondaryDx);
    this.addField('Daily services required', data.emergencyPreparedness.dailyServices, true);
    if (data.emergencyPreparedness.dailyServicesDescription) {
      this.addField('Services description', data.emergencyPreparedness.dailyServicesDescription);
    }
    
    if (data.emergencyPreparedness.oxygenFlowRate) {
      this.addField('Oxygen flow rate', data.emergencyPreparedness.oxygenFlowRate);
      this.addField('Oxygen hours', data.emergencyPreparedness.oxygenHours);
      this.addField('Oxygen device', data.emergencyPreparedness.oxygenDevice);
    }
    
    this.addField('Life-sustaining infusion', data.emergencyPreparedness.lifeSustainingInfusion, true);
    if (data.emergencyPreparedness.lifeSustainingDescription) {
      this.addField('Infusion description', data.emergencyPreparedness.lifeSustainingDescription);
    }
    
    this.addField('Other IV therapy', data.emergencyPreparedness.otherIvTherapy, true);
    if (data.emergencyPreparedness.otherIvDescription) {
      this.addField('IV therapy description', data.emergencyPreparedness.otherIvDescription);
    }
    
    this.addField('Patient/caregiver independent', data.emergencyPreparedness.patientIndependent, true);
    this.addField('Ventilator dependent', data.emergencyPreparedness.ventilatorDependent, true);
    this.addField('Dialysis', data.emergencyPreparedness.dialysis, true);
    if (data.emergencyPreparedness.dialysisDescription) {
      this.addField('Dialysis description', data.emergencyPreparedness.dialysisDescription);
    }
    
    this.addField('Tube feeding', data.emergencyPreparedness.tubeFeeding, true);
    if (data.emergencyPreparedness.tubeFeedingDescription) {
      this.addField('Tube feeding description', data.emergencyPreparedness.tubeFeedingDescription);
    }
    
    this.addField('Independent with medications', data.emergencyPreparedness.independentMedications, true);
    
    if (data.emergencyPreparedness.functionalDisabilities.length > 0) {
      this.addSection('Functional Disabilities');
      data.emergencyPreparedness.functionalDisabilities.forEach(disability => {
        this.addField(disability, true, true);
      });
    }
    
    this.addSection('Emergency Contact & Evacuation Plan');
    this.addField('Emergency contact name', data.emergencyPreparedness.emergencyContactName);
    this.addField('Emergency contact phone', data.emergencyPreparedness.emergencyContactPhone);
    this.addField('Evacuation relative/friend phone', data.emergencyPreparedness.evacuationRelativePhone);
    this.addField('Evacuation hotel', data.emergencyPreparedness.evacuationHotel);
    this.addField('Evacuation shelter', data.emergencyPreparedness.evacuationShelter);
    this.addField('Special needs shelter registered', data.emergencyPreparedness.specialNeedsShelter, true);
    this.addField('Other evacuation arrangements', data.emergencyPreparedness.evacuationOther);
    this.addField('Priority/Acuity level', data.emergencyPreparedness.priorityLevel);
    
    this.addSignatureField('Clinician', data.emergencyPreparedness.clinicianSignature, data.emergencyPreparedness.clinicianDate);
  }

  generateVaccineQuestionnaire(data: ESocFormData) {
    this.addNewPage();
    this.addFormHeader('Influenza / Pneumonia Vaccine Questionnaire');
    
    this.addField('Patient Name', data.vaccineQuestionnaire.patientName);
    this.addField('Date', data.vaccineQuestionnaire.date);
    
    this.addSection('Influenza Vaccine');
    this.addField('Interested in influenza vaccine', data.vaccineQuestionnaire.influenzaInterest, true);
    this.addField('Age ≥ 65', data.vaccineQuestionnaire.age65Plus, true);
    this.addField('Age 50-64 with condition', data.vaccineQuestionnaire.age50To64WithCondition, true);
    this.addField('Personal preference', data.vaccineQuestionnaire.personalPreferenceInfluenza, true);
    this.addField('Other reason', data.vaccineQuestionnaire.otherInfluenza, true);
    this.addField('Recent flu shot', data.vaccineQuestionnaire.recentFluShot, true);
    if (data.vaccineQuestionnaire.recentFluShotDate) {
      this.addField('Flu shot date', data.vaccineQuestionnaire.recentFluShotDate);
    }
    this.addField('Allergic to eggs', data.vaccineQuestionnaire.allergicToEggs, true);
    this.addField('Previous reaction to flu shot', data.vaccineQuestionnaire.reactionToFluShot, true);
    
    this.addSection('Pneumonia Vaccine');
    this.addField('Interested in pneumonia vaccine', data.vaccineQuestionnaire.pneumoniaInterest, true);
    this.addField('Age ≥ 65', data.vaccineQuestionnaire.age65PlusPneumonia, true);
    this.addField('Chronic health problem', data.vaccineQuestionnaire.chronicHealthProblem, true);
    this.addField('Personal preference', data.vaccineQuestionnaire.personalPreferencePneumonia, true);
    this.addField('Previously received pneumonia vaccine', data.vaccineQuestionnaire.receivedPneumoniaVaccine, true);
    if (data.vaccineQuestionnaire.pneumoniaVaccineDate) {
      this.addField('Previous pneumonia vaccine date', data.vaccineQuestionnaire.pneumoniaVaccineDate);
    }
    
    if (data.vaccineQuestionnaire.vaccinatedInfluenza || data.vaccineQuestionnaire.vaccinatedPneumonia) {
      this.addSection('Vaccine Administration');
      this.addField('Influenza administered', data.vaccineQuestionnaire.vaccinatedInfluenza, true);
      this.addField('Pneumonia administered', data.vaccineQuestionnaire.vaccinatedPneumonia, true);
      this.addField('Administration date', data.vaccineQuestionnaire.administrationDate);
      this.addField('Site', data.vaccineQuestionnaire.site);
      this.addField('Manufacturer/Lot', data.vaccineQuestionnaire.manufacturerLot);
      this.addField('Expiry', data.vaccineQuestionnaire.expiry);
      
      this.addSignatureField('Nurse', data.vaccineQuestionnaire.nurseSignature, null);
      this.addSignatureField('Patient', data.vaccineQuestionnaire.patientSignature, null);
    }
    
    if (data.vaccineQuestionnaire.followUpInfluenza || data.vaccineQuestionnaire.followUpPneumonia) {
      this.addSection('Follow-up');
      this.addField('Follow-up date', data.vaccineQuestionnaire.followUpDate);
      this.addField('Vaccine reaction', data.vaccineQuestionnaire.vaccineReaction, true);
      if (data.vaccineQuestionnaire.comment) {
        this.addField('Comment', data.vaccineQuestionnaire.comment);
      }
    }
  }

  generateMedicareSecondaryPayer(data: ESocFormData) {
    this.addNewPage();
    this.addFormHeader('Medicare Secondary Payer Screening Form');
    
    this.addField('Medicare Number', data.medicareSecondaryPayerScreening.medicareNumber);
    this.addField('Insurance Company', data.medicareSecondaryPayerScreening.insuranceCompany);
    this.addField('Insured Name', data.medicareSecondaryPayerScreening.insuredName);
    this.addField('Policy Number', data.medicareSecondaryPayerScreening.policyNumber);
    
    this.addSection('Screening Questions');
    this.addField('Workers Compensation', data.medicareSecondaryPayerScreening.workersCompensation, true);
    this.addField('Actively Employed', data.medicareSecondaryPayerScreening.activelyEmployed, true);
    this.addField('Black Lung Program', data.medicareSecondaryPayerScreening.blackLungProgram, true);
    this.addField('Auto Accident', data.medicareSecondaryPayerScreening.autoAccident, true);
    this.addField('End Stage Renal Disease', data.medicareSecondaryPayerScreening.endStageRenalDisease, true);
    this.addField('Group Health Plan', data.medicareSecondaryPayerScreening.groupHealthPlan, true);
    this.addField('Retired', data.medicareSecondaryPayerScreening.retired, true);
    
    if (data.medicareSecondaryPayerScreening.employer) {
      this.addField('Employer', data.medicareSecondaryPayerScreening.employer);
    }
    
    this.addSignatureField('Patient', data.medicareSecondaryPayerScreening.patientSignature, data.medicareSecondaryPayerScreening.patientSignatureDate);
  }

  generatePatientAdvanceDirectives(data: ESocFormData) {
    this.addNewPage();
    this.addFormHeader('Patient Advance Directives Information');
    
    this.addSection('Advance Directive Status');
    this.addField('Has advance directive', data.patientAdvanceDirectives.hasAdvanceDirective, true);
    this.addField('Request more information', data.patientAdvanceDirectives.requestMoreInformation, true);
    this.addField('Wish to execute directives', data.patientAdvanceDirectives.wishToExecuteDirectives, true);
    
    this.addSection('Living Will');
    this.addField('Has Living Will', data.patientAdvanceDirectives.hasLivingWill, true);
    this.addField('Living Will Copy Obtained', data.patientAdvanceDirectives.livingWillCopyObtained, true);
    if (data.patientAdvanceDirectives.livingWillWishes) {
      this.addField('Living Will Wishes', data.patientAdvanceDirectives.livingWillWishes);
    }
    
    this.addSection('Power of Attorney');
    this.addField('Has Durable Power of Attorney', data.patientAdvanceDirectives.hasDurablePowerOfAttorney, true);
    if (data.patientAdvanceDirectives.powerOfAttorneyName) {
      this.addField('Power of Attorney Name', data.patientAdvanceDirectives.powerOfAttorneyName);
      this.addField('Power of Attorney Phone', data.patientAdvanceDirectives.powerOfAttorneyPhone);
    }
    
    this.addSignatureField('Patient', data.patientAdvanceDirectives.patientSignature, data.patientAdvanceDirectives.patientSignatureDate);
    this.addSignatureField('Witness', data.patientAdvanceDirectives.witnessSignature, data.patientAdvanceDirectives.witnessSignatureDate);
  }

  generateNoticeOfMedicareNonCoverage(data: ESocFormData) {
    this.addNewPage();
    this.addFormHeader('Notice of Medicare Non-Coverage');
    
    this.addField('Patient Name', data.noticeOfMedicareNonCoverage.patientName);
    this.addField('Patient Number', data.noticeOfMedicareNonCoverage.patientNumber);
    this.addField('Effective Date', data.noticeOfMedicareNonCoverage.effectiveDate);
    this.addField('Plan Contact Info', data.noticeOfMedicareNonCoverage.planContactInfo);
    
    if (data.noticeOfMedicareNonCoverage.additionalInfo) {
      this.addSection('Additional Information');
      const info = data.noticeOfMedicareNonCoverage.additionalInfo;
      const lines = this.pdf.splitTextToSize(info, 170);
      this.pdf.text(lines, this.margin, this.currentY);
      this.currentY += lines.length * 6 + 10;
    }
    
    this.addSignatureField('Patient/Representative', data.noticeOfMedicareNonCoverage.patientOrRepSignature, data.noticeOfMedicareNonCoverage.signatureDate);
  }

  downloadPDF(data: ESocFormData): Uint8Array {
    // Generate all sections
    this.generatePatientServiceAgreement(data);
    this.generatePatientRightsAcknowledgement(data);
    this.generateEmergencyPreparedness(data);
    this.generateMedicationProfile(data);
    this.generateVaccineQuestionnaire(data);
    this.generatePressureUlcerRisk(data);
    this.generateBeneficiaryTransfer(data);
    this.generateHMONotice(data);
    this.generateMedicareSecondaryPayer(data);
    this.generatePatientAdvanceDirectives(data);
    this.generateNoticeOfMedicareNonCoverage(data);
    
    return this.pdf.output('arraybuffer') as Uint8Array;
  }
}