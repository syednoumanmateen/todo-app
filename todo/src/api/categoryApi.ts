const obj = {
  fetchAll: () => "/cat/fetchAll",
  fetch: (id: string) => `/cat/fetch/${id}`,
  create: () => "/cat/create",
  update: (id: string) => `/cat/update/${id}`,
  delete: (id: string) => `/cat/delete/${id}`
}

export default obj