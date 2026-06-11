import { test, expect } from "@playwright/test";


test(
"Cashier can complete sale",
async ({page})=>{


await page.goto("/");


// Email

await page.fill(
'input[placeholder="Enter Email"]',
"c1@gmail.com"
);


// Password

await page.fill(
'input[placeholder="Enter Password"]',
"123456"
);


// Login

await page.click(
"button:has-text('Login')"
);



// wait dashboard

await expect(
page.getByText("Cashier Dashboard")
)
.toBeVisible({
timeout:10000
});



// New Sale

await page.click(
"text=New Sale"
);



// wait new sale page

await expect(
page.getByText("New Sale")
)
.toBeVisible();



// Search product

await page.fill(
'input[placeholder="Search Product"]',
"m"
);



// select suggestion

await page.click(
".suggestion-item"
);



// quantity

await page.fill(
'input[placeholder="Quantity"]',
"2"
);


// add cart

await page.click(
"text=Add To Cart"
);



// complete sale

page.on(
"dialog",
async dialog=>{

console.log(dialog.message());

await dialog.accept();

});


await page.click(
"text=Complete Sale"
);



});