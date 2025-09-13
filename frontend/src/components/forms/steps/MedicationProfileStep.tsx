import { FormField } from "@/components/forms/FormField";
import { DateField } from "@/components/forms/DateField";
import { SignatureField } from "@/components/forms/SignatureField";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2 } from "lucide-react";
import { FormStepProps, MedicationEntry } from "@/types/form-types";

export const MedicationProfileStep = ({ 
  data, 
  updateData 
}: FormStepProps) => {
  const updateMedication = (field: string, value: any) => {
    updateData({
      medicationProfile: {
        ...data.medicationProfile,
        [field]: value
      }
    });
  };

  const addMedication = () => {
    const newMedication: MedicationEntry = {
      startDate: null,
      changeType: '',
      medication: '',
      doseRoute: '',
      frequency: '',
      purpose: '',
      changeDcDate: null
    };
    
    updateMedication('medications', [
      ...data.medicationProfile.medications,
      newMedication
    ]);
  };

  const removeMedication = (index: number) => {
    const updated = data.medicationProfile.medications.filter((_, i) => i !== index);
    updateMedication('medications', updated);
  };

  const updateMedicationEntry = (index: number, field: keyof MedicationEntry, value: any) => {
    const updated = data.medicationProfile.medications.map((med, i) => 
      i === index ? { ...med, [field]: value } : med
    );
    updateMedication('medications', updated);
  };

  return (
    <div className="space-y-6">
      <div className="form-section">
        <h2 className="form-header">Medication Profile</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField label="Patient Name" required>
            <Input
              value={data.medicationProfile.patientName}
              onChange={(e) => updateMedication('patientName', e.target.value)}
              placeholder="Patient's name"
            />
          </FormField>

          <FormField label="Physician" required>
            <Input
              value={data.medicationProfile.physician}
              onChange={(e) => updateMedication('physician', e.target.value)}
              placeholder="Treating physician"
            />
          </FormField>

          <FormField label="Allergy">
            <Input
              value={data.medicationProfile.allergy}
              onChange={(e) => updateMedication('allergy', e.target.value)}
              placeholder="Patient allergies"
            />
          </FormField>

          <FormField label="Diagnosis" required>
            <Input
              value={data.medicationProfile.dx}
              onChange={(e) => updateMedication('dx', e.target.value)}
              placeholder="Diagnosis"
            />
          </FormField>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <FormField label="Pharmacy" required>
            <Input
              value={data.medicationProfile.pharmacy}
              onChange={(e) => updateMedication('pharmacy', e.target.value)}
              placeholder="Pharmacy name"
            />
          </FormField>

          <FormField label="Pharmacy Address" required>
            <Input
              value={data.medicationProfile.pharmacyAddress}
              onChange={(e) => updateMedication('pharmacyAddress', e.target.value)}
              placeholder="Pharmacy address"
            />
          </FormField>

          <FormField label="Pharmacy Phone" required>
            <Input
              value={data.medicationProfile.pharmacyPhone}
              onChange={(e) => updateMedication('pharmacyPhone', e.target.value)}
              placeholder="Pharmacy phone"
            />
          </FormField>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <FormField label="Height">
            <Input
              value={data.medicationProfile.height}
              onChange={(e) => updateMedication('height', e.target.value)}
              placeholder="Patient height"
            />
          </FormField>

          <FormField label="Weight">
            <Input
              value={data.medicationProfile.weight}
              onChange={(e) => updateMedication('weight', e.target.value)}
              placeholder="Patient weight"
            />
          </FormField>
        </div>
      </div>

      <div className="form-section">
        <div className="flex items-center justify-between mb-4">
          <h3 className="form-header">Medications</h3>
          <Button 
            type="button" 
            onClick={addMedication}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Medication
          </Button>
        </div>

        {data.medicationProfile.medications.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No medications added. Click "Add Medication" to start.
          </div>
        ) : (
          <div className="space-y-4">
            {data.medicationProfile.medications.map((medication, index) => (
              <div key={index} className="border border-border rounded-lg p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Medication #{index + 1}</h4>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeMedication(index)}
                    className="text-destructive hover:text-destructive-foreground hover:bg-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-7 gap-4">
                  <FormField label="Start Date">
                    <DateField
                      value={medication.startDate}
                      onChange={(date) => updateMedicationEntry(index, 'startDate', date)}
                    />
                  </FormField>

                  <FormField label="C/N">
                    <Select
                      value={medication.changeType}
                      onValueChange={(value) => updateMedicationEntry(index, 'changeType', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="N">N (New)</SelectItem>
                        <SelectItem value="C">C (Change)</SelectItem>
                        <SelectItem value="DC">DC (Discontinue)</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormField>

                  <FormField label="Medication" required>
                    <Input
                      value={medication.medication}
                      onChange={(e) => updateMedicationEntry(index, 'medication', e.target.value)}
                      placeholder="Medication name"
                    />
                  </FormField>

                  <FormField label="Dose/Route" required>
                    <Input
                      value={medication.doseRoute}
                      onChange={(e) => updateMedicationEntry(index, 'doseRoute', e.target.value)}
                      placeholder="Dose and route"
                    />
                  </FormField>

                  <FormField label="Frequency" required>
                    <Input
                      value={medication.frequency}
                      onChange={(e) => updateMedicationEntry(index, 'frequency', e.target.value)}
                      placeholder="How often"
                    />
                  </FormField>

                  <FormField label="Purpose">
                    <Input
                      value={medication.purpose}
                      onChange={(e) => updateMedicationEntry(index, 'purpose', e.target.value)}
                      placeholder="Purpose"
                    />
                  </FormField>

                  <FormField label="C/DC Date">
                    <DateField
                      value={medication.changeDcDate}
                      onChange={(date) => updateMedicationEntry(index, 'changeDcDate', date)}
                    />
                  </FormField>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 pt-4 border-t border-border">
          <FormField label="Clinician Signature" required>
            <SignatureField
              value={data.medicationProfile.clinicianSignature}
              onChange={(signature) => updateMedication('clinicianSignature', signature)}
              placeholder="Clinician signature confirming review"
            />
          </FormField>

          <FormField label="Review Date" required>
            <DateField
              value={data.medicationProfile.clinicianDate}
              onChange={(date) => updateMedication('clinicianDate', date)}
            />
          </FormField>
        </div>
      </div>
    </div>
  );
};