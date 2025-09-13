import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FormNavigation } from "@/components/forms/FormNavigation";
import { PatientServiceAgreementStep } from "@/components/forms/steps/PatientServiceAgreementStep";
import { PatientRightsAcknowledgementStep } from "@/components/forms/steps/PatientRightsAcknowledgementStep";
import { EmergencyPreparednessStep } from "@/components/forms/steps/EmergencyPreparednessStep";
import { MedicationProfileStep } from "@/components/forms/steps/MedicationProfileStep";
import { VaccineQuestionnaireStep } from "@/components/forms/steps/VaccineQuestionnaireStep";
import { PressureUlcerRiskStep } from "@/components/forms/steps/PressureUlcerRiskStep";
import { BeneficiaryElectedTransferStep } from "@/components/forms/steps/BeneficiaryElectedTransferStep";
import { HmoNoticeStep } from "@/components/forms/steps/HmoNoticeStep";
import { MedicareSecondaryPayerStep } from "@/components/forms/steps/MedicareSecondaryPayerStep";
import { PatientAdvanceDirectivesStep } from "@/components/forms/steps/PatientAdvanceDirectivesStep";
import { NoticeOfMedicareNonCoverageStep } from "@/components/forms/steps/NoticeOfMedicareNonCoverageStep";
import { ESocFormData } from "@/types/form-types";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { generatePDF } from "@/lib/api";

const initialFormData: ESocFormData = {
  patientServiceAgreement: {
    patientName: "",
    ssNumber: "",
    consentForCare: false,
    releaseOfInformation: false,
    financialAgreement: false,
    receivedMedicareExplanation: false,
    patientRightsReceived: false,
    advanceDirectivesReceived: false,
    declineAdvanceDirective: false,
    provideMedicalPowerOfAttorney: false,
    provideLivingWill: false,
    photographicRelease: false,
    billingAlert: false,
    frequencyVerification: false,
    therapyAndSupplies: false,
    translatorAvailability: false,
    homeSafety: false,
    hipaaPrivacy: false,
    patientSignature: "",
    relationshipIfNotPatient: "",
    reasonUnableToSign: "",
    patientSignatureDate: null,
    rnSignature: "",
    rnSignatureDate: null,
  },
  patientRightsAcknowledgement: {
    otherInstructions: "",
    clinicalManagerName: "",
    clinicalManagerContact: "",
    patientSignature: "",
    patientSignatureDate: null,
    representativeSignature: "",
    representativeSignatureDate: null,
    agencyRepresentativeSignature: "",
    agencyRepresentativeDate: null,
  },
  emergencyPreparedness: {
    patientName: "",
    socDate: null,
    phoneNumber: "",
    physician: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    primaryDx: "",
    secondaryDx: "",
    dailyServices: false,
    dailyServicesDescription: "",
    oxygenFlowRate: "",
    oxygenHours: "",
    oxygenDevice: "",
    lifeSustainingInfusion: false,
    lifeSustainingDescription: "",
    otherIvTherapy: false,
    otherIvDescription: "",
    patientIndependent: false,
    ventilatorDependent: false,
    dialysis: false,
    dialysisDescription: "",
    tubeFeeding: false,
    tubeFeedingDescription: "",
    independentMedications: false,
    functionalDisabilities: [],
    emergencyContactName: "",
    emergencyContactPhone: "",
    evacuationRelativePhone: "",
    evacuationHotel: "",
    evacuationShelter: "",
    specialNeedsShelter: false,
    evacuationOther: "",
    priorityLevel: "",
    clinicianSignature: "",
    clinicianDate: null,
  },
  medicationProfile: {
    patientName: "",
    physician: "",
    allergy: "",
    dx: "",
    pharmacy: "",
    pharmacyAddress: "",
    pharmacyPhone: "",
    height: "",
    weight: "",
    medications: [],
    clinicianSignature: "",
    clinicianDate: null,
  },
  vaccineQuestionnaire: {
    patientName: "",
    date: null,
    influenzaInterest: false,
    age65Plus: false,
    age50To64WithCondition: false,
    personalPreferenceInfluenza: false,
    otherInfluenza: false,
    recentFluShot: false,
    recentFluShotDate: null,
    allergicToEggs: false,
    reactionToFluShot: false,
    pneumoniaInterest: false,
    age65PlusPneumonia: false,
    chronicHealthProblem: false,
    personalPreferencePneumonia: false,
    receivedPneumoniaVaccine: false,
    pneumoniaVaccineDate: null,
    agencyNurseInfluenza: false,
    referPhysicianInfluenza: false,
    healthDepartmentInfluenza: false,
    homeVaccinationInfluenza: false,
    agencyNursePneumonia: false,
    referPhysicianPneumonia: false,
    healthDepartmentPneumonia: false,
    homeVaccinationPneumonia: false,
    vaccinatedInfluenza: false,
    vaccinatedPneumonia: false,
    administrationDate: null,
    site: "",
    manufacturerLot: "",
    expiry: null,
    nurseSignature: "",
    patientSignature: "",
    followUpInfluenza: false,
    followUpPneumonia: false,
    followUpDate: null,
    vaccineReaction: false,
    comment: "",
    nurseSignatureFollowUp: "",
    patientSignatureFollowUp: "",
  },
  pressureUlcerRisk: {
    patientName: "",
    date: null,
    physicalCondition: "",
    mentalCondition: "",
    activity: "",
    mobility: "",
    incontinence: "",
    nurseSignature: "",
    nurseSignatureDate: null,
  },
  beneficiaryElectedTransfer: {
    previousHomeHealthAgency: "",
    previousAgencyLocation: "",
    patientSignature: "",
    patientSignatureDate: null,
    witnessSignature: "",
    witnessSignatureDate: null,
  },
  hmoNoticeAcknowledgement: {
    patientSignature: "",
    patientSignatureDate: null,
    witnessSignature: "",
    witnessSignatureDate: null,
    patientName: "",
  },
  medicareSecondaryPayerScreening: {
    workersCompensation: false,
    workersCompensationDetails: "",
    activelyEmployed: false,
    activeEmploymentDetails: "",
    blackLungProgram: false,
    blackLungDetails: "",
    autoAccident: false,
    endStageRenalDisease: false,
    esrdCoordinationPeriod: false,
    medicareDisability: false,
    groupHealthPlan: false,
    groupHealthDetails: "",
    retired: false,
    retirementDetails: "",
    insuranceCompany: "",
    insuredName: "",
    policyNumber: "",
    employer: "",
    patientSignature: "",
    patientSignatureDate: null,
    medicareNumber: "",
  },
  patientAdvanceDirectives: {
    requestMoreInformation: false,
    wishToExecuteDirectives: false,
    hasLivingWill: false,
    livingWillCopyObtained: false,
    livingWillWishes: "",
    hasDurablePowerOfAttorney: false,
    powerOfAttorneyName: "",
    powerOfAttorneyPhone: "",
    hasAdvanceDirective: false,
    advanceDirectiveCopyObtained: false,
    advanceDirectiveWishes: "",
    patientSignature: "",
    witnessSignature: "",
    patientSignatureDate: null,
    witnessSignatureDate: null,
  },
  noticeOfMedicareNonCoverage: {
    patientName: "",
    patientNumber: "",
    effectiveDate: null,
    planContactInfo: "",
    additionalInfo: "",
    patientOrRepSignature: "",
    signatureDate: null,
  },
  currentStep: 1,
  isComplete: false,
};

const formSteps = [
  {
    title: "Patient Service Agreement",
    component: PatientServiceAgreementStep,
  },
  {
    title: "Patient Rights Acknowledgement",
    component: PatientRightsAcknowledgementStep,
  },
  { title: "Emergency Preparedness", component: EmergencyPreparednessStep },
  { title: "Medication Profile", component: MedicationProfileStep },
  { title: "Vaccine Questionnaire", component: VaccineQuestionnaireStep },
  { title: "Pressure Ulcer Risk Assessment", component: PressureUlcerRiskStep },
  {
    title: "Beneficiary-Elected Transfer",
    component: BeneficiaryElectedTransferStep,
  },
  { title: "HMO Notice Acknowledgement", component: HmoNoticeStep },
  {
    title: "Medicare Secondary Payer Screening",
    component: MedicareSecondaryPayerStep,
  },
  {
    title: "Patient Advance Directives",
    component: PatientAdvanceDirectivesStep,
  },
  {
    title: "Notice of Medicare Non-Coverage",
    component: NoticeOfMedicareNonCoverageStep,
  },
];

export const ESocForm = () => {
  const [formData, setFormData] = useState<ESocFormData>(initialFormData);
  const { toast } = useToast();

  const updateFormData = (updates: Partial<ESocFormData>) => {
    setFormData((prev) => {
      const updated = { ...prev, ...updates };

      // Console log all form values as JSON
      console.log("=== FORM DATA UPDATE ===");
      console.log("Previous form data:", JSON.stringify(prev, null, 2));
      console.log("Updates:", JSON.stringify(updates, null, 2));
      console.log("Updated form data:", JSON.stringify(updated, null, 2));
      console.log("========================");

      // Auto-prefill patient names across all steps
      const patientNameFields = [
        "patientServiceAgreement.patientName",
        "emergencyPreparedness.patientName",
        "medicationProfile.patientName",
        "vaccineQuestionnaire.patientName",
        "pressureUlcerRisk.patientName",
        "hmoNoticeAcknowledgement.patientName",
        "noticeOfMedicareNonCoverage.patientName",
      ];

      // Auto-prefill patient signatures across all steps
      const patientSignatureFields = [
        "patientServiceAgreement.patientSignature",
        "patientRightsAcknowledgement.patientSignature",
        "beneficiaryElectedTransfer.patientSignature",
        "hmoNoticeAcknowledgement.patientSignature",
        "medicareSecondaryPayerScreening.patientSignature",
        "patientAdvanceDirectives.patientSignature",
        "noticeOfMedicareNonCoverage.patientOrRepSignature",
        "vaccineQuestionnaire.patientSignature",
        "vaccineQuestionnaire.patientSignatureFollowUp",
      ];

      // Auto-prefill physician names
      const physicianFields = [
        "emergencyPreparedness.physician",
        "medicationProfile.physician",
      ];

      // Auto-prefill emergency contact information
      const emergencyContactFields = [
        "emergencyPreparedness.emergencyContactName",
      ];

      // Auto-prefill RN/Clinician signatures
      const clinicianSignatureFields = [
        "patientServiceAgreement.rnSignature",
        "emergencyPreparedness.clinicianSignature",
        "medicationProfile.clinicianSignature",
        "pressureUlcerRisk.nurseSignature",
        "vaccineQuestionnaire.nurseSignature",
        "vaccineQuestionnaire.nurseSignatureFollowUp",
        "patientRightsAcknowledgement.agencyRepresentativeSignature",
      ];

      // Auto-prefill patient names
      const updatedPatientName = getNestedValue(updated, patientNameFields);
      if (updatedPatientName) {
        patientNameFields.forEach((field) => {
          setNestedValue(updated, field, updatedPatientName);
        });
      }

      // Auto-prefill patient signatures
      const updatedPatientSignature = getNestedValue(
        updated,
        patientSignatureFields
      );
      if (updatedPatientSignature) {
        patientSignatureFields.forEach((field) => {
          setNestedValue(updated, field, updatedPatientSignature);
        });
      }

      // Auto-prefill physician names
      const updatedPhysician = getNestedValue(updated, physicianFields);
      if (updatedPhysician) {
        physicianFields.forEach((field) => {
          setNestedValue(updated, field, updatedPhysician);
        });
      }

      // Auto-prefill clinician/nurse signatures
      const updatedClinicianSignature = getNestedValue(
        updated,
        clinicianSignatureFields
      );
      if (updatedClinicianSignature) {
        clinicianSignatureFields.forEach((field) => {
          setNestedValue(updated, field, updatedClinicianSignature);
        });
      }

      // Auto-prefill diagnosis from emergency prep to medication profile
      if (
        updated.emergencyPreparedness?.primaryDx &&
        !updated.medicationProfile?.dx
      ) {
        setNestedValue(
          updated,
          "medicationProfile.dx",
          updated.emergencyPreparedness.primaryDx
        );
      }

      // Auto-prefill contact info
      if (
        updated.emergencyPreparedness?.phoneNumber &&
        !updated.patientServiceAgreement?.ssNumber
      ) {
        // Could auto-fill other contact related fields if needed
      }

      return updated;
    });
  };

  console.log(
    "Functional Disabilities:",
    formData.emergencyPreparedness.functionalDisabilities
  );

  // Helper functions for nested object access
  const getNestedValue = (obj: any, paths: string[]): string | null => {
    for (const path of paths) {
      const value = path.split(".").reduce((o, key) => o?.[key], obj);
      if (value && typeof value === "string" && value.trim()) {
        return value;
      }
    }
    return null;
  };

  const setNestedValue = (obj: any, path: string, value: string) => {
    const keys = path.split(".");
    const lastKey = keys.pop()!;
    const target = keys.reduce((o, key) => {
      if (!o[key]) o[key] = {};
      return o[key];
    }, obj);
    target[lastKey] = value;
  };

  const handleNext = () => {
    if (formData.currentStep < formSteps.length) {
      updateFormData({ currentStep: formData.currentStep + 1 });
      toast({
        title: "Progress Saved",
        description: "Moving to next section...",
      });
    }
  };

  const handlePrevious = () => {
    if (formData.currentStep > 1) {
      updateFormData({ currentStep: formData.currentStep - 1 });
    }
  };

  const handleComplete = () => {
    updateFormData({ isComplete: true });
    toast({
      title: "Form Completed!",
      description: "E-SOC Paperwork has been successfully completed.",
      duration: 5000,
    });

    // Here you would typically save to database or generate PDF
    console.log("=== FORM COMPLETION ===");
    console.log("Complete form data:", JSON.stringify(formData, null, 2));
    console.log("=======================");
  };

  const handleGeneratePDF = async () => {
    try {
      const patientData = {
        // Patient Service Agreement
        patientName: formData.patientServiceAgreement.patientName,
        socialSecurity: formData.patientServiceAgreement.ssNumber,
        consentForCare: formData.patientServiceAgreement.consentForCare,
        releaseOfInfo: formData.patientServiceAgreement.releaseOfInformation,
        financialAgreement: formData.patientServiceAgreement.financialAgreement,
        receivedMedicareExplanation:
          formData.patientServiceAgreement.receivedMedicareExplanation,
        patientRightAndResponsibilities:
          formData.patientServiceAgreement.patientRightsReceived,
        advanceDirectives:
          formData.patientServiceAgreement.advanceDirectivesReceived,
        advanceDirectives1:
          formData.patientServiceAgreement.declineAdvanceDirective,
        advanceDirectives2:
          formData.patientServiceAgreement.provideMedicalPowerOfAttorney,
        advanceDirectives3: formData.patientServiceAgreement.provideLivingWill,
        photographicRelease:
          formData.patientServiceAgreement.photographicRelease,
        billingAlert: formData.patientServiceAgreement.billingAlert,
        frequncyVisitVerification:
          formData.patientServiceAgreement.frequencyVerification,
        provisionTherapy: formData.patientServiceAgreement.therapyAndSupplies,
        translaterAvalability:
          formData.patientServiceAgreement.translatorAvailability,
        homeSafety: formData.patientServiceAgreement.homeSafety,
        hippaNotice: formData.patientServiceAgreement.hipaaPrivacy,
        patientSignature: formData.patientServiceAgreement.patientSignature,
        relationshipIfNotPatient:
          formData.patientServiceAgreement.relationshipIfNotPatient,
        reasonUnableToSign: formData.patientServiceAgreement.reasonUnableToSign,
        patientSignatureDate:
          formData.patientServiceAgreement.patientSignatureDate,
        rnSignature: formData.patientServiceAgreement.rnSignature,
        patientSignatureBase64:
          formData.patientServiceAgreement.patientSignature,
        rnSignatureBase64: formData.patientServiceAgreement.rnSignature,
        rnSignatureDate: formData.patientServiceAgreement.rnSignatureDate,
        rnDate: formData.patientServiceAgreement.rnSignatureDate,
        dateIfNotPatient: formData.patientServiceAgreement.patientSignatureDate,

        // Emergency Preparedness
        phoneNumber: formData.emergencyPreparedness.phoneNumber,
        physician: formData.emergencyPreparedness.physician,
        physicianName: formData.emergencyPreparedness.physician,
        address: formData.emergencyPreparedness.address,
        city: formData.emergencyPreparedness.city,
        state: formData.emergencyPreparedness.state,
        zip: formData.emergencyPreparedness.zip,
        socDate: formData.emergencyPreparedness.socDate,
        primaryDx: formData.emergencyPreparedness.primaryDx,
        secondaryDx: formData.emergencyPreparedness.secondaryDx,
        dailyServicesYes: formData.emergencyPreparedness.dailyServices,
        dailyServicesYesDescription:
          formData.emergencyPreparedness.dailyServicesDescription,
        oxygenFlowRate: formData.emergencyPreparedness.oxygenFlowRate,
        flowRate: formData.emergencyPreparedness.oxygenFlowRate,
        hoursOfUse: formData.emergencyPreparedness.oxygenHours,
        deliveryDevice: formData.emergencyPreparedness.oxygenDevice,
        lifeSustainingYes:
          formData.emergencyPreparedness.lifeSustainingInfusion,
        lifeSustainingDesc:
          formData.emergencyPreparedness.lifeSustainingDescription,
        otherTherapyYes: formData.emergencyPreparedness.otherIvTherapy,
        otherTherapyDesc: formData.emergencyPreparedness.otherIvDescription,
        patientIndependentYes:
          formData.emergencyPreparedness.patientIndependent,
        ventilatorDependentYes:
          formData.emergencyPreparedness.ventilatorDependent,
        dialysisYes: formData.emergencyPreparedness.dialysis,
        dialysisDesc: formData.emergencyPreparedness.dialysisDescription,
        tubeFeedingYes: formData.emergencyPreparedness.tubeFeeding,
        tubeFeedingDesc: formData.emergencyPreparedness.tubeFeedingDescription,
        patientIndependentMedicationYes:
          formData.emergencyPreparedness.independentMedications,
        functionalDisabilities:
          formData.emergencyPreparedness.functionalDisabilities,
        emergencyContact: formData.emergencyPreparedness.emergencyContactName,
        emergencyPhone: formData.emergencyPreparedness.emergencyContactPhone,
        evacuationRelativeNameAndPhone:
          formData.emergencyPreparedness.evacuationRelativePhone,
        hotelNameAndPhone: formData.emergencyPreparedness.evacuationHotel,
        shelterLocation: formData.emergencyPreparedness.evacuationShelter,
        patientWithSpecialNeedShelterYes:
          formData.emergencyPreparedness.specialNeedsShelter,
        otherDescription: formData.emergencyPreparedness.evacuationOther,
        priorityLevel: formData.emergencyPreparedness.priorityLevel,
        clinicianSignature: formData.emergencyPreparedness.clinicianSignature,
        clinicianDate: formData.emergencyPreparedness.clinicianDate,

        // Functional disabilities checkboxes
        walkerOrCane:
          formData.emergencyPreparedness.functionalDisabilities?.includes(
            "walker/cane"
          ),
        wheelChair:
          formData.emergencyPreparedness.functionalDisabilities?.includes(
            "wheelchair"
          ),
        bedBound:
          formData.emergencyPreparedness.functionalDisabilities?.includes(
            "bedbound"
          ),
        hearingImparment:
          formData.emergencyPreparedness.functionalDisabilities?.includes(
            "hearing impairment"
          ),
        visualImparment:
          formData.emergencyPreparedness.functionalDisabilities?.includes(
            "visual impairment"
          ),
        mentalOrConginitiveImparment:
          formData.emergencyPreparedness.functionalDisabilities?.includes(
            "mental/cognitive impairment"
          ),

        // Medication Profile
        allergy: formData.medicationProfile.allergy,
        DX: formData.medicationProfile.dx,
        pharmacyName: formData.medicationProfile.pharmacy,
        pharmacyAddress: formData.medicationProfile.pharmacyAddress,
        pharmacyPhone: formData.medicationProfile.pharmacyPhone,
        HT: formData.medicationProfile.height,
        WT: formData.medicationProfile.weight,
        medicationProfileClinicianSignature:
          formData.medicationProfile.clinicianSignature,
        medicationProfileClinicianDate:
          formData.medicationProfile.clinicianDate,

        // Vaccine Questionnaire
        vaccineDate: formData.vaccineQuestionnaire.date,
        fluVaccineYes: formData.vaccineQuestionnaire.influenzaInterest,
        fluAgeGreater65: formData.vaccineQuestionnaire.age65Plus,
        fluAgeBetween50To64:
          formData.vaccineQuestionnaire.age50To64WithCondition,
        fluPersonal: formData.vaccineQuestionnaire.personalPreferenceInfluenza,
        fluOther: formData.vaccineQuestionnaire.otherInfluenza,
        fluOtherDesc: formData.vaccineQuestionnaire.otherInfluenza
          ? "Other reason specified"
          : "",
        fluRecentlyGot: formData.vaccineQuestionnaire.recentFluShot,
        fluVaccineDate: formData.vaccineQuestionnaire.recentFluShotDate,
        fluAllergicToEggs: formData.vaccineQuestionnaire.allergicToEggs,
        fluReactionToFluShot: formData.vaccineQuestionnaire.reactionToFluShot,

        pneumoniaVaccineYes: formData.vaccineQuestionnaire.pneumoniaInterest,
        pneumoniaAgeGreater65: formData.vaccineQuestionnaire.age65PlusPneumonia,
        pneumoniaChronicHealthProblem:
          formData.vaccineQuestionnaire.chronicHealthProblem,
        pneumoniaPersonal:
          formData.vaccineQuestionnaire.personalPreferencePneumonia,
        pneumoniaRecentlyGot:
          formData.vaccineQuestionnaire.receivedPneumoniaVaccine,
        pneumoniaVaccineDate:
          formData.vaccineQuestionnaire.pneumoniaVaccineDate,

        fluVaccineByAgencyNurse:
          formData.vaccineQuestionnaire.agencyNurseInfluenza,
        fluReferredToPhysician:
          formData.vaccineQuestionnaire.referPhysicianInfluenza,
        fluReferredToHealthDepartment:
          formData.vaccineQuestionnaire.healthDepartmentInfluenza,
        fluVaccinationArrangedAtHome:
          formData.vaccineQuestionnaire.homeVaccinationInfluenza,

        pneumoniaVaccineByAgencyNurse:
          formData.vaccineQuestionnaire.agencyNursePneumonia,
        pneumoniaReferredToPhysician:
          formData.vaccineQuestionnaire.referPhysicianPneumonia,
        pneumoniaReferredToHealthDepartment:
          formData.vaccineQuestionnaire.healthDepartmentPneumonia,
        pneumoniaVaccinationArrangedAtHome:
          formData.vaccineQuestionnaire.homeVaccinationPneumonia,

        fluVaccine: formData.vaccineQuestionnaire.vaccinatedInfluenza,
        pneumoniaVaccine: formData.vaccineQuestionnaire.vaccinatedPneumonia,
        vaccineAdminstrationDate:
          formData.vaccineQuestionnaire.administrationDate,
        vaccineSite: formData.vaccineQuestionnaire.site,
        vaccineManufacturer: formData.vaccineQuestionnaire.manufacturerLot,
        vaccineExpiryDate: formData.vaccineQuestionnaire.expiry,
        vaccineNurseSignature: formData.vaccineQuestionnaire.nurseSignature,
        vaccinePatientSignature: formData.vaccineQuestionnaire.patientSignature,

        fluOutcome: formData.vaccineQuestionnaire.followUpInfluenza,
        pneumoniaOutcome: formData.vaccineQuestionnaire.followUpPneumonia,
        outcomeDate: formData.vaccineQuestionnaire.followUpDate,
        vaccineRelatedReactionYes:
          formData.vaccineQuestionnaire.vaccineReaction,
        outcomeComment: formData.vaccineQuestionnaire.comment,
        nurseSignatureFollowUp:
          formData.vaccineQuestionnaire.nurseSignatureFollowUp,
        patientSignatureFollowUp:
          formData.vaccineQuestionnaire.patientSignatureFollowUp,

        // Pressure Ulcer Risk
        page11Date: formData.pressureUlcerRisk.date,
        physicalCondition: formData.pressureUlcerRisk.physicalCondition,
        mentalCondition: formData.pressureUlcerRisk.mentalCondition,
        activity: formData.pressureUlcerRisk.activity,
        mobility: formData.pressureUlcerRisk.mobility,
        incontinence: formData.pressureUlcerRisk.incontinence,
        pressureUlcerNurseSignature: formData.pressureUlcerRisk.nurseSignature,
        pressureUlcerNurseDate: formData.pressureUlcerRisk.nurseSignatureDate,
        nurseSignatureDate: formData.pressureUlcerRisk.nurseSignatureDate,

        // Pressure Ulcer Risk checkboxes
        physicalConditionValue1:
          formData.pressureUlcerRisk.physicalCondition === "Good",
        physicalConditionValue2:
          formData.pressureUlcerRisk.physicalCondition === "Fair",
        physicalConditionValue3:
          formData.pressureUlcerRisk.physicalCondition === "Poor",
        physicalConditionValue4:
          formData.pressureUlcerRisk.physicalCondition === "Very Bad",

        mentalConditionValue1:
          formData.pressureUlcerRisk.mentalCondition === "Alert",
        mentalConditionValue2:
          formData.pressureUlcerRisk.mentalCondition === "Apathetic",
        mentalConditionValue3:
          formData.pressureUlcerRisk.mentalCondition === "Confused",
        mentalConditionValue4:
          formData.pressureUlcerRisk.mentalCondition === "Stuporous",

        acitivityValue1: formData.pressureUlcerRisk.activity === "Ambulant",
        acitivityValue2:
          formData.pressureUlcerRisk.activity === "Walks with help",
        acitivityValue3: formData.pressureUlcerRisk.activity === "Chairbound",
        acitivityValue4: formData.pressureUlcerRisk.activity === "Bedfast",

        mobilityValue1: formData.pressureUlcerRisk.mobility === "Full",
        mobilityValue2:
          formData.pressureUlcerRisk.mobility === "Slightly impaired",
        mobilityValue3: formData.pressureUlcerRisk.mobility === "Very limited",
        mobilityValue4: formData.pressureUlcerRisk.mobility === "Immobile",

        incontinenceValue1: formData.pressureUlcerRisk.incontinence === "None",
        incontinenceValue2:
          formData.pressureUlcerRisk.incontinence === "Occasional",
        incontinenceValue3:
          formData.pressureUlcerRisk.incontinence === "Usually urinary",
        incontinenceValue4:
          formData.pressureUlcerRisk.incontinence === "Urinary and fecal",

        // Patient Rights Acknowledgement
        otherInstructions:
          formData.patientRightsAcknowledgement.otherInstructions,
        clinicalManager:
          formData.patientRightsAcknowledgement.clinicalManagerName,
        clinicalManagerContactInfo:
          formData.patientRightsAcknowledgement.clinicalManagerContact,
        patientRightsPatientSignature:
          formData.patientRightsAcknowledgement.patientSignature,
        patientRightsPatientDate:
          formData.patientRightsAcknowledgement.patientSignatureDate,
        representativeSignature:
          formData.patientRightsAcknowledgement.representativeSignature,
        representativeSignatureDate:
          formData.patientRightsAcknowledgement.representativeSignatureDate,
        agencyRepresentativeSignature:
          formData.patientRightsAcknowledgement.agencyRepresentativeSignature,
        agencyRepresentativeDate:
          formData.patientRightsAcknowledgement.agencyRepresentativeDate,

        // Beneficiary Elected Transfer
        homeHealthAgencyName:
          formData.beneficiaryElectedTransfer.previousHomeHealthAgency,
        homeHealthAgencyLocation:
          formData.beneficiaryElectedTransfer.previousAgencyLocation,
        beneficiaryPatientSignature:
          formData.beneficiaryElectedTransfer.patientSignature,
        beneficiaryPatientDate:
          formData.beneficiaryElectedTransfer.patientSignatureDate,
        witnessSignature: formData.beneficiaryElectedTransfer.witnessSignature,
        witnessSignatureDate:
          formData.beneficiaryElectedTransfer.witnessSignatureDate,

        // HMO Notice Acknowledgement
        hmoPatientSignature: formData.hmoNoticeAcknowledgement.patientSignature,
        hmoPatientDate: formData.hmoNoticeAcknowledgement.patientSignatureDate,
        hmoWitnessSignature: formData.hmoNoticeAcknowledgement.witnessSignature,
        hmoWitnessDate: formData.hmoNoticeAcknowledgement.witnessSignatureDate,
        hmoPatientName: formData.hmoNoticeAcknowledgement.patientName,

        // Medicare Secondary Payer Screening
        option1Yes:
          formData.medicareSecondaryPayerScreening.workersCompensation,
        option1No:
          !formData.medicareSecondaryPayerScreening.workersCompensation,
        workersCompensationDetails:
          formData.medicareSecondaryPayerScreening.workersCompensationDetails,
        option2Yes: formData.medicareSecondaryPayerScreening.activelyEmployed,
        option2No: !formData.medicareSecondaryPayerScreening.activelyEmployed,
        activeEmploymentDetails:
          formData.medicareSecondaryPayerScreening.activeEmploymentDetails,
        option3Yes: formData.medicareSecondaryPayerScreening.blackLungProgram,
        option3No: !formData.medicareSecondaryPayerScreening.blackLungProgram,
        blackLungDetails:
          formData.medicareSecondaryPayerScreening.blackLungDetails,
        option4Yes: formData.medicareSecondaryPayerScreening.autoAccident,
        option4No: !formData.medicareSecondaryPayerScreening.autoAccident,
        option5Yes:
          formData.medicareSecondaryPayerScreening.endStageRenalDisease,
        option5No:
          !formData.medicareSecondaryPayerScreening.endStageRenalDisease,
        option6Yes:
          formData.medicareSecondaryPayerScreening.esrdCoordinationPeriod,
        option6No:
          !formData.medicareSecondaryPayerScreening.esrdCoordinationPeriod,
        option7Yes: formData.medicareSecondaryPayerScreening.medicareDisability,
        option7No: !formData.medicareSecondaryPayerScreening.medicareDisability,
        option8Yes: formData.medicareSecondaryPayerScreening.groupHealthPlan,
        option8No: !formData.medicareSecondaryPayerScreening.groupHealthPlan,
        groupHealthDetails:
          formData.medicareSecondaryPayerScreening.groupHealthDetails,
        option9Yes: formData.medicareSecondaryPayerScreening.retired,
        option9No: !formData.medicareSecondaryPayerScreening.retired,
        retirementDetails:
          formData.medicareSecondaryPayerScreening.retirementDetails,
        insuranceCompanyName:
          formData.medicareSecondaryPayerScreening.insuranceCompany,
        insuredName: formData.medicareSecondaryPayerScreening.insuredName,
        policyNumber: formData.medicareSecondaryPayerScreening.policyNumber,
        employerName: formData.medicareSecondaryPayerScreening.employer,
        medicareNumber: formData.medicareSecondaryPayerScreening.medicareNumber,
        medicarePatientSignature:
          formData.medicareSecondaryPayerScreening.patientSignature,
        medicarePatientDate:
          formData.medicareSecondaryPayerScreening.patientSignatureDate,

        // Patient Advance Directives
        advanceDirectivesInfo:
          formData.patientAdvanceDirectives.requestMoreInformation,
        advanceDirectivesExecute:
          formData.patientAdvanceDirectives.wishToExecuteDirectives,
        advanceDirectivesLivingWill:
          formData.patientAdvanceDirectives.hasLivingWill,
        advanceDirectivesLivingWillYes:
          formData.patientAdvanceDirectives.hasLivingWill,
        advanceDirectivesCopyObtainedYes:
          formData.patientAdvanceDirectives.livingWillCopyObtained,
        patientWish: formData.patientAdvanceDirectives.livingWillWishes,
        durablePowerAttorney:
          formData.patientAdvanceDirectives.hasDurablePowerOfAttorney,
        durablePowerAttorneyYes:
          formData.patientAdvanceDirectives.hasDurablePowerOfAttorney,
        durablePowerAttorneyName:
          formData.patientAdvanceDirectives.powerOfAttorneyName,
        durablePowerAttorneyTelphone:
          formData.patientAdvanceDirectives.powerOfAttorneyPhone,
        haveAdvanceDirectives:
          formData.patientAdvanceDirectives.hasAdvanceDirective,
        haveAdvanceDirectivesYes:
          formData.patientAdvanceDirectives.hasAdvanceDirective,
        haveAdvanceDirectivesCopyYes:
          formData.patientAdvanceDirectives.advanceDirectiveCopyObtained,
        durablePowerAttorneyPatientWish:
          formData.patientAdvanceDirectives.advanceDirectiveWishes,
        advanceDirectivesPatientSignature:
          formData.patientAdvanceDirectives.patientSignature,
        advanceDirectivesWitnessSignature:
          formData.patientAdvanceDirectives.witnessSignature,
        advanceDirectivesPatientDate:
          formData.patientAdvanceDirectives.patientSignatureDate,
        advanceDirectivesWitnessDate:
          formData.patientAdvanceDirectives.witnessSignatureDate,

        // Notice of Medicare Non-Coverage
        patientNumber: formData.noticeOfMedicareNonCoverage.patientNumber,
        serviceEndDate: formData.noticeOfMedicareNonCoverage.effectiveDate,
        planContactInfo: formData.noticeOfMedicareNonCoverage.planContactInfo,
        additionalInfo: formData.noticeOfMedicareNonCoverage.additionalInfo,
        nonCoveragePatientSignature:
          formData.noticeOfMedicareNonCoverage.patientOrRepSignature,
        nonCoveragePatientDate:
          formData.noticeOfMedicareNonCoverage.signatureDate,
      };

      // Map medication data if exists
      const medicationRows = formData.medicationProfile.medications?.map(
        (med) => ({
          startDate: med.startDate
            ? new Date(med.startDate).toLocaleDateString()
            : new Date().toLocaleDateString(),
          cN: med.changeType || "C", // C for Current, N for New, DC for Discontinued
          medication: med.medication || "",
          doseRoute: med.doseRoute || "",
          frequency: med.frequency || "",
          purpose: med.purpose || "",
          cdcDate: med.changeDcDate
            ? new Date(med.changeDcDate).toLocaleDateString()
            : "Ongoing",
        })
      );

      // Show loading toast
      toast({
        title: "Generating PDF...",
        description: "Please wait while we generate your PDF document.",
      });

      // Call the API
      await generatePDF(
        {
          patientData,
          medicationRows:
            medicationRows && medicationRows.length > 0
              ? medicationRows
              : undefined,
        },
        patientData.patientName || "Patient"
      );

      // Success toast
      toast({
        title: "PDF Generated Successfully!",
        description:
          "Your E-SOC form has been generated and should start downloading.",
        duration: 5000,
      });
    } catch (error) {
      console.error("PDF Generation Error:", error);
      toast({
        title: "PDF Generation Failed",
        description:
          error instanceof Error
            ? error.message
            : "Failed to generate PDF. Please try again.",
        variant: "destructive",
        duration: 5000,
      });
    }
  };

  const validateAllPreviousSteps = (stepNumber: number) => {
    for (let i = 1; i < stepNumber; i++) {
      const tempData = { ...formData, currentStep: i };
      if (!validateStepByNumber(i, tempData)) {
        return false;
      }
    }
    return true;
  };

  const validateStepByNumber = (step: number, data: ESocFormData) => {
    switch (step) {
      case 1:
        const agreement = data.patientServiceAgreement;
        return !!(
          agreement.patientName &&
          agreement.ssNumber &&
          agreement.consentForCare &&
          agreement.releaseOfInformation &&
          agreement.financialAgreement &&
          agreement.patientSignature &&
          agreement.patientSignatureDate &&
          agreement.rnSignature &&
          agreement.rnSignatureDate
        );

      case 2:
        const rights = data.patientRightsAcknowledgement;
        return !!(
          rights.clinicalManagerName &&
          rights.clinicalManagerContact &&
          rights.patientSignature &&
          rights.patientSignatureDate &&
          rights.agencyRepresentativeSignature &&
          rights.agencyRepresentativeDate
        );

      case 3:
        const emergency = data.emergencyPreparedness;
        return !!(
          emergency.patientName &&
          emergency.socDate &&
          emergency.phoneNumber &&
          emergency.physician &&
          emergency.address &&
          emergency.city &&
          emergency.state &&
          emergency.zip &&
          emergency.primaryDx &&
          emergency.emergencyContactName &&
          emergency.emergencyContactPhone &&
          emergency.clinicianSignature &&
          emergency.clinicianDate
        );

      case 4:
        const medication = data.medicationProfile;
        return !!(
          medication.patientName &&
          medication.physician &&
          medication.dx &&
          medication.pharmacy &&
          medication.pharmacyAddress &&
          medication.pharmacyPhone &&
          medication.clinicianSignature &&
          medication.clinicianDate
        );

      case 5:
        const vaccine = data.vaccineQuestionnaire;
        return !!(vaccine.patientName && vaccine.date);

      case 6:
        const pressure = data.pressureUlcerRisk;
        return !!(
          pressure.patientName &&
          pressure.date &&
          pressure.physicalCondition &&
          pressure.mentalCondition &&
          pressure.activity &&
          pressure.mobility &&
          pressure.incontinence &&
          pressure.nurseSignature &&
          pressure.nurseSignatureDate
        );

      case 7:
        const transfer = data.beneficiaryElectedTransfer;
        return !!(
          transfer.previousHomeHealthAgency &&
          transfer.previousAgencyLocation &&
          transfer.patientSignature &&
          transfer.patientSignatureDate &&
          transfer.witnessSignature &&
          transfer.witnessSignatureDate
        );

      case 8:
        const hmo = data.hmoNoticeAcknowledgement;
        return !!(
          hmo.patientName &&
          hmo.patientSignature &&
          hmo.patientSignatureDate &&
          hmo.witnessSignature &&
          hmo.witnessSignatureDate
        );

      case 9:
        const medicare = data.medicareSecondaryPayerScreening;
        return !!(
          medicare.patientSignature &&
          medicare.patientSignatureDate &&
          medicare.medicareNumber
        );

      case 10:
        const directives = data.patientAdvanceDirectives;
        return !!(
          directives.patientSignature &&
          directives.patientSignatureDate &&
          directives.witnessSignature &&
          directives.witnessSignatureDate
        );

      case 11:
        const notice = data.noticeOfMedicareNonCoverage;
        return !!(
          notice.patientName &&
          notice.patientNumber &&
          notice.effectiveDate &&
          notice.patientOrRepSignature &&
          notice.signatureDate
        );

      default:
        return true;
    }
  };

  const validateStep = () => {
    return validateStepByNumber(formData.currentStep, formData);
  };

  const CurrentStepComponent = formSteps[formData.currentStep - 1]?.component;
  const progress = ((formData.currentStep - 1) / formSteps.length) * 100;
  const maxUnlockedStep = (() => {
    let max = 1;
    for (let i = 1; i <= formSteps.length; i++) {
      if (i === 1 || validateStepByNumber(i - 1, formData)) {
        max = i;
      } else {
        break;
      }
    }
    return max;
  })();

  if (formData.isComplete) {
    return (
      <div className="max-w-2xl mx-auto py-12">
        <Card className="p-8 text-center">
          <div className="mb-6">
            <div className="w-16 h-16 bg-success text-success-foreground rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Form Completed Successfully!
            </h2>
            <p className="text-muted-foreground mb-6">
              The E-SOC Paperwork has been completed and saved. You can now
              generate the PDF or make any necessary updates.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={handleGeneratePDF}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Download PDF
              </Button>
              <Button
                variant="outline"
                onClick={() =>
                  updateFormData({ isComplete: false, currentStep: 1 })
                }
              >
                Edit Form
              </Button>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto py-4 px-4 sm:py-6 sm:px-6 space-y-4 sm:space-y-6">
      <div className="bg-card rounded-lg border border-border p-4 sm:p-6">
        <div className="mb-4 sm:mb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-form-header mb-3 sm:mb-4">
            E-SOC Paperwork - Metropolitan Home Health Care
          </h1>

          <div className="space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm space-y-1 sm:space-y-0">
              <span className="text-muted-foreground">Form Progress</span>
              <span className="text-muted-foreground">
                {Math.round(progress)}% Complete
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>

        <Tabs
          value={`step-${formData.currentStep}`}
          onValueChange={(value) => {
            const stepNumber = parseInt(value.replace("step-", ""));
            updateFormData({ currentStep: stepNumber });
          }}
          className="w-full"
        >
          {/* Mobile Navigation Dropdown - visible on small screens */}
          <div className="block lg:hidden mb-6">
            <div className="bg-card border rounded-lg p-4">
              <h3 className="font-semibold text-base mb-3">
                E-SOC Forms Navigation
              </h3>
              <select
                value={`step-${formData.currentStep}`}
                onChange={(e) => {
                  const stepNumber = parseInt(
                    e.target.value.replace("step-", "")
                  );
                  updateFormData({ currentStep: stepNumber });
                }}
                className="w-full p-2 border rounded-md bg-background text-foreground"
              >
                {formSteps.map((step, index) => (
                  <option key={index + 1} value={`step-${index + 1}`}>
                    {index + 1}. {step.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Sidebar Navigation - hidden on mobile, visible on large screens */}
            <div className="hidden lg:block lg:w-80 lg:shrink-0">
              <div className="bg-card border rounded-lg p-4 sticky top-4">
                <h3 className="font-semibold text-lg mb-4">E-SOC Forms</h3>
                <TabsList className="flex flex-col h-auto bg-transparent space-y-1 w-full">
                  {formSteps.map((step, index) => (
                    <TabsTrigger
                      key={index + 1}
                      value={`step-${index + 1}`}
                      className="w-full justify-start text-left px-3 py-2 h-auto data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:bg-muted transition-colors"
                      disabled={false}
                    >
                      <span className="font-medium mr-2">{index + 1}.</span>
                      <span className="text-sm">{step.title}</span>
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 min-w-0 w-full lg:w-auto">
              {formSteps.map((step, index) => {
                const StepComponent = step.component;
                return (
                  <TabsContent
                    key={index + 1}
                    value={`step-${index + 1}`}
                    className="space-y-4 sm:space-y-6 mt-0"
                  >
                    <div className="mb-3 sm:mb-4">
                      <h2 className="text-lg sm:text-xl font-semibold text-foreground">
                        {step.title}
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        Step {index + 1} of {formSteps.length}
                      </p>
                    </div>

                    <StepComponent
                      data={formData}
                      updateData={updateFormData}
                      onNext={handleNext}
                      onPrevious={handlePrevious}
                      isFirst={index + 1 === 1}
                      isLast={index + 1 === formSteps.length}
                    />
                  </TabsContent>
                );
              })}
            </div>
          </div>
        </Tabs>
        <FormNavigation
          onNext={handleNext}
          onPrevious={handlePrevious}
          onSave={handleComplete}
          isFirst={formData.currentStep === 1}
          isLast={formData.currentStep === formSteps.length}
          canProceed={validateStep()}
          currentStep={formData.currentStep}
          totalSteps={formSteps.length}
        />
      </div>
    </div>
  );
};
