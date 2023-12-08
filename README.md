# Project Title
Cheapest Eggs

## 1. Project Description
Hey we’re CheapestEggs and we want to help you save money on groceries. 

Cheapest Eggs, our web application, is dedicated to assisting users in discovering the most affordable groceries. Users can search for product prices, create shopping lists using our extensive database, and benefit from our unique selling point—accessing not only prices from major supermarkets but also discovering great deals from local stores through user uploads.

## 2. Names of Contributors
List team members and/or short bio's here... 
* Hi, my name is Cai Chun (Steven) Yan! I am excited to be here!
* My name is Yifei Zeng, I am excited too!!! I wrote the profile page and the score system.
* My name is Peter Senyk, and I'm excited to work on this project and learn about designing and creating a web app. 
* My name is Jaiden Duncan. I'm excited to work on this to gain experience with working with a team and web design.
	
## 3. Technologies and Resources Used
List technologies (with version numbers), API's, icons, fonts, images, media or data sources, and other resources that were used.
* HTML, CSS, JavaScript, JQuery
* Firebase, Firebase storage, Firestore
* Sweet Alert


## 4. Complete setup/installion/usage
State what a user needs to do when they come to your project.  How do others start using your code or application?
Here are the steps ...
### 1. Visit the Website
   - Go to the official website of "Cheapest Eggs" by entering the URL in your web browser.

### 2. User Registration
   - If you're a new user, click on the "Sign Up" or "Register" button.
   - Fill in the required information, including your name, email address, and create a password.
   - Click on the "Register" button to create your account.

### 3. Login to the Account
   - After registration, click on the "Login" button.
   - Enter your email and password.
   - Click on the "Login" button to access your account.

### 4. Explore the Homepage
   - Familiarize yourself with the homepage layout.
   - Discover features such as the search bar, navigation options, and any highlighted sections.

### 5. Search for Products
   - Use the search bar to look for specific products, e.g., eggs.
   - Review the search results and click on the desired product.

### 6. View and Compare Product Prices
   - Explore the product page to view prices from major supermarkets.
   - Choose ascending or descending to sort the products

### 7. Create Shopping Lists
   - If you want to create a shopping list, find the option to add the product to your list.
   - Adjust quantities and manage your list easily.

### 8. Share Good Deal
   - Discover and share good deals from local stores by using the "Share" feature.
   - Contribute by uploading any great deals you discover.
   - You will win 1 score each time you share 1 item.

### 9. Profile Page
   - Click on your profile icon to access your profile page.
    - See the information of your profile and ensure it reflects your preferences.
    - Check your current title based on your score.

### 10. Modify Profile
   - On your profile page, find the "Edit" option.
    - Update your personal information as needed.
    
### 11. About
   - Know our team in the about page.
    - Follow our social media to get more information.

### 12. Logout (Optional)
   - If you're using a shared computer or for security reasons, find the logout option and click to log out securely.


## 5. Known Bugs and Limitations
Here are some known bugs:
* ...
* ...
* ...

## 6. Features for Future
What we'd like to build in the future:
1. **Use Supermarket API for Real Price Data:**
   - Implement integration with supermarket APIs to fetch real-time price data, providing users with the most up-to-date information.

2. **Blurry Search Functionality:**
   - Enable a blurry search feature to enhance user experience, allowing users to find products even with partially entered or misspelled queries.

3. **User-Initiated Deletion of Shared Items:**
   - Allow users to delete items they have shared, providing more control over their contributions to the community.

4. **Review and Validation for User Uploads:**
   - Implement a review process for user uploads to ensure the validity and accuracy of shared items. This helps maintain the quality of information in the database.

5. **Set Time Limits for Deals:**
   - Introduce a feature that allows users to set expiration times for deals, ensuring that the information remains relevant and timely.

These planned features aim to enhance the functionality and user experience of the "Cheapest Eggs" web application in the future.
	
## 7. Contents of Folder
Content of the project folder:

```
 Top level of project folder: 
├── .gitignore               # Git ignore file
├── index.html               # landing HTML file, this is what users see if they aren't logged in
├── share.html         # HTML file that allows users to share their grocery deals
├── share_review.html           #            
├── search_result.html          # 
├── profile.html             # HTML file where user can see all the information associated with their account
├── main.html           # landing HTML page/ home page if user is logged in
├── login.html               # User login page
├── list.html                # Page after user login   
├── for_injecting_data.html            # HTML page used for injecting mock API data to our database
├── about.html          # HTML page containing all the information about The Cheapest Egg
├── 404.html              # Firebase generated file
├── storage.rules             # Firebase generated file
├── firestore.rules             # Firebase generated file
├── firestore.indexes.json               # Firebase generated file
├── firebase.json                # Firebase generated file
├── .firebaserc           # Firebase generated file
└── README.md               # Complete project description

It has the following subfolders and files:
├── .git                     # Folder for git repo
├── images                   # Folder for images
    /blah.jpg                # Acknowledge source
├── scripts                  # Folder for scripts
    /blah.js                 # 
├── styles                   # Folder for styles
    /blah.css                # 
```
## Preliminary folder structure
```
.
├── images                              # Folder for images
        └── # 3061.png                  # Pictures of items
        └── # 3277.png
        └── # 4011.png
        └── # 4076.png
        └── # 4099.png
        └── # 4129.png
        └── # 4234.png
        └── # 4301.png
        └── # 4959.png
        └── # default_profile_pic.png   #Default profile picture
        └── # egg_logo.png              # Website Logo
        └── # egghand_blur.png          # index page background 
        └── # grocery_welcome_blur.jpg  # index page background
        └── # no_img.jpg                # Placeholder if there is no picture uploaded
        └── # noimg.png                 # Placeholder if there is no picture uploaded
├── scripts                             # Folder for scripts
        └── # add_to_list.js                  
        └── # authorization.js  
        └── # db_product_add.js  
        └── # db_product_search.js  
        └── # db_top_product.js  
        └── # each_item.js
        └── # firebaseAPI_Tea08.js  
        └── # list.js  
        └── # profile.js
        └── # scripts.js
        └── # share_review.js
        └── # share.js
        └── # skeleton.js
├── styles                              # Folder for styles
        └── style.css                   # Main CSS file
├── text                                # Folder for skeleton HTML files
        ├── footer_after_login.html     #
        ├── footer_before_login.html    #
        ├── nav_after_login.html        #
        └── nav_before_login.html       #
├── .gitignore                          # Git ignore file
└── README.md

```


