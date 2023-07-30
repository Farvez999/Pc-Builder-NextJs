
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useProductContext } from "@/context/ProductContext";
import { Avatar, Button, Card, Col, Row } from "antd";
import Link from "next/link";


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
          </Col>
        ))}
      </Row>
    </div>
  );
};
export default ProductList;

export const getServerSideProps = async (context) => {
  const { id } = context.query;
  const res = await fetch(`https://pc-builder-nine.vercel.app/api/categories`);
  const categories = await res.json();

  const data = categories?.category?.find(product => product._id === id) || null



  return {
    props: { categories, data }
  };
};



ProductList.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};
