import { AdminFormsTable } from "@/components/AdminFormsTable";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function Admin() {
  // These handlers will be called when buttons are clicked
  const handleViewForm = (id: string) => {
    console.log("View form:", id);
    // You can implement navigation to form details page or open modal
  };

  const handleDownloadForm = (id: string) => {
    console.log("Download form:", id);
    // You can implement PDF download functionality
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Forms
              </Link>
            </Button>
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          </div>
        </div>
      </div>
      <div className="container mx-auto py-8 px-4">
        <AdminFormsTable 
          onView={handleViewForm}
          onDownload={handleDownloadForm}
        />
      </div>
    </div>
  );
}