import { FormField } from "@/components/forms/FormField";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SignatureField } from "@/components/forms/SignatureField";
import { DateField } from "@/components/forms/DateField";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormStepProps } from "@/types/form-types";

export const PatientRightsAcknowledgementStep = ({ data, updateData }: FormStepProps) => {
  const handleInputChange = (field: string, value: string | Date | null) => {
    updateData({
      patientRightsAcknowledgement: {
        ...data.patientRightsAcknowledgement,
        [field]: value,
      },
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-form-header">Patient Rights/Responsibilities Acknowledgement</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <FormField label="Other Pertinent Instructions Related to Care">
            <Textarea
              value={data.patientRightsAcknowledgement.otherInstructions}
              onChange={(e) => handleInputChange('otherInstructions', e.target.value)}
              placeholder="Enter any additional instructions related to patient care..."
              className="min-h-[100px]"
            />
          </FormField>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="Name of Clinical Manager" required>
              <Input
                value={data.patientRightsAcknowledgement.clinicalManagerName}
                onChange={(e) => handleInputChange('clinicalManagerName', e.target.value)}
                placeholder="Enter clinical manager name"
              />
            </FormField>

            <FormField label="Clinical Manager Contact Information" required>
              <Input
                value={data.patientRightsAcknowledgement.clinicalManagerContact}
                onChange={(e) => handleInputChange('clinicalManagerContact', e.target.value)}
                placeholder="Enter contact information"
              />
            </FormField>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-form-section">
            Acknowledgement Statement
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            I acknowledge that I have received a copy of the notice of Rights/Responsibilities and Transfer/Discharge Criteria.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField label="Patient Signature" required>
              <SignatureField
                value={data.patientRightsAcknowledgement.patientSignature}
                onChange={(signature) => handleInputChange('patientSignature', signature)}
                placeholder="Patient signature"
              />
            </FormField>

            <FormField label="Patient Signature Date" required>
              <DateField
                value={data.patientRightsAcknowledgement.patientSignatureDate}
                onChange={(date) => handleInputChange('patientSignatureDate', date)}
              />
            </FormField>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField label="Representative Signature">
              <SignatureField
                value={data.patientRightsAcknowledgement.representativeSignature}
                onChange={(signature) => handleInputChange('representativeSignature', signature)}
                placeholder="Representative signature (if applicable)"
              />
            </FormField>

            <FormField label="Representative Signature Date">
              <DateField
                value={data.patientRightsAcknowledgement.representativeSignatureDate}
                onChange={(date) => handleInputChange('representativeSignatureDate', date)}
              />
            </FormField>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField label="Agency Representative Signature" required>
              <SignatureField
                value={data.patientRightsAcknowledgement.agencyRepresentativeSignature}
                onChange={(signature) => handleInputChange('agencyRepresentativeSignature', signature)}
                placeholder="Agency representative signature"
              />
            </FormField>

            <FormField label="Agency Representative Date" required>
              <DateField
                value={data.patientRightsAcknowledgement.agencyRepresentativeDate}
                onChange={(date) => handleInputChange('agencyRepresentativeDate', date)}
              />
            </FormField>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};