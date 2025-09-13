import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormField } from "../FormField";
import { DateField } from "../DateField";
import { SignatureField } from "../SignatureField";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { FormStepProps } from "@/types/form-types";

export const PressureUlcerRiskStep = ({ data, updateData }: FormStepProps) => {
  const pressure = data.pressureUlcerRisk;

  const updatePressureField = (field: string, value: any) => {
    updateData({
      pressureUlcerRisk: {
        ...pressure,
        [field]: value
      }
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-form-header mb-6">
          Skin Conditions / Pressure Ulcer/Injury Risk Assessment
        </h2>
        <p className="text-sm text-muted-foreground mb-6">
          Norton Pressure Sore Risk Assessment Scale
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Patient Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField label="Patient Name" required>
              <Input
                value={pressure.patientName}
                onChange={(e) => updatePressureField('patientName', e.target.value)}
                placeholder="Enter patient's full name"
              />
            </FormField>
            
            <FormField label="Assessment Date" required>
              <DateField
                value={pressure.date}
                onChange={(date) => updatePressureField('date', date)}
              />
            </FormField>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Risk Assessment</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <FormField label="Physical Condition" required>
            <RadioGroup
              value={pressure.physicalCondition}
              onValueChange={(value) => updatePressureField('physicalCondition', value)}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Good" id="physical-good" />
                  <Label htmlFor="physical-good">Good (Score: 4)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Fair" id="physical-fair" />
                  <Label htmlFor="physical-fair">Fair (Score: 3)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Poor" id="physical-poor" />
                  <Label htmlFor="physical-poor">Poor (Score: 2)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Very Bad" id="physical-very-bad" />
                  <Label htmlFor="physical-very-bad">Very Bad (Score: 1)</Label>
                </div>
              </div>
            </RadioGroup>
          </FormField>

          <FormField label="Mental Condition" required>
            <RadioGroup
              value={pressure.mentalCondition}
              onValueChange={(value) => updatePressureField('mentalCondition', value)}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Alert" id="mental-alert" />
                  <Label htmlFor="mental-alert">Alert (Score: 4)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Apathetic" id="mental-apathetic" />
                  <Label htmlFor="mental-apathetic">Apathetic (Score: 3)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Confused" id="mental-confused" />
                  <Label htmlFor="mental-confused">Confused (Score: 2)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Stuporous" id="mental-stuporous" />
                  <Label htmlFor="mental-stuporous">Stuporous (Score: 1)</Label>
                </div>
              </div>
            </RadioGroup>
          </FormField>

          <FormField label="Activity" required>
            <RadioGroup
              value={pressure.activity}
              onValueChange={(value) => updatePressureField('activity', value)}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Ambulant" id="activity-ambulant" />
                  <Label htmlFor="activity-ambulant">Ambulant (Score: 4)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Walks with help" id="activity-walks-help" />
                  <Label htmlFor="activity-walks-help">Walks with help (Score: 3)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Chairbound" id="activity-chairbound" />
                  <Label htmlFor="activity-chairbound">Chairbound (Score: 2)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Bedfast" id="activity-bedfast" />
                  <Label htmlFor="activity-bedfast">Bedfast (Score: 1)</Label>
                </div>
              </div>
            </RadioGroup>
          </FormField>

          <FormField label="Mobility" required>
            <RadioGroup
              value={pressure.mobility}
              onValueChange={(value) => updatePressureField('mobility', value)}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Full" id="mobility-full" />
                  <Label htmlFor="mobility-full">Full (Score: 4)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Slightly impaired" id="mobility-slightly" />
                  <Label htmlFor="mobility-slightly">Slightly impaired (Score: 3)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Very limited" id="mobility-limited" />
                  <Label htmlFor="mobility-limited">Very limited (Score: 2)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Immobile" id="mobility-immobile" />
                  <Label htmlFor="mobility-immobile">Immobile (Score: 1)</Label>
                </div>
              </div>
            </RadioGroup>
          </FormField>

          <FormField label="Incontinence" required>
            <RadioGroup
              value={pressure.incontinence}
              onValueChange={(value) => updatePressureField('incontinence', value)}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="None" id="incontinence-none" />
                  <Label htmlFor="incontinence-none">None (Score: 4)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Occasional" id="incontinence-occasional" />
                  <Label htmlFor="incontinence-occasional">Occasional (Score: 3)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Usually urinary" id="incontinence-urinary" />
                  <Label htmlFor="incontinence-urinary">Usually urinary (Score: 2)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Urinary and fecal" id="incontinence-both" />
                  <Label htmlFor="incontinence-both">Urinary and fecal (Score: 1)</Label>
                </div>
              </div>
            </RadioGroup>
          </FormField>

          <div className="bg-muted p-4 rounded-lg">
            <h4 className="font-medium mb-2">Assessment Scoring Guide:</h4>
            <p className="text-sm text-muted-foreground">
              Total possible score: 20 points. Lower scores indicate higher risk for pressure ulcer development.
              Score interpretation: 16-20 (Low Risk), 12-15 (Medium Risk), 8-11 (High Risk), &lt;8 (Very High Risk)
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Nurse Assessment</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField label="Nurse Signature" required>
              <SignatureField
                value={pressure.nurseSignature}
                onChange={(signature) => updatePressureField('nurseSignature', signature)}
              />
            </FormField>
            
            <FormField label="Assessment Date" required>
              <DateField
                value={pressure.nurseSignatureDate}
                onChange={(date) => updatePressureField('nurseSignatureDate', date)}
              />
            </FormField>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};