import { FormField } from "@/components/forms/FormField";
import { DateField } from "@/components/forms/DateField";
import { SignatureField } from "@/components/forms/SignatureField";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { FormStepProps } from "@/types/form-types";

export const EmergencyPreparednessStep = ({ 
  data, 
  updateData 
}: FormStepProps) => {
  const updateEmergency = (field: string, value: any) => {
    updateData({
      emergencyPreparedness: {
        ...data.emergencyPreparedness,
        [field]: value
      }
    });
  };

  const functionalDisabilities = [
    'walker/cane',
    'wheelchair',
    'bedbound',
    'hearing impairment',
    'visual impairment',
    'mental/cognitive impairment'
  ];

  const toggleDisability = (disability: string) => {
    const current = data.emergencyPreparedness.functionalDisabilities || [];
    const updated = current.includes(disability)
      ? current.filter(d => d !== disability)
      : [...current, disability];
    updateEmergency('functionalDisabilities', updated);
  };

  return (
    <div className="space-y-6">
      <div className="form-section">
        <h2 className="form-header">Individual Patient Emergency Preparedness Plan</h2>
        
        <h3 className="font-semibold mb-4">Identifying Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <FormField label="Patient Name" required>
            <Input
              value={data.emergencyPreparedness.patientName}
              onChange={(e) => updateEmergency('patientName', e.target.value)}
              placeholder="Patient's name"
            />
          </FormField>

          <FormField label="SOC Date" required>
            <DateField
              value={data.emergencyPreparedness.socDate}
              onChange={(date) => updateEmergency('socDate', date)}
            />
          </FormField>

          <FormField label="Phone Number" required>
            <Input
              value={data.emergencyPreparedness.phoneNumber}
              onChange={(e) => updateEmergency('phoneNumber', e.target.value)}
              placeholder="Contact phone number"
            />
          </FormField>

          <FormField label="Physician" required>
            <Input
              value={data.emergencyPreparedness.physician}
              onChange={(e) => updateEmergency('physician', e.target.value)}
              placeholder="Attending physician"
            />
          </FormField>

          <FormField label="Address" required>
            <Input
              value={data.emergencyPreparedness.address}
              onChange={(e) => updateEmergency('address', e.target.value)}
              placeholder="Street address"
            />
          </FormField>

          <FormField label="City" required>
            <Input
              value={data.emergencyPreparedness.city}
              onChange={(e) => updateEmergency('city', e.target.value)}
              placeholder="City"
            />
          </FormField>

          <FormField label="State" required>
            <Input
              value={data.emergencyPreparedness.state}
              onChange={(e) => updateEmergency('state', e.target.value)}
              placeholder="State"
            />
          </FormField>

          <FormField label="ZIP Code" required>
            <Input
              value={data.emergencyPreparedness.zip}
              onChange={(e) => updateEmergency('zip', e.target.value)}
              placeholder="ZIP code"
            />
          </FormField>
        </div>
      </div>

      <div className="form-section">
        <h3 className="form-header">Relevant Healthcare Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <FormField label="Primary Diagnosis" required>
            <Input
              value={data.emergencyPreparedness.primaryDx}
              onChange={(e) => updateEmergency('primaryDx', e.target.value)}
              placeholder="Primary diagnosis"
            />
          </FormField>

          <FormField label="Secondary Diagnosis">
            <Input
              value={data.emergencyPreparedness.secondaryDx}
              onChange={(e) => updateEmergency('secondaryDx', e.target.value)}
              placeholder="Secondary diagnosis"
            />
          </FormField>
        </div>

        <div className="space-y-6">
          <div>
            <FormField label="Daily or more frequent Agency services">
              <RadioGroup
                value={data.emergencyPreparedness.dailyServices ? "yes" : "no"}
                onValueChange={(value) => updateEmergency('dailyServices', value === "yes")}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="dailyServicesYes" />
                  <Label htmlFor="dailyServicesYes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="dailyServicesNo" />
                  <Label htmlFor="dailyServicesNo">No</Label>
                </div>
              </RadioGroup>
              {data.emergencyPreparedness.dailyServices && (
                <div className="mt-2">
                  <Textarea
                    value={data.emergencyPreparedness.dailyServicesDescription}
                    onChange={(e) => updateEmergency('dailyServicesDescription', e.target.value)}
                    placeholder="Describe services when daily or more frequent"
                    rows={2}
                  />
                </div>
              )}
            </FormField>
          </div>

          <div>
            <h4 className="font-medium mb-3">Oxygen Dependency</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField label="Flow Rate">
                <Input
                  value={data.emergencyPreparedness.oxygenFlowRate}
                  onChange={(e) => updateEmergency('oxygenFlowRate', e.target.value)}
                  placeholder="e.g., 2 L/min"
                />
              </FormField>

              <FormField label="Hours of Use">
                <Input
                  value={data.emergencyPreparedness.oxygenHours}
                  onChange={(e) => updateEmergency('oxygenHours', e.target.value)}
                  placeholder="Hours per day"
                />
              </FormField>

              <FormField label="Delivery Device">
                <Input
                  value={data.emergencyPreparedness.oxygenDevice}
                  onChange={(e) => updateEmergency('oxygenDevice', e.target.value)}
                  placeholder="Type of device"
                />
              </FormField>
            </div>
          </div>

          <div>
            <FormField label="Life-sustaining infusion">
              <RadioGroup
                value={data.emergencyPreparedness.lifeSustainingInfusion ? "yes" : "no"}
                onValueChange={(value) => updateEmergency('lifeSustainingInfusion', value === "yes")}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="lifeSustainingYes" />
                  <Label htmlFor="lifeSustainingYes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="lifeSustainingNo" />
                  <Label htmlFor="lifeSustainingNo">No</Label>
                </div>
              </RadioGroup>
              {data.emergencyPreparedness.lifeSustainingInfusion && (
                <div className="mt-2">
                  <Textarea
                    value={data.emergencyPreparedness.lifeSustainingDescription}
                    onChange={(e) => updateEmergency('lifeSustainingDescription', e.target.value)}
                    placeholder="Describe infusion"
                    rows={2}
                  />
                </div>
              )}
            </FormField>
          </div>

          <div>
            <FormField label="Other IV therapy">
              <RadioGroup
                value={data.emergencyPreparedness.otherIvTherapy ? "yes" : "no"}
                onValueChange={(value) => updateEmergency('otherIvTherapy', value === "yes")}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="otherIvYes" />
                  <Label htmlFor="otherIvYes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="otherIvNo" />
                  <Label htmlFor="otherIvNo">No</Label>
                </div>
              </RadioGroup>
              {data.emergencyPreparedness.otherIvTherapy && (
                <div className="mt-2">
                  <Textarea
                    value={data.emergencyPreparedness.otherIvDescription}
                    onChange={(e) => updateEmergency('otherIvDescription', e.target.value)}
                    placeholder="Describe other IV therapy"
                    rows={2}
                  />
                </div>
              )}
            </FormField>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="Patient/caregiver independent">
              <RadioGroup
                value={data.emergencyPreparedness.patientIndependent ? "yes" : "no"}
                onValueChange={(value) => updateEmergency('patientIndependent', value === "yes")}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="patientIndependentYes" />
                  <Label htmlFor="patientIndependentYes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="patientIndependentNo" />
                  <Label htmlFor="patientIndependentNo">No</Label>
                </div>
              </RadioGroup>
            </FormField>

            <FormField label="Ventilator dependent">
              <RadioGroup
                value={data.emergencyPreparedness.ventilatorDependent ? "yes" : "no"}
                onValueChange={(value) => updateEmergency('ventilatorDependent', value === "yes")}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="ventilatorYes" />
                  <Label htmlFor="ventilatorYes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="ventilatorNo" />
                  <Label htmlFor="ventilatorNo">No</Label>
                </div>
              </RadioGroup>
            </FormField>
          </div>

          <div>
            <FormField label="Dialysis">
              <RadioGroup
                value={data.emergencyPreparedness.dialysis ? "yes" : "no"}
                onValueChange={(value) => updateEmergency('dialysis', value === "yes")}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="dialysisYes" />
                  <Label htmlFor="dialysisYes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="dialysisNo" />
                  <Label htmlFor="dialysisNo">No</Label>
                </div>
              </RadioGroup>
              {data.emergencyPreparedness.dialysis && (
                <div className="mt-2">
                  <Textarea
                    value={data.emergencyPreparedness.dialysisDescription}
                    onChange={(e) => updateEmergency('dialysisDescription', e.target.value)}
                    placeholder="Describe dialysis"
                    rows={2}
                  />
                </div>
              )}
            </FormField>
          </div>

          <div>
            <FormField label="Tube feeding">
              <RadioGroup
                value={data.emergencyPreparedness.tubeFeeding ? "yes" : "no"}
                onValueChange={(value) => updateEmergency('tubeFeeding', value === "yes")}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="tubeFeedingYes" />
                  <Label htmlFor="tubeFeedingYes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="tubeFeedingNo" />
                  <Label htmlFor="tubeFeedingNo">No</Label>
                </div>
              </RadioGroup>
              {data.emergencyPreparedness.tubeFeeding && (
                <div className="mt-2">
                  <Textarea
                    value={data.emergencyPreparedness.tubeFeedingDescription}
                    onChange={(e) => updateEmergency('tubeFeedingDescription', e.target.value)}
                    placeholder="Describe tube feeding"
                    rows={2}
                  />
                </div>
              )}
            </FormField>
          </div>

          <div>
            <FormField label="Independent with self-administered medications">
              <RadioGroup
                value={data.emergencyPreparedness.independentMedications ? "yes" : "no"}
                onValueChange={(value) => updateEmergency('independentMedications', value === "yes")}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="independentMedsYes" />
                  <Label htmlFor="independentMedsYes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="independentMedsNo" />
                  <Label htmlFor="independentMedsNo">No</Label>
                </div>
              </RadioGroup>
            </FormField>
          </div>

          <div>
            <FormField label="Functional Disabilities">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {functionalDisabilities.map((disability) => (
                  <div key={disability} className="flex items-center space-x-2">
                    <Checkbox
                      checked={data.emergencyPreparedness.functionalDisabilities?.includes(disability) || false}
                      onCheckedChange={() => toggleDisability(disability)}
                      id={disability}
                    />
                    <Label htmlFor={disability} className="text-sm">
                      {disability}
                    </Label>
                  </div>
                ))}
              </div>
            </FormField>
          </div>
        </div>
      </div>

      <div className="form-section">
        <h3 className="form-header">Emergency Plan</h3>
        
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="Emergency Contact Name" required>
              <Input
                value={data.emergencyPreparedness.emergencyContactName}
                onChange={(e) => updateEmergency('emergencyContactName', e.target.value)}
                placeholder="Emergency contact name"
              />
            </FormField>

            <FormField label="Emergency Contact Phone" required>
              <Input
                value={data.emergencyPreparedness.emergencyContactPhone}
                onChange={(e) => updateEmergency('emergencyContactPhone', e.target.value)}
                placeholder="Emergency contact phone"
              />
            </FormField>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="Evacuation - Relative/Friend Name & Phone">
              <Input
                value={data.emergencyPreparedness.evacuationRelativePhone}
                onChange={(e) => updateEmergency('evacuationRelativePhone', e.target.value)}
                placeholder="Name and phone number"
              />
            </FormField>

            <FormField label="Evacuation - Hotel (name/phone)">
              <Input
                value={data.emergencyPreparedness.evacuationHotel}
                onChange={(e) => updateEmergency('evacuationHotel', e.target.value)}
                placeholder="Hotel name and phone"
              />
            </FormField>

            <FormField label="Evacuation - Shelter Location">
              <Input
                value={data.emergencyPreparedness.evacuationShelter}
                onChange={(e) => updateEmergency('evacuationShelter', e.target.value)}
                placeholder="Shelter location"
              />
            </FormField>

            <FormField label="Registered for special needs shelter">
              <RadioGroup
                value={data.emergencyPreparedness.specialNeedsShelter ? "yes" : "no"}
                onValueChange={(value) => updateEmergency('specialNeedsShelter', value === "yes")}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="specialNeedsYes" />
                  <Label htmlFor="specialNeedsYes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="specialNeedsNo" />
                  <Label htmlFor="specialNeedsNo">No</Label>
                </div>
              </RadioGroup>
            </FormField>
          </div>

          <FormField label="Evacuation - Other">
            <Textarea
              value={data.emergencyPreparedness.evacuationOther}
              onChange={(e) => updateEmergency('evacuationOther', e.target.value)}
              placeholder="Describe other evacuation arrangements"
              rows={2}
            />
          </FormField>

          <FormField label="Priority/Acuity Level">
            <Input
              value={data.emergencyPreparedness.priorityLevel}
              onChange={(e) => updateEmergency('priorityLevel', e.target.value)}
              placeholder="Clinician enters priority/acuity level"
            />
          </FormField>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="Clinician Signature" required>
              <SignatureField
                value={data.emergencyPreparedness.clinicianSignature}
                onChange={(signature) => updateEmergency('clinicianSignature', signature)}
                placeholder="Clinician signature"
              />
            </FormField>

            <FormField label="Clinician Date" required>
              <DateField
                value={data.emergencyPreparedness.clinicianDate}
                onChange={(date) => updateEmergency('clinicianDate', date)}
              />
            </FormField>
          </div>
        </div>
      </div>
    </div>
  );
};