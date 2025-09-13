import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Save } from "lucide-react";

interface FormNavigationProps {
  onPrevious?: () => void;
  onNext?: () => void;
  onSave?: () => void;
  isFirst: boolean;
  isLast: boolean;
  canProceed?: boolean;
  currentStep: number;
  totalSteps: number;
}

export const FormNavigation = ({
  onPrevious,
  onNext,
  onSave,
  isFirst,
  isLast,
  canProceed = true,
  currentStep,
  totalSteps
}: FormNavigationProps) => {
  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between pt-4 sm:pt-6 border-t border-border space-y-3 sm:space-y-0">
      <div className="flex items-center gap-2 sm:gap-4 order-2 sm:order-1">
        {!isFirst && (
          <Button 
            variant="outline" 
            onClick={onPrevious}
            className="flex items-center gap-1 sm:gap-2 text-sm"
            size="sm"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Previous</span>
            <span className="sm:hidden">Prev</span>
          </Button>
        )}
      </div>
      
      <div className="text-sm text-muted-foreground text-center order-1 sm:order-2">
        Step {currentStep} of {totalSteps}
      </div>
      
      <div className="flex items-center gap-2 sm:gap-4 order-3">
        {isLast ? (
          <Button 
            onClick={onSave}
            disabled={!canProceed}
            className="flex items-center gap-1 sm:gap-2 text-sm w-full sm:w-auto"
            size="sm"
          >
            <Save className="h-4 w-4" />
            <span className="hidden sm:inline">Complete Form</span>
            <span className="sm:hidden">Complete</span>
          </Button>
        ) : (
          <Button 
            onClick={onNext}
            disabled={!canProceed}
            className="flex items-center gap-1 sm:gap-2 text-sm w-full sm:w-auto"
            size="sm"
          >
            <span className="hidden sm:inline">Next</span>
            <span className="sm:hidden">Next</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
};