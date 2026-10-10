import { FileText, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AdditionalRequirementsCardProps {
  additionalProductRequirements: string | null;
  supportingDocuments: string | null;
}

export default function AdditionalRequirementsCard({
  additionalProductRequirements,
  supportingDocuments,
}: AdditionalRequirementsCardProps) {
  if (!additionalProductRequirements && !supportingDocuments) return null;

  return (
    <Card className="border-slate-200 shadow-sm bg-white">
      <CardHeader className="border-b border-slate-100 pb-3">
        <CardTitle className="text-base font-bold text-[#062b56] flex items-center gap-2">
          <FileText className="w-4 h-4 text-[#0b8b99]" />
          <span>Additional Information & Supporting Documents</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4 space-y-4 text-sm">
        {additionalProductRequirements && (
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">
              Additional Product Requirements:
            </span>
            <p className="text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-200 whitespace-pre-wrap">
              {additionalProductRequirements}
            </p>
          </div>
        )}

        {supportingDocuments && (
          <div className="flex items-center justify-between bg-blue-50/60 p-3 rounded-lg border border-blue-200">
            <span className="text-xs font-bold text-blue-900">
              Supporting Document Attached
            </span>
            <a
              href={supportingDocuments}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-800 hover:underline"
            >
              <span>View Document</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
