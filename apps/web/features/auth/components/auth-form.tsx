'use client';

import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from '@repo/ui/components/tabs';
import SignUpForm from '@/features/auth/components/sign-up-form';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@repo/ui/components/card';
import SignInForm from '@/features/auth/components/sign-in-form';

export default function AuthForm() {
    return (
        <div className="size-max">
            <Tabs defaultValue="signup" className="w-[400px]">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="signup">Sign Up</TabsTrigger>
                    <TabsTrigger value="signin">Sign In</TabsTrigger>
                </TabsList>
                <TabsContent value="signup">
                    <Card>
                        <CardHeader>
                            <CardTitle>Sign Up</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <SignUpForm />
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="signin">
                    <Card>
                        <CardHeader>
                            <CardTitle>Sign In</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <SignInForm />
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
