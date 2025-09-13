import { useState } from "react";
import { Search, Eye, Download, Filter, MoreHorizontal } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

// Sample data structure for reference - you'll replace this with your actual data
interface FormSubmission {
  id: string;
  patientName: string;
  mrn: string;
  socDate: string;
  clinicianName: string;
  submittedDate: string;
  status: 'completed' | 'pending' | 'incomplete';
}

const sampleData: FormSubmission[] = [
  {
    id: "1",
    patientName: "John Smith",
    mrn: "MRN001234",
    socDate: "2024-01-15",
    clinicianName: "Dr. Sarah Johnson",
    submittedDate: "2024-01-15 10:30 AM",
    status: 'completed'
  },
  {
    id: "2",
    patientName: "Maria Garcia",
    mrn: "MRN001235",
    socDate: "2024-01-16",
    clinicianName: "Dr. Michael Chen",
    submittedDate: "2024-01-16 2:45 PM",
    status: 'completed'
  },
  {
    id: "3",
    patientName: "Robert Johnson",
    mrn: "MRN001236",
    socDate: "2024-01-17",
    clinicianName: "Dr. Emily Davis",
    submittedDate: "2024-01-17 9:15 AM",
    status: 'pending'
  },
];

interface AdminFormsTableProps {
  data?: FormSubmission[];
  onView?: (id: string) => void;
  onDownload?: (id: string) => void;
}

export const AdminFormsTable = ({ 
  data = sampleData, 
  onView = () => {}, 
  onDownload = () => {} 
}: AdminFormsTableProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = data.filter(
    (item) =>
      item.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.mrn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.clinicianName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    const variants = {
      completed: "default",
      pending: "secondary",
      incomplete: "destructive"
    } as const;

    return (
      <Badge variant={variants[status as keyof typeof variants] || "default"}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <div className="w-full space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Form Submissions</CardTitle>
          <CardDescription>
            Manage and review all submitted E-SOC forms
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Search and Filter Controls */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by patient name, MRN, or clinician..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="shrink-0">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>

          {/* Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-semibold">Patient Name</TableHead>
                  <TableHead className="font-semibold">MRN</TableHead>
                  <TableHead className="font-semibold">SOC Date</TableHead>
                  <TableHead className="font-semibold">Clinician Name</TableHead>
                  <TableHead className="font-semibold">Submitted Date</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="font-semibold text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      No forms found matching your search criteria.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredData.map((form) => (
                    <TableRow key={form.id} className="hover:bg-muted/50">
                      <TableCell className="font-medium">{form.patientName}</TableCell>
                      <TableCell className="font-mono text-sm">{form.mrn}</TableCell>
                      <TableCell>{form.socDate}</TableCell>
                      <TableCell>{form.clinicianName}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {form.submittedDate}
                      </TableCell>
                      <TableCell>{getStatusBadge(form.status)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onView(form.id)}
                            className="h-8 w-8 p-0"
                          >
                            <Eye className="h-4 w-4" />
                            <span className="sr-only">View form</span>
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onDownload(form.id)}
                            className="h-8 w-8 p-0"
                          >
                            <Download className="h-4 w-4" />
                            <span className="sr-only">Download PDF</span>
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">More actions</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem onClick={() => onView(form.id)}>
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => onDownload(form.id)}>
                                <Download className="mr-2 h-4 w-4" />
                                Download PDF
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-destructive">
                                Delete Form
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination Placeholder */}
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-muted-foreground">
              Showing {filteredData.length} of {data.length} forms
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm" disabled>
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};