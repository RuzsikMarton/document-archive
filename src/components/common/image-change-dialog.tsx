"use client";
import { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Loader2, Upload, X } from "lucide-react";

const ImageChangeDialog = ({
  open,
  setOpen,
  title,
  description,
  uploadImage,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  title: string;
  description: string;
  uploadImage: (file: File) => Promise<void>;
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setSelectedFile(null);
      setImagePreview(null);
    }
  };

  const handleSave = async () => {
    if (!selectedFile) return;

    try {
      setIsUploading(true);
      await uploadImage(selectedFile);

      setSelectedFile(null);
      setImagePreview(null);
      setOpen(false);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {imagePreview && (
          <div className="relative mt-4">
            <label htmlFor="photo">
              <img
                src={imagePreview}
                alt="Náhled obrazku"
                className="w-full h-auto rounded-lg"
              />{" "}
            </label>
            <div className="absolute top-2 right-2">
              <Button
                variant="destructive"
                size="icon"
                onClick={() => {
                  setSelectedFile(null);
                  setImagePreview(null);
                }}
              >
                <X className="size-4" />
              </Button>
            </div>
            <p className="mt-1 text-sm text-muted-foreground text-center">
              Kontrolujte obrázok pred uložením.
            </p>
          </div>
        )}
        {!selectedFile && (
          <label
            htmlFor="photo"
            className="flex h-40 w-full cursor-pointer flex-col items-center py-6 justify-center rounded-lg border-2 border-dashed hover:bg-muted"
          >
            <Upload className="mb-2 size-6" />
            <span className="text-sm font-medium">Nahrať obrázok</span>
            <span className="text-xs text-muted-foreground">
              PNG, JPG alebo WebP • max. 2 MB
            </span>
          </label>
        )}
        <Input
          type="file"
          id="photo"
          name="photo"
          accept="image/*"
          onChange={handleFileChange}
          className={"sr-only"}
        />
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => {
              setOpen(false);
              setSelectedFile(null);
              setImagePreview(null);
            }}
            disabled={isUploading}
          >
            Zrušiť
          </Button>
          <Button onClick={handleSave} disabled={isUploading}>
            {isUploading ? <Loader2 className="animate-spin" /> : "Uložiť"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ImageChangeDialog;
