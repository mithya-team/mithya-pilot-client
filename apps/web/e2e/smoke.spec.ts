import { expect, test } from "@playwright/test";

test("pilot web loads without React version mismatch", async ({ page }) => {
  const pageErrors: string[] = [];
  page.on("pageerror", (error) => {
    pageErrors.push(error.message);
  });

  await page.goto("/");
  await expect(page.getByText("Mithya pilot client")).toBeVisible();
  await expect(page.getByText("Mock client: Ada Lovelace")).toBeVisible();
  await expect(page.getByRole("button", { name: "Solid" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Ghost" })).toBeVisible();
  await expect(page.getByPlaceholder("Name")).toBeVisible();
  await expect(page.getByRole("button", { name: "Save" })).toBeVisible();
  await page.getByPlaceholder("Name").fill("Ada");
  await page.getByRole("button", { name: "Save" }).click();
  await expect(page.getByRole("status")).toHaveText("Saved: Ada");

  const mismatch = pageErrors.find((message) =>
    message.includes("Incompatible React versions"),
  );
  expect(mismatch, pageErrors.join("\n")).toBeUndefined();
});
