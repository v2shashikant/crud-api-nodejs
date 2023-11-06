# Todo Task List - CRUD API

This Node.js project provides a CRUD API for managing a todo task list.

## Table of Contents

- [Introduction](#introduction)
- [Requirements](#requirements)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Setup](#setup)
- [Database Schema](#database-schema)
- [Usage](#usage)

## Introduction

The Todo Task List project is a Node.js-based API allowing users to perform CRUD operations (Create, Read, Update, Delete) on tasks in a todo list. The API serves as an efficient way to manage tasks.

## Requirements

- Node.js (Minimum version 12.*)

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/v2shashikant/crud-api-nodejs.git
    ```

2. Copy the environment variables file:

    ```bash
    cp .env.example .env
    ```

## Environment Variables

Update the `.env` file with the following details:

- **MONGODB_URL**: Add your MongoDB URL here.
- **JWT_SECRET**: Set your JSON Web Token secret.

## Setup

1. Install project dependencies:

    ```bash
    npm install
    ```

## Database Schema

### Task Schema

The `Task` schema represents the structure of a task in the database.

#### Attributes

- `id`: Unique identifier for the task.
- `title`: Title of the task.
- `description`: Description of the task.
- `completed`: Boolean indicating task completion status.
- `createdAt`: Date and time of task creation.
- `updatedAt`: Date and time of task's last update.

## Usage

Start the server:

```bash
npm start
