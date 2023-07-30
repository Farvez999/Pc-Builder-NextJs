// import * as React from "react";
// import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
// import Button from "@mui/joy/Button";
// import Card from "@mui/joy/Card";
// import CardContent from "@mui/joy/CardContent";
// import Typography from "@mui/joy/Typography";
// import Sheet from "@mui/joy/Sheet";
// import Link from "next/link";
import dynamic from "next/dynamic";
import { useGetCategoryByNameQuery } from "@/redux/features/category/categoryApi";
import { useRouter } from "next/router";
import { useProductContext } from "@/context/ProductContext";
import { toast } from "react-hot-toast";
import Image from "next/image";

import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Button, Card, Col, Row } from "antd";
import Link from "next/link";
const { Meta } = Card;


const RootLayout = dynamic(
  () => import("../../components/layouts/RootLayout"),
  {
    ssr: false,
  }
);
const ProductList = ({ categories, data }) => {

  console.log(data)
  const { addProduct } = useProductContext();
  const router = useRouter();
  // console.log(router.query)
  // const id = router.query.id;
  //  const { data } = useGetCategoryByNameQuery(id);
  const products = data?.products;


  const handleAdd = (product) => {
    addProduct(product);
    router.push("/pc-builder");
  };

  return (
    <div style={{ padding: '20px' }}>
      <Row gutter={16} >
        {products?.map((product) => (
          <Col key={product.id} xs={24} sm={12} md={8} style={{ padding: '20px' }}>
            {/* <Link href={`/products/${product._id}`}> */}
            <Card
              hoverable
              cover={<img alt={product.name} src={product.image} style={{ height: '200px', objectFit: 'cover' }} />}
            >
              <Card.Meta
                title={product.name}
                description={
                  <>
                    {/* <div>Category: {product.categories_name}</div> */}
                    <div>Category: {product.category}</div>
                    <div>Price: {product.price}</div>
                    <div>Status: {product.status}</div>
                    <div>Rating: {product.average_rating} Stars</div>
                  </>
                }
              />

              <div style={{ marginTop: '10px' }}>
                <Link href={"/pc-builder"}>
                  <Button style={{ background: 'yellow', color: 'black', }}>
                    Back
                  </Button>
                </Link>
                <Button
                  onClick={() => handleAdd(product)}
                  style={{ background: 'blue', color: 'white', marginLeft: '10px' }}
                  disabled={product.status === "Out of Stock"}
                >
                  {product.status === "Out of Stock" ? "Out of Stock" : "Add to build"}
                </Button>
              </div>
            </Card>



            {/* </Link> */}
          </Col>
        ))}
      </Row>
    </div>
  );
};
export default ProductList;

export const getServerSideProps = async (context) => {
  const { id } = context.query;
  const res = await fetch(`https://pc-builder-two.vercel.app/api/categories`);
  const categories = await res.json();

  // Extract the products with the matching ID from the first category
  const data = categories?.category?.find(product => product._id === id) || null



  return {
    props: { categories, data }
  };
};



ProductList.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};


{/* <Card
            orientation="horizontal"
            sx={{
              width: "100%",
              flexWrap: "wrap",
              [`& > *`]: {
                "--stack-point": "500px",
                minWidth:
                  "clamp(0px, (calc(var(--stack-point) - 2 * var(--Card-padding) - 2 * var(--variant-borderWidth, 0px)) + 1px - 100%) * 999, 100%)",
              },
              // make the card resizable for demo
              overflow: "auto",
              resize: "horizontal",
            }}
          >
            <AspectRatio
              ratio="1"
              maxHeight={182}
              sx={{ minWidth: 182, flex: 1 }}
            >
              <Image
                height={400}
                width={200}
                src={product.image}
                srcSet="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286&dpr=2 2x"
                loading="lazy"
                alt={product.name}
              />
            </AspectRatio>
            <CardContent>
              <Typography fontSize="xl" fontWeight="lg">
                {product.categories_name}
              </Typography>
              <Typography
                level="body2"
                fontWeight="lg"
                textColor="text.tertiary"
              >
                {product.name}
              </Typography>
              <Sheet
                sx={{
                  bgcolor: "background.level1",
                  borderRadius: "sm",
                  p: 1.5,
                  my: 1.5,
                  display: "flex",
                  gap: 2,
                  "& > div": { flex: 1 },
                }}
              >
                <div>
                  <Typography level="body3" fontWeight="lg">
                    Price
                  </Typography>
                  <Typography fontWeight="lg">${product.price}</Typography>
                </div>
                <div>
                  <Typography level="body3" fontWeight="lg">
                    Status
                  </Typography>
                  <Typography fontWeight="lg">{product.status}</Typography>
                </div>
                <div>
                  <Typography level="body3" fontWeight="lg">
                    Average Rating
                  </Typography>
                  <Typography fontWeight="lg">
                    {product.average_rating}
                  </Typography>
                </div>
              </Sheet>
              <Box
                sx={{ display: "flex", gap: 1.5, "& > button": { flex: 1 } }}
              >
                <Link href={"/pc-builder"}>
                  <Button variant="outlined" color="neutral">
                    Back
                  </Button>
                </Link>
                <Button
                  onClick={() => handleAdd(product)}
                  variant="solid"
                  color="primary"
                  disabled={product.status === "Out of Stock"}
                >
                  {product.status === "Out of Stock" ? "Out of Stock" : "Add to build"}
                </Button>
              </Box>
            </CardContent>
          </Card> */}