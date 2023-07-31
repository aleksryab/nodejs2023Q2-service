export function startServerMessage(port: string | number) {
  console.log(
    '\x1b[36m%s\x1b[0m',
    `Server started on http://localhost:${port}/`,
  );

  console.log(
    '\x1b[35m%s\x1b[0m',
    `Swagger available on http://localhost:${port}/doc`,
  );
}
