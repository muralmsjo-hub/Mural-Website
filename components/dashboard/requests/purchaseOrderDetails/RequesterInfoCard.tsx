import { User, Building2, Mail, Phone, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface RequesterInfoCardProps {
  companyName: string;
  personName: string;
  jobTitle: string;
  email: string;
  phoneNumber: string;
  city: string;
  streetName: string;
}

export default function RequesterInfoCard({
  companyName,
  personName,
  jobTitle,
  email,
  phoneNumber,
  city,
  streetName,
}: RequesterInfoCardProps) {
  return (
    <Card className="border-slate-200 shadow-sm bg-white">
      <CardHeader className="border-b border-slate-100 pb-3">
        <CardTitle className="text-base font-bold text-[#062b56] flex items-center gap-2">
          <User className="w-4 h-4 text-[#0b8b99]" />
          <span>Requester Information</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4 space-y-3 text-sm">
        <div className="flex items-start justify-between py-1 border-b border-slate-50">
          <span className="text-slate-500 font-medium">Company Name:</span>
          <span className="font-semibold text-slate-900 flex items-center gap-1.5">
            <Building2 className="w-3.5 h-3.5 text-slate-400" />
            {companyName}
          </span>
        </div>

        <div className="flex items-start justify-between py-1 border-b border-slate-50">
          <span className="text-slate-500 font-medium">Contact Person:</span>
          <span className="font-semibold text-slate-900">{personName}</span>
        </div>

        <div className="flex items-start justify-between py-1 border-b border-slate-50">
          <span className="text-slate-500 font-medium">Job Title:</span>
          <span className="font-semibold text-slate-800">{jobTitle}</span>
        </div>

        <div className="flex items-start justify-between py-1 border-b border-slate-50">
          <span className="text-slate-500 font-medium">Email:</span>
          <a
            href={`mailto:${email}`}
            className="font-mono text-blue-600 hover:underline flex items-center gap-1"
          >
            <Mail className="w-3.5 h-3.5" />
            {email}
          </a>
        </div>

        <div className="flex items-start justify-between py-1 border-b border-slate-50">
          <span className="text-slate-500 font-medium">Phone Number:</span>
          <a
            href={`tel:${phoneNumber}`}
            className="font-semibold text-slate-800 flex items-center gap-1 hover:text-blue-600"
          >
            <Phone className="w-3.5 h-3.5 text-slate-400" />
            {phoneNumber}
          </a>
        </div>

        <div className="flex items-start justify-between py-1">
          <span className="text-slate-500 font-medium">Company Address:</span>
          <span className="font-medium text-slate-800 text-right flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-slate-400" />
            {streetName}, {city}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
