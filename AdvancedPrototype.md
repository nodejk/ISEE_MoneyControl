## Goals: 
1. Added Currency Conversion.
2. Added New Sync account page with email validator.
3. Edit, add or delete categories and payment methods.
4. Mostly UI components.

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
<img src = "images/IMG-1684.PNG" width ="300" />


### Settings Page (User Page --> Settings)

Clicking on "Add..." will add a new type and clicking on the item will open a edit modal. Further, clicking on the bin item will delete the item.

<img src = "images/IMG-1685.PNG" width ="300" /><img src = "images/IMG-1687.PNG" width ="300" /><img src = "images/IMG-1697.PNG" width ="300" />
<img src = "images/IMG-1688.PNG" width ="300" /><img src = "images/IMG-1689.PNG" width ="300" />






## Component Diagram

<img src = "images/classDiagram.png" />
