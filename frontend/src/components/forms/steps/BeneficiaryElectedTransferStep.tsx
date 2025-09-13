import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormField } from "../FormField";
import { DateField } from "../DateField";
import { SignatureField } from "../SignatureField";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FormStepProps } from "@/types/form-types";

export const BeneficiaryElectedTransferStep = ({ data, updateData }: FormStepProps) => {
  const transfer = data.beneficiaryElectedTransfer;

  const updateTransferField = (field: string, value: any) => {
    updateData({
      beneficiaryElectedTransfer: {
        ...transfer,
        [field]: value
      }
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-form-header mb-6">
          Beneficiary-Elected Transfer
        </h2>
        <p className="text-sm text-muted-foreground mb-6">
          Transfer from previous home health agency information
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Previous Agency Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <FormField label="Previous Home Health Agency" required>
            <Input
              value={transfer.previousHomeHealthAgency}
              onChange={(e) => updateTransferField('previousHomeHealthAgency', e.target.value)}
              placeholder="Enter name of previous home health agency"
            />
          </FormField>
          
          <FormField label="Previous Agency Location" required>
            <Textarea
              value={transfer.previousAgencyLocation}
              onChange={(e) => updateTransferField('previousAgencyLocation', e.target.value)}
              placeholder="Enter address/location of previous agency"
              rows={3}
            />
          </FormField>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Transfer Confirmation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <FormField label="Patient Signature" required>
                <SignatureField
                  value={transfer.patientSignature}
                  onChange={(signature) => updateTransferField('patientSignature', signature)}
                />
              </FormField>
              
              <FormField label="Patient Signature Date" required>
                <DateField
                  value={transfer.patientSignatureDate}
                  onChange={(date) => updateTransferField('patientSignatureDate', date)}
                />
              </FormField>
            </div>

            <div className="space-y-4">
              <FormField label="Witness Signature" required>
                <SignatureField
                  value={transfer.witnessSignature}
                  onChange={(signature) => updateTransferField('witnessSignature', signature)}
                />
              </FormField>
              
              <FormField label="Witness Signature Date" required>
                <DateField
                  value={transfer.witnessSignatureDate}
                  onChange={(date) => updateTransferField('witnessSignatureDate', date)}
                />
              </FormField>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="bg-muted p-4 rounded-lg">
        <h4 className="font-medium mb-2">Important Notice:</h4>
        <p className="text-sm text-muted-foreground">
          By signing this form, the patient confirms their decision to transfer care from the previous home health agency to Metropolitan Home Health Care. This transfer will be processed according to Medicare guidelines and agency policies.
        </p>
      </div>
    </div>
  );
};