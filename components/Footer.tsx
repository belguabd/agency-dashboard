
import { Building2 } from "lucide-react";

export default function Footer() {
    return (
        <div>
            {/* Footer */}
            < footer className="border-t border-white/5 bg-black py-8 px-6" >
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="flex items-center gap-2">
                            <Building2 className="w-5 h-5 text-white" />
                            <span className="font-semibold text-white">AgencyHub</span>
                        </div>
                        <p className="text-xs text-gray-500">
                            Professional contact management for agencies
                        </p>
                    </div>
                </div>
            </footer >
        </div>
    );
}
