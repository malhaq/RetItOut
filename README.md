# RentItOut: Peer-to-Peer Rental Platform for Everyday Items

**RentItOut** is a platform that allows users to rent everyday items they own but don’t use frequently, such as tools, electronics, and sports gear. This project focuses on building a **backend RESTful API** that powers the platform, making it easy for users to list, rent, and manage items.

---

## Features

- **Item Listings**: Users can list items they wish to rent out, including tools, electronics, sports equipment, etc.
- **Rental Management**: Manage rental durations, pricing, and flexible rental periods for each item.
- **Trust & Safety**: Implement user verification, item ratings, and security deposits to ensure a safe rental process.
- **Logistics**: Location-based options for pickup and delivery of items using integrated mapping services.
- **Revenue Model**: Platform generates revenue via commission-based fees, with optional damage protection.

---

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens) for secure login and authorization
- **API Documentation**: Postman and wiki for API documentation
- **External APIs**: Google Maps API (location-based services), Nodemailer (for email notifications)

---

## Getting Started

### Prerequisites

To get this project up and running locally, you’ll need the following installed:

- **Node.js** (v14 or higher)
- **MySQL** (for database management)
- **Docker** (optional, for containerized deployment)

### Installation

 **Clone the repository**:

   ```bash
   git clone https://github.com/malhaq/RentItOut.git
   cd RentItOut
