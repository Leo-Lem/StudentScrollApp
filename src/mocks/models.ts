import { Model, belongsTo } from "miragejs";

const models = {
  student: Model,
  profile: Model.extend({ student: belongsTo() }),
  settings: Model,
  post: Model,
  follower: Model,
  chat: Model,
  message: Model.extend({
    chat: belongsTo(),
    student: belongsTo()
  })
}

export default models