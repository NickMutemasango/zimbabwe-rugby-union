import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface Crumb { label: string; href?: string; }
interface BreadcrumbsProps { crumbs: Crumb[]; }

export default function Breadcrumbs({ crumbs }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-gray-400">
      <Link href="/" className="hover:text-[#006B3F] transition-colors">
        <Home size={14} />
      </Link>
      {crumbs.map((crumb, i) => (
        <span key={i} className="flex items-center gap-1.5">
          <ChevronRight size={12} className="text-gray-300" />
          {crumb.href ? (
            <Link href={crumb.href} className="hover:text-[#006B3F] transition-colors">{crumb.label}</Link>
          ) : (
            <span className="text-gray-600">{crumb.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
