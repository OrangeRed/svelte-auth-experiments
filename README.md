# Sveltekit Auth Experiments

Just a repo containing some experiments with authentication inside Sveltekit

## Setup

```sh
# Start the docker container that will hold the mysql database
$ docker-compose up -d

# Install packages
$ pnpm -r i

# Run the app
$ pnpm --filter with-lucia-v1.8 dev
```

### Projects

<details>
<summary> <strong>Lucia Auth v.18</strong> </summary>

<br>

Midway through building this app, Lucia had been updated from v1.8 to v2 which brought with it massive breaking changes and, more regrettably, the loss of all v1.8 documentation that I was using as reference. \*\*

Maybe later I will consider redoing everything using Lucia v2

## Sveltekit application using Lucia Auth

A basic application that uses [lucia-auth](https://lucia-auth.com/) to handle the basic auth operations

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

- [ ] Create `with-lucia-v2` after the docs get updated
- [ ] Create `raw-dog-auth` that doesn't use an Auth wrapper
- [ ] Try implementing different OAuth providers
  - [ ] Github
  - [ ] Google
  - [ ] Discord
  - [ ] . . .
- [ ] Set up [Send Grid](https://sendgrid.com/) so to actually send emails instead of printing to the console
- [ ] Set up [Sentry](https://sentry.io/welcome/) to move errors out of the console
