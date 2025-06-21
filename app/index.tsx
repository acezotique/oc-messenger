import { Image } from "react-native";
import React, { useState } from "react";
import RootContainer from "@/libs/components/layout/RootContainer";
import Column from "@/libs/components/layout/Column";
import Input from "@/libs/components/elements/Input";
import Label from "@/libs/components/elements/Label";
import Button from "@/libs/components/elements/Button";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormField from "@/libs/components/forms/FormField";
import { onUserLogin } from "@/api-actions/auth/auth";

const LoginSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type LoginFormType = z.infer<typeof LoginSchema>;

const LoginScreen = () => {
  const { control, handleSubmit } = useForm<LoginFormType>({
    resolver: zodResolver(LoginSchema),
  });

  const onLogin: SubmitHandler<LoginFormType> = async (payload) => {
    const user = await onUserLogin(payload);
    console.log(user);
  };

  return (
    <RootContainer backgroundColor="background">
      <Column align="center" justify="center" flex padding={16} gap={30}>
        <Column centered>
          <Image source={require("@/assets/images/logo.png")} />
          <Label
            label="Messenger"
            color="primaryAccentColor"
            weight="bold"
            size="lg"
          />
        </Column>
        <Column gap={10} width="100%">
          <FormField
            control={control}
            name="email"
            label="Email"
            labelColor="primaryAccentColor"
            renderField={({
              field: { value, onChange, onBlur },
              fieldState: { error },
            }) => (
              <Input
                value={value}
                type="email"
                onChange={(e) => onChange(e.nativeEvent.text)}
                onBlur={onBlur}
                error={error?.message}
              />
            )}
          />
          <FormField
            control={control}
            name="password"
            label="Password"
            labelColor="primaryAccentColor"
            renderField={({
              field: { value, onChange, onBlur },
              fieldState: { error },
            }) => (
              <Input
                value={value}
                type="password"
                onChange={(e) => onChange(e.nativeEvent.text)}
                onBlur={onBlur}
                error={error?.message}
              />
            )}
          />
          <Button label="Login" onPress={handleSubmit(onLogin)} />
          <Button label="Forgot Password" variant="link" />
        </Column>
      </Column>
    </RootContainer>
  );
};

export default LoginScreen;
