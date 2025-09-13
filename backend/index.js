// index.js (modified to handle base64 signatures instead of file paths)
import { PDFDocument, rgb } from "pdf-lib";
import * as fontkit from "fontkit";
import fs from "fs";

// Helper function to check if a value should be filled
const shouldFillField = (value) => {
  return (
    value !== null && value !== undefined && value !== "" && value !== false
  );
};

// Helper function to safely get field value for text fields
const getTextFieldValue = (value) => {
  if (value === null || value === undefined || value === "") {
    return null;
  }
  return value;
};

const tableConfig = {
  startX: {
    startDate: 40,
    cN: 116,
    medication: 141,
    doseRoute: 272,
    frequency: 345,
    purpose: 423,
    cdcDate: 519,
  },
  startY: 213,
  rowHeight: 15,
};

// Static medication rows removed - now handled dynamically from frontend
const medicationRows = [];

const checkboxCoordinates = {
  consentForCare: { page: 0, x: 38, y: 198 },
  releaseOfInfo: { page: 0, x: 38, y: 282 },
  financialAgreement: { page: 0, x: 38, y: 410 },
  patientRightAndResponsibilities: { page: 0, x: 38, y: 591 },
  advanceDirectives: { page: 0, x: 38, y: 661 },
  advanceDirectives1: { page: 0, x: 73, y: 704 },
  advanceDirectives2: { page: 0, x: 73, y: 720 },
  advanceDirectives3: { page: 0, x: 73, y: 735 },
  photographicRelease: { page: 1, x: 38, y: 97 },
  billingAlert: { page: 1, x: 38, y: 154 },
  frequncyVisitVerification: { page: 1, x: 38, y: 212 },
  provisionTherapy: { page: 1, x: 38, y: 269 },
  translaterAvalability: { page: 1, x: 38, y: 383 },
  homeSafety: { page: 1, x: 38, y: 441 },
  hippaNotice: { page: 1, x: 38, y: 484 },

  // relevant info page 8
  dailyServicesNo: { page: 7, x: 230, y: 246 },
  dailyServicesYes: { page: 7, x: 286, y: 246 },
  lifeSustainingNo: { page: 7, x: 160, y: 289 },
  lifeSustainingYes: { page: 7, x: 209, y: 289 },
  dailyServicesYes: { page: 7, x: 286, y: 246 },

  otherTherapyNo: { page: 7, x: 132, y: 317 },
  otherTherapyYes: { page: 7, x: 180, y: 317 },
  patientIndependentNo: { page: 7, x: 195, y: 347 },
  patientIndependentYes: { page: 7, x: 246, y: 347 },
  ventilatorDependentNo: { page: 7, x: 149, y: 361 },
  ventilatorDependentYes: { page: 7, x: 204, y: 361 },
  dialysisNo: { page: 7, x: 90, y: 375 },
  dialysisYes: { page: 7, x: 141, y: 375 },
  tubeFeedingNo: { page: 7, x: 117, y: 404 },
  tubeFeedingYes: { page: 7, x: 166, y: 404 },
  patientIndependentMedicationNo: { page: 7, x: 357, y: 433 },
  patientIndependentMedicationYes: { page: 7, x: 410, y: 433 },

  // Functional Disabilities

  walkerOrCane: { page: 7, x: 235, y: 448 },
  wheelChair: { page: 7, x: 332, y: 448 },
  bedBound: { page: 7, x: 426, y: 448 },
  hearingImparment: { page: 7, x: 42, y: 462 },
  visualImparment: { page: 7, x: 166, y: 462 },
  mentalOrConginitiveImparment: { page: 7, x: 282, y: 462 },

  // emergency section
  patientEvacuateToRelative: { page: 7, x: 230, y: 522 },
  patientEvacuateToFriend: { page: 7, x: 270, y: 522 },

  patientWithSpecialNeedShelterNo: { page: 7, x: 261, y: 581 },
  patientWithSpecialNeedShelterYes: { page: 7, x: 312, y: 581 },

  // Physical condition checkboxes
  physicalConditionValue1: { page: 10, x: 359, y: 244 },
  physicalConditionValue2: { page: 10, x: 359, y: 258 },
  physicalConditionValue3: { page: 10, x: 359, y: 275 },
  physicalConditionValue4: { page: 10, x: 359, y: 290 },

  // Mental condition checkboxes
  mentalConditionValue1: { page: 10, x: 359, y: 313 },
  mentalConditionValue2: { page: 10, x: 359, y: 326 },
  mentalConditionValue3: { page: 10, x: 359, y: 342 },
  mentalConditionValue4: { page: 10, x: 359, y: 356 },

  // Activity checkboxes
  acitivityValue1: { page: 10, x: 359, y: 376 },
  acitivityValue2: { page: 10, x: 359, y: 391 },
  acitivityValue3: { page: 10, x: 359, y: 407 },
  acitivityValue4: { page: 10, x: 359, y: 423 },

  // Mobility checkboxes
  mobilityValue1: { page: 10, x: 359, y: 444 },
  mobilityValue2: { page: 10, x: 359, y: 461 },
  mobilityValue3: { page: 10, x: 359, y: 473 },
  mobilityValue4: { page: 10, x: 359, y: 491 },

  // Incontinence checkboxes
  incontinenceValue1: { page: 10, x: 359, y: 509 },
  incontinenceValue2: { page: 10, x: 359, y: 525 },
  incontinenceValue3: { page: 10, x: 359, y: 542 },
  incontinenceValue4: { page: 10, x: 359, y: 555 },

  // Vaccine checkboxes
  fluVaccineYes: { page: 9, x: 38, y: 168 },
  fluVaccineNo: { page: 9, x: 275, y: 168 },

  // flu
  fluAgeGreater65: { page: 9, x: 49, y: 179 },
  fluAgeBetween50To64: { page: 9, x: 49, y: 190 },
  fluPersonal: { page: 9, x: 49, y: 202 },
  fluOther: { page: 9, x: 49, y: 212 },
  fluVaccineByAgencyNurse: { page: 9, x: 38, y: 238 },
  fluReferredToPhysician: { page: 9, x: 38, y: 253 },
  fluReferredToHealthDepartment: { page: 9, x: 38, y: 267 },
  fluVaccinationArrangedAtHome: { page: 9, x: 38, y: 281 },

  // for no

  fluRecentlyGot: { page: 9, x: 297, y: 179 },
  fluAllergicToEggs: { page: 9, x: 297, y: 190 },
  fluReactionToFluShot: { page: 9, x: 297, y: 202 },
  fluPersonalNo: { page: 9, x: 297, y: 212 },

  pneumoniaVaccineYes: { page: 9, x: 38, y: 340 },
  pneumoniaVaccineNo: { page: 9, x: 275, y: 340 },

  // for yes
  pneumoniaAgeGreater65: { page: 9, x: 49, y: 351 },
  pneumoniaChronicHealthProblem: { page: 9, x: 49, y: 362 },
  pneumoniaPersonal: { page: 9, x: 49, y: 385 },
  pneumoniaVaccineByAgencyNurse: { page: 9, x: 38, y: 410 },
  pneumoniaReferredToPhysician: { page: 9, x: 38, y: 425 },
  pneumoniaReferredToHealthDepartment: { page: 9, x: 38, y: 439 },
  pneumoniaVaccinationArrangedAtHome: { page: 9, x: 38, y: 453 },

  // for no
  pneumoniaRecentlyGot: { page: 9, x: 396, y: 351 },
  pneumoniaPersonalNo: { page: 9, x: 396, y: 374 },

  // vaccine administration
  fluVaccine: { page: 9, x: 38, y: 503 },
  pneumoniaVaccine: { page: 9, x: 116, y: 503 },

  // outcome follow up

  fluOutcome: { page: 9, x: 38, y: 592 },
  pneumoniaOutcome: { page: 9, x: 115, y: 592 },
  vaccineRelatedReactionYes: { page: 9, x: 176, y: 605 },
  vaccineRelatedReactionNo: { page: 9, x: 220, y: 605 },

  // advance directives

  advanceDirectivesInfo: { page: 14, x: 74, y: 265 },
  advanceDirectivesExecute: { page: 14, x: 74, y: 289 },
  advanceDirectivesLivingWill: { page: 14, x: 74, y: 314 },
  advanceDirectivesLivingWillYes: { page: 14, x: 341, y: 315 },
  advanceDirectivesLivingWillNo: { page: 14, x: 385, y: 315 },
  advanceDirectivesCopyObtainedYes: { page: 14, x: 341, y: 330 },
  advanceDirectivesCopyObtainedNo: { page: 14, x: 385, y: 330 },

  durablePowerAttorney: { page: 14, x: 74, y: 431 },
  durablePowerAttorneyYes: { page: 14, x: 341, y: 431 },
  durablePowerAttorneyNo: { page: 14, x: 382, y: 431 },
  haveAdvanceDirectives: { page: 14, x: 74, y: 469 },
  haveAdvanceDirectivesYes: { page: 14, x: 341, y: 470 },
  haveAdvanceDirectivesNo: { page: 14, x: 385, y: 470 },
  haveAdvanceDirectivesCopyYes: { page: 14, x: 341, y: 484 },
  haveAdvanceDirectivesCopyNo: { page: 14, x: 385, y: 484 },
};

const fieldCoordinates = {
  page1: {
    patientName: { x: 121, y: 168, fontSize: 12 },
    socialSecurity: { x: 382, y: 168 },
    financialAgreementInput: { x: 47, y: 534, fontSize: 15 },
    rnDate: { x: 350, y: 180 },
  },

  page2: {
    relationshipIfNotPatient: { x: 385, y: 550 },
    reasonUnableToSign: { x: 37, y: 594 },
    dateIfNotPatient: { x: 385, y: 594 },
    rnDate: { x: 385, y: 636 },
    rnSignature: { x: 38, y: 610, isSignature: true },
    patientSignature: { x: 38, y: 528, isSignature: true },
  },

  page5: {
    clinicalManager: { x: 240, y: 577 },
    clinicalManagerContactInfo: { x: 172, y: 593 },
  },

  page7: {
    patientSignature: { x: 36, y: 525, isSignature: true },
    patientSignatureDate: { x: 81, y: 566, fontSize: 11 },
    representativeSignature: { x: 352, y: 525, isSignature: true },
    representativeSignatureDate: { x: 410, y: 566, fontSize: 11 },
    agencyRepresentativeSignature: { x: 36, y: 609, isSignature: true },
    agencyRepresentativeSignatureDate: { x: 81, y: 640, fontSize: 11 },
  },

  page8: {
    patientName: { x: 92, y: 141, fontSize: 11 },
    socDate: { x: 420, y: 141 },
    phoneNumber: { x: 101, y: 155, fontSize: 11 },
    physician: { x: 369, y: 155, fontSize: 11 },
    address: { x: 65, y: 169, fontSize: 11 },
    city: { x: 48, y: 184, fontSize: 11 },
    state: { x: 357, y: 184, fontSize: 11 },
    zip: { x: 479, y: 184, fontSize: 11 },

    // Relevant healthcare info
    dailyServicesYesDescription: { x: 100, y: 259, fontSize: 11 },
    lifeSustainingDesc: { x: 100, y: 302, fontSize: 11 },
    otherTherapyDesc: { x: 100, y: 331, fontSize: 11 },
    dialysisDesc: { x: 100, y: 388, fontSize: 11 },
    tubeFeedingDesc: { x: 100, y: 418, fontSize: 11 },

    primaryDx: { x: 82, y: 231, fontSize: 11 },
    secondaryDx: { x: 386, y: 231, fontSize: 11 },
    flowRate: { x: 164, y: 274 },
    hoursOfUse: { x: 290, y: 274 },
    deliveryDevice: { x: 398, y: 274 },

    // emergency plan
    emergencyContact: { x: 147, y: 508, fontSize: 11 },
    emergencyPhone: { x: 420, y: 508, fontSize: 11 },
    evacuationRelativeNameAndPhone: { x: 137, y: 538, fontSize: 11 },
    hotelNameAndPhone: { x: 164, y: 552, fontSize: 11 },
    shelterLocation: { x: 111, y: 567, fontSize: 11 },
    otherDesctiption: { x: 110, y: 596, fontSize: 11 },
    priorityLevel: { x: 121, y: 640, fontSize: 11 },
    clinician: { x: 27, y: 655, isSignature: true },
    clinicianDate: { x: 27, y: 699, fontSize: 11 },
  },

  page9: {
    patientName: { x: 110, y: 135, fontSize: 11 },
    physicianName: { x: 93, y: 148, fontSize: 11 },
    allergy: { x: 78, y: 161, fontSize: 11 },
    DX: { x: 61, y: 175, fontSize: 11 },
    pharmacyName: { x: 389, y: 135, fontSize: 11 },
    address: { x: 380, y: 148, fontSize: 11 },
    phoneNumber: { x: 375, y: 161, fontSize: 11 },
    HT: { x: 361, y: 175, fontSize: 11 },
    WT: { x: 467, y: 175, fontSize: 11 },
  },

  page10: {
    patientName: { x: 105, y: 124, fontSize: 11 },
    date: { x: 408, y: 124, fontSize: 11 },
    fluOtherDesc: { x: 101, y: 212, fontSize: 9 },
    fluVaccineDate: { x: 455, y: 178, fontSize: 9 },
    pneumoniaVaccineDate: { x: 474, y: 363, fontSize: 9 },
    // vaccine administration
    vaccineAdminstrationDate: { x: 413, y: 503, fontSize: 10 },
    vaccineSite: { x: 61, y: 517, fontSize: 10 },
    vaccineManufacturer: { x: 277, y: 517, fontSize: 10 },
    vaccineExpiryDate: { x: 476, y: 517, fontSize: 10 },
    outcomeDate: { x: 412, y: 592, fontSize: 10 },
    outcomeComment: { x: 93, y: 633, fontSize: 10 },
    patientSignatureFollowUp: { x: 342, y: 527, isSignature: true },
    nurseSignatureFollowUp: { x: 65, y: 527, isSignature: true },
    nurseSignature: { x: 62, y: 659, isSignature: true },
    patientSignature: { x: 342, y: 665, isSignature: true },
  },

  page11: {
    patientName: { x: 107, y: 31, fontSize: 11 },
    date: { x: 59, y: 53, fontSize: 11 },
    nurseSignature: { x: 174, y: 700, isSignature: true },
    nurseSignatureDate: { x: 470, y: 726, fontSize: 11 },
  },

  page12: {
    homeHealthAgencyName: { x: 332, y: 263, fontSize: 12 },
    homeHealthAgencyLocation: { x: 74, y: 284, fontSize: 12 },
    patientSignature: { x: 107, y: 519, isSignature: true },
    witnessSignature: { x: 107, y: 600, isSignature: true },
    patientSignatureDate: { x: 427, y: 540, fontSize: 11 },
    witnessSignatureDate: { x: 427, y: 630, fontSize: 11 },
  },

  page13: {
    patientSignature: { x: 188, y: 590, isSignature: true },
    witnessSignature: { x: 130, y: 610, isSignature: true },
    patientSignatureDate: { x: 442, y: 612, fontSize: 11 },
    witnessSignatureDate: { x: 442, y: 639, fontSize: 11 },
    patientName: { x: 165, y: 665, fontSize: 11 },
  },

  page14: {
    insuranceCompanyName: { x: 284, y: 576, fontSize: 11 },
    insuredName: { x: 197, y: 594, fontSize: 11 },
    policyNumber: { x: 198, y: 612, fontSize: 11 },
    employerName: { x: 172, y: 630, fontSize: 11 },
    patientSignature: { x: 195, y: 649, isSignature: true },
    patientSignatureDate: { x: 444, y: 676 },
    medicareNumber: { x: 199, y: 704, fontSize: 13 },
    patientRetirementDate: { x: 334, y: 558, fontSize: 9 },
    patientSpouseRetirementDate: { x: 430, y: 558, fontSize: 9 },

    option1Yes: { x: 500, y: 240, circle: true },
    option1No: { x: 530, y: 240, circle: true },
    option2Yes: { x: 500, y: 290, circle: true },
    option2No: { x: 530, y: 290, circle: true },
    option3Yes: { x: 500, y: 328, circle: true },
    option3No: { x: 530, y: 328, circle: true },
    option4Yes: { x: 500, y: 362, circle: true },
    option4No: { x: 530, y: 362, circle: true },
    option5Yes: { x: 500, y: 381, circle: true },
    option5No: { x: 530, y: 381, circle: true },
    option6Yes: { x: 500, y: 433, circle: true },
    option6No: { x: 530, y: 433, circle: true },
    option7Yes: { x: 500, y: 464, circle: true },
    option7No: { x: 530, y: 464, circle: true },
    option8Yes: { x: 500, y: 501, circle: true },
    option8No: { x: 530, y: 501, circle: true },
    option9Yes: { x: 500, y: 535, circle: true },
    option9No: { x: 530, y: 535, circle: true },
  },

  page15: {
    patientWish: { x: 231, y: 342, fontSize: 11 },
    durablePowerAttorneyName: { x: 150, y: 447 },
    durablePowerAttorneyTelphone: { x: 402, y: 447 },
    durablePowerAttorneyPatientWish: { x: 231, y: 501, fontSize: 11 },
    patientSignature: { x: 74, y: 600, isSignature: true },
    witnessSignature: { x: 314, y: 600, isSignature: true },
    patientSignatureDate: { x: 74, y: 662 },
    witnessSignatureDate: { x: 315, y: 662 },
  },

  page16: {
    patientName: { x: 148, y: 128, fontSize: 11 },
    patientNumber: { x: 395, y: 128 },
    serviceEndDate: { x: 268, y: 188 },
  },

  page17: {
    planContactInfo: { x: 234, y: 183 },
    additionalInfo: { x: 74, y: 308 },
    patientSignature: { x: 109, y: 534, isSignature: true },
    patientSignatureDate: { x: 417, y: 562 },
  },
};

async function fillCompletePDF(inputPath, outputPath, patientData) {
  const pdfBytes = fs.readFileSync(inputPath);
  const pdfDoc = await PDFDocument.load(pdfBytes);

  // Register fontkit for custom fonts
  pdfDoc.registerFontkit(fontkit);

  // Embed custom font for checkmarks
  const fontBytes = fs.readFileSync("DejaVuSans.ttf");
  const customFont = await pdfDoc.embedFont(fontBytes);

  const pages = pdfDoc.getPages();

  console.log(`📄 Processing PDF with ${pages.length} pages`);

  // Step 1: Fill checkboxes using coordinate-based approach
  console.log("☑️ Filling checkboxes using coordinate-based approach");
  fillCheckboxesWithCoordinates(pages, patientData, customFont);

  // Step 2: Fill ALL text fields using coordinate-based approach
  console.log("📍 Filling text fields using coordinate-based approach");
  await fillAllCoordinatePages(pages, patientData, pdfDoc);

  // Step 3: Fill medication table on page 9 (index 8)
  if (pages[8]) {
    fillMedicationTable(pages[8], medicationRows, tableConfig, customFont);
  }

  const filledPdfBytes = await pdfDoc.save();
  fs.writeFileSync(outputPath, filledPdfBytes);
  console.log(`✅ Complete PDF filled successfully: ${outputPath}`);
}

function fillCheckboxesWithCoordinates(pages, data, customFont) {
  console.log("☑️ Filling checkboxes using coordinates");

  Object.entries(checkboxCoordinates).forEach(([field, coord]) => {
    // Only fill checkbox if the field exists in data and is truthy
    if (data.hasOwnProperty(field) && data[field] === true) {
      const page = pages[coord.page];
      if (page) {
        const { height } = page.getSize();
        page.drawText("✔", {
          x: coord.x,
          y: height - coord.y,
          size: 14,
          font: customFont,
          color: rgb(0, 0, 0),
        });
        console.log(
          `  ✓ Checked: ${field} at page ${coord.page + 1} (${coord.x}, ${
            coord.y
          })`
        );
      }
    } else if (data.hasOwnProperty(field)) {
      console.log(`  ⭕ Skipped checkbox: ${field} (value: ${data[field]})`);
    }
  });
}

async function fillAllCoordinatePages(pages, patientData, pdfDoc) {
  console.log("📝 Filling text fields using coordinates");

  // Fill Page 1 (index 0) - Text fields only
  if (pages[0] && fieldCoordinates.page1) {
    const page1Data = {};

    if (patientData.patientName)
      page1Data.patientName = patientData.patientName;
    if (patientData.socialSecurity)
      page1Data.socialSecurity = patientData.socialSecurity;
    if (patientData.financialAgreement) page1Data.financialAgreementInput = "X";

    fillPage(pages[0], fieldCoordinates.page1, page1Data);
  }

  // Fill Page 2 (index 1)
  if (pages[1] && fieldCoordinates.page2) {
    const page2Data = {};

    // Only add fields if they exist in patientData
    if (patientData.relationshipIfNotPatient)
      page2Data.relationshipIfNotPatient = patientData.relationshipIfNotPatient;
    if (patientData.reasonUnableToSign)
      page2Data.reasonUnableToSign = patientData.reasonUnableToSign;
    if (patientData.dateIfNotPatient)
      page2Data.dateIfNotPatient = patientData.dateIfNotPatient;
    if (patientData.rnDate) page2Data.rnDate = patientData.rnDate;

    fillPage(pages[1], fieldCoordinates.page2, page2Data);

    // Draw RN signature if exists
    if (
      patientData.rnSignature &&
      patientData.rnSignature.startsWith("data:image/")
    ) {
      await drawSignature(
        pdfDoc,
        pages[1],
        fieldCoordinates.page2.rnSignature,
        patientData.rnSignature
      );
    }

    // Draw patient signature if exists
    if (
      patientData.patientSignature &&
      patientData.patientSignature.startsWith("data:image/")
    ) {
      await drawSignature(
        pdfDoc,
        pages[1],
        fieldCoordinates.page2.patientSignature,
        patientData.patientSignature
      );
    }
  }

  if (pages[4] && fieldCoordinates.page5) {
    const page5Data = {};

    // Only add fields if they exist in patientData
    if (patientData.clinicalManager)
      page5Data.clinicalManager = patientData.clinicalManager;
    if (patientData.clinicalManagerContactInfo)
      page5Data.clinicalManagerContactInfo =
        patientData.clinicalManagerContactInfo;

    fillPage(pages[4], fieldCoordinates.page5, page5Data);
  }

  // Fill Page 7 (index 6) - Signatures and dates
  if (pages[6] && fieldCoordinates.page7) {
    const page7Data = {};

    // Only add date fields if they exist in patientData
    if (patientData.patientSignatureDate)
      page7Data.patientSignatureDate = patientData.patientSignatureDate;
    if (patientData.representativeSignatureDate)
      page7Data.representativeSignatureDate =
        patientData.representativeSignatureDate;
    if (patientData.agencyRepresentativeDate)
      page7Data.agencyRepresentativeSignatureDate =
        patientData.agencyRepresentativeDate;

    fillPage(pages[6], fieldCoordinates.page7, page7Data);

    // Draw patient signature if exists
    if (
      patientData.patientRightsPatientSignature &&
      patientData.patientRightsPatientSignature.startsWith("data:image/")
    ) {
      await drawSignature(
        pdfDoc,
        pages[6],
        fieldCoordinates.page7.patientSignature,
        patientData.patientRightsPatientSignature
      );
    }

    // Draw representative signature if exists
    if (
      patientData.representativeSignature &&
      patientData.representativeSignature.startsWith("data:image/")
    ) {
      await drawSignature(
        pdfDoc,
        pages[6],
        fieldCoordinates.page7.representativeSignature,
        patientData.representativeSignature
      );
    }

    // Draw agency representative signature if exists
    if (
      patientData.agencyRepresentativeSignature &&
      patientData.agencyRepresentativeSignature.startsWith("data:image/")
    ) {
      await drawSignature(
        pdfDoc,
        pages[6],
        fieldCoordinates.page7.agencyRepresentativeSignature,
        patientData.agencyRepresentativeSignature
      );
    }
  }

  if (pages[7] && fieldCoordinates.page8) {
    const page8Data = {};

    // Basic patient information - only add if exists
    if (patientData.patientName)
      page8Data.patientName = patientData.patientName;
    if (patientData.socDate) page8Data.socDate = patientData.socDate;
    if (patientData.phoneNumber)
      page8Data.phoneNumber = patientData.phoneNumber;
    if (patientData.physician) page8Data.physician = patientData.physician;
    if (patientData.address) page8Data.address = patientData.address;
    if (patientData.city) page8Data.city = patientData.city;
    if (patientData.state) page8Data.state = patientData.state;
    if (patientData.zip) page8Data.zip = patientData.zip;
    if (patientData.primaryDx) page8Data.primaryDx = patientData.primaryDx;
    if (patientData.secondaryDx)
      page8Data.secondaryDx = patientData.secondaryDx;

    // Service descriptions - only add if exists
    if (patientData.dailyServicesYesDescription)
      page8Data.dailyServicesYesDescription =
        patientData.dailyServicesYesDescription;
    if (patientData.flowRate) page8Data.flowRate = patientData.flowRate;
    if (patientData.hoursOfUse) page8Data.hoursOfUse = patientData.hoursOfUse;
    if (patientData.deliveryDevice)
      page8Data.deliveryDevice = patientData.deliveryDevice;
    if (patientData.lifeSustainingDesc)
      page8Data.lifeSustainingDesc = patientData.lifeSustainingDesc;
    if (patientData.otherTherapyDesc)
      page8Data.otherTherapyDesc = patientData.otherTherapyDesc;
    if (patientData.dialysisDesc)
      page8Data.dialysisDesc = patientData.dialysisDesc;
    if (patientData.tubeFeedingDesc)
      page8Data.tubeFeedingDesc = patientData.tubeFeedingDesc;

    // Emergency plan - only add if exists
    if (patientData.emergencyContact)
      page8Data.emergencyContact = patientData.emergencyContact;
    if (patientData.emergencyPhone)
      page8Data.emergencyPhone = patientData.emergencyPhone;
    if (patientData.evacuationRelativeNameAndPhone)
      page8Data.evacuationRelativeNameAndPhone =
        patientData.evacuationRelativeNameAndPhone;
    if (patientData.hotelNameAndPhone)
      page8Data.hotelNameAndPhone = patientData.hotelNameAndPhone;
    if (patientData.shelterLocation)
      page8Data.shelterLocation = patientData.shelterLocation;
    if (patientData.otherDescription)
      page8Data.otherDesctiption = patientData.otherDescription;
    if (patientData.priorityLevel)
      page8Data.priorityLevel = patientData.priorityLevel;

    // Clinician date - only add if exists
    if (patientData.clinicianDate)
      page8Data.clinicianDate = patientData.clinicianDate;

    fillPage(pages[7], fieldCoordinates.page8, page8Data);

    // Draw clinician signature if exists
    if (
      patientData.clinicianSignature &&
      patientData.clinicianSignature.startsWith("data:image/")
    ) {
      await drawSignature(
        pdfDoc,
        pages[7],
        fieldCoordinates.page8.clinician,
        patientData.clinicianSignature
      );
    }
  }

  // Fill Page 9 (index 8) - Medication profile
  if (pages[8] && fieldCoordinates.page9) {
    const page9Data = {};

    // Only add fields if they exist in patientData
    if (patientData.patientName)
      page9Data.patientName = patientData.patientName;
    if (patientData.physicianName)
      page9Data.physicianName = patientData.physicianName;
    if (patientData.allergy) page9Data.allergy = patientData.allergy;
    if (patientData.DX) page9Data.DX = patientData.DX;
    if (patientData.pharmacyName)
      page9Data.pharmacyName = patientData.pharmacyName;
    if (patientData.pharmacyAddress)
      page9Data.address = patientData.pharmacyAddress;
    if (patientData.pharmacyPhone)
      page9Data.phoneNumber = patientData.pharmacyPhone;
    if (patientData.HT) page9Data.HT = patientData.HT;
    if (patientData.WT) page9Data.WT = patientData.WT;

    fillPage(pages[8], fieldCoordinates.page9, page9Data);
  }

  // Fill Page 10 (index 9) - Vaccine Questionnaire
  if (pages[9] && fieldCoordinates.page10) {
    const page10Data = {};

    // Only add fields if they exist in patientData
    if (patientData.patientName)
      page10Data.patientName = patientData.patientName;
    if (patientData.vaccineDate) page10Data.date = patientData.vaccineDate;
    if (patientData.fluOtherDesc)
      page10Data.fluOtherDesc = patientData.fluOtherDesc;
    if (patientData.fluVaccineDate)
      page10Data.fluVaccineDate = patientData.fluVaccineDate;
    if (patientData.pneumoniaVaccineDate)
      page10Data.pneumoniaVaccineDate = patientData.pneumoniaVaccineDate;
    if (patientData.vaccineAdminstrationDate)
      page10Data.vaccineAdminstrationDate =
        patientData.vaccineAdminstrationDate;
    if (patientData.vaccineSite)
      page10Data.vaccineSite = patientData.vaccineSite;
    if (patientData.vaccineManufacturer)
      page10Data.vaccineManufacturer = patientData.vaccineManufacturer;
    if (patientData.vaccineExpiryDate)
      page10Data.vaccineExpiryDate = patientData.vaccineExpiryDate;
    if (patientData.outcomeDate)
      page10Data.outcomeDate = patientData.outcomeDate;
    if (patientData.outcomeComment)
      page10Data.outcomeComment = patientData.outcomeComment;

    fillPage(pages[9], fieldCoordinates.page10, page10Data);

    // Draw nurse signature if exists
    if (
      patientData.nurseSignatureFollowUp &&
      patientData.nurseSignatureFollowUp.startsWith("data:image/")
    ) {
      await drawSignature(
        pdfDoc,
        pages[9],
        fieldCoordinates.page10.nurseSignatureFollowUp,
        patientData.nurseSignatureFollowUp
      );
    }
    // Draw patient signature if exists
    if (
      patientData.patientSignatureFollowUp &&
      patientData.patientSignatureFollowUp.startsWith("data:image/")
    ) {
      await drawSignature(
        pdfDoc,
        pages[9],
        fieldCoordinates.page10.patientSignatureFollowUp,
        patientData.patientSignatureFollowUp
      );
    }
    if (
      patientData.vaccineNurseSignature &&
      patientData.vaccineNurseSignature.startsWith("data:image/")
    ) {
      await drawSignature(
        pdfDoc,
        pages[9],
        fieldCoordinates.page10.nurseSignature,
        patientData.vaccineNurseSignature
      );
    }

    // Draw patient signature if exists
    if (
      patientData.vaccinePatientSignature &&
      patientData.vaccinePatientSignature.startsWith("data:image/")
    ) {
      await drawSignature(
        pdfDoc,
        pages[9],
        fieldCoordinates.page10.patientSignature,
        patientData.vaccinePatientSignature
      );
    }

    // Draw follow-up nurse signature if exists (using estimated coordinates)
    if (
      patientData.nurseSignatureFollowUp &&
      patientData.nurseSignatureFollowUp.startsWith("data:image/")
    ) {
      await drawSignature(
        pdfDoc,
        pages[9],
        fieldCoordinates.page10.nurseFollowUpSignature,
        patientData.nurseSignatureFollowUp
      );
    }

    // Draw follow-up patient signature if exists (using estimated coordinates)
    if (
      patientData.patientSignatureFollowUp &&
      patientData.patientSignatureFollowUp.startsWith("data:image/")
    ) {
      await drawSignature(
        pdfDoc,
        pages[9],
        fieldCoordinates.page10.patientFollowUpSignature,
        patientData.patientSignatureFollowUp
      );
    }
  }

  if (pages[10] && fieldCoordinates.page11) {
    const page11Data = {};

    if (patientData.patientName)
      page11Data.patientName = patientData.patientName;
    if (patientData.page11Date) page11Data.date = patientData.page11Date;
    if (patientData.nurseSignatureDate)
      page11Data.nurseSignatureDate = patientData.nurseSignatureDate;

    fillPage(pages[10], fieldCoordinates.page11, page11Data);

    // Draw nurse signature if exists
    if (
      patientData.pressureUlcerNurseSignature &&
      patientData.pressureUlcerNurseSignature.startsWith("data:image/")
    ) {
      await drawSignature(
        pdfDoc,
        pages[10],
        fieldCoordinates.page11.nurseSignature,
        patientData.pressureUlcerNurseSignature
      );
    }
  }

  if (pages[11] && fieldCoordinates.page12) {
    const page12Data = {};

    // Only add fields if they exist in patientData
    if (patientData.homeHealthAgencyName)
      page12Data.homeHealthAgencyName = patientData.homeHealthAgencyName;
    if (patientData.homeHealthAgencyLocation)
      page12Data.homeHealthAgencyLocation =
        patientData.homeHealthAgencyLocation;
    if (patientData.patientSignatureDate)
      page12Data.patientSignatureDate = patientData.patientSignatureDate;
    if (patientData.witnessSignatureDate)
      page12Data.witnessSignatureDate = patientData.witnessSignatureDate;

    fillPage(pages[11], fieldCoordinates.page12, page12Data);

    // Draw patient signature if exists
    if (
      patientData.beneficiaryPatientSignature &&
      patientData.beneficiaryPatientSignature.startsWith("data:image/")
    ) {
      await drawSignature(
        pdfDoc,
        pages[11],
        fieldCoordinates.page12.patientSignature,
        patientData.beneficiaryPatientSignature
      );
    }

    // Draw witness signature if exists
    if (
      patientData.witnessSignature &&
      patientData.witnessSignature.startsWith("data:image/")
    ) {
      await drawSignature(
        pdfDoc,
        pages[11],
        fieldCoordinates.page12.witnessSignature,
        patientData.witnessSignature
      );
    }
  }

  if (pages[12] && fieldCoordinates.page13) {
    const page13Data = {};

    // Only add fields if they exist in patientData
    if (patientData.patientSignatureDate)
      page13Data.patientSignatureDate = patientData.patientSignatureDate;
    if (patientData.witnessSignatureDate)
      page13Data.witnessSignatureDate = patientData.witnessSignatureDate;
    if (patientData.patientName)
      page13Data.patientName = patientData.patientName;

    fillPage(pages[12], fieldCoordinates.page13, page13Data);

    // Draw patient signature if exists
    if (
      patientData.hmoPatientSignature &&
      patientData.hmoPatientSignature.startsWith("data:image/")
    ) {
      await drawSignature(
        pdfDoc,
        pages[12],
        fieldCoordinates.page13.patientSignature,
        patientData.hmoPatientSignature
      );
    }

    // Draw witness signature if exists
    if (
      patientData.hmoWitnessSignature &&
      patientData.hmoWitnessSignature.startsWith("data:image/")
    ) {
      await drawSignature(
        pdfDoc,
        pages[12],
        fieldCoordinates.page13.witnessSignature,
        patientData.hmoWitnessSignature
      );
    }
  }

  if (pages[13] && fieldCoordinates.page14) {
    const page14Data = {};

    // Only add fields if they exist in patientData
    if (patientData.insuranceCompanyName)
      page14Data.insuranceCompanyName = patientData.insuranceCompanyName;
    if (patientData.patientName)
      page14Data.insuredName = patientData.patientName;
    if (patientData.policyNumber)
      page14Data.policyNumber = patientData.policyNumber;
    if (patientData.employerName)
      page14Data.employerName = patientData.employerName;
    if (patientData.patientSignatureDate)
      page14Data.patientSignatureDate = patientData.patientSignatureDate;
    if (patientData.medicareNumber)
      page14Data.medicareNumber = patientData.medicareNumber;
    if (patientData.patientRetirementDate)
      page14Data.patientRetirementDate = patientData.patientRetirementDate;
    if (patientData.patientSpouseRetirementDate)
      page14Data.patientSpouseRetirementDate =
        patientData.patientSpouseRetirementDate;

    // Options - only add if they are true (radio button style)
    if (patientData.option1Yes) page14Data.option1Yes = "●";
    if (patientData.option1No) page14Data.option1No = "●";
    if (patientData.option2Yes) page14Data.option2Yes = "●";
    if (patientData.option2No) page14Data.option2No = "●";
    if (patientData.option3Yes) page14Data.option3Yes = "●";
    if (patientData.option3No) page14Data.option3No = "●";
    if (patientData.option4Yes) page14Data.option4Yes = "●";
    if (patientData.option4No) page14Data.option4No = "●";
    if (patientData.option5Yes) page14Data.option5Yes = "●";
    if (patientData.option5No) page14Data.option5No = "●";
    if (patientData.option6Yes) page14Data.option6Yes = "●";
    if (patientData.option6No) page14Data.option6No = "●";
    if (patientData.option7Yes) page14Data.option7Yes = "●";
    if (patientData.option7No) page14Data.option7No = "●";
    if (patientData.option8Yes) page14Data.option8Yes = "●";
    if (patientData.option8No) page14Data.option8No = "●";
    if (patientData.option9Yes) page14Data.option9Yes = "●";
    if (patientData.option9No) page14Data.option9No = "●";

    fillPage(pages[13], fieldCoordinates.page14, page14Data);

    // Draw patient signature if exists
    if (
      patientData.medicarePatientSignature &&
      patientData.medicarePatientSignature.startsWith("data:image/")
    ) {
      await drawSignature(
        pdfDoc,
        pages[13],
        fieldCoordinates.page14.patientSignature,
        patientData.medicarePatientSignature
      );
    }
  }

  if (pages[14] && fieldCoordinates.page15) {
    const page15Data = {};

    // Only add fields if they exist in patientData
    if (patientData.patientWish)
      page15Data.patientWish = patientData.patientWish;
    if (patientData.durablePowerAttorneyName)
      page15Data.durablePowerAttorneyName =
        patientData.durablePowerAttorneyName;
    if (patientData.durablePowerAttorneyTelphone)
      page15Data.durablePowerAttorneyTelphone =
        patientData.durablePowerAttorneyTelphone;
    if (patientData.durablePowerAttorneyPatientWish)
      page15Data.durablePowerAttorneyPatientWish =
        patientData.durablePowerAttorneyPatientWish;
    if (patientData.patientSignatureDate)
      page15Data.patientSignatureDate = patientData.patientSignatureDate;
    if (patientData.witnessSignatureDate)
      page15Data.witnessSignatureDate = patientData.witnessSignatureDate;

    fillPage(pages[14], fieldCoordinates.page15, page15Data);

    // Draw patient signature if exists
    if (
      patientData.advanceDirectivesPatientSignature &&
      patientData.advanceDirectivesPatientSignature.startsWith("data:image/")
    ) {
      await drawSignature(
        pdfDoc,
        pages[14],
        fieldCoordinates.page15.patientSignature,
        patientData.advanceDirectivesPatientSignature
      );
    }

    // Draw witness signature if exists
    if (
      patientData.advanceDirectivesWitnessSignature &&
      patientData.advanceDirectivesWitnessSignature.startsWith("data:image/")
    ) {
      await drawSignature(
        pdfDoc,
        pages[14],
        fieldCoordinates.page15.witnessSignature,
        patientData.advanceDirectivesWitnessSignature
      );
    }
  }

  if (pages[15] && fieldCoordinates.page16) {
    const page16Data = {};

    // Only add fields if they exist in patientData
    if (patientData.patientName)
      page16Data.patientName = patientData.patientName;
    if (patientData.patientNumber)
      page16Data.patientNumber = patientData.patientNumber;
    if (patientData.serviceEndDate)
      page16Data.serviceEndDate = patientData.serviceEndDate;

    fillPage(pages[15], fieldCoordinates.page16, page16Data);
  }

  if (pages[16] && fieldCoordinates.page17) {
    const page17Data = {};

    // Only add fields if they exist in patientData
    if (patientData.planContactInfo)
      page17Data.planContactInfo = patientData.planContactInfo;
    if (patientData.additionalInfo)
      page17Data.additionalInfo = patientData.additionalInfo;
    if (patientData.patientSignatureDate)
      page17Data.patientSignatureDate = patientData.patientSignatureDate;

    fillPage(pages[16], fieldCoordinates.page17, page17Data);

    // Draw patient signature if exists
    if (
      patientData.nonCoveragePatientSignature &&
      patientData.nonCoveragePatientSignature.startsWith("data:image/")
    ) {
      await drawSignature(
        pdfDoc,
        pages[16],
        fieldCoordinates.page17.patientSignature,
        patientData.nonCoveragePatientSignature
      );
    }
  }
}

function fillMedicationTable(page, rows, config, customFont) {
  const { height } = page.getSize();

  function truncateText(text, maxLength) {
    if (text && text.length > maxLength) {
      return text.substring(0, maxLength - 3) + "...";
    }
    return text || "";
  }

  function fitTextToColumn(text, maxWidth, fontSize = 9) {
    const avgCharWidth = fontSize * 0.6;
    const maxChars = Math.floor(maxWidth / avgCharWidth);
    return truncateText(text, maxChars);
  }

  rows.forEach((row, i) => {
    const y = config.startY + i * config.rowHeight;

    const columnWidths = {
      startDate: config.startX.cN - config.startX.startDate - 5,
      cN: config.startX.medication - config.startX.cN - 5,
      medication: config.startX.doseRoute - config.startX.medication - 5,
      doseRoute: config.startX.frequency - config.startX.doseRoute - 5,
      frequency: config.startX.purpose - config.startX.frequency - 5,
      purpose: config.startX.cdcDate - config.startX.purpose - 5,
      cdcDate: 80,
    };

    const fittedRow = {
      startDate: fitTextToColumn(row.startDate, columnWidths.startDate, 9),
      cN: fitTextToColumn(row.cN, columnWidths.cN, 9),
      medication: fitTextToColumn(row.medication, columnWidths.medication, 9),
      doseRoute: fitTextToColumn(row.doseRoute, columnWidths.doseRoute, 9),
      frequency: fitTextToColumn(row.frequency, columnWidths.frequency, 9),
      purpose: fitTextToColumn(row.purpose, columnWidths.purpose, 9),
      cdcDate: fitTextToColumn(row.cdcDate, columnWidths.cdcDate, 9),
    };

    const textOptions = {
      size: 9,
      color: rgb(0, 0, 0),
    };

    page.drawText(fittedRow.startDate, {
      x: config.startX.startDate,
      y: height - y,
      ...textOptions,
    });

    page.drawText(fittedRow.cN, {
      x: config.startX.cN,
      y: height - y,
      ...textOptions,
    });

    page.drawText(fittedRow.medication, {
      x: config.startX.medication,
      y: height - y,
      ...textOptions,
    });

    page.drawText(fittedRow.doseRoute, {
      x: config.startX.doseRoute,
      y: height - y,
      ...textOptions,
    });

    page.drawText(fittedRow.frequency, {
      x: config.startX.frequency,
      y: height - y,
      ...textOptions,
    });

    page.drawText(fittedRow.purpose, {
      x: config.startX.purpose,
      y: height - y,
      ...textOptions,
    });

    page.drawText(fittedRow.cdcDate, {
      x: config.startX.cdcDate,
      y: height - y,
      ...textOptions,
    });
  });
}

function fillPage(page, coordinates, data) {
  const { height } = page.getSize();
  const defaultFontSize = 12;

  for (const [field, value] of Object.entries(data)) {
    // Only process field if coordinates exist for it
    if (!coordinates[field]) continue;

    const coord = coordinates[field];

    // Skip signature fields - they are handled separately
    if (coord.isSignature) {
      console.log(`🖊️ Skipping signature field: ${field} (handled separately)`);
      continue;
    }

    // For circle fields (radio buttons), only fill if value is truthy
    if (coord.circle) {
      if (shouldFillField(value)) {
        page.drawCircle({
          x: coord.x,
          y: height - coord.y,
          size: 14,
          borderColor: rgb(0, 0, 0),
          borderWidth: 1.5,
        });
        console.log(`🔘 Filled circle field: ${field}`);
      }
    } else {
      // For text fields, only fill if value has content
      const textValue = getTextFieldValue(value);
      if (textValue !== null) {
        const fontSize = coord.fontSize || defaultFontSize;
        page.drawText(textValue.toString(), {
          x: coord.x,
          y: height - coord.y,
          size: fontSize,
          color: rgb(0, 0, 0),
        });
        console.log(`📝 Filled text field: ${field} = "${textValue}"`);
      }
    }
  }
}

async function drawSignature(
  pdfDoc,
  page,
  coord,
  signatureDataUrl,
  width = 120,
  height = 30
) {
  try {
    // Extract base64 from data URL (e.g., 'data:image/png;base64,...')
    const base64 = signatureDataUrl.split(";base64,").pop();
    const signatureBuffer = Buffer.from(base64, "base64");

    // Try to embed as PNG first (supports transparency)
    let signatureImage;
    try {
      signatureImage = await pdfDoc.embedPng(signatureBuffer);
    } catch (pngError) {
      // If PNG fails, try JPG
      try {
        signatureImage = await pdfDoc.embedJpg(signatureBuffer);
      } catch (jpgError) {
        console.error(`❌ Unsupported image format. Please use PNG or JPG.`);
        return;
      }
    }

    const { height: pageHeight } = page.getSize();

    page.drawImage(signatureImage, {
      x: coord.x,
      y: pageHeight - coord.y - height,
      width: width,
      height: height,
    });

    console.log(
      `✓ Signature drawn at (${coord.x}, ${coord.y}) with dimensions ${width}x${height}`
    );
  } catch (error) {
    console.error(`❌ Error drawing signature: ${error.message}`);
  }
}

// Export functions for use in other modules
export {
  fillCompletePDF,
  fillCheckboxesWithCoordinates,
  fillAllCoordinatePages,
  fillMedicationTable,
  fieldCoordinates,
  checkboxCoordinates,
  medicationRows,
  tableConfig,
};
