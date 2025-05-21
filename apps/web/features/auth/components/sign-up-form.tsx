'use client';

import { authClient } from '@/features/auth/auth-client';
import { Button } from '@repo/ui/components/button';
import {
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
    FormRootError,
    Form,
} from '@repo/ui/components/form';
import { Input } from '@repo/ui/components/input';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

type SignUpInputs = {
    name: string;
    email: string;
    password: string;
};

export default function SignUpForm() {
    const form = useForm<SignUpInputs>({
        defaultValues: {
            email: '',
            password: '',
            name: '',
        },
    });
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit: SubmitHandler<SignUpInputs> = async (formData) => {
        const { email, name, password } = formData;
        setIsLoading(true);

        await authClient.signUp.email(
            {
                email,
                password,
                name,
            },
            {
                onSuccess: () => {
                    router.push('/');
                },
                onError: (ctx) => {
                    setIsLoading(false);
                    form.setError('root', {
                        type: 'custom',
                        message: ctx.error.message,
                    });
                },
            },
        );
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="name"
                                    {...{ ...field, required: true }}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="email"
                                    type="email"
                                    {...{ ...field, required: true }}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="password"
                                    type="password"
                                    {...{
                                        ...field,
                                        required: true,
                                        minLength: 8,
                                    }}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormRootError />
                <Button type="submit">
                    {isLoading ? 'Loading' : 'Submit'}
                </Button>
            </form>
        </Form>
    );
}
