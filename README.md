
# ElysiaMock (Bun as a runtime)

## Getting Started

To get started with this template, run the following command in your terminal:

```bash
bun create elysia ./elysia-example
```
## Development
To start the development server, run:


    bun run dev

Open http://localhost:3000 in your browser to view the result.

## Mock API Configuration
Add your JSON files to a folder called data/ and follow these rules to name the files:

* Replace / with -
* Convert URL variables like :id into _
* Replace _ with $

> This configuration ensures that the generated mock URL matches the
> initial API.

## Project Structure
The basic structure of this project is as follows:



    ├── data/                     # JSON files for mock APIs
    ├── src/                      # Source code
    │   └── index.ts              # Entry point for the application
    ├── package.json              # Project configuration
    └── bun.lockb                 # Bun lockfile

#### Installation
To install the dependencies, run:


    bun install

OR simply use Docker

    docker build -t elysia-app .
    docker run -p 9000:9000 elysia-app


To learn more about Bun and Elysia, check out the following resources:

[Bun Documentation](https://bun.sh/)
[Elysia Documentation](https://elysiajs.com/)
