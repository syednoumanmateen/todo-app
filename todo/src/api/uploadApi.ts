const obj = {
  fetchAll: () => "/fetchAll",
  fetch: (id: string) => `/fetch/${id}`,
  create: () => "/create",
  createMulti: () => "/createMulti",
  delete: (id: string) => `/delete/${id}`
}

export default obj