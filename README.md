# 💸 TransactX - A Digital Wallet

**TransactX** is a modern, lightweight Paytm-like digital wallet app — built for seamless peer-to-peer transfers, wallet top-ups, and real-time transaction history. The project is architected as a monorepo using Turborepo, enabling shared code, fast builds, and a scalable developer workflow across the Next.js app, simulated bank-webhook service, and Prisma-based database layer. Authentication is handled securely via **NextAuth**, and **CI/CD** is powered by **GitHub Actions**. Both the **Next.js App** and the **Express bank-webhook** service are containerized with **Docker** and deployed on **AWS EC2**, ensuring a consistent and production-ready environment.

## ✨ Features
- 👤 **JWT Auth with NextAuth** — Secure signup/signin with JWT strategy
- 💸 **P2P Transfers** — Send money via registered mobile number
- 🏦 **Simulated Bank Webhook** — Add money to wallet through a dummy bank trigger
- 🧾 **Transaction History** — View sent and received payments
- 📈 **Top-up Logs** — Track “Add Money” actions separately

## 🛠 Tech Stack

| Layer       | Tech Used                              |
|-------------|----------------------------------------|
| **Monorepo**| Turborepo                              |
| **Frontend**| Next.js (App Router), Tailwind CSS     |
| **Backend** | Next.js API Routes, Prisma ORM         |
| **Auxiliary Backend** | Express                      |
| **Database**| PostgreSQL                             |
| **Auth**    | NextAuth.js (JWT strategy)             |
| **Language**| TypeScript                             |
| **DevOps**  | Docker, Docker Compose, GitHub Actions |

## ☁️ Deployment
- Deployed both the **Next.js App** and the **bank-webhook** service to **AWS EC2** using **Docker**, ensuring a consistent and production-ready environment.
  
## 📁 Folder Structure
```
TransactX/
├── .github/
│   └── workflows/               # GitHub Actions CI/CD
├── apps/
│   └── bank-webhook/            # Express app (Auxiliary Backend)
│   └── merchant-app/            # Next.js app
│   └── user-app/                # Next.js app
|       └── .env.example         # Environment variable template
├── docker/
│   └── Dockerfile.user          # Dockerfile for user-app
│   └── Dockerfile.bank_webhook  # Dockerfile for bank-webhook
├── packages/
│   └── db/                      # Prisma schema and database client
|       └── .env.example         # Environment variable template
│   └── ui/                      # shared ui
├── docker-compose.yml           # Local dev orchestration
├── package.json           
├── turbo.json                   # Turborepo pipeline config
└── README.md
```

## ⚙️ Installation & Setup
### 1. Clone the Repository
```bash
git clone https://github.com/ganeshburri/TransactX.git
cd TransactX
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Up Environment Variables
Create `.env` files in both the `user-app/` and `db/` directories and add required env variables.

### 4. Configure the Database
```bash
cd packages/db
#run
npx prisma migrate dev --name init
#run
npx prisma generate
```

### 5. Start the Development Server
```bash
npm run dev
```
## ⚙️ Installation & Setup via Docker
```
# Start app + Postgres via Docker Compose
# install Docker
# run
docker-compose up --build
```
## Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a feature branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m 'Add new feature'`).
4. Push to your branch (`git push origin feature-branch`).
5. Create a pull request.
