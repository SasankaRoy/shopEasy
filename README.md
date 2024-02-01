Welcome to Shop-Easee, a modern e-commerce platform designed to make online shopping easy and enjoyable. As a developer, you'll be interested to know about the features and technologies used in this project.

Features
--------
1.User-Friendly Interface: Shop-Easee features a clean and intuitive interface that makes it easy for users to navigate and find what they need. The interface is responsive, meaning it adapts to different screen sizes and devices.

2.Product Catalog: Our platform has a comprehensive product catalog that allows users to browse and discover products easily. The catalog is filterable, sortable, and includes high-quality product images.

3.Search Functionality: We've implemented a powerful search function that allows users to find products quickly and efficiently. The search function includes suggestions and autocomplete features to help users find what they're looking for.

4.Shopping Cart and Checkout: Our shopping cart and checkout process are designed to be simple and straightforward. Users can add products to their cart, view their cart at any time, and proceed to checkout when they're ready.

5.Payment Gateway Integration: We've integrated multiple payment gateways, including Stripe, PayPal, and Authorize.net, to allow users to pay for their orders securely.

6.Order Tracking: Once an order is placed, users can track their order status from their account page. They'll receive email updates on their order status, too.

7.Customer Support: We've included a contact form and
   email address for customer support, making it easy for users to get help when they need it.

Technologies Used
-----------------

1.Frontend: The frontend of Shop-Easee is built using React and Next.js, a popular JavaScript library and full stack framework for building user interfaces. We've used React to create reusable UI components, manage state changes, and handle events.

2.Backend: The backend of Shop-Easee is built using Node.js and Express.js, a popular JavaScript framework for building web applications. We've used Node.js to create RESTful APIs, handle HTTP requests and responses, and manage database connections.

3.Database: We've used MongoDB as our database management system to store product information, user accounts, and order data. MongoDB is a popular choice for e-commerce platforms due to its reliability, scalability, and performance.

4.Payment Gateway Integration: We've integrated multiple payment gateways, including Stripe, PayPal, and Authorize.net, to allow users to pay for their orders securely. We've used APIs provided by each payment gateway to handle transactions and process payments.

5.Authentication and Authorization: We've implemented authentication and authorization using JSON Web Tokens (JWT) to secure user data and restrict access to certain pages and features.

6.Caching: To improve performance, we've implemented caching using Redis, a popular in-memory data structure store. We've used Redis to cache frequently accessed data, such as product information and user accounts.

7.Serverless Functions: We've used serverless functions, such as AWS Lambda, to handle tasks that don't require a full server. Serverless functions help reduce costs, improve scalability, and increase system reliability.

<!-- 8. Monitoring and Logging: We've implemented monitoring and logging tools, such as ELK (Elasticsearch, Logstash, and Kibana), to ensure our system is running smoothly. Monitoring and logging tools help us -->


## Getting Started in the local sever or development.

1.First, run the command to install all the dependencies and pakages which are required to run the application:
```bash
npm install
```
2.Then configure you env file in main folder  `.env.local` file name and these variables are important for running the application. Below are the variables names and the values which are accpected:
``````bash

MONGO_URI='your mongoDB url or connection string'

SECRET_KEY='a secret key for hashing the user password'

NEXT_PUBLIC_MEDIA_TO_MEDIAURL_CONVERTER='your cloudinary url to convert the img file to data url'

NEXT_PUBLIC_CLOUD_NAME='cloud name for cloudinary'

NEXT_PUBLIC_UPLOAD_PRESET='cloud preset for cloudinary'

PRODUCTION_DOMAIN='production domain (optional)'

DEVELOPMENT_DOMAIN=http://localhost:3000

``````

3.After completing the above steps run the command to start the application or run the development server:

```bash
npm run dev
#or
yarn dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.


