import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormField } from "../FormField";
import { DateField } from "../DateField";
import { SignatureField } from "../SignatureField";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FormStepProps } from "@/types/form-types";

export const NoticeOfMedicareNonCoverageStep = ({ data, updateData }: FormStepProps) => {
  const notice = data.noticeOfMedicareNonCoverage;

  const updateNoticeField = (field: string, value: any) => {
    updateData({
      noticeOfMedicareNonCoverage: {
        ...notice,
        [field]: value
      }
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-form-header mb-6">
          Notice of Medicare Non-Coverage
        </h2>
        <p className="text-sm text-muted-foreground mb-6">
          Notice that Medicare coverage for home health services will end
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
                value={notice.patientName}
                onChange={(e) => updateNoticeField('patientName', e.target.value)}
                placeholder="Enter patient's full name"
              />
            </FormField>

            <FormField label="Patient Number" required>
              <Input
                value={notice.patientNumber}
                onChange={(e) => updateNoticeField('patientNumber', e.target.value)}
                placeholder="Patient identification number"
              />
            </FormField>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Coverage Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <FormField label="Effective Date Coverage Will End" required>
            <DateField
              value={notice.effectiveDate}
              onChange={(date) => updateNoticeField('effectiveDate', date)}
              placeholder="Date on which current home health services end"
            />
          </FormField>

          <FormField label="Plan Contact Information">
            <Textarea
              value={notice.planContactInfo}
              onChange={(e) => updateNoticeField('planContactInfo', e.target.value)}
              placeholder="Contact information for the Medicare health plan (if applicable)"
              rows={3}
            />
          </FormField>

          <FormField label="Additional Information (Optional)">
            <Textarea
              value={notice.additionalInfo}
              onChange={(e) => updateNoticeField('additionalInfo', e.target.value)}
              placeholder="Optional field for any additional information"
              rows={3}
            />
          </FormField>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Appeal Rights Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-muted p-4 rounded-lg">
            <h4 className="font-medium mb-3">Important Appeal Rights Notice:</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>
                <strong>You have the right to appeal this decision.</strong> If you disagree with this decision to stop your home health services, you may appeal. You have the right to:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Request an immediate review by calling your plan</li>
                <li>Continue receiving services during the appeal process</li>
                <li>File a written appeal within 60 days</li>
                <li>Request a hearing before an Administrative Law Judge if your appeal is denied</li>
              </ul>
              <p className="mt-3">
                <strong>Important:</strong> If you continue to receive services during your appeal and the appeal decision is not in your favor, you may have to pay for the services you received during the appeal process.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Patient/Representative Acknowledgement</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField label="Signature of Patient or Representative" required>
              <SignatureField
                value={notice.patientOrRepSignature}
                onChange={(signature) => updateNoticeField('patientOrRepSignature', signature)}
              />
            </FormField>
            
            <FormField label="Signature Date" required>
              <DateField
                value={notice.signatureDate}
                onChange={(date) => updateNoticeField('signatureDate', date)}
              />
            </FormField>
          </div>

          <div className="bg-muted p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">
              By signing above, I acknowledge that I have received and understood this Notice of Medicare Non-Coverage. I understand my appeal rights and the information provided above regarding the termination of Medicare coverage for home health services.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};