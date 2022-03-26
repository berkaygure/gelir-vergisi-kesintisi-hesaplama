import {
  Box,
  Container,
  Heading,
  Table,
  Tbody,
  Th,
  Text,
  Tr,
  Thead,
  Tfoot,
  TableCaption,
  Divider,
  Icon,
  IconButton,
  Flex,
  OrderedList,
  ListItem,
} from "@chakra-ui/react";

import useLocalStorage from "./hooks/useLocalStorage";
import TableRow, { IncomingTax } from "./components/TableRow";
import { calculateIncomeTaxWithholdings } from "./utils/helpers";
import CurrencyInput from "./components/CurrencyInput";

function App() {
  const [rows, setRows] = useLocalStorage<IncomingTax[]>(
    "tax-calculator-rows",
    Array.from({ length: 12 }, (_, i) => ({
      month: i + 1,
      tax: 0,
      withholding: 0,
    }))
  );

  const handleMonthTaxChange = (month: number, tax?: number) => {
    if (tax !== undefined) {
      setRows((rows) => {
        const rowsBefore = rows.slice(0, month - 1);
        const totalTax = rowsBefore.reduce((acc, row) => acc + row.tax, tax);
        const totalWithholding = rowsBefore.reduce(
          (acc, row) => acc + row.withholding,
          0
        );

        return rows.map((row) => {
          if (row.month === month) {
            row.tax = tax;
            row.withholding =
              calculateIncomeTaxWithholdings(totalTax) - totalWithholding;
          }
          return row;
        });
      });
    }
  };

  return (
    <Container maxW="2xl" pb={20}>
      <Flex my={10}>
        <IconButton
          as={"a"}
          href="https://github.com/berkaygure/gelir-vergisi-kesintisi-hesaplama"
          target="_blank"
          aria-label="Github"
          colorScheme="facebook"
          icon={
            <Icon>
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </Icon>
          }
        />
        <Heading textAlign="center">
          2021 Yılı İçin Gelir Vergisi Hesaplama
        </Heading>
      </Flex>
      <Divider />
      <Box mt={10}>
        <Table width="100%" variant="striped" colorScheme="gray">
          <TableCaption>2021 Yılı İçin Gelir Vergisi Hesaplama</TableCaption>
          <Thead>
            <Tr>
              <Th width="100px">
                <Text>Ay</Text>
              </Th>
              <Th>
                <Text>Gelir Vergisi Matrahı</Text>
              </Th>
              <Th>
                <Text>Kesilen Gelir Vergisi</Text>
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {rows.map((row) => (
              <TableRow
                key={row.month}
                row={row}
                onMonthTaxChange={handleMonthTaxChange}
              />
            ))}
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>Toplam</Th>
              <Th>
                <CurrencyInput
                  value={rows.reduce((acc, row) => acc + row.tax, 0)}
                  readOnly
                />
              </Th>
              <Th>
                <CurrencyInput
                  value={rows.reduce((acc, row) => acc + row.withholding, 0)}
                  readOnly
                />
              </Th>
            </Tr>
          </Tfoot>
        </Table>
        <OrderedList mt={5} fontSize="xs">
          <ListItem>24.000 TL'ye kadar %15</ListItem>
          <ListItem>
            53.000 TL'nin 24.000 TL'si için 3.600 TL, fazlası için %20
          </ListItem>

          <ListItem>
            {" "}
            190.000 TL'nin 53.000 TL'si için 9.400 TL, fazlası için %27
          </ListItem>

          <ListItem>
            650.000 TL'nin 190.000 TL'si için 46.390 TL, fazlası için %35
          </ListItem>
          <ListItem>
            650.000 TL'den fazlasının 650.000 TL'si için 207.390 TL, fazlası
            için %40
          </ListItem>
        </OrderedList>
      </Box>
    </Container>
  );
}

export default App;
