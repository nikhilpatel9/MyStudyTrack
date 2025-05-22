/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

export default function Login() {
    const [signUp, setSignUp] = useState({ 
        name: "",
        email: "",
        password: "",
        confirmPassword: "" 
    });
    const [login, setLogin] = useState({ email: "", password: "" });
    const [isValid, setIsValid] = useState(false);
    const [passwordMatch, setPasswordMatch] = useState(true);

    const changeInputHandler = (e, type) => {
        const { name, value } = e.target;
        if (type === "sign-up") {
            setSignUp({ ...signUp, [name]: value });
            
            // Check password match whenever either password or confirmPassword changes
            if (name === "password" || name === "confirmPassword") {
                const match = name === "password" 
                    ? value === signUp.confirmPassword 
                    : value === signUp.password;
                setPasswordMatch(match);
            }
        } else {
            setLogin({ ...login, [name]: value });
        }
    };

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;
        setIsValid(passwordRegex.test(newPassword));
        changeInputHandler(e, "sign-up");
    };

    const handleConfirmPasswordChange = (e) => {
        changeInputHandler(e, "sign-up");
    };
    const handleRegistration = (type) =>{
        const inputData = type === "sign-in" ? login : signUp 
        console.log('====================================');
        console.log(inputData);
        console.log('====================================');
    }
    return (
        <div className='flex justify-between h-screen items-center'>
            <div className='flex flex-col'>
                <h1 className="text-blue-800 text-4xl bold">Smart Study Scheduler</h1>
                <p className='w-150'>Your personal AI-powered planner that organizes your study sessions, tracks progress, and adapts to your learning style—so you can focus on what matters most: understanding and improving.</p>
            </div>
            <div className='flex justify-between'>
                <Tabs defaultValue="sign-up" className="w-[400px]">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="sign-in">Login</TabsTrigger>
                        <TabsTrigger value="sign-up">Sign Up</TabsTrigger>
                    </TabsList>
                    <TabsContent value="sign-in">
                        <Card>
                            <CardHeader>
                                <CardTitle>Login</CardTitle>
                                <CardDescription>
                                    Make changes to your account here. Click save when you're done.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <div className="space-y-1">
                                    <Label htmlFor="email">E-mail</Label>
                                    <Input 
                                        id="email"
                                        name="email"
                                        defaultValue="" 
                                        placeholder="xyz@gmail.com"
                                        value={login.email} 
                                        onChange={(e) => changeInputHandler(e, "sign-in")} 
                                        required 
                                    />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="password">Password</Label>
                                    <Input 
                                        id="password" 
                                        name="password"
                                        defaultValue="" 
                                        placeholder="*******"
                                        value={login.password} 
                                        onChange={(e) => changeInputHandler(e, "sign-in")} 
                                        required 
                                    />
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button onClick={()=>handleRegistration("sign-in")} >Login</Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                    <TabsContent value="sign-up">
                        <Card>
                            <CardHeader>
                                <CardTitle>Sign Up</CardTitle>
                                <CardDescription>
                                    Change your password here. After saving, you'll be logged out.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <div className="space-y-1">
                                    <Label htmlFor="name">Full Name</Label>
                                    <Input 
                                        id="name" 
                                        name="name"
                                        type="text"
                                        value={signUp.name} 
                                        onChange={(e) => changeInputHandler(e, "sign-up")} 
                                        required 
                                    />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="email">E-mail</Label>
                                    <Input 
                                        id="email" 
                                        name="email"
                                        defaultValue="" 
                                        placeholder="xyz@gmail.com"
                                        value={signUp.email} 
                                        onChange={(e) => changeInputHandler(e, "sign-up")} 
                                        required  
                                    />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="password">Password</Label>
                                    <Input 
                                        id="password" 
                                        name="password"
                                        type="password"
                                        defaultValue=""
                                        value={signUp.password}
                                        onChange={handlePasswordChange}
                                        placeholder="Enter password" 
                                        required
                                    />
                                </div>
                                <div>
                                    {isValid ? (
                                        <p style={{ color: 'green' }}>Password is valid!</p>
                                    ) : (
                                        <p style={{ color: 'red' }}>
                                            Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.
                                        </p>
                                    )}
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="confirmPassword">Confirm password</Label>
                                    <Input 
                                        id="confirmPassword" 
                                        name="confirmPassword"
                                        type="password" 
                                        value={signUp.confirmPassword}
                                        onChange={handleConfirmPasswordChange}
                                        placeholder="Confirm password" 
                                        required 
                                    />
                                    {!passwordMatch && (
                                        <p style={{ color: 'red' }}>Passwords do not match!</p>
                                    )}
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button disabled={!isValid || !passwordMatch} onClick={()=>handleRegistration("sign-up")}>Create Account</Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}