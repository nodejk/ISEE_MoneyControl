## Goals: 
1. Added Currency Conversion.
2. Added New Sync account page with email validator.
3. Edit, add or delete categories and payment methods.


### New Category interface: 

id: string,
name: string,

### New Payment Interface:

id: string,
name: string,

### New CategoryThreshold Interface:

categoryId: string,
ThresholdValue: number,



## UI Feature:

### Sync Page (User Page --> Sync Account)

Added Email Validator in order to validate email format.

![WhatsApp Image 2022-06-13 at 16 27 49](https://user-images.githubusercontent.com/94879785/173468790-bbd797d9-1e33-4a12-9795-00cf6a4972f6.jpeg)

### Settings Page (User Page --> Settings)

![WhatsApp Image 2022-06-13 at 16 27 49 (1)](https://user-images.githubusercontent.com/94879785/173468837-a7c8b888-be0e-4973-85da-93c91d078744.jpeg)

On clicking either options, it opens a slide up modal:

![WhatsApp Image 2022-06-13 at 16 27 50](https://user-images.githubusercontent.com/94879785/173468883-3708ad03-3c31-4711-af89-f17f99855af5.jpeg)


Clicking on "Add..." will add a new type and clicking on the item will open a edit modal. Further, clicking on the bin item will delete the item.



## Component Diagram

![Class drawio (4)](https://user-images.githubusercontent.com/94879785/173468483-eaf789e5-de90-4cc4-bc5c-560f4bd8cc5e.png)
