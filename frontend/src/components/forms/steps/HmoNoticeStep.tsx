import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormField } from "../FormField";
import { DateField } from "../DateField";
import { SignatureField } from "../SignatureField";
import { Input } from "@/components/ui/input";
import { FormStepProps } from "@/types/form-types";

export const HmoNoticeStep = ({ data, updateData }: FormStepProps) => {
  const hmo = data.hmoNoticeAcknowledgement;

  const updateHmoField = (field: string, value: any) => {
    updateData({
      hmoNoticeAcknowledgement: {
        ...hmo,
        [field]: value
      }
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-form-header mb-6">
          HMO Notice Acknowledgement
        </h2>
        <p className="text-sm text-muted-foreground mb-6">
          Acknowledgement that HMO notification responsibilities have been explained
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Patient Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <FormField label="Patient's Name" required>
            <Input
              value={hmo.patientName}
              onChange={(e) => updateHmoField('patientName', e.target.value)}
              placeholder="Enter patient's printed name"
            />
          </FormField>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Acknowledgement Signatures</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <FormField label="Patient's Signature" required>
                <SignatureField
                  value={hmo.patientSignature}
                  onChange={(signature) => updateHmoField('patientSignature', signature)}
                />
              </FormField>
              
              <FormField label="Patient Signature Date" required>
                <DateField
                  value={hmo.patientSignatureDate}
                  onChange={(date) => updateHmoField('patientSignatureDate', date)}
                />
              </FormField>
            </div>

            <div className="space-y-4">
              <FormField label="Witness Signature" required>
                <SignatureField
                  value={hmo.witnessSignature}
                  onChange={(signature) => updateHmoField('witnessSignature', signature)}
                />
              </FormField>
              
              <FormField label="Witness Signature Date" required>
                <DateField
                  value={hmo.witnessSignatureDate}
                  onChange={(date) => updateHmoField('witnessSignatureDate', date)}
                />
              </FormField>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="bg-muted p-4 rounded-lg">
        <h4 className="font-medium mb-2">HMO Notification Requirements:</h4>
        <p className="text-sm text-muted-foreground mb-2">
          The patient acknowledges that they have been informed about their responsibilities regarding HMO notifications, including:
        </p>
        <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
          <li>Notification requirements for home health services</li>
          <li>Authorization procedures for covered services</li>
          <li>Patient responsibilities under HMO coverage</li>
          <li>Contact information for HMO coordination</li>
        </ul>
      </div>
    </div>
  );
};