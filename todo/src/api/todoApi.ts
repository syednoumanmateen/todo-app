const obj = {
  fetchAll: () => "/fetchAll",
  fetch: (id: string) => `/fetch/${id}`,
  create: () => "/create",
  update: (id: string) => `/update/${id}`,
  delete: (id: string) => `/delete/${id}`,
  count: () => "/count"
}

export default obj