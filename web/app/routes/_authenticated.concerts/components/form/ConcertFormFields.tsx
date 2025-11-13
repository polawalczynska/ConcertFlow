import type { ConcertRequest } from "~/api";
import { Input } from "~/components/ui/Input";
import { Label } from "~/components/ui/Label";
import { Textarea } from "~/components/ui/Textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/Select";
import { DateTimePicker } from "./DateTimePicker";

interface ConcertFormFieldsProps {
  formData: ConcertRequest;
  formErrors: Record<string, string>;
  onFieldChange: (field: keyof ConcertRequest, value: string | number) => void;
  artists: Array<{ id?: number; name?: string }>;
}

export function ConcertFormFields({
  formData,
  formErrors,
  onFieldChange,
  artists,
}: ConcertFormFieldsProps) {
  return (
    <div className="grid gap-4 py-4 sm:grid-cols-3">
      <div className="sm:col-span-3">
        <Label htmlFor="name">
          Concert Name <span className="text-red-500">*</span>
        </Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => onFieldChange("name", e.target.value)}
          className={formErrors.name ? "border-red-500" : ""}
          placeholder="Enter concert name"
        />
        {formErrors.name && <p className="mt-1 text-xs text-red-500">{formErrors.name}</p>}
      </div>

      <div className="sm:col-span-3">
        <Label htmlFor="artistId">
          Artist <span className="text-red-500">*</span>
        </Label>
        <Select
          value={String(formData.artistId || "")}
          onValueChange={(value) => onFieldChange("artistId", Number.parseInt(value))}
        >
          <SelectTrigger className={formErrors.artistId ? "border-red-500" : ""}>
            <SelectValue placeholder="Select an artist" />
          </SelectTrigger>
          <SelectContent>
            {artists.map((artist) => (
              <SelectItem key={artist.id} value={String(artist.id)}>
                {artist.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {formErrors.artistId && <p className="mt-1 text-xs text-red-500">{formErrors.artistId}</p>}
      </div>

      <div className="sm:col-span-3">
        <DateTimePicker
          value={formData.date}
          onChange={(value) => onFieldChange("date", value)}
          error={formErrors.date}
        />
      </div>

      <div className="sm:col-span-3">
        <Label htmlFor="budget">
          Budget <span className="text-red-500">*</span>
        </Label>
        <Input
          id="budget"
          type="number"
          step="0.01"
          min="0"
          value={formData.budget || ""}
          onChange={(e) => onFieldChange("budget", Number.parseFloat(e.target.value) || 0)}
          className={formErrors.budget ? "border-red-500" : ""}
          placeholder="0.00"
        />
        {formErrors.budget && <p className="mt-1 text-xs text-red-500">{formErrors.budget}</p>}
      </div>

      <div className="sm:col-span-3">
        <Label htmlFor="venue">
          Venue <span className="text-red-500">*</span>
        </Label>
        <Input
          id="venue"
          value={formData.venue}
          onChange={(e) => onFieldChange("venue", e.target.value)}
          className={formErrors.venue ? "border-red-500" : ""}
          placeholder="Enter venue name"
        />
        {formErrors.venue && <p className="mt-1 text-xs text-red-500">{formErrors.venue}</p>}
      </div>

      <div className="sm:col-span-3">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description || ""}
          onChange={(e) => onFieldChange("description", e.target.value)}
          placeholder="Enter concert description"
          rows={2}
        />
      </div>
    </div>
  );
}

