import React from "react";
import {
  Control,
  Controller,
  Path,
  ControllerRenderProps,
  ControllerFieldState,
  UseFormStateReturn,
} from "react-hook-form";
import Column from "../layout/Column";
import Row from "../layout/Row";
import Label from "../elements/Label";
import { ColorKeys } from "@/constants/Colors";

type FormFieldProps<T extends object> = {
  control: Control<T>;
  name: Path<T>;
  renderField: ({
    field,
    fieldState,
    formState,
  }: {
    field: ControllerRenderProps<T, Path<T>>;
    fieldState: ControllerFieldState;
    formState: UseFormStateReturn<T>;
  }) => React.ReactNode;
  label: string;
  labelColor?: ColorKeys;
  direction?: "row" | "column";
};

const FormField = <T extends object>({
  control,
  name,
  renderField,
  label,
  labelColor = "primaryText",
  direction = "column",
}: FormFieldProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState, formState }) =>
        direction === "column" ? (
          <Column gap={10}>
            <Label label={label} color={labelColor} size="sm" />
            {renderField({ field, fieldState, formState })}
            {fieldState.error && (
              <Label
                label={fieldState.error?.message}
                color="error"
                size="xsm"
              />
            )}
          </Column>
        ) : (
          <Row gap={10} align="center">
            <Label label={label} color={labelColor} size="sm" />
            {renderField({ field, fieldState, formState })}
            {fieldState.error && (
              <Label
                label={fieldState.error?.message}
                color="error"
                size="xsm"
              />
            )}
          </Row>
        )
      }
    />
  );
};

export default FormField;
