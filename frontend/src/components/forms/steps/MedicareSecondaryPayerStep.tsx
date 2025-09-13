import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormField } from "../FormField";
import { DateField } from "../DateField";
import { SignatureField } from "../SignatureField";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FormStepProps } from "@/types/form-types";

export const MedicareSecondaryPayerStep = ({ data, updateData }: FormStepProps) => {
  const medicare = data.medicareSecondaryPayerScreening;

  const updateMedicareField = (field: string, value: any) => {
    updateData({
      medicareSecondaryPayerScreening: {
        ...medicare,
        [field]: value
      }
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-form-header mb-6">
          Medicare Secondary Payer Screening Form
        </h2>
        <p className="text-sm text-muted-foreground mb-6">
          Please answer all questions to determine Medicare coverage priority
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Screening Questions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <FormField label="1. Is this illness/injury covered by Worker's Compensation?" required>
            <RadioGroup
              value={medicare.workersCompensation ? "yes" : "no"}
              onValueChange={(value) => updateMedicareField('workersCompensation', value === "yes")}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="workers-comp-yes" />
                <Label htmlFor="workers-comp-yes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="workers-comp-no" />
                <Label htmlFor="workers-comp-no">No</Label>
              </div>
            </RadioGroup>
            {medicare.workersCompensation && (
              <Textarea
                value={medicare.workersCompensationDetails}
                onChange={(e) => updateMedicareField('workersCompensationDetails', e.target.value)}
                placeholder="Enter employer's name, address & claim number"
                rows={2}
                className="mt-2"
              />
            )}
          </FormField>

          <FormField label="2. Are you or your spouse actively employed?" required>
            <RadioGroup
              value={medicare.activelyEmployed ? "yes" : "no"}
              onValueChange={(value) => updateMedicareField('activelyEmployed', value === "yes")}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="employed-yes" />
                <Label htmlFor="employed-yes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="employed-no" />
                <Label htmlFor="employed-no">No</Label>
              </div>
            </RadioGroup>
            {medicare.activelyEmployed && (
              <Textarea
                value={medicare.activeEmploymentDetails}
                onChange={(e) => updateMedicareField('activeEmploymentDetails', e.target.value)}
                placeholder="Enter group health insurance information"
                rows={2}
                className="mt-2"
              />
            )}
          </FormField>

          <FormField label="3. Is this illness covered under the Federal Black Lung Program?" required>
            <RadioGroup
              value={medicare.blackLungProgram ? "yes" : "no"}
              onValueChange={(value) => updateMedicareField('blackLungProgram', value === "yes")}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="black-lung-yes" />
                <Label htmlFor="black-lung-yes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="black-lung-no" />
                <Label htmlFor="black-lung-no">No</Label>
              </div>
            </RadioGroup>
            {medicare.blackLungProgram && (
              <Textarea
                value={medicare.blackLungDetails}
                onChange={(e) => updateMedicareField('blackLungDetails', e.target.value)}
                placeholder="Enter billing address"
                rows={2}
                className="mt-2"
              />
            )}
          </FormField>

          <FormField label="4. Is this illness/injury due to an auto accident?" required>
            <RadioGroup
              value={medicare.autoAccident ? "yes" : "no"}
              onValueChange={(value) => updateMedicareField('autoAccident', value === "yes")}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="auto-yes" />
                <Label htmlFor="auto-yes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="auto-no" />
                <Label htmlFor="auto-no">No</Label>
              </div>
            </RadioGroup>
          </FormField>

          <FormField label="5. Are you entitled to Medicare solely on the basis of End Stage Renal Disease?" required>
            <RadioGroup
              value={medicare.endStageRenalDisease ? "yes" : "no"}
              onValueChange={(value) => updateMedicareField('endStageRenalDisease', value === "yes")}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="esrd-yes" />
                <Label htmlFor="esrd-yes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="esrd-no" />
                <Label htmlFor="esrd-no">No</Label>
              </div>
            </RadioGroup>
          </FormField>

          {medicare.endStageRenalDisease && (
            <FormField label="6. Have you completed the End Stage Renal Disease coordination period?" required>
              <RadioGroup
                value={medicare.esrdCoordinationPeriod ? "yes" : "no"}
                onValueChange={(value) => updateMedicareField('esrdCoordinationPeriod', value === "yes")}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="esrd-coord-yes" />
                  <Label htmlFor="esrd-coord-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="esrd-coord-no" />
                  <Label htmlFor="esrd-coord-no">No</Label>
                </div>
              </RadioGroup>
            </FormField>
          )}

          <FormField label="7. Are you entitled to Medicare due to disability?" required>
            <RadioGroup
              value={medicare.medicareDisability ? "yes" : "no"}
              onValueChange={(value) => updateMedicareField('medicareDisability', value === "yes")}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="disability-yes" />
                <Label htmlFor="disability-yes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="disability-no" />
                <Label htmlFor="disability-no">No</Label>
              </div>
            </RadioGroup>
          </FormField>

          <FormField label="8. Are you covered by a group health plan?" required>
            <RadioGroup
              value={medicare.groupHealthPlan ? "yes" : "no"}
              onValueChange={(value) => updateMedicareField('groupHealthPlan', value === "yes")}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="group-health-yes" />
                <Label htmlFor="group-health-yes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="group-health-no" />
                <Label htmlFor="group-health-no">No</Label>
              </div>
            </RadioGroup>
            {medicare.groupHealthPlan && (
              <Textarea
                value={medicare.groupHealthDetails}
                onChange={(e) => updateMedicareField('groupHealthDetails', e.target.value)}
                placeholder="Enter insurance information"
                rows={2}
                className="mt-2"
              />
            )}
          </FormField>

          <FormField label="9. Are you or your spouse retired?" required>
            <RadioGroup
              value={medicare.retired ? "yes" : "no"}
              onValueChange={(value) => updateMedicareField('retired', value === "yes")}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="retired-yes" />
                <Label htmlFor="retired-yes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="retired-no" />
                <Label htmlFor="retired-no">No</Label>
              </div>
            </RadioGroup>
            {medicare.retired && (
              <Textarea
                value={medicare.retirementDetails}
                onChange={(e) => updateMedicareField('retirementDetails', e.target.value)}
                placeholder="Record retirement dates for patient and spouse"
                rows={2}
                className="mt-2"
              />
            )}
          </FormField>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Insurance Information (Section 10)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField label="Name of Insurance Company">
              <Input
                value={medicare.insuranceCompany}
                onChange={(e) => updateMedicareField('insuranceCompany', e.target.value)}
                placeholder="Insurance company name"
              />
            </FormField>

            <FormField label="Insured Name">
              <Input
                value={medicare.insuredName}
                onChange={(e) => updateMedicareField('insuredName', e.target.value)}
                placeholder="Name of insured individual"
              />
            </FormField>

            <FormField label="Policy Number">
              <Input
                value={medicare.policyNumber}
                onChange={(e) => updateMedicareField('policyNumber', e.target.value)}
                placeholder="Insurance policy number"
              />
            </FormField>

            <FormField label="Employer">
              <Input
                value={medicare.employer}
                onChange={(e) => updateMedicareField('employer', e.target.value)}
                placeholder="Employer name of insured"
              />
            </FormField>

            <FormField label="Medicare Number">
              <Input
                value={medicare.medicareNumber}
                onChange={(e) => updateMedicareField('medicareNumber', e.target.value)}
                placeholder="Patient's Medicare number"
              />
            </FormField>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Patient Certification</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField label="Patient Signature" required>
              <SignatureField
                value={medicare.patientSignature}
                onChange={(signature) => updateMedicareField('patientSignature', signature)}
              />
            </FormField>
            
            <FormField label="Patient Signature Date" required>
              <DateField
                value={medicare.patientSignatureDate}
                onChange={(date) => updateMedicareField('patientSignatureDate', date)}
              />
            </FormField>
          </div>
          
          <div className="bg-muted p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">
              I certify that the information provided above is accurate to the best of my knowledge and understand that this information will be used to determine Medicare coverage priority.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};