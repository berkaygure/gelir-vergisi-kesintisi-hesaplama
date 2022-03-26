import { Input, InputProps } from "@chakra-ui/react";
import NumberFormat, { NumberFormatProps } from "react-number-format";

interface CurrencyInputProps
  extends Omit<NumberFormatProps<InputProps>, "onChange"> {
  value: number;
  onChange?: (value?: number) => void;
}

export default function CurrencyInput({
  value,
  onChange,
  ...props
}: CurrencyInputProps) {
  return (
    <NumberFormat
      customInput={Input}
      allowNegative={false}
      thousandSeparator="."
      decimalSeparator=","
      suffix={"₺"}
      decimalScale={2}
      value={value}
      onValueChange={(values) => onChange?.(values.floatValue)}
      {...props}
    />
  );
}
