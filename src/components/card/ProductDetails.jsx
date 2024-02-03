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

const data = [
  {
    "Uniq Id": "4c69b61db1fc16e7013b43fc926e502d",
    "Product Name": "DB Longboards CoreFlex Crossbow 41\" Bamboo Fiberglass Longboard Complete",
    "Brand Name": "",
    "Asin": "",
    "Category": "Sports & Outdoors | Outdoor Recreation | Skates, Skateboards & Scooters | Skateboarding | Standard Skateboards & Longboards | Longboards",
    "Upc Ean Code": "",
    "List Price": "",
    "Selling Price": "$237.68",
    "Quantity": "",
    "Model Number": "",
    "About Product": "Make sure this fits by entering your model number. | RESPONSIVE FLEX: The Crossbow features a bamboo core encased in triaxial fiberglass and HD plastic for a responsive flex pattern that’s second to none. Pumping & carving have never been so satisfying! Flex 2 is recommended for people 120 to 170 pounds. | COREFLEX TECH: CoreFlex construction is water resistant, impact resistant, scratch resistant and has a flex like you won’t believe. These boards combine fiberglass, epoxy, HD plastic and bamboo to create a perfect blend of performance and strength. | INSPIRED BY THE NORTHWEST: Our founding ideal is chasing adventure & riding the best boards possible, inspired by the hills, waves, beaches & mountains all around our headquarters in the Northwest | BEST IN THE WORLD: DB was founded out of sheer love of longboarding with a mission to create the best custom longboards in the world, to do it sustainably, & to treat customers & employees like family | BEYOND COMPARE: Try our skateboards & accessories if you've tried similar products by Sector 9, Landyachtz, Arbor, Loaded, Globe, Orangatang, Hawgs, Powell-Peralta, Blood Orange, Caliber or Gullwing",
    "Product Specification": "Shipping Weight: 10.7 pounds (View shipping rates and policies)|ASIN: B07KMVJJK7|    #474    in Longboards Skateboard",
    "Technical Details": "",
    "Shipping Weight": "10.7 pounds",
    "Product Dimensions": "",
    "Image": "https://images-na.ssl-images-amazon.com/images/I/51j3fPQTQkL.jpg|https://images-na.ssl-images-amazon.com/images/I/31hKM3cSoSL.jpg|https://images-na.ssl-images-amazon.com/images/I/51WlHdwghfL.jpg|https://images-na.ssl-images-amazon.com/images/I/51FsyLRBzwL.jpg|https://images-na.ssl-images-amazon.com/images/G/01/x-locale/common/transparent-pixel.jpg",
    "Variants": "https://www.amazon.com/DB-Longboards-CoreFlex-Fiberglass-Longboard/dp/B07KMVJJK7|https://www.amazon.com/DB-Longboards-CoreFlex-Fiberglass-Longboard/dp/B07KMN5KS7|https://www.amazon.com/DB-Longboards-CoreFlex-Fiberglass-Longboard/dp/B07KMXK857|https://www.amazon.com/DB-Longboards-CoreFlex-Fiberglass-Longboard/dp/B07KMW2VFR",
    "Sku": "",
    "Product Url": "https://www.amazon.com/DB-Longboards-CoreFlex-Fiberglass-Longboard/dp/B07KMVJJK7",
    "Stock": "",
    "Product Details": "",
    "Dimensions": "",
    "Color": "",
    "Ingredients": "",
    "Direction To Use": "",
    "Is Amazon Seller": "Y",
    "Size Quantity Variant": "",
    "Product Description": ""
  }
];

const ProductDetails = () => {
  const formattedData = Object.entries(data[0]).map(([key, value]) => ({
    key,
    name: key,
    value,
  }));

  return (
    <div>
      <Table columns={columns} dataSource={formattedData} pagination={false} />
    </div>
  );
};

export default ProductDetails;
