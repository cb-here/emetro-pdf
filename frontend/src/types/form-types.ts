// E-SOC Paperwork Form Types
export interface PatientServiceAgreement {
  patientName: string;
  ssNumber: string;
  consentForCare: boolean;
  releaseOfInformation: boolean;
  financialAgreement: boolean;
  receivedMedicareExplanation: boolean;
  patientRightsReceived: boolean;
  advanceDirectivesReceived: boolean;
  declineAdvanceDirective: boolean;
  provideMedicalPowerOfAttorney: boolean;
  provideLivingWill: boolean;
  photographicRelease: boolean;
  billingAlert: boolean;
  frequencyVerification: boolean;
  therapyAndSupplies: boolean;
  translatorAvailability: boolean;
  homeSafety: boolean;
  hipaaPrivacy: boolean;
  patientSignature: string;
  relationshipIfNotPatient: string;
  reasonUnableToSign: string;
  patientSignatureDate: Date | null;
  rnSignature: string;
  rnSignatureDate: Date | null;
}

export interface EmergencyPreparedness {
  patientName: string;
  socDate: Date | null;
  phoneNumber: string;
  physician: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  primaryDx: string;
  secondaryDx: string;
  dailyServices: boolean;
  dailyServicesDescription: string;
  oxygenFlowRate: string;
  oxygenHours: string;
  oxygenDevice: string;
  lifeSustainingInfusion: boolean;
  lifeSustainingDescription: string;
  otherIvTherapy: boolean;
  otherIvDescription: string;
  patientIndependent: boolean;
  ventilatorDependent: boolean;
  dialysis: boolean;
  dialysisDescription: string;
  tubeFeeding: boolean;
  tubeFeedingDescription: string;
  independentMedications: boolean;
  functionalDisabilities: string[];
  emergencyContactName: string;
  emergencyContactPhone: string;
  evacuationRelativePhone: string;
  evacuationHotel: string;
  evacuationShelter: string;
  specialNeedsShelter: boolean;
  evacuationOther: string;
  priorityLevel: string;
  clinicianSignature: string;
  clinicianDate: Date | null;
}

export interface MedicationEntry {
  startDate: Date | null;
  changeType: 'N' | 'C' | 'DC' | '';
  medication: string;
  doseRoute: string;
  frequency: string;
  purpose: string;
  changeDcDate: Date | null;
}

export interface MedicationProfile {
  patientName: string;
  physician: string;
  allergy: string;
  dx: string;
  pharmacy: string;
  pharmacyAddress: string;
  pharmacyPhone: string;
  height: string;
  weight: string;
  medications: MedicationEntry[];
  clinicianSignature: string;
  clinicianDate: Date | null;
}

export interface VaccineQuestionnaire {
  patientName: string;
  date: Date | null;
  influenzaInterest: boolean;
  age65Plus: boolean;
  age50To64WithCondition: boolean;
  personalPreferenceInfluenza: boolean;
  otherInfluenza: boolean;
  recentFluShot: boolean;
  recentFluShotDate: Date | null;
  allergicToEggs: boolean;
  reactionToFluShot: boolean;
  pneumoniaInterest: boolean;
  age65PlusPneumonia: boolean;
  chronicHealthProblem: boolean;
  personalPreferencePneumonia: boolean;
  receivedPneumoniaVaccine: boolean;
  pneumoniaVaccineDate: Date | null;
  // Implementation options for both vaccines
  agencyNurseInfluenza: boolean;
  referPhysicianInfluenza: boolean;
  healthDepartmentInfluenza: boolean;
  homeVaccinationInfluenza: boolean;
  agencyNursePneumonia: boolean;
  referPhysicianPneumonia: boolean;
  healthDepartmentPneumonia: boolean;
  homeVaccinationPneumonia: boolean;
  // Administration
  vaccinatedInfluenza: boolean;
  vaccinatedPneumonia: boolean;
  administrationDate: Date | null;
  site: string;
  manufacturerLot: string;
  expiry: Date | null;
  nurseSignature: string;
  patientSignature: string;
  // Follow-up
  followUpInfluenza: boolean;
  followUpPneumonia: boolean;
  followUpDate: Date | null;
  vaccineReaction: boolean;
  comment: string;
  nurseSignatureFollowUp: string;
  patientSignatureFollowUp: string;
}

export interface PressureUlcerRisk {
  patientName: string;
  date: Date | null;
  physicalCondition: 'Good' | 'Fair' | 'Poor' | 'Very Bad' | '';
  mentalCondition: 'Alert' | 'Apathetic' | 'Confused' | 'Stuporous' | '';
  activity: 'Ambulant' | 'Walks with help' | 'Chairbound' | 'Bedfast' | '';
  mobility: 'Full' | 'Slightly impaired' | 'Very limited' | 'Immobile' | '';
  incontinence: 'None' | 'Occasional' | 'Usually urinary' | 'Urinary and fecal' | '';
  nurseSignature: string;
  nurseSignatureDate: Date | null;
}

export interface PatientRightsAcknowledgement {
  otherInstructions: string;
  clinicalManagerName: string;
  clinicalManagerContact: string;
  patientSignature: string;
  patientSignatureDate: Date | null;
  representativeSignature: string;
  representativeSignatureDate: Date | null;
  agencyRepresentativeSignature: string;
  agencyRepresentativeDate: Date | null;
}

export interface BeneficiaryElectedTransfer {
  previousHomeHealthAgency: string;
  previousAgencyLocation: string;
  patientSignature: string;
  patientSignatureDate: Date | null;
  witnessSignature: string;
  witnessSignatureDate: Date | null;
}

export interface HmoNoticeAcknowledgement {
  patientSignature: string;
  patientSignatureDate: Date | null;
  witnessSignature: string;
  witnessSignatureDate: Date | null;
  patientName: string;
}

export interface MedicareSecondaryPayerScreening {
  workersCompensation: boolean;
  workersCompensationDetails: string;
  activelyEmployed: boolean;
  activeEmploymentDetails: string;
  blackLungProgram: boolean;
  blackLungDetails: string;
  autoAccident: boolean;
  endStageRenalDisease: boolean;
  esrdCoordinationPeriod: boolean;
  medicareDisability: boolean;
  groupHealthPlan: boolean;
  groupHealthDetails: string;
  retired: boolean;
  retirementDetails: string;
  insuranceCompany: string;
  insuredName: string;
  policyNumber: string;
  employer: string;
  patientSignature: string;
  patientSignatureDate: Date | null;
  medicareNumber: string;
}

export interface PatientAdvanceDirectives {
  requestMoreInformation: boolean;
  wishToExecuteDirectives: boolean;
  hasLivingWill: boolean;
  livingWillCopyObtained: boolean;
  livingWillWishes: string;
  hasDurablePowerOfAttorney: boolean;
  powerOfAttorneyName: string;
  powerOfAttorneyPhone: string;
  hasAdvanceDirective: boolean;
  advanceDirectiveCopyObtained: boolean;
  advanceDirectiveWishes: string;
  patientSignature: string;
  witnessSignature: string;
  patientSignatureDate: Date | null;
  witnessSignatureDate: Date | null;
}

export interface NoticeOfMedicareNonCoverage {
  patientName: string;
  patientNumber: string;
  effectiveDate: Date | null;
  planContactInfo: string;
  additionalInfo: string;
  patientOrRepSignature: string;
  signatureDate: Date | null;
}

export interface ESocFormData {
  patientServiceAgreement: PatientServiceAgreement;
  patientRightsAcknowledgement: PatientRightsAcknowledgement;
  emergencyPreparedness: EmergencyPreparedness;
  medicationProfile: MedicationProfile;
  vaccineQuestionnaire: VaccineQuestionnaire;
  pressureUlcerRisk: PressureUlcerRisk;
  beneficiaryElectedTransfer: BeneficiaryElectedTransfer;
  hmoNoticeAcknowledgement: HmoNoticeAcknowledgement;
  medicareSecondaryPayerScreening: MedicareSecondaryPayerScreening;
  patientAdvanceDirectives: PatientAdvanceDirectives;
  noticeOfMedicareNonCoverage: NoticeOfMedicareNonCoverage;
  currentStep: number;
  isComplete: boolean;
}

export interface FormStepProps {
  data: ESocFormData;
  updateData: (updates: Partial<ESocFormData>) => void;
  onNext: () => void;
  onPrevious: () => void;
  isFirst: boolean;
  isLast: boolean;
}