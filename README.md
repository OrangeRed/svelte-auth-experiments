# Sveltekit Auth Experiments

A repo containing my experiments with authentication inside Sveltekit

## Projects

<details>
<summary>
  <strong>Lucia Auth v1.8</strong> : 
  <a href="https://sprightly-pavlova-2c5afc.netlify.app/">Live Preview</a>
</summary>

<br>

\*\* Midway through building this app, Lucia had been updated from v1.8 to v2 which brought with it massive breaking changes and, more regrettably, the loss of all v1.8 documentation that I was using as reference. Maybe later I will consider redoing everything using Lucia v2

## Setup

1. Install all packages. `pnpm -r i`
2. Create a .env file with your database connection variables.
   - Look at `apps/with-lucia-v1.8/.env.example`
3. Push the schema defintions to planetscale. `pnpm --filter with-lucia-v1.8 drizzle:push`
4. Run the app. `pnpm --filter with-lucia-v1.8 dev`

<details>
<summary><strong>Local MySQL Image</strong></summary>

<br>

If you don't want to use planetscale and would rather use a local MySQL docker image make sure you do the following things

1. Install the mysql2 driver `pnpm --filter with-lucia-v1.8 i mysql2`
2. Update the database config to use the mysql2 driver in `$lib/server/db.ts`
3. Update the lucia config to use the new database config in `$lib/server/auth.ts`
4. Update the schemas to add back foreign keys since planetscale doesn't use them
5. Start the docker container with the mysql2 image. `docker-compose up -d`
6. Update the .env file with your database variables.
7. Push your schemas up to the database. `pnpm --filter with-lucia-v1.8 drizzle:push`
8. Run the app. `pnpm --filter with-lucia-v1.8 dev`

</details>

## Project structure

| Packages                                |                     |
| --------------------------------------- | ------------------- |
| [Lucia](https://lucia-auth.com/)        | Auth wrapper        |
| [Drizzle](https://orm.drizzle.team/)    | Typesafe ORM        |
| [Zod](https://zod.dev)                  | Typesafe validation |
| [SkeletonUI](skeleton.dev)              | UI Components       |
| [TailwindCSS](https://tailwindcss.com/) | Styling             |
| [Lucide](https://lucide.dev/icons/)     | Icons               |

### Routes

```
routes
 ├── /change-password/[token]
 ├── /profile
 │   ├── Change Name Modal
 │   ├── Change Email Modal
 │   └── Change Password Modal
 ├── /sign-in
 │   └── /forgot-password
 ├── /sign-up
 └── /verify-email
     └── /[token]
```

</details>

## Todos maybe

- [x] Deploy app and database somewhere...
- [ ] Create `with-lucia-v2` after the docs get updated
- [ ] Create `raw-dog-auth` that doesn't use an Auth wrapper
- [ ] Try implementing different OAuth providers
  - [ ] Github
  - [ ] Google
  - [ ] Discord
  - [ ] . . .
- [ ] Set up [Send Grid](https://sendgrid.com/) to actually send emails instead of printing to the console
- [ ] Set up [Sentry](https://sentry.io/welcome/) to move errors out of the console
