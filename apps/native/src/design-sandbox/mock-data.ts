export type MockClient = {
  name: string;
  plan: string;
  status: "active" | "invited";
};

export const mockClient: MockClient = {
  name: "Ada Lovelace",
  plan: "Pilot",
  status: "active",
};
