
# DevPulse REST API

Internal Tech Issue & Feature Tracker

A collaborative platform for software teams to report bugs, suggest features, and coordinate resolutions.




## Tech Stack

**Language:** Typescript & Javascript

**Server:** Node, ExpressJS

**DataBase:** NeonDB & PostgreSql

**Security:** JWT & BcryptJs

**Deployment:** Vercel

## Live Link

 - [click me](devpulse-chi-lovat.vercel.app)

## Run this project locally

first clone this project 

```bash
  https://github.com/mdabdurrahman07/devPulse.git
  cd devpulse
```

then install all dependencis

```bash
  npm run install
```

then set the .env (check .env.example.md)

```bash
  PORT=5000
  DB_CONNECTION_STRING=ENTER YOUR NEONDB CONNECTION DB_CONNECTION_STRING
  JWT_ACCESS_SECRET_TOKEN=ENTER YOUR JWT ACCESS SECRET KEY
  JWT_REFRESH_SECRET_TOKEN=ENTER YOU JWT REFRESH SECRET KEY
```

lastly to run this project use

```bash
  npm run dev
```

## API Documentation

## Authentication Endpoints
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/auth/signup` | Register a new user. |
| `POST` | `/api/auth/login` | Log in an existing user. |

---

## Issue Endpoints
| Method | Endpoint | Description | Access Control |
| :--- | :--- | :--- | :--- |
| **POST** | `/api/issues/` | Create a new issue. | `Contributor` or `Maintainer` only. |
| **GET** | `/api/issues/` | Retrieve all issues. | Authenticated users. |
| **GET** | `/api/issues/:id` | Retrieve a single issue. | Authenticated users. |
| **PUT/PATCH**| `/api/issues/:id` | Update an issue. | `Maintainer` (All) or `Contributor` (Own issue & status is `open`). |
| **DELETE** | `/api/issues/:id` | Delete an issue. | `Maintainer` only. |

---

## Permission Logic
*   **Creation:** Only users with roles `contributor` or `maintainer` can post issues.
*   **Updates:** 
    *   **Maintainers** have full administrative rights to update any issue.
    *   **Contributors** can only edit their own issues if the status is currently set to `open`.
*   **Deletion:** Restricted strictly to users with the `maintainer` role.


## Author

- [@mdabdurrahman](https://github.com/mdabdurrahman07)