import React from "react";
import { Button, Card, Input, Text, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import classes from "./Login.module.scss";

interface SignupFormData {
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

    const handleSubmit = () => {
        console.log(form.values);
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
