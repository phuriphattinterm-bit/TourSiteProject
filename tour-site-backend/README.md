# 🗺️ Toursite API

A backend service for managing tour bookings, built with TypeScript, Node.js, and TypeORM. This application handles the core entities required for a tour agency: available tours and customer booking orders.

## 📦 Tech Stack

* **Language:** TypeScript
* **ORM:** TypeORM
* **Database:** Relational Database (e.g., PostgreSQL, MySQL)

## 🗄️ Database Schema

The database consists of two primary entities:

### `tours`
Stores the catalog of available tours.
| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | Primary Key | Auto-generated unique identifier |
| `title` | varchar(120) | Name of the tour |
| `short_description`| varchar(255) | Brief summary for catalog view |
| `long_description` | text | Full details and itinerary |
| `image_url` | varchar(255) | URL to the tour's display image |
| `price` | decimal(10,2)| Cost per person |
| `currency` | varchar(3) | Default is `JPY` (Japanese Yen) |
| `max_capacity` | int | Maximum number of guests allowed |

### `orders`
Stores customer bookings.
| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | Primary Key | Auto-generated unique identifier |
| `tour_name` | varchar(120) | Name of the booked tour |
| `tour_date` | date | Scheduled date for the tour |
| `hotel_name` | varchar(120) | Guest's pickup/accommodation hotel |
| `guest_number` | int | Total number of guests for this booking |

## 🚀 Getting Started

### Prerequisites
* Node.js (v16+)
* A running SQL Database instance

### Installation
1. Clone the repository:
   
   ```bash
   git clone <your-repo-url>
   cd toursite

2. Install dependencies:

   ```bash
   npm install

3. Create a `.env` file in the root directory and configure your database connection (or rely on the defaults in `app.module.ts`):

   ```env.example
   DB_HOST=localhost
   DB_PORT=3306
   DB_USERNAME=root
   DB_PASSWORD=123456789
   DB_NAME=toursite

### Running the Application
To start the server in development mode:

   ```bash
   npm run start:dev
   ```

### SQL Simulation Data

Run the following SQL commands in your database client to populate your tables with initial seed data.

```sql
-- --------------------------------------------------------
-- Seed Data for 'tours' table
-- --------------------------------------------------------

INSERT INTO tours (title, short_description, long_description, image_url, price, currency, max_capacity) 
VALUES 
(
    'Kyoto Heritage Walk', 
    'Explore the ancient temples and shrines of Kyoto.', 
    'A full-day walking tour covering Kinkaku-ji, Fushimi Inari Taisha, and the Arashiyama Bamboo Forest. Includes a traditional tea ceremony.', 
    '[https://example.com/images/kyoto-heritage.jpg](https://example.com/images/kyoto-heritage.jpg)', 
    12500.00, 
    'JPY', 
    15
),
(
    'Mount Fuji Day Trip', 
    'Experience breathtaking views of Japan''s iconic peak.', 
    'Travel by comfortable coach to the 5th Station of Mount Fuji, followed by a cruise on Lake Ashi and a ride on the Komagatake Ropeway.', 
    '[https://example.com/images/mt-fuji.jpg](https://example.com/images/mt-fuji.jpg)', 
    18000.00, 
    'JPY', 
    40
),
(
    'Tokyo Neon Nights', 
    'Discover the vibrant nightlife and street food of Shinjuku.', 
    'A guided evening tour through Kabukicho, Omoide Yokocho (Memory Lane), and Golden Gai. Food and local drinks are included.', 
    '[https://example.com/images/tokyo-nights.jpg](https://example.com/images/tokyo-nights.jpg)', 
    8500.00, 
    'JPY', 
    10
),
(
    'Osaka Culinary Experience', 
    'Taste the famous street food of Dotonbori.', 
    'Dive deep into Osaka''s food culture. Try authentic Takoyaki, Okonomiyaki, and Kushikatsu while exploring the vibrant Dotonbori district.', 
    '[https://example.com/images/osaka-food.jpg](https://example.com/images/osaka-food.jpg)', 
    9500.00, 
    'JPY', 
    20
);

-- --------------------------------------------------------
-- Seed Data for 'orders' table
-- --------------------------------------------------------

INSERT INTO orders (tour_name, tour_date, hotel_name, guest_number) 
VALUES 
('Kyoto Heritage Walk', '2026-06-15', 'Kyoto Grand Hotel', 2),
('Mount Fuji Day Trip', '2026-06-18', 'Shinjuku Prince Hotel', 4),
('Tokyo Neon Nights', '2026-06-20', 'Shibuya Stream Excel', 2),
('Kyoto Heritage Walk', '2026-06-22', 'Ritz-Carlton Kyoto', 1),
('Osaka Culinary Experience', '2026-06-25', 'Namba Oriental Hotel', 6);

-- --------------------------------------------------------
-- Seed Data for 'users' table
-- --------------------------------------------------------
-- ADMIN ACCOUNT DETAILS:
-- Username: admin123
-- Email: admin@gmail.com
-- Unhashed Password: 1234Admin!
-- --------------------------------------------------------

INSERT INTO users (username, password, email, admin) 
VALUES (
    'admin123', 
    '$2b$10$X4tto3VpePoUnvnXPQ0RPe542JLUE3ISt78merARli0QEO9oyjGG6', 
    'admin@gmail.com', 
    TRUE
);

---
