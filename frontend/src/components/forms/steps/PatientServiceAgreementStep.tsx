import { FormField } from "@/components/forms/FormField";
import { DateField } from "@/components/forms/DateField";
import { SignatureField } from "@/components/forms/SignatureField";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { FormStepProps } from "@/types/form-types";

export const PatientServiceAgreementStep = ({ 
  data, 
  updateData 
}: FormStepProps) => {
  const updateAgreement = (field: string, value: any) => {
    updateData({
      patientServiceAgreement: {
        ...data.patientServiceAgreement,
        [field]: value
      }
    });
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="form-section">
        <h2 className="form-header">Patient Service Agreement</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          <FormField label="Patient Name" required>
            <Input
              value={data.patientServiceAgreement.patientName}
              onChange={(e) => updateAgreement('patientName', e.target.value)}
              placeholder="Enter patient's full name"
              className="w-full"
            />
          </FormField>

          <FormField label="Social Security Number" required>
            <Input
              value={data.patientServiceAgreement.ssNumber}
              onChange={(e) => updateAgreement('ssNumber', e.target.value)}
              placeholder="XXX-XX-XXXX"
              className="w-full"
            />
          </FormField>
        </div>
      </div>

      <div className="form-section">
        <h3 className="form-header">Consent & Authorizations</h3>
        
        <div className="grid grid-cols-1 gap-3 sm:gap-4">
          <div className="flex items-start space-x-3 p-3 rounded-lg border bg-muted/50">
            <Checkbox 
              checked={data.patientServiceAgreement.consentForCare}
              onCheckedChange={(checked) => updateAgreement('consentForCare', !!checked)}
              id="consentForCare"
              className="mt-0.5 shrink-0"
            />
            <label htmlFor="consentForCare" className="text-sm leading-relaxed cursor-pointer">
              <span className="required">*</span> I authorize Metropolitan Home Health Care to perform necessary treatments as prescribed by my physician.
            </label>
          </div>

          <div className="flex items-start space-x-3 p-3 rounded-lg border bg-muted/50">
            <Checkbox 
              checked={data.patientServiceAgreement.releaseOfInformation}
              onCheckedChange={(checked) => updateAgreement('releaseOfInformation', !!checked)}
              id="releaseOfInformation"
              className="mt-0.5 shrink-0"
            />
            <label htmlFor="releaseOfInformation" className="text-sm leading-relaxed cursor-pointer">
              <span className="required">*</span> I authorize the release of medical/other information to Metropolitan Home Health Care & Medicare.
            </label>
          </div>

          <div className="flex items-start space-x-3 p-3 rounded-lg border bg-muted/50">
            <Checkbox 
              checked={data.patientServiceAgreement.financialAgreement}
              onCheckedChange={(checked) => updateAgreement('financialAgreement', !!checked)}
              id="financialAgreement"
              className="mt-0.5 shrink-0"
            />
            <label htmlFor="financialAgreement" className="text-sm leading-relaxed cursor-pointer">
              <span className="required">*</span> I assign Medicare/Public Aid benefits directly to agency.
            </label>
          </div>

          <div className="flex items-start space-x-3">
            <Checkbox 
              checked={data.patientServiceAgreement.receivedMedicareExplanation}
              onCheckedChange={(checked) => updateAgreement('receivedMedicareExplanation', !!checked)}
              id="receivedMedicareExplanation"
            />
            <label htmlFor="receivedMedicareExplanation" className="text-sm leading-5">
              I have received and acknowledge the Medicare explanation of patient fees.
            </label>
          </div>

          <div className="flex items-start space-x-3">
            <Checkbox 
              checked={data.patientServiceAgreement.patientRightsReceived}
              onCheckedChange={(checked) => updateAgreement('patientRightsReceived', !!checked)}
              id="patientRightsReceived"
            />
            <label htmlFor="patientRightsReceived" className="text-sm leading-5">
              I confirm receipt of Patient's Bill of Rights and responsibilities.
            </label>
          </div>

          <div className="flex items-start space-x-3">
            <Checkbox 
              checked={data.patientServiceAgreement.advanceDirectivesReceived}
              onCheckedChange={(checked) => updateAgreement('advanceDirectivesReceived', !!checked)}
              id="advanceDirectivesReceived"
            />
            <label htmlFor="advanceDirectivesReceived" className="text-sm leading-5">
              I have been informed about advance directives.
            </label>
          </div>

          <div className="flex items-start space-x-3">
            <Checkbox 
              checked={data.patientServiceAgreement.declineAdvanceDirective}
              onCheckedChange={(checked) => updateAgreement('declineAdvanceDirective', !!checked)}
              id="declineAdvanceDirective"
            />
            <label htmlFor="declineAdvanceDirective" className="text-sm leading-5">
              I decline to have an advance directive.
            </label>
          </div>

          <div className="flex items-start space-x-3">
            <Checkbox 
              checked={data.patientServiceAgreement.provideMedicalPowerOfAttorney}
              onCheckedChange={(checked) => updateAgreement('provideMedicalPowerOfAttorney', !!checked)}
              id="provideMedicalPowerOfAttorney"
            />
            <label htmlFor="provideMedicalPowerOfAttorney" className="text-sm leading-5">
              I will provide a copy of medical power of attorney.
            </label>
          </div>

          <div className="flex items-start space-x-3">
            <Checkbox 
              checked={data.patientServiceAgreement.provideLivingWill}
              onCheckedChange={(checked) => updateAgreement('provideLivingWill', !!checked)}
              id="provideLivingWill"
            />
            <label htmlFor="provideLivingWill" className="text-sm leading-5">
              I will provide a copy of living will.
            </label>
          </div>

          <div className="flex items-start space-x-3">
            <Checkbox 
              checked={data.patientServiceAgreement.photographicRelease}
              onCheckedChange={(checked) => updateAgreement('photographicRelease', !!checked)}
              id="photographicRelease"
            />
            <label htmlFor="photographicRelease" className="text-sm leading-5">
              I authorize the agency to take and keep confidential patient photographs.
            </label>
          </div>

          <div className="flex items-start space-x-3">
            <Checkbox 
              checked={data.patientServiceAgreement.billingAlert}
              onCheckedChange={(checked) => updateAgreement('billingAlert', !!checked)}
              id="billingAlert"
            />
            <label htmlFor="billingAlert" className="text-sm leading-5">
              I certify that no other home health agency is providing services.
            </label>
          </div>

          <div className="flex items-start space-x-3">
            <Checkbox 
              checked={data.patientServiceAgreement.frequencyVerification}
              onCheckedChange={(checked) => updateAgreement('frequencyVerification', !!checked)}
              id="frequencyVerification"
            />
            <label htmlFor="frequencyVerification" className="text-sm leading-5">
              I acknowledge written verification of type, frequency and duration of disciplines in the plan of care.
            </label>
          </div>

          <div className="flex items-start space-x-3">
            <Checkbox 
              checked={data.patientServiceAgreement.therapyAndSupplies}
              onCheckedChange={(checked) => updateAgreement('therapyAndSupplies', !!checked)}
              id="therapyAndSupplies"
            />
            <label htmlFor="therapyAndSupplies" className="text-sm leading-5">
              For Medicare patients - I acknowledge understanding of therapy/medical supply provisions.
            </label>
          </div>

          <div className="flex items-start space-x-3">
            <Checkbox 
              checked={data.patientServiceAgreement.translatorAvailability}
              onCheckedChange={(checked) => updateAgreement('translatorAvailability', !!checked)}
              id="translatorAvailability"
            />
            <label htmlFor="translatorAvailability" className="text-sm leading-5">
              I confirm receipt of translator/interpreter availability notice.
            </label>
          </div>

          <div className="flex items-start space-x-3">
            <Checkbox 
              checked={data.patientServiceAgreement.homeSafety}
              onCheckedChange={(checked) => updateAgreement('homeSafety', !!checked)}
              id="homeSafety"
            />
            <label htmlFor="homeSafety" className="text-sm leading-5">
              I acknowledge receipt and understanding of basic home safety instructions.
            </label>
          </div>

          <div className="flex items-start space-x-3">
            <Checkbox 
              checked={data.patientServiceAgreement.hipaaPrivacy}
              onCheckedChange={(checked) => updateAgreement('hipaaPrivacy', !!checked)}
              id="hipaaPrivacy"
            />
            <label htmlFor="hipaaPrivacy" className="text-sm leading-5">
              I acknowledge receipt of HIPAA privacy notice.
            </label>
          </div>
        </div>
      </div>

      <div className="form-section">
        <h3 className="form-header">Signatures</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <div className="space-y-3 sm:space-y-4">
            <FormField label="Patient/Guardian Signature" required>
              <SignatureField
                value={data.patientServiceAgreement.patientSignature}
                onChange={(signature) => updateAgreement('patientSignature', signature)}
                placeholder="Patient or guardian signature"
              />
            </FormField>

            <FormField label="Relationship (if not patient)">
              <Input
                value={data.patientServiceAgreement.relationshipIfNotPatient}
                onChange={(e) => updateAgreement('relationshipIfNotPatient', e.target.value)}
                placeholder="Relationship to patient"
              />
            </FormField>

            <FormField label="Reason patient unable to sign">
              <Textarea
                value={data.patientServiceAgreement.reasonUnableToSign}
                onChange={(e) => updateAgreement('reasonUnableToSign', e.target.value)}
                placeholder="Describe why patient could not sign"
                rows={2}
              />
            </FormField>

            <FormField label="Patient Signature Date" required>
              <DateField
                value={data.patientServiceAgreement.patientSignatureDate}
                onChange={(date) => updateAgreement('patientSignatureDate', date)}
              />
            </FormField>
          </div>

          <div className="space-y-3 sm:space-y-4">
            <FormField label="RN Signature" required>
              <SignatureField
                value={data.patientServiceAgreement.rnSignature}
                onChange={(signature) => updateAgreement('rnSignature', signature)}
                placeholder="Registered nurse signature"
              />
            </FormField>

            <FormField label="RN Signature Date" required>
              <DateField
                value={data.patientServiceAgreement.rnSignatureDate}
                onChange={(date) => updateAgreement('rnSignatureDate', date)}
              />
            </FormField>
          </div>
        </div>
      </div>
    </div>
  );
};