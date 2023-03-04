import React, { useState } from "react";
import { Button, Card, Input, Text, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import classes from "./Login.module.scss";
import { User } from "../classes/user.interface";
import { signUp } from "../functions/api.server";
import { setUserLogin } from "../store/features/userSlice";
import { handleAndVisualizeError } from "../common";
import { toast } from "react-toastify";
import { useAppDispatch } from "../store/hooks";
import { useNavigate } from "react-router-dom";

export interface SignupFormData {
    name: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}
const Signup = () => {
    const form = useForm<SignupFormData>({
        initialValues: {
            name: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
        validate: {
            name: (value) => value.trim().length ? null : "Name is required",
            lastName: (value) => value.trim().length ? null : "lastName is required",
            email: (value) => /^\S+@\S+\.\S+$/.test(value) ? null : "Invalid email",
            password: (value) => value.trim() ? null : "Password is required",
            confirmPassword: (value, values) => value === values.password ? null : "Password must be equals",
        },
        validateInputOnBlur: true
    });

    const [isLoading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleSubmit = async (data: SignupFormData) => {
        setLoading(true);
        try {
            let res = await signUp<User>(data);
            toast(<strong>User created successfully: {res.email} </strong>, { type: "success", autoClose: 6000 })
            navigate("/auth");
        } catch (e: any) {
            handleAndVisualizeError("Signup Filed",e);
        }
        setLoading(false);
    };

    return (

        <Card radius="lg" shadow="lg"
            className={classes["login"]} >
            <h2 style={{ margin: 0 }}>
                Sign up
            </h2>
            <Text mb={16}>Fill all of your data</Text>
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <TextInput radius="lg"
                    size="md"
                    label="Name"
                    placeholder="Enter your name"
                    withAsterisk
                    {...form.getInputProps("name")}
                    style={{ marginBottom: 20 }}
                />
                <TextInput radius="lg"
                    size="md"
                    label="Last name"
                    placeholder="Enter your last name"
                    withAsterisk
                    {...form.getInputProps("lastName")}
                    style={{ marginBottom: 20 }}
                />
                <TextInput radius="lg"
                    size="md"
                    label="Email"
                    placeholder="Enter your email"
                    type="email"
                    withAsterisk
                    {...form.getInputProps("email")}
                    style={{ marginBottom: 20 }}
                />
                <TextInput radius="lg"
                    size="md"
                    label="Password"
                    placeholder="Enter your password"
                    type="password"
                    withAsterisk
                    {...form.getInputProps("password")}
                    style={{ marginBottom: 20 }}
                />
                <TextInput radius="lg"
                    size="md"
                    label="Confirm password"
                    placeholder="Confirm your password"
                    type="password"
                    withAsterisk
                    {...form.getInputProps("confirmPassword")}
                    style={{ marginBottom: 20 }}
                />
                <Button type="submit" fullWidth variant="gradient" size="md" radius="lg">
                    Signup
                </Button>
            </form>
        </Card>

    );
};

export default Signup;
