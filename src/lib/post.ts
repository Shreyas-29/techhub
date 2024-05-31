import { z } from "zod";
import { create } from "zustand";

interface PostModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
};

export const usePostModalStore = create<PostModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));

export const PostValidator = z.object({
    title: z.string().min(5).max(100),
    content: z.string().min(10).max(5000),
    images: z.object({ url: z.string() }).array().min(1),
});

export type PostRequest = z.infer<typeof PostValidator>;
