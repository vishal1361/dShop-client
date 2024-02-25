import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { Checkbox, List, Button,Tag, Card } from 'antd';

const Checkout = () => {
  const myCart = useSelector((state) => state.buyerReducer.myCart);

  const [checked, setChecked] = useState([]);
  const [indeterminate, setIndeterminate] = useState(false);
  const [checkAll, setCheckAll] = useState(false);

  useEffect(() => {
    setIndeterminate(checked.length && checked.length !== myCart.length);
    setCheckAll(checked.length === myCart.length);
  }, [checked, myCart]);

  const onCheckAllChange = (e) => {
    setChecked(e.target.checked ? myCart.map((item) => item.product.productId) : []);
    setCheckAll(e.target.checked);
  };

  const onCheckboxChange = (productId) => {
    const newChecked = [...checked];
    if (newChecked.includes(productId)) {
      newChecked.splice(newChecked.indexOf(productId), 1);
    } else {
      newChecked.push(productId);
    }
    setChecked(newChecked);
  };

  return (
    <>
      <List
        itemLayout="vertical"
        dataSource={myCart}
        renderItem={(item) => (
          <List.Item
            key={item.product.productId}
            extra={
              <img
                width={50}
                alt="productImage"
                src={item.product.productImages?.[0]}
              />
            }
          >
            <List.Item.Meta
              title={
                <span style={{ display: 'flex', alignItems: 'center', padding: '10px', color: 'white' }}>
                  <Checkbox
                    value={item.product.productId}
                    onChange={() => onCheckboxChange(item.product.productId)}
                    checked={checked.includes(item.product.productId)}
                  />
                  {item.product.productName}
                </span>
              }
              description={<span style={{ padding: '20px', color: 'white' }}>{item.product.category} | {item.product.sellingPrice}</span>}
            />
          </List.Item>
        )}
      />

      {/* <div style={{ marginTop: 20, color: 'white' }}>
        <b>Selecting:</b> {checked.join(', ')}
      </div> */}

    <Card style={{ width: '98%', margin: 'auto' }}>
      <div style={{ display: 'flex', justifyContent: 'right', alignItems: 'center' }}>
        <Button type="primary" danger size='large' style={{ fontSize: '15px', cursor: 'pointer' }}>
          Checkout &emsp;<Tag color="success">$400</Tag>
        </Button>
      </div>
    </Card>

    </>
  );
};

export default Checkout;
