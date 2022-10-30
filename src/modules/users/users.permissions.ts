// TODO: implement permissions functionality (Policies)

export default {
  create: [
    'users.item.post',
  ],
  update: [
    'users.item.put',
  ],
  delete: [
    'users.item.delete',
  ],
  getAll: [
    'users.collection.get',
  ],
  getById: [
    'users.item.get',
  ],
};
