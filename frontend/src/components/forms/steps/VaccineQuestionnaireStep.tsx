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

export const VaccineQuestionnaireStep = ({ data, updateData }: FormStepProps) => {
  const vaccine = data.vaccineQuestionnaire;

  const updateVaccineField = (field: string, value: any) => {
    updateData({
      vaccineQuestionnaire: {
        ...vaccine,
        [field]: value
      }
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-form-header mb-6">
          Influenza / Pneumonia Vaccine Questionnaire
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <FormField label="Patient Name" required>
            <Input
              value={vaccine.patientName}
              onChange={(e) => updateVaccineField('patientName', e.target.value)}
              placeholder="Enter patient's full name"
            />
          </FormField>
          
          <FormField label="Date" required>
            <DateField
              value={vaccine.date}
              onChange={(date) => updateVaccineField('date', date)}
            />
          </FormField>
        </div>
      </div>

      {/* Influenza Vaccine Section */}
      <Card>
        <CardHeader>
          <CardTitle>Influenza Vaccine</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <FormField label="Interested in receiving influenza vaccine?">
            <RadioGroup
              value={vaccine.influenzaInterest ? "yes" : "no"}
              onValueChange={(value) => updateVaccineField('influenzaInterest', value === "yes")}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="flu-yes" />
                <Label htmlFor="flu-yes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="flu-no" />
                <Label htmlFor="flu-no">No</Label>
              </div>
            </RadioGroup>
          </FormField>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="age65Plus"
                  checked={vaccine.age65Plus}
                  onCheckedChange={(checked) => updateVaccineField('age65Plus', checked)}
                />
                <Label htmlFor="age65Plus">Age ≥ 65</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="age50To64"
                  checked={vaccine.age50To64WithCondition}
                  onCheckedChange={(checked) => updateVaccineField('age50To64WithCondition', checked)}
                />
                <Label htmlFor="age50To64">Age 50-64 with medical condition</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="personalPreferenceFlu"
                  checked={vaccine.personalPreferenceInfluenza}
                  onCheckedChange={(checked) => updateVaccineField('personalPreferenceInfluenza', checked)}
                />
                <Label htmlFor="personalPreferenceFlu">Personal preference</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="otherFlu"
                  checked={vaccine.otherInfluenza}
                  onCheckedChange={(checked) => updateVaccineField('otherInfluenza', checked)}
                />
                <Label htmlFor="otherFlu">Other</Label>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="recentFluShot"
                  checked={vaccine.recentFluShot}
                  onCheckedChange={(checked) => updateVaccineField('recentFluShot', checked)}
                />
                <Label htmlFor="recentFluShot">Recently had a flu shot</Label>
              </div>
              
              {vaccine.recentFluShot && (
                <DateField
                  value={vaccine.recentFluShotDate}
                  onChange={(date) => updateVaccineField('recentFluShotDate', date)}
                  placeholder="Date of recent flu shot"
                />
              )}

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="allergicEggs"
                  checked={vaccine.allergicToEggs}
                  onCheckedChange={(checked) => updateVaccineField('allergicToEggs', checked)}
                />
                <Label htmlFor="allergicEggs">Allergic to eggs</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="reactionFluShot"
                  checked={vaccine.reactionToFluShot}
                  onCheckedChange={(checked) => updateVaccineField('reactionToFluShot', checked)}
                />
                <Label htmlFor="reactionFluShot">Reaction to flu shot in the past</Label>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium">Implementation Options (Influenza):</Label>
            <div className="grid grid-cols-1 gap-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="agencyNurseFlu"
                  checked={vaccine.agencyNurseInfluenza}
                  onCheckedChange={(checked) => updateVaccineField('agencyNurseInfluenza', checked)}
                />
                <Label htmlFor="agencyNurseFlu">Vaccine administered by agency nurse</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="referPhysicianFlu"
                  checked={vaccine.referPhysicianInfluenza}
                  onCheckedChange={(checked) => updateVaccineField('referPhysicianInfluenza', checked)}
                />
                <Label htmlFor="referPhysicianFlu">Referred to visiting physician/primary care</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="healthDeptFlu"
                  checked={vaccine.healthDepartmentInfluenza}
                  onCheckedChange={(checked) => updateVaccineField('healthDepartmentInfluenza', checked)}
                />
                <Label htmlFor="healthDeptFlu">Referred to local health department/community location</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="homeVaccFlu"
                  checked={vaccine.homeVaccinationInfluenza}
                  onCheckedChange={(checked) => updateVaccineField('homeVaccinationInfluenza', checked)}
                />
                <Label htmlFor="homeVaccFlu">Arranged for home vaccination</Label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pneumonia Vaccine Section */}
      <Card>
        <CardHeader>
          <CardTitle>Pneumonia Vaccine</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <FormField label="Interested in receiving pneumonia vaccine?">
            <RadioGroup
              value={vaccine.pneumoniaInterest ? "yes" : "no"}
              onValueChange={(value) => updateVaccineField('pneumoniaInterest', value === "yes")}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="pneumonia-yes" />
                <Label htmlFor="pneumonia-yes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="pneumonia-no" />
                <Label htmlFor="pneumonia-no">No</Label>
              </div>
            </RadioGroup>
          </FormField>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="age65PlusPneumonia"
                  checked={vaccine.age65PlusPneumonia}
                  onCheckedChange={(checked) => updateVaccineField('age65PlusPneumonia', checked)}
                />
                <Label htmlFor="age65PlusPneumonia">Age ≥ 65</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="chronicHealth"
                  checked={vaccine.chronicHealthProblem}
                  onCheckedChange={(checked) => updateVaccineField('chronicHealthProblem', checked)}
                />
                <Label htmlFor="chronicHealth">Chronic health problem</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="personalPreferencePneumonia"
                  checked={vaccine.personalPreferencePneumonia}
                  onCheckedChange={(checked) => updateVaccineField('personalPreferencePneumonia', checked)}
                />
                <Label htmlFor="personalPreferencePneumonia">Personal preference</Label>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="receivedPneumonia"
                  checked={vaccine.receivedPneumoniaVaccine}
                  onCheckedChange={(checked) => updateVaccineField('receivedPneumoniaVaccine', checked)}
                />
                <Label htmlFor="receivedPneumonia">Received pneumonia vaccine in the past</Label>
              </div>
              
              {vaccine.receivedPneumoniaVaccine && (
                <DateField
                  value={vaccine.pneumoniaVaccineDate}
                  onChange={(date) => updateVaccineField('pneumoniaVaccineDate', date)}
                  placeholder="Date received"
                />
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium">Implementation Options (Pneumonia):</Label>
            <div className="grid grid-cols-1 gap-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="agencyNursePneumonia"
                  checked={vaccine.agencyNursePneumonia}
                  onCheckedChange={(checked) => updateVaccineField('agencyNursePneumonia', checked)}
                />
                <Label htmlFor="agencyNursePneumonia">Vaccine administered by agency nurse</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="referPhysicianPneumonia"
                  checked={vaccine.referPhysicianPneumonia}
                  onCheckedChange={(checked) => updateVaccineField('referPhysicianPneumonia', checked)}
                />
                <Label htmlFor="referPhysicianPneumonia">Referred to visiting physician/primary care</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="healthDeptPneumonia"
                  checked={vaccine.healthDepartmentPneumonia}
                  onCheckedChange={(checked) => updateVaccineField('healthDepartmentPneumonia', checked)}
                />
                <Label htmlFor="healthDeptPneumonia">Referred to local health department/community location</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="homeVaccPneumonia"
                  checked={vaccine.homeVaccinationPneumonia}
                  onCheckedChange={(checked) => updateVaccineField('homeVaccinationPneumonia', checked)}
                />
                <Label htmlFor="homeVaccPneumonia">Arranged for home vaccination</Label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Administration & Follow-up */}
      <Card>
        <CardHeader>
          <CardTitle>Vaccine Administration & Outcome Follow-up</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="vaccinatedInfluenza"
                  checked={vaccine.vaccinatedInfluenza}
                  onCheckedChange={(checked) => updateVaccineField('vaccinatedInfluenza', checked)}
                />
                <Label htmlFor="vaccinatedInfluenza">Vaccine administered: Influenza</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="vaccinatedPneumonia"
                  checked={vaccine.vaccinatedPneumonia}
                  onCheckedChange={(checked) => updateVaccineField('vaccinatedPneumonia', checked)}
                />
                <Label htmlFor="vaccinatedPneumonia">Vaccine administered: Pneumonia</Label>
              </div>

              <FormField label="Administration Date">
                <DateField
                  value={vaccine.administrationDate}
                  onChange={(date) => updateVaccineField('administrationDate', date)}
                />
              </FormField>

              <FormField label="Site">
                <Input
                  value={vaccine.site}
                  onChange={(e) => updateVaccineField('site', e.target.value)}
                  placeholder="Injection site"
                />
              </FormField>
            </div>

            <div className="space-y-4">
              <FormField label="Manufacturer/Lot #">
                <Input
                  value={vaccine.manufacturerLot}
                  onChange={(e) => updateVaccineField('manufacturerLot', e.target.value)}
                  placeholder="Manufacturer and lot number"
                />
              </FormField>

              <FormField label="Expiry Date">
                <DateField
                  value={vaccine.expiry}
                  onChange={(date) => updateVaccineField('expiry', date)}
                />
              </FormField>

              <FormField label="Nurse Signature" required>
                <SignatureField
                  value={vaccine.nurseSignature}
                  onChange={(signature) => updateVaccineField('nurseSignature', signature)}
                />
              </FormField>

              <FormField label="Patient Signature" required>
                <SignatureField
                  value={vaccine.patientSignature}
                  onChange={(signature) => updateVaccineField('patientSignature', signature)}
                />
              </FormField>
            </div>
          </div>

          <div className="border-t pt-4">
            <h4 className="text-md font-medium mb-4">Follow-up</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="followUpInfluenza"
                    checked={vaccine.followUpInfluenza}
                    onCheckedChange={(checked) => updateVaccineField('followUpInfluenza', checked)}
                  />
                  <Label htmlFor="followUpInfluenza">Outcome follow-up: Influenza</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="followUpPneumonia"
                    checked={vaccine.followUpPneumonia}
                    onCheckedChange={(checked) => updateVaccineField('followUpPneumonia', checked)}
                  />
                  <Label htmlFor="followUpPneumonia">Outcome follow-up: Pneumonia</Label>
                </div>

                <FormField label="Follow-up Date">
                  <DateField
                    value={vaccine.followUpDate}
                    onChange={(date) => updateVaccineField('followUpDate', date)}
                  />
                </FormField>

                <FormField label="Any vaccine related reaction?">
                  <RadioGroup
                    value={vaccine.vaccineReaction ? "yes" : "no"}
                    onValueChange={(value) => updateVaccineField('vaccineReaction', value === "yes")}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="reaction-yes" />
                      <Label htmlFor="reaction-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="reaction-no" />
                      <Label htmlFor="reaction-no">No</Label>
                    </div>
                  </RadioGroup>
                </FormField>
              </div>

              <div className="space-y-4">
                <FormField label="Comment">
                  <Textarea
                    value={vaccine.comment}
                    onChange={(e) => updateVaccineField('comment', e.target.value)}
                    placeholder="Describe any reaction or additional notes"
                    rows={3}
                  />
                </FormField>

                <FormField label="Nurse Signature (Follow-up)">
                  <SignatureField
                    value={vaccine.nurseSignatureFollowUp}
                    onChange={(signature) => updateVaccineField('nurseSignatureFollowUp', signature)}
                  />
                </FormField>

                <FormField label="Patient Signature (Follow-up)">
                  <SignatureField
                    value={vaccine.patientSignatureFollowUp}
                    onChange={(signature) => updateVaccineField('patientSignatureFollowUp', signature)}
                  />
                </FormField>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};