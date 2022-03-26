import { Tr, Td } from "@chakra-ui/react";

import CurrencyInput from "./CurrencyInput";
import { getMonthName } from "../utils/helpers";

export interface IncomingTax {
  month: number;
  tax: number;
  withholding: number;
}

interface RowProps {
  row: IncomingTax;
  isDisabled?: boolean;
  onMonthTaxChange: (month: number, tax?: number) => void;
}

export default function Row(props: RowProps) {
  const { row, onMonthTaxChange } = props;
  return (
    <Tr>
      <Td>{getMonthName(row.month)}</Td>
      <Td>
        <CurrencyInput
          value={row.tax}
          onChange={(value) => onMonthTaxChange(row.month, value)}
        />
      </Td>
      <Td>
        <CurrencyInput value={row.withholding} readOnly />
      </Td>
    </Tr>
  );
}
