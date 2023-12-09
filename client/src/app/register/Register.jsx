import React, { useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { useNavigate } from "react-router-dom";
import { userSignUp } from "../../api/apiCall";
import { errorMsg, successMsg } from "../../helpers/notificationMsg";

export default function Register() {
    const initial = {
        username: "",
        password: "",
    };
    const [inputData, setInputData] = useState(initial);
    const navigate = useNavigate()

    const handleInputData = (e) => {
        setInputData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSignUp = async (e) => {
        e.preventDefault()
        
        const res = await userSignUp(inputData)

        if(res.flag === 'SUCCESS'){
            successMsg(res.msg)
            setInputData(initial);
        } else {
            errorMsg(res.msg)
        }
    };

    const handleLogin = () => {
      navigate('/login')
    }

    return (
        <div className="grid place-items-center h-[100vh]">
            <Card className="w-[350px] shadow-lg">
                <CardHeader>
                    <CardTitle className="text-center mb-2">
                        Register Yourself
                    </CardTitle>
                    {/* <CardDescription>Card Description</CardDescription> */}
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSignUp}>
                    <div className="grid gap-4">
                        <Label htmlFor="username">Username</Label>
                        <Input
                            id="username"
                            placeholder="Type username"
                            name="username"
                            value={inputData.username}
                            onChange={handleInputData}
                        />
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="Type password"
                            name="password"
                            value={inputData.password}
                            onChange={handleInputData}
                        />
                        <div className="grid grid-cols-1">
                            <Button>Sign Up</Button>
                            <div className="text-center">or</div>
                            <Button
                                type="button"
                                variant="outline"
                                className="border-green-600"
                                onClick={handleLogin}
                            >
                                Already have an account ? Login
                            </Button>
                        </div>
                    </div>
                  </form>
                </CardContent>
            </Card>
        </div>
    );
}
