
# SQL Database Components

This directory contains the SQL database components for the e-commerce platform, organized into the following subdirectories:

## 1. Schema
Contains the complete database schema definition with all tables, constraints, indexes, and relationships.

## 2. Tables
Individual table creation scripts are stored here, each in its own file.

## 3. Queries
SQL queries are grouped by functionality:
- `product_queries.sql` - Queries related to products
- `order_queries.sql` - Queries related to orders
- `analytics_queries.sql` - Queries for analytics and reporting

## 4. Stored Procedures
Contains stored procedures for:
- `order_procedures.sql` - Order processing and management
- `report_procedures.sql` - Report generation

## 5. Triggers
Contains database triggers:
- `product_triggers.sql` - Triggers related to product changes
- `order_triggers.sql` - Triggers related to order and payment status changes

## Normalization
All tables adhere to proper normalization principles:
- First Normal Form (1NF) - No repeating groups, each cell contains a single value
- Second Normal Form (2NF) - All non-key attributes depend on the entire primary key
- Third Normal Form (3NF) - No transitive dependencies
- BCNF - Applied where necessary for Order_Items table

## Indexing Strategy
- Primary keys are automatically indexed
- Foreign keys are indexed for join performance
- Additional indexes are created for frequently queried fields
