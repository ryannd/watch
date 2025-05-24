import { authClient } from '@/features/auth/lib/auth-client';
import { Button } from '@repo/ui/components/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormRootError,
} from '@repo/ui/components/form';
import { Input } from '@repo/ui/components/input';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

type SignInInputs = {
    email: string;
    password: string;
};

export default function SignInForm() {
    const form = useForm<SignInInputs>({
        defaultValues: {
            email: '',
            password: '',
        },
    });
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit: SubmitHandler<SignInInputs> = async (formData) => {
        const { email, password } = formData;
        setIsLoading(true);

        await authClient.signIn.email(
            {
                email,
                password,
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
