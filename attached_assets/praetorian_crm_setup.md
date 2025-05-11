# 🚀 Praetorian SmartCoat CRM – Replit Build Prompt

**Objective:** Stand up a secure, production‑grade CRM inside Replit that handles authentication, inventory tracking, order‑driven stock deduction, and multi‑mode low‑stock alerts — all in one pass.

---

## 1. Authentication (Replit Auth)

1. **Enable Replit Auth** in the Repl dashboard.

2. **Seed four users on first run:**

   | email                              | role  | temp password |
   |------------------------------------|-------|---------------|
   | rob@praetoriansmartcoat.com        | sales | `Praetorian1$` |
   | joe@praetoriansmartcoat.com        | sales | `Praetorian1$` |
   | greg@praetoriansmartcoat.com       | sales | `Praetorian1$` |
   | admin@praetoriansmartcoat.com      | admin | `Praetorian1$` |

3. Require login for **all** routes.

4. Support Replit’s built‑in **password‑reset** flow for both roles.

---

## 2. Database (PostgreSQL – Replit DB)

Create migrations (SQL or ORM) for the following tables:

```sql
-- users ------------------------------------------------------
CREATE TABLE IF NOT EXISTS users (
  id            SERIAL PRIMARY KEY,
  email         TEXT UNIQUE NOT NULL,
  password_hash TEXT        NOT NULL,
  role          TEXT        NOT NULL DEFAULT 'sales',
  notification  TEXT        NOT NULL DEFAULT 'in-app'
);

-- inventory --------------------------------------------------
CREATE TABLE IF NOT EXISTS inventory (
  id           SERIAL PRIMARY KEY,
  product_name TEXT  UNIQUE NOT NULL,
  quantity     INT            NOT NULL DEFAULT 0
);

-- orders -----------------------------------------------------
CREATE TABLE IF NOT EXISTS orders (
  id           SERIAL PRIMARY KEY,
  product_id   INT  REFERENCES inventory(id),
  quantity     INT  NOT NULL,
  confirmed    BOOLEAN NOT NULL DEFAULT false,
  ordered_by   INT  REFERENCES users(id),
  created_at   TIMESTAMP DEFAULT NOW()
);
```

**Seed inventory** (initial qty = 0; adjust as needed):

| product_name             |
|--------------------------|
| Smart‑Coat 5‑gallon      |
| Smart‑Coat 1‑gallon      |
| Stucco 5‑gallon          |
| Stucco 1‑gallon          |

---

## 3. Server (Node + Express) — File Map

```
/app.js                 ← entry, middleware, auth hook
/routes/
   auth.js              ← Replit Auth enforce + role helper
   inventory.js         ← GET list, POST restock (admin)
/routes/
   orders.js            ← POST create, POST confirm
/models/
   userModel.js
   inventoryModel.js
   orderModel.js
/utils/
   notifications.js     ← threshold checker + email + in‑app
/views/
   inventory.ejs
   orders.ejs
/public/
   main.css
   client.js
```

---

## 4. Order → Inventory Logic

```javascript
// inside orders router
if (confirmImmediately || confirmRoute) {
  await Inventory.decrementStock(productId, qty);
  const newQty = await Inventory.getQuantity(productId);
  Notifications.checkThresholdAndAlert(productId, newQty, prevQty);
}
```

*Safeguard*: deduct stock **once** — skip if `order.confirmed === true`.

---

## 5. Alert Thresholds & Delivery

```javascript
const THRESHOLDS = [200, 150, 100, 50, 20, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
```

**Delivery modes** (`users.notification`):

* `in-app`  → toast / red‑row highlight  
* `email`   → nodemailer via `.env` SMTP creds  
* `console` → `console.warn` (dev only)

---

## 6. Front‑end Snippets

**inventory.ejs**

```ejs
<table>
  <tr><th>Product</th><th>Qty</th><% if (user.role==='admin'){ %><th>Adjust</th><% } %></tr>
  <% inventory.forEach(item=>{ %>
    <tr class="<%= item.quantity <= 20 ? 'low' : '' %>">
      <td><%= item.product_name %></td>
      <td><%= item.quantity %></td>
      <% if (user.role==='admin'){ %>
      <td>
        <form action="/inventory/update/<%= item.id %>" method="POST">
          <input type="number" name="newQty" min="0" value="<%= item.quantity %>">
          <button>Save</button>
        </form>
      </td>
      <% } %>
    </tr>
  <% }) %>
</table>
```

Add CSS: `.low { color: red; font-weight: 700; }`

---

## 7. NPM Dependencies

```
express bcrypt pg sequelize (or prisma) ejs nodemailer dotenv
```

---

## 8. Environment Variables (.env)

```
DATABASE_URL=postgresql://...       # auto from Replit DB if available
SESSION_SECRET=change_me
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=postmaster@example.com
SMTP_PASS=supersecret
SMTP_FROM=praetorian-crm@example.com
```

---

## 9. Bootstrap Script (first run)

```javascript
// seed.js — run once
await db.sync();

await Promise.all([
  User.upsert({ email: 'admin@praetoriansmartcoat.com', role: 'admin', password_hash: hash('Praetorian1$') }),
  User.upsert({ email: 'rob@praetoriansmartcoat.com',  role: 'sales', password_hash: hash('Praetorian1$') }),
  User.upsert({ email: 'joe@praetoriansmartcoat.com',  role: 'sales', password_hash: hash('Praetorian1$') }),
  User.upsert({ email: 'greg@praetoriansmartcoat.com', role: 'sales', password_hash: hash('Praetorian1$') })
]);

[
  'Smart-Coat 5-gallon',
  'Smart-Coat 1-gallon',
  'Stucco 5-gallon',
  'Stucco 1-gallon'
].forEach(name => Inventory.findOrCreate({ where: { product_name: name } }));

console.log('Seed complete');
process.exit(0);
```

---

## 10. Run Commands

```bash
npm install
node seed.js   # first time only
node app.js    # start server
```

---

## 11. Quick‑Start Verification

1. Hit your Repl URL → login with any seeded account.  
2. Add an order with **confirm immediately** checked.  
3. Inventory auto‑drops; rows turn red at threshold.  
4. Confirm email / console / toast alerts fire at 200, 150, 100, 50, 20, then every unit below 10.  

---

© 2025 Praetorian Surface Solutions — “First we make it work, then we make it pretty.”
