import {
  fillCompletePDF,
  fillCheckboxesWithCoordinates,
  fillAllCoordinatePages,
  fillMedicationTable,
  tableConfig,
} from "../index.js";
import { PDFDocument } from "pdf-lib";
import * as fontkit from "fontkit";
import fs from "fs";
import path from "path";

const formatDate = (dateInput) => {
  if (!dateInput) return null;

  try {
    const date = new Date(dateInput);
    if (isNaN(date.getTime())) return null;

    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const year = date.getFullYear();

    return `${month}/${day}/${year}`;
  } catch (error) {
    console.log("Date formatting error:", error);
    return null;
  }
};

const getFieldValue = (value) => {
  if (value === null || value === undefined || value === "") {
    return undefined;
  }
  return value;
};

export const generatePDF = async (req, res) => {
  try {
    const { patientData, medicationRows } = req.body;

    if (!patientData || typeof patientData !== "object") {
      return res.status(400).json({
        error: "Invalid request",
        message: "Patient data is required",
      });
    }
    const inputFile = path.join(process.cwd(), "E-SOC Paperwork.pdf");
    const outputFileName = `E-SOC-Filled-${Date.now()}.pdf`;
    const outputFile = path.join(process.cwd(), outputFileName);

    if (!fs.existsSync(inputFile)) {
      return res.status(500).json({
        error: "Template not found",
        message: "PDF template file not found",
      });
    }

    const cleanedPatientData = {};

    // Page 2 fields
    if (getFieldValue(patientData.relationshipIfNotPatient))
      cleanedPatientData.relationshipIfNotPatient =
        patientData.relationshipIfNotPatient;
    if (getFieldValue(patientData.reasonUnableToSign))
      cleanedPatientData.reasonUnableToSign = patientData.reasonUnableToSign;

    if (getFieldValue(patientData.dateIfNotPatient))
      cleanedPatientData.dateIfNotPatient = formatDate(
        patientData.dateIfNotPatient
      );

    if (getFieldValue(patientData.rnDate))
      cleanedPatientData.rnDate = formatDate(patientData.rnDate);

    // Page 5 fields
    if (getFieldValue(patientData.clinicalManager))
      cleanedPatientData.clinicalManager = patientData.clinicalManager;
    if (getFieldValue(patientData.clinicalManagerContactInfo))
      cleanedPatientData.clinicalManagerContactInfo =
        patientData.clinicalManagerContactInfo;

    // Page 7 fields
    if (getFieldValue(patientData.patientSignatureDate))
      cleanedPatientData.patientSignatureDate = formatDate(
        patientData.patientSignatureDate
      );
    if (getFieldValue(patientData.representativeSignatureDate))
      cleanedPatientData.representativeSignatureDate = formatDate(
        patientData.representativeSignatureDate
      );
    if (getFieldValue(patientData.agencyRepresentativeDate))
      cleanedPatientData.agencyRepresentativeDate = formatDate(
        patientData.agencyRepresentativeDate
      );

    // Page 8 fields
    if (getFieldValue(patientData.socDate))
      cleanedPatientData.socDate = formatDate(patientData.socDate);
    if (getFieldValue(patientData.dailyServicesYesDescription))
      cleanedPatientData.dailyServicesYesDescription =
        patientData.dailyServicesYesDescription;
    if (getFieldValue(patientData.lifeSustainingDesc))         
      cleanedPatientData.lifeSustainingDesc = patientData.lifeSustainingDesc;
    if (getFieldValue(patientData.otherTherapyDesc))
      cleanedPatientData.otherTherapyDesc = patientData.otherTherapyDesc;
    if (getFieldValue(patientData.dialysisDesc))
      cleanedPatientData.dialysisDesc = patientData.dialysisDesc;
    if (getFieldValue(patientData.tubeFeedingDesc))
      cleanedPatientData.tubeFeedingDesc = patientData.tubeFeedingDesc;
    if (getFieldValue(patientData.clinicianDate))
      cleanedPatientData.clinicianDate = formatDate(patientData.clinicianDate);

    // Page 9 fields
    if (getFieldValue(patientData.physicianName))
      cleanedPatientData.physicianName = patientData.physicianName;
    if (getFieldValue(patientData.DX)) cleanedPatientData.DX = patientData.DX;
    if (getFieldValue(patientData.HT)) cleanedPatientData.HT = patientData.HT;
    if (getFieldValue(patientData.WT)) cleanedPatientData.WT = patientData.WT;

    // Page 10 fields
    if (getFieldValue(patientData.vaccineDate))
      cleanedPatientData.vaccineDate = formatDate(patientData.vaccineDate);
    if (getFieldValue(patientData.fluOtherDesc))
      cleanedPatientData.fluOtherDesc = patientData.fluOtherDesc;
    if (getFieldValue(patientData.fluVaccineDate))
      cleanedPatientData.fluVaccineDate = formatDate(
        patientData.fluVaccineDate
      );
    if (getFieldValue(patientData.pneumoniaVaccineDate))
      cleanedPatientData.pneumoniaVaccineDate = formatDate(
        patientData.pneumoniaVaccineDate
      );
    if (getFieldValue(patientData.vaccineAdminstrationDate))
      cleanedPatientData.vaccineAdminstrationDate = formatDate(
        patientData.vaccineAdminstrationDate
      );
    if (getFieldValue(patientData.vaccineSite))
      cleanedPatientData.vaccineSite = patientData.vaccineSite;
    if (getFieldValue(patientData.vaccineManufacturer))
      cleanedPatientData.vaccineManufacturer = patientData.vaccineManufacturer;
    if (getFieldValue(patientData.vaccineExpiryDate))
      cleanedPatientData.vaccineExpiryDate = formatDate(
        patientData.vaccineExpiryDate
      );
    if (getFieldValue(patientData.outcomeDate))
      cleanedPatientData.outcomeDate = formatDate(patientData.outcomeDate);
    if (getFieldValue(patientData.outcomeComment))
      cleanedPatientData.outcomeComment = patientData.outcomeComment;

    // Page 11 fields
    if (getFieldValue(patientData.page11Date))
      cleanedPatientData.page11Date = formatDate(patientData.page11Date);
    if (getFieldValue(patientData.nurseSignatureDate))
      cleanedPatientData.nurseSignatureDate = formatDate(
        patientData.nurseSignatureDate
      );

    // Page 12 fields
    if (getFieldValue(patientData.homeHealthAgencyName))
      cleanedPatientData.homeHealthAgencyName =
        patientData.homeHealthAgencyName;
    if (getFieldValue(patientData.homeHealthAgencyLocation))
      cleanedPatientData.homeHealthAgencyLocation =
        patientData.homeHealthAgencyLocation;
    if (getFieldValue(patientData.patientSignatureDate))
      cleanedPatientData.patientSignatureDate = formatDate(
        patientData.patientSignatureDate
      );
    if (getFieldValue(patientData.witnessSignatureDate))
      cleanedPatientData.witnessSignatureDate = formatDate(
        patientData.witnessSignatureDate
      );

    // Page 13 fields
    if (getFieldValue(patientData.patientDate))
      cleanedPatientData.patientDate = formatDate(patientData.patientDate);
    if (getFieldValue(patientData.witnessDate))
      cleanedPatientData.witnessDate = formatDate(patientData.witnessDate);

    // Page 14 fields
    if (getFieldValue(patientData.insuredName))
      cleanedPatientData.insuredName = patientData.insuredName;
    if (getFieldValue(patientData.patientRetirementDate))
      cleanedPatientData.patientRetirementDate = formatDate(
        patientData.patientRetirementDate
      );
    if (getFieldValue(patientData.patientSpouseRetirementDate))
      cleanedPatientData.patientSpouseRetirementDate = formatDate(
        patientData.patientSpouseRetirementDate
      );

    // Page 15 fields
    if (getFieldValue(patientData.patientWish))
      cleanedPatientData.patientWish = patientData.patientWish;
    if (getFieldValue(patientData.durablePowerAttorneyName))
      cleanedPatientData.durablePowerAttorneyName =
        patientData.durablePowerAttorneyName;
    if (getFieldValue(patientData.durablePowerAttorneyTelphone))
      cleanedPatientData.durablePowerAttorneyTelphone =
        patientData.durablePowerAttorneyTelphone;
    if (getFieldValue(patientData.durablePowerAttorneyPatientWish))
      cleanedPatientData.durablePowerAttorneyPatientWish =
        patientData.durablePowerAttorneyPatientWish;
    if (getFieldValue(patientData.patientSignatureDate))
      cleanedPatientData.patientSignatureDate = formatDate(
        patientData.patientSignatureDate
      );
    if (getFieldValue(patientData.witnessSignatureDate))
      cleanedPatientData.witnessSignatureDate = formatDate(
        patientData.witnessSignatureDate
      );

    // Page 16 fields
    if (getFieldValue(patientData.patientNumber))
      cleanedPatientData.patientNumber = patientData.patientNumber;

    // Page 17 fields
    if (getFieldValue(patientData.planContactInfo))
      cleanedPatientData.planContactInfo = patientData.planContactInfo;
    if (getFieldValue(patientData.additionalInfo))
      cleanedPatientData.additionalInfo = patientData.additionalInfo;

    // Handle all possible signature base64 fields from the payload
    const signatureFields = [
      "rnSignature",
      "patientSignature",
      "representativeSignature",
      "agencyRepresentativeSignature",
      "clinicianSignature",
      "witnessSignature",
      "vaccineNurseSignature",
      "vaccinePatientSignature",
      "nurseSignatureFollowUp",
      "patientSignatureFollowUp",
      "pressureUlcerNurseSignature",
      "beneficiaryPatientSignature",
      "hmoPatientSignature",
      "hmoWitnessSignature",
      "medicarePatientSignature",
      "advanceDirectivesPatientSignature",
      "advanceDirectivesWitnessSignature",
      "nonCoveragePatientSignature",
      "patientRightsPatientSignature",
      "medicationProfileClinicianSignature",
    ];

    signatureFields.forEach((field) => {
      if (
        patientData[field] &&
        typeof patientData[field] === "string" &&
        patientData[field].startsWith("data:image/")
      ) {
        cleanedPatientData[field] = patientData[field];
      }
    });

    // Basic patient information - only add if values exist
    if (getFieldValue(patientData.patientName))
      cleanedPatientData.patientName = patientData.patientName;
    if (getFieldValue(patientData.socialSecurity))
      cleanedPatientData.socialSecurity = patientData.socialSecurity;
    if (getFieldValue(patientData.phoneNumber))
      cleanedPatientData.phoneNumber = patientData.phoneNumber;
    if (getFieldValue(patientData.physician))
      cleanedPatientData.physician = patientData.physician;
    if (getFieldValue(patientData.address))
      cleanedPatientData.address = patientData.address;
    if (getFieldValue(patientData.city))
      cleanedPatientData.city = patientData.city;
    if (getFieldValue(patientData.state))
      cleanedPatientData.state = patientData.state;
    if (getFieldValue(patientData.zip))
      cleanedPatientData.zip = patientData.zip;

    // Medical information
    if (getFieldValue(patientData.primaryDx))
      cleanedPatientData.primaryDx = patientData.primaryDx;
    if (getFieldValue(patientData.secondaryDx))
      cleanedPatientData.secondaryDx = patientData.secondaryDx;
    if (getFieldValue(patientData.allergy))
      cleanedPatientData.allergy = patientData.allergy;
    if (getFieldValue(patientData.height))
      cleanedPatientData.height = patientData.height;
    if (getFieldValue(patientData.weight))
      cleanedPatientData.weight = patientData.weight;

    // Services information
    if (getFieldValue(patientData.flowRate))
      cleanedPatientData.flowRate = patientData.flowRate;
    if (getFieldValue(patientData.hoursOfUse))
      cleanedPatientData.hoursOfUse = patientData.hoursOfUse;
    if (getFieldValue(patientData.deliveryDevice))
      cleanedPatientData.deliveryDevice = patientData.deliveryDevice;

    // Emergency contact information
    if (getFieldValue(patientData.emergencyContact))
      cleanedPatientData.emergencyContact = patientData.emergencyContact;
    if (getFieldValue(patientData.emergencyPhone))
      cleanedPatientData.emergencyPhone = patientData.emergencyPhone;
    if (getFieldValue(patientData.evacuationRelativeNameAndPhone))
      cleanedPatientData.evacuationRelativeNameAndPhone =
        patientData.evacuationRelativeNameAndPhone;
    if (getFieldValue(patientData.hotelNameAndPhone))
      cleanedPatientData.hotelNameAndPhone = patientData.hotelNameAndPhone;
    if (getFieldValue(patientData.shelterLocation))
      cleanedPatientData.shelterLocation = patientData.shelterLocation;
    if (getFieldValue(patientData.otherDescription))
      cleanedPatientData.otherDescription = patientData.otherDescription;
    if (getFieldValue(patientData.priorityLevel))
      cleanedPatientData.priorityLevel = patientData.priorityLevel;

    // Pharmacy information
    if (getFieldValue(patientData.pharmacyName))
      cleanedPatientData.pharmacyName = patientData.pharmacyName;
    if (getFieldValue(patientData.pharmacyAddress))
      cleanedPatientData.pharmacyAddress = patientData.pharmacyAddress;
    if (getFieldValue(patientData.pharmacyPhone))
      cleanedPatientData.pharmacyPhone = patientData.pharmacyPhone;

    // Insurance information
    if (getFieldValue(patientData.insuranceCompanyName))
      cleanedPatientData.insuranceCompanyName =
        patientData.insuranceCompanyName;
    if (getFieldValue(patientData.policyNumber))
      cleanedPatientData.policyNumber = patientData.policyNumber;
    if (getFieldValue(patientData.employerName))
      cleanedPatientData.employerName = patientData.employerName;
    if (getFieldValue(patientData.medicareNumber))
      cleanedPatientData.medicareNumber = patientData.medicareNumber;
    if (getFieldValue(patientData.patientNumber))
      cleanedPatientData.patientNumber = patientData.patientNumber;

    // Handle dates - format from ISO to MM/DD/YYYY
    const formattedServiceEndDate = formatDate(patientData.serviceEndDate);
    if (formattedServiceEndDate)
      cleanedPatientData.serviceEndDate = formattedServiceEndDate;

    // Set current date if not provided
    cleanedPatientData.currentDate =
      formatDate(patientData.currentDate) ||
      new Date().toLocaleDateString("en-US");

    // Copy all boolean checkboxes (they should always be included, even if false)
    const booleanFields = [
      "consentForCare",
      "releaseOfInfo",
      "financialAgreement",
      "patientRightAndResponsibilities",
      "advanceDirectives",
      "advanceDirectives1",
      "advanceDirectives2",
      "advanceDirectives3",
      "photographicRelease",
      "billingAlert",
      "frequncyVisitVerification",
      "provisionTherapy",
      "translaterAvalability",
      "homeSafety",
      "hippaNotice",
      "dailyServicesYes",
      "lifeSustainingYes",
      "otherTherapyYes",
      "patientIndependentYes",
      "ventilatorDependentYes",
      "dialysisYes",
      "tubeFeedingYes",
      "patientIndependentMedicationYes",
      "patientWithSpecialNeedShelterYes",
      "walkerOrCane",
      "wheelChair",
      "bedBound",
      "hearingImparment",
      "visualImparment",
      "mentalOrConginitiveImparment",
      "physicalConditionValue1",
      "physicalConditionValue2",
      "physicalConditionValue3",
      "physicalConditionValue4",
      "mentalConditionValue1",
      "mentalConditionValue2",
      "mentalConditionValue3",
      "mentalConditionValue4",
      "acitivityValue1",
      "acitivityValue2",
      "acitivityValue3",
      "acitivityValue4",
      "mobilityValue1",
      "mobilityValue2",
      "mobilityValue3",
      "mobilityValue4",
      "incontinenceValue1",
      "incontinenceValue2",
      "incontinenceValue3",
      "incontinenceValue4",
      "fluVaccineYes",
      "fluAgeGreater65",
      "fluAgeBetween50To64",
      "fluPersonal",
      "fluOther",
      "fluRecentlyGot",
      "fluAllergicToEggs",
      "fluReactionToFluShot",
      "pneumoniaVaccineYes",
      "pneumoniaAgeGreater65",
      "pneumoniaChronicHealthProblem",
      "pneumoniaPersonal",
      "pneumoniaRecentlyGot",
      "fluVaccineByAgencyNurse",
      "fluReferredToPhysician",
      "fluReferredToHealthDepartment",
      "fluVaccinationArrangedAtHome",
      "pneumoniaVaccineByAgencyNurse",
      "pneumoniaReferredToPhysician",
      "pneumoniaReferredToHealthDepartment",
      "pneumoniaVaccinationArrangedAtHome",
      "fluVaccine",
      "pneumoniaVaccine",
      "fluOutcome",
      "pneumoniaOutcome",
      "vaccineRelatedReactionYes",
      "advanceDirectivesInfo",
      "advanceDirectivesExecute",
      "advanceDirectivesLivingWill",
      "advanceDirectivesLivingWillYes",
      "advanceDirectivesCopyObtainedYes",
      "durablePowerAttorney",
      "durablePowerAttorneyYes",
      "haveAdvanceDirectives",
      "haveAdvanceDirectivesYes",
      "haveAdvanceDirectivesCopyYes",
      "option1Yes",
      "option1No",
      "option2Yes",
      "option2No",
      "option3Yes",
      "option3No",
      "option4Yes",
      "option4No",
      "option5Yes",
      "option5No",
      "option6Yes",
      "option6No",
      "option7Yes",
      "option7No",
      "option8Yes",
      "option8No",
      "option9Yes",
      "option9No",
      "advanceDirectivesLivingWillNo",
      "advanceDirectivesCopyObtainedNo",
      "durablePowerAttorneyNo",
      "haveAdvanceDirectivesNo",
      "haveAdvanceDirectivesCopyNo",
      "vaccineRelatedReactionNo",
      "fluVaccineNo",
      "pneumoniaVaccineNo",
      "dailyServicesNo",
      "lifeSustainingNo",
      "otherTherapyNo",
      "patientIndependentNo",
      "ventilatorDependentNo",
      "dialysisNo",
      "tubeFeedingNo",
      "patientIndependentMedicationNo",
      "patientWithSpecialNeedShelterNo",
      "patientEvacuateToRelative",
      "patientEvacuateToFriend",
    ];

    booleanFields.forEach((field) => {
      if (patientData.hasOwnProperty(field)) {
        cleanedPatientData[field] = Boolean(patientData[field]);
      }
    });

    if (
      medicationRows &&
      Array.isArray(medicationRows) &&
      medicationRows.length > 0
    ) {
      const pdfBytes = fs.readFileSync(inputFile);
      const pdfDoc = await PDFDocument.load(pdfBytes);

      pdfDoc.registerFontkit(fontkit);

      const fontBytes = fs.readFileSync("DejaVuSans.ttf");
      const customFont = await pdfDoc.embedFont(fontBytes);

      const pages = pdfDoc.getPages();

      fillCheckboxesWithCoordinates(pages, cleanedPatientData, customFont);

      await fillAllCoordinatePages(pages, cleanedPatientData, pdfDoc);

      if (pages[8]) {
        fillMedicationTable(pages[8], medicationRows, tableConfig, customFont);
      }

      const filledPdfBytes = await pdfDoc.save();
      fs.writeFileSync(outputFile, filledPdfBytes);
    } else {
      await fillCompletePDF(inputFile, outputFile, cleanedPatientData);
    }

    // Also handle medication rows with proper date formatting
    if (medicationRows && Array.isArray(medicationRows)) {
      const formattedMedicationRows = medicationRows.map((med) => ({
        startDate:
          formatDate(med.startDate) || new Date().toLocaleDateString("en-US"),
        cN: getFieldValue(med.cN) || "C",
        medication: getFieldValue(med.medication) || "",
        doseRoute: getFieldValue(med.doseRoute) || "",
        frequency: getFieldValue(med.frequency) || "",
        purpose: getFieldValue(med.purpose) || "",
        cdcDate: formatDate(med.cdcDate) || "Ongoing",
      }));

      // Log formatted medication data for debugging
      console.log("Formatted medication rows:", formattedMedicationRows);
    }

    if (!fs.existsSync(outputFile)) {
      return res.status(500).json({
        error: "PDF generation failed",
        message: "Failed to generate PDF",
      });
    }
    const pdfBuffer = fs.readFileSync(outputFile);

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${outputFileName}"`
    );
    res.setHeader("Content-Length", pdfBuffer.length);

    res.send(pdfBuffer);

    setTimeout(() => {
      if (fs.existsSync(outputFile)) {
        fs.unlinkSync(outputFile);
        console.log(`🗑️ Cleaned up temporary file: ${outputFileName}`);
      }
    }, 1000);

    console.log(`✅ PDF generated and sent: ${outputFileName}`);
  } catch (error) {
    console.error("❌ Error generating PDF:", error);
    res.status(500).json({
      error: "PDF generation failed",
      message: error.message,
    });
  }
};
