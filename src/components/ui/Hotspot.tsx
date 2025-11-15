import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface HotspotProps {
  x: number;
  y: number;
  title: string;
  description: string;
}

const Hotspot = ({ x, y, title, description }: HotspotProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className="absolute w-6 h-6 -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${x}%`, top: `${y}%` }}
          aria-label={`More info about ${title}`}
        >
          <span className="relative flex h-4 w-4 m-auto">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-sky-500 border-2 border-white"></span>
          </span>
        </button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">{title}</h4>
            <p className="text-sm text-muted-foreground">
              {description}
            </p>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default Hotspot;