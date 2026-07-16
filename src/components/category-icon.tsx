import {
  Sparkle,
  GoogleLogo,
  MicrosoftExcelLogo,
  Compass,
  Code,
  PenNib,
  ChatCircle,
  CheckSquare,
  FolderOpen,
  Cpu,
} from "@phosphor-icons/react/dist/ssr";
import type { CategoryId } from "@/lib/types";

// All Phosphor icons share the same component signature; borrow one.
type PhosphorIcon = typeof Sparkle;

const ICONS: Record<CategoryId, PhosphorIcon> = {
  ai: Sparkle,
  "google-workspace": GoogleLogo,
  microsoft: MicrosoftExcelLogo,
  browsers: Compass,
  development: Code,
  design: PenNib,
  communication: ChatCircle,
  productivity: CheckSquare,
  "file-management": FolderOpen,
  "operating-systems": Cpu,
};

export function CategoryIcon({
  id,
  size = 20,
  weight = "bold",
}: {
  id: CategoryId;
  size?: number;
  weight?: "thin" | "light" | "regular" | "bold" | "fill" | "duotone";
}) {
  const Icon = ICONS[id] ?? Sparkle;
  return <Icon size={size} weight={weight} />;
}
