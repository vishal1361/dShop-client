import React from 'react'
import { Empty } from 'antd';
import { Link } from 'react-router-dom';

import blankDashBoard from '../assets/blankDashboards.jpeg'
const Dashboard = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' , height: '30vh'}}>
        <Empty
            image={blankDashBoard}
            imageStyle={{
                height: 200, // Adjust the height as needed
            }}
            description={
              <span>
              Add products to see performance. <Link to='/sell'>Start selling now...</Link>
            </span>
          
            }
        >
            {/* <Button type="primary">Create Now</Button> */}
        </Empty>
  </div>
  )
}

export default Dashboard