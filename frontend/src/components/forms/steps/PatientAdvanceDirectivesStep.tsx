import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormField } from "../FormField";
import { DateField } from "../DateField";
import { SignatureField } from "../SignatureField";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FormStepProps } from "@/types/form-types";

export const PatientAdvanceDirectivesStep = ({ data, updateData }: FormStepProps) => {
  const directives = data.patientAdvanceDirectives;

  const updateDirectivesField = (field: string, value: any) => {
    updateData({
      patientAdvanceDirectives: {
        ...directives,
        [field]: value
      }
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-form-header mb-6">
          Patient Advance Directives Statement
        </h2>
        <p className="text-sm text-muted-foreground mb-6">
          Information about patient's advance directives and healthcare decisions
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Advance Directives Interest</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="requestMoreInfo"
              checked={directives.requestMoreInformation}
              onCheckedChange={(checked) => updateDirectivesField('requestMoreInformation', checked)}
            />
            <Label htmlFor="requestMoreInfo">Request more information regarding advance directives</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="wishToExecute"
              checked={directives.wishToExecuteDirectives}
              onCheckedChange={(checked) => updateDirectivesField('wishToExecuteDirectives', checked)}
            />
            <Label htmlFor="wishToExecute">Wish to execute one or more advance directives</Label>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Living Will</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <FormField label="I have a living will" required>
            <RadioGroup
              value={directives.hasLivingWill ? "yes" : "no"}
              onValueChange={(value) => updateDirectivesField('hasLivingWill', value === "yes")}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="living-will-yes" />
                <Label htmlFor="living-will-yes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="living-will-no" />
                <Label htmlFor="living-will-no">No</Label>
              </div>
            </RadioGroup>
          </FormField>

          {directives.hasLivingWill && (
            <>
              <FormField label="Living will copy obtained">
                <RadioGroup
                  value={directives.livingWillCopyObtained ? "yes" : "no"}
                  onValueChange={(value) => updateDirectivesField('livingWillCopyObtained', value === "yes")}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="living-will-copy-yes" />
                    <Label htmlFor="living-will-copy-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="living-will-copy-no" />
                    <Label htmlFor="living-will-copy-no">No</Label>
                  </div>
                </RadioGroup>
              </FormField>

              {!directives.livingWillCopyObtained && (
                <FormField label="Describe wishes if no copy available">
                  <Textarea
                    value={directives.livingWillWishes}
                    onChange={(e) => updateDirectivesField('livingWillWishes', e.target.value)}
                    placeholder="Description of patient's wishes when no living-will copy is provided"
                    rows={3}
                  />
                </FormField>
              )}
            </>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Durable Power of Attorney</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <FormField label="I have a durable power of attorney" required>
            <RadioGroup
              value={directives.hasDurablePowerOfAttorney ? "yes" : "no"}
              onValueChange={(value) => updateDirectivesField('hasDurablePowerOfAttorney', value === "yes")}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="power-attorney-yes" />
                <Label htmlFor="power-attorney-yes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="power-attorney-no" />
                <Label htmlFor="power-attorney-no">No</Label>
              </div>
            </RadioGroup>
          </FormField>

          {directives.hasDurablePowerOfAttorney && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField label="Durable Power of Attorney - Name" required>
                <Input
                  value={directives.powerOfAttorneyName}
                  onChange={(e) => updateDirectivesField('powerOfAttorneyName', e.target.value)}
                  placeholder="Name of durable power of attorney holder"
                />
              </FormField>

              <FormField label="Durable Power of Attorney - Telephone" required>
                <Input
                  value={directives.powerOfAttorneyPhone}
                  onChange={(e) => updateDirectivesField('powerOfAttorneyPhone', e.target.value)}
                  placeholder="Telephone number"
                />
              </FormField>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Other Advance Directive</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <FormField label="I have an advance directive" required>
            <RadioGroup
              value={directives.hasAdvanceDirective ? "yes" : "no"}
              onValueChange={(value) => updateDirectivesField('hasAdvanceDirective', value === "yes")}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="advance-directive-yes" />
                <Label htmlFor="advance-directive-yes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="advance-directive-no" />
                <Label htmlFor="advance-directive-no">No</Label>
              </div>
            </RadioGroup>
          </FormField>

          {directives.hasAdvanceDirective && (
            <>
              <FormField label="Advance directive copy obtained">
                <RadioGroup
                  value={directives.advanceDirectiveCopyObtained ? "yes" : "no"}
                  onValueChange={(value) => updateDirectivesField('advanceDirectiveCopyObtained', value === "yes")}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="advance-copy-yes" />
                    <Label htmlFor="advance-copy-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="advance-copy-no" />
                    <Label htmlFor="advance-copy-no">No</Label>
                  </div>
                </RadioGroup>
              </FormField>

              {!directives.advanceDirectiveCopyObtained && (
                <FormField label="Describe wishes if no copy available">
                  <Textarea
                    value={directives.advanceDirectiveWishes}
                    onChange={(e) => updateDirectivesField('advanceDirectiveWishes', e.target.value)}
                    placeholder="Description of patient's wishes when no copy is provided"
                    rows={3}
                  />
                </FormField>
              )}
            </>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Acknowledgement Signatures</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <FormField label="Patient Signature" required>
                <SignatureField
                  value={directives.patientSignature}
                  onChange={(signature) => updateDirectivesField('patientSignature', signature)}
                />
              </FormField>
              
              <FormField label="Patient Signature Date" required>
                <DateField
                  value={directives.patientSignatureDate}
                  onChange={(date) => updateDirectivesField('patientSignatureDate', date)}
                />
              </FormField>
            </div>

            <div className="space-y-4">
              <FormField label="Witness Signature" required>
                <SignatureField
                  value={directives.witnessSignature}
                  onChange={(signature) => updateDirectivesField('witnessSignature', signature)}
                />
              </FormField>
              
              <FormField label="Witness Signature Date" required>
                <DateField
                  value={directives.witnessSignatureDate}
                  onChange={(date) => updateDirectivesField('witnessSignatureDate', date)}
                />
              </FormField>
            </div>
          </div>

          <div className="bg-muted p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">
              Patient acknowledges review of rights/responsibilities and advance directive information. The patient has been informed about their right to make healthcare decisions and the availability of advance directive documents.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};