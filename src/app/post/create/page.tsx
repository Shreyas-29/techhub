"use client";

import React from 'react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import ImageButton from "@/components/image-button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormMessage, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { usePostModalStore } from "@/lib/post";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { PostValidator, type PostRequest } from "@/lib/post";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

const CreatePostPage = () => {

    const router = useRouter();

    const form = useForm<PostRequest>({
        resolver: zodResolver(PostValidator),
        defaultValues: {
            title: "",
            content: "",
            images: [],
        },
    });

    const { mutate, isPending } = useMutation({
        mutationFn: async ({ title, content, images }: PostRequest) => {
            const payload: PostRequest = {
                title,
                content,
                images
            };

            const { data } = await axios.post("/api/post/create", payload);
            return data;
        },
        onError: (error) => {
            if (error instanceof AxiosError) {
                if (error.response?.status === 405) {
                    toast.error("You are not authorized to perform this action");
                }

                if (error.response?.status === 422) {
                    toast.error("Invalid data provided. Please check your input and try again");
                }
            }

            toast.error("An error occurred. Please try again later");
        },
        onSuccess: () => {
            toast.success("Post published!");
            router.push("/");
            router.refresh();
        },
    });

    const handleUpload = (result: any) => {
        const image = result?.info?.secure_url;

        if (image) {
            // onChange(image);
        }
    };

    return (
        <div className="flex items-center justify-center h-[calc(100vh-56px)] w-full max-w-md mx-auto">
            <div className="flex flex-col items-center w-full py-8">
                <div className="space-y-2 w-full">
                    <h1 className="text-2xl font-bold">
                        Create Post
                    </h1>
                    <p className="text-muted-foreground">
                        Share your thoughts with the community
                    </p>
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit((e) => mutate(e))} className="pt-4 space-y-4 w-full">
                        <FormField
                            control={form.control}
                            name="images"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Image
                                    </FormLabel>
                                    <FormControl>
                                        <ImageButton
                                            value={field.value.map((image) => image.url)}
                                            disabled={isPending}
                                            onChange={(url: string) => field.onChange([...field.value, { url }])}
                                            onDelete={(url: string) => field.onChange([...field.value.filter((current) => current.url !== url)])}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isPending}
                                            placeholder="Enter post title"
                                            type='text'
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="content"
                            render={({ field }) => (
                                <FormItem className='col-span-1 lg:col-span-2'>
                                    <FormLabel>
                                        Content
                                    </FormLabel>
                                    <FormControl>
                                        <Textarea
                                            {...field}
                                            disabled={isPending}
                                            placeholder="Enter post content"
                                            className='max-h-60'
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex items-center justify-end w-full">
                            <Button
                                type="submit"
                                size="sm"
                                disabled={isPending}
                                className="w-24 text-center"
                            >
                                {isPending ? (
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                ) : "Post"}
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    )
}

export default CreatePostPage
