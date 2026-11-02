# Data Fetching Standards

## ⚠️ Critical Rules — Must Follow

### 1. Server Components Only

ALL data fetching must be done via **Server Components**.

- ❌ Do NOT fetch data in Route Handlers
- ❌ Do NOT fetch data in Client Components
- ❌ Do NOT use `useEffect` + `fetch` patterns
- ✅ ONLY fetch data in Server Components

### 2. Helper Functions in `/data` Directory

ALL database queries must go through **helper functions** located in the `/data` directory.

- ❌ Do NOT write database queries inline in components
- ✅ Create a helper function in `/data` and call it from your Server Component

### 3. Drizzle ORM — No Raw SQL

All database queries inside `/data` helper functions must use **Drizzle ORM**.

- ❌ Do NOT use raw SQL strings (`db.execute("SELECT ...")`)
- ✅ Use Drizzle's query builder (`db.select().from(...).where(...)`)

### 4. Users Can Only Access Their Own Data — Non-Negotiable

Every query that returns user data **must** filter by the currently authenticated user's ID.

- ❌ Do NOT return all rows and filter later in the component
- ✅ Always pass the authenticated `userId` into the helper function and apply it as a `where` clause in the query

**Pattern to follow in every `/data` helper:**

```ts
import { auth } from "@clerk/nextjs/server";
import { db } from "@/db";
import { myTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getMyData() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthenticated");

  return db.select().from(myTable).where(eq(myTable.userId, userId));
}
```

Never accept `userId` as a parameter from the caller — always resolve it from `auth()` inside the helper so a caller cannot request another user's data.

## Summary

| Rule | Requirement |
|------|-------------|
| Where to fetch | Server Components only |
| How to query | Helper functions in `/data` |
| Query style | Drizzle ORM — no raw SQL |
| Data access | Scoped to the authenticated user, enforced inside each helper |
