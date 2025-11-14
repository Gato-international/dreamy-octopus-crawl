import { Badge } from "@/components/ui/badge";

const FeatureText = () => {
  return (
    <div className="flex gap-4 flex-col items-start">
      <div>
        <Badge>Platform</Badge>
      </div>
      <div className="flex gap-2 flex-col">
        <h2 className="text-xl md:text-3xl lg:text-5xl tracking-tighter lg:max-w-xl font-regular text-left text-white">
          This is the start of something new
        </h2>
        <p className="text-lg max-w-xl lg:max-w-sm leading-relaxed tracking-tight text-white/70 text-left">
          Managing a small business today is already tough. Avoid further
          complications by ditching outdated, tedious trade methods. Our
          goal is to streamline SMB trade, making it easier and faster than
          ever.
        </p>
      </div>
    </div>
  );
};

export default FeatureText;