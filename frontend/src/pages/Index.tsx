import { ESocForm } from "@/components/ESocForm";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Settings } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="border-b">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-2xl font-bold">E-SOC Paperwork System</h1>
          <Button variant="outline" asChild>
            <Link to="/admin" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Admin View
            </Link>
          </Button>
        </div>
      </div>
      <ESocForm />
    </div>
  );
};

export default Index;
