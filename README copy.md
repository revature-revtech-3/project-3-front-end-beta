# Rev-Tech


Project 3 - E-Commerce Store (Team Project)

## Table of Contents 

* [Project Sprint 1 Description](#project-sprint-1-description)
* [Project Sprint 2 Description](#project-sprint-2-description)
* [Technologies Used](#technologies-used)
* [Sprint 1 Requirements](#sprint-1-requirements)
* [Sprint 2 Requirements](#sprint-2-requirements)
* [Legacy Features](#legacy-features)
* [New Features](#new-features)
* [Getting Started](#getting-started)
* [Application Screenshots](#application-screenshots)
* [Entity Relationship Diagram](#entity-relationship-diagram)
* [Contributors](#contributors)

## Project Sprint 1 Description
The Revtech E-Commerce Application is an Angular Single Page Application (SPA) that will allow users to sign up and login as a customer, browse all available products, view an individual product, and add products to their carts for purchase. Any user can browse the database of products, however, in order to purchase one you must be logged into an account. A new account can be created using the sign-up button. After an account is created the user will be able to login and purchase the products(s) of their choice. With our products route, the user is able to view all of the products we have in our database on a single page. When the user clicks on a product that they are interested in, it will redirect them to that product’s specific page to see additional details. Here, the user will be able to see the title, cost, discount and description of the product. This page will also include a button that will add the product to their cart if they would like to purchase it. The cart is the user’s final destination and where they will be able to see the products they wish to purchase, review the total costs of selected products, and also be able to check the products out to complete their purchase.

## Project Sprint 2 Description
In addition to the Sprint 1 functionality, mulitple functionalities were chosen to complement the existing Revtech application. Any user has the ability to reset their password. A user also has the ability to change the brightness of the application from the normal mode to a dark mode. Users are able to add one, or multiple items and checkout instantly. A new cart was created, so when a user chooses an item, it generates a new transaction and is saved to the purchase history. As well, one or multiple items are able to be placed on a wish list for future purchase. An administrator can create bundles from various products, along with applying a discount and name for the bundle. The administrator can also view a separate bundle table to see previous and newly created bundles to update their stock. On the user end, customers can view a newly created bundle tab, which when clicked, brings them to the page for bundled products that are discounted for an incentive to purchase them.  The user can then proceed to check-out the bundle for purchase. Users will receive an email notification when an item on their wish list is put on discount. Also, any bundle deal created with a user’s wish list item as part of the bundle, will trigger an email notification, because the item will be discounted as part of the bundle. When multiple wish list items are part of a bundled deal, only one email will be sent to the user.

## Technologies Used 
* Java (Programming Language) - version 11.0.12
* TypeScript (Programming Language)
* HTML (HyperText Markup Language)
* CSS / SCSS (Cascading Style Sheets) plus Angular Material
* Eclipse (IDE)
[//]: # "* Spring Tools Suite (STS)"
* Sonarlint (Code Refactorization)
* Apache Maven (Project Management)
[//]: # "* Node Package Manager (NPM)"
* PostgreSQL (Database)
* H2 (Database)
* Amazon Web Services - Elastic Cloud Computing (AWS EC2)
* Amazon Web Services - Simple Storage Service (AWS S3)
* Amazon Web Services - CodePipeline
* Jenkins (Automation Server)
* Docker (Image Containerization)
* Hibernate ORM (Object Relational-Mapping Tool)
* Spring Framework (Spring Boot, Spring Data, Spring Web, Spring AOP, Spring Mail, Spring Jasypt)
* Spring Secuirty w/ JWT (JSON Web Token)
* Lombok
* JUnit 5 and Mockito (Testing Framework - Back)
[//]: # "* Selenium"
* Angular2+ (Web Framework)
* Jasmine / Karma (Testing Framework - Front)
* Microsoft Visual Studio Code (Source Code Editor)
* Postman (API Platform)
[//]: # "* DBeaver (Database Administration Tool)"

## Sprint 1 Requirements
1. As a User, I should be able to register a new account.
2. As a User, I should be able to log into the application.
3. As a User, I should be able to log out of the application.
4. As a User, I should be able to see a list of available products for me to add to my cart.
5. As a User, I should be able to search the product list to better find the item(s) I am interested in.
6. As a User, I should be able to see and purchase items that are on sale for a lower price.
7. As a User, I should be able to add items to my cart that I will later purchase or remove from my cart.
8. As a User, I should be able to select an amount of an item to add to my cart as I am adding an item.
9. As a User, I should be able to checkout with the items in my cart, purchasing them and removing them from the inventory.

## Sprint 2 Requirements
1. As a User, I should be able to reset my password.
2. As a User, I should be able to change the color scheme from the normal mode to a dark mode option.
3. As a User, I should be able to add item and checkout instantly.
4. As a User, I should be able to save items to a wish list to buy later.
5. As an Admin, I should be able to bundle certain items into a bulk deal with extra discount incentives.
6. As a User, I should receive email notifications when an item in my wish list is put on discount.

[//]: #"## Sprint 3 Requirements"
[//]: #"1. As an Admin, I should be able to see a dashboard that will show me a trend of sales over the past Month, Quarter, or Year."
[//]: #"2. As a Admin, I should be able to recommend the top products and automatically mark products as best sellers."
[//]: #"3. As a User, I should be able to filter by the best selling products and see a label for the recommended products."
[//]: #"4. As a User, I should receive email notifications when a transaction has completed."
[//]: #"5. As a User, I should be able to buy accessories or secondary products that compliment or are relevant to my primary products."
[//]: #"6. As a User, I should be able to view a list of all my previous orders and access the details of each order."

## Legacy Features
List of previously implemented features
* Ability to register as a customer
* Ability to login as an customer or administrator
* Ability to view appropriate interfaces upon login dependent upon level of access (admin or customer)
* Ability to add a product to storefront as an administrator
* Ability to add a discounted product to storefront as an administrator
* Ability to update or remove a product from storefront as an administrator
* Ability to update or remove a discounted product from storefront as an administrator
* Ability to view account information as a user
* Ability to view the storefront as a user (including guest)
* Ability to view the discounted items as a user (including guest)
* Ability to view the product description page as a user
* Ability to add items to cart as a user
* Ability to select quantity of a particular item to add to cart as a user
* Ability to checkout as a user
* Ability to logout as a user
* Ability to add and view customer reviews as a user
* Ability to view orders history as a user

[//]: # "Convert Below to Legacy"
## New Features 
* Ability to reset password as a user
* Ability to switch background color from original theme (light) to dark theme by using Angular material
* Ability to add items and checkout instantly (buy now) as a user
* Ability to add items to a wish list for future purchase
* Ability to add items to bundled deals for the purpose of discounting cumulative items as an administrator
* Ability to send automated emails when any item on a user's wish list is discounted
* Ability to send automated emails when any item, or items on a user's wish list is part of a bundled deal

[//]: # "Actually New"
[//]: # "## New Features"
[//]: # "Ability to view a series of Graphs analyzing the Store's Monthly, Quarterly, and Yearly Sales History"
[//]: # "Ability to mark items as recommended as an admin"
[//]: # "Ability to view items marked as best selling as an admin or user"
[//]: # "Ability to send automated emails when a user makes a purchase"
[//]: # "Ability to view additional secondary items related to the items being actively viewed"
[//]: # "Ability to view additional details about prior order history transactions"

[//]: # "Rev Tech Second Sprint Team "To-do List [Legacy]"
To-do list: 
* Ability to update account information as a user
* Ability to contact customer support (live chat)
* Ability to submit payment information as a user
* Ability to enroll in a payment plan option as a user
* Ability to display payment information in user details

[//]: # "Rev Tech Third Sprint Team"
[//]: # "To-do list:"
[//]: # "* "
[//]: # "* "
[//]: # "* "
[//]: # "* "
[//]: # "* "


## Getting Started 
Please refer to `STARTUP.md` file

# Application Screenshots 
![Store](https://i.postimg.cc/fyngQ8cX/store.png)
![Store_with_Dark_Mode](https://i.postimg.cc/9f8KRYdR/dark-mode-store-page.png)
![Login / Register / Profile](https://i.postimg.cc/260vYyND/merge-user.png)
![Forget_Password/Reset_Password](https://i.postimg.cc/QxqYvkH9/merge-from-ofoct.jpg)
![Product Details](https://i.postimg.cc/zvFpZ8XZ/item-page.png)
![Product Review](https://i.postimg.cc/15yJ0nJ9/review.png)
![Cart / Checkout / Confirmation / Orders History](https://i.postimg.cc/NGPTtdgx/Screen-Shot-2022-01-14-at-12-54-49-PM.png)
![Wistlist](https://i.postimg.cc/jdvvMxFy/wish-list.png)
![Manage Store](https://i.postimg.cc/rst534tT/Screen-Shot-2022-01-14-at-1-09-55-PM.png)
![Manage Store Forms](https://i.postimg.cc/1XJZxgxW/Screen-Shot-2022-01-14-at-1-04-27-PM.png)
![Email_Notifications](https://i.postimg.cc/FsxHYqnP/email-discount.png)

[//]: # "Jazzdear Singers Application Screenshots [to be merged]"
![Sales Dashboard]


# Entity Relationship Diagram
![Sales-1]()
![Sales-2]()
![Recommended-Admin]()
![Recommended-Store]()
![Email-TransactionComplete]()
![SecondaryProducts]()
![OrderHistory-1]()
![OrderHistory-2]()

Contributors
-----
Scrum Master:
* Rebecca Lopez - Scrum Master / Technical Lead
[//]: # "Scrum Master:"
[//]: # "* Deagan Henderson"

Team Leads:
* Tyler Boston - Technical Lead (Front-end Development/Email Notifications Team)
* Suzanna Mei - Technical Lead (Back-end Development/Wish List Team)
[//]: # "Team Lead:"
[//]: # "* Kiersten Christlieb"

Team Members:
* Mario Sanchez, Jr. (Testing Team)
* Joshua Cookhorne (Testing Team)
* Jordan Cooke (Security Personnel)
* Benjamin Barnhill (DevOps Personnel)
* Rana Ismael (Reset Password Team)
* Leana Kazi (Reset Password Team)
* Chunkit Yip (Dark Mode Personnel)
* Samia Jahan (Buy Now Team)
* Christopher Phillips (Buy Now Team)
* Dimitri Luck (Wish List Team)
* Ian Banson (Bundle Deals Team)
* Davaras Bronson (Bundle Deals Team)
* Hailemichael Hagos (Bundle Deals Team)
* Travis Jackson (Email Notifications Team)

[//]: # "Best Sellers & Recommended Products Team:"
[//]: # "* Jorge Fernández"
[//]: # "* Joy Umoekpo"

[//]: # "Email Notifications Team:"
[//]: # "* Lindi Porter"
[//]: # "* Robert Williams"

[//]: # "Notifications Team:"
[//]: # "* Jack Che"
[//]: # "* Jasson Mendoza"

[//]: # "Sales Analytics Team:"
[//]: # "* Christopher Costa"
[//]: # "* Jaunzel Mullins"

[//]: # "Secondary Products Team:"
[//]: # "* Josh Edwards"
[//]: # "* Kouame Djah"

[//]: # "View Previous Orders Team:"
[//]: # "* Kiersten Christlieb"
[//]: # "* Ryan LaCombe"