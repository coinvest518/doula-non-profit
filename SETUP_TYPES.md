# Fix TypeScript Errors - Generate Supabase Types

## The Problem
TypeScript errors occur because Supabase doesn't have generated types for your database schema.

## The Solution

### Step 1: Install Supabase CLI
```bash
npm install supabase@">=1.8.1" --save-dev
```

### Step 2: Login to Supabase
```bash
npx supabase login
```

### Step 3: Initialize Project
```bash
npx supabase init
```

### Step 4: Generate Types from Your Database

**Option A - From Remote Project (Recommended):**
```bash
npx supabase gen types typescript --project-id "YOUR_PROJECT_ID" > lib/types/supabase.ts
```

**Option B - From Local Development:**
```bash
npx supabase gen types typescript --local > lib/types/supabase.ts
```

### Step 5: Update Supabase Client Files

After generating types, update the client files to use them:

**lib/supabase/client.ts:**
```typescript
import { createBrowserClient } from "@supabase/ssr"
import { Database } from "@/lib/types/supabase"

let client: ReturnType<typeof createBrowserClient<Database>> | null = null

export function getSupabaseBrowserClient() {
  if (client) {
    return client
  }

  client = createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  return client
}
```

**lib/supabase/server.ts:**
```typescript
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { Database } from "@/lib/types/supabase"

export async function getSupabaseServerClient() {
  const cookieStore = await cookies()

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => 
              cookieStore.set(name, value, options)
            )
          } catch {}
        },
      },
    }
  )
}
```

This will eliminate all TypeScript errors!
