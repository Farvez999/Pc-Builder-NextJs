import * as React from "react";
import dynamic from "next/dynamic";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/joy/Button";
import Add from "@mui/icons-material/Add";
import { useGetCategoryQuery } from "@/redux/features/category/categoryApi";
import Link from "next/link";
import { useProductContext } from "@/context/ProductContext";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { usePostProductsMutation } from "@/redux/features/order/orderSlice";
import { toast } from "react-hot-toast";
import { colors } from "@mui/material";
import { customColor } from "../../../utils/colors";
const RootLayout = dynamic(
  () => import("../../components/layouts/RootLayout"),
  {
    ssr: false,
  }
);

export default function PcBuilderPage() {
  const { data } = useGetCategoryQuery(null);
  const { selectedProducts, removeProduct } = useProductContext();
  const [postSelectedProducts, { isLoading, isSuccess, isError, error }] =
    usePostProductsMutation();
  const rows = data?.category;

  const isBuildComplete = !selectedProducts.length >= 5;


  const selectedCategories = Object.keys(selectedProducts);
  const allCategoriesSelected =
    rows?.every((row) => selectedCategories.includes(row.categories_name)) &&
    rows?.every(
      (row) =>
        Array.isArray(selectedProducts[row?.categories_name]) &&
        selectedProducts[row?.categories_name].length > 0
    );

  console.log(allCategoriesSelected)

  const handleAddToCart = async (product) => {
    const orderData = {
      orderProducts: selectedProducts,
    };

    await postSelectedProducts(orderData);
  };
  if (isSuccess) {
    toast.success("Selected products data saved successfully!");
  }
  if (isError) {
    toast.error(`${error.data.error}`);
    console.log(error);
  }
  const handleRemove = (category, productName) => {
    removeProduct(category, productName);
    console.log(category, productName);
  };

  const getTotalPrice = () => {
    const totalPrice = rows?.reduce((total, row) => {
      if (Array.isArray(selectedProducts[row?.categories_name])) {
        selectedProducts[row?.categories_name].forEach((product) => {
          total += parseFloat(product?.price) || 0;
        });
      }
      return total;
    }, 0);

    return totalPrice;
  };


  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginLeft: "4px",
          marginBottom: "6px",
          flexDirection: "row",
          gap: "14px",
          marginTop: "10px",
        }}
      >
        <h3 style={{ color: "white" }}>Total Price: ${getTotalPrice()}</h3>
        <Button
          disabled={!allCategoriesSelected}
          onClick={() => handleAddToCart(selectedProducts)}
          style={{
            backgroundColor: "blue",
            color: "white",
            fontSize: "18px",
            fontWeight: "600",
            padding: "14px 24px",
            width: "fit-content",
            borderRadius: "8px",
          }}
          color={customColor.buttonSecondary}
        >
          Add to Cart
        </Button>
        <button
          disabled={!isBuildComplete}
          style={{
            backgroundColor: "green",
            color: "white",
            fontSize: "18px",
            fontWeight: "600",
            padding: "14px 24px",
            width: "fit-content",
            borderRadius: "8px",
          }}
        >
          Complete Build
        </button>
      </div>

      <TableContainer component={Paper} style={{ backgroundColor: "white" }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell
                style={{
                  fontWeight: "bold",
                  fontSize: "20px",
                  textAlign: "center",
                }}
              >
                Devices
              </TableCell>

              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows?.map((row) => (
              <TableRow
                key={row?.categories_name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  component="th"
                  style={{
                    color: "#000",
                    fontSize: "20px",
                    textAlign: "center",
                  }}
                  scope="row"
                >
                  <div style={{ alignContent: "center" }}>
                    <img
                      src={row.image}
                      style={{ width: "80px", height: "80px" }}
                    ></img>
                    <p>{row.categories_name}</p>
                  </div>
                </TableCell>

                <TableCell>
                  {Array.isArray(selectedProducts[row?.categories_name]) &&
                    selectedProducts[row?.categories_name].map((p) => (
                      <React.Fragment key={p?.name}>
                        <p style={{ color: "#000", fontSize: "20px" }}>
                          {p?.name}
                        </p>
                        <p style={{ color: "#000", fontSize: "15px" }}>
                          Price: ${p?.price}
                        </p>
                        <IconButton
                          style={{ color: "red" }}
                          onClick={() => handleRemove(p?.category, p?.name)}
                          align="right"
                          aria-label="delete"
                          size="large"
                        >
                          <DeleteIcon fontSize="inherit" />
                        </IconButton>
                      </React.Fragment>
                    ))}
                </TableCell>
                <TableCell align="right">
                  {
                    <Link href={`/category-list/${row._id}`}>
                      {" "}
                      <Button startDecorator={<Add />}>Choose</Button>
                    </Link>
                  }
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}


PcBuilderPage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};
