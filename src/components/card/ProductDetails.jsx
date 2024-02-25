import React from 'react';
import { Table, Space } from 'antd';

const columns = [
  {
    title: 'Specifications',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Details',
    dataIndex: 'value',
    key: 'value',
  },
];

const ProductDetails = ({ product }) => {
  const formattedData = [
    { name: 'Product Name', value: product.productName },
    { name: 'Brand Name', value: product.brandName },
    { name: 'Category', value: product.category },
    { name: 'Selling Price', value: product.sellingPrice },
    { name: 'Color', value: product.color },
    { name: 'Quantity', value: product.quantity },
    { name: 'Shipping Weight', value: product.shippingWeight },
    { name: 'Product Specifications', value: product.productSpecifications },
    { name: 'About Product', value: product.aboutProduct },
    { name: 'Technical Details', value: product.technicalDetails },
  ];

  return (
    <div style={{ maxHeight: '600px' }}>
      <Table columns={columns} dataSource={formattedData} pagination={false} scroll={{y: 600,}} />
    </div>
  );
};

export default ProductDetails;
