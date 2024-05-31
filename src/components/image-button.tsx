"use client";

import { cn } from "@/lib/utils";
import { ImagePlus, Trash } from "lucide-react";
import { CldUploadButton } from 'next-cloudinary';
import Image from "next/image";
import { FC } from "react";
import { Button, buttonVariants } from "./ui/button";


interface ImageButtonProps {
    disabled?: boolean;
    value: string[];
    onChange: (url: string) => void;
    onDelete: (url: string) => void;
}

const ImageButton: FC<ImageButtonProps> = ({
    disabled,
    value,
    onChange,
    onDelete
}) => {

    const handleUpload = (result: any) => {
        const image = result?.info?.secure_url;

        if (image) {
            onChange(image);
        }
    };

    return (
        <div className="mb-4 flex flex-col items-start gap-4 w-full">
            {value.map((url) => (
                <div key={url} className="relative w-full">
                    <Image
                        src={url}
                        alt="Product"
                        className="w-full h-48 object-cover rounded-md"
                        width={1000}
                        height={1000}
                    />
                    <Button
                        type="button"
                        variant='destructive'
                        disabled={disabled}
                        size='icon'
                        className="absolute top-2 right-2"
                        onClick={() => onDelete(url)}
                    >
                        <Trash className="w-4 h-4 text-current" />
                    </Button>
                </div>
            ))}
            <CldUploadButton
                options={{ maxFiles: 1 }}
                onUpload={handleUpload}
                uploadPreset='ssqanesp'
            >
                <Button variant="subtle" disabled={disabled}>
                    <ImagePlus className="w-4 h-4 mr-2" />
                    <span>Upload Image</span>
                </Button>
            </CldUploadButton>
        </div>
    );
}

export default ImageButton;