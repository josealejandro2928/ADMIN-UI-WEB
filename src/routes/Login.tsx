import React, { useState } from "react";
import { Button, Card, Group, Input, Loader, Text, TextInput } from "@mantine/core";
import { useForm } from '@mantine/form';
import { Link, useNavigate } from "react-router-dom";
import classes from "./Login.module.scss";
import { login } from "../functions/api.server";
import { User } from '../classes/user.interface';
import { toast } from 'react-toastify';
import ErrorMessage from "../common/ErrorMessage";
import { useAppSelector, useAppDispatch } from '../store/hooks'
import { setUserLogin } from "../store/features/userSlice";
import { handleAndVisualizeError } from '../common/index';

export type FormLoginData = { email: string, password: string };
const Login = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch()
    const [isLoading, setLoading] = useState<boolean>(false);
    const form = useForm<FormLoginData>({
        initialValues: {
            email: '',
            password: '',
        },

        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            password: (value) => value ? null : "Password is required"
        },
        validateInputOnBlur: true
    });



    const handleSubmit = async (data: FormLoginData) => {
        setLoading(true);
        try {
            let res = await login<{ user: User, token: string }>(data);
            dispatch(setUserLogin(res));
            toast(<strong>User logged successfully</strong>, { type: "success" })
            navigate("/admin");
        } catch (e: any) {
            handleAndVisualizeError("Login failed", e);
        }
        setLoading(false);
    };

    return (

        <Card
            radius="lg" shadow="lg"
            className={classes["login"]}
        >
            <h2 style={{ margin: 0 }}>
                Sign in
            </h2>
            <Text mb={16}>Welcome to the Discover Model App</Text>
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <TextInput
                    radius="lg"
                    size="md"
                    aria-label="email"
                    withAsterisk
                    label="Enter your email"
                    placeholder="example@email.com"
                    {...form.getInputProps('email')}
                    style={{ marginBottom: 20 }}
                />
                <TextInput
                    radius="lg"
                    size="md"
                    aria-label="password"
                    label="Enter your password"
                    type="password"
                    placeholder="password"
                    required
                    {...form.getInputProps("password")}
                    style={{ marginBottom: 20 }}
                />
                <Button disabled={!form.isValid() || isLoading} radius="lg" size="md" variant="gradient" type="submit" fullWidth >
                    Login
                </Button>

            </form>
            {!isLoading && (
                <>
                    <div className={classes["sign-in-form-divider"]}>
                        <p className={classes["text"]}>
                            or
                        </p>
                    </div>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <Link to="signup" style={{ width: "100%", textDecoration: "none" }}>
                            <Button radius="lg" size="md" fullWidth variant="filled" color="gray">
                                Signup
                            </Button>
                        </Link>
                    </div>
                </>
            )}
            {isLoading && (
                <Group position="center">
                    <Loader variant="bars" />;
                </Group>
            )}

        </Card>

    );
};

export default Login;