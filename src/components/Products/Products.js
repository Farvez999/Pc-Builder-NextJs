import React from "react";

import Link from "next/link";
import { Card, Col, Row } from "antd";

const AllProducts = ({ products }) => {
  console.log(products)
  const cardHeight = 500;
  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ paddingLeft: '20px', color: 'white', textAlign: 'center' }}>Featured Products</h1>
      <Row gutter={16} >
        {products?.product?.map((product) => (
          <Col key={product.id} xs={24} sm={12} md={8} style={{ padding: '20px' }}>
            <Link href={`/products/${product._id}`}>
              <Card
                hoverable
                cover={<img alt={product.name} src={product.image} style={{ height: '200px', objectFit: 'cover' }} />}
              >
                <Card.Meta
                  title={product.name}
                  description={
                    <>
                      <div>Category: {product.category}</div>
                      <div>Price: {product.price}</div>
                      <div>Status: {product.inStock ? 'In Stock' : 'Out of stock'}</div>
                      <div>Rating: {product.rating} Stars</div>
                    </>
                  }
                />
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default AllProducts;
