import { ReactNode } from "react";
import { Label } from "@/components/ui/label";

interface FormFieldProps {
  label: string;
  required?: boolean;
  children: ReactNode;
  error?: string;
  description?: string;
}

export const FormField = ({ 
  label, 
  required = false, 
  children, 
  error,
  description 
}: FormFieldProps) => {
  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium text-foreground">
        {label}
        {required && <span className="required ml-1">*</span>}
      </Label>
      {description && (
        <p className="text-xs sm:text-sm text-muted-foreground">{description}</p>
      )}
      <div className="w-full">
        {children}
      </div>
      {error && (
        <p className="text-xs sm:text-sm text-destructive">{error}</p>
      )}
    </div>
  );
};