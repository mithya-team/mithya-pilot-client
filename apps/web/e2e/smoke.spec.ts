import { expect, test } from "@playwright/test";

test("pilot web loads without React version mismatch", async ({ page }) => {
  const pageErrors: string[] = [];
  page.on("pageerror", (error) => {
    pageErrors.push(error.message);
  });

  await page.goto("/");
  await expect(page.getByText("Mithya pilot client")).toBeVisible();
  await expect(page.getByPlaceholder("Name")).toBeVisible();
  await expect(page.getByRole("button", { name: "Save" })).toBeVisible();

  const mismatch = pageErrors.find((message) =>
    message.includes("Incompatible React versions"),
  );
  expect(mismatch, pageErrors.join("\n")).toBeUndefined();
});
